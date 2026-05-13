import { Task } from "@/types/task";
import { Status } from "../types/status.types";
import { format, startOfDay } from "date-fns";

export function getStatus(tasks: Task[], status: Status) {
  return tasks.filter((task: Task) => task.status === status);
}

export function calcPercentage(part: number, whole: number) {
  return Number((part / whole) * 100).toFixed(0);
}

export function dateFormater(date: string) {
  return date.split("T")[0].split("-").reverse().join("-");
}

export const todayDate = () => {
  return format(startOfDay(new Date()), "MM/dd/yyyy");
};
