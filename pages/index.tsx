import type { NextPage } from "next";
import PageTitle from "../components/PageTitle";
import Posts from "../components/Posts/Posts";
import SignInForm from "../components/SignInForm";

const Home: NextPage = () => {
  return (
    <div>
      <PageTitle title="Guam" />
      <Posts />
      <SignInForm />
    </div>
  );
};

export default Home;
