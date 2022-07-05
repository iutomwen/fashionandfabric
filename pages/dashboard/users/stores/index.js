import AppLayout from "@/components/Auth/AppLayout";
import withAuth from "@/components/Auth/withAuth";
import React from "react";

function StoresIndex() {
  return (
    <AppLayout>
      <div>Stores Index</div>
    </AppLayout>
  );
}

export default withAuth(StoresIndex);
