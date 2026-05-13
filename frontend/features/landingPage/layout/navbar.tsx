"use client";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
export default function Navbar() {
  const [activeNav, setActiveNav] = useState(false);
  const mobileLinks = [
    { href: "/", label: "Home" },
    { href: "/login", label: "Login" },
    { href: "/register", label: "Register" },
  ];

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
