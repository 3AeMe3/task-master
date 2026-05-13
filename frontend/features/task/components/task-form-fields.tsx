"use client";

import { Controller, type Control, type FieldErrors, type UseFormRegister } from "react-hook-form";

import { Field, FieldError, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Project } from "@/features/projects/types/project.types";

import type { TaskFormValues } from "../forms/task-form";

type TaskFormFieldsProps = {
  control: Control<TaskFormValues>;
  errors: FieldErrors<TaskFormValues>;
  projectData: Project[];
  register: UseFormRegister<TaskFormValues>;
};

export default function TaskFormFields({
  control,
  errors,
  projectData,
  register,
}: TaskFormFieldsProps) {
  return (
    <FieldGroup className="my-5">
      <Field>
        <Label htmlFor="title">Título</Label>
        <Input
          {...register("title")}
          aria-invalid={Boolean(errors.title)}
          placeholder="Ej. Preparar entrega final"
        />
        {errors.title ? <FieldError errors={[errors.title]} /> : null}
      </Field>
      <Field>
        <Label htmlFor="description">Descripción</Label>
        <Textarea
          {...register("description")}
          aria-invalid={Boolean(errors.description)}
          placeholder="Describe el resultado esperado o los pasos clave."
          rows={4}
        />
        {errors.description ? <FieldError errors={[errors.description]} /> : null}
      </Field>
      <Field>
        <Label htmlFor="dueDate">Fecha de Vencimiento</Label>
        <Input type="date" {...register("dueDate")} />
        <p className="text-xs text-black/50">
          Opcional. Si no la defines, la tarea quedará sin fecha límite.
        </p>
        {errors.dueDate ? <FieldError errors={[errors.dueDate]} /> : null}
      </Field>
      <Field className="flex-row">
        <div>
          <Label className="mb-2">Prioridad</Label>
          <Controller
            name="priority"
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
                  <SelectValue placeholder="Selecciona el estado" />
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
                disabled={projectData.length === 0}
                value={field.value ? String(field.value) : undefined}
                onValueChange={(value) => field.onChange(Number(value))}
              >
                <SelectTrigger
                  aria-invalid={fieldState.invalid}
                  className="w-full max-w-48"
                >
                  <SelectValue
                    placeholder={
                      projectData.length === 0
                        ? "Primero crea un proyecto"
                        : "Selecciona el proyecto"
                    }
                  />
                </SelectTrigger>
                <SelectGroup>
                  <SelectContent position="item-aligned">
                    {projectData.map((project) => (
                      <SelectItem
                        key={project.id}
                        value={String(project.id)}
                      >
                        {project.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </SelectGroup>
              </Select>
            )}
          />
          {errors.projectId ? <FieldError errors={[errors.projectId]} /> : null}
        </div>
      </Field>
    </FieldGroup>
  );
}
