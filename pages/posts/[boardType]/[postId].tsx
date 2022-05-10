import { useRouter } from "next/router";

import { useGetPostDetailQuery } from "../../../api/postsApi";
import DeleteConfirmModal from "../../../components/Modals/DeleteConfirmModal/DeleteConfirmModal";
import PageTitle from "../../../components/PageTitle";
import PostDetailPage from "../../../components/PostDetailPage/PostDetailPage";
import { useAppSelector } from "../../../store/hooks";

export default function DetailedPostPage() {
  const router = useRouter();
  const { postId } = router.query;

  const { isLoggedIn } = useAppSelector((state) => state.auth);

  const { data, isLoading, error } = useGetPostDetailQuery(
    typeof postId === "string" ? postId : "0",
    {
      skip: !!!isLoggedIn,
      refetchOnMountOrArgChange: true,
    }
  );

  return (
    <>
      <PageTitle title={data?.title || "Posts"} />
      {isLoading ? <span>Loading</span> : error ? <span>Error</span> : null}
      <PostDetailPage />
      <DeleteConfirmModal type={"게시글"} />
      {/* {postData?.imagePaths.map((image) => (
        <li key={image}>
          <img src={process.env.BUCKET_URL + image} />
        </li>
      ))} */}
    </>
  );
}
