import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Products from "@/components/sections/Products";

export default function ProductsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground font-sans selection:bg-primary/20">
      <Navbar />
      <main className="pt-32">
        <Products />
      </main>
      <Footer />
    </div>
  );
}
