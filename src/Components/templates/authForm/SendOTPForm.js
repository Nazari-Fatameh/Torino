"use client";

import { isValidMobile } from "@/core/utils/validation";
import { useState } from "react";
import styles from "./SendOTPForm.module.css";
import { useSendOtp } from "@/core/services/mutations";
import toast from "react-hot-toast";
import { toPersianNumber } from "../../../helper/convertNumbers";
function SendOTPform({ setStep, mobile, setMobile }) {
  const { isPending, mutate } = useSendOtp();

  const submitHandler = (event) => {
    event.preventDefault();

    if (isPending) return;

   
    if (!isValidMobile(mobile)) {
      toast.error("شماره معتبر وارد کنید",{ className: styles.toast }); 
      return;
    }

    mutate(
      { mobile },
      {
        onSuccess: (data) => {
          console.log(data);
          toast.success(data?.data?.message);
          toast(data?.data?.code);
          setStep(2);
        },
        onError: (error) => {
          toast.error("خطا در ارسال کد"); 
          console.log(error);
        },
      }
    );
  };

  return (
    <div>
      <form onSubmit={submitHandler} className={styles.formContainer}>
        <h4 className={styles.titerModal}>ورود به تورینو </h4>
        <label htmlFor="mobile" className={styles.lableModal}>
          شماره موبایل خودرا وارد کنید
        </label>
        <input
          className={styles.inputModal}
          type="text"
           placeholder={toPersianNumber("0912****897")}
          id="mobile"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
        />
        <button
          type="submit"
          className={styles.submitButton}
          disabled={isPending}
        >
          {isPending ? "در حال ارسال کد تایید" : "ارسال کد تایید"}
        </button>
      </form>
    </div>
  );
}

export default SendOTPform;
