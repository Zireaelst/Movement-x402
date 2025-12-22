"use client";

import { useState, useEffect } from "react";
import { ConnectButton } from "@/components/connect-button";
import { DataGrid, SAMPLE_DATA_ITEMS, DataItem } from "@/components/data-card";
import { useSmartWallet } from "@/components/dual-wallet-provider";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Filter, Database, Sparkles, Shield, Zap } from "lucide-react";

export default function Home() {
  const { isConnected, getBalance } = useSmartWallet();
  const [balance, setBalance] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [filteredItems, setFilteredItems] = useState<DataItem[]>(SAMPLE_DATA_ITEMS);

  // Fetch balance when connected
  useEffect(() => {
    const fetchBalance = async () => {
      if (isConnected) {
        const bal = await getBalance();
        setBalance(bal);
      }
    };
    fetchBalance();
  }, [isConnected, getBalance]);

  // Filter items based on search and category
  useEffect(() => {
    let items = SAMPLE_DATA_ITEMS;

    if (searchQuery) {
      items = items.filter(
        (item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (categoryFilter !== "all") {
      items = items.filter((item) => item.category === categoryFilter);
    }

    setFilteredItems(items);
  }, [searchQuery, categoryFilter]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <Database className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">AI Data Buffet</span>
          </div>

          <div className="flex items-center gap-4">
            {isConnected && (
              <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground">
                <span>Balance:</span>
                <span className="font-mono font-medium text-foreground">
                  {balance.toFixed(4)} MOVE
                </span>
              </div>
            )}
            <ThemeToggle />
            <ConnectButton />
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        {!isConnected && (
          <section className="relative overflow-hidden border-b bg-gradient-to-b from-primary/5 to-background py-20">
            <div className="container mx-auto px-4">
              <div className="mx-auto max-w-3xl text-center space-y-6">
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                  The <span className="text-primary">Decentralized</span> Marketplace
                  <br />
                  for AI Training Data
                </h1>
                <p className="text-xl text-muted-foreground">
                  Buy and sell high-quality datasets on Movement Network. 
                  Connect with your favorite wallet or login with email.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                  <ConnectButton />
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Features Grid */}
        {!isConnected && (
          <section className="border-b py-16">
            <div className="container mx-auto px-4">
              <div className="grid gap-8 md:grid-cols-3">
                <div className="flex flex-col items-center text-center p-6 rounded-lg bg-card">
                  <div className="rounded-full bg-primary/10 p-4 mb-4">
                    <Shield className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Dual Wallet Support</h3>
                  <p className="text-sm text-muted-foreground">
                    Connect with Petra, Pontem, or Martian wallets. New to crypto? 
                    Login with email via Privy.
                  </p>
                </div>
                <div className="flex flex-col items-center text-center p-6 rounded-lg bg-card">
                  <div className="rounded-full bg-primary/10 p-4 mb-4">
                    <Zap className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Instant Access</h3>
                  <p className="text-sm text-muted-foreground">
                    Purchase data instantly with MOVE tokens. Smart contracts ensure 
                    secure, trustless transactions.
                  </p>
                </div>
                <div className="flex flex-col items-center text-center p-6 rounded-lg bg-card">
                  <div className="rounded-full bg-primary/10 p-4 mb-4">
                    <Sparkles className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Quality Data</h3>
                  <p className="text-sm text-muted-foreground">
                    Curated datasets for AI/ML training. Images, text, audio, video, 
                    and structured data available.
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Marketplace Section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-col gap-6">
              {/* Section Header */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold">Data Marketplace</h2>
                  <p className="text-muted-foreground">
                    Browse and purchase AI training datasets
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
                  {/* Search */}
                  <div className="relative flex-1 sm:flex-none">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Search datasets..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9 sm:w-64"
                    />
                  </div>

                  {/* Category Filter */}
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger className="w-full sm:w-40">
                      <Filter className="mr-2 h-4 w-4" />
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="images">Images</SelectItem>
                      <SelectItem value="text">Text</SelectItem>
                      <SelectItem value="audio">Audio</SelectItem>
                      <SelectItem value="video">Video</SelectItem>
                      <SelectItem value="structured">Structured</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Results count */}
              <div className="text-sm text-muted-foreground">
                Showing {filteredItems.length} datasets
              </div>

              {/* Data Grid */}
              {filteredItems.length > 0 ? (
                <DataGrid items={filteredItems} />
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <Database className="h-12 w-12 text-muted-foreground/30 mb-4" />
                  <h3 className="text-lg font-medium">No datasets found</h3>
                  <p className="text-sm text-muted-foreground">
                    Try adjusting your search or filter criteria
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t mt-auto">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Database className="h-4 w-4" />
              <span>AI Data Buffet</span>
            </div>
            <p>Built on Movement Network • Powered by x402</p>
            <div className="flex items-center gap-4">
              <a href="https://movementlabs.xyz" target="_blank" rel="noopener noreferrer" className="hover:text-foreground">
                Movement Labs
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-foreground">
                GitHub
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
