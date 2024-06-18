import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ThemeProvider } from "styled-components";
import { RecoilRoot } from "recoil";
import { DarkMode } from "./theme";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <RecoilRoot>
    <ThemeProvider theme={DarkMode}>
      <App />
    </ThemeProvider>
  </RecoilRoot>
);
