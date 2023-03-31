import "@/styles/globals.css";
import { ThemeProvider, createTheme } from "@mui/material";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";

const muiTheme = createTheme({
  palette: {
    primary: {
      main: "#ff28c6",
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <ThemeProvider theme={muiTheme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </RecoilRoot>
  );
}
