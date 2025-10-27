import * as yup from "yup";

import DateObject from "react-multi-date-picker";
import { object, string } from "yup";
export const isValidMobile = (mobile) => {
  let regex = new RegExp("^[0][9][0-9][0-9]{8,8}$").test(mobile);
  return regex;
};

export const checkoutSchema = yup.object().shape({
  fullName: yup.string().required("نام و نام خانوادگی الزامی است"),
  nationalCode: yup
    .string()
    .matches(/^[0-9]{10}$/, "کد ملی باید ۱۰ رقم باشد")
    .required("کد ملی الزامی است"),
  gender: yup.string().required("لطفاً جنسیت را انتخاب کنید"),
  birthDate: yup.string().required("تاریخ تولد الزامی است"),
});

export const simpleUserValidator = yup.object().shape({
  fullName: yup
    .string()
    .required("نام و نام خانوادگی الزامی است")
    .min(7, "نام و نام خانوادگی باید شامل حداقل 7 حرف باشد")
    .max(20, "نام و نام خانوادگی باید شامل حداکثر 20 حرف باشد"),

  gender: yup
    .string()
    .required("انتخاب جنسیت الزامی است")
    .oneOf(["مرد", "زن"], "جنسیت معتبر انتخاب کنید"),

  nationalCode: yup
    .string()
    .matches(/^\d{10}$/, "کد ملی باید ۱۰ رقم باشد")
    .required("کد ملی الزامی است"),

  birthDate: yup.string().required("تاریخ تولد الزامی است"),
});

 const searchChecker = yup.object().shape({
  origin: yup.string().required("لطفاً مبدا را انتخاب کنید"),
  destination: yup
    .string()
    .required("لطفاً مقصد را انتخاب کنید")
    .notOneOf([yup.ref("origin")], "مبدا و مقصد نمی‌توانند یکسان باشند"),
  dateRange: yup
    .array()
    .of(yup.string())
    .min(2, "لطفاً بازه زمانی رفت و برگشت را انتخاب کنید")
    .required("انتخاب تاریخ الزامی است"),
});
export { searchChecker };

  export const bankValidation = object({
  accountIdentifier: string()
    .min(8, "شماره حساب الزامی است")
    .max(16)
    .required(),
  shaba_code: string().required("شماره شبا الزامی است"),
  debitCard_code: yup
    .string()
    .matches(/^\d{16}$/, "شماره کارت باید ۱۶ رقم باشد")
    .required("شماره کارت الزامی است"),
});


