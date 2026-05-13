import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <main className="min-h-screen relative px-6   md:max-w-3/4 mx-auto">
      <div className="flex flex-col items-center justify-center gap-6 h-screen  ">
        <h1 className="font-bold text-5xl flex-wrap text-center">
          Tus Tareas, Finalmente Bajo Control
        </h1>
        <p className="text-md text-gray-300 text-center">
          Planea, sigue y completa tus tareas con un sistema diseñado para
          seguir tu progreso y mantenerte enfocado.
        </p>
        <Button
          className="btn-primary  hover:scale-105 transition-all duration-300 cursor-pointer  "
          size={"lg"}
          variant={"default"}
        >
          <Link href={"/register"}>Comienza Ahora</Link>
        </Button>
        <Image
          src={"/mockup/mockupHd.webp"}
          alt="mockup image"
          width={400}
          height={400}
        />
      </div>
    </main>
  );
}
