import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import WebApp from "@twa-dev/sdk";

import "./index.css";
import ToastrProvider from "./providers/toastrProvider.tsx";

WebApp.ready();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ToastrProvider position="top-center">
    <App />
  </ToastrProvider>
);
