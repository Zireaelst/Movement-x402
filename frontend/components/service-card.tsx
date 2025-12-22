"use client";

import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Zap, TrendingUp, Shield, Database } from "lucide-react";

export interface ServiceCardData {
  id: string;
  name: string;
  description: string;
  pricePerRequest: number; // in MOVE
  category: "ai" | "data" | "compute" | "oracle";
  provider: string;
  requestsCount: number;
  rating: number;
  features: string[];
  icon?: React.ReactNode;
}

interface ServiceCardProps {
  service: ServiceCardData;
  onSubscribe?: (serviceId: string) => void;
}

const CATEGORY_CONFIG = {
  ai: {
    icon: Zap,
    color: "bg-purple-500/10 text-purple-500 border-purple-500/20",
    gradient: "from-purple-500/20 to-pink-500/20",
  },
  data: {
    icon: Database,
    color: "bg-cyan-500/10 text-cyan-500 border-cyan-500/20",
    gradient: "from-cyan-500/20 to-blue-500/20",
  },
  compute: {
    icon: TrendingUp,
    color: "bg-orange-500/10 text-orange-500 border-orange-500/20",
    gradient: "from-orange-500/20 to-red-500/20",
  },
  oracle: {
    icon: Shield,
    color: "bg-green-500/10 text-green-500 border-green-500/20",
    gradient: "from-green-500/20 to-emerald-500/20",
  },
};

export function ServiceCard({ service, onSubscribe }: ServiceCardProps) {
  const config = CATEGORY_CONFIG[service.category];
  const IconComponent = config.icon;

  return (
    <CardContainer className="inter-var">
      <CardBody className="relative group/card hover:shadow-2xl hover:shadow-purple-500/[0.1] bg-slate-900 border border-slate-800 w-auto sm:w-[30rem] h-auto rounded-xl p-6">
        {/* Gradient Background */}
        <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${config.gradient} opacity-0 group-hover/card:opacity-100 transition-opacity duration-500`} />
        
        {/* Content */}
        <div className="relative z-10">
          <CardItem
            translateZ="50"
            className="flex items-start justify-between w-full mb-4"
          >
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${config.color} border`}>
                <IconComponent className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-100">
                  {service.name}
                </h3>
                <p className="text-xs text-slate-400">{service.provider}</p>
              </div>
            </div>
          </CardItem>

          <CardItem
            as="p"
            translateZ="60"
            className="text-sm text-slate-300 mb-4 leading-relaxed"
          >
            {service.description}
          </CardItem>

          {/* Features */}
          <CardItem translateZ="40" className="flex flex-wrap gap-2 mb-4">
            {service.features.slice(0, 3).map((feature, idx) => (
              <Badge
                key={idx}
                variant="secondary"
                className="text-xs bg-slate-800/50 text-slate-300 border-slate-700"
              >
                {feature}
              </Badge>
            ))}
          </CardItem>

          {/* Stats */}
          <CardItem translateZ="50" className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4 text-xs text-slate-400">
              <span className="flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                {service.requestsCount.toLocaleString()} requests
              </span>
              <span>★ {service.rating.toFixed(1)}</span>
            </div>
          </CardItem>

          {/* Pricing & CTA */}
          <CardItem translateZ="70" className="w-full">
            <div className="flex items-center justify-between p-4 rounded-lg bg-slate-800/50 border border-slate-700">
              <div>
                <p className="text-xs text-slate-400">Price per request</p>
                <p className="text-2xl font-bold text-slate-100">
                  {service.pricePerRequest.toFixed(4)}{" "}
                  <span className="text-sm font-normal text-purple-400">MOVE</span>
                </p>
              </div>
              <Button
                onClick={() => onSubscribe?.(service.id)}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0"
              >
                Subscribe
              </Button>
            </div>
          </CardItem>
        </div>

        {/* Shine Effect */}
        <div className="absolute inset-0 rounded-xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      </CardBody>
    </CardContainer>
  );
}

// Sample data for testing
export const SAMPLE_SERVICES: ServiceCardData[] = [
  {
    id: "gpt4-api",
    name: "GPT-4 Turbo Access",
    description: "Access OpenAI's GPT-4 Turbo with x402 payment rails. No subscription needed, pay per token.",
    pricePerRequest: 0.0025,
    category: "ai",
    provider: "OpenAI Bridge",
    requestsCount: 145230,
    rating: 4.8,
    features: ["128K context", "JSON mode", "Function calling"],
  },
  {
    id: "crypto-oracle",
    name: "Real-Time Price Oracle",
    description: "Get verified crypto prices with cryptographic proofs. Perfect for DeFi apps and trading bots.",
    pricePerRequest: 0.0001,
    category: "oracle",
    provider: "ChainLink x Movement",
    requestsCount: 892451,
    rating: 4.9,
    features: ["Sub-second latency", "50+ pairs", "Price proofs"],
  },
  {
    id: "ml-training",
    name: "Distributed ML Training",
    description: "Train your models on distributed GPU clusters. Scale from 1 to 1000 GPUs on demand.",
    pricePerRequest: 0.15,
    category: "compute",
    provider: "Akash Network",
    requestsCount: 12847,
    rating: 4.7,
    features: ["H100 GPUs", "PyTorch/TF", "Auto-scaling"],
  },
  {
    id: "financial-data",
    name: "Financial Market Data",
    description: "Real-time stock, forex, and crypto market data. Historical data included.",
    pricePerRequest: 0.005,
    category: "data",
    provider: "Alpha Vantage Pro",
    requestsCount: 324589,
    rating: 4.6,
    features: ["Real-time", "15 years history", "Technical indicators"],
  },
];
