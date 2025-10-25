"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/core/config/api";
import toast from "react-hot-toast";
import { fetchUserInfo } from "@/core/services/queries";
import styles from "./accountInfo.module.css";
import { toPersianNumber } from "../../../helper/convertNumbers"

export default function AccountInfo() {
  const { data: user, isLoading } = useQuery({
    queryKey: ["user-info"],
    queryFn: fetchUserInfo,
  });

  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);

  const { register, handleSubmit, reset } = useForm({
    defaultValues: { email: user?.email || "" },
  });

  const updateMutation = useMutation({
    mutationFn: async (data) => {
      const res = await api.put("/user/profile", data);
      return res.data;
    },
    onSuccess: () => {
      toast.success("اطلاعات با موفقیت ویرایش شد");
      queryClient.invalidateQueries(["user-info"]);
      setIsEditing(false);
    },
    onError: () => toast.error("خطا در ویرایش اطلاعات"),
  });

  const onSubmit = (data) => {
    updateMutation.mutate({ ...user, email: data.email });
  };

  if (isLoading) return <p>در حال بارگذاری اطلاعات...</p>;

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h3>اطلاعات حساب کاربری</h3>
      </div>

      <div className={styles.infoList}>
  
        <div className={styles.infoItem}>
          <p>شماره موبایل</p>
          <span>{user?.mobile ? toPersianNumber(user.mobile) : "_"}</span>
        </div>

        <div className={styles.infoItem}>
          <p>ایمیل</p>
          {!isEditing ? (
            <span className={styles.englishText}>{user?.email || "_"}</span>
          ) : (
            <form
              onSubmit={handleSubmit(onSubmit)}
              className={styles.inlineForm}
            >
              <input
                type="email"
                {...register("email")}
                defaultValue={user?.email || ""}
                className={styles.inlineInput}
                placeholder="آدرس ایمیل"
                autoFocus
              />
              <button type="submit" className={styles.saveBtn}>
                تایید
              </button>
            </form>
          )}
        </div>

       
        <div className={styles.infoItem}>
          {!isEditing && (
            <button
              onClick={() => {
                reset({ email: user?.email || "" });
                setIsEditing(true);
              }}
              className={styles.editBtn}
            >
              <img src="/image/svg/profileSVG/edit.svg" alt="edit" />
             افزودن
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
