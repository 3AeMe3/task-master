"use client";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
export default function Navbar() {
  const [activeNav, setActiveNav] = useState(false);
  return (
    <header className="relative   ">
      <nav className="hidden lg:flex p-4 z-100 w-3/4  mx-auto ">
        <div className={`w-full justify-between flex items-center`}>
          <span className="font-semibold text-xl">ANKTM</span>
          <ul className="flex gap-10 text-lg font-medium">
            <li>
              <Link href={"/"}>Home</Link>
            </li>
            <li>
              <a>About Us</a>
            </li>
            <li>
              <a>Features</a>
            </li>
          </ul>
          <ul className="flex gap-5 text-lg font-medium">
            <li>
              <Link href={"/login"}>Login</Link>
            </li>
            <li>
              <Link href={"/register"}>Register</Link>
            </li>
          </ul>
        </div>
      </nav>
      <nav className="lg:hidden my-5 fixed left-0 right-0  px-6 z-100  ">
        <div className={`w-full justify-between flex items-center`}>
          <span className="font-semibold text-xl">ANKTM</span>

          <Button
            onClick={() => setActiveNav((prev) => !prev)}
            variant={"ghost"}
            size={"lg"}
            className="bg-white/20"
          >
            <Menu />
          </Button>
        </div>
        <div className="absolute right-0  px-6  -z-10  text-white w-full">
          {activeNav && (
            <ul
              className={` text-center flex flex-col gap-5 py-5 text-2xl font-semibold list-anim ${activeNav ? "animate-fade-in " : "animate-fade-out "} `}
            >
              <li>Home</li>
              <li>Home 2</li>
              <li>Home 3</li>
              <li>Home 4</li>
            </ul>
          )}
        </div>
      </nav>
      <div
        className={`lg:hidden h-screen w-full flex items-center justify-center fixed  z-10 bg-black/80 list-anim ${activeNav ? "animate-fade-in " : "animate-fade-out"} `}
      ></div>
    </header>
  );
}
