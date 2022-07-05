import React from "react";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";

function MessageBox({ types, children }) {
  return (
    <Stack sx={{ width: "100%" }} spacing={2}>
      <Alert severity={types}>
        <AlertTitle>
          <p className="uppercase">{types}</p>
        </AlertTitle>
        {children}
      </Alert>
    </Stack>
  );
}

export default MessageBox;
