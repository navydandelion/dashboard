import { SidebarProvider, SidebarTrigger } from "../components/ui/sidebar";
import { AppSidebar } from "./app-sidebar";
import { Outlet } from "react-router-dom";

export default function Layout({ children }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main>
      
        <SidebarTrigger />
      </main>
      <Outlet />
    </SidebarProvider>
  );
}
