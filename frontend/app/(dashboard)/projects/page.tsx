import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldLabel } from "@/components/ui/field";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { FolderKanban } from "lucide-react";
import CreateProject from "@/features/projects/components/create-project";
import { getProjects } from "@/features/projects/services/project.server";
import type { Project } from "@/features/projects/types/project.types";
import { getTasks } from "@/features/task/services/task.server";
import { dateFormater } from "@/lib/utils/formater";

type ProjectWithStats = {
  completedTasks: number;
  lastDueDate: string | null;
  progress: number;
  statusLabel: string;
  totalTasks: number;
} & Project;

export default async function Projects() {
  const [projects, tasks] = await Promise.all([getProjects(), getTasks()]);

  const projectsWithStats: ProjectWithStats[] = projects.map((project) => {
    const projectTasks = tasks.filter((task) => task.projectId === project.id);
    const completedTasks = projectTasks.filter(
      (task) => task.status === "COMPLETADO",
    ).length;
    const totalTasks = projectTasks.length;
    const progress =
      totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);
    const lastDueDate =
      projectTasks
        .map((task) => task.dueDate)
        .filter((dueDate): dueDate is string => Boolean(dueDate))
        .sort()[0] ?? null;

    return {
      ...project,
      completedTasks,
      totalTasks,
      progress,
      lastDueDate,
      statusLabel:
        totalTasks === 0
          ? "Sin tareas"
          : progress === 100
            ? "Completado"
            : "Activo",
    };
  });

  const totalProjects = projectsWithStats.length;
  const activeProjects = projectsWithStats.filter(
    (project) => project.statusLabel === "Activo",
  ).length;
  const completionPercentage =
    tasks.length === 0
      ? 0
      : Math.round(
          (tasks.filter((task) => task.status === "COMPLETADO").length /
            tasks.length) *
            100,
        );

  return (
    <div className="p-10 ">
      <div className="flex justify-between items-center h-30">
        <div>
          <h2 className="text-3xl font-bold">Proyectos</h2>
          <p className="text-black/60">
            Sigue tu progreso atraves de todos tus proyectos
          </p>
        </div>
        <CreateProject />
      </div>
      <div className="text-white  bg-linear-to-r from-indigo-400 to-indigo-500 w-full h-32 rounded-2xl grid grid-cols-3 items-center  px-5 mt-5">
        <div>
          <p className="text-lg">Proyectos Totales</p>
          <span className="text-2xl font-semibold">{totalProjects}</span>
        </div>
        <div>
          <p className="text-lg">Proyectos Activos</p>
          <span className="text-2xl font-semibold">{activeProjects}</span>
        </div>
        <div>
          <p className="text-lg">Porcentaje de Completados</p>
          <span className="text-2xl font-semibold">
            {completionPercentage}%
          </span>
        </div>
      </div>
      <div className="  my-5">
        <h2 className="font-semibold text-xl">Proyectos activos</h2>
        {projectsWithStats.length === 0 ? (
          <div className="mt-5 rounded-2xl border border-dashed border-gray-300 bg-white p-10 text-center text-black/50">
            Todavía no tienes proyectos creados.
          </div>
        ) : (
          <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
            {projectsWithStats.map((project) => (
              <Card key={project.id}>
                <CardHeader>
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100 text-purple-600">
                    <FolderKanban />
                  </span>
                  <CardTitle>{project.name}</CardTitle>
                  <CardDescription>
                    {project.description || "Sin descripción"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Field>
                    <FieldLabel className=" flex justify-between">
                      <span>Progress</span>

                      <span>{project.progress}%</span>
                    </FieldLabel>
                    <Progress value={project.progress} max={100}>
                      {project.progress}%
                    </Progress>
                  </Field>
                  <div className="w-full flex justify-between">
                    <span className="text-sm text-black/40">
                      {project.completedTasks}/{project.totalTasks} tareas
                    </span>
                    <span className="text-sm text-black/40">
                      {project.lastDueDate
                        ? dateFormater(project.lastDueDate)
                        : "Sin fecha"}
                    </span>
                  </div>
                </CardContent>
                <Separator />
                <CardFooter>
                  <div className="w-full flex justify-between">
                    <span className="text-sm text-black/40">
                      {project.totalTasks} tareas
                    </span>
                    <span
                      className={`text-sm ${
                        project.statusLabel === "Activo"
                          ? "text-green-600"
                          : project.statusLabel === "Completado"
                            ? "text-blue-600"
                            : "text-black/40"
                      } `}
                    >
                      {project.statusLabel}
                    </span>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
