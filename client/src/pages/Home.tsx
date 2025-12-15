import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import BrandStory from "@/components/sections/BrandStory";
import ProductFeature from "@/components/sections/ProductFeature";
import EffectsShowcase from "@/components/sections/EffectsShowcase";
import Products from "@/components/sections/Products";
import Reviews from "@/components/sections/Reviews";
import Spirit from "@/components/sections/Spirit";
import ContactForm from "@/components/sections/ContactForm";
import Newsletter from "@/components/sections/Newsletter";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground font-sans selection:bg-primary/20">
      <Navbar />
      
      <main>
        <Hero />
        <BrandStory />
        <ProductFeature />
        <EffectsShowcase />
        <Products />
        <Reviews />
        <Spirit />
        <Newsletter />
        <ContactForm />
      </main>

      <Footer />
    </div>
  );
}
