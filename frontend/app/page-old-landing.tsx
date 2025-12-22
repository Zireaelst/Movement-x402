"use client";

import { BackgroundBeams } from "@/components/ui/background-beams";
import { ConnectButton } from "@/components/connect-button";
import { useSmartWallet } from "@/components/dual-wallet-provider";
import { Button } from "@/components/ui/button";
import {
  Zap,
  Shield,
  Gauge,
  ArrowRight,
  Terminal,
  Sparkles,
  Lock,
  TrendingUp,
  Code2,
  Coins,
  Globe,
  Cpu,
  Database,
  Wallet,
  Mail,
  ChevronRight,
  CheckCircle2,
  Play,
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function LandingPage() {
  const { isConnected } = useSmartWallet();
  const balance = 0; // Will be implemented with useEffect

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 overflow-hidden">
      {/* Header */}
      <header className="fixed top-0 z-50 w-full border-b border-slate-800/50 bg-slate-950/80 backdrop-blur-xl">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 animate-pulse rounded-lg bg-purple-500/20 blur-lg" />
              <Terminal className="relative h-7 w-7 text-purple-400" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Nexus AI Layer
              </h1>
              <p className="text-[10px] text-slate-500 font-mono">x402.network</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {isConnected && (
              <div className="hidden sm:flex items-center gap-3 px-4 py-2 rounded-lg bg-slate-900/50 border border-slate-800">
                <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs text-slate-400">Balance:</span>
                <span className="font-mono font-bold text-sm text-purple-400">
                  {balance.toFixed(4)} MOVE
                </span>
              </div>
            )}
            <ConnectButton />
          </div>
        </div>
      </header>

      {/* Hero Section with Background Beams */}
      <section className="relative min-h-screen flex items-center justify-center pt-16">
        <BackgroundBeams />
        
        <div className="relative z-10 container mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-5xl mx-auto text-center space-y-8"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm"
            >
              <Sparkles className="h-4 w-4" />
              <span>Powered by Movement L1 • Built with x402</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl sm:text-7xl font-bold leading-tight"
            >
              The{" "}
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                Liquidity Layer
              </span>
              <br />
              for AGI
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl sm:text-2xl text-slate-400 max-w-3xl mx-auto leading-relaxed"
            >
              Stream money to AI Agents. Monetize your data per token.
              <br />
              <span className="text-purple-400 font-semibold">
                No subscriptions. No rate limits. Pure utility.
              </span>
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
            >
              {!isConnected ? (
                <>
                  <ConnectButton />
                  <Button
                    variant="outline"
                    className="border-slate-700 bg-slate-900/50 hover:bg-slate-800 text-slate-100 backdrop-blur-sm gap-2"
                  >
                    View Documentation
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </>
              ) : (
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0 text-lg px-8 gap-2 shadow-lg shadow-purple-500/25"
                  onClick={() => {
                    document.getElementById("marketplace")?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  <Zap className="h-5 w-5" />
                  Enter Marketplace
                </Button>
              )}
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-3 gap-8 max-w-2xl mx-auto pt-12"
            >
              {[
                { label: "Active Services", value: "47", icon: Zap },
                { label: "Transactions", value: "1.2M", icon: TrendingUp },
                { label: "Uptime", value: "99.9%", icon: Shield },
              ].map((stat, idx) => (
                <div key={idx} className="text-center">
                  <stat.icon className="h-6 w-6 mx-auto mb-2 text-purple-400" />
                  <p className="text-3xl font-bold text-slate-100">{stat.value}</p>
                  <p className="text-sm text-slate-500">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="flex flex-col items-center gap-2 text-slate-500">
            <span className="text-xs font-mono">SCROLL</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="h-12 w-6 rounded-full border-2 border-slate-700 flex items-start justify-center pt-2"
            >
              <div className="h-2 w-1 rounded-full bg-purple-400" />
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="relative py-32 border-t border-slate-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Built for the{" "}
              <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Agent Economy
              </span>
            </h2>
            <p className="text-slate-400 text-lg">
              x402 Payment Rails enable machine-to-machine micropayments
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: Lock,
                title: "x402 Payment Rails",
                description:
                  "HTTP 402 Payment Required. The protocol for the Internet of Value. Every API call is a transaction.",
                gradient: "from-purple-500/20 to-pink-500/20",
              },
              {
                icon: Shield,
                title: "Dual Wallet Support",
                description:
                  "Crypto natives use Petra/Pontem. Newcomers login with Email via Privy. One marketplace, zero friction.",
                gradient: "from-cyan-500/20 to-blue-500/20",
              },
              {
                icon: Gauge,
                title: "Instant Settlement",
                description:
                  "Sub-second finality on Movement L1. Your agents don't wait. Neither do you. Real-time liquidity.",
                gradient: "from-orange-500/20 to-red-500/20",
              },
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="group relative"
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" 
                     style={{ background: `linear-gradient(to bottom right, ${feature.gradient})` }} />
                <div className="relative p-8 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-slate-700 transition-all duration-300 h-full">
                  <div className="mb-4 p-3 rounded-lg bg-slate-800/50 w-fit">
                    <feature.icon className="h-6 w-6 text-purple-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-slate-100">
                    {feature.title}
                  </h3>
                  <p className="text-slate-400 leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Marketplace Section */}
      <section id="marketplace" className="relative py-32 border-t border-slate-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Active Services
              </span>
            </h2>
            <p className="text-slate-400 text-lg">
              Pay-per-use AI, Data, and Compute services
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
            {SAMPLE_SERVICES.map((service, idx) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <ServiceCard
                  service={service}
                  onSubscribe={(id) => {
                    console.log("Subscribe to:", id);
                    // TODO: Implement subscription logic
                  }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-slate-800 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-500">
            <div className="flex items-center gap-3">
              <Terminal className="h-5 w-5 text-purple-400" />
              <span className="font-mono">Nexus AI Layer</span>
            </div>
            <div className="flex items-center gap-6">
              <a href="https://movementlabs.xyz" target="_blank" rel="noopener noreferrer" className="hover:text-purple-400 transition-colors">
                Movement Labs
              </a>
              <a href="#" className="hover:text-purple-400 transition-colors">
                Documentation
              </a>
              <a href="#" className="hover:text-purple-400 transition-colors">
                GitHub
              </a>
            </div>
            <p className="text-xs">Built with x402 • Powered by Movement L1</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
