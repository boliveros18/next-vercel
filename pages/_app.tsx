import { useState, useEffect } from "react";
import type { AppProps } from "next/app";
import { CssBaseline, ThemeProvider } from "@mui/material";
import "../styles/globals.css";
import { lightTheme } from "../themes";

interface Props extends AppProps {
  theme: string;
}

export default function App({ Component, pageProps}: Props) {

  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
