"use client";
import { useTransition } from "react";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Loader2, Trash } from "lucide-react";
import { toast } from "sonner";

import { deleteTask } from "@/features/task/services/task.server";

type DeleteTaskButtonProps = {
  id: number;
  onTaskDeleted: (taskId: number) => void;
  onError: (message: string | null) => void;
};

export default function DeleteTaskButton({
  id,
  onTaskDeleted,
  onError,
}: DeleteTaskButtonProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  return (
    <Button
      variant={"outline"}
      type="button"
      disabled={isPending}
      onClick={() => {
        startTransition(async () => {
          try {
            onError(null);
            await deleteTask(id);
            onTaskDeleted(id);
            router.refresh();
            toast.success("Tarea eliminada");
          } catch (error) {
            const message =
              error instanceof Error
                ? error.message
                : "No se pudo eliminar la tarea";

            onError(message);
            toast.error(message);
          }
        });
      }}
    >
      {isPending ? <Loader2 className="animate-spin" /> : <Trash />}
    </Button>
  );
}
