import { Card } from "@/components/ui/card";
import { getProjects } from "@/features/projects/services/project.server";
import { getTasks } from "../services/task.server";
import { Progress } from "@/components/ui/progress";

export default async function TaskSummary() {
  const [projects, tasks] = await Promise.all([getProjects(), getTasks()]);

  const projectWithStats = projects.map((project) => {
    const projectTask = tasks.filter((task) => task.projectId === project.id);
    const completedTask = projectTask.filter(
      (task) => task.status === "COMPLETADO",
    ).length;
    const totalTask = projectTask.length;
    const progress =
      totalTask === 0 ? 0 : Math.round((completedTask / totalTask) * 100);

    return {
      progress,
      projectName: project.name,
    };
  });

  return (
    <Card className="h-full w-full p-5 xl:max-w-sm">
      <div className="flex h-full flex-col justify-between gap-6">
        <div>
          <h3 className="text-lg font-semibold">Progreso de los Proyectos</h3>
        </div>
        <div className=" items-center justify-center h-full flex gap-4 flex-col">
          {projectWithStats.map((project) => (
            <div
              key={project.projectName}
              className="w-full h-16 flex flex-col gap-2"
            >
              <div className="flex justify-between">
                <span className="font-medium ">{project.projectName}</span>
                <span className="text-black/60">{project.progress}%</span>
              </div>
              <Progress value={project.progress} />
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
