"use client";

import { useState } from "react";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { useSmartWallet } from "./dual-wallet-provider";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Mail, Wallet, LogOut, Copy, Check, ChevronDown, ExternalLink } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ConnectButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  
  const {
    isConnected,
    walletType,
    address,
    loginWithPrivy,
    privyUser,
    disconnect,
    isLoading,
  } = useSmartWallet();

  const { wallets, connect } = useWallet();

  const handlePrivyLogin = () => {
    loginWithPrivy();
    setIsOpen(false);
  };

  const handleWalletConnect = (walletName: string) => {
    connect(walletName);
    setIsOpen(false);
  };

  const copyAddress = async () => {
    if (address) {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const truncateAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  const getDisplayName = () => {
    if (walletType === "privy" && privyUser) {
      if (privyUser.email?.address) {
        return privyUser.email.address.split("@")[0];
      }
      if (privyUser.google?.email) {
        return privyUser.google.email.split("@")[0];
      }
    }
    if (address) {
      return truncateAddress(address);
    }
    return "Connected";
  };

  const getWalletIcon = () => {
    if (walletType === "privy") {
      return <Mail className="h-4 w-4" />;
    }
    return <Wallet className="h-4 w-4" />;
  };

  // Connected state - show dropdown with wallet info
  if (isConnected && address) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="gap-2">
            {getWalletIcon()}
            <span>{getDisplayName()}</span>
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-64">
          <div className="p-2">
            <p className="text-sm font-medium text-muted-foreground">
              {walletType === "privy" ? "Email Wallet" : "External Wallet"}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {truncateAddress(address)}
            </p>
          </div>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={copyAddress} className="cursor-pointer">
            {copied ? (
              <Check className="mr-2 h-4 w-4" />
            ) : (
              <Copy className="mr-2 h-4 w-4" />
            )}
            {copied ? "Copied!" : "Copy Address"}
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => window.open(`https://explorer.movementlabs.xyz/account/${address}`, "_blank")}
            className="cursor-pointer"
          >
            <ExternalLink className="mr-2 h-4 w-4" />
            View on Explorer
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={disconnect}
            className="cursor-pointer text-destructive focus:text-destructive"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Disconnect
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  // Disconnected state - show connect modal
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2" disabled={isLoading}>
          <Wallet className="h-4 w-4" />
          Connect Wallet
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Connect to AI Data Buffet</DialogTitle>
          <DialogDescription>
            Choose how you&apos;d like to connect. New to crypto? Use email login to get started instantly.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 pt-4">
          {/* Option A: Email/Social Login via Privy */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">New to Crypto?</p>
            <Button
              variant="outline"
              className="w-full justify-start gap-3 h-14"
              onClick={handlePrivyLogin}
              disabled={isLoading}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Mail className="h-5 w-5 text-primary" />
              </div>
              <div className="flex flex-col items-start">
                <span className="font-medium">Continue with Email</span>
                <span className="text-xs text-muted-foreground">
                  Login with Email or Google
                </span>
              </div>
            </Button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or connect wallet
              </span>
            </div>
          </div>

          {/* Option B: External Wallet Connection */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">Crypto Native?</p>
            <div className="space-y-2">
              {wallets.map((wallet) => (
                <Button
                  key={wallet.name}
                  variant="outline"
                  className="w-full justify-start gap-3 h-14"
                  onClick={() => handleWalletConnect(wallet.name)}
                  disabled={isLoading}
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                    {wallet.icon ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={wallet.icon}
                        alt={wallet.name}
                        className="h-6 w-6"
                      />
                    ) : (
                      <Wallet className="h-5 w-5" />
                    )}
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="font-medium">{wallet.name}</span>
                    <span className="text-xs text-muted-foreground">
                      Connect your {wallet.name} wallet
                    </span>
                  </div>
                </Button>
              ))}
              
              {wallets.length === 0 && (
                <div className="rounded-lg border border-dashed p-4 text-center">
                  <p className="text-sm text-muted-foreground">
                    No wallets detected. Install{" "}
                    <a
                      href="https://petra.app"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      Petra
                    </a>
                    ,{" "}
                    <a
                      href="https://pontem.network"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      Pontem
                    </a>
                    , or{" "}
                    <a
                      href="https://martianwallet.xyz"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      Martian
                    </a>{" "}
                    wallet.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
