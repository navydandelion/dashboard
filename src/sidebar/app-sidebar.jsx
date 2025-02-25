import { Link } from "react-router-dom";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

import {
  Home,
  BarChart,
  Calendar,
  Stethoscope,
  Bell,
  Settings2,
  LogOut,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

// Define menu items with route paths
const menuItems = [
  { title: "Dashboard", url: "/Dashboard", icon: Home },
  { title: "Analytics", url: "/Analytics", icon: BarChart },
  { title: "Appointments", url: "/Appointments", icon: Calendar },
  { title: "Surgery", url: "/Surgery", icon: Stethoscope },
  { title: "Reception", url: "/Reception", icon: Bell },
];

const menuItemsTwo = [
  { title: "Settings", url: "/Settings", icon: Settings2 },
  { title: "Log out", url: "/logout", icon: LogOut },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <div className="flex items-center gap-3 p-4">
            <Avatar className="bor">
              <AvatarImage src="user-photo.jpg" alt="User Name" />
              <AvatarFallback>UN</AvatarFallback>
            </Avatar>
            <div>
              <h4 className="text-sm font-medium">User Name</h4>
              <p className="text-xs text-gray-500">user@example.com</p>
            </div>
          </div>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton>
                    <Link to={item.url} className="flex items-center gap-2">
                      <item.icon className="w-5 h-5" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
            <hr className="mt-5 mb-5" />
            <SidebarMenu>
              {menuItemsTwo.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton>
                    <Link to={item.url} className="flex items-center gap-2">
                      <item.icon className="w-5 h-5" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
