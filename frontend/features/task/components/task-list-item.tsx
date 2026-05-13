"use client";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Task } from "@/types/task";
import { TaskTableItemsProps } from "../types/task-table-items.types";
import { dateFormater } from "@/lib/utils/formater";

interface TaskListProps extends TaskTableItemsProps {
  task: Task;
  onHandleClick: (task: Task) => void;
}

export default function TaskListItems({ task, onHandleClick }: TaskListProps) {
  function handleDetails(id: string) {
    onHandleClick(task);
  }
  const date = dateFormater(task?.createdAt) || "Error date";

  return (
    <Card
      className=" cursor-pointer flex flex-row justify-between px-5 items-center py-3 border-0 border-b-0 bg-[#f9fafb] "
      onClick={() => handleDetails(task.id)}
    >
      <div className="flex flex-row gap-3 items-center  w-full">
        <div className="flex flex-col w-full">
          <p className="font-semibold text-md">{task?.title || "title"}</p>
          <div>
            <span>{date} </span>
          </div>
        </div>
      </div>
      <div className="  ">
        <Badge className="ml-auto" variant={"destructive"}>
          {task?.status || "pending"}
        </Badge>
      </div>
    </Card>
  );
}
