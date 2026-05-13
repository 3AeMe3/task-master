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
import CreateProject from "@/features/projects/components/create-project";
import { getProjects } from "@/lib/api/projets";

type ProjectType = {
  id: number;
  name: string;
  userId: number;
  description: string;
};

export default async function Projects() {
  const projects = await getProjects();
  console.log(projects);
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
      <div className="text-white cursor-pointer bg-linear-to-r from-indigo-400 to-indigo-500 w-full h-32 rounded-2xl grid grid-cols-3 items-center  px-5 mt-5">
        <div>
          <p className="text-lg">Proyectos Totales</p>
          <span className="text-2xl font-semibold">1</span>
        </div>
        <div>
          <p className="text-lg">Proyectos Activos</p>
          <span className="text-2xl font-semibold">1</span>
        </div>
        <div>
          <p className="text-lg">Porcentaje de Completados</p>
          <span className="text-2xl font-semibold">29%</span>
        </div>
      </div>
      <div className="  my-5">
        <h2 className="font-semibold text-xl">Proyectos activos</h2>
        <div className="grid grid-cols-4 gap-5 mt-5">
          {projects.map((project: ProjectType) => (
            <Card key={project.id}>
              <CardHeader>
                <span className="bg-purple-600 h-12 w-12 rounded-xl">Img</span>
                <CardTitle>{project.name}</CardTitle>
                <CardDescription>
                  {project.description || "No description"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Field>
                  <FieldLabel className=" flex justify-between">
                    <span>Progress</span>

                    <span>68%</span>
                  </FieldLabel>
                  <Progress value={68} max={100}>
                    68%
                  </Progress>
                </Field>
                <div className="w-full flex justify-between">
                  <span className="text-sm text-black/40">3/10 Tasks</span>
                  <span className="text-sm text-black/40">Apr 15</span>
                </div>
              </CardContent>
              <Separator />
              <CardFooter>
                <div className="w-full flex justify-between">
                  <span className="text-sm text-black/40">Image user</span>
                  <span className="text-sm text-green-600 ">Active</span>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
