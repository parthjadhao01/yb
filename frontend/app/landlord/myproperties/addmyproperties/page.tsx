"use client";

import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import PropertyForm from "@/components/PropertyForm";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";

export default function AddMyPropertyPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // handle form submission
  const handleAdd = async (formData: FormData) => {
    try {
      setLoading(true);

      //  Backend API integration
      const res = await axios.post("http://localhost:3000/api/landlord/postProperty", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      alert(res.data.message || "Property added successfully!");
      router.push("/landlord/myproperties");
    } catch (err: any) {
      console.error(err);
      alert(err.response?.data?.message || "Error adding property.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Add New Property</h1>
        <Button variant="ghost" onClick={() => router.back()} className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
      </div>

      <p className="mb-6 text-muted-foreground">
        Fill in all the details below to add a new property. Upload property images and select amenities.
      </p>

      {/* Form Card */}
      <Card>
        <CardHeader>
          <CardTitle>Property Details</CardTitle>
          <CardDescription>Provide complete information about the property</CardDescription>
        </CardHeader>
        <CardContent>
          <PropertyForm onSubmit={handleAdd} loading={loading} />
        </CardContent>
      </Card>
    </div>
  );
}
