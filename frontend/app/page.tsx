import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Statistics from "@/components/Statistics";
import PropertyTypes from "@/components/PropertyTypes";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background my-auto">
      <Header />
      <main>
        <Hero />
        <Services />
        <Statistics />
        <PropertyTypes />
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
