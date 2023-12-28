import React from "react";
import { Grid } from "@mui/material";

function Center({children}) {
  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: '100vh' }}
    >
      <Grid item xs={1}>
        {children}
      </Grid>
    </Grid>
  );
}

export default Center;
