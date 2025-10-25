"use client";

import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useUpdateUserProfile } from "../../../core/services/mutations";
import { userInfoValidator } from "../../../core/utils/validation";
import DatePicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import toast from "react-hot-toast";
import Image from "next/image";
import api from "../../../core/config/api";
import styles from "./UserInfo.module.css";
import fetchUserInfo from "../../../core/services/queries"
import { useFetchUserProfile } from "@/core/services/queries";

export default function UserInfo() {
  const { data, isLoading } = useFetchUserProfile();
  const [isEditing, setIsEditing] = useState(false);
  const queryClient = useQueryClient();
  const mutation = useUpdateUserProfile(() => setIsEditing(false));

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userInfoValidator),
    defaultValues: {
      fullName: "",
      nationalCode: "",
      gender: "",
      birthDate: "",
    },
  });

  // وقتی اطلاعات از سرور اومد، فرم رو پر کن
  useEffect(() => {
    if (data) {
      reset({
        fullName: data.fullName
          ? data.fullName
          : `${data.firstName || ""} ${data.lastName || ""}`.trim(),
        nationalCode: data.nationalCode || "",
        gender:
          data.gender === "male"
            ? "مرد"
            : data.gender === "female"
            ? "زن"
            : "",
        birthDate: data.birthDate || "",
      });
    }
  }, [data, reset]);

  const mapGenderToServer = (gender) => {
    if (gender === "مرد") return "male";
    if (gender === "زن") return "female";
    return "";
  };

  const onSubmit = async (values) => {
    const names = values.fullName.trim().split(" ");
    const firstName = names[0] || "";
    const lastName = names.slice(1).join(" ") || "";

    const payload = {
      ...data,
      firstName,
      lastName,
      fullName: values.fullName,
      nationalCode: values.nationalCode,
      gender: mapGenderToServer(values.gender),
      birthDate: values.birthDate,
    };

    try {
      await mutation.mutateAsync(payload);
      toast.success("اطلاعات ذخیره شد ✅");
      // setIsEditing(false);


      queryClient.invalidateQueries(["user-profile"]);
    } catch {
      toast.error("خطا در ذخیره اطلاعات");
    }
  };

  if (isLoading) return <p>در حال بارگذاری...</p>;

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.topInput}>
          <h3>اطلاعات شخصی</h3>
          {!isEditing && (
            <div className={styles.editInfo} onClick={() => setIsEditing(true)}>
              <Image
                src="/image/svg/profileSVG/edit.svg"
                width={12}
                height={12}
                alt="edit"
              />
              <p>ویرایش اطلاعات</p>
            </div>
          )}
        </div>

        <form className={styles.mainInfo} onSubmit={handleSubmit(onSubmit)}>
  
          <div className={styles.data}>
            {!isEditing ? (
              <p>
                نام و نام خانوادگی -{" "}
                {data?.fullName
                  ? data.fullName
                  : data?.firstName || data?.lastName
                  ? `${data.firstName || ""} ${data.lastName || ""}`.trim()
                  : "-"}
              </p>
            ) : (
              <input
                type="text"
                placeholder="نام و نام خانوادگی"
                {...register("fullName")}
              />
            )}
            {errors.fullName && (
              <span className={styles.error}>{errors.fullName.message}</span>
            )}
          </div>


          <div className={styles.data}>
            {!isEditing ? (
              <p>کد ملی  {data?.nationalCode || "-"}</p>
            ) : (
              <input
                type="text"
                placeholder="کد ملی"
                {...register("nationalCode")}
              />
            )}
            {errors.nationalCode && (
              <span className={styles.error}>
                {errors.nationalCode.message}
              </span>
            )}
          </div>


          <div className={styles.data}>
            {!isEditing ? (
              <p>
                جنسیت {" "}
                {data?.gender === "male"
                  ? "مرد"
                  : data?.gender === "female"
                  ? "زن"
                  : "-"}
              </p>
            ) : (
              <select {...register("gender")}>
                <option value="">انتخاب</option>
                <option value="مرد">مرد</option>
                <option value="زن">زن</option>
              </select>
            )}
            {errors.gender && (
              <span className={styles.error}>{errors.gender.message}</span>
            )}
          </div>


          <div className={styles.data}>
            {!isEditing ? (
              <p>تاریخ تولد  {data?.birthDate || "-"}</p>
            ) : (
              <Controller
                name="birthDate"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    value={
                      field.value
                        ? new DateObject({
                            date: field.value,
                            format: "YYYY/MM/DD",
                            calendar: persian,
                          })
                        : null
                    }
                    calendar={persian}
                    locale={persian_fa}
                    onChange={(date) => {
                      if (date) {
                        const formatted = Array.isArray(date)
                          ? date[0].format("YYYY/MM/DD")
                          : date.format("YYYY/MM/DD");
                        field.onChange(formatted);
                      } else {
                        field.onChange("");
                      }
                    }}
                    render={(value, openCalendar) => (
                      <div
                        className={styles.dateInput}
                        onClick={openCalendar}
                      >
                        <span>{field.value || "تاریخ تولد"}</span>
                      </div>
                    )}
                  />
                )}
              />
            )}
            {errors.birthDate && (
              <span className={styles.error}>
                {errors.birthDate.message}
              </span>
            )}
          </div>

          {isEditing && (
            <div className={styles.buttons}>
              <button type="submit" className={styles.saveBtn}>
                تایید
              </button>
              <button
                type="button"
                className={styles.cancelBtn}
                onClick={() => setIsEditing(false)}
              >
                انصراف
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
