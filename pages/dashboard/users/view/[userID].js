import AppLayout from "@/components/Auth/AppLayout";
import withAuth from "@/components/Auth/withAuth";
import React from "react";

function ViewUserID() {
  return (
    <AppLayout>
      <h1>ViewUserID</h1>
    </AppLayout>
  );
}

export default withAuth(ViewUserID);
