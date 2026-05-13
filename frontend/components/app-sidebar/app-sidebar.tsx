"use client";

import Link from "next/link";

import {
  Bell,
  CircleCheckBig,
  CreditCard,
  EllipsisVertical,
  FolderKanban,
  Kanban,
  LayoutDashboard,
  LogOut,
  SquareCheckBig,
  UserCircle,
} from "lucide-react";
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
import { usePathname } from "next/navigation";
import { DropdownMenu } from "../ui/dropdown-menu";
import {
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuItem,
} from "../ui/dropdown-menu";
import { Avatar } from "../ui/avatar";
import { AvatarImage, AvatarFallback } from "../ui/avatar";

export default function AppSideBar() {
  const pathName = usePathname();
  const { isMobile } = useSidebar();

  const handleLogOut = async () => {
    await fetch("http://localhost:4000/logOut", {
      method: "POST",
      credentials: "include",
    });
    window.location.href = "/login";
  };
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
            href={"/home"}
            className={`flex items-center gap-3 text-gray-600 w-full p-3 rounded-xl font-semibold ${pathName === "/home" ? " text-white bg-gradient-to-r from-violet-400 to-indigo-500 " : ""}`}
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
                    <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">username</span>
                    <span className="truncate text-xs text-muted-foreground">
                      user email
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
                      <AvatarImage src="#" alt={"user name"} />
                      <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-medium">username</span>
                      <span className="truncate text-xs text-muted-foreground">
                        nombre del usuario o email
                      </span>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <UserCircle />
                    Account
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <CreditCard />
                    Billing
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Bell />
                    Notifications
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogOut}>
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
