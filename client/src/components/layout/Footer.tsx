import { Facebook, Instagram, Mail, MessageCircle } from "lucide-react";

export default function Footer() {
  return (
    <footer id="contact" className="bg-white py-16 border-t border-border/40">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div className="space-y-4">
            <h3 className="text-2xl font-serif font-bold text-primary">NUWE</h3>
            <p className="text-muted-foreground leading-relaxed max-w-xs">
              讓每個人都能輕鬆擁有如雲朵般輕盈、自然的妝容。
              真正的美，是真實又自信的自己。
            </p>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">聯絡我們</h4>
            <div className="space-y-2 text-muted-foreground">
              <a 
                href="mailto:nuweyun@gmail.com?subject=NUWE%20官網諮詢" 
                className="flex items-center gap-2 hover:text-primary transition-colors cursor-pointer"
              >
                <Mail className="w-4 h-4" />
                nuweyun@gmail.com
              </a>
              <div className="flex items-center gap-2 hover:text-primary transition-colors select-all">
                <MessageCircle className="w-4 h-4" />
                LINE: @701kbaep
              </div>
              <p>週一至週五 10:00 - 18:00</p>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">關注我們</h4>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-border/40 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} NUWE Beauty. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
