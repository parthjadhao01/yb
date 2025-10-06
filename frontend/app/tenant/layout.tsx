"use client";
import React, { useEffect, useState } from "react";
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import TenantSideBar from "@/components/TenantSideBar";
import { NavUser } from "@/components/NavUser";
import { useRouter } from "next/navigation";

export default function LandlordLayout({ children }: { children: React.ReactNode }) {
    const [isAuth,setIsAuth] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setIsAuth(true);
        } else {
            setIsAuth(false);
            router.push("/login");
        }
    }, [router]);

    if (!isAuth) {
        return null;
    }

    return (
        <SidebarProvider>
            <TenantSideBar />
            <main className="w-full">
                <div className="border-b flex justify-between items-center px-4 py-2">
                    <SidebarTrigger />
                    <div className="w-45">
                        <NavUser user={{ name: "John Doe", email: "john@example.com", avatar: "https://via.placeholder.com/150" }} />
                    </div>
                </div>
                {children}
            </main>
        </SidebarProvider>
    );
}