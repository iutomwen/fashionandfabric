import React from "react";

function CustomBadge({ text, className }) {
  return (
    <div
      className={`${className} text-xs rounded py-1 text-white capitalize  cursor-pointer shadow-2xl px-2`}
    >
      {text}
    </div>
  );
}

export default CustomBadge;
