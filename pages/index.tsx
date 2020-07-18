import React from "react";
import dynamic from "next/dynamic";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

export const IndexPage = () => (
  <div data-testid="day-screen">
    <AppBar data-testid="app-header" position="static">
      <Toolbar>
        <Typography variant="h6">You Done Yet</Typography>
      </Toolbar>
    </AppBar>
  </div>
);

export default dynamic(() => Promise.resolve(IndexPage), {
  ssr: false,
});
