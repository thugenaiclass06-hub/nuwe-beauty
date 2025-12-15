import { useParams, useLocation } from "wouter";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Check } from "lucide-react";
import { motion } from "framer-motion";
import { products } from "@shared/products";

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [, setLocation] = useLocation();
  
  const product = products.find(p => p.id === Number(id));

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col bg-background text-foreground font-sans selection:bg-primary/20">
        <Navbar />
        <main className="pt-32 flex-1 flex items-center justify-center">
          <div className="text-center space-y-4">
            <h1 className="text-3xl font-serif">找不到此產品</h1>
            <Button onClick={() => setLocation("/products")} className="rounded-full">
              返回產品列表
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground font-sans selection:bg-primary/20">
      <Navbar />
      <main className="pt-32 pb-16">
        <div className="container mx-auto px-6">
          <Button
            variant="ghost"
            onClick={() => setLocation("/products")}
            className="mb-8 text-muted-foreground hover:text-foreground"
            data-testid="button-back-products"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            返回產品列表
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative"
            >
              <div className="aspect-square rounded-2xl overflow-hidden bg-secondary/30 shadow-xl">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {product.tag && (
                <Badge className="absolute top-6 left-6 bg-white/90 text-primary hover:bg-white shadow-lg backdrop-blur-sm border-none px-4 py-2 text-sm">
                  {product.tag}
                </Badge>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <h1 className="text-3xl md:text-4xl font-serif text-foreground" data-testid="text-product-name">
                  {product.name}
                </h1>
                <p className="text-2xl font-medium text-primary" data-testid="text-product-price">
                  {product.price}
                </p>
              </div>

              <p className="text-lg text-muted-foreground leading-relaxed" data-testid="text-product-description">
                {product.description}
              </p>

              <div className="space-y-4">
                <h3 className="font-semibold text-foreground">產品特色</h3>
                <div className="grid grid-cols-2 gap-3">
                  {product.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-2 text-muted-foreground">
                      <Check className="w-4 h-4 text-primary" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-foreground">產品規格</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  {product.details.map((detail, i) => (
                    <li key={i}>{detail}</li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="w-full sm:w-auto rounded-full px-12 h-14 text-lg shadow-lg shadow-primary/20"
                  data-testid="button-buy-now"
                >
                  立即購買
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="w-full sm:w-auto rounded-full px-12 h-14 text-lg"
                  onClick={() => setLocation("/contact")}
                  data-testid="button-contact-us"
                >
                  聯絡我們
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
