"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PropertyForm from "@/components/PropertyForm";

export default function EditPropertyPage() {
  const { id } = useParams();
  const router = useRouter();
  const [property, setProperty] = useState<any>(null);

  useEffect(() => {
    // Fetch property data by ID (replace with API)
    const fakeProperty = {
      address: "123 Green Street",
      socityName: "Green Valley",
      BHK: 2,
      area: 950,
      furnishingStatus: "Semi-Furnished",
      amenities: ["Parking", "Security"],
      description: "Beautiful 2BHK apartment.",
      price: 18000,
      availabilityStatus: true,
      images: [],
    };
    setProperty(fakeProperty);
  }, [id]);

  const handleUpdate = async (data: any) => {
    console.log("Updating Property:", id, data);
    alert({
      title: "Property Updated",
      description: "Your property details were updated successfully!",
    });
    router.push("/myproperty");
  };

  if (!property) return <p className="p-6 text-muted-foreground">Loading...</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Edit Property</CardTitle>
        </CardHeader>
        <CardContent>
          <PropertyForm initialData={property} onSubmit={handleUpdate} />
        </CardContent>
      </Card>
    </div>
  );
}
