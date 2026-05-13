"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { zodResolver } from "@hookform/resolvers/zod";
import { taskSchema } from "@/features/task/schemas/task-form.schema";
import type { Task } from "@/features/task/types/task.types";
import type { TaskFormValues } from "@/features/task/forms/task-form";
import {
  getTaskFormValues,
  defaultTaskValues,
} from "@/features/task/forms/task-form";
import { useUpdateTask } from "@/features/task/hooks/use-update-task";
import useProjects from "@/features/projects/hooks/use-projects";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Pencil } from "lucide-react";
import TaskFormFields from "./components/task-form-fields";

type EditTaskButtonProps = {
  task: Task;
  onTaskUpdated: (task: Task) => void;
  onError: (message: string | null) => void;
};

export default function EditTaskButton({
  task,
  onTaskUpdated,
  onError,
}: EditTaskButtonProps) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { data: projectData } = useProjects();
  const { submit, error } = useUpdateTask();
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TaskFormValues>({
    resolver: zodResolver(taskSchema),
    defaultValues: defaultTaskValues,
  });

  useEffect(() => {
    if (!open) {
      return;
    }

    reset(getTaskFormValues(task));
  }, [open, reset, task]);

  useEffect(() => {
    if (!open || projectData.length === 0 || task.projectId) {
      return;
    }

    reset((prev) => ({
      ...prev,
      projectId: projectData[0].id,
    }));
  }, [open, projectData, reset, task.projectId]);

  const onValidEditTask = async (data: TaskFormValues) => {
    const result = await submit(task.id, data);

    if (!result.ok) {
      onError(result.message);
      toast.error(result.message);
      return;
    }

    onError(null);
    onTaskUpdated(result.task);
    reset(getTaskFormValues(result.task));
    setOpen(false);
    router.refresh();
    toast.success("Tarea editada correctamente");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="text-white cursor-pointer bg-linear-to-r from-violet-400 to-indigo-500">
          <Pencil /> Edit Task
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-sm text-black">
        <form onSubmit={handleSubmit(onValidEditTask)}>
          <DialogHeader>
            <DialogTitle>Edit Tarea</DialogTitle>
          </DialogHeader>
          <TaskFormFields
            control={control}
            errors={errors}
            projectData={projectData}
            register={register}
          />
          {error ? <p className="text-sm text-red-500">{error}</p> : null}
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Enviando..." : "Guardar Cambios"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
