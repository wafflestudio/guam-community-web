import { IUser } from "../../../../types/types";

import styles from "./MentionList.module.scss";

export default function MentionList({ mentionList }: { mentionList: IUser[] }) {
  const list = mentionList.map((user) => (
    <li key={user.id} className={styles.userList}>
      <div className={styles.profileImage}>
        <img
          src={
            user.profileImage
              ? process.env.BUCKET_URL + user.profileImage
              : "/default profile image.png"
          }
        />
      </div>
      <span className={`${styles["typo3-regular"]} ${styles.nickname}`}>
        @{user.nickname}
      </span>
    </li>
  ));

  return (
    <div className={`${styles.container} ${styles.null}`}>
      <ul>{list}</ul>
    </div>
  );
}
