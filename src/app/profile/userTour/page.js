"use client";

import styles from "../../../Styles/UserTour.module.css";
import { useGetUserTours } from "../../../core/services/queries";

import TourCart from "../../../Components/templates/tourCart";
import { useEffect } from "react";

export default function UserTour() {
  const { data, isLoading, isError } = useGetUserTours();

  useEffect(() => {
    if (isError) {
     console.log("خطا در دریافت اطلاعات");
    }
  }, [isError]);



  if (!data || data.length === 0)
    return <p style={{ textAlign: "center" }}>شما هنوز توری رزرو نکرده‌اید.</p>;

  return (
    <div className={styles.container}>
      {data.map((tour, index) => (
        <TourCart key={`${tour.id}-${index}`} tour={tour} />
      ))}
    </div>
  );
}
