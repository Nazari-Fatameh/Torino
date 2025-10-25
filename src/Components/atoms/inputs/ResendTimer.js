"use client";
import { useEffect, useState } from "react";
import styles from "./ResendTimer.module.css";

function ResendTimer({ initialTime = 90, onResend }) {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else {
      setCanResend(true);
    }
  }, [timeLeft]);

  const handleResend = () => {
    if (!canResend) return;
    setTimeLeft(initialTime);
    setCanResend(false);
    onResend?.(); // اگر تابع ارسال مجدد از بیرون پاس داده شده باشه، صدا زده میشه
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(1, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <div className={styles.timerContainer}>
      {canResend ? (
        <button onClick={handleResend} className={styles.resendButton}>
          ارسال مجدد کد
        </button>
      ) : (
        <p className={styles.timerText}>
          تا ارسال مجدد کد <span>{formatTime(timeLeft)}</span>
        </p>
      )}
    </div>
  );
}

export default ResendTimer;
