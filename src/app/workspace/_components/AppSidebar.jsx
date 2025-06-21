"use client"
import Image from "next/image";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from "../../../components/ui/sidebar";
import { Button } from "../../../components/ui/button";
import {
  Book,
  Compass,
  LayoutDashboard,
  PencilRulerIcon,
  UserCircle2Icon,
  WalletCards
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import AddNewCourseDailog from "./AddNewCourseDailog"

const SideBarOptions = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    path: "/workspace"
  },
  {
    title: "My Learnings",
    icon: Book,
    path: "/workspace/my-courses"
  },
  {
    title: "Explore Courses",
    icon: Compass,
    path: "/workspace/explore"
  },
  {
    title: "AI Tools",
    icon: PencilRulerIcon,
    path: "/workspace/ai-tools"
  },
  {
    title: "Billing",
    icon: WalletCards,
    path: "/workspace/billing"
  },
  {
    title: "Profile",
    icon: UserCircle2Icon,
    path: "/workspace/profile"
  }
];

export function AppSidebar() {
  const path = usePathname();
  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <Image src="/logo.svg" alt="logo" width={240} height={240} />
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <AddNewCourseDailog>
          <Button className="hover:bg-orange-500 hover:text-white hover:border-orange-400 cursor-pointer">
            Create New Course
          </Button>
          </AddNewCourseDailog>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {SideBarOptions.map((item) => {
                const Icon = item.icon;
                const isActive = path.includes(item.path);
                return (
                  <SidebarMenuItem key={item.path}>
                    <SidebarMenuButton asChild>
                      <Link
                        href={item.path}
                        className={`p-5 flex items-center gap-3 rounded-md transition-colors cursor-pointer
                          ${isActive ? 'bg-orange-100 text-orange-500' : 'hover:bg-orange-50'}
                        `}
                      >
                        <Icon className="h-7 w-7" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter />
    </Sidebar>
  );
}
