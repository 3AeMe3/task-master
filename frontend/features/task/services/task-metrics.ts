import { format, parseISO } from "date-fns";

import { calcPercentage, getStatus, todayDate } from "@/lib/utils/formater";

import type { Task } from "../types/task.types";

export function buildTaskMetrics(tasks: Task[], onlyToDay = true) {
  const today = todayDate();

  const todayTask = tasks.filter((task) => {
    return task.dueDate && format(parseISO(task.dueDate), "MM/dd/yyyy") === today;
  });
  const task = onlyToDay ? todayTask : tasks;

  const completed = getStatus(task, "COMPLETADO");
  const overdue = getStatus(task, "VENCIDO");
  const pending = getStatus(task, "PENDIENTE");

  return {
    todayTasks: todayTask,
    activeCount: task.length,
    all: task.length,
    completedCount: completed.length,
    overdueCount: overdue.length,
    pending: pending.length,
    percentage: calcPercentage(completed.length, todayTask.length),
  };
}
