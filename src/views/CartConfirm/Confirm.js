import React, { useState } from "react";
import classNames from "classnames";
// import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useMediaQuery, useTheme, OutlinedInput, InputAdornment } from "@material-ui/core";
import { CheckCircleRounded } from '@material-ui/icons';

// import CustomInput from "../../components/CustomInput/CustomInput";
import Button from "components/CustomButtons/Button";
import CartCardList from "components/CartCard/CartCardList";
import Success from "./Success";

import useStyles from "./style";

const Confirm = () => {
  const classes = useStyles();
  // const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const orders = useSelector((state) => state.home.orders);
  const [success, setSuccess] = useState(false);
  console.log(orders, "----orders-----");

  // const [state, setState] = useState({});
  // const [isEdit, setIsEdit] = useState(-1);

  return (
    <div className={classes.root}>
      <div className={classes.leftSide}>
        <div className={classes.leftBody}>
          {!success && <>
            <h3 className={classes.leftTitle}>Tu orden : 0221</h3>
            <div className={classNames(classes.twoInput)}>
              <OutlinedInput
                className={classNames(classes.input, classes.nameInput)}
                placeholder="Nombre del tarjetahabiente"
              />
              <OutlinedInput
                className={classNames(classes.input, classes.cpInput)}
                placeholder="C.P."
              />
            </div>
            <OutlinedInput
              className={classNames(classes.input, classes.width100)}
              placeholder="Número de la tarjeta"
            />
            <div className={classNames(classes.twoInput)}>
              <OutlinedInput
                // type="type"
                className={classNames(classes.input, classes.dateInput)}
                placeholder="MM/YY"
              />
              <OutlinedInput
                className={classNames(classes.input, classes.cvcInput)}
                placeholder="CVC"
              />
            </div>
            <Button color="primary" style={{ float: "right", width: 200 }} onClick={() => setSuccess(true)}>PAGAR</Button>
          </>}
          {success && <>
            <div className={classes.titleContainer}>
              <CheckCircleRounded fontSize="large" />
              <div>
                <h3>Compra éxitosa</h3>
                <p>Aquí están los detalles de tu orden. También hemos enviado una copia de está información a tu correo.</p>
              </div>
            </div>
            {orders.map((order, i) => (
              <Success item={order} key={i} />
            ))}
          </>}
        </div>
      </div>
      <div className={classes.rightSide}>
        <div className={classes.rightBody}>
          <div className={classes.product}>
            {orders?.map((ele, index) => (
              <CartCardList item={ele} key={index} />
            ))}
            {!orders?.length && 'No Cart'}
          </div>
          <hr />
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
          {/* <Button color="primary" block>FINALIZAR COMPRA</Button>
          {!isMobile && <Link to="/"><p className={classes.finalPara}>Seguir comprando</p></Link>}
          {isMobile && (
            <Button className={classes.finalBtn}>Seguir comprando</Button>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default Confirm;
