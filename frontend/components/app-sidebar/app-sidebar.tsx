"use client";

import Link from "next/link";

import {
  CircleCheckBig,
  FolderKanban,
  Kanban,
  LayoutDashboard,
  SquareCheckBig,
} from "lucide-react";
import {
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  Sidebar,
} from "../ui/sidebar";
import GroupContent from "./group-content";
import { usePathname } from "next/navigation";

export default function AppSideBar() {
  const pathName = usePathname();
  return (
    <Sidebar variant="inset" collapsible="icon">
      <SidebarHeader className="border-gray-300 border-b ">
        <div className="flex gap-3 items-center justify-center  ">
          <CircleCheckBig className=" " />
          <span className="font-semibold text-xl">TaskMaster</span>
        </div>
      </SidebarHeader>
      <SidebarContent className="px-4 flex mt-10 ">
        <GroupContent>
          <Link
            href={"/"}
            className={`flex items-center gap-3 text-gray-600 w-full p-3 rounded-xl font-semibold ${pathName === "/" ? " text-white bg-gradient-to-r from-violet-400 to-indigo-500 " : ""}`}
          >
            <LayoutDashboard />
            <span>Dashboard</span>
          </Link>
          <Link
            href={"/tasks"}
            className={`flex items-center gap-3 text-gray-600 w-full p-3 rounded-xl font-semibold  ${pathName === "/tasks" ? " text-white bg-gradient-to-r from-violet-400 to-indigo-500 " : ""}`}
          >
            <SquareCheckBig />
            <span>All Tasks</span>
          </Link>
          <Link
            href={"/board"}
            className={`flex items-center gap-3 text-gray-600 w-full p-3 rounded-xl font-semibold ${pathName === "/board" ? " text-white bg-gradient-to-r from-violet-400 to-indigo-500 " : ""}`}
          >
            <Kanban />
            <span>Kanban Board</span>
          </Link>
          <Link
            href={"/projects"}
            className={`flex items-center gap-3 text-gray-600 w-full p-3 rounded-xl font-semibold   ${pathName === "/projects" ? " text-white bg-linear-to-r from-violet-400 to-indigo-500 " : ""}`}
          >
            <FolderKanban />
            <span>Projects</span>
          </Link>
        </GroupContent>
      </SidebarContent>
      <SidebarFooter>
        <span>este es el footer</span>
      </SidebarFooter>
    </Sidebar>
  );
}
