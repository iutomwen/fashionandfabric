import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingBox from "./LoadingBox";
import { getAllPersonal } from "../../features/personal/personalSlice";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Badge, Button, CardHeader, Divider } from "@mui/material";

export default function LatestUsers() {
  const [rows, setRows] = useState({});
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const { personError, personPending, personalAccounts } = useSelector(
    (state) => state.personal
  );
  useEffect(() => {
    // setLoading(true);
    dispatch(getAllPersonal());
    // if (!personPending) {
    //   setRows(personalAccounts);
    //   setLoading(false);
    // }

    // return () => dispatch(getAllPersonal());
  }, []);
  console.log("redux", personalAccounts);
  console.log("pending", personPending);
  return (
    <div style={{ maxWidth: "100%" }}>
      {personPending && "loaii"}
      <CardHeader title="Latest Users" />
      <Divider className="mb-4" />
      {!personPending &&
        personalAccounts.map((data, i) => <p key={i}>{data.users.id}</p>)}
    </div>
  );
}
