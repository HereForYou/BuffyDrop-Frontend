import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import WebApp from "@twa-dev/sdk";

import "./index.css";
// import ToastrProvider from "./providers/toastrProvider.tsx";
import { TonConnectUIProvider } from "@tonconnect/ui-react";

WebApp.ready();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <TonConnectUIProvider manifestUrl="https://dog82027.vercel.app/tonconnect-manifest.json">
    <App />
  </TonConnectUIProvider>
);

{/* <TonConnectUIProvider manifestUrl="https://dog82027.vercel.app/tonconnect-manifest.json">
</TonConnectUIProvider> */}