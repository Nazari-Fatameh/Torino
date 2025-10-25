"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useFetchUserProfile } from "@/core/services/queries";

import { toast } from "react-hot-toast";
import styles from "../../../Styles/bankInfo.module.css";
import { useUpdateUserProfile } from "../../../core/services/mutations";
import { bankValidation } from "../../../core/utils/validation";
import Image from "next/image";

export default function BankInfo() {
  const { data } = useUpdateUserProfile();
  const [isEditing, setIsEditing] = useState(false);

  const mutation = useUpdateUserProfile(() => setIsEditing((s) => !s));

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(bankValidation),
    defaultValues: {
      cardNum: "",
      accountNum: "",
      ibanCode: "",
    },
  });

  useEffect(() => {
    if (data?.payment) {
      reset({
        cardNum: data.payment.debitCard_code || "",
        accountNum: data.payment.accountIdentifier || "",
        ibanCode: data.payment.shaba_code || "",
      });
    }
  }, [data, reset]);

  const onSubmit = async (values) => {
    const merged = {
      ...data,
      payment: {
        debitCard_code: values.cardNum,
        accountIdentifier: values.accountNum,
        shaba_code: values.ibanCode,
      },
    };
    try {
      await mutation.mutateAsync(merged);
      toast.success("اطلاعات بانکی با موفقیت ذخیره شد");
    } catch {
      toast.error("خطا در ذخیره اطلاعات");
    }
  };

  return (
<div className={styles.card}>
  {/* حالت ویرایش */}
  {isEditing ? (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <h3>ویرایش اطلاعات مالی</h3>

      <div className={styles.wrapperInfo}>
        <div className={styles.inputWrapper}>
          <input placeholder="شماره کارت" {...register("cardNum")} />
          {errors.cardNum && <span className={styles.error}>{errors.cardNum.message}</span>}
        </div>
        <div className={styles.inputWrapper}>
          <input placeholder="شماره شبا" {...register("ibanCode")} />
          {errors.ibanCode && <span className={styles.error}>{errors.ibanCode.message}</span>}
        </div>
      </div>

      <div className={styles.inputWrapper}>
        <input placeholder="شماره حساب" {...register("accountNum")} />
        {errors.accountNum && <span className={styles.error}>{errors.accountNum.message}</span>}
      </div>

      <div className={styles.buttons}>
        <button type="submit" className={styles.addBtn} disabled={mutation.isLoading}>
          تایید
        </button>
        <button type="button" className={styles.cancelBtn} onClick={() => setIsEditing(false)}>
          انصراف
        </button>
      </div>
    </form>
  ) : (
    /* حالت نمایش عادی */
    <>
      <div className={styles.topInput}>
        <h3>اطلاعات مالی</h3>
        <div className={styles.editInfo} onClick={() => setIsEditing(true)}>
          <Image src="/image/svg/profileSVG/edit.svg" width={12} height={12} alt="edit" />
          <p>ویرایش اطلاعات</p>
        </div>
      </div>

      <div className={styles.mainInfo}>
        <div className={styles.wrapperInfo}>
          <div className={styles.data}>
            <p>شماره کارت —</p>
            <span>{data?.payment?.debitCard_code || "—"}</span>
          </div>
          <div className={styles.data}>
            <p>شماره شبا —</p>
            <span>{data?.payment?.shaba_code || "—"}</span>
          </div>
        </div>
        <div className={styles.data}>
          <p>شماره حساب —</p>
          <span>{data?.payment?.accountIdentifier || "—"}</span>
        </div>
      </div>
    </>
  )}
</div>

  );
}
