import React, { useContext, useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Button, Box } from "@mui/material";
import NoSsr from "@mui/material/NoSsr";
import toast from "react-hot-toast";
import { supabase } from "../../libs/supabaseClient";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useRouter } from "next/router";
import { DeleteOutline } from "@mui/icons-material";
import { Store } from "../../utils/Store";
import NumberFormat from "react-number-format";
import PopUpDelete from "../common/PopUpDelete";

export default function SubcriptionList() {
  const { state, dispatch } = useContext(Store);
  let { appSettings, appSubcriptions } = state;
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState([]);
  const route = useRouter();
  const [popup, setPopup] = useState({
    show: false, // initial values set to false and null
    id: null,
  });

  const handleDelete = (id) => {
    setPopup({
      show: true,
      id,
    });
  };

  const handleDeleteTrue = async () => {
    if (popup.show && popup.id) {
      try {
        const { data, error } = await supabase
          .from("subcriptions")
          .delete()
          .eq("id", popup.id);
        if (error) throw error;
        toast.success("Subcription Removed Successfully");
      } catch (error) {
        toast.error(error.message);
      }

      setPopup({
        show: false,
        id: null,
      });
    }
  };

  // This will just hide the Confirmation Box when user clicks "No"/"Cancel"

  const handleDeleteFalse = () => {
    setPopup({
      show: false,
      id: null,
    });
  };

  useEffect(() => {
    let isCanelled = false;
    if (!isCanelled) {
      setRows(appSubcriptions);
    }
    return () => {
      isCanelled = true;
    };
  }, [appSubcriptions]);
  return (
    <NoSsr>
      <Table sx={{ minWidth: "95%" }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell width={5}>ID</TableCell>
            <TableCell width={40}>Package Name</TableCell>
            <TableCell width={10}>Price</TableCell>
            <TableCell width={15}>Product Limit Allowed</TableCell>
            <TableCell width={15}>Time Frame Allowed</TableCell>
            <TableCell width={10}>Options</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell>{row.package}</TableCell>
              <TableCell>
                <NumberFormat
                  value={row.price}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={appSettings?.currency}
                />
              </TableCell>
              <TableCell>{row.productlimit} </TableCell>
              <TableCell>{row.timeframe} Days</TableCell>
              <TableCell>
                <Box
                  sx={{
                    width: "60%",
                    display: "flex",
                    justifyContent: "space-evenly",
                  }}
                >
                  <div className="mr-6">
                    <Button
                      onClick={() => {
                        route.push(`/app/subcriptions/${row.id}`);
                      }}
                      variant="outlined"
                      color="primary"
                      sx={{ mx: 4 }}
                    >
                      Edit
                    </Button>
                  </div>
                  <Button
                    endIcon={<DeleteOutline />}
                    onClick={(e) => handleDelete(row.id)}
                    variant="text"
                    color="primary"
                  >
                    Remove
                  </Button>
                  {popup.show && (
                    <PopUpDelete
                      id={popup.id}
                      text={`Remove Subcription`}
                      handleDeleteTrue={handleDeleteTrue}
                      handleDeleteFalse={handleDeleteFalse}
                    />
                  )}
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </NoSsr>
  );
}
