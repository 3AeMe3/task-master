"use client";

import { useMemo, useState } from "react";

import { TaskClientViewProps } from "../types/task-client-view.types";

import CompleteTaskButton from "../complete-task-button";
import DeleteTaskButton from "../delete-task-button";
import EditTaskButton from "../edit-task-button";
import TaskComments from "./task-comments";
import TaskTags from "./task-tags";
import TaskSubtasks from "./task-subtasks";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Clock,
  Tag,
  UserRound,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import TaskList from "./task-list";
import type { Task } from "../types/task.types";
import { dateFormater } from "@/lib/utils/formater";

function getTaskProgress(task: Task | null) {
  if (!task) return 0;
  if (task.status === "COMPLETADO") return 100;

  if (task.subTasks.length > 0) {
    const completedSubTasks = task.subTasks.filter((subTask) => subTask.completed).length;
    return Math.round((completedSubTasks / task.subTasks.length) * 100);
  }

  if (task.status === "VENCIDO") return 25;
  return 50;
}

function getPriorityBadgeClass(priority?: Task["priority"]) {
  if (priority === "URGENTE") {
    return "border-red-300 bg-red-100 text-red-600";
  }

  if (priority === "BAJO") {
    return "border-emerald-300 bg-emerald-100 text-emerald-600";
  }

  return "border-amber-300 bg-amber-100 text-amber-700";
}

function getStatusBadgeClass(status?: Task["status"]) {
  if (status === "COMPLETADO") {
    return "border-emerald-300 bg-emerald-100 text-emerald-700";
  }

  if (status === "VENCIDO") {
    return "border-red-300 bg-red-100 text-red-600";
  }

  return "border-slate-300 bg-slate-100 text-slate-700";
}

