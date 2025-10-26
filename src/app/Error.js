import Image from "next/image";
import styles from "../Styles/Error.module.css";
function Error() {
  return (
    <div className={styles.container}>
      <div className={styles.textArea}>
        <h1> اتصال با سرور برقرار نیست!</h1>
        <p>لطفا بعدا دوباره امتحان کنید.</p>
      </div>
      <Image
        src="/image/errorImage/500.jpg"
        alt="500"
        width={550}
        height={550}
        className={styles.Image}
      />
    </div>
  );
}
