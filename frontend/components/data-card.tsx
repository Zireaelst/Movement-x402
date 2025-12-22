"use client";

import { useState } from "react";
import { useSmartWallet } from "./dual-wallet-provider";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { 
  Lock, 
  Unlock, 
  Database, 
  ImageIcon, 
  FileText, 
  Music, 
  Video,
  Loader2,
  CheckCircle,
  ExternalLink,
  Download
} from "lucide-react";
import { toast } from "sonner";

// ==================== Types ====================

export interface DataItem {
  id: number;
  name: string;
  description: string;
  category: "images" | "text" | "audio" | "video" | "structured";
  price: number; // in MOVE tokens
  owner: string;
  dataUri: string;
  previewImage?: string;
  purchaseCount: number;
  isActive: boolean;
}

interface DataCardProps {
  item: DataItem;
  onPurchaseSuccess?: (dataId: number, dataUri: string) => void;
}

// ==================== Constants ====================

const MARKETPLACE_ADDRESS = process.env.NEXT_PUBLIC_MARKETPLACE_ADDRESS || "";

const CATEGORY_ICONS = {
  images: ImageIcon,
  text: FileText,
  audio: Music,
  video: Video,
  structured: Database,
};

const CATEGORY_COLORS = {
  images: "bg-pink-500/10 text-pink-500",
  text: "bg-blue-500/10 text-blue-500",
  audio: "bg-purple-500/10 text-purple-500",
  video: "bg-orange-500/10 text-orange-500",
  structured: "bg-green-500/10 text-green-500",
};

// ==================== Component ====================

export function DataCard({ item, onPurchaseSuccess }: DataCardProps) {
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [hasAccess, setHasAccess] = useState(false);
  const [txHash, setTxHash] = useState<string | null>(null);

  const { isConnected, address, submitTransaction, walletType } = useSmartWallet();

  const CategoryIcon = CATEGORY_ICONS[item.category];
  const categoryColor = CATEGORY_COLORS[item.category];

  const formatPrice = (price: number) => {
    return price.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 4,
    });
  };

  const handlePurchase = async () => {
    if (!isConnected || !address) {
      toast.error("Please connect your wallet first");
      return;
    }

    if (!MARKETPLACE_ADDRESS) {
      toast.error("Marketplace address not configured");
      return;
    }

    setIsPurchasing(true);

    try {
      // Price is already in the correct format for the smart contract
      // (smart contract handles conversion internally)

      const payload = {
        function: `${MARKETPLACE_ADDRESS}::data_market::purchase_access`,
        typeArguments: [],
        functionArguments: [MARKETPLACE_ADDRESS, item.id],
      };

      toast.info(`Purchasing "${item.name}" for ${item.price} MOVE...`, {
        description: `Using ${walletType === "privy" ? "Email Wallet" : "Connected Wallet"}`,
      });

      const hash = await submitTransaction(payload);
      
      setTxHash(hash);
      setHasAccess(true);

      toast.success("Purchase successful!", {
        description: `Transaction: ${hash.slice(0, 10)}...`,
        action: {
          label: "View",
          onClick: () => window.open(`https://explorer.movementlabs.xyz/txn/${hash}`, "_blank"),
        },
      });

      onPurchaseSuccess?.(item.id, item.dataUri);

    } catch (error) {
      console.error("Purchase error:", error);
      toast.error("Purchase failed", {
        description: error instanceof Error ? error.message : "Unknown error occurred",
      });
    } finally {
      setIsPurchasing(false);
    }
  };

  const handleDownload = () => {
    if (hasAccess && item.dataUri) {
      // In production, this would fetch from IPFS or backend
      window.open(item.dataUri, "_blank");
    }
  };

  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      {/* Preview Image or Placeholder */}
      <div className="relative aspect-video bg-muted">
        {item.previewImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={item.previewImage}
            alt={item.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <CategoryIcon className="h-16 w-16 text-muted-foreground/30" />
          </div>
        )}
        
        {/* Category Badge */}
        <div className={`absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-medium ${categoryColor}`}>
          <CategoryIcon className="mr-1 inline-block h-3 w-3" />
          {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
        </div>

        {/* Lock/Unlock Overlay */}
        {!hasAccess && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/60">
            <Lock className="h-12 w-12 text-white/70" />
          </div>
        )}

        {hasAccess && (
          <div className="absolute right-3 top-3">
            <div className="rounded-full bg-green-500 p-1">
              <CheckCircle className="h-4 w-4 text-white" />
            </div>
          </div>
        )}
      </div>

      <CardHeader className="pb-2">
        <CardTitle className="line-clamp-1 text-lg">{item.name}</CardTitle>
        <CardDescription className="line-clamp-2">{item.description}</CardDescription>
      </CardHeader>

      <CardContent className="pb-2">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>Purchases: {item.purchaseCount}</span>
          <span className="font-mono text-xs">
            {item.owner.slice(0, 6)}...{item.owner.slice(-4)}
          </span>
        </div>
      </CardContent>

      <CardFooter className="flex items-center justify-between border-t pt-4">
        <div className="flex flex-col">
          <span className="text-xs text-muted-foreground">Price</span>
          <span className="text-lg font-bold">{formatPrice(item.price)} MOVE</span>
        </div>

        {hasAccess ? (
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleDownload}>
              <Download className="mr-2 h-4 w-4" />
              Access Data
            </Button>
            {txHash && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => window.open(`https://explorer.movementlabs.xyz/txn/${txHash}`, "_blank")}
              >
                <ExternalLink className="h-4 w-4" />
              </Button>
            )}
          </div>
        ) : (
          <Button
            onClick={handlePurchase}
            disabled={!isConnected || isPurchasing}
            className="gap-2"
          >
            {isPurchasing ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Purchasing...
              </>
            ) : !isConnected ? (
              <>
                <Lock className="h-4 w-4" />
                Connect to Buy
              </>
            ) : (
              <>
                <Unlock className="h-4 w-4" />
                Buy Now
              </>
            )}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

