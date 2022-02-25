import React, { Fragment, useState, useEffect, useRef } from "react";
import classNames from "classnames";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  useMediaQuery,
  useTheme,
  // TextField, InputAdornment
} from "@material-ui/core";
import { Form, Formik } from "formik";
import CustomOutlinedInput from "components/CustomOutlinedInput/CustomOutlinedInput";
import { createTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { Home } from "@material-ui/icons";
import { TailSpin } from "react-loader-spinner";
import Button from "components/CustomButtons/Button";
import CartCard from "components/CartCard/cartCard";
import { confirmOrder } from "redux/actions/cart";
import { sendCoupon, setCoupon } from "redux/actions/home";
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
  const [couponFlag, setCouponFlag] = useState(false);
  const [couponButtonFlag, setCouponButtonFlag] = useState(false);
  const [couponButtonStatusChangeFlag, setCouponButtonStatusChangeFlag] = useState(false);
  const [errorCouponText, setErrorCouponText] = useState("");
  const [successCouponText, setSuccessCouponText] = useState("");
  const [couponButtonText, setCouponButtonText] = useState("APLICAR");
  let partner = useSelector(({ home }) => home.partner.configuration);
  let errorMessage = useSelector((state) => state.cart.errors);
  let orders = useSelector((state) => state.home.data[partnerId ?? "noPartner"]?.orders);
  orders = orders ?? [];
  let documentTitle = useSelector(({ home }) => home.partner.name);
  let changeOrders = useSelector(({ home }) => home.changeOrders);
  let partner_ = useSelector(({ home }) => home.partner);
  let couponResult_ = useSelector(({ home }) => home.coupon);

  const formRef = useRef();

  documentTitle && (document.title = documentTitle);

  JSON.parse(sessionStorage.getItem("partner")) && (partner = JSON.parse(sessionStorage.getItem("partner")).configuration);

  sessionStorage.setItem("confirmCouponText", "");
  sessionStorage.setItem("confirmCouponText_", "");
  sessionStorage.setItem("total", 0);

  const theme_ = createTheme({
    overrides: {
      MuiOutlinedInput: {
        root: {
          "&$focused $notchedOutline": {
            borderColor: partner && partner.colors && partner.colors.button ? `${partner.colors.button}` : "#3F51B5",
          },
        },
      },
      MuiFormLabel: {
        root: {
          "&$focused": {
            color: partner && partner.colors && partner.colors.button ? `${partner.colors.button}` : "#3F51B5",
          },
        },
      },
    },
  });

  useEffect(() => {
    couponResult_ &&
      couponResult_.uniqueCode &&
      (setSuccessCouponText("Cupón válido"), setCouponFlag(true), setCouponButtonText("QUITAR"));
  }, [couponResult_]);

  const ClickCoupon = (coupon) => {
    setCouponButtonStatusChangeFlag(true);

    if (couponButtonText == "QUITAR") {
      setCouponButtonText("APLICAR");
      sessionStorage.setItem("coupon", JSON.stringify({}));
      dispatch(setCoupon({}));
    } else {
      setCouponButtonFlag(true);
      dispatch(sendCoupon(partnerId, "", coupon)).then(() => {
        let couponResult = JSON.parse(sessionStorage.getItem("coupon"));
        if (!couponResult.minAmount) {
          dispatch(setCoupon(couponResult));
          setSuccessCouponText("");
          setErrorCouponText(sessionStorage.getItem("errorCouponText"));
        } else {
          let total = 0;
          let totalCoupon = 0;
          let resultValue = 0;

          orders.forEach((order) => {
            if (order.discountType == "") {
              total += Number(order.amount);
            } else {
              order.discountType == "amount"
                ? (total += Number(order.amount) - Number(order.discountAmount) * 100)
                : (total += Number(order.amount) - (Number(order.amount) / 100) * Number(order.discountAmount));
            }
          });

          if (couponResult && couponResult.applyTo == "giftcards") {
            couponResult.giftcards.map((id) => {
              orders.map((order) => {
                if (order.giftcard.id == id) {
                  if (order.discountType == "") {
                    totalCoupon += Number(order.amount);
                  } else {
                    order.discountType == "amount"
                      ? (totalCoupon += Number(order.amount) - Number(order.discountAmount) * 100)
                      : (totalCoupon += Number(order.amount) - (Number(order.amount) / 100) * Number(order.discountAmount));
                  }
                }
              });
            });
            resultValue = totalCoupon;
          } else {
            resultValue = total;
          }

          resultValue < couponResult.minAmount
            ? (setErrorCouponText("Compra mínima de $" + couponResult.minAmount / 100),
              resultValue == 0 && setErrorCouponText("Código inválido"),
              setSuccessCouponText(""),
              dispatch(setCoupon({})))
            : (setErrorCouponText(""),
              setSuccessCouponText("Cupón válido"),
              setCouponButtonText("QUITAR"),
              dispatch(setCoupon(couponResult)));
        }
        setCouponButtonFlag(false);
      });
    }
  };

  const ChangeCoupon = (e) => {
    (e.target.value.length == 0 || e.target.value.length > 20) && setCouponFlag(false);
  };

  const RemoveCoupon = () => {
    dispatch(setCoupon({}));
    setSuccessCouponText("");
    setCouponButtonText("APLICAR");
    couponResult_.minAmount && ((formRef.current.values.coupon = ""), setCouponFlag(false));
  };

  const getTotal = () => {
    let total = 0;
    let totalCoupon = 0;

    orders.forEach((order) => {
      if (order.discountType == "") {
        total += Number(order.amount);
      } else {
        order.discountType == "amount"
          ? (total += Number(order.amount) - Number(order.discountAmount) * 100)
          : (total += Number(order.amount) - (Number(order.amount) / 100) * Number(order.discountAmount));
      }
    });

    if (couponResult_ && couponResult_.applyTo == "giftcards") {
      couponResult_.giftcards.map((id) => {
        orders.map((order) => {
          if (order.giftcard.id == id) {
            if (order.discountType == "") {
              totalCoupon += Number(order.amount);
            } else {
              order.discountType == "amount"
                ? (totalCoupon += Number(order.amount) - Number(order.discountAmount) * 100)
                : (totalCoupon += Number(order.amount) - (Number(order.amount) / 100) * Number(order.discountAmount));
            }
          }
        });
      });
    }

    if (successCouponText != "") {
      couponResult_ && couponResult_.type == "percent"
        ? couponResult_.applyTo == "giftcards"
          ? totalCoupon < couponResult_.minAmount
            ? RemoveCoupon()
            : (sessionStorage.setItem(
                "confirmCouponText",
                "$" + totalCoupon / 100 + " con " + couponResult_.amount + "% de descuento"
              ),
              sessionStorage.setItem("confirmCouponText_", "y $" + (total - totalCoupon) / 100 + " sin descuento"),
              (total = total - totalCoupon + (totalCoupon / 100) * (100 - couponResult_.amount)))
          : (sessionStorage.setItem("confirmCouponText", "$" + total / 100 + " con " + couponResult_.amount + "% de descuento"),
            (total = (total / 100) * (100 - couponResult_.amount)),
            sessionStorage.setItem("confirmCouponText_", ""))
        : couponResult_.minAmount <= total
        ? couponResult_.applyTo == "giftcards"
          ? totalCoupon < couponResult_.minAmount
            ? RemoveCoupon()
            : (sessionStorage.setItem(
                "confirmCouponText",
                "$" + total / 100 + " with $" + couponResult_.amount / 100 + " de descuento"
              ),
              (total = total - couponResult_.amount),
              sessionStorage.setItem("confirmCouponText_", ""))
          : (sessionStorage.setItem(
              "confirmCouponText",
              "$" + total / 100 + " con $" + couponResult_.amount / 100 + " de descuento"
            ),
            (total = total - couponResult_.amount),
            sessionStorage.setItem("confirmCouponText_", ""))
        : RemoveCoupon();
    }

    sessionStorage.setItem("total", total / 100);

    return total;
  };

  let homeUrl = "/";
  if (partnerId) {
    homeUrl += partnerId;
  }

  const handleConfirm = () => {
    disableButton(true);
    dispatch(
      confirmOrder(
        getTotal(),
        navigate,
        homeUrl,
        partnerId,
        changeOrders,
        couponButtonStatusChangeFlag,
        couponResult_ && couponResult_.uniqueCode ? couponResult_.uniqueCode.code : ""
      )
    );
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
              {partner_ && partner_.validCampaign == true && (
                <Formik
                  innerRef={formRef}
                  initialValues={{
                    coupon: couponResult_ && couponResult_.uniqueCode ? couponResult_.uniqueCode.code : "",
                  }}
                >
                  {({ values, handleChange }) => {
                    return (
                      <Form>
                        <div className={classes.couponDiv}>
                          <h6>¿Tienes código de descuento?</h6>
                          <MuiThemeProvider theme={theme_}>
                            <div className={classes.twoInput}>
                              <div className={classes.couponInput}>
                                <CustomOutlinedInput
                                  size="small"
                                  type="text"
                                  value={values.coupon}
                                  name="coupon"
                                  label="Introduce el código"
                                  onChange={(e) => {
                                    setCouponFlag(true);
                                    setErrorCouponText("");
                                    ChangeCoupon(e);
                                    handleChange(e);
                                  }}
                                  disabled={couponButtonText == "QUITAR" ? true : false}
                                  block
                                />
                              </div>
                              <div className={classes.couponButton}>
                                {partner && partner.colors && partner.colors.button ? (
                                  <Button
                                    color="primary"
                                    style={{
                                      backgroundColor: couponButtonFlag ? "" : "" || couponFlag ? partner.colors.button : "",
                                    }}
                                    block
                                    disabled={couponButtonFlag ? true : false || !couponFlag}
                                    onClick={() => {
                                      ClickCoupon(values.coupon);
                                    }}
                                  >
                                    {couponButtonFlag && <TailSpin color="#000000" />}
                                    <span className={couponButtonFlag && classes.loading}>{couponButtonText}</span>
                                  </Button>
                                ) : (
                                  <Button
                                    id="para-button"
                                    color="primary"
                                    block
                                    disabled={couponButtonFlag ? true : false || !couponFlag}
                                    onClick={() => {
                                      ClickCoupon(values.coupon);
                                    }}
                                  >
                                    {couponButtonFlag && <TailSpin color="#000000" />}
                                    <span className={couponButtonFlag && classes.loading}>{couponButtonText}</span>
                                  </Button>
                                )}
                              </div>
                            </div>
                          </MuiThemeProvider>
                          {errorCouponText != "" && <div className={classes.errorCouponText}>{errorCouponText}</div>}
                          {successCouponText != "" && (
                            <div>
                              <div className={classes.successCouponText}>{successCouponText}</div>
                              <div className={classes.recalcTotalText}>{sessionStorage.getItem("confirmCouponText")}</div>
                              {sessionStorage.getItem("confirmCouponText_") != "" &&
                                sessionStorage.getItem("confirmCouponText_").substring(3, 4) != "0" && (
                                  <div className={classes.recalcTotalText_}>{sessionStorage.getItem("confirmCouponText_")}</div>
                                )}
                            </div>
                          )}
                        </div>
                      </Form>
                    );
                  }}
                </Formik>
              )}
              <>
                <h6 className={classNames(classes.rightSubTitle)}>
                  <span className={classNames("total")}>Total</span> <span className={classes.dottedLine} />${getTotal() / 100}
                </h6>
              </>
              {partner && partner.colors && partner.colors.button ? (
                <Button
                  id="finish_button"
                  color="primary"
                  style={{
                    backgroundColor: disableBtn ? "" : partner.colors.button,
                  }}
                  onClick={handleConfirm}
                  block
                  disabled={disableBtn}
                >
                  FINALIZAR COMPRA
                </Button>
              ) : (
                <Button id="finish_button" color="primary" onClick={handleConfirm} block disabled={disableBtn}>
                  FINALIZAR COMPRA
                </Button>
              )}
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
              {partner && partner.colors && partner.colors.button ? (
                <Button color="primary" className={classes.margin_bottom_400} style={{ backgroundColor: partner.colors.button }}>
                  <Home /> Seguir comprando
                </Button>
              ) : (
                <Button color="primary" className={classes.margin_bottom_400}>
                  <Home /> Seguir comprando
                </Button>
              )}
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
