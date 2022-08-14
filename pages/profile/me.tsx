import SignOutButton from "../../components/Buttons/SignOutButton";
import PageTitle from "../../components/PageTitle";
import SetProfilePage from "../../components/SetProfilePage/SetProfilePage";
import withAuth from "../../utils/withAuth";

const SetProfile = () => {
  return (
    <>
      <PageTitle title="Profile" />
      <SetProfilePage />
      <SignOutButton />
    </>
  );
};

export default withAuth(SetProfile);
