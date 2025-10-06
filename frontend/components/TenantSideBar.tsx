import { Calendar, Home, Inbox, Search, Settings, User,File,HandCoinsIcon,PaintRoller,Bell,CoinsIcon } from "lucide-react"


import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

// Menu items.
const items = [
  {
    title: "My Applications",
    url: "/tenant/application",
    icon: File,
  },
  {
    title: "My Payments",
    url: "/tenant/payments",
    icon: CoinsIcon,
  },
  {
    title: "Maintenance Requests",
    url: "/tenant/maintenance",
    icon: PaintRoller,
  },
  {
    title: "Notifications",
    url: "/tenant/notifications",
    icon: Bell,
  },
]

export default function TenantSidebar() {
  return (
    <Sidebar collapsible="offcanvas">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Tenant</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}