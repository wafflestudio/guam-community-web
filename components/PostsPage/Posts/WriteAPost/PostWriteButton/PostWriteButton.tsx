import styles from "./PostWriteButton.module.scss";
import WriteIcon from "../../../../../assets/icons/write/button.svg";
import { useRouter } from "next/router";

export default function PostWriteButton({
  postDetailPage,
}: {
  postDetailPage: boolean;
}) {
  const router = useRouter();

  const onWriteClick = () => {
    router.push("/posts/write");
  };
  return (
    <button
      className={`${styles.writeButton} ${postDetailPage && styles.detailPage}`}
      onClick={onWriteClick}
    >
      <WriteIcon />
    </button>
  );
}
