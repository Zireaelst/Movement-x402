"use client";

import { DashboardLayout } from "@/components/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  TrendingUp,
  DollarSign,
  Users,
  Activity,
  ArrowUpRight,
  PackagePlus,
  Store,
} from "lucide-react";
import Link from "next/link";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Mock data
const revenueData = [
  { date: "Dec 15", revenue: 120 },
  { date: "Dec 16", revenue: 250 },
  { date: "Dec 17", revenue: 180 },
  { date: "Dec 18", revenue: 350 },
  { date: "Dec 19", revenue: 420 },
  { date: "Dec 20", revenue: 380 },
  { date: "Dec 21", revenue: 510 },
];

const usageData = [
  { date: "Dec 15", requests: 450 },
  { date: "Dec 16", requests: 820 },
  { date: "Dec 17", requests: 650 },
  { date: "Dec 18", requests: 1100 },
  { date: "Dec 19", requests: 1350 },
  { date: "Dec 20", requests: 980 },
  { date: "Dec 21", requests: 1520 },
];

const recentActivity = [
  { id: 1, service: "GPT-4 Turbo Access", user: "0x1a2b...3c4d", amount: 0.025, time: "2 mins ago" },
  { id: 2, service: "Price Oracle", user: "0x5e6f...7g8h", amount: 0.001, time: "5 mins ago" },
  { id: 3, service: "ML Training", user: "0x9i0j...1k2l", amount: 0.15, time: "12 mins ago" },
  { id: 4, service: "Financial Data", user: "0x3m4n...5o6p", amount: 0.005, time: "18 mins ago" },
];

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-slate-100">Dashboard</h1>
          <p className="text-slate-400 mt-1">Welcome back! Here&apos;s your overview.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="bg-slate-900/50 border-slate-800">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-400">
                Total Revenue
              </CardTitle>
              <DollarSign className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-100">12.45 MOVE</div>
              <p className="text-xs text-green-500 flex items-center gap-1 mt-1">
                <ArrowUpRight className="h-3 w-3" />
                +20.1% from last week
              </p>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 border-slate-800">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-400">
                Active Services
              </CardTitle>
              <PackagePlus className="h-4 w-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-100">3</div>
              <p className="text-xs text-slate-500 mt-1">
                2 public, 1 private
              </p>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 border-slate-800">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-400">
                Subscribers
              </CardTitle>
              <Users className="h-4 w-4 text-cyan-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-100">127</div>
              <p className="text-xs text-cyan-500 flex items-center gap-1 mt-1">
                <ArrowUpRight className="h-3 w-3" />
                +12 this week
              </p>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 border-slate-800">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-400">
                Total Requests
              </CardTitle>
              <Activity className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-100">6,870</div>
              <p className="text-xs text-orange-500 flex items-center gap-1 mt-1">
                <ArrowUpRight className="h-3 w-3" />
                +15.2% from last week
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="bg-slate-900/50 border-slate-800">
            <CardHeader>
              <CardTitle className="text-slate-100">Revenue (Last 7 Days)</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={revenueData}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#a855f7" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="date" stroke="#64748b" fontSize={12} />
                  <YAxis stroke="#64748b" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1e293b",
                      border: "1px solid #334155",
                      borderRadius: "8px",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#a855f7"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorRevenue)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 border-slate-800">
            <CardHeader>
              <CardTitle className="text-slate-100">API Requests (Last 7 Days)</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={usageData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="date" stroke="#64748b" fontSize={12} />
                  <YAxis stroke="#64748b" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1e293b",
                      border: "1px solid #334155",
                      borderRadius: "8px",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="requests"
                    stroke="#06b6d4"
                    strokeWidth={2}
                    dot={{ fill: "#06b6d4", r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="bg-slate-900/50 border-slate-800">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-slate-100">Recent Activity</CardTitle>
            <Link href="/dashboard/activity">
              <Button variant="ghost" size="sm" className="text-purple-400 hover:text-purple-300">
                View All
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-center justify-between p-4 rounded-lg bg-slate-800/50 hover:bg-slate-800 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-purple-500/10 flex items-center justify-center">
                      <TrendingUp className="h-5 w-5 text-purple-400" />
                    </div>
                    <div>
                      <p className="font-medium text-slate-100">{activity.service}</p>
                      <p className="text-sm text-slate-400 font-mono">{activity.user}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-mono font-bold text-green-500">+{activity.amount} MOVE</p>
                    <p className="text-xs text-slate-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/20">
            <CardContent className="p-6">
              <PackagePlus className="h-12 w-12 text-purple-400 mb-4" />
              <h3 className="text-xl font-bold text-slate-100 mb-2">List New Service</h3>
              <p className="text-slate-400 mb-4">
                Create a new API service and start earning MOVE tokens
              </p>
              <Link href="/dashboard/my-services/new">
                <Button className="bg-purple-500 hover:bg-purple-600">
                  Create Service
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border-cyan-500/20">
            <CardContent className="p-6">
              <Store className="h-12 w-12 text-cyan-400 mb-4" />
              <h3 className="text-xl font-bold text-slate-100 mb-2">Explore Marketplace</h3>
              <p className="text-slate-400 mb-4">
                Discover and subscribe to AI services from other providers
              </p>
              <Link href="/marketplace">
                <Button className="bg-cyan-500 hover:bg-cyan-600">
                  Browse Services
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
