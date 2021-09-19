import React, { Fragment } from "react";
import classNames from "classnames";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useMediaQuery, useTheme, OutlinedInput, InputAdornment } from "@material-ui/core";
import { Home } from '@material-ui/icons';
// import CustomInput from "../../components/CustomInput/CustomInput";
import Button from "../../components/CustomButtons/Button";
import CartCard from "../../components/CartCard/cartCard";

import useStyles from "./style";

const Cart = () => {
  const classes = useStyles();
  // const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const orders = useSelector((state) => state.home.orders);
  console.log(orders, "----orders-----");

  // const [state, setState] = useState({});
  // const [isEdit, setIsEdit] = useState(-1);

  return (
    <div className={classes.root}>
      {orders.length > 0 && <>
        <div className={classes.leftSide}>
          <h3 className={classes.leftTitle}>Tu orden : 0221</h3>
          <hr />
          <div className={classes.product}>
            {orders?.map((ele, index) => (
              <Fragment key={index}>
                <CartCard item={ele} index={index} />
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
            <OutlinedInput
              className={classes.wiithButton}
              placeholder="Introduce el código"
              endAdornment={
                <InputAdornment position="end">
                  <Button className={classes.applyButton} color="primary">APLICAR</Button>
                </InputAdornment>
              }
            />
            {!isMobile && (
              <>
                <br />
                <br />
                <hr />
                <h6 className={classNames(classes.rightSubTitle)}>
                  <span className={classNames("total")}>Total</span> <span className={classes.dottedLine} /> $50
                </h6>
              </>
            )}
            <Link to="/cart/confirm">
              <Button color="primary" block>FINALIZAR COMPRA</Button>
            </Link>
            {!isMobile && <Link to="/"><p className={classes.finalPara}>Seguir comprando</p></Link>}
            {isMobile && (
              <Button className={classes.finalBtn}>Seguir comprando</Button>
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
