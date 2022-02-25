import React, { useState, useEffect } from "react";
import classNames from "classnames";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { CheckCircleRounded, ArrowForwardIos } from "@material-ui/icons";
import { Form, Formik, Field } from "formik";
import CustomOutlinedInput from "components/CustomOutlinedInput/CustomOutlinedInput";
import MuiPhoneNumber from "components/material-ui-phone-input";
import * as Yup from "yup";
import Button from "components/CustomButtons/Button";
import CartCardList from "components/CartCard/CartCardList";
import { successOrder, deleteOrder } from "redux/actions/cart";
import Success from "./Success";
import useStyles from "./style";
import NumberFormat from "react-number-format";
import Visa from "../../assets/img/icons8-visa.svg";
import Mastercard from "../../assets/img/icons8-mastercard.svg";
import Amex from "../../assets/img/icons8-amex.svg";
import { prefixes } from "./prefixes.js";
import { Home } from "@material-ui/icons";
import { JSEncrypt } from "jsencrypt";
import { createTheme, MuiThemeProvider } from "@material-ui/core/styles";

import { filterStringName } from "../../constants";
import { filterStringEmail } from "../../constants";

const ExpiryDateFormat = React.forwardRef(function ExpiryDateFormat(props, ref) {
  const { onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      format="##/##"
      mask={["M", "M", "Y", "Y"]}
    />
  );
});

const CVVFormat = React.forwardRef(function CVVFormat(props, ref) {
  const { onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      format="####"
    />
  );
});

