import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <meta name="description" content="IT인들을 위한 커뮤니티" />
        </Head>
        <body>
          <Main />
          <div id="portal-toast" />
          <div id="portal-modal" />
          <NextScript />
        </body>
      </Html>
    );
  }
}
