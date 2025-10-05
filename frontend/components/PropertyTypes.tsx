import { Card, CardContent } from "@/components/ui/card";
import { Building, Home, Key, Warehouse } from "lucide-react";

const propertyTypes = [
  {
    icon: Building,
    title: "Apartments",
    count: "2.5L+ Properties",
  },
  {
    icon: Home,
    title: "Independent Houses",
    count: "1.2L+ Properties",
  },
  {
    icon: Key,
    title: "PG/Hostels",
    count: "50K+ Properties",
  },
  {
    icon: Warehouse,
    title: "Commercial",
    count: "30K+ Properties",
  },
];

const PropertyTypes = () => {
  return (
    <section className="p-20">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Browse Properties by Type
          </h2>
          <p className="text-lg text-muted-foreground">
            Find the perfect property that matches your needs
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {propertyTypes.map((type, index) => (
            <Card 
              key={index} 
              className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-2 hover:border-primary"
            >
              <CardContent className="p-8 text-center">
                <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 mb-4">
                  <type.icon className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{type.title}</h3>
                <p className="text-muted-foreground">{type.count}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PropertyTypes;