import Link from "next/link";
import React from "react";

import styles from "styles/Footer.module.scss";

const Footer = () => {
  return (
    <div className={styles.container}>
      <hr />
      <div className={styles.text + " typo1-regular"}>
        <div>Team GUAM</div>
        <div className={styles.links}>
          <Link href={"/terms_of_service"}>
            <a>약관</a>
          </Link>
          <Link href={"/privacy_policy"}>
            <a>개인정보처리방침</a>
          </Link>
        </div>
      </div>
      <div className={styles.downloadButtons}>
        <a
          href="https://play.google.com/store/apps/details?id=com.wafflestudio.guam_community"
          target={"_blank"}
          rel="noreferrer"
        >
          <img
            src="/google_play_badge.png"
            alt="Google Play Store에서 다운로드받기"
          />
        </a>
        <a
          href="https://apps.apple.com/kr/app/guam-community/id1627233509"
          target={"_blank"}
          rel="noreferrer"
        >
          <img src="/app_store_badge.svg" alt="App Store에서 다운로드받기" />
        </a>
      </div>
    </div>
  );
};

export default Footer;
