"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "@/schema/form-schema";
import { createTask } from "./handle-create";

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
import { Field, FieldGroup } from "@/components/ui/field";
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
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      createdAt: "",
      status: "PENDIENTE",
      priority: "NORMAL",
      projectId: 1,
    },
  });

  const onValidSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      setServerError("");
      const result = await createTask(data);
      if (result?.success) {
        reset();

        setOpen(false);
      }
    } catch (err) {
      setServerError("no se pudo crear la tarea");
      console.error(err);
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="text-white cursor-pointer bg-linear-to-r from-violet-400 to-indigo-500">
          + Crear Tarea
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <form onSubmit={handleSubmit(onValidSubmit)}>
          <DialogHeader>
            <DialogTitle>Crear Nueva Tarea</DialogTitle>
          </DialogHeader>
          <FieldGroup className="my-5">
            <Field>
              <Label htmlFor="title">Titulo</Label>
              <Input {...register("title")} />
              {errors.title && <p>{errors.title.message}</p>}
            </Field>
            <Field>
              <Label htmlFor="description">Description</Label>
              <Input {...register("description")} />

              {errors.description && <p>{errors.description.message}</p>}
            </Field>
            <Field>
              <Label htmlFor="createdAt">Fecha</Label>
              <Input type="date" {...register("createdAt")} />
              {errors.createdAt && <p>{errors.createdAt.message}</p>}
            </Field>
            <Field className="flex-row">
              <div>
                <Label className="mb-2">Prioridad</Label>
                <Select defaultValue="NORMAL" {...register("priority")}>
                  <SelectTrigger className="w-full max-w-48">
                    <SelectValue placeholder="Selecciona la prioridad" />
                  </SelectTrigger>
                  <SelectGroup>
                    <SelectContent position="item-aligned">
                      <SelectItem value="BAJO">Bajo</SelectItem>
                      <SelectItem value="NORMAL">Normal</SelectItem>
                      <SelectItem value="URGENTE">Urgente</SelectItem>
                    </SelectContent>
                  </SelectGroup>
                </Select>
              </div>

              <div>
                <Label className="mb-2">Status</Label>

                <Select defaultValue="PENDIENTE" {...register("status")}>
                  <SelectTrigger className="w-full max-w-48">
                    <SelectValue placeholder="Selecciona la prioridad" />
                  </SelectTrigger>
                  <SelectGroup>
                    <SelectContent position="item-aligned">
                      <SelectItem value="PENDIENTE">Pendiente</SelectItem>
                      <SelectItem value="COMPLETADO">Completado</SelectItem>
                      <SelectItem value="VENCIDO">Vencido</SelectItem>
                    </SelectContent>
                  </SelectGroup>
                </Select>
              </div>
            </Field>
            <Field className="flex-row">
              <div>
                <Label className="mb-2">Projects</Label>
                <Select defaultValue="1" {...register("projectId")}>
                  <SelectTrigger className="w-full max-w-48">
                    <SelectValue placeholder="Selecciona la prioridad" />
                  </SelectTrigger>
                  <SelectGroup>
                    <SelectContent position="item-aligned">
                      <SelectItem value="1">Default</SelectItem>
                    </SelectContent>
                  </SelectGroup>
                </Select>
              </div>
            </Field>
          </FieldGroup>
          {serverError && <p>{serverError}</p>}
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
