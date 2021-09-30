import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate, Link } from "react-router-dom";
import classNames from "classnames";
import moment from "moment";
import _ from "lodash";
import { Form, Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import { getCardDetail } from "redux/actions/home";

import { css } from "@emotion/react";
import PulseLoader from "react-spinners/PulseLoader";

import { Checkbox, FormControlLabel, RadioGroup, Radio } from "@material-ui/core";
import MuiPhoneNumber from "components/material-ui-phone-input";

import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import esLocale from "date-fns/locale/es";

// import GridItem from "../../components/Grid/GridItem";
// import GridContainer from "../../components/Grid/GridContainer";
import Button from "components/CustomButtons/Button";
// import CustomInput from "components/CustomInput/CustomInput";
import CustomOutlinedInput from "components/CustomOutlinedInput/CustomOutlinedInput";
import TermsOfUseModal from "components/TermsOfUseModal/TermsOfUseModal";
// import { validationSchema } from "utils";
import { addOrder } from "redux/actions/cart";

// import { phoneRegExp } from "utils";
import useStyles from "./style";
import { cards } from "./../../constants/index";

const override = css`
  display: block;
  margin: 100px auto;
`;

const ProductDetails = () => {
  const classes = useStyles();
  // const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id, partnerId } = useParams();
  const loading = useSelector(({ home }) => home.loading);
  const cardDetail = useSelector(({ home }) => home.card);
  const [card, setCard] = useState({});
  // const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [selectedCard, setSelectedCard] = useState(0);
  const [flag, setFlag] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const handleCardDesignClick = (item) => {
    setSelectedCard(item);
  };

  const handleSubmit = async (values) => {
    const { monto, name, email, celular, para, friendEmail, mensaje, isGift, isScheduled, scheduledDate } = values;
    const data = {
      name,
      email,
      phone: celular,
      giftcard: {
        id: card.id,
        name: card.name,
        description: card.description,
        setupDate: card.setupDate,
        image: card.image,
        categories: card.categories,
        tags: card.tags,
        validity: card.validity,
        amountsRange: card.amountsRange,
        amountsFixed: card.amountsFixed,
      },
      amount: monto,
      style: selectedCard,
      isScheduled,
      scheduledDate: scheduledDate ?? null,
      isGift,
      toName: para ?? null,
      toEmail: friendEmail ?? null,
      toMessage: mensaje ?? null,
    };
    dispatch(addOrder(data, partnerId));
    if (partnerId) {
      navigate(`/${partnerId}/cart`);
    } else {
      navigate("/cart");
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setCard(cardDetail);
  }, [cardDetail]);

  useEffect(() => {
    dispatch(getCardDetail(id, partnerId, navigate));
    // console.log(isMobile);
  }, [id]);

  const { name, description, image, amountsFixed, amountsRange, validity } = card;

  let homeUrl = "/";
  if (partnerId) {
    homeUrl += partnerId;
  }

  const getValidationSchema = () => {
    let validation = {
      name: Yup.string().max(60).required("El Nombre y Apellido no puede estar vacío."),
      email: Yup.string().email("El email debe ser válido.").max(60).required("El Email no puede estar vacío."),
      celular: Yup.string()
        .min(16, "El Celular debe ser válido.")
        .max(16, "El Celular debe ser válido.")
        .required("El celular no puede estar vacío."),
      accept: Yup.bool().oneOf([true], "Tienes que aceptar los términos de uso."),
    };

    if (amountsFixed?.length) {
      validation = {
        ...validation,
        monto: Yup.number()
          .integer()
          .oneOf(amountsFixed, "El importe es un campo obligatorio.")
          .required("El importe es un campo obligatorio."),
      };
    }

    if (amountsRange) {
      validation = {
        ...validation,
        monto: Yup.number()
          .integer()
          .min(amountsRange.minAmount, `La cantidad debe ser mayor o igual a ${amountsRange.minAmount}.`)
          .max(amountsRange.maxAmount)
          .required("El importe es un campo obligatorio."),
      };
    }

    if (flag) {
      validation = {
        ...validation,
        para: Yup.string().max(60).required("El nombre Para quien no puede estar vacío."),
        friendEmail: Yup.string()
          .email("El email debe ser válido.")
          .max(60)
          .required("El correo del destinatorio no puede estar vacío."),
        mensaje: Yup.string().max(500),
      };
    }

    return Yup.object(validation);
  };

  return (
    <div className={classNames("cardBanner", classes.root)}>
      <div style={{ display: "flex" }}>
        <PulseLoader color={"#ab71ff"} speedMultiplier={1} loading={loading} css={override} size={15} margin={10} />
      </div>
      {!loading && !_.isEmpty(card) && (
        <>
          <div className={classes.background} style={{ backgroundImage: `url(${image})` }}>
            {/* <img src={image} style={{ width: "100%" }} /> */}
          </div>
          <div className={classes.header}>
            <div className={classes.leftTitle}>
              <h3>{name}</h3>
            </div>
            <div className={classes.rightTitle}>
              <h3>{`$${amountsRange ? amountsRange.minAmount : 0} - $${amountsRange ? amountsRange.maxAmount : 0}`}</h3>
              <p>Válido hasta el {moment(new Date(Number(validity?.endDate))).format("DD/MM/YYYY")}</p>
            </div>
          </div>
          <div className={classes.description}>
            <p className={classes.leftPara}>{description}</p>
            <p className={classes.rightPara}>
              <span>Vigencia: {validity ? validity.description : ""}</span>
              <span>
                <a className={classes.terms} onClick={() => setOpenModal(true)}>
                  Condiciones de uso
                </a>
              </span>
            </p>
          </div>
          <hr className={classes.divider} style={{ margin: "5px 15px" }} />
          <div className={classes.pBody}>
            <div className={classes.leftSide}>
              {/* <hr className={classes.divider} /> */}
              <h6 style={{ marginLeft: 10 }}>Selecciona diseño</h6>
              <div className={classes.cardDesign}>
                <h5 className="title">{name}</h5>
                <p className="validDate">Válido hasta el {moment(new Date(Number(validity?.endDate))).format("DD/MM/YYYY")}</p>
                <img src={cards[selectedCard]} alt={name} draggable={false} />
              </div>
              <div className={classes.cardDesignImages}>
                {cards.map((img, ind) => (
                  <img
                    className={classNames(classes.cardDesignImage, ind === selectedCard && "active")}
                    src={img}
                    alt="card-image"
                    key={ind}
                    draggable={false}
                    onClick={() => handleCardDesignClick(ind)}
                  />
                ))}
              </div>
            </div>
            <div className={classes.rightSide}>
              <Formik
                initialValues={{
                  monto: 0,
                  name: "",
                  email: "",
                  celular: "",
                  isGift: false,
                  isScheduled: false,
                  para: "",
                  friendEmail: "",
                  mensaje: "",
                  accept: false,
                }}
                validationSchema={getValidationSchema()}
                onSubmit={handleSubmit}
              >
                {({ errors, touched, values, isValid, setFieldValue, handleChange, setFieldTouched }) => {
                  useEffect(() => {
                    setFieldTouched("isGift", true);
                  }, []);
                  return (
                    <Form>
                      <div className={classes.prices}>
                        {amountsFixed?.map((ele, ind) => (
                          <Button
                            key={ind}
                            className={classNames(classes.price, ele == values.monto && "active")}
                            name="monto"
                            onClick={() => {
                              setFieldValue("monto", ele);
                            }}
                          >
                            ${ele}
                          </Button>
                        ))}
                      </div>
                      {!amountsRange && (
                        <ErrorMessage
                          component="p"
                          name="monto"
                          style={{ color: "#BD2B46", fontSize: 12, paddingLeft: 20, margin: 0 }}
                        />
                      )}
                      {amountsRange && (
                        <>
                          <h6>Selecciona un monto</h6>
                          <CustomOutlinedInput
                            size="small"
                            type="number"
                            value={values.monto}
                            name="monto"
                            label="Monto *"
                            info={`De $${amountsRange ? amountsRange.minAmount : 0} hasta $${
                              amountsRange ? amountsRange.maxAmount : 0
                            }`}
                            onChange={(e) => {
                              const { value } = e.target;
                              // if (amountsRange.minAmount >= value) {
                              //   return setFieldValue("monto", amountsRange.minAmount);
                              // }
                              if (amountsRange.maxAmount <= Number(value)) {
                                return setFieldValue("monto", amountsRange.maxAmount);
                              }
                              setFieldValue("monto", value);
                            }}
                            error={touched.monto && errors.monto}
                            block
                          />
                        </>
                      )}
                      <h6>Información personal</h6>
                      <CustomOutlinedInput
                        size="small"
                        type="text"
                        value={values.name}
                        name="name"
                        label="Nombre y apellido *"
                        error={touched.name && errors.name}
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
                        maxLength={60}
                        block
                      />
                      <Field type="text" id="celular" name="celular">
                        {({ field }) => (
                          <MuiPhoneNumber
                            {...field}
                            size="small"
                            label="Celular *"
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
                      <Field type="checkbox" id="isGift" name="isGift">
                        {({ field }) => (
                          <FormControlLabel
                            className={classes.label}
                            checked={values.isGift}
                            control={
                              <Checkbox
                                color="primary"
                                size="small"
                                onChange={(e) => {
                                  handleChange(e);
                                  setFlag(e.target.checked);
                                }}
                              />
                            }
                            label="Quiero enviar esta tarjeta como regalo"
                            {...field}
                          />
                        )}
                      </Field>
                      {values.isGift && (
                        <>
                          <h6>Datos destinatario</h6>
                          <CustomOutlinedInput
                            size="small"
                            type="text"
                            label="Para *"
                            value={values.para}
                            name="para"
                            error={touched.para && errors.para}
                            maxLength={60}
                            block
                          />
                          <CustomOutlinedInput
                            size="small"
                            type="text"
                            label="Correo destinatario *"
                            value={values.friendEmail}
                            name="friendEmail"
                            maxLength={60}
                            error={touched.friendEmail && errors.friendEmail}
                            block
                          />
                          <CustomOutlinedInput
                            size="small"
                            // type="text"
                            label="Mensaje personal (opcional)"
                            value={values.mensaje}
                            name="mensaje"
                            error={touched.mensaje && errors.mensaje}
                            block
                            maxLength={500}
                            rows={6}
                            multiline
                          />
                          <hr />
                          <h6>Entrega</h6>
                          <Field type="radio" name="isScheduled" value={values.isScheduled}>
                            {({ field }) => (
                              <RadioGroup {...field} name={name} value={values.isScheduled}>
                                <FormControlLabel
                                  className={classes.label}
                                  value={false}
                                  control={
                                    <Radio
                                      color="primary"
                                      size="small"
                                      onChange={() => {
                                        setFieldValue("isScheduled", false);
                                      }}
                                    />
                                  }
                                  label={"Enviar ahora"}
                                />
                                <FormControlLabel
                                  className={classes.label}
                                  value={true}
                                  control={
                                    <Radio
                                      color="primary"
                                      size="small"
                                      onChange={() => {
                                        setFieldValue("isScheduled", true);
                                      }}
                                    />
                                  }
                                  label={"Agendar envio"}
                                />
                              </RadioGroup>
                            )}
                          </Field>
                          {values.isScheduled && (
                            <Field type="text" name="scheduledDate" value={values.scheduledDate}>
                              {({ field }) => (
                                <MuiPickersUtilsProvider utils={DateFnsUtils} locale={esLocale}>
                                  <DateTimePicker
                                    {...field}
                                    style={{ width: "100%" }}
                                    label="Selecciona una fecha."
                                    format="yyyy-MM-dd hh:mm:ss"
                                    ampm={false}
                                    autoOk
                                    disablePast={true}
                                    inputVariant="outlined"
                                    margin="dense"
                                    value={values.scheduledDate}
                                    onChange={(date) => {
                                      setFieldValue("scheduledDate", new Date(date).getTime());
                                    }}
                                  />
                                </MuiPickersUtilsProvider>
                              )}
                            </Field>
                          )}
                        </>
                      )}
                      <br />
                      <br />
                      <hr />
                      <Field type="checkbox" id="accept" name="accept">
                        {({ field }) => (
                          <FormControlLabel
                            className={classes.label}
                            checked={values.accept}
                            control={
                              <Checkbox
                                color="primary"
                                size="small"
                                onChange={(e) => {
                                  handleChange(e);
                                }}
                              />
                            }
                            label="Acepto"
                            {...field}
                          />
                        )}
                      </Field>
                      <a className={classes.terms} onClick={() => setOpenModal(true)}>
                        Condiciones de uso
                      </a>
                      <ErrorMessage
                        component="p"
                        name="accept"
                        style={{ color: "#BD2B46", fontSize: 12, paddingLeft: 20, margin: 0 }}
                      />
                      <br />
                      <Button color="primary" block type="submit" disabled={!isValid}>
                        CONTINUAR
                      </Button>
                      <Link to={homeUrl}>
                        <p className={classes.submitText}>Regresar a tarjetas</p>
                      </Link>
                    </Form>
                  );
                }}
              </Formik>
            </div>
          </div>
          <TermsOfUseModal open={openModal} onClose={() => setOpenModal(false)} />
        </>
      )}
    </div>
  );
};
export default ProductDetails;
