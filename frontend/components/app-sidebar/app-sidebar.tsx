"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import {
  CircleCheckBig,
  EllipsisVertical,
  FolderKanban,
  Kanban,
  LayoutDashboard,
  LogOut,
  PanelLeft,
  SquareCheckBig,
} from "lucide-react";
import { usePathname } from "next/navigation";

import { logoutAction } from "@/features/auth/actions/logout-action";

import {
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  Sidebar,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "../ui/sidebar";
import GroupContent from "./group-content";
import { DropdownMenu } from "../ui/dropdown-menu";
import {
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "../ui/dropdown-menu";
import { Avatar } from "../ui/avatar";
import { AvatarImage, AvatarFallback } from "../ui/avatar";
import { getCurrentUser } from "@/features/dashboard-home/services/current-user.server";
import { CurrentUser } from "@/features/dashboard-home/types/current-user.types";
import { grabFirstLetter } from "@/lib/utils/formater";

export default function AppSideBar() {
  const [currentUser, SetCurrentUser] = useState<CurrentUser>();
  const pathName = usePathname();
  const { isMobile, setOpen, open } = useSidebar();

  useEffect(() => {
    const getCurrentUserData = async () => {
      try {
        const data = await getCurrentUser();
        SetCurrentUser(data);
      } catch (error) {
        console.log("Error fetching user data:", error);
      }
    };

    getCurrentUserData();
  }, [SetCurrentUser]);

  const firstLetterName = grabFirstLetter(currentUser?.name || "user name");

  return (
    <Sidebar variant="inset" collapsible="icon">
      <PanelLeft
        className="absolute right-0 translate-x-8 top-4 bottom-3 text-black/60 hover:text-black"
        onClick={() => setOpen(!open)}
      />
      <SidebarHeader className="border-gray-300 border-b ">
        <div className="flex gap-3 items-center justify-center  ">
          <CircleCheckBig className=" " />
          {open && <span className="font-semibold text-xl">TaskMaster</span>}
        </div>
      </SidebarHeader>
      <SidebarContent className=" flex mt-10 ">
        <GroupContent>
          <Link
            href={"/home"}
            className={`flex items-center gap-3 text-gray-600 w-full p-3 rounded-xl font-semibold ${pathName === "/home" ? " text-white bg-linear-to-r from-violet-400 to-indigo-500 " : ""}`}
          >
            <LayoutDashboard />
            {open && <span>Dashboard</span>}
          </Link>
          <Link
            href={"/tasks"}
            className={`flex items-center gap-3 text-gray-600 w-full p-3 rounded-xl font-semibold  ${pathName === "/tasks" ? " text-white bg-linear-to-r from-violet-400 to-indigo-500 " : ""}`}
          >
            <SquareCheckBig />
            {open && <span>All Tasks</span>}
          </Link>
          <Link
            href={"/board"}
            className={`flex items-center gap-3 text-gray-600 w-full p-3 rounded-xl font-semibold ${pathName === "/board" ? " text-white bg-linear-to-r from-violet-400 to-indigo-500 " : ""}`}
          >
            <Kanban />
            {open && <span>Kanban Board</span>}
          </Link>
          <Link
            href={"/projects"}
            className={`flex items-center gap-3 text-gray-600 w-full p-3 rounded-xl font-semibold   ${pathName === "/projects" ? " text-white bg-linear-to-r from-violet-400 to-indigo-500 " : ""}`}
          >
            <FolderKanban />
            {open && <span>Projects</span>}
          </Link>
        </GroupContent>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <Avatar className="h-8 w-8 rounded-lg grayscale">
                    <AvatarImage src="#" alt={"Avatar user name"} />
                    <AvatarFallback className="rounded-lg">
                      {firstLetterName}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">
                      {currentUser?.name || "user name"}
                    </span>
                    <span className="truncate text-xs text-muted-foreground">
                      {currentUser?.email || "user email"}
                    </span>
                  </div>
                  <EllipsisVertical className="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                side={isMobile ? "bottom" : "right"}
                align="end"
                sideOffset={4}
              >
                <DropdownMenuLabel className="p-0 font-normal">
                  <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarImage
                        src="#"
                        alt={`a user called ${currentUser?.name}  `}
                      />
                      <AvatarFallback className="rounded-lg">
                        {firstLetterName}
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-medium">
                        {currentUser?.name || "user name"}
                      </span>
                      <span className="truncate text-xs text-muted-foreground">
                        {currentUser?.email || "user email"}
                      </span>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logoutAction}>
                  <LogOut />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
