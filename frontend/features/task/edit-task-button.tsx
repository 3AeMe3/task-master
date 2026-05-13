"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

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
import { Pencil } from "lucide-react";

import * as z from "zod";

const taskEditSchema = z.object({
  title: z.string(),
  description: z.string(),
});

type TaskEditFormValues = z.infer<typeof taskEditSchema>;
import { getTaskData } from "./edit-task";

export default function EditTaskButton({ id }: { id: string }) {
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TaskEditFormValues>({
    resolver: zodResolver(taskEditSchema),
    defaultValues: {
      title: "aca deberia de ir el titulo anterior",
      description: "aca deberia de ir la descripcion anterior",
    },
  });

  const onValidEditTask = (data: TaskEditFormValues) => {
    console.log(data);
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
