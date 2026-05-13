"use client";
import TaskFilter from "./task-filter";

import Link from "next/link";
import { Funnel } from "lucide-react";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TaskListByStatus } from "./filter-item";
import { useState } from "react";
import { Status } from "@/lib/types/status.types";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
export default function TaskList({ title, taskData, setSelectedTask }) {
  const [filterType, setFilterType] = useState<Status>("ALL");

  return (
    <div className=" h-full w-full">
      {title ? (
        <div className="w-full h-full overflow-hidden">
          <div className="flex justify-between px-2">
            <span className="font-semibold">{title}</span>
            <Link className="font-semibold" href="/tasks">
              View All
            </Link>
          </div>

          {/* Scroll SOLO aquí */}
          <ScrollArea className="mt-2 h-80">
            <TaskFilter taskData={taskData} onSelectedTask={setSelectedTask} />
          </ScrollArea>
        </div>
      ) : (
        <div className="w-full ">
          {/* Filtros */}
          <div className="flex flex-row gap-2 mr-auto">
            <Input placeholder="Busca tareas.." className="bg-gray-100" />
            <Button variant="outline">
              <Funnel />
              <span>Filtrar</span>
            </Button>
          </div>

          {/* Tabs */}
          <ScrollArea className="h-full">
            <Tabs defaultValue="ALL" className="w-full ">
              <TabsList>
                <TabsTrigger value="ALL" onClick={() => setFilterType("ALL")}>
                  All{" "}
                </TabsTrigger>
                <TabsTrigger
                  value="PENDIENTE"
                  onClick={() => setFilterType("PENDIENTE")}
                >
                  Pending
                </TabsTrigger>
                <TabsTrigger
                  value="COMPLETADO"
                  onClick={() => setFilterType("COMPLETADO")}
                >
                  Completed
                </TabsTrigger>
                <TabsTrigger
                  value="VENCIDO"
                  onClick={() => setFilterType("VENCIDO")}
                >
                  Overdue
                </TabsTrigger>
              </TabsList>
              <TaskListByStatus
                tasks={taskData}
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
