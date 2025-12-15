import { motion } from "framer-motion";
import { Sparkles, Feather, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

export default function ProductFeature() {
  const [, setLocation] = useLocation();

  const features = [
    {
      icon: ShieldCheck,
      title: "不傷膚、溫和配方",
      desc: "嚴選低敏成分，呵護每一寸肌膚"
    },
    {
      icon: Feather,
      title: "質地輕薄",
      desc: "如雲朵般輕盈，讓肌膚自由呼吸"
    },
    {
      icon: Sparkles,
      title: "妝效自然",
      desc: "一抹提亮，快速打造偽素顏好氣色"
    }
  ];

  return (
    <section id="product" className="py-24 bg-secondary/20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 space-y-4">
          <span className="text-primary font-medium tracking-wider text-sm uppercase">Best Seller</span>
          <h2 className="text-4xl md:text-5xl font-serif text-foreground">NUWE 輕透素顏霜</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            不論是上課、約會或拍照，都能自然提亮氣色。
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            className="relative order-2 lg:order-1"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="aspect-square rounded-[2rem] overflow-hidden shadow-2xl border-8 border-white">
              <img 
                src="/product-feature.png" 
                alt="NUWE Tone-up Cream" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            {/* Badge */}
            <div className="absolute -top-6 -right-6 bg-white p-6 rounded-full shadow-lg animate-float">
              <div className="text-center">
                <span className="block text-2xl font-bold text-primary">TOP</span>
                <span className="text-xs text-muted-foreground uppercase tracking-widest">Choice</span>
              </div>
            </div>
          </motion.div>

          <div className="order-1 lg:order-2 space-y-10">
            <div className="space-y-8">
              {features.map((feature, idx) => (
                <motion.div 
                  key={idx}
                  className="flex items-start gap-4 group"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center text-primary shrink-0 group-hover:scale-110 transition-transform">
                    <feature.icon size={24} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="text-xl font-serif font-medium mb-1">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="p-6 rounded-xl bg-white/50 border border-white/60 backdrop-blur-sm">
              <p className="text-foreground/80 italic leading-relaxed">
                "NUWE 想做的不是讓你變成另一個人，
                而是讓你更喜歡鏡中那個「真實又自信的自己」。"
              </p>
            </div>
            
            <div className="flex gap-4 pt-4">
              <Button 
                size="lg" 
                className="rounded-full px-8"
                onClick={() => setLocation("/products")}
                data-testid="button-try-now"
              >
                立即體驗
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="rounded-full px-8 bg-transparent border-foreground/20 hover:bg-white/50"
                onClick={() => setLocation("/products/1")}
                data-testid="button-learn-more"
              >
                查看詳情
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
