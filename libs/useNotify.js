import React from "react";
import { Toaster } from "react-hot-toast";

export default function ToastNotify() {
  return (
    <Toaster
      toastOptions={{
        // Define default options
        className: "bg-blue-300",
        duration: 5000,
        style: {
          background: "#ffffff",
          color: "#000",
          border: "blue solid",
          borderWidth: "1px",
        },
        success: {
          style: {
            background: "white",
            color: "#000",
            border: "green solid",
            borderWidth: "1px",
          },
        },
        custom: {
          style: {
            background: "blue",
          },
        },
        error: {
          style: {
            background: "#ffffff",
            // "#FC8181",
            color: "#000",
            border: "#FC8181 solid",
            borderWidth: "1px",
          },
        },
      }}
    />
  );
}
