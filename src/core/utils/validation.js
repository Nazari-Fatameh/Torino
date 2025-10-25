import * as yup from "yup";

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

export const searchChecker = yup.object().shape({
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
export const userInfoValidator = yup.object({
  fullName: yup
    .string()
    .required("نام و نام خانوادگی الزامی است")
    .min(3, "نام و نام خانوادگی حداقل باید 3 حرف باشد")
    .max(50, "نام و نام خانوادگی نباید بیشتر از 50 حرف باشد"),

  nationalCode: yup
    .string()
    .required("کد ملی الزامی است")
    .matches(/^\d{10}$/, "کد ملی باید 10 رقم باشد"),

  gender: yup
    .string()
    .required("جنسیت الزامی است")
    .oneOf(["مرد", "زن"], "لطفا جنسیت معتبر انتخاب کنید"),

  birthDate: yup
    .string()
    .required("تاریخ تولد الزامی است")
    .test(
      "valid-date",
      "تاریخ تولد معتبر نیست",
      (value) => !isNaN(Date.parse(value))
    ),
});

const bankValidation = yup.object({
  accountIdentifier: yup
    .string()
    .matches(/^\d+$/, "شماره حساب فقط عدد باشد")
    .required("شماره حساب الزامی است"),
  shaba_code: yup
    .string()
    .matches(/^IR\d{24}$/, "شماره شبا معتبر نیست")
    .required("شماره شبا الزامی است"),
  debitCard_code: yup
    .string()
    .matches(/^\d{16}$/, "شماره کارت باید ۱۶ رقم باشد")
    .required("شماره کارت الزامی است"),
});
export { bankValidation };
