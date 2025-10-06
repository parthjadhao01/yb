"use client";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, BedDouble, Bath, Maximize, Heart } from "lucide-react";
import { useRouter } from "next/navigation";

interface PropertyCardProps {
    id: string;
    title: string;
    price: number;
    location: string;
    bedrooms: number;
    bathrooms: number;
    area: number;
    image: string;
    propertyType: string;
}

const PropertyCard = ({
    id, 
    title,
    price,
    location,
    bedrooms,
    bathrooms,
    area,
    image,
    propertyType,
}: PropertyCardProps) => {

   const router = useRouter();

    return (
        <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 group">
            <div className="relative h-48 overflow-hidden">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <Button
                    size="icon"
                    variant="ghost"
                    className="absolute top-2 right-2 bg-background/80 hover:bg-background"
                >
                    <Heart className="h-4 w-4" />
                </Button>
                <Badge className="absolute top-2 left-2 bg-primary text-primary-foreground">
                    {propertyType}
                </Badge>
            </div>

            <CardContent className="p-4">
                <div className="space-y-3">
                    <div>
                        <h3 className="font-semibold text-lg line-clamp-1">{title}</h3>
                        <div className="flex items-center gap-1 text-muted-foreground mt-1">
                            <MapPin className="h-4 w-4" />
                            <span className="text-sm line-clamp-1">{location}</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                            <BedDouble className="h-4 w-4" />
                            <span>{bedrooms} Beds</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Bath className="h-4 w-4" />
                            <span>{bathrooms} Baths</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Maximize className="h-4 w-4" />
                            <span>{area} sqft</span>
                        </div>
                    </div>
                </div>
            </CardContent>

            <CardFooter className="p-4 pt-0 flex items-center justify-between">
                <div>
                    <p className="text-2xl font-bold text-primary">₹{price.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">per month</p>
                </div>
                <Button size="sm" onClick={() => router.push(`/rent/${id}`)}>View Details</Button>
            </CardFooter>
        </Card>
    );
};

export default PropertyCard;
