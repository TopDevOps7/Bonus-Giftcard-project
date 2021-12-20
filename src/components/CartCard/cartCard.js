import React, { Fragment, useState, useEffect } from "react";
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

import Button from "components/CustomButtons/Button";
import CardPreviewModal from "components/CardPreviewModal/CardPreviewModal";
import DeleteConfirmModal from "components/DeleteConfirmModal/DeleteConfirmModal";

import { deleteOrder, editOrder } from "redux/actions/cart";

import useStyles from "./style";
import { useSelector } from "react-redux";

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

  const handleEditableClick = () => {
    setEditable(true);
  };

  const handleOpenModal = (e) => {
    e.preventDefault();
    setOpenModal(true);
  };

  const { amountsRange, amountsFixed } = itm.giftcard;

  const onSubmit = async (values) => {
    const { monto, montoRange, para, mensaje } = values;
    let monto_ = 0;
    let description = "";
    amountsRange
      ? (monto_ = montoRange * 100)
      : amountsFixed.map((el, ind) => {
          monto == ind && ((monto_ = el.amount), (description = el.description));
        });

    if (itm.isGift) {
      dispatch(
        editOrder(
          {
            index,
            order: {
              ...itm,
              description,
              selectedAmount: monto,
              amount: monto_,
              toName: para,
              toMessage: mensaje,
            },
          },
          partnerId
        )
      );
    } else {
      dispatch(editOrder({ index, order: { ...itm, description, selectedAmount: monto, amount: monto_ } }, partnerId));
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

  return (
    <Formik
      initialValues={{
        monto: itm.selectedAmount,
        montoRange: itm.amount / 100,
        para: itm.toName,
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
                    {card.name == itm.style && (
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
                    </>
                  )}
                </div>
              )}
              {!editable && itm.isGift && (
                <>
                  {itm.toName && <p className={classes.descTitle}>Para: {itm.toName}</p>}
                  {itm.toMessage && <p className={classes.desc}>{itm.toMessage}</p>}
                </>
              )}
              {editable && itm.isGift && (
                <>
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
                          inputProps={{
                            maxLength: 60,
                          }}
                          onChange={handleChange}
                          labelWidth={100}
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
                          inputProps={{
                            maxLength: 500,
                          }}
                          onChange={handleChange}
                          labelWidth={60}
                        />
                      )}
                    </Field>
                  </FormControl>
                </>
              )}
            </div>
            {!isMobile && (
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
                  </>
                )}
              </div>
            )}
            <div className={classes.actionContainer}>
              {!editable && <Edit className={classes.editIcon} fontSize="small" onClick={handleEditableClick} />}
              {editable && (
                <Button className={classes.btn} simple onClick={handleSubmit}>
                  Guardar
                </Button>
              )}
              <Button className={classes.btn} simple onClick={() => setOpenDeleteModal(true)}>
                Eliminar
              </Button>
            </div>
            <CardPreviewModal item={itm} open={openModal} onClose={() => setOpenModal(false)} />
            <DeleteConfirmModal
              open={openDeleteModal}
              onClose={() => setOpenDeleteModal(false)}
              onOk={() => dispatch(deleteOrder({ index, id: itm.id }, partnerId))}
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
