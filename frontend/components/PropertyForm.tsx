"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Upload } from "lucide-react";

interface PropertyFormProps {
  initialData?: any;
  onSubmit: (data: any) => void;
}

export default function PropertyForm({ initialData, onSubmit }: PropertyFormProps) {
  const [address, setAddress] = useState("");
  const [socityName, setSocityName] = useState("");
  const [BHK, setBHK] = useState<number>(1);
  const [area, setArea] = useState<number>(0);
  const [furnishingStatus, setFurnishingStatus] = useState("Unfurnished");
  const [amenities, setAmenities] = useState<string[]>([]);
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [availabilityStatus, setAvailabilityStatus] = useState(true);
  const [images, setImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  const availableAmenities = [
    "Parking",
    "Gym",
    "Swimming Pool",
    "Security",
    "Power Backup",
    "Elevator",
    "Play Area",
    "Garden",
    "Club House",
  ];

  // Load initial data for edit mode
  useEffect(() => {
    if (initialData) {
      setAddress(initialData.address || "");
      setSocityName(initialData.socityName || "");
      setBHK(initialData.BHK || 1);
      setArea(initialData.area || 0);
      setFurnishingStatus(initialData.furnishingStatus || "Unfurnished");
      setAmenities(initialData.amenities || []);
      setDescription(initialData.description || "");
      setPrice(initialData.price || 0);
      setAvailabilityStatus(initialData.availabilityStatus ?? true);
      setPreviewImages(initialData.images || []);
    }
  }, [initialData]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const fileArray = Array.from(files);
      setImages(fileArray);
      const previews = fileArray.map((file) => URL.createObjectURL(file));
      setPreviewImages(previews);
    }
  };

  const handleAmenityToggle = (item: string) => {
    setAmenities((prev) =>
      prev.includes(item)
        ? prev.filter((a) => a !== item)
        : [...prev, item]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = {
      address,
      socityName,
      BHK,
      area,
      furnishingStatus,
      amenities,
      description,
      price,
      availabilityStatus,
      images,
    };
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Address */}
      <div className="space-y-2">
        <Label>Address</Label>
        <Input
          placeholder="Enter property address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
      </div>

      {/* Society Name */}
      <div className="space-y-2">
        <Label>Society Name</Label>
        <Input
          placeholder="Enter society name"
          value={socityName}
          onChange={(e) => setSocityName(e.target.value)}
          required
        />
      </div>

      {/* BHK & Area */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>BHK</Label>
          <Input
            type="number"
            min="1"
            value={BHK}
            onChange={(e) => setBHK(Number(e.target.value))}
            required
          />
        </div>
        <div className="space-y-2">
          <Label>Area (sqft)</Label>
          <Input
            type="number"
            min="0"
            value={area}
            onChange={(e) => setArea(Number(e.target.value))}
            required
          />
        </div>
      </div>

      {/* Furnishing */}
      <div className="space-y-2">
        <Label>Furnishing Status</Label>
        <select
          className="border rounded-md p-2 w-full"
          value={furnishingStatus}
          onChange={(e) => setFurnishingStatus(e.target.value)}
        >
          <option>Unfurnished</option>
          <option>Semi-Furnished</option>
          <option>Fully-Furnished</option>
        </select>
      </div>

      {/* Amenities */}
      <div className="space-y-2">
        <Label>Amenities</Label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {availableAmenities.map((a) => (
            <div key={a} className="flex items-center gap-2">
              <Checkbox
                checked={amenities.includes(a)}
                onCheckedChange={() => handleAmenityToggle(a)}
              />
              <span className="text-sm">{a}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label>Description</Label>
        <Textarea
          placeholder="Describe the property..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>

      {/* Price */}
      <div className="space-y-2">
        <Label>Rent Price (₹)</Label>
        <Input
          type="number"
          min="0"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          required
        />
      </div>

      {/* Availability */}
      <div className="flex items-center gap-2">
        <Checkbox
          checked={availabilityStatus}
          onCheckedChange={() => setAvailabilityStatus(!availabilityStatus)}
        />
        <Label>Available for Rent</Label>
      </div>

      {/* Images */}
      <div className="space-y-2">
        <Label>Property Images</Label>
        <div className="flex items-center gap-2">
          <Input type="file" accept="image/*" multiple onChange={handleImageUpload} />
          <Upload className="h-4 w-4 text-muted-foreground" />
        </div>
        {previewImages.length > 0 && (
          <div className="grid grid-cols-3 gap-2 mt-2">
            {previewImages.map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`Preview ${i}`}
                className="h-24 w-full object-cover rounded-md"
              />
            ))}
          </div>
        )}
      </div>

      {/* Submit */}
      <Button type="submit" className="w-full">
        {initialData ? "Update Property" : "Add Property"}
      </Button>
    </form>
  );
}
