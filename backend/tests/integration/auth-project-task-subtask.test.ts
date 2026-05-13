import assert from "node:assert/strict";
import { once } from "node:events";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { spawn, spawnSync } from "node:child_process";
import test from "node:test";
import { fileURLToPath } from "node:url";

const backendRoot = new URL("../../", import.meta.url);
const backendRootPath = fileURLToPath(backendRoot);
const tsxCliPath = fileURLToPath(new URL("../../node_modules/tsx/dist/cli.mjs", import.meta.url));

type JsonResponse<T> = {
  response: Response;
  payload: T;
};

function waitForServer(
  childProcess: ReturnType<typeof spawn>,
  port: number,
  timeoutMs = 20_000,
) {
  return new Promise<void>((resolve, reject) => {
    const timeout = setTimeout(() => {
      reject(new Error(`El servidor no inicio en el puerto ${port}`));
    }, timeoutMs);

    let output = "";

    const handleOutput = (chunk: Buffer) => {
      output += chunk.toString();

      if (output.includes(`Server is running on http://localhost:${port}`)) {
        clearTimeout(timeout);
        resolve();
      }
    };

    childProcess.stdout.on("data", handleOutput);
    childProcess.stderr.on("data", handleOutput);
    childProcess.once("exit", (code) => {
      clearTimeout(timeout);
      reject(new Error(`El backend termino antes de iniciar. Exit code: ${code ?? "null"}`));
    });
  });
}

