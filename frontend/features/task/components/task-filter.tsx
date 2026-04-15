import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import TaskTableItems from "./task-list-item";
import { Funnel } from "lucide-react";
import { TaskClientViewProps } from "../types/task-client-view.types";
import { getStatus } from "@/lib/utils/formater";
import { Task } from "@/types/task";

interface TaskFilterProps extends TaskClientViewProps {
  onSelectedTask: (task: Task) => void;
}

export default function TaskFilter({
  taskData,
  onSelectedTask,
  showFilter,
}: TaskFilterProps) {
  const pending = getStatus(taskData, "PENDING");
  const completed = getStatus(taskData, "COMPLETED");
  const overdue = getStatus(taskData, "OVERDUE");
  const all = taskData.length;
  return (
    <>
      <div className="flex gap-5  flex-col  w-full">
        {showFilter && (
          <div className="flex flex-row gap-2 mr-auto">
            {/* cambiar por inputgroup mas icon  */}
            <Input placeholder="Busca tareas.." className="bg-gray-100" />
            <Button variant={"outline"}>
              <Funnel />
              <span>Filtrar</span>
            </Button>
          </div>
        )}
        <div>
          <Tabs defaultValue="all" className="w-full">
            {showFilter && (
              <TabsList>
                <TabsTrigger value="all">All {all}</TabsTrigger>
                <TabsTrigger value="pending">
                  Pending {pending.length}
                </TabsTrigger>
                <TabsTrigger value="completed">
                  Completed {completed.length}
                </TabsTrigger>
                <TabsTrigger value="overdue">
                  Overdue {overdue.length}
                </TabsTrigger>
              </TabsList>
            )}
            <TabsContent value="all">
              <div className="h-full w-full mt-5">
                {taskData.map((task) => (
                  <div key={task.id}>
                    <TaskTableItems
                      task={task}
                      onHandleClick={onSelectedTask}
                    />
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="pending">
              <div className="h-full w-full mt-5">
                {pending.map((task) => (
                  <div key={task.id}>
                    <TaskTableItems
                      task={task}
                      onHandleClick={onSelectedTask}
                    />
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="completed">
              <div className="h-full w-full mt-5">
                {completed.map((task) => (
                  <div key={task.id}>
                    <TaskTableItems
                      task={task}
                      onHandleClick={onSelectedTask}
                    />
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="overdue">
              <div className="h-full w-full mt-5">
                {overdue.map((task) => (
                  <div key={task.id}>
                    <TaskTableItems
                      task={task}
                      onHandleClick={onSelectedTask}
                    />
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}
