import TaskClientView from '@/features/task/components/task-client-view';
import CreateTask from '@/features/task/create-task';
import { getTasks } from '@/features/task/services/task.server';

export default async function AllTasks() {
  const tasks = await getTasks();
  return (
    <main className="flex min-h-screen flex-col px-10">
      <div className="mb-10 flex h-30 items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">All Tasks</h1>
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
