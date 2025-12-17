import React from "react";
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  Settings, 
  Activity, 
  FileText, 
  LogOut,
  Bell
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarSeparator,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuBadge,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
export function AppSidebar(): JSX.Element {
  return (
    <Sidebar>
      <SidebarHeader className="h-16 border-b border-sidebar-border flex items-center px-4">
        <div className="flex items-center gap-2 w-full">
          <div className="h-8 w-8 rounded-lg bg-teal-600 flex items-center justify-center shadow-sm">
            <Activity className="h-5 w-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold leading-none tracking-tight text-sidebar-foreground">MediPulse Pro</span>
            <span className="text-[10px] font-medium text-muted-foreground">Clinical Command</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="px-2 py-4">
        <SidebarGroup>
          <SidebarGroupLabel>Main Navigation</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive tooltip="Dashboard">
                <a href="/" className="flex items-center gap-3">
                  <LayoutDashboard className="h-4 w-4" /> 
                  <span>Dashboard</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Patients">
                <a href="/patients" className="flex items-center gap-3">
                  <Users className="h-4 w-4" /> 
                  <span>Patients</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Schedule">
                <a href="/schedule" className="flex items-center gap-3">
                  <Calendar className="h-4 w-4" /> 
                  <span>Schedule</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup className="mt-4">
          <SidebarGroupLabel>Clinical Tools</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Reports">
                <a href="/reports" className="flex items-center gap-3">
                  <FileText className="h-4 w-4" /> 
                  <span>Reports</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Alerts">
                <a href="/alerts" className="flex items-center gap-3">
                  <Bell className="h-4 w-4" /> 
                  <span>Alerts</span>
                </a>
              </SidebarMenuButton>
              <SidebarMenuBadge className="bg-rose-500 text-white hover:bg-rose-600">3</SidebarMenuBadge>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
        <SidebarSeparator className="my-4" />
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Settings">
                <a href="/settings" className="flex items-center gap-3">
                  <Settings className="h-4 w-4" /> 
                  <span>Settings</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t border-sidebar-border p-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8 border border-border">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>DR</AvatarFallback>
          </Avatar>
          <div className="flex flex-col flex-1 min-w-0">
            <span className="text-xs font-medium truncate text-sidebar-foreground">Dr. Sarah Chen</span>
            <span className="text-[10px] text-muted-foreground truncate">Cardiology Head</span>
          </div>
          <button className="text-muted-foreground hover:text-foreground transition-colors">
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}