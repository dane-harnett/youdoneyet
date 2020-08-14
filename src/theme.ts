import { createMuiTheme } from "@material-ui/core/styles";

declare module "@material-ui/core/styles/createMuiTheme" {
  interface Theme {
    custom: {
      ListItem: {
        backgroundColor: string;
        completedColor: string;
        inProgressColor: string;
      };
    };
  }
  // allow configuration using `createMuiTheme`
  interface ThemeOptions {
    custom: {
      ListItem: {
        backgroundColor: string;
        completedColor: string;
        inProgressColor: string;
      };
    };
  }
}

export const lightTheme = createMuiTheme({
  palette: {
    type: "light",
  },
  custom: {
    ListItem: {
      backgroundColor: "#e4e4e4",
      completedColor: "#9ad29c",
      inProgressColor: "#72cff8",
    },
  },
});

export const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#3788ac",
    },
  },
  custom: {
    ListItem: {
      backgroundColor: "#424242",
      completedColor: "#5a8b5c",
      inProgressColor: "#3788ac",
    },
  },
});
