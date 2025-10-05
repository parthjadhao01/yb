import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, MapPin } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-[600px] flex items-center justify-center bg-gradient-to-br from-primary via-primary to-primary/90">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2073')] bg-cover bg-center opacity-10" />
      
      <div className="container relative z-10 py-20">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight">
            Find Your Dream Property
            <span className="block text-accent">Without Brokerage</span>
          </h1>
          
          <p className="text-lg md:text-xl text-primary-foreground/90 max-w-2xl mx-auto">
            Discover thousands of verified properties for rent and sale. Zero brokerage, complete transparency.
          </p>

          <div className="bg-background rounded-lg p-6 shadow-lg">
            <Tabs defaultValue="buy" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="buy" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  Buy
                </TabsTrigger>
                <TabsTrigger value="rent" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  Rent
                </TabsTrigger>
                <TabsTrigger value="sell" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  Sell
                </TabsTrigger>
              </TabsList>

              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input 
                    placeholder="Enter City, Locality, or Project" 
                    className="pl-10 h-12"
                  />
                </div>
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground h-12 px-8">
                  <Search className="mr-2 h-5 w-5" />
                  Search
                </Button>
              </div>
            </Tabs>
          </div>

          <div className="flex flex-wrap justify-center gap-4 text-sm text-primary-foreground/80">
            <span>Popular Searches:</span>
            <a href="#" className="hover:text-accent transition-colors">Mumbai Apartments</a>
            <span>•</span>
            <a href="#" className="hover:text-accent transition-colors">Delhi Flats</a>
            <span>•</span>
            <a href="#" className="hover:text-accent transition-colors">Bangalore PG</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;