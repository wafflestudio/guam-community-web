import SignOutButton from "components/Buttons/SignOutButton";
import SetProfilePage from "components/pages/setProfile/SetProfilePage";
import PageTitle from "components/PageTitle";
import withAuth from "utils/withAuth";

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
