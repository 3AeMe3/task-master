import { Task } from "@/types/task";
import { Status } from "@/lib/types/status.types";

export function getTaskByStatus(tasks: Task[], status: Status) {
  if (status === "ALL") return tasks;
  return tasks.filter((task) => task.status === status);
}
