"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

export default function AdminDashboard() {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    axios.get("http://localhost:3000/api/admin/stats").then(res => setStats(res.data)).catch(console.error);
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-white rounded shadow">
          <p className="text-sm text-muted-foreground">Users</p>
          <p className="text-2xl font-bold">{stats?.users ?? "-"}</p>
          <Link href="/admin/users" className="text-sm text-primary hover:underline">Manage users</Link>
        </div>
        <div className="p-4 bg-white rounded shadow">
          <p className="text-sm text-muted-foreground">Properties</p>
          <p className="text-2xl font-bold">{stats?.properties ?? "-"}</p>
          <Link href="/admin/properties" className="text-sm text-primary hover:underline">Manage properties</Link>
        </div>
        <div className="p-4 bg-white rounded shadow">
          <p className="text-sm text-muted-foreground">Maintenance</p>
          <p className="text-2xl font-bold">{stats?.maintenance ?? "-"}</p>
          <Link href="/admin/maintenance" className="text-sm text-primary hover:underline">Manage maintenance</Link>
        </div>
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h2 className="font-semibold">Quick actions</h2>
        <div className="flex gap-2 mt-3">
          <Link href="/admin/users" className="px-3 py-2 bg-primary text-white rounded">Users</Link>
          <Link href="/admin/properties" className="px-3 py-2 bg-primary text-white rounded">Properties</Link>
          <Link href="/admin/maintenance" className="px-3 py-2 bg-primary text-white rounded">Maintenance</Link>
        </div>
      </div>
    </div>
  );
}
