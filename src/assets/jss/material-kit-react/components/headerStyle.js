import {
  // container,
  defaultFont,
  primaryColor,
  infoColor,
  successColor,
  warningColor,
  dangerColor,
  roseColor,
  transition,
  boxShadow,
  drawerWidth,
} from "assets/jss/material-kit-react";

const headerStyle = (theme) => ({
  appBar: {
    display: "flex",
    border: "0",
    borderRadius: "3px",
    padding: "20px 0 15px",
    color: "#555",
    width: "100%",
    backgroundColor: "#fff",
    boxShadow: "0 4px 18px 0px rgba(0, 0, 0, 0.12), 0 7px 10px -5px rgba(0, 0, 0, 0.15)",
    transition: "all 150ms ease 0s",
    alignItems: "center",
    flexFlow: "row nowrap",
    justifyContent: "flex-start",
    position: "relative",
    zIndex: "unset",
    [theme.breakpoints.down("sm")]: {
      padding: 0,
      height: 130,
      // boxShadow: "none",
    },
  },
  hiddenAppBar: {
    // height:
    [theme.breakpoints.down("sm")]: {
      padding: 0,
      height: 82,
      // boxShadow: "none",
    },
  },
  mobileVersion: {
    height: 56,
    width: "100%",
    [theme.breakpoints.down("sm")]: {
      // height: 56,
    },
  },
  // hiddenMobileVersion: {},
  mobileSearch: {
    margin: "10px auto 0",
    padding: "0 15px",
  },
  mobileSearchbar: {
    width: "118%",
    marginLeft: -25,
    [theme.breakpoints.down("800")]: {
      width: "119%",
    },
    [theme.breakpoints.down("700")]: {
      width: "120%",
    },
    [theme.breakpoints.down("600")]: {
      width: "121%",
    },
    [theme.breakpoints.down("500")]: {
      width: "123%",
    },
    [theme.breakpoints.down("450")]: {
      width: "125%",
    },
    [theme.breakpoints.down("400")]: {
      width: "127%",
    },
    [theme.breakpoints.down("375")]: {
      width: "128%",
    },
    [theme.breakpoints.down("350")]: {
      width: "129%",
    },
    [theme.breakpoints.down("325")]: {
      width: "130%",
    },
    [theme.breakpoints.down("300")]: {
      width: "131%",
    },
  },
  searchWithFilterBtn: {
    width: "100%",
    borderRadius: 10,
    // width: "80%",
    height: 46,
    "& input": {
      padding: "14px 14px 14px 0",
    },
  },
  absolute: {
    position: "absolute",
    zIndex: "1100",
  },
  fixed: {
    position: "fixed",
    zIndex: "1100",
  },
  container: {
    // ...container,
    minHeight: "50px",
    flex: "1",
    padding: "10px",
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    flexWrap: "nowrap",
    [theme.breakpoints.down("sm")]: {
      flexWrap: "wrap",
    },
  },
  flex: {
    flex: 1,
  },
  logo: {
    position: "absolute",
    zIndex: 1,
    left: 0,
    top: 5,
    width: 100,
    [theme.breakpoints.down("sm")]: {
      width: 80,
      top: 10,
    },
  },
  title: {
    ...defaultFont,
    lineHeight: "30px",
    fontSize: "18px",
    borderRadius: "3px",
    textTransform: "none",
    color: "inherit",
    padding: "8px 16px",
    letterSpacing: "unset",
    "&:hover,&:focus": {
      color: "inherit",
      background: "transparent",
    },
  },
  appResponsive: {
    margin: "20px 10px",
  },
  primary: {
    backgroundColor: primaryColor,
    color: "#FFFFFF",
    boxShadow: "0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 12px -5px rgba(156, 39, 176, 0.46)",
  },
  info: {
    backgroundColor: infoColor,
    color: "#FFFFFF",
    boxShadow: "0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 12px -5px rgba(0, 188, 212, 0.46)",
  },
  success: {
    backgroundColor: successColor,
    color: "#FFFFFF",
    boxShadow: "0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 12px -5px rgba(76, 175, 80, 0.46)",
  },
  warning: {
    backgroundColor: warningColor,
    color: "#FFFFFF",
    boxShadow: "0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 12px -5px rgba(255, 152, 0, 0.46)",
  },
  danger: {
    backgroundColor: dangerColor,
    color: "#FFFFFF",
    boxShadow: "0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 12px -5px rgba(244, 67, 54, 0.46)",
  },
  rose: {
    backgroundColor: roseColor,
    color: "#FFFFFF",
    boxShadow: "0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 12px -5px rgba(233, 30, 99, 0.46)",
  },
  transparent: {
    backgroundColor: "transparent !important",
    boxShadow: "none",
    paddingTop: "25px",
    color: "#FFFFFF",
  },
  dark: {
    color: "#FFFFFF",
    backgroundColor: "#212121 !important",
    boxShadow: "0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 12px -5px rgba(33, 33, 33, 0.46)",
  },
  white: {
    border: "0",
    padding: "20px 0 15px",
    height: "auto",
    marginBottom: "20px",
    color: "#555",
    backgroundColor: "#fff !important",
    boxShadow: "0 4px 18px 0px rgba(0, 0, 0, 0.12), 0 7px 10px -5px rgba(0, 0, 0, 0.15)",
    [theme.breakpoints.down("sm")]: {
      padding: 0,
      // boxShadow: "none",
    },
  },
  drawerPaper: {
    border: "none",
    bottom: "0",
    transitionProperty: "top, bottom, width",
    transitionDuration: ".2s, .2s, .35s",
    transitionTimingFunction: "linear, linear, ease",
    width: drawerWidth,
    ...boxShadow,
    position: "fixed",
    display: "block",
    top: "0",
    height: "100vh",
    right: "0",
    left: "auto",
    visibility: "visible",
    overflowY: "visible",
    borderTop: "none",
    textAlign: "left",
    paddingRight: "0px",
    paddingLeft: "0",
    ...transition,
  },
});

export default headerStyle;
