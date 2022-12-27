import type { AppProps } from "next/app";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { UIProvider } from "../context/ui";
import { SessionProvider } from "next-auth/react"
import { ClinicProvider } from "../context/clinic";
import { SWRConfig } from 'swr';
import { AuthProvider } from "../context/auth";
import "../styles/globals.css";
import { lightTheme } from "../themes";

interface Props extends AppProps {
  theme: string;
}

export default function App({ Component, pageProps }: Props) {
  return (
    <SessionProvider>
    <SWRConfig 
    value={{
      fetcher: (resource, init) => fetch(resource, init).then(res => res.json())
    }}
  >
    <AuthProvider>
    <UIProvider>
      <ThemeProvider theme={lightTheme}>
        <ClinicProvider>
          <CssBaseline />
          <Component {...pageProps} />
        </ClinicProvider>
      </ThemeProvider>
    </UIProvider>
    </AuthProvider>
    </SWRConfig>
    </SessionProvider>
  );
}
