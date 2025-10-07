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
    title: "User Management",
    url: "/admin/usermanagement",
    icon: Home,
  },
  {
    title: "Property Management",
    url: "/admin/propertymanagement",
    icon: File,
  },
  {
    title: "Rent Management",
    url: "/admin/rentmanagements",
    icon: HandCoinsIcon,
  },
  {
    title: "Maintenance Requests",
    url: "/admin/maintenance",
    icon: PaintRoller,
  },
  {
    title: "Notifications",
    url: "#",
    icon: Bell,
  },
]

export default function AdminSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Admin</SidebarGroupLabel>
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