export default function TaskClientView({
  taskData,
  title,
}: TaskClientViewProps) {
  const [deletedTaskIds, setDeletedTaskIds] = useState<number[]>([]);
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);
  const [updatedTasks, setUpdatedTasks] = useState<Record<number, Task>>({});
  const [actionError, setActionError] = useState<string | null>(null);

  const tasks = useMemo(
    () =>
      taskData
        .filter((task) => !deletedTaskIds.includes(task.id))
        .map((task) => updatedTasks[task.id] ?? task),
    [deletedTaskIds, taskData, updatedTasks],
  );

  const selectedTask = useMemo(
    () => tasks.find((task) => task.id === selectedTaskId) ?? null,
    [selectedTaskId, tasks],
  );

  const selectedTaskProgress = useMemo(
    () => getTaskProgress(selectedTask),
    [selectedTask],
  );

  const handleTaskUpdated = (updatedTask: Task) => {
    setActionError(null);
    setUpdatedTasks((currentTasks) => ({
      ...currentTasks,
      [updatedTask.id]: updatedTask,
    }));
    setSelectedTaskId(updatedTask.id);
  };

  const handleTaskDeleted = (taskId: number) => {
    setActionError(null);
    setDeletedTaskIds((currentTaskIds) => [...currentTaskIds, taskId]);
    setSelectedTaskId((currentTaskId) =>
      currentTaskId === taskId ? null : currentTaskId,
    );
  };

  return (
    <>
      <TaskList
        title={title}
        taskData={tasks}
        setSelectedTask={(task) => setSelectedTaskId(task?.id ?? null)}
      />
      <Sheet
        open={!!selectedTask}
        onOpenChange={(open) => {
          if (!open) setSelectedTaskId(null);
        }}
      >
        <SheetContent className="gap-0">
          <SheetHeader className=" border-b border-gray-200 ">
            <div className=" flex flex-col gap-3 py-2 ">
              <SheetTitle className="text-2xl font-semibold">
                {selectedTask?.title}
              </SheetTitle>
              <div className="flex gap-2">
                <Badge
                  className={getPriorityBadgeClass(selectedTask?.priority)}
                  variant="outline"
                >
                  {selectedTask?.priority ?? "Sin prioridad"}
                </Badge>
                <Badge
                  className={getStatusBadgeClass(selectedTask?.status)}
                  variant="outline"
                >
                  {selectedTask?.status ?? "Sin estado"}
                </Badge>
              </div>
            </div>
          </SheetHeader>
          <div className="px-4 bg-[#fafbfc] border pt-5 h-full">
            <div className=" flex gap-3 mt-3 ">
              {selectedTask && (
                <>
                  <EditTaskButton
                    task={selectedTask}
                    onTaskUpdated={handleTaskUpdated}
                    onError={setActionError}
                  />
                  <CompleteTaskButton
                    id={selectedTask.id}
                    status={selectedTask.status}
                    onTaskCompleted={handleTaskUpdated}
                    onError={setActionError}
                  />
                  <DeleteTaskButton
                    id={selectedTask.id}
                    onTaskDeleted={handleTaskDeleted}
                    onError={setActionError}
                  />
                </>
              )}
            </div>
            {actionError ? (
              <p className="mt-3 text-sm text-red-500">{actionError}</p>
            ) : null}
            <div className="py-6  border-b border-gray-300">
              <span className="font-semibold text-lg ">Descripción</span>
              <SheetDescription className="mt-2">
                {selectedTask?.description || "Sin descripción"}
              </SheetDescription>
            </div>
            <div className=" grid grid-cols-2  gap-y-5 py-5 border-b border-gray-300 ">
              <div className="flex flex-col justify-center  ">
                <Badge variant={"ghost"} className="text-gray-500 px-0">
                  <UserRound /> Asignado a
                </Badge>
                <div className="flex gap-2">
                  <UserRound />
                  <span className=" text-sm">
                   {selectedTask?.assigneeId
                     ? `Usuario #${selectedTask.assigneeId}`
                     : "Sin asignar"}
                  </span>
                </div>
              </div>
              <div className="flex flex-col justify-center  ">
                <Badge variant={"ghost"} className="text-gray-500  px-0">
                  <Calendar /> Fecha Final
                </Badge>
                <div className="flex gap-2">
                  <span className=" text-sm">
                   {selectedTask?.dueDate
                     ? dateFormater(selectedTask.dueDate)
                     : "Sin fecha límite"}
                  </span>
                </div>
              </div>
              <div className="flex flex-col justify-center ">
                <Badge variant={"ghost"} className="text-gray-500 px-0">
                  <Tag /> Proyecto
                </Badge>
                <div className="flex gap-2">
                  <span className=" text-sm">
                   {selectedTask?.project?.name ?? "Sin proyecto"}
                  </span>
                </div>
              </div>
              <div className="flex flex-col justify-center ">
                <Badge variant={"ghost"} className="text-gray-500 px-0">
                  <Clock /> Creado
                </Badge>
                <div className="flex gap-2">
                  <span className=" text-sm">
                   {selectedTask?.createdAt
                     ? dateFormater(selectedTask.createdAt)
                     : "Sin fecha"}
                  </span>
                </div>
              </div>
              <div className="col-span-2 flex  flex-col gap-3 ">
                {selectedTask ? (
                  <TaskTags
                    task={selectedTask}
                    onError={setActionError}
                    onTaskUpdated={handleTaskUpdated}
                  />
                ) : null}
              </div>
            </div>
            <div className="py-5 flex flex-col gap-3 border-b border-gray-200">
              <span className="text-lg font-semibold">Progreso</span>
              <Progress value={selectedTaskProgress} />
              {selectedTask ? (
                <TaskSubtasks
                  task={selectedTask}
                  onError={setActionError}
                  onTaskUpdated={handleTaskUpdated}
                />
              ) : null}
            </div>
            {selectedTask ? (
              <TaskComments
                task={selectedTask}
                onError={setActionError}
                onTaskUpdated={handleTaskUpdated}
              />
            ) : null}
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
