import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

export default function Hero() {
  const [, setLocation] = useLocation();

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-blue-50/50 to-white pt-20 lg:pt-0">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Text Content */}
          <motion.div 
            className="flex-1 text-center lg:text-left space-y-8 order-2 lg:order-1"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium text-foreground leading-tight">
              真正的美，<br />
              是真實又自信的<br/>
              自己。
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 leading-relaxed">
              我們相信，美不該是焦慮的來源。
              NUWE 帶你找回那個游刃有餘的自己。
            </p>

            <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button 
                size="lg" 
                className="rounded-full px-8 h-12 text-base shadow-lg shadow-primary/20 hover:shadow-xl hover:scale-105 transition-all duration-300"
                onClick={() => setLocation("/products")}
                data-testid="button-explore-products"
              >
                探索系列產品
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="rounded-full px-8 h-12 text-base bg-white/50 border-blue-200 hover:bg-white"
                onClick={() => setLocation("/brand-story")}
                data-testid="button-brand-story"
              >
                了解品牌故事
              </Button>
            </div>
          </motion.div>

          {/* Poster Image */}
          <motion.div 
            className="flex-1 relative order-1 lg:order-2 w-full max-w-md lg:max-w-none mt-12"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border-4 border-white/50 transform hover:rotate-1 transition-transform duration-500">
              <img 
                src="/hero-poster.png" 
                alt="NUWE Brand Poster" 
                className="w-full h-auto object-cover"
              />
            </div>
            
            {/* Decorative Elements behind poster */}
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-blue-100/50 rounded-full blur-3xl -z-10 animate-pulse" />
            <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-blue-200/30 rounded-full blur-3xl -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
