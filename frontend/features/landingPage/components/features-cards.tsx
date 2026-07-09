import CardGlass from '@/components/card-glass';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { FolderArchive, MessageSquare, Plus } from 'lucide-react';

export const Authentication = () => {
  return (
    <CardGlass
      className="lg:col-start-1 lg:col-end-3 2xl:col-span-7"
      feature="Autenticación"
      title="Cuentas Seguras"
      description="SSO, magic links, y oAuth"
      aosDelay="100"
    >
      <Card className="border-white/20 bg-[#161f30]">
        <form method="GET" className="flex flex-col gap-4 px-6">
          <FieldLabel className="text-white/40">Email</FieldLabel>
          <Input
            type="email"
            placeholder="email@gmail.com"
            className="border-white/20 bg-[#242c3c] text-white"
          />
          <FieldLabel className="text-white/40">Password</FieldLabel>
          <Input
            type="password"
            placeholder="*****"
            className="border-white/20 bg-[#242c3c] text-white"
          />
          <Button type="button" className="bg-indigo-600">
            Sign In
          </Button>
        </form>
      </Card>
    </CardGlass>
  );
};

export const Tags = () => {
  return (
    <CardGlass
      className="lg:col-span-1 2xl:col-span-5"
      feature="Etiquetas"
      title="Etiquetas Flexibles"
      description="Crea o añade multiples tags que harán la diferencia  "
      aosDelay="200"
    >
      <div className="flex flex-1 flex-col items-center justify-center gap-4">
        <Badge className="bg-red-900 text-red-300">Tags</Badge>
        <Badge className="bg-blue-900 text-blue-300">Con colores</Badge>

        <Badge className="bg-green-900 text-green-300">Para una</Badge>

        <Badge className="bg-purple-900 text-purple-300">Mejor</Badge>
        <Badge className="bg-orange-900 text-orange-300">Organización</Badge>
      </div>
    </CardGlass>
  );
};

export const Comments = () => {
  return (
    <CardGlass
      className="lg:col-span-1 2xl:col-span-4"
      feature="Comentarios"
      title="Crea Comentarios"
      description="Añade comentarios a cada Tarea"
      aosDelay="300"
    >
      <div className="flex flex-1 items-center justify-center">
        <div className="flex h-full w-full flex-col gap-3 rounded-xl border border-white/20 bg-[#161f30] p-4">
          <div className="flex gap-2">
            <MessageSquare />
            <span className="text-xl font-semibold">Comentarios</span>
          </div>

          <Textarea
            placeholder="Escribe un comentario..."
            className="flex-1 rounded-lg border border-white/20 px-2"
          />
          <Button className="self-end" variant={'secondary'}>
            Comentar
          </Button>
        </div>
      </div>
    </CardGlass>
  );
};
export const ProgressFeat = () => {
  return (
    <CardGlass
      className="2xl:col-span-4"
      feature="Progreso"
      title="Progreso de tus Proyectos/Tareas"
      description="Sigue tu progreso que cambia dinamicamente mediante las tareas y subtareas"
      aosDelay="400"
    >
      <div className="flex flex-1 flex-col items-center justify-center gap-4">
        <Card className="w-full flex-1 border border-white/20 bg-[#161f30] text-white">
          <CardContent className="text-sm">
            <div className="flex flex-col gap-1">
              <FolderArchive />
              <span className="font-semibold">Title</span>
              <span className="text-white/40">Description</span>
            </div>
            <div className="my-2 flex flex-col gap-2">
              <div className="flex justify-between">
                <span>Progress</span>
                <span>25%</span>
              </div>
              <Progress value={25} className="bg-white" />
              <div className="flex justify-between">
                <span>1/4</span>
                <span>23-06-2026</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </CardGlass>
  );
};
export const SubTask = () => {
  return (
    <CardGlass
      className="h-full 2xl:col-span-4"
      feature="Sub-Tareas"
      title="Crea Sub-Tareas"
      description="Añade sub-tareas para mayor precisión"
      aosDelay="500"
    >
      <div className="flex flex-1 flex-col items-center justify-center gap-4">
        <Card className="w-full flex-1 items-center justify-center border border-white/20 bg-[#161f30] text-white">
          <CardContent className="text-sm">
            <div className="flex flex-col gap-2">
              <Input type="text" placeholder="Ej. Completar Tarea #1" />
              <Button variant={'secondary'}>
                <Plus />
                Agregar
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </CardGlass>
  );
};
