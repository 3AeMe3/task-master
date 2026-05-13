"use client";

import { useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { createSubTask, deleteSubTask, toggleSubTask } from "../services/task.server";
import type { Task } from "../types/task.types";

type TaskSubtasksProps = {
  task: Task;
  onError: (message: string | null) => void;
  onTaskUpdated: (task: Task) => void;
};

export default function TaskSubtasks({
  task,
  onError,
  onTaskUpdated,
}: TaskSubtasksProps) {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [pendingSubTaskId, setPendingSubTaskId] = useState<number | null>(null);
  const [pendingAction, setPendingAction] = useState<"toggle" | "delete" | null>(null);
  const [isCreating, startCreateTransition] = useTransition();
  const [isUpdating, startUpdateTransition] = useTransition();

  const completedCount = useMemo(
    () => task.subTasks.filter((subTask) => subTask.completed).length,
    [task.subTasks],
  );

  const handleTaskSync = (updatedTask: Task, successMessage: string) => {
    onError(null);
    onTaskUpdated(updatedTask);
    router.refresh();
    toast.success(successMessage);
  };

  const handleError = (error: unknown, fallbackMessage: string) => {
    const message = error instanceof Error ? error.message : fallbackMessage;
    onError(message);
    toast.error(message);
  };

  const handleCreateSubTask = () => {
    const normalizedTitle = title.trim();

    if (!normalizedTitle) {
      handleError(new Error("Escribe un titulo para la subtarea"), "Escribe un titulo para la subtarea");
      return;
    }

    startCreateTransition(async () => {
      try {
        const updatedTask = await createSubTask(task.id, { title: normalizedTitle });
        setTitle("");
        handleTaskSync(updatedTask, "Subtarea creada");
      } catch (error) {
        handleError(error, "No se pudo crear la subtarea");
      }
    });
  };

  const handleToggleSubTask = (subTaskId: number) => {
    setPendingSubTaskId(subTaskId);
    setPendingAction("toggle");

    startUpdateTransition(async () => {
      try {
        const updatedTask = await toggleSubTask(task.id, subTaskId);
        handleTaskSync(updatedTask, "Subtarea actualizada");
      } catch (error) {
        handleError(error, "No se pudo actualizar la subtarea");
      } finally {
        setPendingSubTaskId(null);
        setPendingAction(null);
      }
    });
  };

  const handleDeleteSubTask = (subTaskId: number) => {
    setPendingSubTaskId(subTaskId);
    setPendingAction("delete");

    startUpdateTransition(async () => {
      try {
        const updatedTask = await deleteSubTask(task.id, subTaskId);
        handleTaskSync(updatedTask, "Subtarea eliminada");
      } catch (error) {
        handleError(error, "No se pudo eliminar la subtarea");
      } finally {
        setPendingSubTaskId(null);
        setPendingAction(null);
      }
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <div>
          <span className="text-lg font-semibold">Subtareas</span>
          <p className="text-sm text-black/50">
            {task.subTasks.length === 0
              ? "Divide la tarea en pasos pequeños para seguir el avance."
              : `${completedCount} de ${task.subTasks.length} completadas`}
          </p>
        </div>
      </div>

      <div className="my-4 flex gap-2">
        <Input
          disabled={isCreating}
          onChange={(event) => setTitle(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              handleCreateSubTask();
            }
          }}
          placeholder="Ej. Revisar copy final"
          value={title}
        />
        <Button disabled={isCreating} onClick={handleCreateSubTask} type="button">
          {isCreating ? <Loader2 className="animate-spin" /> : <Plus />}
          Agregar
        </Button>
      </div>

      {task.subTasks.length === 0 ? (
        <div className="my-3 rounded-lg border border-dashed border-gray-300 bg-white p-4 text-sm text-black/50">
          Todavía no hay subtareas registradas para esta tarea.
        </div>
      ) : (
        <div className="my-3 flex flex-col gap-3">
          {task.subTasks.map((subTask) => {
            const isPendingForSubTask = pendingSubTaskId === subTask.id;

            return (
              <div
                key={subTask.id}
                className="flex items-center justify-between gap-3 rounded-xl border bg-white p-3"
              >
                <div className="flex min-w-0 items-start gap-3">
                  <Checkbox
                    checked={subTask.completed}
                    disabled={isUpdating && isPendingForSubTask}
                    onCheckedChange={() => handleToggleSubTask(subTask.id)}
                  />
                  <div className="min-w-0">
                    <p
                      className={`font-medium ${
                        subTask.completed ? "text-black/50 line-through" : "text-black"
                      }`}
                    >
                      {subTask.title}
                    </p>
                    {subTask.description ? (
                      <p className="mt-1 text-sm text-black/50">{subTask.description}</p>
                    ) : null}
                  </div>
                </div>
                <Button
                  disabled={isUpdating && isPendingForSubTask}
                  onClick={() => handleDeleteSubTask(subTask.id)}
                  size="icon-sm"
                  type="button"
                  variant="ghost"
                >
                  {isUpdating && isPendingForSubTask && pendingAction === "delete" ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    <Trash2 />
                  )}
                </Button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
