"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Loader2, MessageSquare, Send, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { dateFormater } from "@/lib/utils/formater";
import { createTaskComment, deleteTaskComment } from "../services/task.server";
import type { Task } from "../types/task.types";

type TaskCommentsProps = {
  task: Task;
  onError: (message: string | null) => void;
  onTaskUpdated: (task: Task) => void;
};

export default function TaskComments({
  task,
  onError,
  onTaskUpdated,
}: TaskCommentsProps) {
  const router = useRouter();
  const [content, setContent] = useState("");
  const [pendingCommentId, setPendingCommentId] = useState<number | null>(null);
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

  const handleCreateComment = () => {
    const normalizedContent = content.trim();

    if (!normalizedContent) {
      handleError(
        new Error("Escribe un comentario antes de enviarlo"),
        "Escribe un comentario antes de enviarlo",
      );
      return;
    }

    startCreateTransition(async () => {
      try {
        const updatedTask = await createTaskComment(task.id, {
          content: normalizedContent,
        });
        setContent("");
        handleTaskSync(updatedTask, "Comentario agregado");
      } catch (error) {
        handleError(error, "No se pudo agregar el comentario");
      }
    });
  };

  const handleDeleteComment = (commentId: number) => {
    setPendingCommentId(commentId);

    startDeleteTransition(async () => {
      try {
        const updatedTask = await deleteTaskComment(task.id, commentId);
        handleTaskSync(updatedTask, "Comentario eliminado");
      } catch (error) {
        handleError(error, "No se pudo eliminar el comentario");
      } finally {
        setPendingCommentId(null);
      }
    });
  };

  return (
    <div className="my-5">
      <div className="mb-4 flex items-center gap-2">
        <MessageSquare />
        <div>
          <span className="text-lg font-semibold">
            Comentarios{" "}
            <span className="bg-black/20 font-normal p-1 text-sm rounded-full">
              {task.comments.length}
            </span>
          </span>
        </div>
      </div>

      <div>
        <Textarea
          disabled={isCreating}
          onChange={(event) => setContent(event.target.value)}
          placeholder="Añadir un comentario..."
          rows={3}
          value={content}
        />
        <div className="mt-3 flex justify-end">
          <Button
            disabled={isCreating}
            onClick={handleCreateComment}
            type="button"
          >
            {isCreating ? <Loader2 className="animate-spin" /> : <Send />}
            Comentar
          </Button>
        </div>
      </div>

      {task.comments.length === 0 ? (
        <div className="mt-4 rounded-lg border border-dashed border-gray-300 bg-white p-4 text-sm text-black/50">
          Todavía no hay comentarios en esta tarea.
        </div>
      ) : (
        <div className="mt-4 flex flex-col gap-3">
          {task.comments.map((comment) => {
            const isPendingDelete =
              isDeleting && pendingCommentId === comment.id;

            return (
              <div key={comment.id} className="rounded-xl border  p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-medium">{comment.author.name}</p>
                    <p className="text-xs text-black/45">
                      {dateFormater(comment.createdAt)}
                    </p>
                  </div>
                  <Button
                    disabled={isPendingDelete}
                    onClick={() => handleDeleteComment(comment.id)}
                    size="icon-sm"
                    type="button"
                    variant="ghost"
                  >
                    {isPendingDelete ? (
                      <Loader2 className="animate-spin" />
                    ) : (
                      <Trash2 />
                    )}
                  </Button>
                </div>
                <p className="mt-3 text-sm text-black/70">{comment.content}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
