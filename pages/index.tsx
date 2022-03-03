import type { NextPage } from "next";
import Link from "next/link";
import PageTitle from "../components/PageTitle";

const Home: NextPage = () => {
  return (
    <div>
      <PageTitle title="Guam" />
      <Link href="/posts">
        <a>글 목록</a>
      </Link>
    </div>
  );
};

export default Home;
