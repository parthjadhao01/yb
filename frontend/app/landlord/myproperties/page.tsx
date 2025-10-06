"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
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

type Property = {
  id: string;
  name: string;
  rent: number;
  bhk: number;
  rented: boolean;
};

export default function MyPropertiesPage() {
  const router = useRouter();

  // Dummy data
  const [properties, setProperties] = useState<Property[]>([
    { id: "p1", name: "Bandra West - 2BHK", rent: 45000, bhk: 2, rented: false },
    { id: "p2", name: "Worli Sea View - 3BHK", rent: 85000, bhk: 3, rented: true },
    { id: "p3", name: "Andheri Cozy - 1BHK", rent: 22000, bhk: 1, rented: false },
    { id: "p4", name: "Powai Modern - 2BHK", rent: 38000, bhk: 2, rented: true },
  ]);

  const handleDelete = (id: string) => {
    // simple confirm + remove from local state (replace with API call in real app)
    if (confirm("Are you sure you want to delete this property?")) {
      setProperties((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const handleEdit = (id: string) => {
    // navigate to edit page (adjust route as needed)
    router.push(`/my-properties/edit/${id}`);
  };

  const handleAdd = () => {
    // navigate to add property page
    router.push("/landlord/myproperties/addmyproperties");
  };

  return (
    <div className="min-h-screen bg-background p-6">
      {/* Top bar */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <Button onClick={handleAdd} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            <Link href="/landlord/myproperties/addmyproperties">
              Add Property
            </Link>
          </Button>
        </div>

        <div>
          <Button variant="ghost" onClick={() => router.back()} className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
        </div>
      </div>

      {/* Table container */}
      <div className="rounded-lg border bg-card">
        <Table>
          <TableCaption>Your listed properties (dummy data)</TableCaption>
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
              <TableRow key={prop.id} className="hover:bg-muted/50">
                <TableCell className="font-medium">{prop.name}</TableCell>
                <TableCell>₹{prop.rent.toLocaleString()}</TableCell>
                <TableCell>{prop.bhk} BHK</TableCell>
                <TableCell>
                  {prop.rented ? (
                    <Badge variant="destructive">Rented</Badge>
                  ) : (
                    <Badge>Not Rented</Badge>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <div className="inline-flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(prop.id)}
                      className="flex items-center gap-2"
                    >
                      <Edit className="h-4 w-4" />
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(prop.id)}
                      className="flex items-center gap-2"
                    >
                      <Trash2 className="h-4 w-4" />
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}

            {properties.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-6">
                  No properties found. Click "Add Property" to create one.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
