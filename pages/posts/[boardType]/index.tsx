import PageTitle from "../../../components/PageTitle";
import SignInForm from "../../../components/SignInForm";
import PostsPage from "../../../components/PostsPage/PostsPage";
import { useRouter } from "next/router";

export default function PostsBoard() {
  const router = useRouter();
  const { boardType } = router.query;

  return (
    <>
      <PageTitle
        title={`${
          typeof boardType === "string" && boardType.toUpperCase()
        } | Guam`}
      />
      <SignInForm />
      <PostsPage />
    </>
  );
}
