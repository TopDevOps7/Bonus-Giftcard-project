import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate, Link } from "react-router-dom";
import classNames from 'classnames';
import moment from 'moment';
import { Form, Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import { getCardDetail } from "redux/actions/home";

import { useMediaQuery, useTheme, Checkbox, FormControlLabel, RadioGroup, Radio } from "@material-ui/core";
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';

// import GridItem from "../../components/Grid/GridItem";
// import GridContainer from "../../components/Grid/GridContainer";
import Button from "components/CustomButtons/Button";
// import CustomInput from "components/CustomInput/CustomInput";
import CustomOutlinedInput from "components/CustomOutlinedInput/CustomOutlinedInput";
import TermsOfUseModal from "components/TermsOfUseModal/TermsOfUseModal";
// import { validationSchema } from "utils";
import { addOrder } from "redux/actions/cart";

import Bg1 from "assets/img/Bg1.png";
import Bg2 from "assets/img/Bg2.png";
import Bg3 from "assets/img/Bg3.png";
import Bg4 from "assets/img/Bg4.png";
import Bg5 from "assets/img/Bg5.svg";
import Bg6 from "assets/img/Bg6.png";
import Bg7 from "assets/img/Bg7.png";
import Bg8 from "assets/img/Bg8.png";

const cards = [
  {
    id: "1",
    image: Bg1,
  },
  {
    id: "2",
    image: Bg2,
  },
  {
    id: "3",
    image: Bg3,
  },
  {
    id: "4",
    image: Bg4,
  },
  {
    id: "5",
    image: Bg5,
  },
  {
    id: "6",
    image: Bg6,
  },
  {
    id: "7",
    image: Bg7,
  },
  {
    id: "8",
    image: Bg8,
  },
];

import useStyles from "./style";

const ProductDetails = () => {
  const classes = useStyles();
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const cardDetail = useSelector((state) => state.home.card);
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [selectedCard, setSelectedCard] = useState(cards[0]);
  const [flag, setFlag] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const handleCardDesignClick = (item) => {
    setSelectedCard(item);
    console.log(cards)
  }


  const handleSubmit = async (values) => {
    values.image = image;
    values.cardImage = selectedCard.image;
    values.nameGift = name;
    values.description = description;
    values.id = id;
    values.amount = 1;
    values.valid = selectedCard.valid;
    dispatch(addOrder(values));
    navigate("/cart");
  }

  const handleMontoClick = (value, setFieldValue) => () => {
    setFieldValue("monto", value, false);
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    dispatch(getCardDetail(id));
    console.log(isMobile);
  }, [id]);

  // if (!cardDetail || Object.keys(cardDetail).length === 0) {
  //   navigate("/");
  // }

  const { name, description, image, amountsFixed, amountsRange, validity } = cardDetail;

  const getValidationSchema = () => {

    let validation = {
      name: Yup.string().max(60).required(),
      email: Yup.string().email().max(60).required(),
      celular: Yup.string().max(10).required(),
      accept: Yup.bool().oneOf([true], "Tienes que aceptar los términos de uso."),
    };
    if (amountsRange) {
      validation = {
        ...validation,
        monto: Yup.number().integer().min(amountsRange.minAmount).max(amountsRange.maxAmount).required(),
      }
    }

    if (flag) {
      validation = {
        ...validation,
        para: Yup.string().max(60).required(),
        friendEmail: Yup.string().email().max(60).required(),
        mensaje: Yup.string().max(500),
      }
    }

    return Yup.object(validation);
  }

  return (
    <div className={classNames('cardBanner', classes.root)}>
      <div
        className={classes.background}
        style={{ backgroundImage: `url(${image})` }}
      >
        {/* <img src={image} style={{ width: "100%" }} /> */}
      </div>
      <div className={classes.header}>
        <div className={classes.leftTitle}>
          <h3>{name}</h3>
        </div>
        <div className={classes.rightTitle}>
          <h3>{`$${amountsRange ? amountsRange.minAmount : 0} - $${amountsRange ? amountsRange.maxAmount : 0}`}</h3>
          <p>Válido hasta el {moment(new Date(Number(validity?.endDate))).format('DD/MM/YYYY')}</p>
        </div>
      </div>
      <div className={classes.description}>
        <p className={classes.leftPara}>{description}</p>
        <p className={classes.rightPara}>
          <span>Vigencia: {validity ? validity.description : ""}</span>
          <span>
            <a className={classes.terms} onClick={() => setOpenModal(true)}>Condiciones de uso</a>
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
            <p className="validDate">Válido hasta el {moment(new Date(Number(validity?.endDate))).format('DD/MM/YYYY')}</p>
            <img src={selectedCard.image} alt={name} draggable={false} />
          </div>
          <div className={classes.cardDesignImages}>
            {cards.map((item, ind) =>
              <img
                className={classNames(classes.cardDesignImage, (item.id === selectedCard.id) && 'active')}
                src={item.image}
                alt={item.name}
                key={ind}
                draggable={false}
                onClick={() => handleCardDesignClick(item)}
              />
            )}
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
              }, [])
              return (
                <Form>
                  <div className={classes.prices}>
                    {amountsFixed?.map((ele, ind) => (
                      <Button key={ind} className={classNames(classes.price, ele == values.monto && 'active')} name="monto" onClick={handleMontoClick(ele, setFieldValue)}>
                        ${ele}
                      </Button>
                    ))}
                  </div>
                  {amountsRange && <>
                    <h6>Selecciona un monto</h6>
                    <CustomOutlinedInput
                      size="small"
                      type="number"
                      value={values.monto}
                      name="monto"
                      label="Monto *"
                      info={`De $${amountsRange ? amountsRange.minAmount : 0} hasta $${amountsRange ? amountsRange.maxAmount : 0}`}
                      error={touched.monto && errors.monto}
                      block
                    />
                  </>}
                  <h6>Información personal</h6>
                  <CustomOutlinedInput
                    size="small"
                    type="text"
                    value={values.name}
                    name="name"
                    label="Nombre y apellido *"
                    error={touched.name && errors.name}
                    block
                  />
                  <CustomOutlinedInput
                    size="small"
                    type="text"
                    label="Email *"
                    value={values.email}
                    name="email"
                    error={touched.email && errors.email}
                    block
                  />
                  <CustomOutlinedInput
                    size="small"
                    type="text"
                    label="Celular *"
                    value={values.celular}
                    name="celular"
                    error={touched.celular && errors.celular}
                    block
                  />

                  <Field type="checkbox" id="isGift" name="isGift">
                    {({ field }) => (
                      <FormControlLabel
                        className={classes.label}
                        checked={values.isGift}
                        control={<Checkbox color="primary" size="small" onChange={(e) => {
                          handleChange(e)
                          setFlag(e.target.checked);
                        }} />}
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
                        block
                      />
                      <CustomOutlinedInput
                        size="small"
                        type="text"
                        label="Correo destinatario *"
                        value={values.friendEmail}
                        name="friendEmail"
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
                              value={false} control={<Radio
                                color="primary"
                                size="small"
                                onChange={() => {
                                  setFieldValue('isScheduled', false);
                                }}
                              />} label={"Enviar ahora"} />
                            <FormControlLabel
                              className={classes.label}
                              value={true} control={<Radio
                                color="primary"
                                size="small"
                                onChange={() => {
                                  setFieldValue('isScheduled', true);
                                }} />} label={"Agendar envio"} />
                          </RadioGroup>
                        )}
                      </Field>
                      {values.isScheduled && (
                        <Field type="text" name="scheduledDate" value={values.scheduledDate}>
                          {({ field }) => (
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                              <DateTimePicker
                                {...field}
                                style={{ width: "100%" }}
                                label="Select a date."
                                format="yyyy-MM-dd hh:mm:ss"
                                ampm={false}
                                autoOk
                                disablePast={true}
                                inputVariant="outlined"
                                margin="dense"
                                value={values.scheduledDate}
                                onChange={(date) => {
                                  setFieldValue('scheduledDate', new Date(date).getTime())
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
                        control={<Checkbox color="primary" size="small" onChange={(e) => {
                          handleChange(e)
                        }} />}
                        label="Acepto"
                        {...field}
                      />
                    )}
                  </Field><a className={classes.terms} onClick={() => setOpenModal(true)}>Condiciones de uso</a>
                  <ErrorMessage
                    component="p"
                    name="accept"
                    style={{ color: "#BD2B46", fontSize: 12, paddingLeft: 20, margin: 0 }}
                  />
                  <br />
                  <Button color="primary" block type="submit" disabled={!isValid}>
                    CONTINUAR
                  </Button>
                  <Link to="/">
                    <p className={classes.submitText}>Regresar a tarjetas</p>
                  </Link>
                </Form>
              )
            }}
          </Formik>
        </div>
      </div>
      <TermsOfUseModal open={openModal} onClose={() => setOpenModal(false)} />
    </div>
  );
};
export default ProductDetails;
