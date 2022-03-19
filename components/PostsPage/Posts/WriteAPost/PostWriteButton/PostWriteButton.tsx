import { useRouter } from "next/router";

import WriteIcon from "../../../../../assets/icons/write/button.svg";

import styles from "./PostWriteButton.module.scss";

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
