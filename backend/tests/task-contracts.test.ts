import assert from "node:assert/strict";
import test from "node:test";

import { toCurrentUserDto } from "../src/modules/me/me.dto";
import { toProjectDto } from "../src/modules/projects/project.dto";
import { toTaskDto } from "../src/modules/tasks/task.dto";

test("toProjectDto expone description null para estabilizar el contrato", () => {
  const project = toProjectDto({
    id: 7,
    name: "Roadmap",
    userId: 3,
  });

  assert.deepEqual(project, {
    id: 7,
    name: "Roadmap",
    userId: 3,
    description: null,
  });
});

test("toCurrentUserDto devuelve solo los campos publicos del usuario", () => {
  const user = toCurrentUserDto({
    id: 9,
    name: "Aimz",
    email: "aimz@example.com",
  });

  assert.deepEqual(user, {
    id: 9,
    name: "Aimz",
    email: "aimz@example.com",
  });
});

test("toTaskDto serializa fechas y proyecto anidado al shape publico", () => {
  const createdAt = new Date("2026-05-13T16:00:00.000Z");
  const updatedAt = new Date("2026-05-13T17:30:00.000Z");
  const dueDate = new Date("2026-05-20T00:00:00.000Z");

  const task = toTaskDto({
    id: 12,
    title: "Normalizar contratos",
    description: "Cerrar envelopes y DTOs",
    priority: "URGENTE",
    status: "PENDIENTE",
    createdAt,
    updatedAt,
    dueDate,
    createdById: 3,
    projectId: 7,
    assigneeId: null,
    project: {
      id: 7,
      name: "Roadmap",
      userId: 3,
    },
    subTasks: [
      {
        id: 99,
        title: "Crear endpoint",
        description: null,
        completed: false,
      },
    ],
    comments: [
      {
        id: 150,
        content: "Primer comentario",
        createdAt: new Date("2026-05-13T18:00:00.000Z"),
        author: {
          id: 3,
          name: "Aimz",
        },
      },
    ],
  });

  assert.deepEqual(task, {
    id: 12,
    title: "Normalizar contratos",
    description: "Cerrar envelopes y DTOs",
    priority: "URGENTE",
    status: "PENDIENTE",
    createdAt: createdAt.toISOString(),
    updatedAt: updatedAt.toISOString(),
    dueDate: dueDate.toISOString(),
    createdById: 3,
    projectId: 7,
    assigneeId: null,
    project: {
      id: 7,
      name: "Roadmap",
      userId: 3,
      description: null,
    },
    subTasks: [
      {
        id: 99,
        title: "Crear endpoint",
        description: null,
        completed: false,
      },
    ],
    comments: [
      {
        id: 150,
        content: "Primer comentario",
        createdAt: "2026-05-13T18:00:00.000Z",
        author: {
          id: 3,
          name: "Aimz",
        },
      },
    ],
  });
});

test("toTaskDto mantiene nulls cuando la tarea no tiene fecha ni proyecto cargado", () => {
  const createdAt = new Date("2026-05-13T16:00:00.000Z");
  const updatedAt = new Date("2026-05-13T17:30:00.000Z");

  const task = toTaskDto({
    id: 13,
    title: "Sin proyecto",
    description: null,
    priority: "NORMAL",
    status: "COMPLETADO",
    createdAt,
    updatedAt,
    dueDate: null,
    createdById: 3,
    projectId: 7,
    assigneeId: 11,
    project: null,
    subTasks: [],
    comments: [],
  });

  assert.deepEqual(task, {
    id: 13,
    title: "Sin proyecto",
    description: null,
    priority: "NORMAL",
    status: "COMPLETADO",
    createdAt: createdAt.toISOString(),
    updatedAt: updatedAt.toISOString(),
    dueDate: null,
    createdById: 3,
    projectId: 7,
    assigneeId: 11,
    project: null,
    subTasks: [],
    comments: [],
  });
});
