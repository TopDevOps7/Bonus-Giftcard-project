import React, { Fragment, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";

import {
  useMediaQuery,
  useTheme,
  OutlinedInput,
  InputAdornment,
  InputLabel,
  FormControl,
  Select,
  Collapse,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { Edit, Search } from "@material-ui/icons";
import { Form, Formik, Field } from "formik";
import * as Yup from "yup";
import { createTheme, MuiThemeProvider } from "@material-ui/core/styles";
import CardPreviewModal from "components/CardPreviewModal/CardPreviewModal";
import DeleteConfirmModal from "components/DeleteConfirmModal/DeleteConfirmModal";
import { deleteOrder, editOrder, changeOrders } from "redux/actions/cart";
import useStyles from "./style";

import { filterStringName } from "../../constants";
import { filterStringEmail } from "../../constants";
import { filterStringMessage } from "../../constants";

const CartCard = ({ item, index, setUpdate }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const theme = useTheme();
  const { partnerId } = useParams();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [editable, setEditable] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [itm, setItm] = useState(item);
  const cardsDesign = useSelector(({ home }) => home.cardsDesign);
  let partner = useSelector(({ home }) => home.partner.configuration);
  let partnerIdOrders = useSelector(({ home }) => home.data[partnerId]);
  let orders = partnerIdOrders ? partnerIdOrders.orders : useSelector(({ home }) => home.data["noPartner"].orders);
  let couponResult = useSelector(({ home }) => home.coupon);

  JSON.parse(sessionStorage.getItem("partner")) && (partner = JSON.parse(sessionStorage.getItem("partner")).configuration);
  sessionStorage.setItem("orderCount", 0);
  sessionStorage.setItem("couponGiftcard", "false");

  const GetOrderCount = () => {
    let index = 0;

    if (couponResult.applyTo) {
      couponResult.applyTo == "all"
        ? sessionStorage.setItem("orderCount", orders.length)
        : (couponResult.giftcards.map((id) => {
            orders.map((order) => {
              order.giftcard.id == id && index++;
            });
            itm.giftcard.id == id && sessionStorage.setItem("couponGiftcard", "true");
          }),
          sessionStorage.setItem("orderCount", index));
    }

    console.log(couponResult, itm, Number(sessionStorage.getItem("orderCount")));
  };

  GetOrderCount();

  const isInteger = (n) => {
    return n === +n && n === (n | 0);
  };

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

  const onMouseOverLink = (e) => {
    e.target.style.color = partner.colors.linkHoover;
  };

  const onMouseLeaveLink = (e) => {
    e.target.style.color = "#248BDD";
  };

  const handleEditableClick = () => {
    setEditable(true);
  };

  const handleOpenModal = (e) => {
    e.preventDefault();
    setOpenModal(true);
  };

  const { amountsRange, amountsFixed } = itm.giftcard;

  const onSubmit = async (values) => {
    const { monto, montoRange, para, mensaje, friendEmail } = values;
    let monto_ = 0;
    let description = "";
    amountsRange
      ? (monto_ = montoRange * 100)
      : amountsFixed.map((el, ind) => {
          monto == ind && ((monto_ = el.amount), (description = el.description));
        });

    if (itm.isGift) {
      (orders[index].amount != monto_ ||
        orders[index].toName != para ||
        orders[index].toEmail != friendEmail ||
        orders[index].toMessage != mensaje) &&
        (dispatch(
          editOrder(
            {
              index,
              order: {
                ...itm,
                description,
                selectedAmount: monto,
                amount: monto_,
                toName: para,
                toEmail: friendEmail,
                toMessage: mensaje,
              },
            },
            partnerId
          )
        ),
        dispatch(changeOrders(true)));
    } else {
      orders[index].amount != monto_ &&
        (dispatch(editOrder({ index, order: { ...itm, description, selectedAmount: monto, amount: monto_ } }, partnerId)),
        dispatch(changeOrders(true)));
    }
    setEditable(false);
    setUpdate();
  };

  const getValidationSchema = () => {
    let validation = {};
    if (amountsRange) {
      validation = {
        ...validation,
        montoRange: Yup.number()
          .integer()
          .min(amountsRange.minAmount / 100, `El monto debe ser mayor o igual que ${amountsRange.minAmount / 100}.`)
          .max(amountsRange.maxAmount / 100, `El monto debe ser menor o igual a ${amountsRange.maxAmount / 100}.`)
          .required(),
      };
    }
    if (itm.isGift) {
      validation = {
        ...validation,
        para: Yup.string().max(60).required("El nombre Para quien no puede estar vacío"),
        friendEmail: Yup.string()
          .email("El email debe ser válido.")
          .max(60)
          .required("El correo del destinatorio no puede estar vacío."),
        mensaje: Yup.string().max(500),
      };
    }
    if (editable) {
      return Yup.object(validation);
    }
    return Yup.object({});
  };

  useEffect(() => {
    setItm(item);
  }, [item]);

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

  const handleChangeMessage = (e) => {
    let targetStr = e.currentTarget.value;

    for (let j = 0; j < targetStr.length; j++) {
      let target = targetStr.slice(j, j + 1);
      for (let i = 0; i < filterStringMessage.length; i++) {
        let result = filterStringMessage.slice(i, i + 1);
        if (target == result) {
          e.currentTarget.value = e.currentTarget.value.replace(target, "");
          e.preventDefault();
        }
      }
    }
  };

  return (
    <Formik
      initialValues={{
        monto: itm.selectedAmount,
        montoRange: itm.amount / 100,
        para: itm.toName,
        friendEmail: itm.toEmail,
        mensaje: itm.toMessage,
      }}
      validationSchema={getValidationSchema()}
      onSubmit={onSubmit}
    >
      {({ touched, errors, values, handleChange, handleSubmit }) => (
        <Form>
          <div className={classes.alert}>
            <Collapse in={Boolean(Object.keys(errors).length)}>
              <Alert severity="error">
                <ul>
                  {Object.keys(errors).map((err, ind) => (
                    <li key={ind}>{errors[err]}</li>
                  ))}
                </ul>
              </Alert>
            </Collapse>
          </div>
          <div className={classes.root}>
            <div className={classes.imageContainer}>
              {cardsDesign &&
                cardsDesign.length != 0 &&
                cardsDesign.map((card, ind) => (
                  <Fragment key={ind}>
                    {card.name == itm.cardsDesign.name && (
                      <img
                        src={cardsDesign && cardsDesign.length != 0 && cardsDesign[ind].path}
                        rel="nofollow"
                        alt="Card image cap"
                        className={classes.image}
                        draggable={false}
                      />
                    )}
                  </Fragment>
                ))}
              <a href="#" onClick={handleOpenModal}>
                <Search fontSize="small" /> Vista previa
              </a>
            </div>

            <div className={classes.infoContainer}>
              <p className={classes.title}>Tarjeta de regalo</p>
              <p className={classes.title}>{itm.giftcard.name}</p>
              {isMobile && (
                <div className={classes.amountContainer}>
                  {!editable && (
                    <>
                      {itm.discountType == "" ? (
                        <div className={classes.amountContainer_sub}>
                          <p className={classes.count}>Cant : 1 </p>
                          <p className={classes.price__}>${itm.amount / 100}</p>
                        </div>
                      ) : (
                        <div className={classes.amountContainer_sub}>
                          <p className={classes.count}>Cant : 1 </p>
                          <p className={classes.price}>${itm.amount / 100}</p>
                        </div>
                      )}
                      {itm.discountType == "amount" && itm.discountType != "" && (
                        <p className={classes.price_}>${itm.amount / 100 - itm.discountAmount}</p>
                      )}
                      {itm.discountType == "percent" && itm.discountType != "" && (
                        <p className={classes.price_}>${itm.amount / 100 - (itm.amount / 10000) * itm.discountAmount}</p>
                      )}
                    </>
                  )}
                  {editable && (
                    <>
                      <p className={classes.count}>Cant : 1 </p>
                      <MuiThemeProvider theme={theme_}>
                        <Field type="number" name="monto" id="monto" value={values.monto}>
                          {({ field }) => (
                            <>
                              {amountsFixed.length == 0 || amountsRange ? (
                                <OutlinedInput
                                  type="number"
                                  {...field}
                                  className={classes.priceInput}
                                  value={values.montoRange}
                                  error={touched.montoRange && Boolean(errors.montoRange)}
                                  name="montoRange"
                                  onChange={handleChange}
                                  startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                />
                              ) : (
                                <FormControl variant="outlined" style={{ marginTop: 0 }} margin="dense">
                                  <Select
                                    native
                                    {...field}
                                    className={classes.select}
                                    value={values.monto}
                                    onChange={handleChange}
                                    inputProps={{
                                      name: "monto",
                                      id: "outlined-monto-native-simple",
                                    }}
                                  >
                                    {amountsFixed.map((el, ind) => (
                                      <option value={ind} key={ind}>
                                        $ {el.amount / 100}{" "}
                                        {el.description != "" && el.description ? " ( " + el.description + " ) " : ""}
                                      </option>
                                    ))}
                                  </Select>
                                </FormControl>
                              )}
                            </>
                          )}
                        </Field>
                      </MuiThemeProvider>
                    </>
                  )}
                </div>
              )}
              {!editable && itm.isGift && (
                <>
                  {itm.toName && <p className={classes.descTitle}>Para: {itm.toName}</p>}
                  {itm.toEmail && <p className={classes.desc}>{itm.toEmail}</p>}
                  {itm.toMessage && <p className={classes.desc}>{itm.toMessage}</p>}
                </>
              )}
              {editable && itm.isGift && (
                <>
                  <MuiThemeProvider theme={theme_}>
                    <FormControl fullWidth variant="outlined" size="small" style={{ marginTop: 15 }}>
                      <InputLabel htmlFor="description-title">Destinatario *</InputLabel>
                      <Field type="text" name="para" id="para" value={values.para}>
                        {({ field }) => (
                          <OutlinedInput
                            {...field}
                            className={classes.descTitleEdit}
                            type="text"
                            id="description-title"
                            error={touched.para && Boolean(errors.para)}
                            value={values.para}
                            name="para"
                            onChange={(e) => {
                              handleChangeName(e);
                              handleChange(e);
                            }}
                            inputProps={{
                              maxLength: 60,
                            }}
                            labelWidth={100}
                          />
                        )}
                      </Field>
                    </FormControl>
                    <FormControl fullWidth variant="outlined" size="small" style={{ marginTop: 10 }}>
                      <InputLabel htmlFor="description-title">Email *</InputLabel>
                      <Field type="text" name="friendEmail" id="friendEmail" value={values.friendEmail}>
                        {({ field }) => (
                          <OutlinedInput
                            {...field}
                            className={classes.descTitleEdit}
                            type="text"
                            id="description-email"
                            error={touched.friendEmail && Boolean(errors.friendEmail)}
                            value={values.friendEmail}
                            name="friendEmail"
                            onChange={(e) => {
                              handleChangeEmail(e);
                              handleChange(e);
                            }}
                            inputProps={{
                              maxLength: 60,
                            }}
                            labelWidth={50}
                          />
                        )}
                      </Field>
                    </FormControl>
                    <FormControl fullWidth variant="outlined" size="small" style={{ marginTop: 10 }}>
                      <InputLabel htmlFor="description">Mensaje</InputLabel>
                      <Field type="text" name="mensaje" id="mensaje" value={values.mensaje}>
                        {({ field }) => (
                          <OutlinedInput
                            {...field}
                            className={classes.descEdit}
                            id="description"
                            multiline
                            rows={6}
                            error={touched.mensaje && Boolean(errors.mensaje)}
                            value={values.mensaje}
                            name="mensaje"
                            onChange={(e) => {
                              handleChangeMessage(e);
                              handleChange(e);
                            }}
                            inputProps={{
                              maxLength: 500,
                            }}
                            labelWidth={60}
                          />
                        )}
                      </Field>
                    </FormControl>
                  </MuiThemeProvider>
                </>
              )}
            </div>
            {!isMobile && (
              <div className={classes.amountContainer}>
                {!editable && (
                  <>
                    {itm.discountType == "" ? (
                      couponResult.applyTo ? (
                        couponResult.applyTo == "all" ? (
                          <div className={classes.amountContainer_sub}>
                            <p className={classes.count}>Cant : 1 </p>
                            <p className={classes.price}>${itm.amount / 100}</p>
                          </div>
                        ) : sessionStorage.getItem("couponGiftcard") == "true" ? (
                          <div className={classes.amountContainer_sub}>
                            <p className={classes.count}>Cant : 1 </p>
                            <p className={classes.price}>${itm.amount / 100}</p>
                          </div>
                        ) : (
                          <div className={classes.amountContainer_sub}>
                            <p className={classes.count}>Cant : 1 </p>
                            <p className={classes.price__}>${itm.amount / 100}</p>
                          </div>
                        )
                      ) : (
                        <div className={classes.amountContainer_sub}>
                          <p className={classes.count}>Cant : 1 </p>
                          <p className={classes.price__}>${itm.amount / 100}</p>
                        </div>
                      )
                    ) : (
                      <div className={classes.amountContainer_sub}>
                        <p className={classes.count}>Cant : 1 </p>
                        <p className={classes.price}>${itm.amount / 100}</p>
                      </div>
                    )}
                    {itm.discountType == "amount" && itm.discountType != "" && (
                      <p
                        className={
                          couponResult.type
                            ? couponResult.applyTo == "all"
                              ? classes.price
                              : couponResult.applyTo == "giftcards" && sessionStorage.getItem("couponGiftcard") == "true"
                              ? classes.price
                              : classes.price_
                            : classes.price_
                        }
                      >
                        ${itm.amount / 100 - itm.discountAmount}
                      </p>
                    )}
                    {itm.discountType == "percent" && itm.discountType != "" && (
                      <p
                        className={
                          couponResult.type
                            ? couponResult.applyTo == "all"
                              ? classes.price
                              : couponResult.applyTo == "giftcards" && sessionStorage.getItem("couponGiftcard") == "true"
                              ? classes.price
                              : classes.price_
                            : classes.price_
                        }
                      >
                        ${itm.amount / 100 - (itm.amount / 10000) * itm.discountAmount}
                      </p>
                    )}
                    {couponResult.type && couponResult.type == "amount" && couponResult.applyTo == "all" && (
                      <p className={classes.price_}>
                        $
                        {itm.discountType == "amount"
                          ? isInteger(
                              Number(
                                itm.amount / 100 -
                                  itm.discountAmount -
                                  couponResult.amount / 100 / Number(sessionStorage.getItem("orderCount"))
                              )
                            )
                            ? Number(
                                itm.amount / 100 -
                                  itm.discountAmount -
                                  couponResult.amount / 100 / Number(sessionStorage.getItem("orderCount"))
                              )
                            : Number(
                                itm.amount / 100 -
                                  itm.discountAmount -
                                  couponResult.amount / 100 / Number(sessionStorage.getItem("orderCount"))
                              ).toFixed(2)
                          : itm.discountType == "percent"
                          ? isInteger(
                              Number(
                                itm.amount / 100 -
                                  (itm.amount / 10000) * itm.discountAmount -
                                  couponResult.amount / 100 / Number(sessionStorage.getItem("orderCount"))
                              )
                            )
                            ? Number(
                                itm.amount / 100 -
                                  (itm.amount / 10000) * itm.discountAmount -
                                  couponResult.amount / 100 / Number(sessionStorage.getItem("orderCount"))
                              )
                            : Number(
                                itm.amount / 100 -
                                  (itm.amount / 10000) * itm.discountAmount -
                                  couponResult.amount / 100 / Number(sessionStorage.getItem("orderCount"))
                              ).toFixed(2)
                          : itm.discountType == "" &&
                            isInteger(
                              Number(itm.amount / 100 - couponResult.amount / 100 / Number(sessionStorage.getItem("orderCount")))
                            )
                          ? Number(itm.amount / 100 - couponResult.amount / 100 / Number(sessionStorage.getItem("orderCount")))
                          : Number(
                              itm.amount / 100 - couponResult.amount / 100 / Number(sessionStorage.getItem("orderCount"))
                            ).toFixed(2)}
                      </p>
                    )}
                    {couponResult.type &&
                      couponResult.type == "amount" &&
                      couponResult.applyTo == "giftcards" &&
                      sessionStorage.getItem("couponGiftcard") == "true" && (
                        <p className={classes.price_}>
                          $
                          {itm.discountType == "amount"
                            ? isInteger(
                                Number(
                                  itm.amount / 100 -
                                    itm.discountAmount -
                                    couponResult.amount / 100 / Number(sessionStorage.getItem("orderCount"))
                                )
                              )
                              ? Number(
                                  itm.amount / 100 -
                                    itm.discountAmount -
                                    couponResult.amount / 100 / Number(sessionStorage.getItem("orderCount"))
                                )
                              : Number(
                                  itm.amount / 100 -
                                    itm.discountAmount -
                                    couponResult.amount / 100 / Number(sessionStorage.getItem("orderCount"))
                                ).toFixed(2)
                            : itm.discountType == "percent"
                            ? isInteger(
                                Number(
                                  itm.amount / 100 -
                                    (itm.amount / 10000) * itm.discountAmount -
                                    couponResult.amount / 100 / Number(sessionStorage.getItem("orderCount"))
                                )
                              )
                              ? Number(
                                  itm.amount / 100 -
                                    (itm.amount / 10000) * itm.discountAmount -
                                    couponResult.amount / 100 / Number(sessionStorage.getItem("orderCount"))
                                )
                              : Number(
                                  itm.amount / 100 -
                                    (itm.amount / 10000) * itm.discountAmount -
                                    couponResult.amount / 100 / Number(sessionStorage.getItem("orderCount"))
                                ).toFixed(2)
                            : itm.discountType == "" &&
                              isInteger(
                                Number(
                                  itm.amount / 100 - couponResult.amount / 100 / Number(sessionStorage.getItem("orderCount"))
                                )
                              )
                            ? Number(itm.amount / 100 - couponResult.amount / 100 / Number(sessionStorage.getItem("orderCount")))
                            : Number(
                                itm.amount / 100 - couponResult.amount / 100 / Number(sessionStorage.getItem("orderCount"))
                              ).toFixed(2)}
                        </p>
                      )}
                    {couponResult.type && couponResult.type == "percent" && couponResult.applyTo == "all" && (
                      <p className={classes.price_}>
                        $
                        {itm.discountType == "amount"
                          ? isInteger(Number(((itm.amount / 100 - itm.discountAmount) * (100 - couponResult.amount)) / 100))
                            ? Number(((itm.amount / 100 - itm.discountAmount) * (100 - couponResult.amount)) / 100)
                            : Number(((itm.amount / 100 - itm.discountAmount) * (100 - couponResult.amount)) / 100).toFixed(2)
                          : itm.discountType == "percent"
                          ? isInteger(
                              Number(
                                ((itm.amount / 100 - (itm.amount / 10000) * itm.discountAmount) * (100 - couponResult.amount)) /
                                  100
                              )
                            )
                            ? Number(
                                ((itm.amount / 100 - (itm.amount / 10000) * itm.discountAmount) * (100 - couponResult.amount)) /
                                  100
                              )
                            : Number(
                                ((itm.amount / 100 - (itm.amount / 10000) * itm.discountAmount) * (100 - couponResult.amount)) /
                                  100
                              ).toFixed(2)
                          : itm.discountType == "" && isInteger(Number((itm.amount / 100) * (100 - couponResult.amount)) / 100)
                          ? Number(((itm.amount / 100) * (100 - couponResult.amount)) / 100)
                          : Number(((itm.amount / 100) * (100 - couponResult.amount)) / 100).toFixed(2)}
                      </p>
                    )}
                    {couponResult.type &&
                      couponResult.type == "percent" &&
                      couponResult.applyTo == "giftcards" &&
                      sessionStorage.getItem("couponGiftcard") == "true" && (
                        <p className={classes.price_}>
                          $
                          {itm.discountType == "amount"
                            ? isInteger(Number(((itm.amount / 100 - itm.discountAmount) * (100 - couponResult.amount)) / 100))
                              ? Number(((itm.amount / 100 - itm.discountAmount) * (100 - couponResult.amount)) / 100)
                              : Number(((itm.amount / 100 - itm.discountAmount) * (100 - couponResult.amount)) / 100).toFixed(2)
                            : itm.discountType == "percent"
                            ? isInteger(
                                Number(
                                  ((itm.amount / 100 - (itm.amount / 10000) * itm.discountAmount) * (100 - couponResult.amount)) /
                                    100
                                )
                              )
                              ? Number(
                                  ((itm.amount / 100 - (itm.amount / 10000) * itm.discountAmount) * (100 - couponResult.amount)) /
                                    100
                                )
                              : Number(
                                  ((itm.amount / 100 - (itm.amount / 10000) * itm.discountAmount) * (100 - couponResult.amount)) /
                                    100
                                ).toFixed(2)
                            : itm.discountType == "" && isInteger(Number((itm.amount / 100) * (100 - couponResult.amount)) / 100)
                            ? Number(((itm.amount / 100) * (100 - couponResult.amount)) / 100)
                            : Number(((itm.amount / 100) * (100 - couponResult.amount)) / 100).toFixed(2)}
                        </p>
                      )}
                  </>
                )}
                {editable && (
                  <>
                    <p className={classes.count}>Cant : 1 </p>
                    <MuiThemeProvider theme={theme_}>
                      <Field type="number" name="monto" id="monto" value={values.monto}>
                        {({ field }) => (
                          <div>
                            {amountsFixed.length == 0 || amountsRange ? (
                              <OutlinedInput
                                type="number"
                                {...field}
                                className={classes.priceInput}
                                value={values.montoRange}
                                error={touched.montoRange && Boolean(errors.montoRange)}
                                name="montoRange"
                                onChange={handleChange}
                                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                              />
                            ) : (
                              <FormControl variant="outlined" style={{ marginTop: 0 }} margin="dense">
                                <Select
                                  native
                                  {...field}
                                  className={classes.select}
                                  value={values.monto}
                                  onChange={handleChange}
                                  inputProps={{
                                    name: "monto",
                                    id: "outlined-monto-native-simple",
                                  }}
                                >
                                  {amountsFixed.map((el, ind) => (
                                    <option value={ind} key={ind}>
                                      $ {el.amount / 100}{" "}
                                      {el.description != "" && el.description ? " ( " + el.description + " ) " : ""}
                                    </option>
                                  ))}
                                </Select>
                              </FormControl>
                            )}
                          </div>
                        )}
                      </Field>
                    </MuiThemeProvider>
                  </>
                )}
              </div>
            )}
            <div className={classes.actionContainer}>
              {!editable && <Edit className={classes.editIcon} fontSize="small" onClick={handleEditableClick} />}
              {editable &&
                (partner && partner.colors && partner.colors.linkHoover ? (
                  <p
                    onMouseOver={onMouseOverLink}
                    onMouseLeave={onMouseLeaveLink}
                    onClick={handleSubmit}
                    style={{ fontSize: 12 }}
                    className={classes.btn}
                  >
                    Guardar
                  </p>
                ) : (
                  <p onClick={handleSubmit} style={{ fontSize: 12 }} className={classes.btn}>
                    Guardar
                  </p>
                ))}
              {partner && partner.colors && partner.colors.linkHoover ? (
                <p
                  onMouseOver={onMouseOverLink}
                  onMouseLeave={onMouseLeaveLink}
                  onClick={() => setOpenDeleteModal(true)}
                  style={{ fontSize: 12 }}
                  className={classes.btn}
                >
                  Eliminar
                </p>
              ) : (
                <p onClick={() => setOpenDeleteModal(true)} style={{ fontSize: 12 }} className={classes.btn}>
                  Eliminar
                </p>
              )}
            </div>
            <CardPreviewModal item={itm} open={openModal} onClose={() => setOpenModal(false)} />
            <DeleteConfirmModal
              open={openDeleteModal}
              onClose={() => setOpenDeleteModal(false)}
              onOk={() => (dispatch(deleteOrder({ index, id: itm.id }, partnerId)), dispatch(changeOrders(true)))}
            />
          </div>
        </Form>
      )}
    </Formik>
  );
};

CartCard.propTypes = {
  item: PropTypes.object,
  index: PropTypes.number,
};

export default CartCard;
