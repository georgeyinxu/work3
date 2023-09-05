"use client";

import {
  ThirdwebProvider,
  metamaskWallet,
  walletConnect,
  ConnectWallet,
} from "@thirdweb-dev/react";
import { Ethereum } from "@thirdweb-dev/chains";

const App = () => {
  return (
    <ThirdwebProvider
      activeChain={Ethereum}
      clientId="c39b8ec1e949b0b1fa56a439cb8f311c"
      supportedWallets={[metamaskWallet(), walletConnect()]}
    >
      <ConnectWallet />
    </ThirdwebProvider>
  );
};

export default App;
