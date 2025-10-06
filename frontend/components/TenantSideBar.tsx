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
    url: "#",
    icon: File,
  },
  {
    title: "My Payments",
    url: "#",
    icon: CoinsIcon,
  },
  {
    title: "Maintenance Requests",
    url: "#",
    icon: PaintRoller,
  },
  {
    title: "Notifications",
    url: "#",
    icon: Bell,
  },
]

export default function TenantSidebar() {
  return (
    <Sidebar>
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