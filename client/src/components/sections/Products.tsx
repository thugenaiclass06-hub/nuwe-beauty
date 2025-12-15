import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLocation } from "wouter";
import { products } from "@shared/products";

export default function Products() {
  const [, setLocation] = useLocation();

  const handleProductClick = (productId: number) => {
    setLocation(`/products/${productId}`);
  };

  return (
    <section id="shop" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-primary font-medium tracking-wider text-sm uppercase">Online Shop</span>
          <h2 className="text-4xl font-serif text-foreground mt-2">精選系列</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {products.map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group cursor-pointer"
              onClick={() => handleProductClick(product.id)}
              data-testid={`card-product-${product.id}`}
            >
              <div className="relative aspect-[4/5] bg-secondary/30 rounded-2xl overflow-hidden mb-6">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                {product.tag && (
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-white/90 text-primary hover:bg-white shadow-sm backdrop-blur-sm border-none text-xs px-3 py-1">
                      {product.tag}
                    </Badge>
                  </div>
                )}
                
                <div className="absolute inset-x-4 bottom-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <Button 
                    className="w-full rounded-full bg-white/90 text-foreground hover:bg-white shadow-lg backdrop-blur-sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleProductClick(product.id);
                    }}
                    data-testid={`button-view-product-${product.id}`}
                  >
                    查看詳情
                  </Button>
                </div>
              </div>

              <div className="text-center space-y-2">
                <h3 className="text-xl font-serif font-medium text-foreground group-hover:text-primary transition-colors">
                  {product.name}
                </h3>
                <p className="text-muted-foreground font-medium">{product.price}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
