import { Input } from "@/components/ui/input";
import React from "react";

export default function SearchCategories() {
  return (
    <Input
      placeholder="search by category, name"
      className=" ring-zinc-300 bg-white dark:bg-inherit focus:dark:ring-zinc-700  focus:ring-zinc-300"
    />
  );
}
