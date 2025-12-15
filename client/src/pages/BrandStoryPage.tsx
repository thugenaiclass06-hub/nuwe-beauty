import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BrandStory from "@/components/sections/BrandStory";
import Spirit from "@/components/sections/Spirit";

export default function BrandStoryPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground font-sans selection:bg-primary/20">
      <Navbar />
      <main className="pt-32">
        <BrandStory />
        <Spirit />
      </main>
      <Footer />
    </div>
  );
}
