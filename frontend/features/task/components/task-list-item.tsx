"use client";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { TaskTableItemsProps } from "../types/task-table-items.types";
import { dateFormater } from "@/lib/utils/formater";
import type { Task } from "../types/task.types";

interface TaskListProps extends TaskTableItemsProps {
  task: Task;
  onHandleClick: (task: Task) => void;
}

function getStatusBadgeClass(status: Task["status"]) {
  if (status === "COMPLETADO") {
    return "border-emerald-300 bg-emerald-100 text-emerald-700";
  }

  if (status === "VENCIDO") {
    return "border-red-300 bg-red-100 text-red-600";
  }

  return "border-slate-300 bg-slate-100 text-slate-700";
}

export default function TaskListItems({ task, onHandleClick }: TaskListProps) {
  function handleDetails() {
    onHandleClick(task);
  }
  const dueLabel = task.dueDate
    ? `Vence ${dateFormater(task.dueDate)}`
    : `Creada ${dateFormater(task.createdAt)}`;

  return (
    <Card
      className="cursor-pointer border border-transparent bg-[#f9fafb] px-5 py-3 transition hover:border-gray-200 hover:bg-white hover:shadow-sm"
      onClick={handleDetails}
    >
      <div className="flex w-full flex-row items-start gap-3">
        <div className="flex w-full flex-col gap-2">
          <div className="flex items-start justify-between gap-3">
            <p className="text-md font-semibold">{task.title}</p>
            <Badge
              className={getStatusBadgeClass(task.status)}
              variant="outline"
            >
              {task.status}
            </Badge>
          </div>
          <p className="text-sm text-black/60">
            {task.description || "Sin descripción"}
          </p>
          <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-black/45">
            <span>{task.project?.name ?? "Sin proyecto"}</span>
            <span>{dueLabel}</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
