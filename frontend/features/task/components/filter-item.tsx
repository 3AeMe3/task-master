import { TabsContent } from "@/components/ui/tabs";
import TaskListItem from "./task-list-item";
import { getTaskByStatus } from "../utils/getTaskByStatus";
import type { Status } from "../types/task-status.types";
import type { Task } from "../types/task.types";

type TaskListByStatusProps = {
  tasks: Task[];
  status: Status;
  onSelectedTask: (task: Task) => void;
  emptyMessage?: string;
};

export function TaskListByStatus({
  tasks,
  status,
  onSelectedTask,
  emptyMessage = "No hay tareas en esta categoría.",
}: TaskListByStatusProps) {
  const dataToShow = getTaskByStatus(tasks, status);
  return (
    <TabsContent value={status}>
      {dataToShow.length === 0 ? (
        <div className="mt-5 rounded-lg border border-dashed border-gray-300 p-6 text-center text-black/50">
          {emptyMessage}
        </div>
      ) : (
        <div className="mt-5 flex flex-col gap-3">
          {dataToShow.map((task) => (
            <TaskListItem
              key={task.id}
              task={task}
              onHandleClick={onSelectedTask}
            />
          ))}
        </div>
      )}
    </TabsContent>
  );
}
