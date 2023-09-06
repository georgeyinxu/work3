"use client";

import { QueryClient, QueryClientProvider } from "react-query";
import {
  metamaskWallet,
  ThirdwebProvider,
  walletConnect,
} from "@thirdweb-dev/react";
import { Ethereum } from "@thirdweb-dev/chains";
import React from "react";
import Navbar from "@/components/Navbar";

const queryClient = new QueryClient();

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThirdwebProvider
        activeChain={Ethereum}
        clientId="c39b8ec1e949b0b1fa56a439cb8f311c"
        supportedWallets={[metamaskWallet(), walletConnect()]}
      >
        <Navbar />
        {children}
      </ThirdwebProvider>
    </QueryClientProvider>
  );
}
