'use client';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
  return (
    <main className="relative mx-auto flex min-h-[120vh] items-end justify-center px-6 lg:min-h-[110vh] lg:max-w-3/4 xl:max-w-3/4">
      <div className="mx-auto flex h-screen flex-col items-center justify-center gap-8 xl:w-3/6">
        <h1
          data-aos="fade-right"
          className="flex-wrap text-center text-5xl font-bold md:text-6xl xl:text-7xl"
        >
          Tus tareas,{' '}
          <span className="bg-linear-to-r from-indigo-600 to-violet-400 bg-clip-text text-transparent">
            finalmente
          </span>{' '}
          <span className="text-violet-400">controladas</span>
        </h1>
        <p className="text-md text-center text-gray-300/60 lg:text-xl">
          Planea, sigue y completa tus tareas con un sistema diseñado para
          seguir tu progreso y mantenerte enfocado.
        </p>
        <Button
          variant={'outline'}
          className="cursor-pointer border-none bg-indigo-600 hover:scale-105"
          size={'lg'}
        >
          <Link href={'/register'}>Comienza Ahora</Link>
        </Button>

        <Image
          data-aos="fade-up"
          data-aos-delay="100"
          src={'/mockup/mockupHd.webp'}
          alt="mockup image"
          width={1200}
          height={1200}
          className="overflow-y-hidden"
        />
      </div>
    </main>
  );
}
