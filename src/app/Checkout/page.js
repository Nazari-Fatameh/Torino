"use client";

import React, { useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import DatePicker from "react-multi-date-picker";
import { checkoutSchema } from "../../core/utils/validation";
import { useGetUserBasket } from "@/core/services/queries";
import { useCheckout } from "@/core/services/mutations";
import { calculateTourDuration } from "../../helper/tourDates";
import styles from "../../Styles/CheckoutPage.module.css";
import toast from "react-hot-toast";

const toPersianNumber = (number) => {
  if (number === null || number === undefined) return "";
  const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  const formatted = Number(number).toLocaleString();
  return formatted.replace(/\d/g, (digit) => persianDigits[digit]);
};

export default function CheckoutPage() {
  const router = useRouter();
  const { data, isLoading } = useGetUserBasket();
  const { mutate: checkout } = useCheckout();
  const formRef = useRef();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(checkoutSchema),
    defaultValues: {
      birthDate: "",
    },
  });

  const [birthDateState, setBirthDateState] = useState(null);

  const onSubmit = (formData) => {
    
    const payload = {
      fullName: formData.fullName,
      nationalCode: formData.nationalCode,
      gender: formData.gender || null,
      birthDate: formData.birthDate
        ? new Date(formData.birthDate).toISOString().split("T")[0] 
        : null,
    };

    console.log("payload to send:", payload); 

    checkout(payload, {
      onSuccess: () => {
        toast.success("خرید با موفقیت انجام شد!");
        router.push("/profile/userTour");
      },
      onError: (err) => {
        console.error(err);
        toast.error("خطایی رخ داد، لطفاً دوباره تلاش کنید.");
      },
    });
  };

  if (isLoading) return <p>در حال بارگذاری...</p>;

  const startDate = data?.data?.startDate;
  const endDate = data?.data?.endDate;
  let duration = null;
  if (startDate && endDate) {
    duration = calculateTourDuration(startDate, endDate);
  }

  const price = data?.data?.price;
  const title = data?.data?.title || "در حال بارگذاری...";

  return (
    <div className={styles.container}>
      <div className={styles.checkoutBox}>
        <div className={styles.desc}>
          <h2>{title}</h2>
          {duration && (
            <p>
              {toPersianNumber(duration.days)} روز و {toPersianNumber(duration.nights)} شب
            </p>
          )}
        </div>

        <div className={styles.midLine}></div>

        <div className={styles.priceDiv}>
          <p>قیمت نهایی:</p>
          <div className={styles.price}>
            <span>{price ? toPersianNumber(price) : "نامشخص"}</span>
            <p>تومان</p>
          </div>
        </div>

        <div className={styles.btn}>
          <button onClick={() => formRef.current.requestSubmit()}>
            ثبت و خرید نهایی
          </button>
        </div>
      </div>

      <div className={styles.infoBox}>
        <div className={styles.user}>
          <img src="/image/profileC.svg" alt="profile" />
          <h2>مشخصات مسافر</h2>
        </div>

        <form
          className={styles.form}
          onSubmit={handleSubmit(onSubmit)}
          ref={formRef}
        >
          <div className={styles.inputWrapper}>
            <input
              type="text"
              placeholder="نام و نام خانوادگی"
              {...register("fullName")}
              className={styles.input}
            />
            {errors.fullName && (
              <p className={styles.error}>{errors.fullName.message}</p>
            )}
          </div>

          <div className={styles.inputWrapper}>
            <input
              type="text"
              placeholder="کد ملی"
              {...register("nationalCode")}
              className={styles.input}
            />
            {errors.nationalCode && (
              <p className={styles.error}>{errors.nationalCode.message}</p>
            )}
          </div>

          <div className={styles.inputWrapper}>
            <Controller
              name="birthDate"
              control={control}
              render={({ field }) => (
                <DatePicker
                  value={birthDateState}
                  calendar={persian}
                  locale={persian_fa}
                  onChange={(date) => {
                    setBirthDateState(date);
                    field.onChange(date ? date.toDate().toISOString().split("T")[0] : "");
                  }}
                  inputClass={styles.input}
                  placeholder="تاریخ تولد"
                />
              )}
            />
            {errors.birthDate && (
              <p className={styles.error}>{errors.birthDate.message}</p>
            )}
          </div>

          <div className={styles.inputWrapper}>
            <select {...register("gender")} className={styles.input}>
              <option value="">انتخاب جنسیت</option>
              <option value="male">مرد</option>
              <option value="female">زن</option>
            </select>
            {errors.gender && (
              <p className={styles.error}>{errors.gender.message}</p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
