import { motion } from "framer-motion";
import beforeAfterImage from "@assets/generated_images/before_after_skincare_effect.png";
import applyingImage from "@assets/generated_images/woman_applying_tone-up_cream.png";
import glowImage from "@assets/generated_images/radiant_glass_skin_closeup.png";

const effects = [
  {
    id: 1,
    title: "使用前後對比",
    description: "一抹即亮，打造自然透亮的偽素顏妝感",
    image: beforeAfterImage,
  },
  {
    id: 2,
    title: "輕鬆上妝",
    description: "質地輕盈好推開，保養後輕輕塗抹即可",
    image: applyingImage,
  },
  {
    id: 3,
    title: "光澤透亮",
    description: "如雲朵般輕盈，展現自然光澤肌",
    image: glowImage,
  },
];

export default function EffectsShowcase() {
  return (
    <section id="effects" className="py-24 bg-gradient-to-b from-white to-blue-50/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-primary font-medium tracking-wider text-sm uppercase">Before & After</span>
          <h2 className="text-4xl font-serif text-foreground mt-2">使用效果展示</h2>
          <p className="text-muted-foreground mt-4 max-w-lg mx-auto">
            看看 NUWE 輕透素顏霜如何讓你輕鬆擁有自然好氣色
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {effects.map((effect, idx) => (
            <motion.div
              key={effect.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group"
              data-testid={`card-effect-${effect.id}`}
            >
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg mb-4">
                <img 
                  src={effect.image} 
                  alt={effect.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="text-center space-y-2">
                <h3 className="text-xl font-serif font-medium text-foreground">
                  {effect.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {effect.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
