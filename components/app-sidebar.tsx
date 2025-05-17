"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart3, Database, AlertTriangle, FileText, AlertCircle, Home } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export function AppSidebar() {
  const pathname = usePathname()

  const navItems = [
    {
      title: "Dashboard",
      href: "/",
      icon: Home,
    },
    {
      title: "AI Systems",
      href: "/ai-systems",
      icon: Database,
    },
    {
      title: "Risk Assessment",
      href: "/risk-assessment",
      icon: AlertTriangle,
    },
    {
      title: "Policies",
      href: "/policies",
      icon: FileText,
    },
    {
      title: "Incident Reports",
      href: "/incident-reports",
      icon: AlertCircle,
    },
  ]

  return (
    <Sidebar className="border-r border-border z-50">
      <SidebarHeader className="flex items-center justify-center p-4 border-b border-border">
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 bg-primary/20 flex items-center justify-center rounded-md">
            <BarChart3 className="h-5 w-5 text-primary" />
          </div>
          <div className="font-bold text-lg text-white">
            AI MANAGEMENT
            <br />
            SYSTEM
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                isActive={pathname === item.href}
                className={pathname === item.href ? "bg-primary/10 text-primary" : ""}
              >
                <Link href={item.href}>
                  <item.icon className="h-5 w-5 mr-2" />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  )
}
