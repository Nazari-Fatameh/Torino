import { useQuery } from "@tanstack/react-query";
import api from "../config/api";
import QueryString from "qs";

export const useGetUserData = () => {
  const queryFn = () => api.get("/user/profile");
  const queryKey = ["user-data"];
  return useQuery({ queryFn, queryKey });
};

export const useGetTours = (query) => {
  const url = "/tour?" + QueryString.stringify(query);
  const queryFn = () => api.get(url);
  const queryKey = ["tour", query];
  return useQuery({ queryKey, queryFn, enabled: false });
};

export const useGetUserBasket = () => {
  const queryFn = () => api.get("/basket");
  const queryKey = ["user-basket"];
  return useQuery({ queryFn, queryKey });
};

export const fetchUserInfo = async () => {
  try {
    const res = await api.get("/user/profile");
    return res?.data ?? null;
  } catch (err) {
    console.error("Error fetching user info:", err);
    return null;
  }
};

export const useFetchUserProfile = () => {
  return useQuery({
    queryKey: ["user-profile"],
    queryFn: async () => {
      console.log("📡 Fetching /user/profile ...");
      const res = await api.get("/user/profile");
      console.log(" Response:", res.data);
      return res.data;
    },
    staleTime: 1000 * 60 * 5,
  });
};

export const useGetUserTours = () => {
  return useQuery({
    queryKey: ["user-tours"],
    queryFn: async () => {
      try {
        const response = await api.get("/user/tours");
        return response.data ?? [];
       
      } catch (error) {
        return null;
      }
    },
    staleTime: 1000 * 60 * 2,
  });
};
export const useGetUseTransactions = () => {
  return useQuery({
    queryKey: ["user-transactions"],
    queryFn: async () => {
      try {
        const response = await api.get("/user/transactions");
        return response.data ?? []; 
      } catch (error) {
        console.log(error.message);
        return []; 
      }
    },
    staleTime: 1000 * 60 * 2,
  });
};
