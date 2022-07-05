import React from "react";
import { Loader } from "@mantine/core";
function LoadingBox({ color = "teal", text = "Loading..." }) {
  return (
    <div className="text-center flex flex-col h-screen items-center justify-center">
      <Loader size="xl" variant="dots" color={color} />
      {text && <div className="text-center">{text}</div>}
    </div>
  );
}

export default LoadingBox;
