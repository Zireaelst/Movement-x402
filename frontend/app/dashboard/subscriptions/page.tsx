"use client";

import { DashboardLayout } from "@/components/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  DollarSign, 
  Activity,
  ExternalLink,
  MoreVertical,
  AlertCircle
} from "lucide-react";
import Link from "next/link";

// Mock subscriptions - in production, fetch from smart contract
const MY_SUBSCRIPTIONS = [
  {
    id: 1,
    serviceId: 2,
    serviceName: "Real-Time Price Oracle",
    serviceOwner: "0x5e6f7g8h...",
    category: "oracle",
    pricePerRequest: 0.001,
    subscribedAt: "2024-12-20",
    totalSpent: 4.52,
    requestsUsed: 4520,
    lastUsed: "2 hours ago",
    status: "active",
  },
  {
    id: 2,
    serviceId: 1,
    serviceName: "GPT-4 Turbo Access",
    serviceOwner: "0x1a2b3c4d...",
    category: "ai",
    pricePerRequest: 0.025,
    subscribedAt: "2024-12-18",
    totalSpent: 12.75,
    requestsUsed: 510,
    lastUsed: "1 day ago",
    status: "active",
  },
  {
    id: 3,
    serviceId: 4,
    serviceName: "Financial Data API",
    serviceOwner: "0x3m4n5o6p...",
    category: "data",
    pricePerRequest: 0.005,
    subscribedAt: "2024-12-15",
    totalSpent: 2.85,
    requestsUsed: 570,
    lastUsed: "5 days ago",
    status: "active",
  },
];

const CATEGORY_COLORS: Record<string, string> = {
  ai: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  data: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
  compute: "bg-orange-500/10 text-orange-400 border-orange-500/20",
  oracle: "bg-green-500/10 text-green-400 border-green-500/20",
};

export default function SubscriptionsPage() {
  const totalSpent = MY_SUBSCRIPTIONS.reduce((sum, sub) => sum + sub.totalSpent, 0);
  const totalRequests = MY_SUBSCRIPTIONS.reduce((sum, sub) => sum + sub.requestsUsed, 0);

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-slate-100">Subscriptions</h1>
          <p className="text-slate-400 mt-1">Manage your active service subscriptions</p>
        </div>

        {/* Stats Overview */}
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="bg-slate-900/50 border-slate-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">Active Subscriptions</p>
                  <p className="text-3xl font-bold text-slate-100 mt-1">
                    {MY_SUBSCRIPTIONS.length}
                  </p>
                </div>
                <div className="h-12 w-12 rounded-full bg-purple-500/10 flex items-center justify-center">
                  <Activity className="h-6 w-6 text-purple-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 border-slate-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">Total Requests</p>
                  <p className="text-3xl font-bold text-slate-100 mt-1">
                    {totalRequests.toLocaleString()}
                  </p>
                </div>
                <div className="h-12 w-12 rounded-full bg-cyan-500/10 flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-cyan-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 border-slate-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">Total Spent</p>
                  <p className="text-3xl font-bold text-slate-100 mt-1">
                    {totalSpent.toFixed(2)} <span className="text-base text-purple-400">MOVE</span>
                  </p>
                </div>
                <div className="h-12 w-12 rounded-full bg-green-500/10 flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-green-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Subscriptions List */}
        <div className="space-y-4">
          {MY_SUBSCRIPTIONS.length === 0 ? (
            <Card className="bg-slate-900/50 border-slate-800">
              <CardContent className="p-12 text-center">
                <div className="max-w-md mx-auto space-y-4">
                  <div className="h-16 w-16 rounded-full bg-cyan-500/10 flex items-center justify-center mx-auto">
                    <Activity className="h-8 w-8 text-cyan-400" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-100">No subscriptions yet</h3>
                  <p className="text-slate-400">
                    Explore the marketplace to discover and subscribe to AI services
                  </p>
                  <Link href="/marketplace">
                    <Button className="bg-purple-500 hover:bg-purple-600 mt-4">
                      Browse Marketplace
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ) : (
            <>
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-slate-100">
                  Active Subscriptions ({MY_SUBSCRIPTIONS.length})
                </h2>
              </div>

              {MY_SUBSCRIPTIONS.map((subscription) => (
                <Card
                  key={subscription.id}
                  className="bg-slate-900/50 border-slate-800 hover:border-slate-700 transition-colors"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-bold text-slate-100">
                            {subscription.serviceName}
                          </h3>
                          <Badge
                            variant="outline"
                            className={CATEGORY_COLORS[subscription.category]}
                          >
                            {subscription.category}
                          </Badge>
                          <Badge className="bg-green-500/10 text-green-500 border-green-500/20">
                            Active
                          </Badge>
                        </div>
                        
                        <p className="text-sm text-slate-400 font-mono mb-4">
                          Provider: {subscription.serviceOwner}
                        </p>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
                          <div>
                            <p className="text-xs text-slate-500">Price/Request</p>
                            <p className="font-mono font-bold text-slate-100">
                              {subscription.pricePerRequest} MOVE
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-slate-500">Requests Used</p>
                            <p className="font-bold text-slate-100">
                              {subscription.requestsUsed.toLocaleString()}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-slate-500">Total Spent</p>
                            <p className="font-bold text-green-500">
                              {subscription.totalSpent.toFixed(2)} MOVE
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-slate-500">Last Used</p>
                            <p className="font-medium text-slate-100">{subscription.lastUsed}</p>
                          </div>
                          <div>
                            <p className="text-xs text-slate-500">Subscribed</p>
                            <p className="font-medium text-slate-100">
                              {new Date(subscription.subscribedAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>

                        {/* Usage Warning */}
                        {subscription.requestsUsed > 1000 && (
                          <div className="flex items-start gap-2 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
                            <AlertCircle className="h-4 w-4 text-amber-500 mt-0.5" />
                            <div className="flex-1">
                              <p className="text-sm text-amber-500 font-medium">
                                High usage detected
                              </p>
                              <p className="text-xs text-amber-500/80 mt-1">
                                Consider optimizing your API calls to reduce costs
                              </p>
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-2 ml-4">
                        <Link href={`/service/${subscription.serviceId}`}>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-slate-700"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-slate-700"
                        >
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </>
          )}
        </div>

        {/* Quick Actions */}
        <Card className="bg-gradient-to-br from-purple-500/10 to-cyan-500/10 border-purple-500/20">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-slate-100 mb-1">
                  Looking for more services?
                </h3>
                <p className="text-sm text-slate-400">
                  Explore the marketplace to find AI models, data feeds, and compute services
                </p>
              </div>
              <Link href="/marketplace">
                <Button className="bg-purple-500 hover:bg-purple-600 whitespace-nowrap">
                  Browse Marketplace
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
