import AppLayout from "@/components/Auth/AppLayout";
import withAuth from "@/components/Auth/withAuth";
import React from "react";

function BusinessUsers() {
  return (
    <AppLayout>
      <h1>Business Users</h1>
    </AppLayout>
  );
}

export default withAuth(BusinessUsers);
