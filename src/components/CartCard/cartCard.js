import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";

import { useMediaQuery, useTheme, OutlinedInput, InputAdornment, InputLabel, FormControl, Select, Collapse } from "@material-ui/core";
import Alert from '@material-ui/lab/Alert';
import { Edit, Search } from '@material-ui/icons';
import { Form, Formik, Field } from "formik";
import * as Yup from "yup";

import Button from "components/CustomButtons/Button";
import CardPreviewModal from "components/CardPreviewModal/CardPreviewModal";
import DeleteConfirmModal from "components/DeleteConfirmModal/DeleteConfirmModal";

import { deleteOrder, editOrder } from "redux/actions/cart";

import useStyles from "./style";

const CartCard = ({ item, index, setUpdate }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const products = useSelector((state) => state.home.cards.filter(c => c.id === item.id));

  const [editable, setEditable] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [itm, setItm] = useState(item);
  // const [open, setOpen] = useState(false);

  const handleEditableClick = () => {
    setEditable(true);
  }

  // const handelSaveClick = () => {

  // }

  const handleOpenModal = (e) => {
    e.preventDefault();
    setOpenModal(true);
  }

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setItm({
  //     ...itm,
  //     [name]: value
  //   })
  // }

  const { amountsRange, amountsFixed } = products[0];

  const onSubmit = async (values) => {
    const { monto, para, mensaje } = values;
    if (itm.isGift) {
      dispatch(editOrder({ index, order: { ...itm, monto } }));
    } else {
      dispatch(editOrder({ index, order: { ...itm, monto, para, mensaje } }));
    }
    setEditable(false);
    setUpdate();
  }

  // const handleClick = (flag) => () => {
  //   if (flag) {
  //     return setItm({
  //       ...itm,
  //       "amount": Number(itm.amount) + 1
  //     });
  //   }
  //   setItm({
  //     ...itm,
  //     "amount": Number(itm.amount) - 1
  //   });
  // }

  const getValidationSchema = () => {
    let validation = {
    };
    if (amountsRange) {
      validation = {
        ...validation,
        monto: Yup.number().integer().min(amountsRange.minAmount).max(amountsRange.maxAmount).required(),
      }
    }
    if (itm.isGift) {
      validation = {
        ...validation,
        para: Yup.string().max(60).required(),
        mensaje: Yup.string().max(500),
      }
    }
    if (editable) {
      return Yup.object(validation);
    }
    return Yup.object({});
  }

  useEffect(() => {
    setItm(item);
  }, [item]);

  return (
    <Formik
      initialValues={{
        monto: itm.monto,
        para: itm.para,
        mensaje: itm.mensaje,
      }}
      validationSchema={getValidationSchema()}
      onSubmit={onSubmit}
    >
      {({ touched, errors, values, handleChange, handleSubmit }) => <Form>
        <div className={classes.alert}>
          <Collapse in={Object.keys(errors).length}>
            <Alert
              severity="error"
            // action={
            //   <IconButton
            //     aria-label="close"
            //     color="inherit"
            //     size="small"
            //     onClick={() => {
            //       setOpen(false);
            //     }}
            //   >
            //     <Close fontSize="inherit" />
            //   </IconButton>
            // }
            >
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
            <img
              src={itm.cardImage}
              rel="nofollow"
              alt="Card image cap"
              className={classes.image}
              draggable={false}
            />
            <a href="#" onClick={handleOpenModal}>
              <Search fontSize="small" /> Vista previa
            </a>
          </div>

          <div className={classes.infoContainer}>
            <p className={classes.title}>Tarjeta de regalo</p>
            <p className={classes.title}>{itm.nameGift}</p>
            {isMobile && <div className={classes.amountContainer}>
              {!editable && <>
                <p className={classes.count}>Cant : {itm.amount} </p>
                <p className={classes.price}>${itm.monto}</p>
              </>}
              {editable && <>
                <p className={classes.count}>Cant : {itm.amount} </p>
                {/* <OutlinedInput
              type="text"
              className={classes.amountInput}
              value={itm.amount}
              name="amount"
              onChange={handleChange}
              startAdornment={
                <InputAdornment position="start">
                  <Button className={classes.amountControlBtn} color="primary" onClick={handleClick()}>-</Button>
                </InputAdornment>
              }
              endAdornment={
                <InputAdornment position="end">
                  <Button className={classes.amountControlBtn} color="primary" onClick={handleClick(true)}>+</Button>
                </InputAdornment>
              }
            /> */}
                <Field type="number" name="monto" id="monto" value={values.monto}>
                  {({ field }) => (
                    <>
                      {amountsRange && <OutlinedInput
                        type="number"
                        {...field}
                        className={classes.priceInput}
                        value={values.monto}
                        error={touched.monto && Boolean(errors.monto)}
                        name="monto"
                        onChange={handleChange}
                        startAdornment={
                          <InputAdornment position="start">
                            $
                          </InputAdornment>
                        }
                      />}
                      {!amountsRange && (
                        <FormControl
                          variant="outlined"
                          style={{ marginTop: 0 }}
                          margin="dense">
                          <Select
                            native
                            {...field}
                            className={classes.select}
                            value={values.monto}
                            onChange={handleChange}
                            // label=""
                            inputProps={{
                              name: 'monto',
                              id: 'outlined-monto-native-simple',
                            }}
                          >
                            {amountsFixed?.map((el, ind) => <option value={el} key={ind}>$ {el}</option>)}
                          </Select>
                        </FormControl>
                      )}
                    </>
                  )}
                </Field>
              </>}
            </div>}
            {(!editable && itm.isGift) && <>
              {itm.para && <p className={classes.descTitle}>Para: {itm.para}</p>}
              {itm.mensaje && <p className={classes.desc}>
                {itm.mensaje}
              </p>}
            </>}
            {(editable && itm.isGift) && <>
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
                      onChange={handleChange}
                      labelWidth={100}
                    />)}
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
                      onChange={handleChange}
                      labelWidth={60}
                    />)}
                </Field>
              </FormControl>
            </>}
          </div>
          {!isMobile && <div className={classes.amountContainer}>
            {!editable && <>
              <p className={classes.count}>Cant : {itm.amount} </p>
              <p className={classes.price}>${itm.monto}</p>
            </>}
            {editable && <>
              {/* <OutlinedInput
            type="text"
            className={classes.amountInput}
            value={itm.amount}
            name="amount"
            onChange={handleChange}
            startAdornment={
              <InputAdornment position="start">
                <Button className={classes.amountControlBtn} color="primary" onClick={handleClick()}>-</Button>
              </InputAdornment>
            }
            endAdornment={
              <InputAdornment position="end">
                <Button className={classes.amountControlBtn} color="primary" onClick={handleClick(true)}>+</Button>
              </InputAdornment>
            }
          /> */}
              <p className={classes.count}>Cant : {itm.amount} </p>
              <Field type="number" name="monto" id="monto" value={values.monto}>
                {({ field }) => (
                  <div>
                    {amountsRange && <OutlinedInput
                      type="number"
                      {...field}
                      className={classes.priceInput}
                      value={values.monto}
                      error={touched.monto && Boolean(errors.monto)}
                      name="monto"
                      onChange={handleChange}
                      startAdornment={
                        <InputAdornment position="start">
                          $
                        </InputAdornment>
                      }
                    />}
                    {!amountsRange && (
                      <FormControl
                        variant="outlined"
                        style={{ marginTop: 0 }}
                        margin="dense">
                        <Select
                          native
                          {...field}
                          className={classes.select}
                          value={values.monto}
                          onChange={handleChange}
                          // label=""
                          inputProps={{
                            name: 'monto',
                            id: 'outlined-monto-native-simple',
                          }}
                        >
                          {amountsFixed?.map((el, ind) => <option value={el} key={ind}>$ {el}</option>)}
                        </Select>
                      </FormControl>
                    )}
                    {/* <ErrorMessage name="monto" /> */}
                  </div>)}
              </Field>
            </>}
          </div>}
          <div className={classes.actionContainer}>
            {!editable && <Edit className={classes.editIcon} fontSize="small" onClick={handleEditableClick} />}
            {editable && <Button
              className={classes.btn}
              simple
              onClick={handleSubmit}
            >
              Guardar
            </Button>}
            <Button
              className={classes.btn}
              simple
              onClick={() => setOpenDeleteModal(true)}
            >
              Eliminar
            </Button>
          </div>
          <CardPreviewModal item={itm} open={openModal} onClose={() => setOpenModal(false)} />
          <DeleteConfirmModal
            open={openDeleteModal}
            onClose={() => setOpenDeleteModal(false)}
            onOk={() => dispatch(deleteOrder({ index, id: itm.id }))}
          />
        </div></Form>}
    </Formik>
  );
};

CartCard.propTypes = {
  item: PropTypes.object,
  index: PropTypes.number
};

export default CartCard;
