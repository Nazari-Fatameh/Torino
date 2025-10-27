"use client";

import { Toaster, toast } from "react-hot-toast";
import { CheckCircle, XCircle, Info } from "lucide-react";
import React from "react";

export default function CustomToaster() {
  return (
    <Toaster
      position="top-right"
      reverseOrder={false}
      toastOptions={{
        duration: 4000,
        style: {
          borderRadius: "12px",
          padding: "16px 20px",
          fontSize: "15px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
          color: "#fff",
          background: "#333",
          fontFamily: "Vaziran",
          display: "flex",
          alignItems: "center",
        },
        success: {
          icon: <CheckCircle size={20} />,
          style: {
            background: "#4caf50",
          },
        },
        error: {
          icon: <XCircle size={20} />,
          style: {
            background: "#f44336",
          },
        },
        info: {
          icon: <Info size={20} />,
          style: {
            background: "#2196f3",
          },
        },
      }}
    />
  );
}
