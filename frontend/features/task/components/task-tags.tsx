"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Tag, X } from "lucide-react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createTaskTag, deleteTaskTag } from "../services/task.server";
import type { Task } from "../types/task.types";

type TaskTagsProps = {
  task: Task;
  onError: (message: string | null) => void;
  onTaskUpdated: (task: Task) => void;
};

export default function TaskTags({ task, onError, onTaskUpdated }: TaskTagsProps) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [pendingTagId, setPendingTagId] = useState<number | null>(null);
  const [isCreating, startCreateTransition] = useTransition();
  const [isDeleting, startDeleteTransition] = useTransition();

  const handleError = (error: unknown, fallbackMessage: string) => {
    const message = error instanceof Error ? error.message : fallbackMessage;
    onError(message);
    toast.error(message);
  };

  const handleTaskSync = (updatedTask: Task, successMessage: string) => {
    onError(null);
    onTaskUpdated(updatedTask);
    router.refresh();
    toast.success(successMessage);
  };

  const handleCreateTag = () => {
    const normalizedName = name.trim();

    if (!normalizedName) {
      handleError(new Error("Escribe una etiqueta antes de agregarla"), "Escribe una etiqueta antes de agregarla");
      return;
    }

    startCreateTransition(async () => {
      try {
        const updatedTask = await createTaskTag(task.id, { name: normalizedName });
        setName("");
        handleTaskSync(updatedTask, "Etiqueta agregada");
      } catch (error) {
        handleError(error, "No se pudo agregar la etiqueta");
      }
    });
  };

  const handleDeleteTag = (tagId: number) => {
    setPendingTagId(tagId);

    startDeleteTransition(async () => {
      try {
        const updatedTask = await deleteTaskTag(task.id, tagId);
        handleTaskSync(updatedTask, "Etiqueta eliminada");
      } catch (error) {
        handleError(error, "No se pudo eliminar la etiqueta");
      } finally {
        setPendingTagId(null);
      }
    });
  };

  return (
    <>
      <div className="flex items-center gap-2">
        <Tag className="h-5 w-5" />
        <span className="text-lg font-semibold">Tags</span>
      </div>

      <div className="flex gap-2">
        <Input
          disabled={isCreating}
          onChange={(event) => setName(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              handleCreateTag();
            }
          }}
          placeholder="Ej. backend"
          value={name}
        />
        <Button disabled={isCreating} onClick={handleCreateTag} type="button">
          {isCreating ? <Loader2 className="animate-spin" /> : <Tag />}
          Agregar
        </Button>
      </div>

      {task.tags.length === 0 ? (
        <div className="rounded-lg border border-dashed border-gray-300 bg-white p-4 text-sm text-black/50">
          Esta tarea todavía no tiene etiquetas.
        </div>
      ) : (
        <div className="flex flex-wrap gap-2">
          {task.tags.map((tag) => {
            const isPendingDelete = isDeleting && pendingTagId === tag.id;

            return (
              <Badge
                key={tag.id}
                className="gap-2 border-indigo-200 bg-indigo-50 px-3 py-1 text-indigo-700"
                variant="outline"
              >
                <span>#{tag.name}</span>
                <button
                  className="cursor-pointer rounded-full text-indigo-500 transition hover:text-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
                  disabled={isPendingDelete}
                  onClick={() => handleDeleteTag(tag.id)}
                  type="button"
                >
                  {isPendingDelete ? (
                    <Loader2 className="h-3 w-3 animate-spin" />
                  ) : (
                    <X className="h-3 w-3" />
                  )}
                </button>
              </Badge>
            );
          })}
        </div>
      )}
    </>
  );
}
