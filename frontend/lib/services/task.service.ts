import { todayDate } from "@/lib/utils/formater";
import { format } from "date-fns";
import { Task } from "@/types/task";
import { getStatus, calcPercentage } from "@/lib/utils/formater";

export function buildTaskMetrics(tasks: Task[], onlyToDay = true) {
  const today = todayDate();

  const todayTask = tasks.filter((task: Task) => {
    return task.dueDate && format(task.dueDate, "MM/dd/yyyy") === today;
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
