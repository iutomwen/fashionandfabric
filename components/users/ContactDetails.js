import * as React from "react";
import { Button } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import BlockIcon from "@mui/icons-material/Block";
import CardHeader from "@mui/material/CardHeader";
import DeleteIcon from "@mui/icons-material/Delete";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { MessageCircle } from "react-feather";
const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
export default function ContactDetails({ user }) {
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
                <div className="capitalize font-bold ">{user?.first_name}</div>
              </TableCell>
            </TableRow>
            <TableRow sx={{ whiteSpace: "nowrap" }}>
              <TableCell align="left">Last Name</TableCell>
              <TableCell align="left">
                <div className="capitalize font-bold ">{user?.last_name}</div>
              </TableCell>
            </TableRow>
            <TableRow sx={{ whiteSpace: "nowrap" }}>
              <TableCell align="left">Email</TableCell>
              <TableCell align="left">
                <div className="capitalize font-bold ">{user?.username}</div>
              </TableCell>
            </TableRow>
            <TableRow sx={{ whiteSpace: "nowrap" }}>
              <TableCell align="left">Phone</TableCell>
              <TableCell align="left">
                <div className="capitalize font-bold ">{user?.phone}</div>
              </TableCell>
            </TableRow>
            <TableRow sx={{ whiteSpace: "nowrap" }}>
              <TableCell align="left">Address</TableCell>
              <TableCell align="left">
                <div className="capitalize font-bold ">{user?.address}</div>
              </TableCell>
            </TableRow>
            <TableRow sx={{ whiteSpace: "nowrap" }}>
              <TableCell align="left">City</TableCell>
              <TableCell align="left">
                <div className="capitalize font-bold ">{user?.city}</div>
              </TableCell>
            </TableRow>
            <TableRow sx={{ whiteSpace: "nowrap" }}>
              <TableCell align="left">State</TableCell>
              <TableCell align="left">
                <div className="capitalize font-bold ">{user?.state}</div>
              </TableCell>
            </TableRow>
            <TableRow sx={{ whiteSpace: "nowrap" }}>
              <TableCell align="left">Country</TableCell>
              <TableCell align="left">
                <div className="capitalize font-bold ">{user?.country}</div>
              </TableCell>
            </TableRow>
            <TableRow sx={{ whiteSpace: "nowrap" }}>
              <TableCell align="left">Postcode</TableCell>
              <TableCell align="left">
                <div className="capitalize font-bold ">{user?.postcode}</div>
              </TableCell>
            </TableRow>
            <TableRow sx={{ whiteSpace: "nowrap" }}>
              <TableCell align="left">About User</TableCell>
              <TableCell align="left">
                <div className="capitalize font-bold ">{user?.description}</div>
              </TableCell>
            </TableRow>
            <TableRow sx={{ whiteSpace: "nowrap" }}>
              <TableCell align="left">Verification</TableCell>
              <TableCell align="left">
                <div className="capitalize font-bold ">
                  {user?.verified ? "Verified" : "unverified"}
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
                  <Button startIcon={<MessageCircle />} color="primary" variant="contained">
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
                        <div className="capitalize font-bold ">
                          {user?.updated_at}
                        </div>
                      </TableCell>
                    </TableRow>
                    <TableRow sx={{ whiteSpace: "nowrap" }}>
                      <TableCell align="left">Last Update:</TableCell>
                      <TableCell align="left">
                        <div className="capitalize font-bold ">
                          {user?.updated_at}
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
                  <Button startIcon={<BlockIcon />} variant="text">
                    Close Account
                  </Button>
                  <Button startIcon={<FileDownloadIcon />} variant="text">
                    Export Data
                  </Button>
                </Typography>
                <Typography gutterBottom variant="body2" color="text.secondary">
                  Remove this user's profile if he requested that, if not please
                  be aware that what has been deleted can never brought back
                </Typography>
                <Button
                  variant="outlined"
                  color="error"
                  startIcon={<DeleteIcon />}
                >
                  Delete
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
