import withAuth from "@/components/Auth/withAuth";
import React from "react";
import UserOverview from "./overview";

function UserIndex() {
  return <UserOverview />;
}

export default withAuth(UserIndex);
