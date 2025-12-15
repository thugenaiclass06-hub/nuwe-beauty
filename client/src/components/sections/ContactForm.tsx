import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Send, CheckCircle, Loader2 } from "lucide-react";
import { useMutation } from "@tanstack/react-query";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);

  const mutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "發送失敗");
      }
      return res.json();
    },
    onSuccess: () => {
      setSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  if (submitted) {
    return (
      <section id="contact-form" className="py-24 bg-gradient-to-b from-blue-50/30 to-white">
        <div className="container mx-auto px-6">
          <motion.div 
            className="max-w-lg mx-auto text-center space-y-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="w-20 h-20 rounded-full bg-green-100 mx-auto flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-green-500" />
            </div>
            <h2 className="text-3xl font-serif text-foreground">訊息已送出！</h2>
            <p className="text-muted-foreground">
              感謝您的來信，我們會盡快與您聯繫。
            </p>
            <Button 
              variant="outline" 
              onClick={() => setSubmitted(false)}
              className="rounded-full"
            >
              發送另一則訊息
            </Button>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact-form" className="py-24 bg-gradient-to-b from-blue-50/30 to-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <span className="text-primary font-medium tracking-wider text-sm uppercase">Contact Us</span>
          <h2 className="text-4xl font-serif text-foreground mt-2">與我們聯繫</h2>
          <p className="text-muted-foreground mt-4 max-w-lg mx-auto">
            有任何問題或建議嗎？歡迎留言給我們，我們會盡快回覆您。
          </p>
        </div>

        <motion.form 
          onSubmit={handleSubmit}
          className="max-w-xl mx-auto space-y-6 bg-white p-8 rounded-2xl shadow-sm border border-border/30"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">您的姓名</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="請輸入姓名"
                required
                className="rounded-lg"
                data-testid="input-contact-name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="example@email.com"
                required
                className="rounded-lg"
                data-testid="input-contact-email"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="subject">主旨</Label>
            <Input
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="請簡述您想詢問的事項"
              required
              className="rounded-lg"
              data-testid="input-contact-subject"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">訊息內容</Label>
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="請輸入您想說的話..."
              required
              rows={5}
              className="rounded-lg resize-none"
              data-testid="input-contact-message"
            />
          </div>

          {mutation.isError && (
            <p className="text-red-500 text-sm">{mutation.error.message}</p>
          )}

          <Button 
            type="submit" 
            size="lg" 
            className="w-full rounded-full"
            disabled={mutation.isPending}
            data-testid="button-contact-submit"
          >
            {mutation.isPending ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                發送中...
              </>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                發送訊息
              </>
            )}
          </Button>
        </motion.form>
      </div>
    </section>
  );
}
