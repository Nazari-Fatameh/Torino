"use client";

import AccountInfo from "@/Components/templates/accountInfo";
import BankCart from "@/Components/templates/bankCard";
import UserInfo from "@/Components/templates/UserInfo";
import { useGetUserData } from "@/core/services/queries";
import React from "react";

function ProfilePage() {
  const { data } = useGetUserData;
  console.log(data);
  return (
    <div>
      <AccountInfo />
      <UserInfo />
      <BankCart />
    </div>
  );
}

export default ProfilePage;
