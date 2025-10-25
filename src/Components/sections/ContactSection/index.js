"use client";

import Image from "next/image";
import styles from "./ContactSection.module.css";

function ContactSection() {
  return (
    <div className={styles.container}>
      <div className={styles.topContact}>
        <div className={styles.texts}>
          <h1>
            خرید تلفنی از <span>تورینو</span>
          </h1>
          <p>به هر کجا که می‌خواهید!</p>
        </div>

        <div className={styles.imageWrapper}>
          <Image
            src="/image/ContactSectionImage/contactImage.png"
            alt="contactPic"
            width={195}
            height={158}
            className={styles.contactImage}
          />
          <Image
            src="/image/ContactSectionImage/contactImageWEB.png"
            alt="contactPic"
            width={195}
            height={158}
            className={styles.contactImageWEB}
          />
        </div>
      </div>

      <div className={styles.bottomContact}>
        <div className={styles.phoneWrapper}>
          <span>021-1840</span>

          <Image
            src="/image/ContactSectionImage/call.svg"
            alt="call icon"
            width={22}
            height={22}
          />
        </div>

        <button>اطلاعات بیشتر</button>
      </div>
    </div>
  );
}

export default ContactSection;
