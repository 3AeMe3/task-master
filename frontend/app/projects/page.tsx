import CreateProject from "@/features/projects/components/create-project";

export default function Projects() {
  return (
    <div className="p-10">
      <div className="flex justify-between items-center h-30">
        <div>
          <h2 className="text-3xl font-bold">Proyectos</h2>
          <p className="text-black/60">
            Sigue tu progreso atraves de todos tus proyectos
          </p>
        </div>
        <CreateProject />
      </div>
      <div className="text-white cursor-pointer bg-linear-to-r from-indigo-400 to-indigo-500 w-full h-32 rounded-2xl grid grid-cols-3 items-center  px-5">
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
      <div className="font-semibold text-xl">
        <h2>Proyectos activos</h2>
      </div>
    </div>
  );
}
