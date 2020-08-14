import React, { useContext } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { Box, IconButton } from "@material-ui/core";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import Brightness7Icon from "@material-ui/icons/Brightness7";

import ThemeModeContext from "../../context/ThemeModeContext";

export const AppHeader = () => {
  const { themeMode, setThemeMode } = useContext(ThemeModeContext);

  return (
    <AppBar data-testid="app-header" position="static">
      <Toolbar>
        <Box
          alignItems="center"
          display="flex"
          justifyContent="space-between"
          width="100%"
        >
          <Typography variant="h6">You Done Yet</Typography>
          <IconButton
            data-testid="theme-mode-toggle-button"
            onClick={() =>
              setThemeMode(themeMode === "light" ? "dark" : "light")
            }
          >
            {themeMode === "light" ? (
              <Brightness4Icon htmlColor="#ffffff" />
            ) : (
              <Brightness7Icon htmlColor="#ffffff" />
            )}
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default AppHeader;
