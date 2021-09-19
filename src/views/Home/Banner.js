/* eslint-disable prettier/prettier */
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem.js";

import Banner from "assets/img/starbucks.png"

const useStyles = makeStyles({
  root: {
    maxWidth: "70rem",
    display: "flex",
    justifyContent: "center",
    width: '100%'
  },
  media: {
    height: 320,
    display: "flex",
    justifyContent: "center",
    width: '100%'
  },
  card: {
    display: "flex",
    justifyContent: "center",
    width: '100%'
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 20
  }
});

export default function MediaCard() {
  const classes = useStyles();

  return (
    <GridContainer className={classes.container}>
      <GridItem xs={12} sm={12} md={12} className={classes.card}>
        <Card className={classes.root, "cardBanner"}>
          <CardMedia
            className={classes.media, "bannerHome"}
            image={Banner}
          // title="Contemplative Reptile"
          />
        </Card>
      </GridItem>
    </GridContainer>

  );
}