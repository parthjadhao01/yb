"use client";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PropertyCard from "@/components/PropertyCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, SlidersHorizontal } from "lucide-react";

// Dummy property data
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
  },
  {
    id: "2",
    title: "Luxury 3BHK with Sea View",
    price: 85000,
    location: "Worli, Mumbai",
    bedrooms: 3,
    bathrooms: 3,
    area: 1500,
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
    propertyType: "Apartment",
  },
  {
    id: "3",
    title: "Cozy 1BHK Near Metro Station",
    price: 22000,
    location: "Andheri East, Mumbai",
    bedrooms: 1,
    bathrooms: 1,
    area: 600,
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
    propertyType: "Apartment",
  },
  {
    id: "4",
    title: "Modern 2BHK with Amenities",
    price: 38000,
    location: "Powai, Mumbai",
    bedrooms: 2,
    bathrooms: 2,
    area: 1050,
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
    propertyType: "Apartment",
  },
  {
    id: "5",
    title: "Spacious 3BHK Villa",
    price: 95000,
    location: "Juhu, Mumbai",
    bedrooms: 3,
    bathrooms: 3,
    area: 2000,
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
    propertyType: "Villa",
  },
  {
    id: "6",
    title: "Budget 1BHK for Students",
    price: 18000,
    location: "Malad West, Mumbai",
    bedrooms: 1,
    bathrooms: 1,
    area: 500,
    image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80",
    propertyType: "Apartment",
  },
  {
    id: "7",
    title: "Premium 4BHK Penthouse",
    price: 150000,
    location: "Lower Parel, Mumbai",
    bedrooms: 4,
    bathrooms: 4,
    area: 2500,
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80",
    propertyType: "Penthouse",
  },
  {
    id: "8",
    title: "Comfortable 2BHK with Parking",
    price: 32000,
    location: "Thane West, Thane",
    bedrooms: 2,
    bathrooms: 2,
    area: 900,
    image: "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800&q=80",
    propertyType: "Apartment",
  },
];

const Rent = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [propertyType, setPropertyType] = useState("all");
  const [priceRange, setPriceRange] = useState("all");

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container p-10 mx-auto">
        {/* Search and Filters Section */}
        <div className="mb-8 space-y-4">
          <div className="text-center mb-6">
            <h1 className="text-4xl font-bold text-foreground mb-2">
              Find Your Perfect Rental Home
            </h1>
            <p className="text-muted-foreground">
              Browse through {properties.length} properties available for rent
            </p>
          </div>

          {/* Search Bar */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by location, property name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={propertyType} onValueChange={setPropertyType}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Property Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="apartment">Apartment</SelectItem>
                <SelectItem value="villa">Villa</SelectItem>
                <SelectItem value="penthouse">Penthouse</SelectItem>
              </SelectContent>
            </Select>

            <Select value={priceRange} onValueChange={setPriceRange}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Price Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Prices</SelectItem>
                <SelectItem value="0-25000">Under ₹25,000</SelectItem>
                <SelectItem value="25000-50000">₹25,000 - ₹50,000</SelectItem>
                <SelectItem value="50000-100000">₹50,000 - ₹1,00,000</SelectItem>
                <SelectItem value="100000+">Above ₹1,00,000</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" size="icon">
              <SlidersHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {properties.map((property) => (
            <PropertyCard key={property.id} {...property} />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Rent;