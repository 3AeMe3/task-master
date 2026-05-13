import { TabsContent } from "@/components/ui/tabs";
import TaskListItem from "./task-list-item";
import { Task } from "@/types/task";
import { Status } from "@/lib/types/status.types";
import { getTaskByStatus } from "../utils/getTaskByStatus";

type TaskListByStatusProps = {
  tasks: Task[];
  status: Status;
  onSelectedTask: (task: Task) => void;
};

export function TaskListByStatus({
  tasks,
  status,
  onSelectedTask,
}: TaskListByStatusProps) {
  const dataToShow = getTaskByStatus(tasks, status);
  return (
    <TabsContent value={status}>
      <div className="mt-5 flex flex-col gap-3">
        {dataToShow?.map((task) => (
          <TaskListItem
            key={task.id}
            task={task}
            onHandleClick={onSelectedTask}
          />
        ))}
      </div>
    </TabsContent>
  );
}
