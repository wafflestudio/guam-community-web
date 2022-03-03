import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Guam</title>
      </Head>
      <Link href="/posts">
        <a>글 목록</a>
      </Link>
    </div>
  );
};

export default Home;
