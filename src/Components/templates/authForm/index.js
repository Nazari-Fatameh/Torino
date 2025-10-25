"use client";

import ModalContainer from "@/Components/partials/container/ModalContainer";
import { useState, useEffect } from "react";
import SendOTPform from "./SendOTPForm";
import CheckOTPForm from "./CheckOTPForm";
import SignInButtonM from "@/Components/atoms/signInButtonM/SignInButtonM";
import { useGetUserData } from "@/core/services/queries";

function AuthForm({ setUser }) {
  const [step, setStep] = useState(1);
  const [mobile, setMobile] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const { data } = useGetUserData();
  const userData = data?.data;


  useEffect(() => {
    if (userData) {
      setUser(userData); 
    }
  }, [userData, setUser]);

  if (userData) return null; 

  return (
    <div>
      <SignInButtonM onClick={() => setIsOpen(true)} />

      {step === 1 && (
        <ModalContainer isOpen={isOpen} setIsOpen={setIsOpen} showCloseButton={false}>
          <SendOTPform setStep={setStep} mobile={mobile} setMobile={setMobile} />
        </ModalContainer>
      )}

      {step === 2 && (
        <ModalContainer
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          showCloseButton={false}
          topElement={<img src="image/svg/arrow-left.svg" alt="Arrow" />}
        >
          <CheckOTPForm setStep={setStep} mobile={mobile} setIsOpen={setIsOpen} />
        </ModalContainer>
      )}
    </div>
  );
}

export default AuthForm;
