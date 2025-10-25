import AccountInfo from "@/Components/templates/accountInfo";
import BankInfo from "@/Components/templates/bankInfo";
import UserInfo from "@/Components/templates/UserInfo";
import React from "react";

function ProfilePage() {
  return (
    <div>
      <AccountInfo />
      <UserInfo />
      <BankInfo />
    </div>
  );
}

export default ProfilePage;
