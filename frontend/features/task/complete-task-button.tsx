"use client";
import { Button } from "@/components/ui/button";
import { completeTask } from "./complete-task";
import { CircleCheck } from "lucide-react";

type CompleteTaskProps = {
  id: string;
};

export default function CompleteTaskButton({ id }: CompleteTaskProps) {
  return (
    <Button
      type="button"
      variant={"outline"}
      className="flex-1"
      onClick={() => completeTask(id)}
    >
      <CircleCheck />
      Completar
    </Button>
  );
}
