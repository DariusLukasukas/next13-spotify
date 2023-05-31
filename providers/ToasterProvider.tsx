"use client";

import React from "react";
import { Toaster } from "react-hot-toast";

export default function ToasterProvider() {
  return (
    <Toaster
      toastOptions={{
        style: {
          backgroundColor: "#333",
          color: "#fff",
        },
      }}
    />
  );
}
