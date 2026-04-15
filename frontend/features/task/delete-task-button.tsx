"use client";
import { Button } from "@/components/ui/button";
import { deleteTask } from "./delete-task";
import { Trash } from "lucide-react";

export default function DeleteTaskButton({ id }: { id: string }) {
  return (
    <Button variant={"outline"} type="button" onClick={() => deleteTask(id)}>
      <Trash />
    </Button>
  );
}
