import React, { Fragment, useState, useEffect } from "react";
import classNames from "classnames";
import { Link } from "react-router-dom";
import {
  useSelector,
  useDispatch
} from "react-redux";
import { useMediaQuery, useTheme, TextField, InputAdornment } from "@material-ui/core";
import { Home } from '@material-ui/icons';
import Button from "components/CustomButtons/Button";
import CartCard from "components/CartCard/cartCard";

import {
  getCards,
} from "../../redux/actions/home"

import useStyles from "./style";

const Cart = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const orders = useSelector((state) => state.home.orders);
  const [updateFlag, setUpdateFlag] = useState(0);
  console.log(orders, "----orders-----");
  // const [state, setState] = useState({});
  // const [isEdit, setIsEdit] = useState(-1);

  const getTotal = () => {
    let total = 0;
    orders.forEach(order => {
      total += Number(order.amount) * Number(order.monto)
    });
    return total;
  }

  useEffect(() => {
    dispatch(getCards());
  }, [])

  return (
    <div className={classes.root}>
      {orders.length > 0 && <>
        <div className={classes.leftSide}>
          <h3 className={classes.leftTitle}>Tu orden : 0221</h3>
          <hr />
          <div className={classes.product}>
            {orders?.map((ele, index) => (
              <Fragment key={index}>
                <CartCard item={ele} index={index} setUpdate={() => setUpdateFlag(updateFlag + 1)} />
                {index !== (orders.length - 1) && <hr />}
              </Fragment>
            ))}
          </div>
        </div>
        <div className={classes.rightSide}>
          <div className={classes.rightBody}>
            {!isMobile && (
              <>
                <h3 className={classes.rightTitle}>Resumen de tu compra</h3>
                <div className={classes.rightSubTitle}>
                  <span>Subtotal</span> <span>$50</span>
                </div>
                <hr />
              </>
            )}
            <h6 style={{ marginTop: 20 }}>¿Tienes código de descuento?</h6>
            {/* <CustomInput
            labelText="Introduce el código"
            labelWidth={70}
            className={classes.inputForm}
          /> */}
            {/* <Button color="primary"> APLICAR</Button> */}
            <TextField
              className={classes.wiithButton}
              variant="outlined"
              margin="dense"
              label="Introduce el código"
              InputProps={{
                endAdornment:
                  <InputAdornment position="end">
                    <Button className={classes.applyButton} color="primary">APLICAR</Button>
                  </InputAdornment>
              }}
            />
            {!isMobile && (
              <>
                <br />
                <br />
                <hr />
                <h6 className={classNames(classes.rightSubTitle)}>
                  <span className={classNames("total")}>Total</span> <span className={classes.dottedLine} />
                  ${getTotal()}
                </h6>
              </>
            )}
            <Link to="/cart/confirm">
              <Button color="primary" block>FINALIZAR COMPRA</Button>
            </Link>
            {!isMobile && <Link to="/"><p className={classes.finalPara}>Seguir comprando</p></Link>}
            {isMobile && (
              <Link to="/">
                <Button className={classes.finalBtn}>Seguir comprando</Button>
              </Link>
            )}
          </div>
        </div>
      </>
      }
      {!orders.length && <div style={{ flex: 1, textAlign: 'center' }}>
        <h3>Tu carrito de compras está vacío.</h3>
        <div>
          <Link to="/">
            <Button color="primary"><Home /> Seguir comprando</Button>
          </Link>
        </div>
      </div>}
    </div>
  );
};

export default Cart;
