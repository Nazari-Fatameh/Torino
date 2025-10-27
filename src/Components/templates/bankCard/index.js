"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQueryClient } from "@tanstack/react-query";
import { useUpdateBankAccount } from "../../../core/services/mutations";
import { useGetUserData } from "../../../core/services/queries";
import { bankValidation } from "../../../core/utils/validation";
import styles from "../../../Styles/bankCart.module.css";
import { toast } from "react-hot-toast";
import Image from "next/image";

export default function BankCart() {
  const [isEditing, setIsEditing] = useState(false);
  const queryClient = useQueryClient();

  const { data: userData, isLoading } = useGetUserData();
  const mutation = useUpdateBankAccount();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(bankValidation),
    mode: "onChange",
    defaultValues: {
      debitCard_code: userData?.payment?.debitCard_code || "",
      accountIdentifier: userData?.payment?.accountIdentifier || "",
      shaba_code: userData?.payment?.shaba_code || "",
    },
  });

  if (isLoading) return <p>در حال بارگذاری...</p>;

  const watchedValues = watch();

  const onSubmit = (values) => {
    if (mutation.isPending) return; 

    mutation.mutate(
      { payment: values },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["user-data"] });
          toast.success("اطلاعات بانکی با موفقیت ذخیره شد");
          setIsEditing(false);
          reset(values);
        },
        onError: (error) => {
          toast.error(
            error.response?.data?.message ||
              error.message ||
              "خطا در ذخیره اطلاعات"
          );
        },
      }
    );
  };

  return (
    <div className={`${styles.card} ${isEditing ? styles.editing : ""}`}>
      {isEditing ? (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <h3>ویرایش اطلاعات حساب بانکی</h3>
          <div className={styles.inputs}>
            <div className={styles.inputWrapper}>
              <input
                type="text"
                placeholder="شماره کارت"
                {...register("debitCard_code")}
              />
              {errors.debitCard_code && (
                <span className={styles.error}>
                  {errors.debitCard_code.message}
                </span>
              )}
            </div>
            <div className={styles.inputWrapper}>
              <input
                type="text"
                placeholder="شماره حساب"
                {...register("accountIdentifier")}
              />
              {errors.accountIdentifier && (
                <span className={styles.error}>
                  {errors.accountIdentifier.message}
                </span>
              )}
            </div>
            <div className={styles.inputWrapper}>
              <input
                type="text"
                placeholder="شماره شبا"
                {...register("shaba_code")}
              />
              {errors.shaba_code && (
                <span className={styles.error}>
                  {errors.shaba_code.message}
                </span>
              )}
            </div>
          </div>
          <div className={styles.divider}></div>
          <div className={styles.buttons}>
            <button
              type="submit"
              className={styles.addBtn}
              disabled={mutation.isPending}
            >
              {mutation.isPending ? "در حال ذخیره..." : "تایید"}
            </button>
            <button
              type="button"
              className={styles.cancelBtn}
              onClick={() => setIsEditing(false)}
            >
              انصراف
            </button>
          </div>
        </form>
      ) : (
        <>
          <div className={styles.topInput}>
            <div
              className={styles.editInfo}
              onClick={() => setIsEditing(true)}
              role="button"
            >
              <Image
                src="/image/svg/profileSVG/edit.svg"
                width={12}
                height={12}
                alt="edit"
              />
              <p>ویرایش اطلاعات</p>
            </div>
            <h3>اطلاعات حساب بانکی</h3>
          </div>
          <div className={styles.mainInfo}>
            <div className={styles.row}>
              <div className={styles.column}>
                <div className={styles.data}>
                  <p>شماره کارت</p>
                  <span>
                    {watchedValues.debitCard_code ||
                      userData?.payment?.debitCard_code ||
                      "—"}
                  </span>
                </div>
                <div className={styles.data}>
                  <p>شماره حساب</p>
                  <span>
                    {watchedValues.accountIdentifier ||
                      userData?.payment?.accountIdentifier ||
                      "—"}
                  </span>
                </div>
              </div>
              <div className={styles.data}>
                <p>شماره شبا</p>
                <span>
                  {watchedValues.shaba_code ||
                    userData?.payment?.shaba_code ||
                    "—"}
                </span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
