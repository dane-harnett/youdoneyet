import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

export const AppHeader = () => (
  <AppBar data-testid="app-header" position="static">
    <Toolbar>
      <Typography variant="h6">You Done Yet</Typography>
    </Toolbar>
  </AppBar>
);

export default AppHeader;
