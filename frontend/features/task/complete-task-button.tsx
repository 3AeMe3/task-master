"use client";
import { useTransition } from "react";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { CircleCheck, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { completeTask } from "@/features/task/services/task.server";
import type { Task } from "@/features/task/types/task.types";

type CompleteTaskProps = {
  id: number;
  status: Task["status"];
  onTaskCompleted: (task: Task) => void;
  onError: (message: string | null) => void;
};

export default function CompleteTaskButton({
  id,
  status,
  onTaskCompleted,
  onError,
}: CompleteTaskProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  return (
    <Button
      type="button"
      variant={"outline"}
      className="flex-1"
      disabled={isPending || status === "COMPLETADO"}
      onClick={() => {
        startTransition(async () => {
          try {
            onError(null);
            const updatedTask = await completeTask(id);
            onTaskCompleted(updatedTask);
            router.refresh();
            toast.success("Tarea completada");
          } catch (error) {
            const message =
              error instanceof Error
                ? error.message
                : "No se pudo completar la tarea";

            onError(message);
            toast.error(message);
          }
        });
      }}
    >
      {isPending ? <Loader2 className="animate-spin" /> : <CircleCheck />}
      {status === "COMPLETADO" ? "Completada" : "Completar"}
    </Button>
  );
}
