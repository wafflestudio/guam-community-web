import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import React from "react";
import { Provider } from "react-redux";
import { store } from "../store/store";
import Layout from "../components/layout";

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: false,
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Hydrate>
      </QueryClientProvider>
    </Provider>
  );
}

export default MyApp;
