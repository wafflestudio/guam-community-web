import Link from "next/link";
import { useState } from "react";

import MoreIcon from "../../assets/icons/more.svg";
import { useAppSelector } from "../../store/hooks";

import styles from "./Messages.module.scss";

export default function PairProfile() {
  const [modal, setModal] = useState(false);

  const { pair } = useAppSelector((state) => state);

  return (
    <div className={styles.pairProfile}>
      <img
        src={
          pair.profileImage
            ? process.env.BUCKET_URL + pair.profileImage
            : "/default_profile_image.png"
        }
      />
      <div className={`${styles["typo6-medium"]} ${styles.nickname}`}>
        {pair.nickname}
      </div>
      <Link href={`/profile/${pair.id}`}>
        <a>
          <div className={styles.profileLink}>프로필 보기</div>
        </a>
      </Link>
      <button className={styles.moreButton}>
        <MoreIcon />
      </button>
      {modal ? <div></div> : null}
    </div>
  );
}
