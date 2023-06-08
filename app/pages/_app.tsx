import { DataProvider } from "@/context/data";
import "@/styles/globals.css";
import Layout from "@/components/layout";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <DataProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </DataProvider>
  );
}
