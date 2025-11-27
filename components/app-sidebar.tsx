"use client";

import * as React from "react";
import { IconListDetails } from "@tabler/icons-react";

import { NavMain } from "@/components/nav-main";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { FolderOpen, MessageSquare, Users } from "lucide-react";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/",
      icon: Users,
    },
    {
      title: "Clients",
      url: "/clients",
      icon: Users,
    },
    {
      title: "Projects",
      url: "/projects",
      icon: FolderOpen,
    },
    {
      title: "Testimonial",
      url: "/testimonial",
      icon: MessageSquare,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <div>
              <span className="text-base font-semibold">
                Karrar Design Projects{" "}
              </span>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
    </Sidebar>
  );
}
