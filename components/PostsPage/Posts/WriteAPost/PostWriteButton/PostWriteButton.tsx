import styles from "./PostWriteButton.module.scss";
import WriteIcon from "../../../../../assets/icons/write/button.svg";
import { useRouter } from "next/router";

export default function PostWriteButton() {
  const router = useRouter();

  const onWriteClick = () => {
    router.push("/posts/write");
  };
  return (
    <button className={styles.writeButton} onClick={onWriteClick}>
      <WriteIcon />
    </button>
  );
}
