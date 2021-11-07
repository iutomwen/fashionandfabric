import React from "react";
import CloseIcon from "@mui/icons-material/Close";

function InActive({ children }) {
  return (
    <>
      <div className="flex items-center space-x-1">
        <CloseIcon className="text-red-600 fill-current" />
        <div className="text-lg">{children}</div>
      </div>
    </>
  );
}

export default InActive;
