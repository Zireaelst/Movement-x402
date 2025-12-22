"use client";

import { ReactNode, createContext, useContext, useState, useCallback } from "react";
import { AptosWalletAdapterProvider, useWallet as useAptosWallet } from "@aptos-labs/wallet-adapter-react";
import { PrivyProvider, usePrivy, useWallets } from "@privy-io/react-auth";
import { Aptos, AptosConfig, Network } from "@aptos-labs/ts-sdk";

// ==================== Types ====================

export type WalletType = "privy" | "aptos-adapter" | "none";

export interface TransactionPayload {
  function: string;
  typeArguments?: string[];
  functionArguments: (string | number | boolean | Uint8Array)[];
}

interface PrivyUserType {
  id: string;
  email?: { address: string };
  google?: { email: string };
  wallet?: { address: string };
}

export interface SmartWalletContextType {
  // Connection state
  isConnected: boolean;
  walletType: WalletType;
  address: string | null;
  
  // Privy specific
  isPrivyAuthenticated: boolean;
  privyUser: PrivyUserType | null;
  loginWithPrivy: () => void;
  logoutPrivy: () => void;
  
  // Aptos Adapter specific
  isAptosConnected: boolean;
  connectAptosWallet: () => void;
  disconnectAptosWallet: () => void;
  
  // Unified actions
  disconnect: () => void;
  submitTransaction: (payload: TransactionPayload) => Promise<string>;
  getBalance: () => Promise<number>;
  
  // Loading states
  isLoading: boolean;
}

// ==================== Context ====================

interface CoinStoreResource {
  coin: {
    value: string;
  };
}

const SmartWalletContext = createContext<SmartWalletContextType | null>(null);

// ==================== Aptos Config ====================

const aptosConfig = new AptosConfig({
  network: Network.MAINNET,
  fullnode: process.env.NEXT_PUBLIC_MOVEMENT_NODE_URL || "https://full.mainnet.movementinfra.xyz/v1",
});

const aptos = new Aptos(aptosConfig);

// ==================== Inner Provider (uses both hooks) ====================

function SmartWalletContextProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);
  
  // Privy hooks
  const { 
    login: privyLogin, 
    logout: privyLogout, 
    authenticated: isPrivyAuthenticated, 
    user: privyUser,
  } = usePrivy();
  const { wallets: privyWallets } = useWallets();
  
  // Aptos Wallet Adapter hooks
  const {
    connect: aptosConnect,
    disconnect: aptosDisconnect,
    account: aptosAccount,
    connected: isAptosConnected,
    signAndSubmitTransaction: aptosSignAndSubmit,
    wallets: aptosWallets,
  } = useAptosWallet();

  // Get Privy embedded wallet address
  const privyWallet = privyWallets.find(w => w.walletClientType === 'privy');
  const privyAddress = privyWallet?.address || null;
  
  // Determine wallet type and address
  const getWalletType = (): WalletType => {
    if (isPrivyAuthenticated && privyAddress) return "privy";
    if (isAptosConnected && aptosAccount?.address) return "aptos-adapter";
    return "none";
  };
  
  const walletType = getWalletType();
  const isConnected = walletType !== "none";
  
  const address = walletType === "privy" 
    ? privyAddress 
    : walletType === "aptos-adapter" 
      ? aptosAccount?.address?.toString() || null
      : null;

  // ==================== Privy Actions ====================
  
  const loginWithPrivy = useCallback(() => {
    privyLogin();
  }, [privyLogin]);

  const logoutPrivy = useCallback(async () => {
    await privyLogout();
  }, [privyLogout]);

  // ==================== Aptos Adapter Actions ====================
  
  const connectAptosWallet = useCallback(() => {
    // This will trigger the wallet adapter modal
    if (aptosWallets && aptosWallets.length > 0) {
      aptosConnect(aptosWallets[0].name);
    }
  }, [aptosConnect, aptosWallets]);

  const disconnectAptosWallet = useCallback(async () => {
    await aptosDisconnect();
  }, [aptosDisconnect]);

  // ==================== Unified Actions ====================
  
  const disconnect = useCallback(async () => {
    if (walletType === "privy") {
      await logoutPrivy();
    } else if (walletType === "aptos-adapter") {
      await disconnectAptosWallet();
    }
  }, [walletType, logoutPrivy, disconnectAptosWallet]);

  const submitTransaction = useCallback(async (payload: TransactionPayload): Promise<string> => {
    setIsLoading(true);
    
    try {
      if (walletType === "privy" && privyWallet) {
        // Note: Privy's embedded wallet for Movement/Aptos requires special configuration
        // For production, you'll need to set up Privy's Aptos support
        // For now, we throw an informative error
        throw new Error("Privy Aptos signing requires additional setup. Please use wallet adapter for now.");
        
      } else if (walletType === "aptos-adapter") {
        // Use Aptos Wallet Adapter
        const response = await aptosSignAndSubmit({
          data: {
            function: payload.function as `${string}::${string}::${string}`,
            typeArguments: payload.typeArguments || [],
            functionArguments: payload.functionArguments,
          },
        });
        
        // Wait for transaction confirmation
        await aptos.waitForTransaction({ transactionHash: response.hash });
        
        return response.hash;
      } else {
        throw new Error("No wallet connected");
      }
    } finally {
      setIsLoading(false);
    }
  }, [walletType, privyWallet, aptosSignAndSubmit]);

  const getBalance = useCallback(async (): Promise<number> => {
    if (!address) return 0;
    
    try {
      const resources = await aptos.getAccountResource({
        accountAddress: address,
        resourceType: "0x1::coin::CoinStore<0x1::aptos_coin::AptosCoin>",
      });
      
      return Number((resources as CoinStoreResource).coin.value) / 100000000; // Convert from Octas to MOVE
    } catch (error) {
      console.error("Error fetching balance:", error);
      return 0;
    }
  }, [address]);

  // ==================== Context Value ====================
  
  const contextValue: SmartWalletContextType = {
    isConnected,
    walletType,
    address,
    isPrivyAuthenticated,
    privyUser,
    loginWithPrivy,
    logoutPrivy,
    isAptosConnected,
    connectAptosWallet,
    disconnectAptosWallet,
    disconnect,
    submitTransaction,
    getBalance,
    isLoading,
  };

  return (
    <SmartWalletContext.Provider value={contextValue}>
      {children}
    </SmartWalletContext.Provider>
  );
}

// ==================== Main Provider ====================

interface DualWalletProviderProps {
  children: ReactNode;
}

export function DualWalletProvider({ children }: DualWalletProviderProps) {
  const privyAppId = process.env.NEXT_PUBLIC_PRIVY_APP_ID;
  
  if (!privyAppId) {
    console.warn("NEXT_PUBLIC_PRIVY_APP_ID is not set. Privy authentication will not work.");
  }

  return (
    <PrivyProvider
      appId={privyAppId || "placeholder-app-id"}
      config={{
        appearance: {
          theme: "dark",
          accentColor: "#7C3AED",
          logo: "/logo.png",
        },
        loginMethods: ["email", "google", "wallet"],
        embeddedWallets: {
          ethereum: {
            createOnLogin: "users-without-wallets",
          },
        },
      }}
    >
      <AptosWalletAdapterProvider
        autoConnect={true}
        dappConfig={aptosConfig}
        onError={(error) => {
          console.error("Wallet adapter error:", error);
        }}
      >
        <SmartWalletContextProvider>
          {children}
        </SmartWalletContextProvider>
      </AptosWalletAdapterProvider>
    </PrivyProvider>
  );
}

// ==================== Hook ====================

export function useSmartWallet(): SmartWalletContextType {
  const context = useContext(SmartWalletContext);
  if (!context) {
    throw new Error("useSmartWallet must be used within a DualWalletProvider");
  }
  return context;
}

export { SmartWalletContext };
