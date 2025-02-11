import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { AnimationProvider } from "./context/AnimationContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AnimationProvider>
      <App />
    </AnimationProvider>
  </StrictMode>
);
