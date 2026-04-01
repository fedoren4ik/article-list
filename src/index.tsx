import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Articles } from "./components";

import "./index.css";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Articles />
  </StrictMode>,
)
