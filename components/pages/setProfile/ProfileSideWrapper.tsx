import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { batch } from "react-redux";

import { LayoutProps } from "components/layout";
import { signOut } from "store/authSlice";
import { useAppDispatch } from "store/hooks";
import { removeUserState } from "store/userSlice";
import styles from "styles/ProfilePage.module.scss";
import { firebaseSignOut } from "utils/firebaseUtils";

const profileMenu = [
  {
    path: "setting",
    name: "프로필 수정",
  },
  {
    path: "my_writing",
    name: "내가 쓴 글",
  },
  {
    path: "blocks",
    name: "차단 목록 관리",
  },
  {
    path: "scrapped",
    name: "스크랩한 글",
  },
];

const ProfileSideWrapper = ({ children }: LayoutProps) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const logout = async () => {
    await firebaseSignOut();
    batch(() => {
      dispatch(signOut);
      dispatch(removeUserState);
    });
    router.push("/login");
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.profileSideContainer + " typo5-regular"}>
        {profileMenu.map((menu) => (
          <React.Fragment key={menu.path}>
            <Link href={`/profile/setting/${menu.path}`}>
              <a
                className={
                  router.pathname === `/profile/setting/${menu.path}`
                    ? styles.currentPath
                    : ""
                }
              >
                {menu.name}
              </a>
            </Link>
            <hr />
          </React.Fragment>
        ))}
        <button onClick={logout} className="typo5-regular">
          로그아웃
        </button>
      </div>
      {children}
    </div>
  );
};

export default ProfileSideWrapper;
