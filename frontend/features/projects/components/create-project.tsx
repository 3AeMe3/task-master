"use client";

import { useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  DialogTrigger,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { FieldGroup, Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Dialog } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { createProject } from "@/features/projects/services/project.server";

export default function CreateProject() {
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleCreateProject = (formData: FormData) => {
    const rawName = formData.get("name");
    const name = typeof rawName === "string" ? rawName.trim() : "";

    if (!name) {
      setFormError("Escribe un nombre para el proyecto.");
      return;
    }

    formData.set("name", name);
    setFormError(null);

    startTransition(async () => {
      try {
        await createProject(formData);
        formRef.current?.reset();
        setOpen(false);
        router.refresh();
        toast.success("Proyecto creado correctamente");
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : "No se pudo crear el proyecto",
        );
      }
    });
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        setOpen(nextOpen);
        if (!nextOpen) {
          setFormError(null);
          formRef.current?.reset();
        }
      }}
    >
      <DialogTrigger asChild>
        <Button className="text-white cursor-pointer bg-linear-to-r from-violet-400 to-indigo-500">
          + Crear Proyecto
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Nuevo Proyecto</DialogTitle>
          <DialogDescription>
            Agrupa tus tareas por contexto para seguir el progreso más fácil.
          </DialogDescription>
        </DialogHeader>

        <form ref={formRef} action={handleCreateProject} id="create-project-form">
          <FieldGroup>
            <Field>
              <Label htmlFor="name">Nombre</Label>
              <Input
                aria-invalid={Boolean(formError)}
                name="name"
                placeholder="Ej. Lanzamiento web"
              />
              {formError ? (
                <p className="text-sm text-red-500">{formError}</p>
              ) : (
                <p className="text-sm text-black/50">
                  Usa un nombre corto y reconocible para encontrarlo rápido.
                </p>
              )}
            </Field>
          </FieldGroup>
          <DialogFooter className="mt-5">
            <DialogClose asChild>
              <Button variant="outline">Cancelar</Button>
            </DialogClose>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Creando..." : "Crear proyecto"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
