"use client"; 

import Image from "next/image";
import { useRouter } from "next/navigation";
import styles from "./not-found.module.css";

export default function NotFound() {
  const router = useRouter();

  const handleClick = () => {
    router.push("/"); 
  };

  return (
    <div className={styles.container}>
      <div className={styles.textArea}>
        <h1>صفحه مورد نظر یافت نشد!</h1>
        <button onClick={handleClick}>بازگشت به صفحه اصلی</button>
      </div>
      <Image
        src="/image/errorImage/404.jpg"
        alt="404"
        width={550}
        height={550}
        className={styles.Image}
      />
    </div>
  );
}
