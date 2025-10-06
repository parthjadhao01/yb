import React from "react";
import { SidebarProvider,SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSideBar";

export default function LandlordLayout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <AppSidebar />
                <main>
                    {children}
                    <SidebarTrigger />
                </main>
        </SidebarProvider>
    );
}