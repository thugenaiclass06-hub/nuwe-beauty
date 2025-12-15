import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Loader2, CheckCircle, Sparkles } from "lucide-react";
import { useMutation } from "@tanstack/react-query";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const mutation = useMutation({
    mutationFn: async (email: string) => {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "訂閱失敗");
      }
      return data;
    },
    onSuccess: () => {
      setSubmitted(true);
      setEmail("");
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      mutation.mutate(email);
    }
  };

  return (
    <section className="py-20 bg-primary/5 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-200/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          className="max-w-2xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 text-primary text-sm font-medium mb-6 shadow-sm">
            <Sparkles className="w-4 h-4" />
            加入 NUWE 家族
          </div>
          
          <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-4">
            訂閱電子報，獲取最新優惠
          </h2>
          <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
            第一時間收到新品上市、限定優惠與美妝小技巧，讓你的美麗不錯過任何精彩。
          </p>

          {submitted ? (
            <motion.div 
              className="flex items-center justify-center gap-3 text-green-600 bg-green-50 px-6 py-4 rounded-full"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <CheckCircle className="w-5 h-5" />
              <span className="font-medium">訂閱成功！感謝您加入 NUWE 家族</span>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <div className="flex-1 relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="輸入您的 Email"
                  required
                  className="pl-12 h-12 rounded-full bg-white border-white/50 shadow-sm"
                  data-testid="input-newsletter-email"
                />
              </div>
              <Button 
                type="submit" 
                size="lg"
                className="h-12 px-8 rounded-full shadow-lg shadow-primary/20"
                disabled={mutation.isPending}
                data-testid="button-newsletter-submit"
              >
                {mutation.isPending ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  "立即訂閱"
                )}
              </Button>
            </form>
          )}

          {mutation.isError && (
            <p className="mt-4 text-red-500 text-sm">{mutation.error.message}</p>
          )}

          <p className="text-xs text-muted-foreground mt-6">
            我們尊重您的隱私，絕不分享您的資訊給第三方。
          </p>
        </motion.div>
      </div>
    </section>
  );
}
