"use client";

import { useState } from "react";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Zap, TrendingUp, Shield, Database, Loader2, CheckCircle2 } from "lucide-react";
import { useSmartWallet } from "@/components/dual-wallet-provider";
import { toast } from "sonner";
import Link from "next/link";

interface MarketplaceServiceCardProps {
  id: number;
  name: string;
  description: string;
  price: number; // in MOVE
  category: "ai" | "data" | "compute" | "oracle";
  owner: string;
  requests: number;
  rating: number;
}

const CATEGORY_CONFIG = {
  ai: {
    icon: Zap,
    color: "bg-purple-500/10 text-purple-500 border-purple-500/20",
    gradient: "from-purple-500/20 to-pink-500/20",
    label: "AI Model",
  },
  data: {
    icon: Database,
    color: "bg-cyan-500/10 text-cyan-500 border-cyan-500/20",
    gradient: "from-cyan-500/20 to-blue-500/20",
    label: "Data Feed",
  },
  compute: {
    icon: TrendingUp,
    color: "bg-orange-500/10 text-orange-500 border-orange-500/20",
    gradient: "from-orange-500/20 to-red-500/20",
    label: "Compute",
  },
  oracle: {
    icon: Shield,
    color: "bg-green-500/10 text-green-500 border-green-500/20",
    gradient: "from-green-500/20 to-emerald-500/20",
    label: "Oracle",
  },
};

export function MarketplaceServiceCard({
  id,
  name,
  description,
  price,
  category,
  owner,
  requests,
  rating,
}: MarketplaceServiceCardProps) {
  const { isConnected, submitTransaction } = useSmartWallet();
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const config = CATEGORY_CONFIG[category];
  const IconComponent = config.icon;

  const handleSubscribe = async () => {
    if (!isConnected) {
      toast.error("Please connect your wallet first");
      return;
    }

    setIsSubscribing(true);
    
    try {
      // Smart contract interaction
      const marketplaceAddress = process.env.NEXT_PUBLIC_MARKETPLACE_ADDRESS || "0x1";
      
      const payload = {
        type: "entry_function_payload" as const,
        function: `${marketplaceAddress}::data_market::purchase_access`,
        typeArguments: [],
        functionArguments: [marketplaceAddress, id.toString()],
      };

      toast.info("Confirming transaction...");
      
      const txHash = await submitTransaction(payload);
      
      toast.success(
        <div className="flex flex-col gap-1">
          <span className="font-bold">Subscription successful! 🎉</span>
          <span className="text-xs opacity-80">Transaction: {txHash?.slice(0, 10)}...</span>
        </div>
      );
      
      setIsSubscribed(true);
    } catch (error) {
      console.error("Subscribe error:", error);
      const message = error instanceof Error ? error.message : "Failed to subscribe";
      toast.error(message);
    } finally {
      setIsSubscribing(false);
    }
  };

  return (
    <CardContainer className="inter-var w-full">
      <CardBody className="relative group/card hover:shadow-2xl hover:shadow-purple-500/[0.1] bg-slate-900 border border-slate-800 w-full h-full rounded-xl p-6">
        {/* Gradient Background */}
        <div
          className={`absolute inset-0 rounded-xl bg-gradient-to-br ${config.gradient} opacity-0 group-hover/card:opacity-100 transition-opacity duration-500`}
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col h-full">
          <CardItem translateZ="50" className="flex items-start justify-between w-full mb-4">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${config.color} border`}>
                <IconComponent className="h-5 w-5" />
              </div>
              <div>
                <Badge variant="outline" className={`text-xs mb-1 ${config.color}`}>
                  {config.label}
                </Badge>
              </div>
            </div>
          </CardItem>

          <CardItem translateZ="60" as="h3" className="text-xl font-bold text-slate-100 mb-2">
            {name}
          </CardItem>

          <CardItem
            as="p"
            translateZ="60"
            className="text-sm text-slate-300 mb-4 leading-relaxed flex-1"
          >
            {description}
          </CardItem>

          {/* Stats */}
          <CardItem translateZ="50" className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4 text-xs text-slate-400">
              <span className="flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                {requests.toLocaleString()} requests
              </span>
              <span className="flex items-center gap-1">
                ★ {rating.toFixed(1)}
              </span>
            </div>
            <span className="text-xs text-slate-500 font-mono">{owner}</span>
          </CardItem>

          {/* Pricing & CTA */}
          <CardItem translateZ="70" className="w-full">
            <div className="flex items-center justify-between p-4 rounded-lg bg-slate-800/50 border border-slate-700">
              <div>
                <p className="text-xs text-slate-400">Price per use</p>
                <p className="text-2xl font-bold text-slate-100">
                  {price.toFixed(4)}{" "}
                  <span className="text-sm font-normal text-purple-400">MOVE</span>
                </p>
              </div>
              <div className="flex gap-2">
                <Link href={`/service/${id}`}>
                  <Button variant="outline" className="border-slate-700 hover:bg-slate-800">
                    Details
                  </Button>
                </Link>
                <Button
                  onClick={handleSubscribe}
                  disabled={isSubscribing || isSubscribed || !isConnected}
                  className={`${
                    isSubscribed
                      ? "bg-green-500/20 text-green-400 border border-green-500/20"
                      : "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                  } text-white border-0 min-w-[120px]`}
                >
                  {isSubscribing ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      Processing...
                    </>
                  ) : isSubscribed ? (
                    <>
                      <CheckCircle2 className="h-4 w-4 mr-2" />
                      Subscribed
                    </>
                  ) : (
                    "Subscribe"
                  )}
                </Button>
              </div>
            </div>
          </CardItem>

          {!isConnected && (
            <CardItem translateZ="40" className="mt-2">
              <p className="text-xs text-amber-500/80 text-center">
                Connect wallet to subscribe
              </p>
            </CardItem>
          )}
        </div>

        {/* Shine Effect */}
        <div className="absolute inset-0 rounded-xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      </CardBody>
    </CardContainer>
  );
}
