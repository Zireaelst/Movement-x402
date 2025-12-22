"use client";

import { DashboardLayout } from "@/components/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, MoreVertical, TrendingUp, Eye, Power } from "lucide-react";
import Link from "next/link";

// Mock user services - in production, fetch from smart contract
const MY_SERVICES = [
  {
    id: 1,
    name: "Weather Prediction API",
    description: "ML-powered weather forecasting with 95% accuracy",
    category: "ai",
    price: 0.002,
    subscribers: 23,
    totalRequests: 1540,
    totalEarned: 3.08,
    isActive: true,
    createdAt: "2024-12-15",
  },
  {
    id: 2,
    name: "Crypto Sentiment Analysis",
    description: "Real-time social media sentiment for top 100 coins",
    category: "data",
    price: 0.005,
    subscribers: 45,
    totalRequests: 8920,
    totalEarned: 44.6,
    isActive: true,
    createdAt: "2024-12-10",
  },
];

const CATEGORY_COLORS: Record<string, string> = {
  ai: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  data: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
  compute: "bg-orange-500/10 text-orange-400 border-orange-500/20",
  oracle: "bg-green-500/10 text-green-400 border-green-500/20",
};

export default function MyServicesPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-100">My Services</h1>
            <p className="text-slate-400 mt-1">
              Manage your listed API services
            </p>
          </div>
          <Link href="/dashboard/my-services/new">
            <Button className="bg-purple-500 hover:bg-purple-600">
              <Plus className="h-4 w-4 mr-2" />
              New Service
            </Button>
          </Link>
        </div>

        {/* Stats Overview */}
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="bg-slate-900/50 border-slate-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">Total Services</p>
                  <p className="text-3xl font-bold text-slate-100 mt-1">{MY_SERVICES.length}</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-purple-500/10 flex items-center justify-center">
                  <Plus className="h-6 w-6 text-purple-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 border-slate-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">Total Subscribers</p>
                  <p className="text-3xl font-bold text-slate-100 mt-1">
                    {MY_SERVICES.reduce((sum, s) => sum + s.subscribers, 0)}
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
                  <p className="text-sm text-slate-400">Total Earned</p>
                  <p className="text-3xl font-bold text-green-500 mt-1">
                    {MY_SERVICES.reduce((sum, s) => sum + s.totalEarned, 0).toFixed(2)} MOVE
                  </p>
                </div>
                <div className="h-12 w-12 rounded-full bg-green-500/10 flex items-center justify-center">
                  <span className="text-2xl">💰</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Services List */}
        <div className="space-y-4">
          {MY_SERVICES.length === 0 ? (
            <Card className="bg-slate-900/50 border-slate-800">
              <CardContent className="p-12 text-center">
                <div className="max-w-md mx-auto space-y-4">
                  <div className="h-16 w-16 rounded-full bg-purple-500/10 flex items-center justify-center mx-auto">
                    <Plus className="h-8 w-8 text-purple-400" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-100">No services yet</h3>
                  <p className="text-slate-400">
                    List your first API service and start earning MOVE tokens
                  </p>
                  <Link href="/dashboard/my-services/new">
                    <Button className="bg-purple-500 hover:bg-purple-600 mt-4">
                      <Plus className="h-4 w-4 mr-2" />
                      Create Your First Service
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ) : (
            MY_SERVICES.map((service) => (
              <Card key={service.id} className="bg-slate-900/50 border-slate-800 hover:border-slate-700 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-slate-100">{service.name}</h3>
                        <Badge
                          variant="outline"
                          className={CATEGORY_COLORS[service.category]}
                        >
                          {service.category}
                        </Badge>
                        {service.isActive ? (
                          <Badge className="bg-green-500/10 text-green-500 border-green-500/20">
                            <Power className="h-3 w-3 mr-1" />
                            Active
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="text-slate-500">
                            Inactive
                          </Badge>
                        )}
                      </div>
                      <p className="text-slate-400 text-sm mb-4">{service.description}</p>

                      {/* Stats Grid */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                          <p className="text-xs text-slate-500">Price</p>
                          <p className="font-mono font-bold text-slate-100">
                            {service.price} MOVE
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-500">Subscribers</p>
                          <p className="font-bold text-slate-100">{service.subscribers}</p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-500">Total Requests</p>
                          <p className="font-bold text-slate-100">{service.totalRequests.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-500">Total Earned</p>
                          <p className="font-bold text-green-500">{service.totalEarned} MOVE</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 ml-4">
                      <Link href={`/service/${service.id}`}>
                        <Button variant="outline" size="sm" className="border-slate-700">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Button variant="outline" size="sm" className="border-slate-700">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                    <p className="text-xs text-slate-500">
                      Listed on {new Date(service.createdAt).toLocaleDateString()}
                    </p>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" className="text-slate-400 hover:text-slate-100">
                        Edit
                      </Button>
                      <Button variant="ghost" size="sm" className="text-slate-400 hover:text-slate-100">
                        Analytics
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
