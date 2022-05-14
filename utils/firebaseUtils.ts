import { getAuth } from "firebase/auth";

export const getFirebaseIdToken = async () => {
  const token = await getAuth().currentUser?.getIdToken();
  return token;
};
