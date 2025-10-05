import { Card, CardContent } from "@/components/ui/card";
import { Home, Building2, Users, Receipt } from "lucide-react";

const services = [
  {
    icon: Home,
    title: "Buy Properties",
    description: "Explore verified properties ready for purchase with complete documentation",
  },
  {
    icon: Building2,
    title: "Rent Properties",
    description: "Find your perfect rental home with flexible terms and no hidden charges",
  },
  {
    icon: Users,
    title: "PG & Co-living",
    description: "Discover comfortable PG accommodations and co-living spaces",
  },
  {
    icon: Receipt,
    title: "Zero Brokerage",
    description: "Save lakhs with our zero brokerage model. Direct owner connections",
  },
];

const Services = () => {
  return (
    <section className="p-20 bg-secondary/50">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Why Choose YourBroker?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            India's most trusted property platform with millions of happy customers
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <Card key={index} className="border-none shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6 text-center">
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
                  <service.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-muted-foreground">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;