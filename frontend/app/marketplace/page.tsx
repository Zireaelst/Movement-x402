"use client";

import { useState, useEffect } from "react";
import { MarketplaceServiceCard } from "@/components/marketplace-service-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, SlidersHorizontal, Terminal, Plus, LayoutDashboard, Package, CreditCard, Settings, Menu, X } from "lucide-react";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { ConnectButton } from "@/components/connect-button";
import { useSmartWallet } from "@/components/dual-wallet-provider";
import Link from "next/link";

// Sample services - in production, fetch from smart contract
const SAMPLE_SERVICES = [
  {
    id: 1,
    name: "GPT-4 Turbo Access",
    description: "Advanced language model API with 128k context window. Perfect for complex reasoning and long-form content.",
    price: 0.025,
    category: "ai" as const,
    owner: "0x1a2b3c4d...",
    requests: 1250,
    rating: 4.9,
  },
  {
    id: 2,
    name: "Real-Time Price Oracle",
    description: "Instant crypto price feeds with millisecond latency. Supports 100+ trading pairs.",
    price: 0.001,
    category: "oracle" as const,
    owner: "0x5e6f7g8h...",
    requests: 4500,
    rating: 5.0,
  },
  {
    id: 3,
    name: "Cloud GPU Training",
    description: "High-performance A100 GPU cluster for ML model training. Pay per compute hour.",
    price: 0.15,
    category: "compute" as const,
    owner: "0x9i0j1k2l...",
    requests: 320,
    rating: 4.8,
  },
  {
    id: 4,
    name: "Financial Data API",
    description: "Historical and real-time market data. Stocks, forex, crypto with 10-year history.",
    price: 0.005,
    category: "data" as const,
    owner: "0x3m4n5o6p...",
    requests: 2800,
    rating: 4.7,
  },
  {
    id: 5,
    name: "Image Generation AI",
    description: "State-of-the-art diffusion models. Generate photorealistic images from text prompts.",
    price: 0.01,
    category: "ai" as const,
    owner: "0x7q8r9s0t...",
    requests: 1890,
    rating: 4.9,
  },
  {
    id: 6,
    name: "Weather Data Oracle",
    description: "Global weather forecasts and historical climate data. Updated every 15 minutes.",
    price: 0.002,
    category: "oracle" as const,
    owner: "0x1u2v3w4x...",
    requests: 3200,
    rating: 4.6,
  },
];

const CATEGORIES = [
  { value: "all", label: "All Categories" },
  { value: "ai", label: "🤖 AI Models" },
  { value: "data", label: "📊 Data Feeds" },
  { value: "compute", label: "⚡ Compute" },
  { value: "oracle", label: "🔮 Oracles" },
];

