import { Calendar, Home, Inbox, Search, Settings, User,File,HandCoinsIcon,PaintRoller,Bell } from "lucide-react"


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
    title: "My Properties",
    url: "/landlord/myproperties",
    icon: Home,
  },
  {
    title: "Tenants Applications",
    url: "/landlord/tenantapplication",
    icon: File,
  },
  {
    title: "Rent Management",
    url: "/landlord/rentmanagements",
    icon: HandCoinsIcon,
  },
  {
    title: "Maintenance Requests",
    url: "/landlord/maintenance",
    icon: PaintRoller,
  },
  {
    title: "Notifications",
    url: "#",
    icon: Bell,
  },
]

export default function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Landlord</SidebarGroupLabel>
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