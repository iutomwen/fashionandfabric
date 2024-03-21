import { Input } from "@/components/ui/input";
import React from "react";

export default function SearchProduct() {
  return (
    <Input
      placeholder="search by product, name"
      className=" ring-zinc-300 bg-white dark:bg-inherit focus:dark:ring-zinc-700  focus:ring-zinc-300 w-1/2"
    />
  );
}
