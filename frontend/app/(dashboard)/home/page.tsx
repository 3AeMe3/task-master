"use server";
import CreateTask from "@/features/task/create-task";
import TaskSummary from "@/features/task/components/task-summay";
import UserClient from "@/features/home/userClient";

import { Clock, CircleCheck, CircleAlert, TrendingUp } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

import GetTask from "@/lib/api/getTasks";
import { buildTaskMetrics } from "@/lib/services/task.service";
import TaskClientView from "@/features/task/components/task-client-view";

export default async function Home() {
  const tasks = await GetTask();

  const { todayTasks, activeCount, completedCount, overdueCount, percentage } =
    buildTaskMetrics(tasks);

  return (
    <div className="p-10 grid gap-5 auto-rows-min grid-flow-row min-h-screen">
      <div className="flex justify-between items-center h-30">
        <UserClient />
        <CreateTask />
      </div>

      <div className="grid grid-cols-4 gap-5">
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
      <div className=" h-100 flex justify-between items-center gap-3">
        {tasks && (
          <TaskClientView taskData={todayTasks} title="Tareas de Hoy" />
        )}
        <TaskSummary />
      </div>

      <div>
        <div className="flex justify-between">
          <h3>Up Next</h3>
          <button>View all</button>
        </div>
      </div>
    </div>
  );
}
