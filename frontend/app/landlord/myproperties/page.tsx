"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableCaption,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trash2, Edit, ArrowLeft, Plus } from "lucide-react";
import Link from "next/link";
import axios from "axios";

type Property = {
  _id: string;
  address: string;
  socityName: string;
  BHK: number;
  area: number;
  furnishingStatus: string;
  amenities: string[];
  description: string;
  images: string[];
  availabilityStatus: boolean;
  price: number;
};

export default function MyPropertiesPage() {
  const router = useRouter();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // ✅ Fetch all landlord properties
  const fetchProperties = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:3000/api/landlord/getProperties", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setProperties(res.data.properties);
    } catch (error: any) {
      console.error("Error fetching properties:", error);
      alert("Failed to load properties");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  // ✅ Delete property
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this property?")) return;

    try {
      await axios.delete(`http://localhost:3000/api/landlord/deleteProperty/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      alert("Property deleted successfully!");
      setProperties((prev) => prev.filter((p) => p._id !== id));
    } catch (error: any) {
      console.error("Error deleting property:", error);
      alert("Failed to delete property");
    }
  };

  const handleEdit = (id: string) => {
    router.push(`/landlord/myproperties/${id}`);
  };

  const handleAdd = () => {
    router.push("/landlord/myproperties/addmyproperties");
  };

  return (
    <div className="min-h-screen bg-background p-6">
      {/* Top bar */}
      <div className="flex items-center justify-between mb-6">
        <Button onClick={handleAdd} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Property
        </Button>

        <Button variant="ghost" onClick={() => router.back()} className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
      </div>

      <div className="rounded-lg border bg-card">
        <Table>
          <TableCaption>
            {loading ? "Loading properties..." : "Your listed properties"}
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Property Name</TableHead>
              <TableHead>Rent</TableHead>
              <TableHead>BHK</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {properties.map((prop) => (
              <TableRow key={prop._id} className="hover:bg-muted/50">
                <TableCell className="font-medium">
                  {prop.socityName} - {prop.address}
                </TableCell>
                <TableCell>₹{prop.price?.toLocaleString()}</TableCell>
                <TableCell>{prop.BHK} BHK</TableCell>
                <TableCell>
                  {prop.availabilityStatus ? (
                    <Badge>Available</Badge>
                  ) : (
                    <Badge variant="destructive">Rented</Badge>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <div className="inline-flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(prop._id)}
                      className="flex items-center gap-2"
                    >
                      <Edit className="h-4 w-4" />
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(prop._id)}
                      className="flex items-center gap-2"
                    >
                      <Trash2 className="h-4 w-4" />
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}

            {!loading && properties.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-6">
                  No properties found. Click “Add Property” to create one.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
