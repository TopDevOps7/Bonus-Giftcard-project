/* eslint-disable prettier/prettier */
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem.js";
import { useSelector } from "react-redux";
// import CardMedia from "@material-ui/core/CardMedia";
import Banner from "assets/img/starbucks.png";

const useStyles = makeStyles({
  root: {
    maxWidth: "70rem",
    display: "flex",
    justifyContent: "center",
    width: "100%",
  },
  media: {
    height: 320,
    display: "flex",
    justifyContent: "center",
    width: "100%",
  },
  card: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
  },
  container: {
    display: "flex",
    justifyContent: "center",
    marginTop: 20,
  },
});

export default function MediaCard() {
  const classes = useStyles();
  const banners = useSelector(({ home }) => home.banners);

  return (
    <GridContainer className={classes.container}>
      <GridItem xs={12} sm={12} md={12} className={classes.card}>
        <Card className={(classes.root, "cardBanner")}>
          {/* <CardMedia
            className={(classes.media, "bannerHome")}
            image={banners && banners.length > 0 ? banners[0].imageUrl : banners === undefined ? Banner : ""}
          ></CardMedia> */}
          <img
            src={banners && banners.length > 0 ? banners[0].imageUrl : banners === undefined ? Banner : ""}
            className={(classes.media, "bannerHome")}
          />
        </Card>
      </GridItem>
    </GridContainer>
  );
}
