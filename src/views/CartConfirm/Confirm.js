import React, { useState } from "react";
import classNames from "classnames";
// import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useMediaQuery, useTheme, TextField, InputAdornment } from "@material-ui/core";
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

  // const [state, setState] = useState({});
  // const [isEdit, setIsEdit] = useState(-1);

  const getTotal = () => {
    let total = 0;
    orders.forEach(order => {
      total += Number(order.amount) * Number(order.monto)
    });
    return total;
  }

  return (
    <div className={classes.root}>
      <div className={classes.leftSide}>
        <div className={classes.leftBody}>
          {!success && <>
            <h3 className={classes.leftTitle}>Tu orden : 0221</h3>
            <div className={classNames(classes.twoInput)}>
              <TextField
                className={classNames(classes.nameInput, classes.twoLeft)}
                margin="dense"
                variant="outlined"
                label="Nombre del tarjetahabiente"
              />
              <TextField
                className={classNames(classes.cpInput, classes.twoRight)}
                margin="dense"
                variant="outlined"
                label="C.P."
              />
            </div>
            <TextField
              className={classNames(classes.width100)}
              margin="dense"
              variant="outlined"
              label="Número de la tarjeta"
            />
            <div className={classNames(classes.twoInput)}>
              <TextField
                // type="type"
                className={classNames(classes.dateInput, classes.twoLeft)}
                margin="dense"
                variant="outlined"
                label="MM/YY"
              />
              <TextField
                className={classNames(classes.cvcInput, classes.twoRight)}
                margin="dense"
                variant="outlined"
                label="CVC"
              />
            </div>
            <Button color="primary" style={{ float: "right", width: 200 }} onClick={() => setSuccess(true)}>PAGAR</Button>
          </>}
          {success && <>
            <div className={classes.titleContainer}>
              <CheckCircleRounded fontSize="large" color="primary" />
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
