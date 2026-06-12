import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CreateTask from "@/features/task/create-task";
import { getTasks } from "@/features/task/services/task.server";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const columns = [
  {
    id: "PENDIENTE",
    title: "Pendientes",
    emptyLabel: "No hay tareas pendientes.",
  },
  {
    id: "COMPLETADO",
    title: "Completadas",
    emptyLabel: "No hay tareas completadas.",
  },
  { id: "VENCIDO", title: "Vencidas", emptyLabel: "No hay tareas vencidas." },
] as const;

export default async function KabanBoard() {
  const tasks = await getTasks();
  return (
    <main className="min-h-screen p-10">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-black">Kanban Board</h1>
          <p className="text-black/60">
            Visualiza tus tareas por estado y sigue su avance de un vistazo.
          </p>
        </div>
        <CreateTask />
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        {columns.map((column) => {
          const columnTasks = tasks.filter((task) => task.status === column.id);

          return (
            <section key={column.id}>
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-black">
                  {column.title}
                </h2>
                <span className="rounded-full bg-black/5 px-3 py-1 text-sm text-black/60">
                  {columnTasks.length}
                </span>
              </div>

              <div className="flex min-h-80 flex-col gap-4 ">
                {columnTasks.length === 0 ? (
                  <div className="flex items-center justify-center rounded-xl border border-dashed border-gray-300 p-6 text-center text-sm text-black/50">
                    {column.emptyLabel}
                  </div>
                ) : (
                  columnTasks.map((task) => {
                    return (
                      <Card className=" gap-0" key={task.id}>
                        <CardHeader className="pb-3">
                          <CardTitle className="text-base">
                            {task.title}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3 text-sm text-black/60 flex  flex-col gap-2">
                          <div className="flex  gap-3">
                            {task.tags.map((tag) => (
                              <Badge variant={"secondary"} key={tag.id}>
                                {tag.name}
                              </Badge>
                            ))}
                          </div>
                          <Progress value={52} />
                          <div className="flex items-center justify-between">
                            <span>{task.project?.name ?? "Sin proyecto"}</span>
                            <span className="flex items-center gap-1">
                              <Calendar size={15} />
                              {task.dueDate
                                ? format(task.dueDate, "dd MMM ", {
                                    locale: es,
                                  })
                                : "Sin fecha"}
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })
                )}
              </div>
            </section>
          );
        })}
      </div>
    </main>
  );
}
