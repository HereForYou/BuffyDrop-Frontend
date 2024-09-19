import { TonConnectButton, useTonAddress } from "@tonconnect/ui-react";

import React from "react";
import "../App.css";

const WalletConnect: React.FC = () => {
  const addr = useTonAddress();
  console.log("addr", addr);
  return (
      <TonConnectButton />
  );
};

export default WalletConnect;
