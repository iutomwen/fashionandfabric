import React from "react";
import { Image } from "@mantine/core";
function ApplicationLogo({ width, height }) {
  return (
    <Image
      src="/assets/fashionandfabric.png"
      alt=""
      width={width ? width : 200}
      height={height ? height : "auto"}
    />
  );
}

export default ApplicationLogo;
