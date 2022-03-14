import type { NextPage } from "next";
import PageTitle from "../components/PageTitle";
import SignInForm from "../components/SignInForm";
import PostsPage from "../components/PostsPage/PostsPage";

const Home: NextPage = () => {
  return (
    <>
      <PageTitle title="Guam" />
      <SignInForm />
      <PostsPage />
    </>
  );
};

export default Home;
