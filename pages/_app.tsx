import "styles/globals.scss";
import axios from "axios";
import { getAuth } from "firebase/auth";
import firebase from "firebase/compat/app";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import Footer from "components/Footer/Footer";
import Layout from "components/layout";
import Modal from "components/Portal/Modal/Modal";
import Toast from "components/Portal/Toast/Toast";
import { firebaseConfig } from "constants/constants";
import { signIn, signOut } from "store/authSlice";
import { wrapper } from "store/store";
import { removeUserState, setUserState } from "store/userSlice";
import { getFirebaseIdToken } from "utils/firebaseUtils";

function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
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

        if (
          !userData.profileSet &&
          router.isReady &&
          router.pathname !== "/profile/set_nickname"
        )
          router.push("/profile/set_nickname");
      } else {
        dispatch(signOut());
        dispatch(removeUserState());
      }
    });
  }, [router.isReady]);

  return (
    <Layout>
      <Component {...pageProps} />
      <Toast />
      <Modal />
      <Footer />
    </Layout>
  );
}

export default wrapper.withRedux(App);
