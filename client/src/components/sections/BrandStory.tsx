import { motion } from "framer-motion";
import { Cloud } from "lucide-react";

export default function BrandStory() {
  return (
    <section id="brand-story" className="py-24 bg-white relative overflow-hidden">
      {/* Decorative Clouds */}
      <div className="absolute top-20 -left-20 opacity-[0.03] pointer-events-none">
        <Cloud size={400} />
      </div>
      <div className="absolute bottom-20 -right-20 opacity-[0.03] pointer-events-none">
        <Cloud size={300} />
      </div>

      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center gap-16">
          <div className="w-full md:w-1/2 relative">
            <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-secondary/30 relative">
               <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-9xl font-serif text-primary/10 select-none">NUWE</span>
               </div>
               <div className="absolute inset-0 bg-gradient-to-tr from-white/50 to-transparent" />
            </div>
            {/* Floating Card */}
            <motion.div 
              className="absolute -bottom-10 -right-10 bg-white p-8 rounded-xl shadow-xl max-w-xs glass hidden md:block"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <p className="font-serif text-xl italic text-primary mb-2">"Like a Cloud"</p>
              <p className="text-sm text-muted-foreground">柔軟、輕盈，象徵著我們的品牌理念。</p>
            </motion.div>
          </div>

          <div className="w-full md:w-1/2 space-y-8">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-serif text-foreground mb-6">
                品牌故事
              </h2>
              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                <p>
                  NUWE 於 2025 年 10 月創立。
                  清透素顏霜以輕盈且自然的妝感為特色，是 NUWE 最熱銷的產品之一。
                  NUWE 致力為女性襯托出她們最自然的美。
                </p>
                
                <h3 className="text-2xl font-serif text-foreground pt-4">名稱由來</h3>
                <p>
                  「NUWE」的名稱靈感來自「雲」。
                  雲，柔軟、輕盈，象徵著我們想讓每個使用者都能輕鬆擁有如雲朵般輕盈、自然的妝容的目標。
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
