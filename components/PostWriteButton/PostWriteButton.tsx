import WriteIcon from "../../assets/icons/write/button.svg";
import { useAppDispatch } from "../../store/hooks";
import { setPostModalOpen } from "../../store/modalSlice";

import styles from "./PostWriteButton.module.scss";

export default function PostWriteButton({
  postDetailPage,
}: {
  postDetailPage: boolean;
}) {
  const dispatch = useAppDispatch();

  const onWriteClick = () => {
    dispatch(setPostModalOpen(true));
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
