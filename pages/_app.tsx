import "styles/globals.scss";
import { getAuth } from "firebase/auth";
import firebase from "firebase/compat/app";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import Layout from "components/layout";
import Modal from "components/Portal/Modal/Modal";
import Toast from "components/Portal/Toast/Toast";
import { firebaseConfig } from "constants/constants";
import { signOut } from "store/authSlice";
import { wrapper } from "store/store";
import { removeUserState } from "store/userSlice";
import { getFirebaseIdToken } from "utils/firebaseUtils";
import { setProfile } from "utils/setProfile";

firebase.initializeApp(firebaseConfig);

function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    if (router.isReady) {
      getAuth().onAuthStateChanged(async (user) => {
        if (user) {
          const token = await getFirebaseIdToken();
          if (token) setProfile(token, router, dispatch);
        } else {
          dispatch(signOut());
          dispatch(removeUserState());
        }
      });
    }
  }, [dispatch, router.isReady]);

  return (
    <Layout>
      <Component {...pageProps} />
      <Toast />
      <Modal />
    </Layout>
  );
}

export default wrapper.withRedux(App);
