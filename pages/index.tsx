import type { NextPage } from "next";
import Link from "next/link";
import PageTitle from "../components/PageTitle";
import SignInForm from "../components/SignInForm";

const Home: NextPage = () => {
  return (
    <div>
      <PageTitle title="Guam" />
      <div>
        <Link href="/posts">
          <a>글 목록</a>
        </Link>
      </div>
      <div>
        <Link href="/posts/write">
          <a>글 작성하기</a>
        </Link>
      </div>
      <SignInForm />
    </div>
  );
};

export default Home;
