import { Task } from "@/types/task";
import { Status } from "../types/status.types";

export function getStatus(tasks: Task[], status: Status) {
  return tasks.filter((task: Task) => task.status === status);
}

export function calcPercentage(part: number, whole: number) {
  return (part / whole) * 100;
}
