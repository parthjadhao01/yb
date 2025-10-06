"use client";

import { useRouter, useParams } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  MapPin,
  BedDouble,
  Bath,
  Maximize,
  Heart,
  Share2,
  Phone,
  Mail,
  Calendar,
  ArrowLeft,
  CheckCircle2,
} from "lucide-react";

// Dummy property data (keep this the same or fetch dynamically)
const properties = [
  {
    id: "1",
    title: "Spacious 2BHK Apartment in Bandra West",
    price: 45000,
    location: "Bandra West, Mumbai",
    bedrooms: 2,
    bathrooms: 2,
    area: 950,
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80",
    propertyType: "Apartment",
    description:
      "Beautiful 2BHK apartment located in the heart of Bandra West. This property features modern amenities, spacious rooms, and excellent connectivity to major areas of Mumbai. Perfect for families and working professionals.",
    amenities: ["Parking", "Gym", "Swimming Pool", "Security", "Power Backup", "Elevator"],
    availableFrom: "2025-11-01",
    landlordName: "Rajesh Kumar",
    landlordPhone: "+91 98765 43210",
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
    ],
  },
  // ...rest of your dummy data
];

export default function PropertyDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const property = properties.find((p) => p.id === id);

  if (!property) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Property Not Found</h1>
            <Button onClick={() => router.push("/rent")}>Back to Listings</Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container py-8">
        {/* Back Button */}
        <Button variant="ghost" onClick={() => router.push("/rent")} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Listings
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <Card className="overflow-hidden">
              <div className="relative h-96">
                <img
                  src={property.images[0]}
                  alt={property.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 flex gap-2">
                  <Button size="icon" variant="secondary">
                    <Heart className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="secondary">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
                <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">
                  {property.propertyType}
                </Badge>
              </div>

              {property.images.length > 1 && (
                <div className="grid grid-cols-3 gap-2 p-2">
                  {property.images.slice(1).map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt={`${property.title} ${idx + 2}`}
                      className="w-full h-24 object-cover rounded cursor-pointer hover:opacity-80 transition-opacity"
                    />
                  ))}
                </div>
              )}
            </Card>

            {/* Property Info */}
            <Card>
              <CardContent className="p-6 space-y-4">
                <div>
                  <h1 className="text-3xl font-bold mb-2">{property.title}</h1>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-5 w-5" />
                    <span className="text-lg">{property.location}</span>
                  </div>
                </div>

                <Separator />

                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                      <BedDouble className="h-5 w-5 text-muted-foreground" />
                      <span className="font-medium">{property.bedrooms} Bedrooms</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Bath className="h-5 w-5 text-muted-foreground" />
                      <span className="font-medium">{property.bathrooms} Bathrooms</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Maximize className="h-5 w-5 text-muted-foreground" />
                      <span className="font-medium">{property.area} sqft</span>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h2 className="text-xl font-semibold mb-3">Description</h2>
                  <p className="text-muted-foreground leading-relaxed">{property.description}</p>
                </div>

                <Separator />

                <div>
                  <h2 className="text-xl font-semibold mb-3">Amenities</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {property.amenities.map((amenity, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                        <span className="text-sm">{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-5 w-5" />
                  <span>
                    Available from:{" "}
                    <span className="font-medium text-foreground">{property.availableFrom}</span>
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Price Card */}
            <Card>
              <CardContent className="p-6 space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Rent</p>
                  <p className="text-3xl font-bold text-primary">
                    ₹{property.price.toLocaleString()}
                  </p>
                  <p className="text-sm text-muted-foreground">per month</p>
                </div>

                <Separator />

                <div className="space-y-3">
                  <Button className="w-full" size="lg">
                    Schedule Visit
                  </Button>
                  <Button className="w-full" variant="outline" size="lg">
                    Request Info
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Contact Card */}
            <Card>
              <CardContent className="p-6 space-y-4">
                <h3 className="font-semibold text-lg">Contact Landlord</h3>

                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Name</p>
                    <p className="font-medium">{property.landlordName}</p>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start" size="lg">
                      <Phone className="mr-2 h-4 w-4" />
                      {property.landlordPhone}
                    </Button>
                    <Button variant="outline" className="w-full justify-start" size="lg">
                      <Mail className="mr-2 h-4 w-4" />
                      Send Email
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
