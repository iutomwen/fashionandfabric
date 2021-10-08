import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";

export default function LoadingBox() {
  return (
    <div className="flex flex-col h-screen w-full items-center justify-items-center justify-center">
      <CircularProgress size={60} disableShrink />
    </div>
  );
}
