import Image from "next/image";
import React from "react";

export default function RenderIconImage(icon: string, name: string) {
  return (
    <Image
      src={`/images/icons/${icon}.png`}
      width={32}
      height={32}
      alt={name}
    />
  );
}
