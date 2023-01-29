import { createRoot } from "react-dom/client";
import { MantineProvider } from "@mantine/core";
import App from "./App";
import React from "react";

const rootElem = document.getElementById("root");
if (!rootElem) {
  console.error("Could not find root element");
  throw new Error("Could not find root element");
}
const root = createRoot(rootElem);

root.render(
  <MantineProvider>
    <App />
  </MantineProvider>
);
