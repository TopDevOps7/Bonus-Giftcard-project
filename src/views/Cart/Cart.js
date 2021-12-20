import React, { Fragment, useState, useEffect } from "react";
import classNames from "classnames";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  useMediaQuery,
  useTheme,
  // TextField, InputAdornment
} from "@material-ui/core";
import { Home } from "@material-ui/icons";
import Button from "components/CustomButtons/Button";
import CartCard from "components/CartCard/cartCard";
import { confirmOrder } from "redux/actions/cart";
import useStyles from "./style";

const Cart = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { partnerId } = useParams();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [updateFlag, setUpdateFlag] = useState(0);
  const [disableBtn, disableButton] = useState(false);
  let errorMessage = useSelector((state) => state.cart.errors);
  let orders = useSelector((state) => state.home.data[partnerId ?? "noPartner"]?.orders);
  orders = orders ?? [];

  const getTotal = () => {
    let total = 0;
    orders.forEach((order) => {
      if (order.discountType == "") {
        total += Number(order.amount);
      } else {
        order.discountType == "amount"
          ? (total += Number(order.amount) - Number(order.discountAmount) * 100)
          : (total += Number(order.amount) - (Number(order.amount) / 100) * Number(order.discountAmount));
      }
    });
    return total;
  };

  let homeUrl = "/";
  if (partnerId) {
    homeUrl += partnerId;
  }

  const handleConfirm = () => {
    disableButton(true);
    dispatch(confirmOrder(getTotal(), navigate, homeUrl, partnerId));
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (errorMessage) {
      disableButton(false);
    }
  }, [errorMessage]);

  return (
    <div className={classes.root}>
      {orders.length > 0 && (
        <>
          <div className={classes.leftSide}>
            <h3 className={classes.leftTitle}>Carrito de compras</h3>
            <hr />
            <div className={classes.product}>
              {orders?.map((ele, index) => (
                <Fragment key={index}>
                  <CartCard item={ele} index={index} setUpdate={() => setUpdateFlag(updateFlag + 1)} />
                  {index !== orders.length - 1 && <hr />}
                </Fragment>
              ))}
            </div>
          </div>
          <div className={classes.rightSide}>
            <div className={classes.rightBody}>
              <>
                <h3 className={classes.rightTitle}>Resumen de tu compra</h3>
                <hr />
              </>
              <>
                <h6 className={classNames(classes.rightSubTitle)}>
                  <span className={classNames("total")}>Total</span> <span className={classes.dottedLine} />${getTotal() / 100}
                </h6>
              </>
              <Button id="finish_button" color="primary" onClick={handleConfirm} block disabled={disableBtn}>
                FINALIZAR COMPRA
              </Button>
              {!isMobile && (
                <Link to={homeUrl}>
                  <p className={classes.finalPara}>Seguir comprando</p>
                </Link>
              )}
              {isMobile && (
                <Link to={homeUrl}>
                  <Button className={classes.finalBtn}>Seguir comprando</Button>
                </Link>
              )}
            </div>
          </div>
        </>
      )}
      {!orders.length && (
        <div style={{ flex: 1, textAlign: "center" }}>
          <h3 className={classes.margin_top_80}>Tu carrito de compras está vacío.</h3>
          <div className={classes.margin_top_50}>
            <Link to={homeUrl}>
              <Button color="primary" className={classes.margin_bottom_400}>
                <Home /> Seguir comprando
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
