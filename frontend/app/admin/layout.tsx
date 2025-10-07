"use client";
import React from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { NavUser } from "@/components/NavUser";
import AdminSidebar from "@/components/AdminSideBar";
export default function adminnLayout({ children }: { children: React.ReactNode }) {

    return (
        <SidebarProvider>
            <SidebarProvider>
                <AdminSidebar />
                <main className="w-full">
                    <div className="border-b flex justify-between items-center px-4 py-2">
                        <SidebarTrigger />
                        <div className="w-45">
                            <NavUser userDetails={{ name: "John Doe", email: "john@example.com", avatar: "https://via.placeholder.com/150", id: "123" }} userType="landlord" />
                        </div>
                    </div>
                    {children}
                </main>
            </SidebarProvider>
        </SidebarProvider>
    )

}