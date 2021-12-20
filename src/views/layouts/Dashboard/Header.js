import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

import { Badge, withStyles, makeStyles } from "@material-ui/core";
import GridItem from "components/Grid/GridItem";
import GridContainer from "components/Grid/GridContainer";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
// import AccountCircleIcon from "@material-ui/icons/AccountCircle";

import HeaderComponent from "components/Header/Header";
import Button from "components/CustomButtons/Button";

import { filterByNameAndDescription } from "redux/actions/home";

const StyledBadge = withStyles((theme) => ({
  badge: {
    right: 15,
    top: 15,
    [theme.breakpoints.down("sm")]: {
      minWidth: 16,
      width: 16,
      fontSize: 12,
      height: 16,
    },
  },
}))(Badge);

const useStyle = makeStyles((theme) => ({
  button: {
    "& svg": {
      width: 23,
      height: 23,
      [theme.breakpoints.down("sm")]: {
        width: 20,
        height: 20,
      },
    },
  },
}));

const Header = () => {
  const classes = useStyle();
  const dispatch = useDispatch();
  const { partnerId, userId, uuid } = useParams();

  let orders = useSelector((state) => state.home.data[partnerId ?? "noPartner"]?.orders);
  orders = orders ?? [];
  const [filterString, setFilterString] = useState("");

  const handleChangeFilterString = (e) => {
    setFilterString(e.target.value);
  };

  const handleEnter = (e) => {
    if (e.keyCode == 13) {
      dispatch(filterByNameAndDescription(filterString));
    }
  };

  let cartUrl = "/cart";
  if (partnerId) {
    cartUrl = `/${partnerId}/cart`;
  }

  return (
    <>
      <HeaderComponent
        onClickSearch={() => dispatch(filterByNameAndDescription(filterString))}
        onChangeSearch={handleChangeFilterString}
        onEnter={handleEnter}
        rightLinks={
          <GridContainer>
            {location.pathname != `/${partnerId}/email/${userId}/${uuid}` && (
              <GridItem xs={2} sm={2} md={5} style={{ display: "flex", padding: 0 }}>
                <StyledBadge badgeContent={orders.length} color="secondary">
                  <Link to={cartUrl}>
                    <Button
                      className={classes.button}
                      justIcon
                      color="transparent"
                      style={{ marginRight: 10 }}
                      onClick={() => sessionStorage.setItem("session", "cart")}
                    >
                      <ShoppingCartIcon style={{ color: "#000" }} />
                    </Button>
                  </Link>
                </StyledBadge>
              </GridItem>
            )}
          </GridContainer>
        }
        fixed
        color="white"
        changeColorOnScroll={{
          height: 400,
          color: "white",
        }}
      />
    </>
  );
};

export default Header;
