import TaskClientView from "@/features/task/components/task-client-view";
import CreateTask from "@/features/task/create-task";
import { getTasks } from "@/features/task/services/task.server";

export default async function AllTasks() {
  const tasks = await getTasks();
  return (
    <main className="px-10 min-h-screen flex flex-col">
      <div className="flex justify-between items-center h-30 mb-10">
        <div>
          <h1 className="font-semibold text-2xl">AllTasks</h1>
          <p className="text-black/60">Aqui puedes ver todas tus tareas</p>
        </div>
        <CreateTask />
      </div>
      <div className="mb-10">
        <TaskClientView taskData={tasks} />
      </div>
    </main>
  );
}
