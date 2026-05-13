"use server";
import Link from "next/link";
import CreateTask from "@/features/task/create-task";
import TaskSummary from "@/features/task/components/task-summay";
import UserGreeting from "@/features/dashboard-home/components/user-greeting";
import { getCurrentUser } from "@/features/dashboard-home/services/current-user.server";

import { Clock, CircleCheck, CircleAlert, TrendingUp } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

import { getTasks } from "@/features/task/services/task.server";
import { buildTaskMetrics } from "@/features/task/services/task-metrics";
import TaskClientView from "@/features/task/components/task-client-view";
import { Badge } from "@/components/ui/badge";
import { dateFormater } from "@/lib/utils/formater";

export default async function Home() {
  const [tasks, user] = await Promise.all([getTasks(), getCurrentUser()]);

  const { todayTasks, activeCount, completedCount, overdueCount, percentage } =
    buildTaskMetrics(tasks);
  const pendingCount = Math.max(activeCount - completedCount - overdueCount, 0);
  const upcomingTasks = tasks
    .filter((task) => task.status !== "COMPLETADO")
    .sort((leftTask, rightTask) => {
      if (leftTask.dueDate && rightTask.dueDate) {
        return leftTask.dueDate.localeCompare(rightTask.dueDate);
      }

      if (leftTask.dueDate) {
        return -1;
      }

      if (rightTask.dueDate) {
        return 1;
      }

      return leftTask.createdAt.localeCompare(rightTask.createdAt);
    })
    .slice(0, 4);

  return (
    <div className="grid min-h-screen auto-rows-min grid-flow-row gap-5 p-6 lg:p-10">
      <div className="flex h-30 flex-col justify-between gap-4 md:flex-row md:items-center">
        <UserGreeting user={user} />
        <CreateTask />
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <Card className="h-40 gap-0">
          <CardHeader>
            <span className="bg-[#dbeafe] w-fit p-2 rounded-xl">
              <Clock color="#2468fc" />
            </span>
          </CardHeader>
          <CardContent className="text-3xl font-semibold">
            {activeCount}
          </CardContent>
          <CardFooter className="text-black/40 font-semibold">
            Active Task
          </CardFooter>
        </Card>
        <Card className="h-40 gap-0">
          <CardHeader>
            <span className="bg-[#dbfce7] w-fit p-2 rounded-xl">
              <CircleCheck color="#36bb68" />
            </span>
          </CardHeader>
          <CardContent className="text-3xl font-semibold">
            {completedCount}
          </CardContent>
          <CardFooter className="text-black/40 font-semibold">
            Completed
          </CardFooter>
        </Card>
        <Card className="h-40 gap-0">
          <CardHeader>
            <span className="bg-[#ffe2e2] w-fit p-2 rounded-xl">
              <CircleAlert color="#e7060c" />
            </span>
          </CardHeader>
          <CardContent className="text-3xl font-semibold">
            {overdueCount}
          </CardContent>
          <CardFooter className="text-black/40 font-semibold">
            Vencido o atrasado
          </CardFooter>
        </Card>
        <Card className="h-40 gap-0">
          <CardHeader>
            <span className="bg-[#f3e8ff] w-fit p-2 rounded-xl">
              <TrendingUp color="#8800fa" />
            </span>
          </CardHeader>
          <CardContent className="text-3xl font-semibold">
            {percentage}%
          </CardContent>
          <CardFooter className="text-black/40 font-semibold">
            Porcentaje de Completado
          </CardFooter>
        </Card>
      </div>
      <div className="flex min-h-[28rem] flex-col items-stretch gap-3 xl:flex-row">
        {tasks && (
          <TaskClientView taskData={todayTasks} title="Tareas de Hoy" />
        )}
        <TaskSummary
          completedCount={completedCount}
          overdueCount={overdueCount}
          pendingCount={pendingCount}
          totalCount={activeCount}
        />
      </div>

      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
          <div>
            <h3 className="text-lg font-semibold">Próximas tareas</h3>
            <p className="text-sm text-black/50">
              Tus siguientes prioridades para avanzar sin perder contexto.
            </p>
          </div>
          <Link className="text-sm font-semibold text-indigo-600" href="/tasks">
            Ver todas
          </Link>
        </div>
        {upcomingTasks.length === 0 ? (
          <div className="mt-5 rounded-xl border border-dashed border-gray-300 bg-[#fafbfc] p-6 text-center text-black/50">
            No tienes tareas pendientes por ahora. Buen momento para crear la siguiente.
          </div>
        ) : (
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {upcomingTasks.map((task) => (
              <div
                key={task.id}
                className="rounded-xl border bg-[#fafbfc] p-4 transition hover:bg-white"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold">{task.title}</p>
                    <p className="mt-1 text-sm text-black/55">
                      {task.project?.name ?? "Sin proyecto"}
                    </p>
                  </div>
                  <Badge variant="outline">{task.status}</Badge>
                </div>
                <p className="mt-4 text-sm text-black/60">
                  {task.description || "Sin descripción"}
                </p>
                <div className="mt-4 flex flex-wrap gap-3 text-xs text-black/45">
                  <span>Prioridad: {task.priority}</span>
                  <span>
                    {task.dueDate
                      ? `Vence ${dateFormater(task.dueDate)}`
                      : "Sin fecha límite"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
