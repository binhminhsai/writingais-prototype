import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Set page title
document.title = "English Writing Practice | EvP";

createRoot(document.getElementById("root")!).render(<App />);
