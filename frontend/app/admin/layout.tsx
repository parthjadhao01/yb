import React from "react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white shadow-sm p-4">
        <div className="container mx-auto flex items-center justify-between">
          <h2 className="font-bold text-xl">Admin Panel</h2>
          <nav>
            <a href="/admin/dashboard" className="mr-4">Dashboard</a>
            <a href="/admin/users" className="mr-4">Users</a>
            <a href="/admin/properties" className="mr-4">Properties</a>
            <a href="/admin/maintenance">Maintenance</a>
          </nav>
        </div>
      </header>

      <main className="container mx-auto p-6">{children}</main>
    </div>
  );
}
