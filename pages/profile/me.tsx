import { useRouter } from "next/router";
import { useEffect } from "react";

import SignOutButton from "../../components/Buttons/SignOutButton";
import PageTitle from "../../components/PageTitle";
import SetProfilePage from "../../components/SetProfilePage/SetProfilePage";
import { useAppSelector } from "../../store/hooks";

export default function SetProfile() {
  const { isLoggedIn } = useAppSelector((state) => state.auth);

  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) router.push("/login");
  }, []);

  return (
    <>
      <PageTitle title="Profile" />
      <SetProfilePage />
      <SignOutButton />
    </>
  );
}

// export async function getStaticProps() {
//   return {
//     props: {
//       protected: true,
//     },
//   };
// }
