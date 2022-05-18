import "../styles/globals.scss";
import axios from "axios";
import { getAuth } from "firebase/auth";
import firebase from "firebase/compat/app";
import type { AppProps } from "next/app";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import Layout from "../components/layout";
import { firebaseConfig } from "../constants/constants";
import { signIn, signOut } from "../store/authSlice";
import { wrapper } from "../store/store";
import { setUserState } from "../store/userSlice";
import { getFirebaseIdToken } from "../utils/firebaseUtils";

function App({ Component, pageProps }: AppProps) {
  const dispatch = useDispatch();

  firebase.initializeApp(firebaseConfig);

  useEffect(() => {
    getAuth().onAuthStateChanged(async (user) => {
      if (user) {
        const token = await getFirebaseIdToken();
        const { data: userData } = await axios.get("/api/users/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        dispatch(setUserState(userData));
        dispatch(signIn());
      } else {
        dispatch(signOut());
      }
    });
  }, []);

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default wrapper.withRedux(App);
