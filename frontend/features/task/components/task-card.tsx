import { Card, CardContent, CardFooter } from "@/components/ui/card";
import CreateTask from "../create-task";
import Image from "next/image";

export default function TaskCard() {
  return (
    <Card className="w-full h-full max-w-sm text-white bg-indigo-500 flex  justify-center items-center ">
      <CardContent className="text-center border flex justify-center flex-col items-center">
        <Image src={"/rocket.webp"} width={100} height={100} alt="rocket" />
        <p>No hay Tareas para Hoy</p>
        <p>Puedes crear una tarea nueva</p>
      </CardContent>
      <CardFooter>
        <CreateTask />
      </CardFooter>
    </Card>
  );
}