// ==================== Sample Data Grid ====================

interface DataGridProps {
  items: DataItem[];
}

export function DataGrid({ items }: DataGridProps) {
  const handlePurchaseSuccess = (dataId: number, dataUri: string) => {
    console.log(`Unlocked access to data ID ${dataId}: ${dataUri}`);
  };

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {items.map((item) => (
        <DataCard
          key={item.id}
          item={item}
          onPurchaseSuccess={handlePurchaseSuccess}
        />
      ))}
    </div>
  );
}

// ==================== Sample Data for Testing ====================

export const SAMPLE_DATA_ITEMS: DataItem[] = [
  {
    id: 1,
    name: "Medical Image Dataset v1",
    description: "10,000 annotated X-ray images for AI training. Includes labels for common conditions.",
    category: "images",
    price: 0.5,
    owner: "0x1a2b3c4d5e6f7890abcdef1234567890abcdef12",
    dataUri: "ipfs://QmExampleHash1",
    previewImage: "/samples/medical-preview.jpg",
    purchaseCount: 156,
    isActive: true,
  },
  {
    id: 2,
    name: "Financial News Corpus",
    description: "2 million financial news articles from 2020-2024 with sentiment labels.",
    category: "text",
    price: 1.2,
    owner: "0x2b3c4d5e6f7890abcdef1234567890abcdef1234",
    dataUri: "ipfs://QmExampleHash2",
    purchaseCount: 89,
    isActive: true,
  },
  {
    id: 3,
    name: "Podcast Transcription Data",
    description: "500 hours of podcast audio with accurate transcriptions for speech-to-text models.",
    category: "audio",
    price: 0.8,
    owner: "0x3c4d5e6f7890abcdef1234567890abcdef123456",
    dataUri: "ipfs://QmExampleHash3",
    purchaseCount: 234,
    isActive: true,
  },
  {
    id: 4,
    name: "Traffic Camera Footage",
    description: "24 hours of anonymized traffic camera footage for autonomous vehicle training.",
    category: "video",
    price: 2.5,
    owner: "0x4d5e6f7890abcdef1234567890abcdef12345678",
    dataUri: "ipfs://QmExampleHash4",
    purchaseCount: 45,
    isActive: true,
  },
  {
    id: 5,
    name: "E-commerce Transaction DB",
    description: "1 million anonymized e-commerce transactions with product categories and user behaviors.",
    category: "structured",
    price: 1.8,
    owner: "0x5e6f7890abcdef1234567890abcdef1234567890",
    dataUri: "ipfs://QmExampleHash5",
    purchaseCount: 178,
    isActive: true,
  },
  {
    id: 6,
    name: "Satellite Imagery Pack",
    description: "High-resolution satellite images of urban areas with building segmentation masks.",
    category: "images",
    price: 3.0,
    owner: "0x6f7890abcdef1234567890abcdef12345678901a",
    dataUri: "ipfs://QmExampleHash6",
    purchaseCount: 67,
    isActive: true,
  },
];
