"use client";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Task } from "@/types/task";
import { TaskTableItemsProps } from "../types/task-table-items.types";

interface TaskListProps extends TaskTableItemsProps {
  task: Task;
  onHandleClick: (task: Task) => void;
}

export default function TaskListItems({ task, onHandleClick }: TaskListProps) {
  function handleDetails(id: string) {
    console.log("se abre", id);
    onHandleClick(task);
  }

  return (
    <Card
      className="cursor-pointer flex flex-row justify-between px-5 items-center py-3 border-0 border-b-0 bg-[#f9fafb] "
      onClick={() => handleDetails(task.id)}
    >
      <div className="flex flex-row gap-3 items-center  w-full">
        <div className="flex flex-col w-full">
          <p className="font-semibold text-md">{task?.title || "title"}</p>
          <div>
            <span>{task?.createdAt || "createdAt"} </span>
            <span>Frank Mendoza</span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 items-center  gap-2 w-full max-w-1/3">
        <Badge className="ml-auto" variant={"destructive"}>
          {task?.status || "pending"}
        </Badge>
        <div className="flex flex-row items-center gap-2">
          <Progress value={55} className="w-full" />
          <span>90%</span>
        </div>
      </div>
    </Card>
  );
}
