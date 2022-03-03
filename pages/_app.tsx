import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import React, { useEffect } from "react";
import axios, { AxiosRequestConfig } from "axios";
import { setToken } from "../store/authSlice";
import { Provider } from "react-redux";
import { store } from "../store/store";

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

  useEffect(() => {
    const fetchToken = async () => {
      const config: AxiosRequestConfig = {
        method: "post",
        baseURL: "https://www.googleapis.com/identitytoolkit/v3",
        url: "/relyingparty/verifyPassword",
        params: {
          key: "AIzaSyAYoZLtqIgtE8eLeyNgCoLYIa3f3UYmXDs",
        },
        data: {
          email: "guam2@guam.guam",
          password: "wafflestudio",
          returnSecureToken: true,
        },
      };

      try {
        const { data } = await axios(config);
        store.dispatch(setToken(data.idToken));
      } catch (error) {
        console.log(error);
      }
    };
    fetchToken();
  }, []);

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <Component {...pageProps} />
        </Hydrate>
      </QueryClientProvider>
    </Provider>
  );
}

export default MyApp;
