import type { Status } from "@/features/task/types/task-status.types";
import type { Task } from "@/features/task/types/task.types";
import { format, startOfDay } from "date-fns";

export function getStatus(tasks: Task[], status: Status) {
  return tasks.filter((task: Task) => task.status === status);
}

export function calcPercentage(part: number, whole: number) {
  if (whole === 0) {
    return "0";
  }

  return Number((part / whole) * 100).toFixed(0);
}

export function dateFormater(date?: string | null) {
  if (!date) {
    return "Sin fecha";
  }

  return date.split("T")[0].split("-").reverse().join("-");
}

export const todayDate = () => {
  return format(startOfDay(new Date()), "MM/dd/yyyy");
};
