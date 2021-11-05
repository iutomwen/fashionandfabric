import React, { useEffect, useState } from "react";
import { Alert, Button } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import BlockIcon from "@mui/icons-material/Block";
import CardHeader from "@mui/material/CardHeader";
import DeleteIcon from "@mui/icons-material/Delete";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import Moment from "moment";
import { MessageOutlined } from "@mui/icons-material";
import toast from "react-hot-toast";
import { supabase } from "../../libs/supabaseClient";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CloseIcon from "@mui/icons-material/Close";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useRouter } from "next/router";

function Popup({ handleDeleteTrue, handleDeleteFalse, id }) {
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
    handleDeleteFalse();
  };
  return (
    <div className="modal">
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{`Close Account`}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleDeleteTrue} autoFocus>
            Remove
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
function Verified() {
  return (
    <>
      <div className="flex items-center space-x-1">
        <CheckCircleIcon className="text-green-600 fill-current" />
        <div className="text-lg">Verified</div>
      </div>
    </>
  );
}

function UnVerified() {
  return (
    <>
      <div className="flex items-center space-x-1">
        <CloseIcon className="text-red-600 fill-current" />
        <div className="text-lg">Unverified</div>
      </div>
    </>
  );
}
export default function ContactDetails({ user }) {
  const [item, setItem] = useState([]);
  Moment.locale("en");
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
          .from("users")
          .update({ isdeleted: true, updated_at: new Date() })
          .eq("id", popup.id);
        if (data) {
          //get store details
          let { data: users, error } = await supabase
            .from("users")
            .select(
              `
  id,roles,
  store (
    id
  )
`
            )
            .eq("id", popup.id)
            .single();
          if (users.roles == "business") {
            const { data: storeData, storeError } = await supabase
              .from("store")
              .update({ isactive: false, updated_at: new Date() })
              .eq("id", users.store[0].id);
          }
        }
        route.reload(`/app/business`);
        if (error) throw error;
        toast.success("Account Has Been Closed");
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
  async function validateUser(id) {
    try {
      const { data, error } = await supabase
        .from("users")
        .update({ verified: true, updated_at: new Date() })
        .eq("id", id);
      if (error) throw error;
      toast.success("User has been verified.");
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <>
      <TableContainer
        component={Paper}
        sx={{
          width: "100%",
        }}
      >
        <Table sx={{ maxWidth: "98%", whiteSpace: "nowrap" }} size="medium">
          <TableBody>
            <TableRow sx={{ whiteSpace: "nowrap" }}>
              <TableCell colSpan={2} align="left">
                <div className="text-2xl capitalize">Contact Details</div>
              </TableCell>
            </TableRow>
            <TableRow sx={{ whiteSpace: "nowrap" }}>
              <TableCell align="left">First Name</TableCell>
              <TableCell align="left">
                <div className="font-bold capitalize ">{user?.first_name}</div>
              </TableCell>
            </TableRow>
            <TableRow sx={{ whiteSpace: "nowrap" }}>
              <TableCell align="left">Last Name</TableCell>
              <TableCell align="left">
                <div className="font-bold capitalize ">{user?.last_name}</div>
              </TableCell>
            </TableRow>
            <TableRow sx={{ whiteSpace: "nowrap" }}>
              <TableCell align="left">Email</TableCell>
              <TableCell align="left">
                <div className="font-bold capitalize ">{user?.username}</div>
              </TableCell>
            </TableRow>
            <TableRow sx={{ whiteSpace: "nowrap" }}>
              <TableCell align="left">Phone</TableCell>
              <TableCell align="left">
                <div className="font-bold capitalize ">{user?.phone}</div>
              </TableCell>
            </TableRow>
            <TableRow sx={{ whiteSpace: "nowrap" }}>
              <TableCell align="left">Address</TableCell>
              <TableCell align="left">
                <div className="font-bold capitalize ">{user?.address}</div>
              </TableCell>
            </TableRow>
            <TableRow sx={{ whiteSpace: "nowrap" }}>
              <TableCell align="left">City</TableCell>
              <TableCell align="left">
                <div className="font-bold capitalize ">{user?.city}</div>
              </TableCell>
            </TableRow>
            <TableRow sx={{ whiteSpace: "nowrap" }}>
              <TableCell align="left">State</TableCell>
              <TableCell align="left">
                <div className="font-bold capitalize ">{user?.state}</div>
              </TableCell>
            </TableRow>
            <TableRow sx={{ whiteSpace: "nowrap" }}>
              <TableCell align="left">Country</TableCell>
              <TableCell align="left">
                <div className="font-bold capitalize ">{user?.country}</div>
              </TableCell>
            </TableRow>
            <TableRow sx={{ whiteSpace: "nowrap" }}>
              <TableCell align="left">Postcode</TableCell>
              <TableCell align="left">
                <div className="font-bold capitalize ">{user?.postcode}</div>
              </TableCell>
            </TableRow>
            <TableRow sx={{ whiteSpace: "nowrap" }}>
              <TableCell align="left">About User</TableCell>
              <TableCell align="left">
                <div className="font-bold capitalize ">{user?.description}</div>
              </TableCell>
            </TableRow>
            <TableRow sx={{ whiteSpace: "nowrap" }}>
              <TableCell align="left">Verification</TableCell>
              <TableCell align="left">
                <div className="font-bold capitalize ">
                  {user?.verified ? <Verified /> : <UnVerified />}
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ flexGrow: 1, mt: 5 }}>
        <Grid container spacing={2}>
          <Grid item md={8} xs={12}>
            <Card
              raised={true}
              sx={{ maxWidth: "100%", borderRadius: "0.5rem" }}
            >
              <CardHeader
                title="Account Info"
                sx={{
                  borderBottomWidth: "2px",
                  borderStyle: "solid",
                }}
              />
              <CardContent>
                {!user?.verified && (
                  <Button
                    onClick={(e) => validateUser(user?.id)}
                    startIcon={<MessageOutlined />}
                    color="primary"
                    variant="text"
                  >
                    Resend Verification
                  </Button>
                )}
                <Table
                  sx={{ maxWidth: "98%", whiteSpace: "nowrap" }}
                  size="medium"
                >
                  <TableBody>
                    <TableRow sx={{ whiteSpace: "nowrap" }}>
                      <TableCell align="left">Registration Date:</TableCell>
                      <TableCell align="left">
                        <div className="flex items-start font-bold capitalize">
                          {user?.created_at
                            ? Moment(user?.created_at).format("d MMM YYYY")
                            : null}
                        </div>
                      </TableCell>
                    </TableRow>
                    <TableRow sx={{ whiteSpace: "nowrap" }}>
                      <TableCell align="left">Last Update:</TableCell>
                      <TableCell align="left">
                        <div className="font-bold capitalize ">
                          {user?.updated_at
                            ? Moment(user?.updated_at).format("d MMM YYYY")
                            : null}
                        </div>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </Grid>
          <Grid item md={4} xs={12}>
            <Card
              raised={true}
              sx={{ maxWidth: "100%", borderRadius: "0.5rem" }}
            >
              <CardHeader
                title="Data Management"
                sx={{
                  borderBottomWidth: "2px",
                  borderStyle: "solid",
                }}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  <Grid container spacing={1}>
                    <Grid item xs={12}>
                      <Button
                        startIcon={<BlockIcon />}
                        variant="text"
                        onClick={(e) => handleDelete(user?.id)}
                      >
                        Close Account
                      </Button>
                    </Grid>
                    <Grid item xs={12}>
                      <Button startIcon={<FileDownloadIcon />} variant="text">
                        Export Data
                      </Button>
                    </Grid>
                  </Grid>
                </Typography>
                <Typography gutterBottom variant="body2" color="text.secondary">
                  Remove this user's profile if he requested that, if not please
                  be aware that what has been deleted can never brought back
                </Typography>
                <Button variant="text" color="error" startIcon={<DeleteIcon />}>
                  Delete
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
      {popup.show && (
        <Popup
          id={popup.id}
          handleDeleteTrue={handleDeleteTrue}
          handleDeleteFalse={handleDeleteFalse}
        />
      )}
    </>
  );
}
