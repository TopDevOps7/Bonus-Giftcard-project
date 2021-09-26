import React from "react";
import classNames from "classnames";
import { Outlet, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import {
  // useTheme,
  makeStyles,
  // useMediaQuery
} from "@material-ui/core";

import Header from "./Header";

import styles from "assets/jss/material-kit-react/views/componentsSections/basicsStyle";

const useStyles = makeStyles(styles);

const DashboardLayout = () => {
  const classes = useStyles();
  const location = useLocation();
  // const theme = useTheme();
  // const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  // const [isMobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div className={classNames(classes.main, classes.mainRaised)}>
      <Header className={classes.container} />
      <div className={classNames(classes.content, location.pathname !== "/" && classes.hiddenContent)}>
        <Outlet />
      </div>
      <ToastContainer />
    </div>
  );
};

export default DashboardLayout;
