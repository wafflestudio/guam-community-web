import Link from "next/link";

import PostForm from "../../components/PostForm";

export default function Write() {
  return (
    <>
      <Link href={"/"}>
        <a>홈</a>
      </Link>
      <PostForm />
    </>
  );
}
