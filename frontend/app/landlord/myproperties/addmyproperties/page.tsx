"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import PropertyForm from "@/components/PropertyForm";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function AddMyPropertyPage() {
  const router = useRouter();

  // handle form submission
  const handleAdd = async (data: any) => {
    try {
      console.log("Creating Property:", data);

      // TODO: Replace this with your API call to backend
      // Example:
      // await axios.post("/api/properties", data);

      alert("Property added successfully!");
      router.push("/myproperty");
    } catch (err) {
      console.error(err);
      alert("Error adding property.");
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
        Fill in all the details below to add a new property. Make sure to upload images and select all relevant amenities.
      </p>

      {/* Card Form */}
      <Card>
        <CardHeader>
          <CardTitle>Property Details</CardTitle>
          <CardDescription>Provide all necessary information about the property</CardDescription>
        </CardHeader>

        <CardContent>
          <PropertyForm onSubmit={handleAdd} />
        </CardContent>
      </Card>
    </div>
  );
}
