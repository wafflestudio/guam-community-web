import Head from "next/head";

export default function PageTitle({ title }: { title: string }) {
  return (
    <Head>
      <title>{title} | Guam Community</title>
    </Head>
  );
}
