"use client";
import { Scrollbar } from "react-scrollbars-custom";

export default function CustomScrollbar({ children }) {
  return (
    <Scrollbar
      style={{
        width: "100%",
        height: "100vh",
        position: "fixed",
        inset: 0,
      }}
      trackYProps={{
        style: {
          left: "0px", 
          right: "auto",
          backgroundColor: "rgba(237, 185, 27, 0.05)",
          borderRadius: "4px",
          width: "8px",
        },
      }}
      thumbYProps={{
        style: {
          backgroundColor: "rgba(19, 84, 10, 0.82)",
          borderRadius: "4px",
        },
      }}
    >
      {children}
    </Scrollbar>
  );
}
