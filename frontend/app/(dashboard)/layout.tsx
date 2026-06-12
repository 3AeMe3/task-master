import type { Metadata } from "next";

import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import AppSideBar from "@/components/app-sidebar/app-sidebar";

export const metadata: Metadata = {
  title: "TaskMaster",
  description: "Project to put on practice my next.js knowledge",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <AppSideBar />
      <SidebarInset>
        <div className="text-black">
          <TooltipProvider>{children}</TooltipProvider>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
