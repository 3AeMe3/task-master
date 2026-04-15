"use client";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Clock,
  Edit,
  MessageSquare,
  Tag,
  UserCircle,
  UserRound,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import CompleteTaskButton from "../complete-task-button";
import DeleteTaskButton from "../delete-task-button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TaskClientViewProps } from "../types/task-client-view.types";
import Link from "next/link";
import { Task } from "@/types/task";
import TaskFilter from "./task-filter";

export default function TaskClientView({
  taskData,
  title,
}: TaskClientViewProps) {
  const [selectedTask, setSelectedTask] = useState<Task | null>();

  return (
    <>
      <ScrollArea className="flex flex-col gap-4  w-full h-full p-4 border rounded-xl ">
        <div className="flex justify-between px-2">
          {title ? (
            <div className="w-full">
              <div className="flex justify-between">
                <span className="font-semibold">{title}</span>
                <Link className="font-semibold" href={"/tasks"}>
                  View All
                </Link>
              </div>
              <div>
                <TaskFilter
                  taskData={taskData}
                  onSelectedTask={setSelectedTask}
                />
              </div>
            </div>
          ) : (
            <TaskFilter
              taskData={taskData}
              onSelectedTask={setSelectedTask}
              showFilter
            />
          )}
        </div>
      </ScrollArea>
      <Sheet
        open={!!selectedTask}
        onOpenChange={(open) => {
          if (!open) setSelectedTask(null);
        }}
      >
        <SheetContent className="gap-0  ">
          <SheetHeader className=" border-b border-gray-200 ">
            <div className=" flex flex-col gap-3 py-2 ">
              <SheetTitle className="text-2xl font-semibold">
                {selectedTask?.title}
              </SheetTitle>
              <div className="flex gap-2">
                <Badge
                  className="bg-red-100 text-red-600 border-red-300 border"
                  variant={"destructive"}
                >
                  Urgente
                </Badge>
                <Badge className="bg-purple-100 text-purple-500 border border-purple-300">
                  Revisado
                </Badge>
              </div>
            </div>
          </SheetHeader>
          <div className="px-4 bg-[#fafbfc] border pt-5 h-full">
            <div className=" flex gap-3 mt-3 ">
              <Button className="flex-1 text-white bg-linear-to-r from-violet-400 to-indigo-500">
                <Edit />
                Editar
              </Button>
              {selectedTask && (
                <>
                  <CompleteTaskButton id={selectedTask.id} />
                  <DeleteTaskButton id={selectedTask.id} />
                </>
              )}
            </div>
            <div className="py-6  border-b border-gray-300">
              <span className="font-semibold text-lg ">Descripción</span>
              <SheetDescription className="mt-2">
                {selectedTask?.description}
              </SheetDescription>
            </div>
            <div className=" grid grid-cols-2  gap-y-5 py-5 border-b border-gray-300 ">
              <div className="flex flex-col justify-center ">
                <Badge variant={"ghost"} className="text-gray-500">
                  <UserRound /> Assignee
                </Badge>
                <div className="flex gap-2">
                  <UserRound />
                  <span className="font-semibold text-sm">Frank Mendoza</span>
                </div>
              </div>
              <div className="flex flex-col justify-center ">
                <Badge variant={"ghost"} className="text-gray-500">
                  <Calendar /> Assignee
                </Badge>
                <div className="flex gap-2">
                  <UserCircle />
                  <span className="font-semibold text-sm">Frank Mendoza</span>
                </div>
              </div>
              <div className="flex flex-col justify-center ">
                <Badge variant={"ghost"} className="text-gray-500">
                  <Tag /> Assignee
                </Badge>
                <div className="flex gap-2">
                  <UserCircle />
                  <span className="font-semibold text-sm">Frank Mendoza</span>
                </div>
              </div>
              <div className="flex flex-col justify-center ">
                <Badge variant={"ghost"} className="text-gray-500">
                  <Clock /> Assignee
                </Badge>
                <div className="flex gap-2">
                  <UserCircle />
                  <span className="font-semibold text-sm">Frank Mendoza</span>
                </div>
              </div>
              <div className="col-span-2 flex  flex-col gap-3 ">
                <span className="font-semibold text-lg ">Tags</span>
                <div className="flex w-full  gap-2 flex-wrap">
                  <Badge className="bg-gray-200 px-3 " variant={"outline"}>
                    Backend
                  </Badge>
                </div>
              </div>
            </div>
            <div className="py-5 flex flex-col gap-3 border-b border-gray-200">
              <span className="font-medium text-lg">Progreso</span>
              <Progress value={90} />
              <div>
                <span>SubTasks</span>
                <ul className="flex flex-col gap-3 my-3  ">
                  <li>
                    <Checkbox />
                    Tasks
                  </li>
                  <li>
                    <Checkbox /> Tasks
                  </li>

                  <li>
                    <Checkbox /> Tasks
                  </li>
                </ul>
              </div>
            </div>
            <div className="my-5">
              <div className="flex gap-2 mb-4">
                <MessageSquare />
                <span className="font-medium text-lg">Comentarios</span>
              </div>
              <div className="flex gap-2 ">
                <UserRound />
                <Textarea placeholder="Añade un comentario..." />
                <Button className="flex-1 text-white bg-linear-to-r from-violet-400 to-indigo-500">
                  Enviar
                </Button>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
