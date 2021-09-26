/* eslint-disable prettier/prettier */
import React from "react";
// import classNames from "classnames";
// import Carousel from "./Carousel"
// import { IconButton, InputAdornment, makeStyles, OutlinedInput, useMediaQuery, useTheme } from "@material-ui/core";
// import { Search, Tune } from "@material-ui/icons";

import Banner from "./Banner";
import Cards from "./Cards";

// const useStyles = makeStyles(() => ({

// }));

export default function Home() {
  // const theme = useTheme();
  // const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  // const classes = useStyles();

  return (
    <>
      {/* <Carousel /> */}
      <Banner />
      <Cards />
    </>
  );
}
