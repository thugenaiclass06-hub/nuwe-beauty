import { motion } from "framer-motion";

export default function Spirit() {
  return (
    <section id="spirit" className="relative py-32 overflow-hidden">
      {/* Background Split */}
      <div className="absolute inset-0 flex">
        <div className="w-1/2 bg-white hidden md:block" />
        <div className="w-full md:w-1/2 bg-[#F0F6FA]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8 text-center md:text-left"
          >
            <h2 className="text-5xl md:text-6xl font-serif text-primary leading-tight">
              從從容容，<br />
              <span className="text-foreground">游刃有餘。</span>
            </h2>
            
            <div className="w-16 h-1 bg-primary/30 mx-auto md:mx-0" />
            
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>
                這不僅描述了妝容的自然流暢，
                更是一種生活態度。
                即使再忙，也要給自己一點喘息的時間。
              </p>
              <p>
                NUWE 鼓勵每位女孩：
                在快節奏中保持輕盈與從容，
                在匆忙的生活裡依然能有自己的節奏。
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
             <div className="relative aspect-[3/4] rounded-lg overflow-hidden shadow-2xl">
                <img 
                  src="/mood-shot.png" 
                  alt="Natural Beauty Mood" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-primary/10 mix-blend-overlay" />
             </div>
             
             {/* Decorative Text */}
             <div className="absolute -bottom-12 -left-12 hidden lg:block">
               <span className="text-[120px] font-serif text-white drop-shadow-lg opacity-50 font-bold">NUWE</span>
             </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
