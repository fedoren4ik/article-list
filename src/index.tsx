import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Articles } from "./components";
import { ErrorBoundary } from "./components/error-boundary";

import "./index.css";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <Articles />
    </ErrorBoundary>
  </StrictMode>,
);
