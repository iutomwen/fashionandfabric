import React from "react";
import AuthForm from "./components/AuthForm";
import { readUserSession } from "@/utils/actions";
import { redirect } from "next/navigation";

export default async function page() {
  const { user, session } = await readUserSession();

  if (user && session) {
    return redirect("/dashboard");
  }
  return (
    <div className="flex items-center justify-center h-screen w-full ">
      <AuthForm />
    </div>
  );
}
