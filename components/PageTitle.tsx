import Head from "next/head";

export default function PageTitle({ title }: { title: string }) {
  return (
    <Head>
      <title>{title} | Guam Community</title>
      <link rel="icon" type="image/svg" href="/favicon.svg" />
    </Head>
  );
}
