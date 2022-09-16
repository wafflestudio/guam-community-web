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
    </div>
  );
};

export default Footer;
