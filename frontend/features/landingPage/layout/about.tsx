import CardGlass from "@/components/card-glass";
export default function About() {
  return (
    <div className="flex flex-col gap-4 px-3 text-left min-h-screen items-center justify-center">
      <h2 className="font-semibold text-3xl w-3/4 mx-auto mb-4 text-center ">
        Porqué elegir a ANKTM?
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2  gap-4 max-w-5xl mx-auto">
        <CardGlass
          title="Organiza Tareas Sin Friccion"
          description="Crea, edit y maneja tareas en segundos con una limpia e intuitiva interfaz"
        />
        <CardGlass
          title="Nunca Pierdas Un Deadline"
          description="Coloca fechas limites, sigue el progreso y mantente por delante de tu trabajo"
        />
        <CardGlass
          title="Enfocado En Lo Que Realmente Importa"
          description="Prioriza tus tareas y elimina distracciones con un simple flujo de trabajo"
        />
        <CardGlass
          title="Tu Datos, Tu Espacio"
          description="Sigue tus tareas privadas y accesibles en cualquier momento y en cualquier lugar"
        />
      </div>
    </div>
  );
}
