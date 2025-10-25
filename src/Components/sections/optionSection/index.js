import styles from "./OptionSection.module.css";

function OptionSection() {
  return (
    <div className={styles.container}>
      <div className={styles.sectionPart}>
        <img src="/image/optionSVG/16.svg" />
        <div className={styles.text}>
          <h3>بصرفه ترین قیمت</h3>
          <p>بصرفه ترین و ارزان ترین قیمت تور را از ما بخواهید.</p>
        </div>
      </div>
      <div className={styles.sectionPart}>
        <img src="/image/optionSVG/17.svg" />
        <div className={styles.text}>
          <h3>پشتیبانی </h3>
          <p>پشتیبانی و همراهی 24 ساعته در تمامی مراحل سفر شما.</p>
        </div>
      </div>
      <div className={styles.sectionPart}>
        <img src="/image/optionSVG/18.svg" />
        <div className={styles.text}>
          <h3> رضایت کاربران</h3>
          <p>رضایت بیش از 10هزار کاربر از تور های ما. </p>
        </div>
      </div>
    </div>
  );
}

export default OptionSection;
