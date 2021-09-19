import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate, Link } from "react-router-dom";
import classNames from 'classnames';
import moment from 'moment';
import { Form, Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import { getCardDetail } from "redux/actions/home";

import { useMediaQuery, useTheme } from "@material-ui/core";

// import GridItem from "../../components/Grid/GridItem";
// import GridContainer from "../../components/Grid/GridContainer";
import Button from "components/CustomButtons/Button";
// import CustomInput from "components/CustomInput/CustomInput";
import CustomOutlinedInput from "components/CustomOutlinedInput/CustomOutlinedInput";
// import { validationSchema } from "utils";
import { addOrder } from "redux/actions/cart";

import Bg1 from "assets/img/Bg1.png";
import Bg4 from "assets/img/Bg4.png";
import Bg5 from "assets/img/Bg5.png";
import Bg3 from "assets/img/Bg3.png";
import Bg2 from "assets/img/Bg2.png";

const cards = [
  {
    id: "1",
    name: "Nutrisa",
    valid: "Válido hasta el 30/12/2021",
    image: Bg1,
  },
  {
    id: "2",
    name: "Nutrisa",
    valid: "Válido hasta el 30/12/2021",
    image: Bg4,
  },
  {
    id: "3",
    name: "Nutrisa",
    valid: "Válido hasta el 30/12/2021",
    image: Bg2,
  },
  {
    id: "4",
    name: "Nutrisa",
    valid: "Válido hasta el 30/12/2021",
    image: Bg3,
  },
  {
    id: "5",
    name: "Nutrisa",
    valid: "Válido hasta el 30/12/2021",
    image: Bg5,
  },
  {
    id: "6",
    name: "Nutrisa",
    valid: "Válido hasta el 30/12/2021",
    image: Bg4,
  },
];

import useStyles from "./style";

const ProductDetails = () => {
  const classes = useStyles();
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const detail = useSelector((state) => state.home.filteredCards);
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [selectedCard, setSelectedCard] = useState(cards[0]);
  const [flag, setFlag] = useState(false);

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
    dispatch(getCardDetail(id));
    console.log(isMobile)
  }, [id]);

  const results = detail.filter((ele) => {
    return ele.id === id;
  });

  if (!results || results.length === 0) {
    return null;
  }

  const { name, description, image, amountsFixed, amountsRange, validity } = results[0];


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
          <p>Válido hasta el {moment(new Date(Number(validity.endDate))).format('DD/MM/YYYY')}</p>
        </div>
      </div>
      <div className={classes.description}>
        <p className={classes.leftPara}>{description}</p>
        <p className={classes.rightPara}>
          <span>Vigencia: {validity ? validity.description : ""}</span>
          <span>
            <a className={classes.link}>Condiciones de uso</a>
          </span>
        </p>
      </div>
      <hr className={classes.divider} style={{ margin: "5px 15px" }} />
      <div className={classes.pBody}>
        <div className={classes.leftSide}>
          {/* <hr className={classes.divider} /> */}
          <h6 style={{ marginLeft: 10 }}>Selecciona diseño</h6>
          <div className={classes.cardDesign}>
            <h5 className="title">{selectedCard.name}</h5>
            <p className="validDate">{selectedCard.valid}</p>
            <img src={selectedCard.image} alt={selectedCard.name} draggable={false} />
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
              friendGift: false,
              para: "",
              friendEmail: "",
              mensaje: "",
              accept: false,
            }}
            validationSchema={getValidationSchema()}
            onSubmit={handleSubmit}
          >
            {({ errors, touched, values, isValid, setFieldValue, handleChange }) => (
              <Form>
                <div className={classes.prices}>
                  {amountsFixed?.map((ele, ind) => (
                    <Button key={ind} className={classNames(classes.price, ele == values.monto && 'active')} name="monto" onClick={handleMontoClick(ele, setFieldValue)}>
                      ${ele}
                    </Button>
                  ))}
                </div>
                {amountsRange && <CustomOutlinedInput
                  size="small"
                  type="number"
                  placeholder="Monto"
                  value={values.monto}
                  name="monto"
                  label="Selecciona un monto"
                  info={`De $${amountsRange ? amountsRange.minAmount : 0} hasta $${amountsRange ? amountsRange.maxAmount : 0}`}
                  error={touched.monto && errors.monto}
                  block
                />}
                <CustomOutlinedInput
                  size="small"
                  type="text"
                  placeholder="Nombre y apellido"
                  value={values.name}
                  name="name"
                  label="Información personal"
                  error={touched.name && errors.name}
                  block
                />
                <CustomOutlinedInput
                  size="small"
                  type="text"
                  placeholder="Email"
                  value={values.email}
                  name="email"
                  error={touched.email && errors.email}
                  block
                />
                <CustomOutlinedInput
                  size="small"
                  type="text"
                  placeholder="Celular"
                  value={values.celular}
                  name="celular"
                  error={touched.celular && errors.celular}
                  block
                />

                <Field type="checkbox" id="friendGift" name="friendGift" onChange={(e) => {
                  handleChange(e)
                  setFlag(e.target.checked);
                }} />
                <label className={classes.label} htmlFor="friendGift">Quiero enviar esta tarjeta como regalo</label>
                {values.friendGift && (
                  <>
                    <CustomOutlinedInput
                      size="small"
                      type="text"
                      placeholder="Para"
                      label="Datos destinatario"
                      value={values.para}
                      name="para"
                      error={touched.para && errors.para}
                      block
                    />
                    <CustomOutlinedInput
                      size="small"
                      type="text"
                      placeholder="Correo destinatario"
                      value={values.friendEmail}
                      name="friendEmail"
                      error={touched.friendEmail && errors.friendEmail}
                      block
                    />
                    <CustomOutlinedInput
                      size="small"
                      // type="text"
                      placeholder="Mensaje personal (opcional)"
                      value={values.mensaje}
                      name="mensaje"
                      error={touched.mensaje && errors.mensaje}
                      block
                      rows={6}
                      multiline
                    />
                    <hr />
                    <h6>Entrega</h6>
                    <input type="radio" id="gift1" name="gift" />{" "}
                    <label htmlFor="gift1">Enviar ahora</label>
                    <br />
                    <input type="radio" id="gift2" name="gift" />{" "}
                    <label htmlFor="gift2">Agendar envio</label>
                  </>
                )}
                <br />
                <br />
                <hr />
                <Field type="checkbox" id="accept" name="accept" />
                <label className={classes.label} htmlFor="accept">
                  Acepto
                </label> <a style={{ fontSize: 13 }}>Condiciones de uso</a>
                <ErrorMessage
                  component="p"
                  name="accept"
                  style={{ color: "red" }}
                />
                <br />
                <Button color="primary" block type="submit" disabled={!isValid}>
                  CONTINUAR
                </Button>
                <Link to="/">
                  <p className={classes.submitText}>Regresar a tarjetas</p>
                </Link>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};
export default ProductDetails;
