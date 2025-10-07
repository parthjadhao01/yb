"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type User = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  active?: boolean;
};

export default function AdminUserManagementPage() {
  const [tenants, setTenants] = useState<User[]>([]);
  const [landlords, setLandlords] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
  try {
    setLoading(true);
    const token = localStorage.getItem("token");

    const [tenantRes, landlordRes] = await Promise.all([
      axios.get("http://localhost:3000/api/admin/tenants", {
        headers: { Authorization: `Bearer ${token}` },
      }),
      axios.get("http://localhost:3000/api/admin/landlords", {
        headers: { Authorization: `Bearer ${token}` },
      }),
    ]);

    // ✅ Correctly access array fields
    setTenants(tenantRes.data.tenants || []);
    setLandlords(landlordRes.data.landlords || []);
  } catch (err: any) {
    console.error("Error fetching users:", err.response?.data || err.message);
    alert("Failed to load user data.");
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchUsers();
  }, []);

  const toggleUserStatus = async (id: string, type: "tenant" | "landlord", current: boolean) => {
    try {
      const token = localStorage.getItem("token");
      await axios.patch(
        `http://localhost:3000/api/admin/${type}/${id}/status`,
        { active: !current },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert(`${type} status updated!`);
      fetchUsers(); // refresh list
    } catch (err: any) {
      console.error("Status update failed:", err.response?.data || err.message);
      alert("Failed to update user status.");
    }
  };

  const renderTable = (data: User[], type: "tenant" | "landlord") => (
    <Card>
      <CardHeader>
        <CardTitle className="capitalize">{type} List</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableCaption>All registered {type}s in the system.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-muted-foreground">
                  No {type}s found.
                </TableCell>
              </TableRow>
            ) : (
              data.map((user) => (
                <TableRow key={user._id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        user.active
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {user.active ? "Active" : "Inactive"}
                    </span>
                  </TableCell>
                  <TableCell className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                    <Button
                      variant={user.active ? "destructive" : "default"}
                      size="sm"
                      onClick={() =>
                        toggleUserStatus(user._id, type, user.active ?? false)
                      }
                    >
                      {user.active ? "Deactivate" : "Activate"}
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">User Management</h1>

      <Tabs defaultValue="tenant" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="tenant">Tenants</TabsTrigger>
          <TabsTrigger value="landlord">Landlords</TabsTrigger>
        </TabsList>

        <TabsContent value="tenant">
          {loading ? (
            <p className="text-center py-10 text-muted-foreground">Loading tenants...</p>
          ) : (
            renderTable(tenants, "tenant")
          )}
        </TabsContent>

        <TabsContent value="landlord">
          {loading ? (
            <p className="text-center py-10 text-muted-foreground">Loading landlords...</p>
          ) : (
            renderTable(landlords, "landlord")
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
