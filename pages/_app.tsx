import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { SWRConfig } from "swr";
import { AuthProvider } from "../context/auth";
import { UIProvider } from "../context/ui";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ClinicProvider } from "../context/clinic";
import { CertificationProvider } from "../context/certification";
import { CommentProvider } from "../context/comment";
import { LikeProvider } from "../context/like";
import { MedicProvider } from "../context/medic";
import { QualificationProvider } from "../context/qualification";
import { ProductProvider } from "../context/product";
import { ImageProvider } from "../context/image";
import { SnackbarProvider } from "notistack";
import { lightTheme } from "../themes";
import "../styles/globals.css";

interface Props extends AppProps {
  theme: string;
}

export default function App({ Component, pageProps }: Props) {
  return (
    <SessionProvider>
      <SWRConfig
        value={{
          fetcher: (resource, init) =>
            fetch(resource, init).then((res) => res.json()),
        }}
      >
        <AuthProvider>
          <UIProvider>
            <ThemeProvider theme={lightTheme}>
              <ClinicProvider>
                <CertificationProvider>
                  <CommentProvider>
                    <LikeProvider>
                      <MedicProvider>
                        <QualificationProvider>
                          <ProductProvider>
                            <ImageProvider>
                              <CssBaseline />
                              <SnackbarProvider maxSnack={1}>
                                <Component {...pageProps} />
                              </SnackbarProvider>
                            </ImageProvider>
                          </ProductProvider>
                        </QualificationProvider>
                      </MedicProvider>
                    </LikeProvider>
                  </CommentProvider>
                </CertificationProvider>
              </ClinicProvider>
            </ThemeProvider>
          </UIProvider>
        </AuthProvider>
      </SWRConfig>
    </SessionProvider>
  );
}
