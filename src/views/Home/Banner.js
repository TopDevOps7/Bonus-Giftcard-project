/* eslint-disable prettier/prettier */
import React from "react";
// import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem.js";
import { useSelector } from "react-redux";
import Banner from "assets/img/preview.jpg";
import Slider from "react-slick";

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
    borderRadius: "5px",
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

  setTimeout(function () {
    document.getElementById("card") && document.getElementById("card").classList.remove("MuiPaper-elevation1");
    document.getElementById("card") && document.getElementById("card").classList.remove("MuiPaper-rounded");
  }, 100);

  const settings = {
    autoplay: true,
    autoplaySpeed: 5000,
    dots: true,
  };

  return (
    <GridContainer className={classes.container}>
      <GridItem xs={12} sm={12} md={12} className={classes.card}>
        <Card className={(classes.root, "cardBanner")} id="card">
          <Slider {...settings}>
            {banners && banners.length != 0 ? (
              banners.map((img, ind) => (
                <img className={(classes.media, "bannerHome")} src={img.imageUrl} key={ind} draggable={false} />
              ))
            ) : (
              <img src={Banner} className={(classes.media, "bannerHome")} />
            )}
          </Slider>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
