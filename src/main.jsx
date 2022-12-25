import { createRoot } from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "remixicon/fonts/remixicon.css";
import "./dest/index.css"

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <BrowserRouter> 
    <App />
  </BrowserRouter>
);
