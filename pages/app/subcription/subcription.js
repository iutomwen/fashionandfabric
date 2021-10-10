import React from "react";

function subcription() {
  return (
    <div>
      {/* <TableContainer component={Paper}>
        {loading && loading ? (
          <LoadingBox />
        ) : (
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>First Name</TableCell>
                <TableCell align="center">Last Name</TableCell>
                <TableCell align="center">Email</TableCell>
                <TableCell align="center">Phone</TableCell>
                <TableCell align="center">Verification(email)</TableCell>
                <TableCell align="center">Options</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {personalAccounts &&
                personalAccounts?.map((row) => (
                  <TableRow
                    key={row?.users?.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row?.users?.first_name}
                    </TableCell>
                    <TableCell align="center">
                      {row?.users?.last_name}
                    </TableCell>
                    <TableCell align="center">{row?.users?.username}</TableCell>
                    <TableCell align="center">{row?.users?.phone}</TableCell>
                    <TableCell align="center">
                      <Badge badgeContent={`verified`} color="success" />
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        style={{ marginLeft: 16 }}
                        onClick={() => {}}
                      >
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        )}
      </TableContainer> */}
    </div>
  );
}

export default subcription;
