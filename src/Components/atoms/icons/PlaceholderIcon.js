import Image from "next/image";
import styles from "../../templates/SearchForm/SearchForm.module.css";

export default function PlaceholderIcon({ icon, children }) {
  return (
    <div className={styles.placeholder}>
      <Image src={icon} width={18} height={18} alt="svg" />
      <span>{children}</span>
    </div>
  );
}
