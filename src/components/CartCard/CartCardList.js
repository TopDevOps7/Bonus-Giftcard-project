import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { makeStyles, withStyles, Badge } from "@material-ui/core";

const useStyle = makeStyles(() => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "start",
    margin: "20px 0",
  },
  cardImage: {
    width: 115,

    "& img": {
      width: 106,
      height: 71,
      borderRadius: 5,
    },
  },
  cardInfo: {
    flex: 1,
  },
  title: {
    fontSize: 15,
    fontWeight: 500,
    margin: 0,
  },
  subTitle: {
    fontSize: 14,
    fontWeight: 400,
    margin: 0,
  },
  DescTitle: {
    fontSize: 12,
  },
  cardPrice: {
    width: 65,
    textAlign: "right",
    marginRight: 5,
  },
}));

const StyledBadge = withStyles((theme) => ({
  badge: {
    left: 0,
    top: 0,
    backgroundColor: "#fff",
    boxShadow: theme.shadows[4],
  },
}))(Badge);

const CartCardList = ({ item }) => {
  const classes = useStyle();
  const [cardNum, setCardNum] = useState(0);
  const cardsDesign = useSelector(({ home }) => home.cardsDesign);

  useEffect(() => {
    cardsDesign &&
      cardsDesign.length != 0 &&
      cardsDesign.map((card, ind) => {
        card.name == item.cardsDesign.name && setCardNum(ind);
      });
  }, [cardsDesign]);

  return (
    <div className={classes.root}>
      <div className={classes.cardImage}>
        <StyledBadge
          badgeContent={1}
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          <img src={cardsDesign && cardsDesign.length != 0 && cardsDesign[cardNum].path} />
        </StyledBadge>
      </div>
      <div className={classes.cardInfo}>
        <p className={classes.title}>Tarjeta de regalo</p>
        <p className={classes.subTitle}>{item.giftcard.name}</p>
        {item.isGift && <p className={classes.descTitle}>Para: {item.toName}</p>}
      </div>
      <div className={classes.cardPrice}>
        <h5>${item.amount / 100}</h5>
      </div>
    </div>
  );
};

CartCardList.propTypes = {
  item: PropTypes.object,
};

export default CartCardList;
