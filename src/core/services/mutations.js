import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../config/api";
import { setCookie } from "../utils/cookie";
import toast from "react-hot-toast";

export const useSendOtp = () => {
  const mutationFn = (data) => api.post("/auth/send-otp", data);
  return useMutation({ mutationFn });
};

export const useCheckOtp = () => {
  const queryClient = useQueryClient();
  const mutationFn = (data) => api.post("/auth/check-otp", data);

  const onSuccess = (data) => {
    setCookie("accessToken", data?.data?.accessToken, 30);
    setCookie("refreshToken", data?.data?.refreshToken, 365);
    queryClient.invalidateQueries({ queryKey: ["user-data"] });
  };

  return useMutation({ mutationFn, onSuccess });
};

export const useAddToBasket = () => {
  const mutationFn = (tourId) => api.put(`/basket/${tourId}`);
  return useMutation({ mutationFn });
};

export const useCheckout = () => {
  const mutationFn = (data) => api.post("/order", data);
  return useMutation({ mutationFn });
};

export const useUpdateUserProfile = (onSuccessCallback) => {
  const queryClient = useQueryClient();

  const mutationFn = async (payload) => {
    const response = await api.put("/user/profile", payload);
    return response;
  };

  return useMutation({
    mutationFn,
    onSuccess: (data) => {
      queryClient.invalidateQueries(["user-data"]);

      toast.success("دیتا با موفقیت تغییر یافت");

      if (onSuccessCallback) onSuccessCallback(data);
    },
    onError: (error) => {
      toast.error(error?.message || "مشکلی پیش آمده، دوباره تلاش کنید");
    },
  });
};

export const useUpdateBankAccount = () => {
  const queryClient = useQueryClient();
  const mutationFn = (data) => api.put("/user/profile", data);

  const onSuccess = (data) => {
    queryClient.invalidateQueries({ queryKey: ["user-data"] });
  };

  return useMutation({ mutationFn, onSuccess });
};
