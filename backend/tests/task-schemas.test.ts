import assert from "node:assert/strict";
import test from "node:test";

import {
  createSubTaskSchema,
  createTaskCommentSchema,
  createTaskTagSchema,
  createTaskSchema,
  updateTaskSchema,
} from "../src/modules/tasks/task.schemas";

test("createTaskSchema normaliza campos opcionales vacios", () => {
  const result = createTaskSchema.parse({
    title: "  Crear tests  ",
    description: "  Cubrir flujos criticos  ",
    priority: "NORMAL",
    projectId: "5",
    dueDate: "",
    assigneeId: "",
  });

  assert.deepEqual(result, {
    title: "Crear tests",
    description: "Cubrir flujos criticos",
    priority: "NORMAL",
    projectId: 5,
    dueDate: undefined,
    assigneeId: undefined,
    tags: undefined,
  });
});

test("updateTaskSchema permite limpiar dueDate enviando null", () => {
  const result = updateTaskSchema.parse({
    dueDate: null,
  });

  assert.deepEqual(result, {
    dueDate: "",
  });
});

test("updateTaskSchema rechaza payloads vacios", () => {
  const result = updateTaskSchema.safeParse({});

  assert.equal(result.success, false);

  if (result.success) {
    assert.fail("Se esperaba que el schema rechazara un payload vacio");
  }

  assert.equal(result.error.issues[0]?.message, "Debe enviar al menos un campo para editar");
});

test("createSubTaskSchema exige un titulo valido", () => {
  const result = createSubTaskSchema.safeParse({
    title: "   ",
  });

  assert.equal(result.success, false);

  if (result.success) {
    assert.fail("Se esperaba un error por titulo vacio");
  }

  assert.equal(result.error.issues[0]?.message, "El titulo es requerido");
});

test("createTaskCommentSchema exige contenido", () => {
  const result = createTaskCommentSchema.safeParse({
    content: "   ",
  });

  assert.equal(result.success, false);

  if (result.success) {
    assert.fail("Se esperaba un error por comentario vacio");
  }

  assert.equal(result.error.issues[0]?.message, "El comentario es requerido");
});

test("createTaskTagSchema exige nombre valido", () => {
  const result = createTaskTagSchema.safeParse({
    name: "   ",
  });

  assert.equal(result.success, false);

  if (result.success) {
    assert.fail("Se esperaba un error por etiqueta vacia");
  }

  assert.equal(result.error.issues[0]?.message, "La etiqueta es requerida");
});
