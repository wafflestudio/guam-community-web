import { getAuth, signOut } from "firebase/auth";

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
