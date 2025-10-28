"use client";
import { useState } from "react";
import styles from "./CheckOTPForm.module.css";
import OTPInput from "react-otp-input";
import { useCheckOtp } from "@/core/services/mutations";
import toast from "react-hot-toast";
import ResendTimer from "@/Components/atoms/inputs/ResendTimer";

function CheckOTPForm({ mobile, setStep, setIsOpen, onSubmitArrow }) {
  const [code, setCode] = useState("");
  const { isPending, mutate } = useCheckOtp();

  const handleChange = (otp) => setCode(otp);

  const submitHandler = (event) => {
    if (event) event.preventDefault();
    if (isPending) return;

    if (!code || code.trim() === "") {
      toast.error("لطفاً کد تأیید را وارد کنید", { className: styles.toast });
      return;
    }

    if (code.length < 6) {
      toast.error("کد تأیید باید ۶ رقم باشد", { className: styles.toast });
      return;
    }

    mutate(
      { mobile, code },
      {
        onSuccess: () => {
          toast.success("ورود با موفقیت انجام شد ✅");
          setStep(1);
          setIsOpen(false);
        },
        onError: (error) => {
          toast.error(error?.response?.data?.message || "کد تأیید اشتباه است", {
            className: styles.toast,
          });
        },
      }
    );
  };

  return (
    <form onSubmit={submitHandler} className={styles.modalContent}>
      <h4 className={styles.titrModal}>کد تأیید را وارد کنید</h4>
      <label className={styles.lableModal}>
        کد تأیید به شماره <b>{mobile}</b> ارسال شد
      </label>

      <div style={{ direction: "ltr" }}>
        <OTPInput
          value={code}
          onChange={handleChange}
          numInputs={6}
          renderInput={(props) => (
            <input {...props} className={styles.otpInput} />
          )}
          inputStyle={{}}
        />
      </div>

      <ResendTimer initialTime={90} />

      <button
        type="submit"
        disabled={isPending}
        className={styles.submitButton}
      >
        {isPending ? "در حال اعتبارسنجی..." : "ورود به تورینو"}
      </button>
    </form>
  );
}

export default CheckOTPForm;
