"use client";

import { useEffect } from "react";
import { useGetUseTransactions } from "../../../core/services/queries";
import toast from "react-hot-toast";
import styles from "../../../Styles/TransactionsPage.module.css";

import {
  toPersianNumber,
  convertToRial,
  randomDigit,
} from "../../../helper/convertNumbers";
import {
  formatPersianDate,
  formatPersianDateNumeric,
} from "../../../helper/tourDates";

export default function TransactionsPage() {
  const { data, isLoading, isError } = useGetUseTransactions();

  useEffect(() => {
    if (isError) toast.error("خطا در دریافت اطلاعات");
  }, [isError]);

  if (isLoading) return <p>در حال بارگذاری...</p>;

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>تاریخ و ساعت</th>
          <th>مبلغ (تومان)</th>
          <th className={styles.hide}>نوع تراکنش</th>
          <th>شماره سفارش</th>
        </tr>
      </thead>
      <tbody>
        {data && data.length > 0 ? (
          data.map((item) => (
            <tr key={item.id} className={styles.row}>
              <td className={styles.cell}>
                {formatPersianDateNumeric(item.createdAt)}
              </td>
              <td className={styles.cell}>
                {toPersianNumber(convertToRial(item.amount))}
              </td>
              <td className={styles.hide}>ثبت نام در تور گردشگری</td>
              <td className={styles.cell}>{toPersianNumber(randomDigit())}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={4} className={styles.noData}>
              داده‌ای وجود ندارد
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
