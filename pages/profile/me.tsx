import SignOutButton from "../../components/Buttons/SignOutButton";
import PageTitle from "../../components/PageTitle";
import SetProfilePage from "../../components/SetProfilePage/SetProfilePage";
import { useLogin } from "../../utils/useLogin";

export default function SetProfile() {
  useLogin();

  return (
    <>
      <PageTitle title="Profile" />
      <SetProfilePage />
      <SignOutButton />
    </>
  );
}
