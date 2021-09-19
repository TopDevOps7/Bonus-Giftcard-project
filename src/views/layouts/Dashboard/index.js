import React from "react";
import classNames from "classnames";
import { Outlet } from "react-router-dom";
import { useTheme, makeStyles, useMediaQuery } from "@material-ui/core";

import Header from "./Header";

import styles from "assets/jss/material-kit-react/views/componentsSections/basicsStyle";

const useStyles = makeStyles(styles);

const DashboardLayout = () => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  // const [isMobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div className={classNames(classes.main, classes.mainRaised)}>
      {!isMobile && <Header className={classes.container} />}
      <div className={classes.content}>
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
