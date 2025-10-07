"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminMaintenancePage() {
  const [items, setItems] = useState<any[]>([]);

  const fetch = async () => {
    const res = await axios.get("http://localhost:4000/api/admin/maintenance");
    setItems(res.data.maintenance);
  };
  useEffect(() => { fetch(); }, []);

  const updateStatus = async (id: string, status: string) => {
    await axios.put(`http://localhost:3000/api/admin/maintenance/${id}`, { status });
    fetch();
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Maintenance Requests</h1>
      <div className="bg-white rounded shadow p-4 overflow-x-auto">
        <table className="w-full">
          <thead><tr><th>Property</th><th>Tenant</th><th>Problem</th><th>Status</th><th>Date</th><th>Action</th></tr></thead>
          <tbody>
            {items.map(m => (
              <tr key={m.id} className="border-t">
                <td className="py-2">{m.propertyId}</td>
                <td>{m.tenant}</td>
                <td>{m.problem}</td>
                <td>{m.status}</td>
                <td>{m.date}</td>
                <td>
                  {m.status !== "done" && (
                    <>
                      <button onClick={() => updateStatus(m.id, "started")} className="px-2 py-1 mr-2 bg-yellow-500 text-white rounded">Start</button>
                      <button onClick={() => updateStatus(m.id, "done")} className="px-2 py-1 bg-green-600 text-white rounded">Mark Done</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
