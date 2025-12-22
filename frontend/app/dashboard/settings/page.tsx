"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useSmartWallet } from "@/components/dual-wallet-provider";
import { 
  User, 
  Key, 
  Bell, 
  Shield, 
  Wallet,
  Copy,
  CheckCircle2,
  ExternalLink,
  RefreshCw
} from "lucide-react";
import { toast } from "sonner";

export default function SettingsPage() {
  const { address, isConnected, walletType, disconnect } = useSmartWallet();
  const [copied, setCopied] = useState(false);
  const [apiKey, setApiKey] = useState("sk_live_************************");
  const [showApiKey, setShowApiKey] = useState(false);

  const handleCopyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address);
      setCopied(true);
      toast.success("Address copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleGenerateApiKey = () => {
    const newKey = `sk_live_${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`;
    setApiKey(newKey);
    setShowApiKey(true);
    toast.success("New API key generated");
  };

  const handleDisconnect = async () => {
    try {
      await disconnect();
      toast.success("Wallet disconnected");
    } catch {
      toast.error("Failed to disconnect wallet");
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8 max-w-4xl">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-slate-100">Settings</h1>
          <p className="text-slate-400 mt-1">Manage your account and preferences</p>
        </div>

        {/* Wallet Connection */}
        <Card className="bg-slate-900/50 border-slate-800">
          <CardHeader>
            <CardTitle className="text-slate-100 flex items-center gap-2">
              <Wallet className="h-5 w-5 text-purple-400" />
              Wallet Connection
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {isConnected ? (
              <>
                <div className="flex items-center justify-between p-4 rounded-lg bg-slate-800/50 border border-slate-700">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-green-500/10 flex items-center justify-center">
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-400">Connected Wallet</p>
                      <p className="font-mono text-slate-100">{address}</p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCopyAddress}
                    className="border-slate-700"
                  >
                    {copied ? (
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>

                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-purple-500/10 text-purple-400 border-purple-500/20">
                    {walletType === "privy" ? "Embedded Wallet (Privy)" : "Native Wallet"}
                  </Badge>
                  <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                    <div className="h-2 w-2 rounded-full bg-green-500 mr-2 animate-pulse" />
                    Connected
                  </Badge>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button
                    variant="outline"
                    onClick={handleDisconnect}
                    className="border-red-500/20 text-red-400 hover:bg-red-500/10"
                  >
                    Disconnect Wallet
                  </Button>
                  <a
                    href="https://explorer.movementnetwork.xyz"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="outline" className="border-slate-700">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      View on Explorer
                    </Button>
                  </a>
                </div>
              </>
            ) : (
              <div className="p-6 text-center">
                <p className="text-slate-400 mb-4">No wallet connected</p>
                <Button className="bg-purple-500 hover:bg-purple-600">
                  Connect Wallet
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* API Keys */}
        <Card className="bg-slate-900/50 border-slate-800">
          <CardHeader>
            <CardTitle className="text-slate-100 flex items-center gap-2">
              <Key className="h-5 w-5 text-cyan-400" />
              API Keys
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-slate-400">
              Use API keys to authenticate your requests to services you&apos;ve subscribed to
            </p>

            <div className="space-y-3">
              <div className="flex gap-2">
                <Input
                  type={showApiKey ? "text" : "password"}
                  value={apiKey}
                  readOnly
                  className="bg-slate-900 border-slate-800 text-slate-100 font-mono"
                />
                <Button
                  variant="outline"
                  onClick={() => setShowApiKey(!showApiKey)}
                  className="border-slate-700"
                >
                  {showApiKey ? "Hide" : "Show"}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    navigator.clipboard.writeText(apiKey);
                    toast.success("API key copied");
                  }}
                  className="border-slate-700"
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>

              <Button
                variant="outline"
                onClick={handleGenerateApiKey}
                className="border-slate-700"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Generate New Key
              </Button>

              <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
                <p className="text-xs text-amber-500">
                  ⚠️ Keep your API keys secure. Never share them publicly or commit them to version control.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Profile Settings */}
        <Card className="bg-slate-900/50 border-slate-800">
          <CardHeader>
            <CardTitle className="text-slate-100 flex items-center gap-2">
              <User className="h-5 w-5 text-orange-400" />
              Profile
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Display Name
              </label>
              <Input
                placeholder="Your name"
                defaultValue="Anonymous"
                className="bg-slate-900 border-slate-800 text-slate-100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Email (optional)
              </label>
              <Input
                type="email"
                placeholder="your@email.com"
                className="bg-slate-900 border-slate-800 text-slate-100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Bio
              </label>
              <textarea
                placeholder="Tell us about yourself..."
                className="w-full min-h-[80px] px-3 py-2 bg-slate-900 border border-slate-800 rounded-md text-slate-100 placeholder:text-slate-500"
              />
            </div>

            <Button className="bg-purple-500 hover:bg-purple-600">
              Save Profile
            </Button>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card className="bg-slate-900/50 border-slate-800">
          <CardHeader>
            <CardTitle className="text-slate-100 flex items-center gap-2">
              <Bell className="h-5 w-5 text-green-400" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-slate-100">New Subscriptions</p>
                <p className="text-sm text-slate-400">
                  Get notified when someone subscribes to your service
                </p>
              </div>
              <input
                type="checkbox"
                defaultChecked
                className="h-5 w-5 rounded border-slate-700 bg-slate-900 text-purple-500"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-slate-100">High Usage Alerts</p>
                <p className="text-sm text-slate-400">
                  Alert when subscription usage exceeds threshold
                </p>
              </div>
              <input
                type="checkbox"
                defaultChecked
                className="h-5 w-5 rounded border-slate-700 bg-slate-900 text-purple-500"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-slate-100">Service Updates</p>
                <p className="text-sm text-slate-400">
                  Updates and maintenance notifications
                </p>
              </div>
              <input
                type="checkbox"
                className="h-5 w-5 rounded border-slate-700 bg-slate-900 text-purple-500"
              />
            </div>

            <Button className="bg-purple-500 hover:bg-purple-600">
              Save Preferences
            </Button>
          </CardContent>
        </Card>

        {/* Security */}
        <Card className="bg-slate-900/50 border-slate-800">
          <CardHeader>
            <CardTitle className="text-slate-100 flex items-center gap-2">
              <Shield className="h-5 w-5 text-red-400" />
              Security
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700">
              <p className="text-sm text-slate-300 mb-2">Two-Factor Authentication</p>
              <p className="text-xs text-slate-400 mb-3">
                Add an extra layer of security to your account
              </p>
              <Button variant="outline" className="border-slate-700">
                Enable 2FA
              </Button>
            </div>

            <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
              <p className="text-sm text-red-400 font-medium mb-2">Danger Zone</p>
              <p className="text-xs text-red-400/80 mb-3">
                Permanently delete your account and all associated data
              </p>
              <Button
                variant="outline"
                className="border-red-500/20 text-red-400 hover:bg-red-500/10"
              >
                Delete Account
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
