import type { NextPage } from "next";
import Link from "next/link";
import PageTitle from "../components/PageTitle";
import SignInForm from "../components/SignInForm";

const Home: NextPage = () => {
  return (
    <div>
      <PageTitle title="Guam" />
      <Link href="/posts">
        <a>글 목록</a>
      </Link>
      <SignInForm />
    </div>
  );
};

export default Home;
