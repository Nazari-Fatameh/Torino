"use client";
import { date } from "yup";
import styles from "./ReserveButton.module.css";
import { useAddToBasket } from "@/core/services/mutations";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

function ReserveButton({ tourId }) {
  const { mutate, isPending } = useAddToBasket();
  const router = useRouter();
  const cartHandler = () => {
    if (isPending) return;
    mutate(tourId, {
      onSuccess: (date) => {
        toast.success("    به سبد خرید اضافه شد ");
        router.push("/Checkout");
      },
      onError: (error) => {
        toast.error("لطفا وارد حساب کاربری  شوید");
      },
    });
  };
  return (
    <div className={styles.container}>
      <button onClick={cartHandler}>رزرو و خرید </button>
    </div>
  );
}

export default ReserveButton;
