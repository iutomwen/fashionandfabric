import React from "react";
import Image from "next/image";
function ApplicationLogo({ width, height }) {
  return (
    <Image
      src="/assets/images/fashionandfabric.png"
      alt=""
      width={width ? width : 200}
      height={height ? height : 180}
    />
  );
}

export default ApplicationLogo;
