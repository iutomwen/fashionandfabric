import React from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

function Active({ children }) {
  return (
    <>
      <div className="flex items-center space-x-1">
        <CheckCircleIcon className="text-green-600 fill-current" />
        <div className="text-lg">{children}</div>
      </div>
    </>
  );
}

export default Active;
