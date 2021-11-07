import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import NoSsr from "@mui/material/NoSsr";
import { Button } from "@mui/material";
import Head from "next/head";
import { APPNAME } from "../../libs/constant";
import Modal from "@mui/material/Modal";
import AddCategory from "./AddCategory";
import AddSubCategory from "./AddSubCategory";
import { supabase } from "../../libs/supabaseClient";
import toast from "react-hot-toast";
import Dialog from "@mui/material/Dialog";

import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { Delete } from "@mui/icons-material";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Row(props) {
  const { row } = props;
  const [open, setOpen] = useState(false);

  return (
    <Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell component="th" scope="row">
          <Button variant="text" startIcon={<Delete />}>
            Remove
          </Button>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Sub Category
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Sub Category Name</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row?.sub_category?.map((sub) => (
                    <TableRow key={sub.id}>
                      <TableCell component="th" scope="row">
                        {sub?.id}
                      </TableCell>
                      <TableCell>{sub?.name}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    name: PropTypes.number.isRequired,
    sub_category: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.number.isRequired,
        id: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function Category() {
  const [open, setOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [rows, setRows] = useState([]);
  const handleClickOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    const getCategory = async () => {
      try {
        let { data: category, error } = await supabase.from("category").select(`
  id, created_at, name, sub_category:sub_category_category_id_fkey(id,name,created_at)
`);
        if (error) throw error;
        if (category) {
          setRows(category);
        }
      } catch (error) {
        toast.error(error.message);
      }
    };
    getCategory();
  }, [rows]);

  return (
    <>
      <Head>
        <title>{APPNAME} - Category Listing</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NoSsr>
        <Box
          sx={{ width: "100%", display: "flex", justifyContent: "flex-end" }}
        >
          <div className="mx-3">
            <Button onClick={handleClickOpen} variant="text" color="primary">
              Add Sub-Category
            </Button>
          </div>
          <div className="mx-3">
            <Button
              onClick={handleOpen}
              variant="text"
              color="primary"
              sx={{ mb: 4 }}
            >
              Add Category
            </Button>
          </div>
        </Box>
        <TableContainer component={Paper} sx={{ minWidth: "100%", mt: 4 }}>
          <Table aria-label="collapsible table" sx={{ minWidth: "100%" }}>
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>Category</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows?.map((row) => (
                <Row key={row?.id} row={row} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Add New Category
            </Typography>
            <AddCategory onClick={(e) => handleClose()} />
          </Box>
        </Modal>

        <Dialog
          open={dialogOpen}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleDialogClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>{"Add Sub Category"}</DialogTitle>

          <AddSubCategory onClick={(e) => handleDialogClose()} />
        </Dialog>
      </NoSsr>
    </>
  );
}
