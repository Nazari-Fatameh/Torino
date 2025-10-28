"use client";

import { useState, useRef, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { DatePicker } from "zaman";
import { useRouter } from "next/navigation";
import QueryString from "qs";
import useQuery from "@/core/hooks/query";
import { flattenObject } from "@/core/utils/helpers";
import Image from "next/image";
import styles from "./SearchForm.module.css";

export default function SearchForm() {
  const router = useRouter();
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      originId: "",
      destinationId: "",
      date: null,
    },
  });

  const { getQuery } = useQuery();

  const [originOpen, setOriginOpen] = useState(false);
  const [destinationOpen, setDestinationOpen] = useState(false);
  const [dateOpen, setDateOpen] = useState(false);

  const originOptions = [
    { id: "1", label: "تهران", icon: "/image/svg/location.svg" },
    { id: "2", label: "سنندج", icon: "/image/svg/location.svg" },
    { id: "3", label: "مادرید", icon: "/image/svg/location.svg" },
    { id: "4", label: "اصفهان", icon: "/image/svg/location.svg" },
    { id: "5", label: "سلیمانیه", icon: "/image/svg/location.svg" },
    { id: "6", label: "هولر", icon: "/image/svg/location.svg" },
    { id: "7", label: "مازندران", icon: "/image/svg/location.svg" },
    { id: "8", label: "گیلان", icon: "/image/svg/location.svg" },
    { id: "9", label: "ایتالیا", icon: "/image/svg/location.svg" },
  ];

  const destinationOptions = [
    { id: "0", label: "هیچکدام", icon: "/image/svg/location.svg" },
    ...originOptions,
  ];

  const originRef = useRef(null);
  const destinationRef = useRef(null);

  useEffect(() => {
    const originId = getQuery("originId") || "";
    const destinationId = getQuery("destinationId") || "";
    reset({
      originId,
      destinationId,
      date: null,
    });
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (originRef.current && !originRef.current.contains(event.target)) {
        setOriginOpen(false);
      }
      if (
        destinationRef.current &&
        !destinationRef.current.contains(event.target)
      ) {
        setDestinationOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const submitHandler = (form) => {
    const query = QueryString.stringify(flattenObject(form));
    router.push(`/?${query}`);
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit(submitHandler)}>
      <Controller
        name="originId"
        control={control}
        render={({ field }) => (
          <div className={styles.originDiv} ref={originRef}>
            <div
              className={styles.selectBox}
              onClick={() => setOriginOpen(!originOpen)}
            >
              <Image
                src="/image/locationU.svg"
                width={18}
                height={18}
                alt="location"
              />
              <span>
                {field.value
                  ? originOptions.find((o) => o.id === field.value)?.label
                  : "مبدا"}
              </span>
            </div>
            {originOpen && (
              <div className={styles.dropdownList}>
                {originOptions.map((o) => (
                  <div
                    key={o.id}
                    className={styles.option}
                    onClick={() => {
                      field.onChange(o.id);
                      setOriginOpen(false);
                    }}
                  >
                    <Image src={o.icon} width={18} height={18} alt="icon" />
                    <span>{o.label}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      />

      <Controller
        name="destinationId"
        control={control}
        render={({ field }) => (
          <div className={styles.destinationDiv} ref={destinationRef}>
            <div
              className={styles.selectBox}
              onClick={() => setDestinationOpen(!destinationOpen)}
            >
              <Image
                src="/image/global.svg"
                width={18}
                height={18}
                alt="location"
              />
              <span>
                {field.value
                  ? destinationOptions.find((o) => o.id === field.value)?.label
                  : "مقصد"}
              </span>
            </div>
            {destinationOpen && (
              <div className={styles.dropdownList}>
                {destinationOptions.map((o) => (
                  <div
                    key={o.id}
                    className={styles.option}
                    onClick={() => {
                      field.onChange(o.id);
                      setDestinationOpen(false);
                    }}
                  >
                    <Image src={o.icon} width={18} height={18} alt="icon" />
                    <span>{o.label}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      />

      <Controller
        name="date"
        control={control}
        render={({ field: { onChange, value } }) => (
          <div className={styles.calender}>
            <div
              className={styles.selectBox}
              onClick={() => setDateOpen(!dateOpen)}
            >
              <Image
                src="/image/calendarU.svg"
                width={18}
                height={18}
                alt="calendar"
              />
              <span>تاریخ</span>
            </div>
            {dateOpen && (
              <div className={styles.dropdownList}>
                <DatePicker
                  value={value}
                  onChange={(e) => onChange({ from: e.from, to: e.to })}
                  range
                  inputClassName={styles.dateInput}
                  containerClassName={styles.dateContainer}
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            )}
          </div>
        )}
      />

      <button className={styles.searchButton} type="submit">
        جستجو
      </button>
    </form>
  );
}
