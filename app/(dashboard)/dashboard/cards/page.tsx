"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CreditCard, Snowflake, Eye, EyeOff, Loader2, CheckCircle, Wifi } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { toast } from "sonner";

export default function CardsPage() {
  const supabase = createSupabaseBrowserClient();
  const [cards, setCards] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [revealedCardId, setRevealedCardId] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => {
    const fetchCards = async () => {
      const res = await fetch("/api/cards");
      const data = await res.json();
      setCards(data || []);
      setLoading(false);
    };
    fetchCards();
  }, []);

  const handleToggleFreeze = async (cardId: string, currentStatus: string) => {
    setUpdatingId(cardId);
    const newStatus = currentStatus === "active" ? "frozen" : "active";

    const res = await fetch(`/api/cards/${cardId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });

    if (res.ok) {
      // Update local state
      setCards(cards.map(c => c.id === cardId ? { ...c, status: newStatus } : c));
      toast.success(`Card ${newStatus === "frozen" ? "frozen" : "unfrozen"} successfully!`);
    } else {
      toast.error("Failed to update card status.");
    }
    setUpdatingId(null);
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">My Cards</h1>
          <p className="text-muted-foreground">Manage your virtual cards.</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {cards.map((card, i) => (
          <div key={card.id} className="space-y-4">
            {/* Visual Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`relative overflow-hidden rounded-2xl p-6 text-white shadow-xl bg-gradient-to-br ${
                card.status === "frozen" ? "from-slate-500 to-slate-700" : "from-[#111a4a] to-[#2f55d4]"
              } h-52 flex flex-col justify-between transition-all duration-300`}
            >
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
              
              {card.status === "frozen" && (
                <div className="absolute inset-0 bg-black/30 backdrop-blur-sm flex flex-col items-center justify-center z-20">
                  <Snowflake className="h-8 w-8 mb-2" />
                  <p className="font-bold text-lg">Card Frozen</p>
                </div>
              )}

              <div className="relative z-10 flex justify-between items-start">
                <div>
                  <p className="text-sm text-white/80 uppercase tracking-wider">{card.card_type}</p>
                  <p className="text-xl font-bold mt-1">CreditExpo</p>
                </div>
                <Wifi className="h-6 w-6 text-white/40 rotate-90" />
              </div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-10 h-7 bg-yellow-400/30 rounded-md"></div>
                  <p className="text-xl font-mono tracking-wider">
                    {revealedCardId === card.id ? card.card_number.match(/.{1,4}/g).join(" ") : `**** **** **** ${card.card_number.slice(-4)}`}
                  </p>
                </div>
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-xs text-white/60">Expiry</p>
                    <p className="text-sm font-semibold">{revealedCardId === card.id ? `${card.expiry_month}/${card.expiry_year}` : "**/**"}</p>
                  </div>
                  <div>
                    <p className="text-xs text-white/60">CVV</p>
                    <p className="text-sm font-semibold">{revealedCardId === card.id ? card.cvv : "***"}</p>
                  </div>
                  <CreditCard className="h-8 w-8 text-white/40" />
                </div>
              </div>
            </motion.div>

            {/* Card Actions */}
            <div className="grid grid-cols-2 gap-2">
              <Button 
                variant="outline" 
                className="hover:border-primary hover:text-primary"
                onClick={() => setRevealedCardId(revealedCardId === card.id ? null : card.id)}
              >
                {revealedCardId === card.id ? <><EyeOff className="h-4 w-4 mr-2" /> Hide</> : <><Eye className="h-4 w-4 mr-2" /> Reveal</>}
              </Button>
              
              <Button 
                variant="outline" 
                className={card.status === "active" ? "hover:border-red-500 hover:text-red-500" : "hover:border-green-500 hover:text-green-500"}
                disabled={updatingId === card.id}
                onClick={() => handleToggleFreeze(card.id, card.status)}
              >
                {updatingId === card.id ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Snowflake className="h-4 w-4 mr-2" />}
                {card.status === "active" ? "Freeze" : "Unfreeze"}
              </Button>
            </div>
          </div>
        ))}
      </div>

      {cards.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-10">
            <CreditCard className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No cards found. Your virtual card is generated automatically upon registration.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}