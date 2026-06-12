import type { Task } from "../types/task.types";
import type { Status } from "../types/task-status.types";

export function getTaskByStatus(tasks: Task[], status: Status) {
  if (status === "ALL") return tasks;
  return tasks.filter((task) => task.status === status);
}
