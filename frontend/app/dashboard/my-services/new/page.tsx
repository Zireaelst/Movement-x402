"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSmartWallet } from "@/components/dual-wallet-provider";
import { toast } from "sonner";
import { ArrowLeft, Loader2, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NewServicePage() {
  const router = useRouter();
  const { isConnected, submitTransaction } = useSmartWallet();
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "ai",
    price: "",
    apiEndpoint: "",
    documentationUrl: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isConnected) {
      toast.error("Please connect your wallet first");
      return;
    }

    // Validation
    if (!formData.name || !formData.description || !formData.price) {
      toast.error("Please fill in all required fields");
      return;
    }

    const price = parseFloat(formData.price);
    if (isNaN(price) || price <= 0) {
      toast.error("Please enter a valid price");
      return;
    }

    setIsLoading(true);

    try {
      const marketplaceAddress = process.env.NEXT_PUBLIC_MARKETPLACE_ADDRESS || "0x1";

      // Convert price to smallest unit (assuming 8 decimals for MOVE)
      const priceInSmallestUnit = Math.floor(price * 100000000);

      const payload = {
        type: "entry_function_payload" as const,
        function: `${marketplaceAddress}::data_market::list_data_item`,
        typeArguments: [],
        functionArguments: [
          priceInSmallestUnit.toString(),
          formData.name,
          formData.description,
          formData.category,
          formData.apiEndpoint || "https://api.example.com",
        ],
      };

      toast.info("Submitting to blockchain...");
      
      const txHash = await submitTransaction(payload);
      
      toast.success(
        <div className="flex flex-col gap-1">
          <span className="font-bold">Service listed successfully! 🎉</span>
          <span className="text-xs opacity-80">Transaction: {txHash?.slice(0, 10)}...</span>
        </div>
      );

      // Redirect to my services page after 2 seconds
      setTimeout(() => {
        router.push("/dashboard/my-services");
      }, 2000);
      
    } catch (error) {
      console.error("List service error:", error);
      const message = error instanceof Error ? error.message : "Failed to list service";
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link href="/dashboard/my-services">
            <Button variant="ghost" className="mb-4 text-slate-400 hover:text-slate-100">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to My Services
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-slate-100">List New Service</h1>
          <p className="text-slate-400 mt-2">
            Make your API available on the marketplace and start earning MOVE tokens
          </p>
        </div>

        {/* Form */}
        <Card className="bg-slate-900/50 border-slate-800">
          <CardHeader>
            <CardTitle className="text-slate-100">Service Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Service Name */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Service Name <span className="text-red-500">*</span>
                </label>
                <Input
                  placeholder="e.g., GPT-4 API Access"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  className="bg-slate-900 border-slate-800 text-slate-100"
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  placeholder="Describe what your service does and its key features..."
                  value={formData.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                  className="w-full min-h-[120px] px-3 py-2 bg-slate-900 border border-slate-800 rounded-md text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Category <span className="text-red-500">*</span>
                </label>
                <Select value={formData.category} onValueChange={(value) => handleChange("category", value)}>
                  <SelectTrigger className="bg-slate-900 border-slate-800 text-slate-100">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-900 border-slate-800">
                    <SelectItem value="ai">🤖 AI Model</SelectItem>
                    <SelectItem value="data">📊 Data Feed</SelectItem>
                    <SelectItem value="compute">⚡ Compute Service</SelectItem>
                    <SelectItem value="oracle">🔮 Oracle</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Price */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Price per Request (MOVE) <span className="text-red-500">*</span>
                </label>
                <Input
                  type="number"
                  step="0.0001"
                  min="0"
                  placeholder="0.001"
                  value={formData.price}
                  onChange={(e) => handleChange("price", e.target.value)}
                  className="bg-slate-900 border-slate-800 text-slate-100"
                  required
                />
                <p className="text-xs text-slate-500 mt-1">
                  Users will pay this amount per API call
                </p>
              </div>

              {/* API Endpoint */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  API Endpoint
                </label>
                <Input
                  type="url"
                  placeholder="https://api.example.com/v1"
                  value={formData.apiEndpoint}
                  onChange={(e) => handleChange("apiEndpoint", e.target.value)}
                  className="bg-slate-900 border-slate-800 text-slate-100"
                />
                <p className="text-xs text-slate-500 mt-1">
                  The base URL for your API service
                </p>
              </div>

              {/* Documentation URL */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Documentation URL
                </label>
                <Input
                  type="url"
                  placeholder="https://docs.example.com"
                  value={formData.documentationUrl}
                  onChange={(e) => handleChange("documentationUrl", e.target.value)}
                  className="bg-slate-900 border-slate-800 text-slate-100"
                />
                <p className="text-xs text-slate-500 mt-1">
                  Link to your API documentation
                </p>
              </div>

              {/* Submit Button */}
              <div className="flex items-center gap-4 pt-4">
                <Button
                  type="submit"
                  disabled={isLoading || !isConnected}
                  className="bg-purple-500 hover:bg-purple-600 text-white flex-1"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      Listing Service...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="h-4 w-4 mr-2" />
                      List Service
                    </>
                  )}
                </Button>
                <Link href="/dashboard/my-services">
                  <Button type="button" variant="outline" className="border-slate-800">
                    Cancel
                  </Button>
                </Link>
              </div>

              {!isConnected && (
                <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/20">
                  <p className="text-sm text-amber-500">
                    ⚠️ Please connect your wallet to list a service
                  </p>
                </div>
              )}
            </form>
          </CardContent>
        </Card>

        {/* Info Card */}
        <Card className="mt-6 bg-slate-900/30 border-slate-800/50">
          <CardContent className="p-6">
            <h3 className="font-semibold text-slate-100 mb-2">📝 Listing Guidelines</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li className="flex items-start gap-2">
                <span className="text-purple-400">•</span>
                <span>Provide a clear, descriptive name and detailed description</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-400">•</span>
                <span>Set competitive pricing based on similar services</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-400">•</span>
                <span>Ensure your API endpoint is accessible and properly documented</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-400">•</span>
                <span>A small gas fee will be charged to list your service on-chain</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
