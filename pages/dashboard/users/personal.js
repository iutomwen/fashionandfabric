import AppLayout from "@/components/Auth/AppLayout";
import withAuth from "@/components/Auth/withAuth";
import React from "react";

function PersonalUsers() {
  return (
    <AppLayout>
      <h1>Personal Users</h1>
    </AppLayout>
  );
}

export default withAuth(PersonalUsers);
