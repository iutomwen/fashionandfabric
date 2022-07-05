import { LoginPage } from "@/components/Auth/LoginPage";
import withGuest from "@/components/Auth/withGuest";
import React from "react";
import { LoadingOverlay } from "@mantine/core";
import { useSelector } from "react-redux";
function Login() {
  const { account } = useSelector((state) => state.account);
  const [visible, setVisible] = React.useState(true);
  React.useEffect(() => {
    if (Object.keys(account).length === 0) {
      setVisible(false);
    }
  }, [account]);
  return (
    <div className="flex flex-col items-center justify-center my-20 relative">
      <LoadingOverlay visible={visible} />
      <LoginPage />
    </div>
  );
}

export default withGuest(Login);