test("flujo auth -> project -> task -> subtask -> comment funciona end-to-end", async (t) => {
  const tempDir = mkdtempSync(join(tmpdir(), "taskmaster-int-"));
  const databaseUrl = `file:${join(tempDir, "integration.db")}`;
  const port = 4400 + Math.floor(Math.random() * 400);
  const env = {
    ...process.env,
    DATABASE_URL: databaseUrl,
    JWT_SECRET: "integration-test-secret",
    PORT: String(port),
    NODE_ENV: "test",
  };

  const dbPush = spawnSync(
    "npx",
    ["prisma", "db", "push", "--schema", "prisma/schema.prisma"],
    {
      cwd: backendRootPath,
      env,
      encoding: "utf8",
    },
  );

  assert.equal(
    dbPush.status,
    0,
    `prisma db push fallo: ${dbPush.stderr || dbPush.stdout}`,
  );

  const server = spawn(process.execPath, [tsxCliPath, "src/index.ts"], {
    cwd: backendRootPath,
    env,
    stdio: ["ignore", "pipe", "pipe"],
  });

  t.after(async () => {
    if (!server.killed) {
      server.kill("SIGTERM");
    }
    await once(server, "close").catch(() => undefined);
    rmSync(tempDir, { force: true, recursive: true });
  });

  await waitForServer(server, port);

  let authCookie = "";

  async function request<T>(path: string, init: RequestInit = {}): Promise<JsonResponse<T>> {
    const headers = new Headers(init.headers);

    if (init.body && !headers.has("Content-Type")) {
      headers.set("Content-Type", "application/json");
    }

    if (authCookie) {
      headers.set("Cookie", authCookie);
    }

    const response = await fetch(`http://localhost:${port}${path}`, {
      ...init,
      headers,
    });

    const setCookie = response.headers.get("set-cookie");
    if (setCookie) {
      authCookie = setCookie.split(";")[0] ?? authCookie;
    }

    const payload = (await response.json()) as T;
    return { response, payload };
  }

  const email = `integration.${Date.now()}.${Math.random().toString(16).slice(2)}@example.com`;

  const registerResult = await request<{ success: true; data: { email: string } }>(
    "/register",
    {
      method: "POST",
      body: JSON.stringify({
        name: "Integration Tester",
        email,
        password: "secret123",
      }),
    },
  );

  assert.equal(registerResult.response.status, 201);
  assert.equal(registerResult.payload.data.email, email);

  const loginResult = await request<{ success: true; message: string }>("/login", {
    method: "POST",
    body: JSON.stringify({
      email,
      password: "secret123",
    }),
  });

  assert.equal(loginResult.response.status, 200);
  assert.equal(loginResult.payload.message, "Logged in");
  assert.ok(authCookie.includes("access_token="));

  const projectResult = await request<{
    success: true;
    data: { id: number; name: string };
  }>("/project", {
    method: "POST",
    body: JSON.stringify({ name: "Proyecto Integracion" }),
  });

  assert.equal(projectResult.response.status, 201);
  assert.equal(projectResult.payload.data.name, "Proyecto Integracion");

  const taskResult = await request<{
    success: true;
    data: { id: number; title: string; subTasks: Array<{ id: number }> };
  }>("/task", {
    method: "POST",
    body: JSON.stringify({
      title: "Tarea Integracion",
      description: "Verificar flujo completo",
      priority: "NORMAL",
      projectId: projectResult.payload.data.id,
      dueDate: "",
    }),
  });

  assert.equal(taskResult.response.status, 201);
  assert.equal(taskResult.payload.data.subTasks.length, 0);

  const createSubTaskResult = await request<{
    success: true;
    data: {
      subTasks: Array<{ id: number; title: string; completed: boolean }>;
    };
  }>(`/task/${taskResult.payload.data.id}/subtasks`, {
    method: "POST",
    body: JSON.stringify({ title: "Primera subtarea" }),
  });

  assert.equal(createSubTaskResult.response.status, 201);
  assert.equal(createSubTaskResult.payload.data.subTasks.length, 1);
  assert.equal(createSubTaskResult.payload.data.subTasks[0]?.title, "Primera subtarea");
  assert.equal(createSubTaskResult.payload.data.subTasks[0]?.completed, false);

  const subTaskId = createSubTaskResult.payload.data.subTasks[0]?.id;
  assert.ok(subTaskId, "La subtarea creada debe incluir id");

  const toggleSubTaskResult = await request<{
    success: true;
    data: {
      subTasks: Array<{ id: number; completed: boolean }>;
    };
  }>(`/task/${taskResult.payload.data.id}/subtasks/${subTaskId}`, {
    method: "PATCH",
  });

  assert.equal(toggleSubTaskResult.response.status, 200);
  assert.equal(toggleSubTaskResult.payload.data.subTasks[0]?.completed, true);

  const deleteSubTaskResult = await request<{
    success: true;
    data: { subTasks: Array<unknown> };
  }>(`/task/${taskResult.payload.data.id}/subtasks/${subTaskId}`, {
    method: "DELETE",
  });

  assert.equal(deleteSubTaskResult.response.status, 200);
  assert.deepEqual(deleteSubTaskResult.payload.data.subTasks, []);

  const createCommentResult = await request<{
    success: true;
    data: {
      comments: Array<{
        id: number;
        content: string;
        author: { name: string };
      }>;
    };
  }>(`/task/${taskResult.payload.data.id}/comments`, {
    method: "POST",
    body: JSON.stringify({ content: "Primer comentario de integracion" }),
  });

  assert.equal(createCommentResult.response.status, 201);
  assert.equal(createCommentResult.payload.data.comments.length, 1);
  assert.equal(
    createCommentResult.payload.data.comments[0]?.content,
    "Primer comentario de integracion",
  );
  assert.equal(
    createCommentResult.payload.data.comments[0]?.author.name,
    "Integration Tester",
  );

  const commentId = createCommentResult.payload.data.comments[0]?.id;
  assert.ok(commentId, "El comentario creado debe incluir id");

  const deleteCommentResult = await request<{
    success: true;
    data: { comments: Array<unknown> };
  }>(`/task/${taskResult.payload.data.id}/comments/${commentId}`, {
    method: "DELETE",
  });

  assert.equal(deleteCommentResult.response.status, 200);
  assert.deepEqual(deleteCommentResult.payload.data.comments, []);
});
