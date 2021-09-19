import React from 'react'
import PropTypes from "prop-types";

import { makeStyles, withStyles, Badge } from '@material-ui/core';

const useStyle = makeStyles(() => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "start",
    margin: "20px 0"
  },
  cardImage: {
    width: 115,

    "& img": {
      width: 106,
      height: 71,
      borderRadius: 5,
    }
  },
  cardInfo: {
    flex: 1,
  },
  title: {
    fontSize: 15,
    fontWeight: 500,
    margin: 0
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
    width: 65
  },
}));

const StyledBadge = withStyles((theme) => ({
  badge: {
    left: 0,
    top: 0,
    backgroundColor: '#fff',
    boxShadow: theme.shadows[4],
  },
}))(Badge);

const CartCardList = ({ item }) => {
  const classes = useStyle();
  console.log(item);
  return (
    <div className={classes.root}>
      <div className={classes.cardImage}>
        <StyledBadge
          badgeContent={item.amount}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
        >
          <img src={item.image} />
        </StyledBadge>
      </div>
      <div className={classes.cardInfo}>
        <p className={classes.title}>Tarjeta de regalo</p>
        <p className={classes.subTitle}>{item.nameGift}</p>
        {item.friendGift && <>
          {item.para && <p className={classes.descTitle}>Para: {item.para}</p>}
        </>}
      </div>
      <div className={classes.cardPrice}>
        <h5>${item.monto}</h5>
      </div>
    </div>
  )
}

CartCardList.propTypes = {
  item: PropTypes.object,
};

export default CartCardList;