export default function MarketplacePage() {
  const { isConnected, getBalance } = useSmartWallet();
  const [balance, setBalance] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("popular");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const fetchBalance = async () => {
      if (isConnected) {
        const bal = await getBalance();
        setBalance(bal);
      }
    };
    fetchBalance();
  }, [isConnected, getBalance]);

  const filteredServices = SAMPLE_SERVICES.filter((service) => {
    const matchesSearch =
      service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || service.category === selectedCategory;
    return matchesSearch && matchesCategory;
  }).sort((a, b) => {
    if (sortBy === "popular") return b.requests - a.requests;
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "price-high") return b.price - a.price;
    if (sortBy === "rating") return b.rating - a.rating;
    return 0;
  });

  return (
    <div className="min-h-screen bg-slate-950 relative overflow-hidden">
      <BackgroundBeams />
      
      <div className="relative z-10">
        {/* Main Header with Navigation */}
        <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-xl sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <Link href="/" className="flex items-center gap-3">
                <div className="relative">
                  <div className="absolute inset-0 animate-pulse rounded-lg bg-purple-500/20 blur-lg" />
                  <Terminal className="relative h-7 w-7 text-purple-400" />
                </div>
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    AI Data Buffet
                  </h1>
                  <p className="text-[10px] text-slate-500 font-mono">Movement L1</p>
                </div>
              </Link>

              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center gap-1">
                <Link href="/marketplace">
                  <Button variant="ghost" className="text-slate-400 hover:text-slate-100 hover:bg-slate-800">
                    Marketplace
                  </Button>
                </Link>
                {isConnected && (
                  <>
                    <Link href="/dashboard">
                      <Button variant="ghost" className="text-slate-400 hover:text-slate-100 hover:bg-slate-800">
                        <LayoutDashboard className="h-4 w-4 mr-2" />
                        Dashboard
                      </Button>
                    </Link>
                    <Link href="/dashboard/my-services">
                      <Button variant="ghost" className="text-slate-400 hover:text-slate-100 hover:bg-slate-800">
                        <Package className="h-4 w-4 mr-2" />
                        My Services
                      </Button>
                    </Link>
                    <Link href="/dashboard/subscriptions">
                      <Button variant="ghost" className="text-slate-400 hover:text-slate-100 hover:bg-slate-800">
                        <CreditCard className="h-4 w-4 mr-2" />
                        Subscriptions
                      </Button>
                    </Link>
                  </>
                )}
              </nav>

              {/* Right Side - Balance & Connect */}
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
                
                {/* Mobile Menu Button */}
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="md:hidden p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-slate-100"
                >
                  {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
              <div className="md:hidden mt-4 pb-4 border-t border-slate-800 pt-4 space-y-2">
                <Link href="/marketplace">
                  <Button variant="ghost" className="w-full justify-start text-slate-400 hover:text-slate-100">
                    Marketplace
                  </Button>
                </Link>
                {isConnected && (
                  <>
                    <Link href="/dashboard">
                      <Button variant="ghost" className="w-full justify-start text-slate-400 hover:text-slate-100">
                        <LayoutDashboard className="h-4 w-4 mr-2" />
                        Dashboard
                      </Button>
                    </Link>
                    <Link href="/dashboard/my-services">
                      <Button variant="ghost" className="w-full justify-start text-slate-400 hover:text-slate-100">
                        <Package className="h-4 w-4 mr-2" />
                        My Services
                      </Button>
                    </Link>
                    <Link href="/dashboard/subscriptions">
                      <Button variant="ghost" className="w-full justify-start text-slate-400 hover:text-slate-100">
                        <CreditCard className="h-4 w-4 mr-2" />
                        Subscriptions
                      </Button>
                    </Link>
                    <Link href="/dashboard/settings">
                      <Button variant="ghost" className="w-full justify-start text-slate-400 hover:text-slate-100">
                        <Settings className="h-4 w-4 mr-2" />
                        Settings
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>
        </header>

        {/* Page Header */}
        <div className="border-b border-slate-800 bg-slate-950/60 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-4xl font-bold text-slate-100">Marketplace</h1>
                <p className="text-slate-400 mt-2">
                  Discover and subscribe to AI services from the community
                </p>
              </div>
              {isConnected && (
                <Link href="/dashboard/my-services/new">
                  <Button className="bg-purple-500 hover:bg-purple-600 text-white">
                    <Plus className="h-4 w-4 mr-2" />
                    List Your Service
                  </Button>
                </Link>
              )}
            </div>

            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <Input
                  placeholder="Search services..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-slate-900/50 border-slate-800 text-slate-100"
                />
              </div>

              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-[200px] bg-slate-900/50 border-slate-800 text-slate-100">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent className="bg-slate-900 border-slate-800">
                  {CATEGORIES.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px] bg-slate-900/50 border-slate-800 text-slate-100">
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent className="bg-slate-900 border-slate-800">
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div className="max-w-7xl mx-auto px-6 py-12">
          {filteredServices.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-slate-400 text-lg">No services found matching your criteria.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredServices.map((service) => (
                <MarketplaceServiceCard
                  key={service.id}
                  id={service.id}
                  name={service.name}
                  description={service.description}
                  price={service.price}
                  category={service.category}
                  owner={service.owner}
                  requests={service.requests}
                  rating={service.rating}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
