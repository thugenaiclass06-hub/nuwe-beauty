import { useState } from "react";
import { motion } from "framer-motion";
import { Star, Quote, PenLine, Loader2, CheckCircle, X } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { CustomerReview } from "@shared/schema";

const defaultReviews = [
  {
    id: "default-1",
    name: "Emily C.",
    email: "",
    rating: 5,
    content: "真的太喜歡 NUWE 的素顏霜了！完全不假白，就像是自己天生的好皮膚。現在上班都只擦這條，氣色好到同事都以為我談戀愛了 😂",
    isApproved: true,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
  },
  {
    id: "default-2",
    name: "小雅 Mia",
    email: "",
    rating: 5,
    content: "身為敏感肌，很難找到適合的底妝。NUWE 這款真的超級溫和！完全沒有致痘或過敏，而且質地好水潤，推開就像塗乳液一樣舒服 ☁️",
    isApproved: true,
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
  },
  {
    id: "default-3",
    name: "Sarah Lin",
    email: "",
    rating: 5,
    content: "被包裝吸引買的，沒想到這麼好用！「從從容容，游刃有餘」這句話真的說到心坎裡。每天早上多睡10分鐘的秘密武器就是它！💯",
    isApproved: true,
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
  }
];

function formatDate(date: Date | string) {
  const d = new Date(date);
  const now = new Date();
  const diffDays = Math.floor((now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) return "今天";
  if (diffDays === 1) return "昨天";
  if (diffDays < 7) return `${diffDays} 天前`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} 週前`;
  return `${Math.floor(diffDays / 30)} 個月前`;
}

function StarRating({ rating, onRatingChange, interactive = false }: { 
  rating: number; 
  onRatingChange?: (rating: number) => void;
  interactive?: boolean;
}) {
  const [hovered, setHovered] = useState(0);
  
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={!interactive}
          className={interactive ? "cursor-pointer transition-transform hover:scale-110" : "cursor-default"}
          onMouseEnter={() => interactive && setHovered(star)}
          onMouseLeave={() => interactive && setHovered(0)}
          onClick={() => interactive && onRatingChange?.(star)}
        >
          <Star 
            size={interactive ? 24 : 14} 
            className={`${(hovered || rating) >= star ? "text-yellow-400 fill-yellow-400" : "text-gray-300"} transition-colors`}
          />
        </button>
      ))}
    </div>
  );
}

function ReviewCard({ review }: { review: typeof defaultReviews[0] | CustomerReview }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white p-6 rounded-2xl shadow-sm border border-border/50 hover:shadow-md transition-shadow"
    >
      <div className="flex items-center gap-3 mb-4">
        <Avatar>
          <AvatarFallback className="bg-blue-100 text-primary font-medium">
            {review.name.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="font-medium text-foreground text-sm">{review.name}</p>
        </div>
        <div className="ml-auto">
          <StarRating rating={review.rating} />
        </div>
      </div>

      <div className="relative">
        <Quote className="absolute -top-2 -left-2 w-6 h-6 text-blue-100 -z-10 rotate-180" />
        <p className="text-foreground/80 leading-relaxed text-sm pl-2">
          {review.content}
        </p>
      </div>
      
      <div className="mt-6 pt-4 border-t border-border/30 flex justify-between items-center">
        <span className="text-xs text-muted-foreground">{formatDate(review.createdAt)}</span>
        <span className="text-xs font-medium text-primary bg-primary/5 px-2 py-1 rounded-full">Verified Buyer</span>
      </div>
    </motion.div>
  );
}

function ReviewForm({ onSuccess }: { onSuccess: () => void }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    rating: 5,
    content: ""
  });
  const [submitted, setSubmitted] = useState(false);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const res = await fetch("/api/reviews", {
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
      queryClient.invalidateQueries({ queryKey: ["/api/reviews"] });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  if (submitted) {
    return (
      <div className="text-center py-8 space-y-4">
        <div className="w-16 h-16 rounded-full bg-green-100 mx-auto flex items-center justify-center">
          <CheckCircle className="w-8 h-8 text-green-500" />
        </div>
        <h3 className="text-xl font-serif text-foreground">感謝您的評價！</h3>
        <p className="text-muted-foreground text-sm">
          您的評價會在審核通過後顯示在網站上。
        </p>
        <DialogClose asChild>
          <Button variant="outline" className="rounded-full" onClick={onSuccess}>
            關閉
          </Button>
        </DialogClose>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="review-name">您的暱稱</Label>
          <Input
            id="review-name"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            placeholder="例如：小美"
            required
            className="rounded-lg"
            data-testid="input-review-name"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="review-email">Email（不會公開）</Label>
          <Input
            id="review-email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            placeholder="example@email.com"
            required
            className="rounded-lg"
            data-testid="input-review-email"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>評分</Label>
        <StarRating 
          rating={formData.rating} 
          onRatingChange={(rating) => setFormData(prev => ({ ...prev, rating }))}
          interactive
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="review-content">使用心得</Label>
        <Textarea
          id="review-content"
          value={formData.content}
          onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
          placeholder="分享您使用 NUWE 產品的感受..."
          required
          rows={4}
          className="rounded-lg resize-none"
          data-testid="input-review-content"
        />
      </div>

      {mutation.isError && (
        <p className="text-red-500 text-sm">{mutation.error.message}</p>
      )}

      <Button 
        type="submit" 
        className="w-full rounded-full"
        disabled={mutation.isPending}
        data-testid="button-review-submit"
      >
        {mutation.isPending ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            提交中...
          </>
        ) : (
          "提交評價"
        )}
      </Button>
    </form>
  );
}

export default function Reviews() {
  const { data: apiReviews } = useQuery<CustomerReview[]>({
    queryKey: ["/api/reviews"],
    queryFn: async () => {
      const res = await fetch("/api/reviews");
      if (!res.ok) return [];
      return res.json();
    }
  });

  const allReviews = apiReviews && apiReviews.length > 0 
    ? apiReviews 
    : defaultReviews;

  return (
    <section id="reviews" className="py-24 bg-gradient-to-b from-white to-blue-50/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <span className="text-primary font-medium tracking-wider text-sm uppercase">Social Love</span>
          <h2 className="text-4xl font-serif text-foreground mt-2">網友好評推薦</h2>
          <p className="text-muted-foreground mt-4">聽聽她們的使用心得</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {allReviews.slice(0, 6).map((review, idx) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>

        <div className="text-center">
          <Dialog>
            <DialogTrigger asChild>
              <Button size="lg" variant="outline" className="rounded-full px-8" data-testid="button-write-review">
                <PenLine className="w-4 h-4 mr-2" />
                我也要留下評價
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle className="text-2xl font-serif">分享您的使用心得</DialogTitle>
              </DialogHeader>
              <ReviewForm onSuccess={() => {}} />
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </section>
  );
}
