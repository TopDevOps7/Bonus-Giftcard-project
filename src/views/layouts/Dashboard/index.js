import React from "react";
import classNames from "classnames";
import { Outlet, useLocation, useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import {
  // useTheme,
  makeStyles,
  // useMediaQuery
} from "@material-ui/core";

import Header from "./Header";
import Footer from "components/Footer/Footer";

import styles from "assets/jss/material-kit-react/views/componentsSections/basicsStyle";

const useStyles = makeStyles(styles);

const DashboardLayout = () => {
  const classes = useStyles();
  const location = useLocation();
  const { partnerId } = useParams();
  // const theme = useTheme();
  // const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  // const [isMobileNavOpen, setMobileNavOpen] = useState(false);
  let homeUrl = "/";
  if (partnerId) {
    homeUrl += partnerId;
  }

  return (
    <div className={classNames(classes.main, classes.mainRaised)}>
      <Header className={classes.container} />
      <div className={classNames(classes.content, location.pathname !== homeUrl && classes.hiddenContent)}>
        <Outlet />
      </div>
      <ToastContainer />
      <Footer className={classes.container} />
    </div>
  );
};

export default DashboardLayout;
