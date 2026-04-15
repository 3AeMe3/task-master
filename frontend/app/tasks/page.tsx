import TaskClientView from "@/features/task/components/task-client-view";
import CreateTask from "@/features/task/create-task";
import GetTask from "@/lib/api/getTasks";
import { Task } from "@/types/task";

export default async function AllTasks() {
  const tasks: Task[] = await GetTask();
  return (
    <main className="p-10  min-h-screen">
      <div className="flex justify-between items-center h-30 mb-10">
        <div>
          <h1 className="font-semibold text-2xl">AllTasks</h1>
          <p className="text-black/60">Aqui puedes ver todas tus tareas</p>
        </div>
        <CreateTask />
      </div>
      <div className=" min-h-screen  flex justify-between gap-3">
        <TaskClientView taskData={tasks} />
      </div>
    </main>
  );
}
