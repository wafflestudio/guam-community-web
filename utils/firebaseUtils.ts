import {
  getAuth,
  GoogleAuthProvider,
  OAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";

export const getFirebaseIdToken = async () => {
  const token = await getAuth().currentUser?.getIdToken();
  return token;
};

export const firebaseSignOut = async () => {
  const auth = getAuth();
  try {
    await signOut(auth);
  } catch (e) {
    console.log(e);
  }
};

export const googleToken = async () => {
  const provider = new GoogleAuthProvider();
  await signInWithPopup(getAuth(), provider);
  const token = await getFirebaseIdToken();
  return token;
};

export const appleToken = async () => {
  const auth = getAuth();
  const provider = new OAuthProvider("apple.com");
  await signInWithPopup(auth, provider);
  const token = await getFirebaseIdToken();
  return token;
};
