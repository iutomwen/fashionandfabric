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
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { MessageCircle } from "react-feather";
import Moment from "moment";
import toast from "react-hot-toast";
import { supabase } from "../../libs/supabaseClient";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CloseIcon from "@mui/icons-material/Close";
import { useRouter } from "next/router";
const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
function Active() {
  return (
    <>
      <div className="flex items-center space-x-1">
        <CheckCircleIcon className="text-green-600 fill-current" />
        <div className="text-lg">Active</div>
      </div>
    </>
  );
}

function InActive() {
  return (
    <>
      <div className="flex items-center space-x-1">
        <CloseIcon className="text-red-600 fill-current" />
        <div className="text-lg">InActive</div>
      </div>
    </>
  );
}

export default function StoreDetails({ store, userID }) {
  Moment.locale("en");
  const [storeDetails, setStoreDetails] = React.useState({});
  React.useEffect(() => {
    setStoreDetails(store);
  }, [store]);
  const route = useRouter();
  async function deactivateStore(id) {
    try {
      const { data: updatedata, updateError } = await supabase
        .from("store")
        .update({ isactive: false, updated_at: new Date() })
        .eq("id", id);
      setStoreDetails({ ...storeDetails, isactive: false });
      if (updateError) throw updateError;
      toast.success("This Store has been deactivated.");
      route.replace(`/app/business/${userID}`, undefined, { shallow: true });
    } catch (error) {
      toast.error(error.message);
    }
  }
  async function activateStore(id) {
    try {
      //check if store owner is active
      let { data: user, error } = await supabase
        .from("users")
        .select("verified, isdeleted")
        .eq("id", userID)
        .single();
      if (user.isdeleted === true || user.verified === false) {
        toast.error(
          "The owner of this store is not active or has been deleted. we cant proceed with this request"
        );
      } else {
        const { data: updatedata, updateError } = await supabase
          .from("store")
          .update({ isactive: true, updated_at: new Date() })
          .eq("id", id);
        setStoreDetails({ ...storeDetails, isactive: true });

        if (updateError) throw updateError;
        toast.success("This Store is now Active.");
        route.push(`/app/business/${userID}`, undefined, { shallow: true });
      }
    } catch (updateError) {
      toast.error(updateError.message);
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
                <div className="text-2xl capitalize">Store Details</div>
              </TableCell>
            </TableRow>
            <TableRow sx={{ whiteSpace: "nowrap" }}>
              <TableCell align="left">Store Name</TableCell>
              <TableCell align="left">
                <div className="font-bold capitalize ">
                  {storeDetails?.name}
                </div>
              </TableCell>
            </TableRow>
            <TableRow sx={{ whiteSpace: "nowrap" }}>
              <TableCell align="left">Store Description</TableCell>
              <TableCell align="left">
                <div className="font-bold capitalize ">
                  {storeDetails?.description}
                </div>
              </TableCell>
            </TableRow>
            <TableRow sx={{ whiteSpace: "nowrap" }}>
              <TableCell align="left">Business Registration Number</TableCell>
              <TableCell align="left">
                <div className="font-bold capitalize ">
                  {storeDetails?.businessreg}
                </div>
              </TableCell>
            </TableRow>
            <TableRow sx={{ whiteSpace: "nowrap" }}>
              <TableCell align="left">Subcription</TableCell>
              <TableCell align="left">
                <div className="font-bold capitalize ">
                  {storeDetails?.subcriptions?.package}
                </div>
              </TableCell>
            </TableRow>
            <TableRow sx={{ whiteSpace: "nowrap" }}>
              <TableCell align="left">Address</TableCell>
              <TableCell align="left">
                <div className="font-bold capitalize ">
                  {storeDetails?.address}
                </div>
              </TableCell>
            </TableRow>
            <TableRow sx={{ whiteSpace: "nowrap" }}>
              <TableCell align="left">City</TableCell>
              <TableCell align="left">
                <div className="font-bold capitalize ">
                  {storeDetails?.city}
                </div>
              </TableCell>
            </TableRow>
            <TableRow sx={{ whiteSpace: "nowrap" }}>
              <TableCell align="left">State</TableCell>
              <TableCell align="left">
                <div className="font-bold capitalize ">
                  {storeDetails?.state}
                </div>
              </TableCell>
            </TableRow>
            <TableRow sx={{ whiteSpace: "nowrap" }}>
              <TableCell align="left">Country</TableCell>
              <TableCell align="left">
                <div className="font-bold capitalize ">
                  {storeDetails?.country}
                </div>
              </TableCell>
            </TableRow>
            <TableRow sx={{ whiteSpace: "nowrap" }}>
              <TableCell align="left">Postcode</TableCell>
              <TableCell align="left">
                <div className="font-bold capitalize ">
                  {storeDetails?.postcode}
                </div>
              </TableCell>
            </TableRow>

            <TableRow sx={{ whiteSpace: "nowrap" }}>
              <TableCell align="left">Verification</TableCell>
              <TableCell align="left">
                <div className="font-bold capitalize ">
                  {storeDetails?.isactive ? <Active /> : <InActive />}
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
                title="Store Info"
                sx={{
                  borderBottomWidth: "2px",
                  borderStyle: "solid",
                }}
              />
              <CardContent>
                {!storeDetails?.isactive && (
                  <Button
                    onClick={(e) => activateStore(storeDetails?.id)}
                    startIcon={<MessageCircle />}
                    variant="text"
                  >
                    Activate Store
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
                        <div className="font-bold capitalize ">
                          {storeDetails?.created_at
                            ? Moment(storeDetails?.created_at).format(
                                "d MMM YYYY"
                              )
                            : null}
                        </div>
                      </TableCell>
                    </TableRow>
                    <TableRow sx={{ whiteSpace: "nowrap" }}>
                      <TableCell align="left">Last Update:</TableCell>
                      <TableCell align="left">
                        <div className="font-bold capitalize ">
                          {storeDetails?.updated_at
                            ? Moment(storeDetails?.updated_at).format(
                                "d MMM YYYY"
                              )
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
                      {storeDetails?.isactive && (
                        <Button
                          onClick={(e) => deactivateStore(storeDetails?.id)}
                          startIcon={<BlockIcon />}
                          variant="text"
                        >
                          Deactivate Store
                        </Button>
                      )}
                    </Grid>
                    <Grid item xs={12}>
                      <Button startIcon={<FileDownloadIcon />} variant="text">
                        Export Store Data
                      </Button>
                    </Grid>
                  </Grid>
                </Typography>
                {storeDetails?.isactive && (
                  <Typography
                    gutterBottom
                    variant="body2"
                    color="text.secondary"
                  >
                    Disable this user's store if he requested that, if not
                    please be aware that all products under this store will be
                    removed from the app.
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
