import React from 'react';
import classNames from "classnames";
import { Outlet } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';

import styles from "assets/jss/material-kit-react/views/componentsSections/basicsStyle";

const useStyles = makeStyles(styles);

const MainLayout = () => {
  const classes = useStyles();

  return (
    <div className={classNames(classes.main, classes.mainRaised)}>
      <Outlet />
    </div>
  );
};

export default MainLayout;