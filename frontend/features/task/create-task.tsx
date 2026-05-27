"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { zodResolver } from "@hookform/resolvers/zod";
import { taskSchema } from "@/features/task/schemas/task-form.schema";

import type { TaskFormValues } from "@/features/task/forms/task-form";
import { defaultTaskValues } from "@/features/task/forms/task-form";
import { useCreateTask } from "@/features/task/hooks/use-create-task";
import useProjects from "@/features/projects/hooks/use-projects";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import TaskFormFields from "./components/task-form-fields";

export default function CreateTask() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const {
    data: projectData,
    loading: isLoadingProjects,
    error: projectError,
  } = useProjects();
  const { submit, error, clearError } = useCreateTask();
  const hasProjects = projectData.length > 0;
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
    if (projectData.length > 0) {
      reset((prev) => ({
        ...prev,
        projectId: projectData[0].id,
      }));
    }
  }, [projectData, reset]);

  const onValidSubmit = async (data: TaskFormValues) => {
    const result = await submit(data);
    if (result.ok) {
      reset();
      setOpen(false);
      router.refresh();
      toast.success("Tarea creada correctamente");
      return;
    }

    toast.error(result.message);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        clearError();
        if (!nextOpen) {
          reset(defaultTaskValues);
        }
        setOpen(nextOpen);
      }}
    >
      <DialogTrigger asChild>
        <Button className="text-white cursor-pointer bg-linear-to-r from-violet-400 to-indigo-500">
          + Crear Tarea
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm lg:max-w-4/12 text-black">
        <form onSubmit={handleSubmit(onValidSubmit)}>
          <DialogHeader>
            <DialogTitle>Nueva Tarea</DialogTitle>
            <DialogDescription>
              Crea una tarea clara y asígnala a un proyecto para verla en tu
              panel.
            </DialogDescription>
          </DialogHeader>
          {projectError ? (
            <p className="text-sm text-red-500">{projectError}</p>
          ) : null}
          {error ? <p className="text-sm text-red-500">{error}</p> : null}
          {!projectError && !isLoadingProjects && !hasProjects ? (
            <div className="my-5 rounded-xl border border-dashed border-gray-300 bg-[#fafbfc] p-4">
              <p className="font-medium text-black">
                Todavía no tienes proyectos.
              </p>
              <p className="mt-1 text-sm text-black/60">
                Primero crea uno para organizar tus tareas y poder asignarlas.
              </p>
              <Button asChild className="mt-4" variant="outline">
                <Link href="/projects" onClick={() => setOpen(false)}>
                  Ir a proyectos
                </Link>
              </Button>
            </div>
          ) : (
            <TaskFormFields
              control={control}
              errors={errors}
              projectData={projectData}
              register={register}
              showTagInput
            />
          )}
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button
              type="submit"
              disabled={isSubmitting || isLoadingProjects || !hasProjects}
            >
              {isLoadingProjects
                ? "Cargando proyectos..."
                : isSubmitting
                  ? "Enviando..."
                  : hasProjects
                    ? "Crear tarea"
                    : "Crea un proyecto primero"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
