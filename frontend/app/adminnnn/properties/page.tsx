"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminPropertiesPage() {
  const [properties, setProperties] = useState<any[]>([]);

  const fetch = async () => {
    const res = await axios.get("http://localhost:3000/api/admin/properties");
    setProperties(res.data.properties);
  };
  useEffect(() => { fetch(); }, []);

  const remove = async (id: string) => {
    if (!confirm("Delete property?")) return;
    await axios.delete(`http://localhost:3000/api/admin/properties/${id}`);
    fetch();
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Properties</h1>
      <div className="bg-white rounded shadow p-4 overflow-x-auto">
        <table className="w-full">
          <thead><tr><th>Title</th><th>Price</th><th>Owner</th><th>Status</th><th>Action</th></tr></thead>
          <tbody>
            {properties.map(p => (
              <tr key={p.id} className="border-t">
                <td className="py-2">{p.title}</td>
                <td>₹{p.price}</td>
                <td>{p.owner}</td>
                <td>{p.status}</td>
                <td><button onClick={() => remove(p.id)} className="px-3 py-1 bg-red-600 text-white rounded">Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

