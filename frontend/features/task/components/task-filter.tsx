import { Tabs, TabsContent } from "@/components/ui/tabs";

import TaskListItem from "./task-list-item";
import { TaskClientViewProps } from "../types/task-client-view.types";
import type { Task } from "../types/task.types";

interface TaskFilterProps extends TaskClientViewProps {
  onSelectedTask: (task: Task) => void;
}

export default function TaskFilter({
  taskData,
  onSelectedTask,
}: TaskFilterProps) {
  return (
    <div className="flex gap-5  flex-col  w-full h-full">
      <Tabs defaultValue="all" className="w-full">
        <TabsContent value="all">
          <div className="h-full w-full  flex flex-col gap-3">
            {taskData.map((task) => (
              <div key={task.id}>
                <TaskListItem task={task} onHandleClick={onSelectedTask} />
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
