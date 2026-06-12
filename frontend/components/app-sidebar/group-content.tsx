import { ReactNode } from "react";
import { SidebarGroupContent, SidebarGroupLabel } from "../ui/sidebar";

type PropsGroupContent = {
  label?: string;
  children?: ReactNode;
};

export default function GroupContent({ label, children }: PropsGroupContent) {
  return (
    <SidebarGroupContent className="flex gap-3 flex-col items-start ">
      {label && <SidebarGroupLabel className="px-0">{label}</SidebarGroupLabel>}
      {children}
    </SidebarGroupContent>
  );
}
