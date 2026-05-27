"use client";

import Link from "next/link";
import { Funnel, Search } from "lucide-react";

import { ScrollArea } from "@/components/ui/scroll-area";
import { TaskListByStatus } from "./filter-item";
import TaskListItem from "./task-list-item";
import { useMemo, useState } from "react";

import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Status } from "../types/task-status.types";
import type { Task } from "../types/task.types";
import { getTaskByStatus } from "../utils/getTaskByStatus";
import { Card } from "@/components/ui/card";

function matchesTaskQuery(task: Task, rawQuery: string) {
  const query = rawQuery.trim().toLowerCase();

  if (!query) {
    return true;
  }

  const searchableFields = [
    task.title,
    task.description ?? "",
    task.project?.name ?? "",
    task.tags.map((tag) => tag.name).join(" "),
    task.priority,
    task.status,
  ];

  return searchableFields.some((value) => value.toLowerCase().includes(query));
}

type TaskListProps = {
  title?: string;
  taskData: Task[];
  setSelectedTask: (task: Task | null) => void;
};

export default function TaskList({
  title,
  taskData,
  setSelectedTask,
}: TaskListProps) {
  const [filterType, setFilterType] = useState<Status>("ALL");
  const [query, setQuery] = useState("");

  const searchedTasks = useMemo(
    () => taskData.filter((task) => matchesTaskQuery(task, query)),
    [query, taskData],
  );
  const pendingCount = useMemo(
    () => getTaskByStatus(searchedTasks, "PENDIENTE").length,
    [searchedTasks],
  );
  const completedCount = useMemo(
    () => getTaskByStatus(searchedTasks, "COMPLETADO").length,
    [searchedTasks],
  );
  const overdueCount = useMemo(
    () => getTaskByStatus(searchedTasks, "VENCIDO").length,
    [searchedTasks],
  );

  return (
    <div className=" h-full w-full ">
      {title ? (
        <Card className="w-full h-full overflow-hidden px-3">
          <div className="flex items-center justify-between gap-3 px-2">
            <div>
              <span className="font-semibold">{title}</span>
              <p className="text-sm text-black/50">
                {searchedTasks.length} de {taskData.length} tareas visibles
              </p>
            </div>
            <Link className="font-semibold" href="/tasks">
              Ver Todas
            </Link>
          </div>

          {taskData.length > 0 ? (
            <div className="relative mt-4 px-2">
              <Search className="absolute left-5 top-1/2 h-4 w-4 -translate-y-1/2 text-black/40" />
              <Input
                className="pl-10"
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Busca por título, proyecto o estado"
                value={query}
              />
            </div>
          ) : null}

          {searchedTasks.length === 0 ? (
            <div className="mt-4 rounded-lg border border-dashed border-gray-300 p-6 text-center text-black/50">
              {query
                ? "No encontramos tareas con ese criterio."
                : "No tienes tareas para mostrar en este momento."}
            </div>
          ) : (
            <ScrollArea className="mt-2 h-80">
              <div className="flex flex-col gap-3 pr-4">
                {searchedTasks.map((task) => (
                  <TaskListItem
                    key={task.id}
                    task={task}
                    onHandleClick={setSelectedTask}
                  />
                ))}
              </div>
            </ScrollArea>
          )}
        </Card>
      ) : (
        <div className="w-full px-5 ">
          <div className="mb-4 flex flex-col gap-4">
            <div className="flex items-center gap-2 text-sm text-black/50">
              <Funnel className="h-4 w-4" />
              <span>
                Filtra y busca tus tareas por estado, proyecto o contenido.
              </span>
            </div>
            <div className="flex flex-col gap-3 rounded-xl bg-[#f9fafb] p-4 md:flex-row md:items-center md:justify-between">
              <div className="relative w-full md:max-w-md">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-black/40" />
                <Input
                  className="pl-10"
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Busca una tarea por título, proyecto o estado"
                  value={query}
                />
              </div>
              <span className="text-sm text-black/50">
                Mostrando {searchedTasks.length} de {taskData.length} tareas
              </span>
            </div>
          </div>
          <ScrollArea className="h-full">
            <Tabs
              className="w-full "
              onValueChange={(value) => setFilterType(value as Status)}
              value={filterType}
            >
              <TabsList>
                <TabsTrigger value="ALL">
                  Todas ({searchedTasks.length})
                </TabsTrigger>
                <TabsTrigger value="PENDIENTE">
                  Pendientes ({pendingCount})
                </TabsTrigger>
                <TabsTrigger value="COMPLETADO">
                  Completadas ({completedCount})
                </TabsTrigger>
                <TabsTrigger value="VENCIDO">
                  Vencidas ({overdueCount})
                </TabsTrigger>
              </TabsList>
              <TaskListByStatus
                emptyMessage={
                  query
                    ? "No encontramos tareas para esa búsqueda dentro de esta categoría."
                    : "No hay tareas en esta categoría."
                }
                tasks={searchedTasks}
                status={filterType}
                onSelectedTask={setSelectedTask}
              />
            </Tabs>
          </ScrollArea>
        </div>
      )}
    </div>
  );
}
