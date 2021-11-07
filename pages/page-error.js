import React from "react";
import Head from "next/head";
import { APPNAME } from "../libs/constant";
import { Box, Container, Typography } from "@mui/material";

function Error({ statusCode }) {
  return (
    <>
      <Head>
        <title>
          Error: {statusCode} - {APPNAME}
        </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box
        sx={{
          backgroundColor: "background.default",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          justifyContent: "center",
        }}
      >
        <Container maxWidth="md" className="mt-24">
          <Typography align="center" color="textPrimary" variant="h4">
            {statusCode
              ? `An error ${statusCode} occurred on server`
              : "An error occurred on client"}
          </Typography>
          <Typography align="center" color="textPrimary" variant="subtitle2">
            You either tried some shady route or you came here by mistake.
            Whichever it is, try using the navigation
          </Typography>
          <Box sx={{ textAlign: "center" }}>
            <img
              alt="Under development"
              src="/assets/images/undraw_page_not_found_su7k.svg"
              style={{
                marginTop: 50,
                display: "inline-block",
                maxWidth: "100%",
                width: 560,
              }}
            />
          </Box>
        </Container>
      </Box>
    </>
  );
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
