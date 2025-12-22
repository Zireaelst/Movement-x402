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
  ChevronRight,
  CheckCircle2,
  Play,
  ExternalLink,
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function LandingPage() {
  const { isConnected } = useSmartWallet();

  const features = [
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
  ];

  const useCases = [
    {
      icon: Cpu,
      title: "AI Agents",
      description: "Enable autonomous agents to purchase API access on-demand",
      benefits: ["Pay-per-use", "No rate limits", "Instant access"],
    },
    {
      icon: Database,
      title: "Data Providers",
      description: "Monetize your APIs and datasets with micropayments",
      benefits: ["Per-request pricing", "Global reach", "No middlemen"],
    },
    {
      icon: Code2,
      title: "Developers",
      description: "Integrate AI services without subscriptions or lock-ins",
      benefits: ["Simple API", "Multiple models", "Cost-efficient"],
    },
  ];

  const howItWorks = [
    {
      step: "1",
      title: "Connect",
      description: "Login with Email/Google or connect your crypto wallet",
      icon: Wallet,
    },
    {
      step: "2",
      title: "Deposit",
      description: "Add MOVE tokens to your Gas Tank for frictionless usage",
      icon: Coins,
    },
    {
      step: "3",
      title: "Use",
      description: "Access AI models, data feeds, and compute - pay per request",
      icon: Zap,
    },
    {
      step: "4",
      title: "Scale",
      description: "From 1 to 1M requests - pricing scales automatically",
      icon: TrendingUp,
    },
  ];

  const stats = [
    { label: "Active Services", value: "47", icon: Zap },
    { label: "Transactions", value: "1.2M", icon: TrendingUp },
    { label: "Uptime", value: "99.9%", icon: Shield },
    { label: "Avg Response", value: "<2s", icon: Gauge },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 overflow-hidden">
      {/* Header */}
      <header className="fixed top-0 z-50 w-full border-b border-slate-800/50 bg-slate-950/80 backdrop-blur-xl">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-3">
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
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm">
            <Link href="/marketplace" className="text-slate-400 hover:text-purple-400 transition-colors">
              Marketplace
            </Link>
            <a href="#features" className="text-slate-400 hover:text-purple-400 transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="text-slate-400 hover:text-purple-400 transition-colors">
              How It Works
            </a>
            <a href="#" className="text-slate-400 hover:text-purple-400 transition-colors">
              Docs
            </a>
          </nav>

          <div className="flex items-center gap-4">
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
                    asChild
                  >
                    <Link href="/marketplace">
                      Browse Marketplace
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </>
              ) : (
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0 text-lg px-8 gap-2 shadow-lg shadow-purple-500/25"
                  asChild
                >
                  <Link href="/marketplace">
                    <Zap className="h-5 w-5" />
                    Enter Marketplace
                  </Link>
                </Button>
              )}
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-3xl mx-auto pt-12"
            >
              {stats.map((stat, idx) => (
                <div key={idx} className="text-center">
                  <stat.icon className="h-5 w-5 mx-auto mb-2 text-purple-400" />
                  <p className="text-2xl sm:text-3xl font-bold text-slate-100">{stat.value}</p>
                  <p className="text-xs text-slate-500">{stat.label}</p>
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
      <section id="features" className="relative py-32 border-t border-slate-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm mb-4"
            >
              <Sparkles className="h-4 w-4" />
              <span>Core Features</span>
            </motion.div>
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
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="group relative"
              >
                <div
                  className="absolute inset-0 rounded-2xl bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
                  style={{
                    background: `linear-gradient(to bottom right, ${feature.gradient})`,
                  }}
                />
                <div className="relative p-8 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-slate-700 transition-all duration-300 h-full">
                  <div className="mb-4 p-3 rounded-lg bg-slate-800/50 w-fit">
                    <feature.icon className="h-6 w-6 text-purple-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-slate-100">
                    {feature.title}
                  </h3>
                  <p className="text-slate-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="relative py-32 border-t border-slate-800 bg-gradient-to-b from-slate-950 to-slate-900/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm mb-4"
            >
              <Play className="h-4 w-4" />
              <span>Getting Started</span>
            </motion.div>
            <h2 className="text-4xl font-bold mb-4">
              How It <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Works</span>
            </h2>
            <p className="text-slate-400 text-lg">
              Get started in 4 simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {howItWorks.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15 }}
                className="relative"
              >
                <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-purple-500/50 transition-all duration-300">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-lg">
                      {step.step}
                    </div>
                    <div className="flex-1">
                      <div className="p-2 rounded-lg bg-slate-800/50 w-fit mb-3">
                        <step.icon className="h-5 w-5 text-purple-400" />
                      </div>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-slate-100">
                    {step.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
                {idx < howItWorks.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ChevronRight className="h-6 w-6 text-slate-700" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="relative py-32 border-t border-slate-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm mb-4"
            >
              <Globe className="h-4 w-4" />
              <span>Use Cases</span>
            </motion.div>
            <h2 className="text-4xl font-bold mb-4">
              Built for <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Everyone</span>
            </h2>
            <p className="text-slate-400 text-lg">
              From AI agents to data providers
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {useCases.map((useCase, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="p-8 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-cyan-500/50 transition-all duration-300"
              >
                <div className="mb-6 p-3 rounded-lg bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 w-fit">
                  <useCase.icon className="h-8 w-8 text-cyan-400" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-slate-100">
                  {useCase.title}
                </h3>
                <p className="text-slate-400 mb-6 leading-relaxed">
                  {useCase.description}
                </p>
                <ul className="space-y-2">
                  {useCase.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-slate-300">
                      <CheckCircle2 className="h-4 w-4 text-cyan-400 flex-shrink-0" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 border-t border-slate-800">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center space-y-8 p-12 rounded-3xl bg-gradient-to-br from-purple-500/10 to-cyan-500/10 border border-purple-500/20"
          >
            <h2 className="text-4xl sm:text-5xl font-bold">
              Ready to{" "}
              <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Get Started?
              </span>
            </h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Join the future of AI monetization. Connect your wallet or login with email to start using pay-per-use AI services.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0 text-lg px-8 gap-2 shadow-lg shadow-purple-500/25"
                asChild
              >
                <Link href="/marketplace">
                  <Zap className="h-5 w-5" />
                  Browse Marketplace
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-slate-700 bg-slate-900/50 hover:bg-slate-800 text-slate-100 text-lg px-8 gap-2"
              >
                <ExternalLink className="h-5 w-5" />
                View Documentation
              </Button>
            </div>
          </motion.div>
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
              <Link href="/marketplace" className="hover:text-purple-400 transition-colors">
                Marketplace
              </Link>
              <a
                href="https://movementlabs.xyz"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-purple-400 transition-colors"
              >
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
