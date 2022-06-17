import "../styles/globals.scss";
import firebase from "firebase/compat/app";
import type { AppProps } from "next/app";
import React from "react";

import "firebase/auth";

import Layout from "../components/layout";
import { firebaseConfig } from "../constants/constants";
import { wrapper } from "../store/store";

function App({ Component, pageProps }: AppProps) {
  firebase.initializeApp(firebaseConfig);

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default wrapper.withRedux(App);
