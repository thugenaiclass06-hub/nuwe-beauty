import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ContactForm from "@/components/sections/ContactForm";

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground font-sans selection:bg-primary/20">
      <Navbar />
      <main className="pt-32">
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
}
