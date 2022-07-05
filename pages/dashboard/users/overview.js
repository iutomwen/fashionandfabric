import AppLayout from "@/components/Auth/AppLayout";
import withAuth from "@/components/Auth/withAuth";
import React from "react";

function UserOverview() {
  return (
    <AppLayout>
      <h1>User Overview</h1>
    </AppLayout>
  );
}

export default withAuth(UserOverview);
