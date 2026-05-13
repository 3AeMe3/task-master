"use client";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { taskSchema } from "@/schema/form-schema";

type Project = { id: number; name: string };
import type { TaskFormValues } from "@/lib/forms/task-form";

import useUserData from "@/hooks/use-user-data";
import useProject from "@/hooks/use-project";
import { useCreateTask } from "@/hooks/use-create-task";
import { defaultTaskValues } from "@/lib/forms/task-form";

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
import { Field, FieldError, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function CreateTask() {
  const [open, setOpen] = useState(false);
  const { data: userData } = useUserData();
  const { data: projectData } = useProject();
  const { submit } = useCreateTask();
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
    if (userData?.id) {
      reset((prev) => ({
        ...prev,
        projectId: userData.id,
      }));
    }
  }, [userData, reset]);

  const onValidSubmit = async (data: TaskFormValues) => {
    const ok = await submit(data);
    if (ok) {
      reset();
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="text-white cursor-pointer bg-linear-to-r from-violet-400 to-indigo-500">
          + Crear Tarea
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm text-black">
        <form onSubmit={handleSubmit(onValidSubmit)}>
          <DialogHeader>
            <DialogTitle>Nueva Tarea</DialogTitle>
          </DialogHeader>
          <FieldGroup className="my-5">
            <Field>
              <Label htmlFor="title">Título</Label>
              <Input {...register("title")} />
              {errors.title && <p>{errors.title.message}</p>}
            </Field>
            <Field>
              <Label htmlFor="description">Descripción</Label>
              <Input {...register("description")} />

              {errors.description && <p>{errors.description.message}</p>}
            </Field>
            <Field>
              <Label htmlFor="dueDate">Fecha de Vencimiento</Label>
              <Input type="date" {...register("dueDate")} />
              {errors.dueDate && <p>{errors.dueDate.message}</p>}
            </Field>
            <Field className="flex-row">
              <div>
                <Label className="mb-2">Prioridad</Label>
                <Controller
                  name="priority"
                  control={control}
                  render={({ field }) => (
                    <Select
                      value={field.value?.toString()}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger className="w-full max-w-48">
                        <SelectValue placeholder="Selecciona la prioridad" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="BAJO">Bajo</SelectItem>
                        <SelectItem value="NORMAL">Normal</SelectItem>
                        <SelectItem value="URGENTE">Urgente</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>

              <div>
                <Label className="mb-2">Status</Label>

                <Controller
                  name="status"
                  control={control}
                  render={({ field }) => (
                    <Select
                      value={field.value ? String(field.value) : undefined}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger className="w-full max-w-48">
                        <SelectValue placeholder="Selecciona la prioridad" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="PENDIENTE">Pendiente</SelectItem>
                        <SelectItem value="COMPLETADO">Completado</SelectItem>
                        <SelectItem value="VENCIDO">Vencido</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
            </Field>
            <Field className="flex-row">
              <div>
                <Label className="mb-2">Projects</Label>
                <Controller
                  name="projectId"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Select
                      value={field.value ? String(field.value) : undefined}
                      onValueChange={(value) => field.onChange(Number(value))}
                    >
                      <SelectTrigger className="w-full max-w-48">
                        <SelectValue placeholder="Seleccion el proyecto" />
                      </SelectTrigger>
                      <SelectGroup>
                        <SelectContent position="item-aligned">
                          {Array.isArray(projectData) &&
                            projectData.map((project: Project) => (
                              <SelectItem
                                key={project.id}
                                value={String(project.id)}
                              >
                                {project.name}
                              </SelectItem>
                            ))}
                          {fieldState.error && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </SelectContent>
                      </SelectGroup>
                    </Select>
                  )}
                />
              </div>
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Enviando..." : "Crear Task"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
