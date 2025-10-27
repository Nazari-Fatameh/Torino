"use client";

import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQueryClient } from "@tanstack/react-query";
import { useUpdateUserProfile } from "../../../core/services/mutations";
import { simpleUserValidator } from "../../../core/utils/validation";
import DatePicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import toast from "react-hot-toast";
import Image from "next/image";
import styles from "./UserInfo.module.css";
import { useFetchUserProfile } from "@/core/services/queries";

export default function UserInfo() {
  const { data, isLoading } = useFetchUserProfile();
  const [isEditing, setIsEditing] = useState(false);
  const [selectedGender, setSelectedGender] = useState("");
  const queryClient = useQueryClient();
  const mutation = useUpdateUserProfile(() => setIsEditing(false));

  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(simpleUserValidator),
    defaultValues: {
      fullName: "",
      nationalCode: "",
      gender: "",
      birthDate: "",
    },
  });

  useEffect(() => {
    if (data) {
      const genderText =
        data.gender === "male" ? "مرد" : data.gender === "female" ? "زن" : "";

      reset({
        fullName:
          data.fullName?.trim() ||
          `${data.firstName || ""} ${data.lastName || ""}`.trim(),
        nationalCode: data.nationalCode || "",
        gender: genderText,
        birthDate: data.birthDate
          ? new DateObject({
              date: data.birthDate,
              format: "YYYY-MM-DD",
              calendar: "gregorian",
            }).convert("persian", "YYYY/MM/DD")
          : "",
      });

      setSelectedGender(genderText);
    }
  }, [data, reset]);

  const mapGenderToServer = (gender) =>
    gender === "مرد" ? "male" : gender === "زن" ? "female" : "";

  const onSubmit = async (values) => {
    const names = values.fullName.trim().split(" ");
    const firstName = names[0] || "";
    const lastName = names.slice(1).join(" ") || "";

    const miladiDate = values.birthDate
      ? new DateObject({
          date: values.birthDate,
          format: "YYYY/MM/DD",
          calendar: persian,
        }).convert("gregorian", "YYYY-MM-DD")
      : null;

    const payload = {
      ...data,
      firstName,
      lastName,
      fullName: values.fullName,
      nationalCode: values.nationalCode,
      gender: mapGenderToServer(values.gender || selectedGender),
      birthDate: miladiDate,
    };

    try {
      await mutation.mutateAsync(payload);

      queryClient.invalidateQueries(["user-profile"]);
      setIsEditing(false);
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

        <form
          className={`${styles.mainInfo} ${isEditing ? styles.editing : ""}`}
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className={styles.row}>
            <div className={styles.data}>
              {!isEditing && (
                <span className={styles.label}>نام و نام خانوادگی:</span>
              )}
              {isEditing ? (
                <input
                  type="text"
                  placeholder="نام و نام خانوادگی"
                  {...register("fullName")}
                />
              ) : (
                <span className={styles.value}>
                  {data?.fullName ||
                    `${data?.firstName || ""} ${data?.lastName || ""}`.trim() ||
                    "-"}
                </span>
              )}
              {errors.fullName && (
                <span className={styles.error}>{errors.fullName.message}</span>
              )}
            </div>

            <div className={styles.data}>
              {!isEditing && <span className={styles.label}>کد ملی:</span>}
              {isEditing ? (
                <input
                  type="text"
                  placeholder="کد ملی"
                  {...register("nationalCode")}
                />
              ) : (
                <span className={styles.value}>
                  {data?.nationalCode || "-"}
                </span>
              )}
              {errors.nationalCode && (
                <span className={styles.error}>
                  {errors.nationalCode.message}
                </span>
              )}
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.data}>
              {!isEditing && <span className={styles.label}>جنسیت:</span>}
              {isEditing ? (
                <select
                  {...register("gender")}
                  value={selectedGender}
                  onChange={(e) => {
                    setSelectedGender(e.target.value);
                    setValue("gender", e.target.value);
                  }}
                >
                  <option value="">انتخاب</option>
                  <option value="مرد">مرد</option>
                  <option value="زن">زن</option>
                </select>
              ) : (
                <span className={styles.value}>
                  {data?.gender === "male"
                    ? "مرد"
                    : data?.gender === "female"
                    ? "زن"
                    : "-"}
                </span>
              )}
              {errors.gender && (
                <span className={styles.error}>{errors.gender.message}</span>
              )}
            </div>

            <div className={styles.data}>
              {!isEditing && <span className={styles.label}>تاریخ تولد:</span>}
              {isEditing && (
         <Controller
  name="birthDate"
  control={control}
  render={({ field }) => (
    <DatePicker
      value={
        field.value
          ? new DateObject({ date: field.value, format: "YYYY/MM/DD", calendar: persian })
          : null
      }
      calendar={persian}
      locale={persian_fa}
      onChange={(date) => {
        if (!date) return field.onChange("");
        const formatted = Array.isArray(date)
          ? date[0].format("YYYY/MM/DD")
          : date.format("YYYY/MM/DD");
        field.onChange(formatted);
      }}
      render={(value, openCalendar) => (
        <div className={styles.dateInput} onClick={openCalendar}>
          <input
            type="text"
            readOnly
            value={field.value || ""}
            placeholder="تاریخ تولد"
            style={{
              width: "300px",
              padding: "10px 8px",
              borderRadius: "5px",
              border: "1px solid #00000080",
              fontFamily: "Vaziran",
              fontSize: "14px",
              boxSizing: "border-box",
              cursor: "pointer",
              height: "40px",
            }}
          />
        </div>
      )}
    />
  )}
/>

              )}
              {!isEditing && (
                <span className={styles.value}>{data?.birthDate || "-"}</span>
              )}
              {errors.birthDate && (
                <span className={styles.error}>{errors.birthDate.message}</span>
              )}
            </div>
          </div>

        
          {isEditing && (
            <>
              <div className={styles.divider}></div>
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
            </>
          )}
        </form>
      </div>
    </div>
  );
}