const Confirm = () => {
  const classes = useStyles();
  const { partnerId } = useParams();
  const [success, setSuccess] = useState(false);
  const [disableBtn, disableButton] = useState(false);
  const [ordersTemp, setOrdersTemp] = useState([]);
  const [buyerName, setBuyerName] = useState("");
  const [buyerEmail, setBuyerEmail] = useState("");
  const [buyerPhone, setBuyerPhone] = useState("");
  const placeholder = "Número de la tarjeta";
  const [maxLength, setMaxLength] = useState(16);
  const [cardNumber, setCardNumber] = useState("");
  const [activeVisa, setActiveVisa] = useState(false);
  const [activeMastercard, setActiveMastercard] = useState(false);
  const [activeAmex, setActiveAmex] = useState(false);
  const [valid, setValid] = useState(false);
  const [error, setError] = useState(false);
  const [type, setType] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let partner = useSelector(({ home }) => home.partner.configuration);
  let documentTitle = useSelector(({ home }) => home.partner.name);
  let couponResult = useSelector(({ home }) => home.coupon);

  documentTitle && (document.title = documentTitle);

  JSON.parse(sessionStorage.getItem("partner")) && (partner = JSON.parse(sessionStorage.getItem("partner")).configuration);

  const theme = createTheme({
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
    window.scrollTo(0, 0);
  }, []);

  let orders = useSelector((state) => state.home.data[partnerId ?? "noPartner"]?.orders);
  let confirmOrderId = useSelector((state) => state.cart.confirmOrderId);
  orders = orders ?? [];

  if (sessionStorage.getItem("session") != "confirm") {
    if (partnerId) {
      navigate(`/${partnerId}/404`);
    } else {
      navigate("/404");
    }
  }

  if (!success && !ordersTemp?.length && !orders?.length) {
    if (partnerId) {
      navigate(`/${partnerId}`);
    } else {
      navigate("/");
    }
  }

  const pub_key =
    "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAh6kdjREGIh6JWPNXmzKfwi2xIsB/DOzFmM3jAfoFeSpSQnpHPT4P0jclo6wdFvGUSJ3XFK+8rM7Sl0Q1HhF3bgc8IoHNuODDOOW5tD7ATYb4qtVF4W93E9kNMNaS228EeDdgYvzbh5BrZaevIVVIKr0W9cP+x1M33VZfmAViXZpou3PcWqOFjhASy7pJ4yywy4DH09c1OIJpj0zDwGaTQ3hnCJweS3wbY911elKFKVpHoO3eVHsNkK/2FA6ib12rRpAPpkv19Y9Q47xcOCxExmieMFQCXXHJVn94yv3K3WL3tFx2mb8aAcTjOKeLxDedziBQkdu0Vy1IhnA61AyxBwIDAQAB";
  const encrypt = new JSEncrypt();

  const Logo = ({ type, alt, active }) => {
    let img = <img src={type} alt={`${alt}`} className={classes.cc_logo} />;

    if (active) {
      img = <img src={type} alt={`${alt}`} className={classes.cc_logo_active} />;
    }

    return <>{img}</>;
  };

  const verifyNumber = () => {
    let sum = 0;
    let temp = 0;
    let cardNumberCopy = localStorage.getItem("card_number");
    let checkDigit = parseInt(localStorage.getItem("card_number").slice(-1));
    let parity = cardNumberCopy.length % 2;

    for (let i = 0; i <= cardNumberCopy.length - 2; i++) {
      if (i % 2 === parity) {
        temp = +cardNumberCopy[i] * 2;
      } else {
        temp = +cardNumberCopy[i];
      }

      if (temp > 9) {
        temp -= 9;
      }

      sum += temp;
    }

    return (sum + checkDigit) % 10 === 0;
  };

  const validMessage = <span className={classes.error_valid}>El número de tarjeta es válido. ✓</span>;

  const invalidMessage = <span className={classes.error_invalid}>El Número de la tarjeta debe ser válido.</span>;

  const determineType = (cardNumber) => {
    for (let key of prefixes) {
      for (let value of key[1]) {
        if (cardNumber.startsWith(value)) {
          setType(key[0]);

          switch (key[0]) {
            case "Visa":
              setActiveVisa(true);
              setActiveMastercard(false);
              setActiveAmex(false);
              setValid(false);
              break;
            case "Mastercard":
              setActiveVisa(false);
              setActiveMastercard(true);
              setActiveAmex(false);
              setValid(false);
              break;
            case "Amex":
              setActiveVisa(false);
              setActiveMastercard(false);
              setActiveAmex(true);
              setValid(false);
              break;
            default:
              break;
          }

          return;
        } else {
          setActiveVisa(false);
          setActiveMastercard(false);
          setActiveAmex(false);
          setValid(false);
          setType("");
        }
      }
    }
  };

  const handleChange_ = (e) => {
    setCardNumber(e.target.value);
    localStorage.setItem("card_number", e.target.value);
    setError(false);

    if (cardNumber !== e.target.value) {
      determineType(e.target.value);
    }

    activeAmex ? setMaxLength(15) : setMaxLength(16);

    if (type !== "") {
      switch (type) {
        case Visa:
          setActiveVisa(true);
          break;

        case Mastercard:
          setActiveMastercard(true);
          break;

        case Amex:
          setActiveAmex(true);
          break;

        default:
          break;
      }
    }

    /* A chain like this just seems wrong. */
    if (cardNumber.length !== e.target.value.length && e.target.value.length === maxLength) {
      setError(true);
      setValid(verifyNumber());
    }
  };

  const handleSubmit = (values) => {
    const { name, email, celular, expiryDate, cvc } = values;

    let s = celular;
    let s1 = s.substr(4, 3);
    let s2 = s.substr(8, 3);
    let s3 = s.substr(12, 4);
    let phone = "";
    s != "" ? (s == "+52" ? (phone = "") : (phone = "52" + s1 + s2 + s3)) : (phone = "");

    encrypt.setPublicKey(pub_key);
    let cardNumber_ = encrypt.encrypt(cardNumber);
    let cvc_ = encrypt.encrypt(cvc);

    let s_ = expiryDate;
    let m = encrypt.encrypt(s_.substr(0, 2));
    let y = encrypt.encrypt("20" + s_.substr(2, 4));

    setBuyerName(name);
    setBuyerEmail(email);
    setBuyerPhone(phone);

    const data = {
      orderId: confirmOrderId,
      card: {
        number: cardNumber_,
        expMonth: m,
        expYear: y,
        Cvv: cvc_,
      },
      user: {
        name,
        email,
        phone,
      },
      saveMethod: false,
    };

    disableButton(true);
    dispatch(successOrder(data)).then(() => {
      let successOrders = JSON.parse(localStorage.getItem("successOrders"));
      disableButton(false);
      if (successOrders.length != orders.length) {
        setSuccess(false);
      } else {
        setSuccess(true);
        setOrdersTemp(orders);
        orders.map((order, i) => {
          dispatch(deleteOrder({ i, id: order.giftcard.id }, partnerId));
        });
      }
    });
  };

  const getValidationSchema = () => {
    let validation = {
      name: Yup.string().max(60).required("El Nombre y Apellido no puede estar vacío."),
      email: Yup.string().email("El Email debe ser válido.").max(60).required("El Email no puede estar vacío."),
      celular: Yup.string().test("len", "El Celular debe ser válido.", (val) => !val || val.length == 3 || val.length == 16),
      expiryDate: Yup.string()
        .min(4, "El MM/YY debe ser válido.")
        .max(4, "El MM/YY debe ser válido.")
        .required("El MM/YY no puede estar vacío."),
      cvc: Yup.string()
        .min(3, "El CVV debe ser válido.")
        .max(4, "El CVV debe ser válido.")
        .required("El CVV no puede estar vacío."),
    };

    return Yup.object(validation);
  };

  let homeUrl = "/";
  if (partnerId) {
    homeUrl += partnerId;
  }

  const handleChangeName = (e) => {
    let targetStr = e.currentTarget.value;

    for (let j = 0; j < targetStr.length; j++) {
      let target = targetStr.slice(j, j + 1);
      for (let i = 0; i < filterStringName.length; i++) {
        let result = filterStringName.slice(i, i + 1);
        if (target == result) {
          e.currentTarget.value = e.currentTarget.value.replace(target, "");
          e.preventDefault();
        }
      }
    }
  };

  const handleChangeEmail = (e) => {
    let targetStr = e.currentTarget.value;

    for (let j = 0; j < targetStr.length; j++) {
      let target = targetStr.slice(j, j + 1);
      for (let i = 0; i < filterStringEmail.length; i++) {
        let result = filterStringEmail.slice(i, i + 1);
        if (target == result) {
          e.currentTarget.value = e.currentTarget.value.replace(target, "");
          e.preventDefault();
        }
      }
    }
  };

  return (
    <div className={classes.root}>
      <div className={classes.leftSide}>
        <div className={classes.leftBody}>
          {!success && (
            <>
              <p className={classes.Breadcrumb}>
                <h6 className={classes.MainBreadcrumb}>Carrito</h6> &nbsp;
                <ArrowForwardIos className={classes.ArrowBreadcrumb} /> &nbsp;
                <h6 className={classes.SubBreadcrumb}>Pago</h6>
              </p>
              <h6 className={classes.OrderIdTittle}>Orden ID: {confirmOrderId}</h6>
              <h3 className={classes.leftTitle}>Datos del comprador</h3>
              <Formik
                isInitialValid={false}
                initialValues={{
                  name: "",
                  email: "",
                  celular: "",
                  cardNumber: "",
                  expiryDate: "",
                  cvc: "",
                }}
                validationSchema={getValidationSchema()}
                onSubmit={handleSubmit}
              >
                {({ errors, touched, values, isValid, handleChange }) => {
                  return (
                    <Form>
                      <MuiThemeProvider theme={theme}>
                        <CustomOutlinedInput
                          size="small"
                          type="text"
                          value={values.name}
                          name="name"
                          label="Nombre y apellido *"
                          error={touched.name && errors.name}
                          onChange={(e) => {
                            handleChangeName(e);
                            handleChange(e);
                          }}
                          maxLength={60}
                          block
                        />
                        <CustomOutlinedInput
                          size="small"
                          type="text"
                          label="Email *"
                          value={values.email}
                          name="email"
                          error={touched.email && errors.email}
                          onChange={(e) => {
                            handleChangeEmail(e);
                            handleChange(e);
                          }}
                          maxLength={60}
                          block
                        />
                        <Field type="text" id="celular" name="celular">
                          {({ field }) => (
                            <MuiPhoneNumber
                              {...field}
                              size="small"
                              label="Recibir las tarjetas por Whastapp"
                              variant="outlined"
                              value={values.celular}
                              onChange={handleChange("celular")}
                              countryCodeEditable={false}
                              onlyCountries={["mx"]}
                              name="celular"
                              error={touched.celular && Boolean(errors.celular)}
                              margin="dense"
                              defaultCountry={"mx"}
                              helperText={touched.celular && errors.celular}
                              style={{ width: "100%" }}
                            />
                          )}
                        </Field>
                        <h3 className={classes.leftTitle} style={{ marginTop: 10 }}>
                          Proceso de pago
                        </h3>
                        <div className={classNames(classes.cardMargin)}>
                          <div className={classes.cardNumber_input}>
                            <NumberFormat
                              className={classes.cardNumber_input_}
                              type="text"
                              value={cardNumber}
                              placeholder={placeholder}
                              maxLength={maxLength}
                              onChange={handleChange_}
                            />
                          </div>
                          {error == true ? (
                            <div className={classes.error_text_}>{valid ? validMessage : invalidMessage}</div>
                          ) : (
                            <div className={classes.error_text}>{valid ? validMessage : invalidMessage}</div>
                          )}
                          <div>
                            <Logo type={Visa} alt="Visa" active={activeVisa} />
                            <Logo type={Mastercard} alt="Mastercard" active={activeMastercard} />
                            <Logo type={Amex} alt="American Express" active={activeAmex} />
                          </div>
                          <div className={classNames(classes.twoInput)}>
                            <CustomOutlinedInput
                              className={classNames(classes.dateInput, classes.twoLeft)}
                              size="small"
                              type="text"
                              name="expiryDate"
                              value={values.expiryDate}
                              label="MM/YY *"
                              onChange={handleChange}
                              InputProps={{
                                inputComponent: ExpiryDateFormat,
                              }}
                              error={touched.expiryDate && errors.expiryDate}
                              block
                            />
                            <CustomOutlinedInput
                              className={classNames(classes.cvcInput, classes.twoRight)}
                              size="small"
                              type="text"
                              name="cvc"
                              value={values.cvc}
                              label="CVV *"
                              onChange={handleChange}
                              InputProps={{
                                inputComponent: CVVFormat,
                              }}
                              error={touched.cvc && errors.cvc}
                              block
                            />
                          </div>
                        </div>
                      </MuiThemeProvider>
                      {partner && partner.colors && partner.colors.button ? (
                        <Button
                          color="primary"
                          id="payButton"
                          style={{
                            float: "right",
                            width: 200,
                            backgroundColor: !isValid || disableBtn || !valid ? "" : partner.colors.button,
                          }}
                          type="submit"
                          disabled={!isValid || disableBtn || !valid}
                        >
                          PAGAR
                        </Button>
                      ) : (
                        <Button
                          color="primary"
                          id="payButton"
                          style={{ float: "right", width: 200 }}
                          type="submit"
                          disabled={!isValid || disableBtn || !valid}
                        >
                          PAGAR
                        </Button>
                      )}
                    </Form>
                  );
                }}
              </Formik>
            </>
          )}
          {success && (
            <>
              <div className={classes.titleContainer}>
                {partner && partner.colors && partner.colors.button ? (
                  <CheckCircleRounded
                    fontSize="large"
                    style={{
                      color: partner.colors.button,
                    }}
                  />
                ) : (
                  <CheckCircleRounded fontSize="large" color="primary" />
                )}
                <div>
                  <h3>Compra exitosa</h3>
                  <p>Aquí están los detalles de tu orden. También hemos enviado una copia de esta información a tu correo.</p>
                </div>
              </div>
              {ordersTemp.map((order, i) => (
                <Success
                  item={order}
                  successItem={JSON.parse(localStorage.getItem("successOrders"))[i]}
                  buyer={buyerName}
                  email={buyerEmail}
                  phone={buyerPhone}
                  confirmOrderId={confirmOrderId}
                  key={i}
                />
              ))}
            </>
          )}
        </div>
      </div>
      <div className={classes.rightSide}>
        <div className={classes.rightBody}>
          <div className={classes.product}>
            {success == true
              ? ordersTemp?.map((ele, index) => <CartCardList item={ele} key={index} />)
              : orders?.map((ele, index) => <CartCardList item={ele} key={index} />)}
            {success == true ? !ordersTemp?.length && "No Cart" : !orders?.length && "No Cart"}
          </div>
          <hr />
          {couponResult && sessionStorage.getItem("confirmCouponText") != "" && (
            <div>
              <div className={classes.successCouponText}>Cupón válido</div>
              <div className={classes.recalcTotalText}>{sessionStorage.getItem("confirmCouponText")}</div>
              {sessionStorage.getItem("confirmCouponText_") != "" &&
                sessionStorage.getItem("confirmCouponText_").substring(3, 4) != "0" && (
                  <div className={classes.recalcTotalText_}>{sessionStorage.getItem("confirmCouponText_")}</div>
                )}
            </div>
          )}
          <h6 className={classNames(classes.rightSubTitle)}>
            <span className={classNames("total")}>Total</span> <span className={classes.dottedLine} />$
            {sessionStorage.getItem("total")}
          </h6>

          <div className={classes.align_center}>
            {success == true ? (
              <Link to={homeUrl}>
                {partner && partner.colors && partner.colors.button ? (
                  <Button
                    color="primary"
                    style={{
                      backgroundColor: partner.colors.button,
                    }}
                  >
                    <Home /> Seguir comprando
                  </Button>
                ) : (
                  <Button color="primary">
                    <Home /> Seguir comprando
                  </Button>
                )}
              </Link>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Confirm;
