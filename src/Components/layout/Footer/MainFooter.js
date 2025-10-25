import styles from "./MainFooter.module.css";
import { toPersianNumber } from "../../../helper/convertNumbers";

function MainFooter() {
  return (
    <div className={styles.container}>
      <div className={styles.footerRow}>
        <div className={styles.footerDivider}>
          <div className={styles.torino}>
            <h4>تورینو</h4>
            <ul>
              <li>درباره ما</li>
              <li>تماس با ما</li>
              <li>چرا تورینو</li>
              <li>بیمه مسافرتی</li>
            </ul>
          </div>
          <div className={styles.torino}>
            <h4>خدمات مشتریان</h4>
            <ul>
              <li>پشتیبانی آنلاین</li>
              <li>راهنمای خرید</li>
              <li>راهنمای استرداد</li>
              <li>پرسش و پاسخ</li>
            </ul>
          </div>
        </div>
        <div className={styles.footerBottom}>
          <div className={styles.footerNamad}>
            <img src="image/svg/FooterSvg/ecunion.svg" alt="QrCode" />
            <img src="image/svg/FooterSvg/resaneh.svg" alt="Resaneh" />
            <img src="image/svg/FooterSvg/aira.svg" alt="aira" />
            <img src="image/svg/FooterSvg/airline.svg" alt="airline" />
            <img src="image/svg/FooterSvg/passenger.svg" alt="passenger" />
          </div>
          <div className={styles.footerLogoSection}>
            <img
              src="/image/svg/FooterSvg/Torino.svg"
              alt="Torino Logo"
              className={styles.footerLogo}
            />
            <span className={styles.footerSupport}>
              تلفن پشتیبانی:
              <span style={{ direction: "ltr", display: "inline-block" }}>
                {toPersianNumber("021-8574")}
              </span>
            </span>
          </div>
        </div>
      </div>

      <p className={styles.copyRight}>
        کلیه حقوق این وب سایت متعلق به تورینو میباشد.
      </p>
    </div>
  );
}

export default MainFooter;
