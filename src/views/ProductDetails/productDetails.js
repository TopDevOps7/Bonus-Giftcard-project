import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate, Link } from "react-router-dom";
import classNames from "classnames";
import _ from "lodash";
import { Form, Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import { getCardDetail } from "redux/actions/home";

import { css } from "@emotion/react";
import PulseLoader from "react-spinners/PulseLoader";

import { Checkbox, FormControlLabel } from "@material-ui/core";
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import esLocale from "date-fns/locale/es";
import MuiPhoneNumber from "components/material-ui-phone-input";
import Button from "components/CustomButtons/Button";
import Button_ from "components/CustomButtons/Button_";
import CustomOutlinedInput from "components/CustomOutlinedInput/CustomOutlinedInput";
import TermsOfUseModal from "components/TermsOfUseModal/TermsOfUseModal";
import LocationModal from "components/TermsOfUseModal/LocationModal";
import { addOrder } from "redux/actions/cart";

import useStyles from "./style";

const override = css`
  display: block;
  margin: 100px auto;
`;

const ProductDetails = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id, partnerId } = useParams();
  const loading = useSelector(({ home }) => home.loading);
  const cardDetail = useSelector(({ home }) => home.card);
  const cardsDesign = useSelector(({ home }) => home.cardsDesign);
  const [card, setCard] = useState({});
  const [selectedCard, setSelectedCard] = useState("");
  const [amountDescription, setAmountDescription] = useState("");
  const [selectedAmount, setSelectedAmount] = useState(-1);
  const [selectedCardNum, setSelectedCardNum] = useState(0);
  const [flag, setFlag] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openModal_, setOpenModal_] = useState(false);

  const handleCardDesignClick = (item, ind) => {
    setSelectedCard(item);
    setSelectedCardNum(ind);
  };

  const handleIsGiftClick = (flag) => {
    setFlag(flag);
    const timer = setTimeout(() => {
      flag && document.getElementById("para-button").focus();
    }, 10);
    return () => clearTimeout(timer);
  };

  const handleSubmit = async (values) => {
    const { monto, para, celular, friendEmail, mensaje, isGift } = values;

    let s = celular;
    let s1 = s.substr(4, 3);
    let s2 = s.substr(8, 3);
    let s3 = s.substr(12, 4);
    let phone = "";
    s != "" ? (s == "+52" ? (phone = "") : (phone = "52" + s1 + s2 + s3)) : (phone = "");

    let discountAmount = 0;
    let discountType = "";
    card.discount && ((discountAmount = card.discount.amount), (discountType = card.discount.type));
    discountType == "amount" && (discountAmount = card.discount.amount / 100);

    const data = {
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
      amount: monto * 100,
      discountAmount,
      discountType,
      selectedAmount,
      description: amountDescription,
      style: selectedCard,
      isScheduled: false,
      scheduledDate: null,
      isGift,
      toName: para ?? null,
      toEmail: friendEmail ?? null,
      toMessage: mensaje ?? null,
      toPhone: phone ?? null,
    };

    let amountsFixedFlag = false;
    amountsFixed.map((item) => {
      monto == item.amount / 100 && (amountsFixedFlag = true);
    });
    amountsFixedFlag == false && (data.description = "");

    flag == false && ((data.toName = ""), (data.toEmail = ""), (data.toMessage = ""), (data.toPhone = ""));

    cardsDesign && cardsDesign.length != 0 && selectedCard == "" && (data.style = cardsDesign[selectedCardNum].name);
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
  }, [id]);

  const { name, description, locations, terms, image, imageDetail, amountsFixed, amountsRange, validity } = card;

  let homeUrl = "/";
  if (partnerId) {
    homeUrl += partnerId;
  }

  const getValidationSchema = () => {
    let validation;
    let amountsFixed_ = [];

    amountsFixed.map((item) => {
      amountsFixed_.push(item.amount / 100);
    });

    if (amountsFixed_?.length) {
      validation = {
        ...validation,
        monto: Yup.number()
          .integer()
          .oneOf(amountsFixed_, "El importe es un campo obligatorio.")
          .required("El importe es un campo obligatorio."),
      };
    }

    if (amountsRange) {
      validation = {
        ...validation,
        monto: Yup.number()
          .integer("monto no puede contener decimales")
          .min(amountsRange.minAmount / 100, `La cantidad debe ser mayor o igual a ${amountsRange.minAmount / 100}.`)
          .max(amountsRange.maxAmount / 100)
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
        celular: Yup.string().test("len", "El Celular debe ser válido.", (val) => !val || val.length == 3 || val.length == 16),
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
          <img className={classes.background} src={imageDetail ? imageDetail : image} style={{ width: "100%" }} />
          {card.discount && (
            <div className={classes.discount}>
              <div className={classes.discount_div} dangerouslySetInnerHTML={{ __html: card.discount.legend }}></div>
              <div className={classes.sub_discount}></div>
            </div>
          )}
          <div className={classes.header}>
            <div className={classes.leftTitle}>
              <h3>{name}</h3>
            </div>
            <div className={classes.rightTitle}>
              <h3>{`$${amountsRange ? amountsRange.minAmount / 100 : amountsFixed[0].amount / 100} - $${
                amountsRange ? amountsRange.maxAmount / 100 : amountsFixed[amountsFixed.length - 1].amount / 100
              }`}</h3>
            </div>
          </div>
          <div className={classes.description}>
            <p className={classes.leftPara}>
              <div dangerouslySetInnerHTML={{ __html: description }} />
            </p>
            {locations ? (
              <p className={classes.rightPara}>
                <span>Vigencia: {validity ? validity.description : ""}</span>
                <span>
                  <a className={classes.terms} onClick={() => setOpenModal_(true)}>
                    Ver ubicaciones
                  </a>
                </span>
              </p>
            ) : (
              <p className={classes.rightPara_}>
                <span>Vigencia: {validity ? validity.description : ""}</span>
              </p>
            )}
          </div>
          <hr className={classes.divider} style={{ margin: "5px 15px" }} />
          <div className={classes.pBody}>
            <div className={classes.leftSide}>
              {/* <hr className={classes.divider} /> */}
              <h6 style={{ marginLeft: 10 }}>Selecciona diseño</h6>
              <div className={classes.cardDesign}>
                <h5 className="title">{name}</h5>
                <img
                  src={cardsDesign && cardsDesign.length != 0 && cardsDesign[selectedCardNum].path}
                  alt={name}
                  draggable={false}
                />
              </div>
              <div className={classes.cardDesignImages}>
                {cardsDesign &&
                  cardsDesign.length != 0 &&
                  cardsDesign.map((img, ind) => (
                    <img
                      className={classNames(classes.cardDesignImage, ind === selectedCardNum && "active")}
                      src={img.path}
                      alt="card-image"
                      key={ind}
                      draggable={false}
                      onClick={() => handleCardDesignClick(img.name, ind)}
                    />
                  ))}
              </div>
            </div>
            <div className={classes.rightSide}>
              <Formik
                initialValues={{
                  monto: 0,
                  isGift: false,
                  isScheduled: false,
                  para: "",
                  celular: "",
                  friendEmail: "",
                  mensaje: "",
                }}
                validationSchema={getValidationSchema()}
                onSubmit={handleSubmit}
              >
                {({ errors, touched, values, setFieldValue, handleChange }) => {
                  return (
                    <Form>
                      <div className={classes.prices}>
                        {amountsFixed?.map((ele, ind) => (
                          <Button_
                            key={ind}
                            className={classNames(
                              classes.price,
                              (amountsRange ? ele.amount / 100 == values.monto : selectedAmount == ind) && classes.price_active
                            )}
                            name="monto"
                            onClick={() => {
                              setFieldValue("monto", ele.amount / 100);
                              setAmountDescription(ele.description ? ele.description : "");
                              setSelectedAmount(ind);
                            }}
                          >
                            {ele.description ? ele.description : ""}
                            {ele.description ? <br /> : ""}${ele.amount / 100}
                          </Button_>
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
                            info={`De $${amountsRange ? amountsRange.minAmount / 100 : 0} hasta $${
                              amountsRange ? amountsRange.maxAmount / 100 : 0
                            }`}
                            onChange={(e) => {
                              const { value } = e.target;
                              if (amountsRange.maxAmount / 100 <= Number(value)) {
                                return setFieldValue("monto", amountsRange.maxAmount / 100);
                              }
                              setFieldValue("monto", value);
                            }}
                            error={touched.monto && errors.monto}
                            block
                          />
                        </>
                      )}
                      {card.discount && (
                        <div>
                          {card.discount.type == "amount" ? (
                            <div className={classes.pink_area}>
                              a pagar: ${values.monto != 0 ? values.monto - card.discount.amount / 100 : 0} (-$
                              {card.discount.amount / 100})
                            </div>
                          ) : (
                            <div className={classes.pink_area}>
                              a pagar: ${values.monto - (values.monto / 100) * card.discount.amount} (-{card.discount.amount}%)
                            </div>
                          )}
                        </div>
                      )}
                      <h6>¿Es regalo?</h6>
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
                                  handleIsGiftClick(e.target.checked);
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
                            id="outlined-para-input"
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
                          <Field type="text" id="celular" name="celular">
                            {({ field }) => (
                              <MuiPhoneNumber
                                {...field}
                                size="small"
                                label="Mandar la tarjeta por Whatsapp"
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
                          <CustomOutlinedInput
                            size="small"
                            label="Mensaje personal (opcional)"
                            value={values.mensaje}
                            name="mensaje"
                            error={touched.mensaje && errors.mensaje}
                            block
                            maxLength={500}
                            rows={6}
                            multiline
                          />
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
                      <br />
                      <Button
                        id="para-button"
                        color="primary"
                        block
                        type="submit"
                        disabled={
                          flag
                            ? errors.monto == undefined &&
                              errors.para == undefined &&
                              errors.friendEmail == undefined &&
                              errors.celular == undefined &&
                              errors.mensaje == undefined
                              ? false
                              : true
                            : errors.monto == undefined && values.monto > 0
                            ? false
                            : true
                        }
                        onClick={() => sessionStorage.setItem("session", "cart")}
                      >
                        CONTINUAR
                      </Button>
                      <br />
                      <div className={classes.label_top}>
                        <span className={classes.label_}>Al dar click aquí acepto los</span>
                        <a
                          className={classes.terms}
                          onClick={() => {
                            setOpenModal(true);
                          }}
                        >
                          Términos y condiciones
                        </a>
                      </div>
                      <Link to={homeUrl}>
                        <p className={classes.submitText}>Regresar a tarjetas</p>
                      </Link>
                    </Form>
                  );
                }}
              </Formik>
            </div>
          </div>
          <TermsOfUseModal open={openModal} onClose={() => setOpenModal(false)} content={terms} />
          <LocationModal open={openModal_} onClose={() => setOpenModal_(false)} content={locations} />
        </>
      )}
    </div>
  );
};
export default ProductDetails;
