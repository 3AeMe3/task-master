'use client';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { useState, useRef } from 'react';
import Link from 'next/link';
export default function Navbar() {
  const [activeNav, setActiveNav] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const mobileLinks = [
    { href: '/', label: 'Home' },
    { href: '/login', label: 'Login' },
    { href: '/register', label: 'Register' },
  ];
  return (
    <header className="relative">
      <nav
        ref={navRef}
        className="navbar z-100 mx-auto hidden w-3/4 p-4 lg:flex"
      >
        <div className={`flex w-full items-center justify-between`}>
          <div className="text-2xl font-semibold">
            <span>Ank</span>
            <span className="text-indigo-600">Task</span>
          </div>
          <ul className="flex gap-5 text-lg font-medium">
            <li>
              <Link href={'/login'}>
                <Button className="cursor-pointer bg-transparent hover:scale-105 hover:bg-transparent">
                  Log in
                </Button>
              </Link>
            </li>
            <li>
              <Link href={'/register'}>
                <Button
                  variant={'outline'}
                  className="cursor-pointer border-none bg-indigo-600 hover:scale-105"
                >
                  Empieza Ahora
                </Button>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      <nav className="fixed right-0 left-0 z-100 bg-black/20 px-6 py-3 backdrop-blur-sm lg:hidden">
        <div className={`flex w-full items-center justify-between`}>
          <span className="text-xl font-semibold">AnkTask</span>

          <Button
            onClick={() => setActiveNav((prev) => !prev)}
            variant={'ghost'}
            size={'lg'}
            className="bg-white/20"
          >
            <Menu />
          </Button>
        </div>
        <div className="absolute right-0 -z-10 w-full px-6 text-white">
          {activeNav && (
            <ul
              className={`list-anim flex flex-col gap-5 py-5 text-center text-2xl font-semibold ${activeNav ? 'animate-fade-in' : 'animate-fade-out'} `}
            >
              {mobileLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} onClick={() => setActiveNav(false)}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </nav>
      {activeNav ? (
        <div
          className="fixed z-10 h-screen w-full bg-black/80 lg:hidden"
          onClick={() => setActiveNav(false)}
        ></div>
      ) : null}
    </header>
  );
}
