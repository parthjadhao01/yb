"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminUsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    const res = await axios.get("http://localhost:3000/api/admin/users");
    setUsers(res.data.users);
    setLoading(false);
  };

  useEffect(() => { fetchUsers(); }, []);

  const toggleUser = async (id: string) => {
    await axios.put(`http://localhost:3000/api/admin/users/${id}/toggle`);
    fetchUsers();
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Users</h1>
      <div className="overflow-x-auto bg-white rounded shadow p-4">
        {loading ? <p>Loading...</p> : (
          <table className="w-full text-left">
            <thead>
              <tr>
                <th>Name</th><th>Email</th><th>Role</th><th>Active</th><th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u.id} className="border-t">
                  <td className="py-2">{u.name}</td>
                  <td>{u.email}</td>
                  <td>{u.role}</td>
                  <td>{u.active ? "Yes" : "No"}</td>
                  <td>
                    <button onClick={() => toggleUser(u.id)} className="px-3 py-1 bg-indigo-600 text-white rounded">
                      {u.active ? "Deactivate" : "Activate"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
