import AppLayout from "@/components/Auth/AppLayout";
import withAuth from "@/components/Auth/withAuth";
import React from "react";

function DeleteRequest() {
  return (
    <AppLayout>
      <h1>DeleteRequest</h1>
    </AppLayout>
  );
}

export default withAuth(DeleteRequest);
