import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useMediaQuery, useTheme, OutlinedInput, InputAdornment, InputLabel, FormControl } from "@material-ui/core";
import { useDispatch } from "react-redux";

import { Edit, Search } from '@material-ui/icons';

import Button from "components/CustomButtons/Button";
import CardPreviewModal from "components/CardPreviewModal/CardPreviewModal";

import { deleteOrder, editOrder } from "redux/actions/cart";

import useStyles from "./style";

const CartCard = ({ item, index }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [editable, setEditable] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [itm, setItm] = useState(item);

  const handleEditableClick = () => {
    setEditable(true);
  }

  const handelSaveClick = () => {
    dispatch(editOrder({ index, order: itm }));
    setEditable(false);
  }

  const handleOpenModal = (e) => {
    e.preventDefault();
    setOpenModal(true);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItm({
      ...itm,
      [name]: value
    })
  }

  const handleClick = (flag) => () => {
    if (flag) {
      return setItm({
        ...itm,
        "amount": Number(itm.amount) + 1
      });
    }
    setItm({
      ...itm,
      "amount": Number(itm.amount) - 1
    });
  }

  useEffect(() => {
    setItm(item);
  }, [item]);

  console.log(isMobile);

  return (
    <div className={classes.root}>
      <div className={classes.imageContainer}>
        <img
          src={itm.image}
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
            <OutlinedInput
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
            />
            <OutlinedInput
              type="number"
              className={classes.priceInput}
              value={itm.monto}
              name="monto"
              onChange={handleChange}
              startAdornment={
                <InputAdornment position="start">
                  $
                </InputAdornment>
              }
            />
          </>}
        </div>}
        {(!editable && itm.friendGift) && <>
          {itm.para && <p className={classes.descTitle}>Para: {itm.para}</p>}
          {itm.mensaje && <p className={classes.desc}>
            {itm.mensaje}
          </p>}
        </>}
        {(editable && itm.friendGift) && <>
          <FormControl fullWidth variant="outlined" size="small" style={{ marginTop: 15 }}>
            <InputLabel htmlFor="description-title">Destinatario *</InputLabel>
            <OutlinedInput
              className={classes.descTitleEdit}
              type="text"
              id="description-title"
              value={itm.para}
              name="para"
              onChange={handleChange}
              labelWidth={100}
            />
          </FormControl>
          <FormControl fullWidth variant="outlined" size="small" style={{ marginTop: 10 }}>
            <InputLabel htmlFor="description">Mensaje</InputLabel>
            <OutlinedInput
              className={classes.descEdit}
              id="description"
              multiline
              rows={6}
              value={itm.mensaje}
              name="mensaje"
              onChange={handleChange}
              labelWidth={60}
            />
          </FormControl>
        </>}
      </div>
      {!isMobile && <div className={classes.amountContainer}>
        {!editable && <>
          <p className={classes.count}>Cant : {itm.amount} </p>
          <p className={classes.price}>${itm.monto}</p>
        </>}
        {editable && <>
          <OutlinedInput
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
          />
          <OutlinedInput
            type="number"
            className={classes.priceInput}
            value={itm.monto}
            name="monto"
            onChange={handleChange}
            startAdornment={
              <InputAdornment position="start">
                $
              </InputAdornment>
            }
          />
        </>}
      </div>}
      <div className={classes.actionContainer}>
        {!editable && <Edit className={classes.editIcon} fontSize="small" onClick={handleEditableClick} />}
        {editable && <Button
          className={classes.btn}
          simple
          onClick={handelSaveClick}
        >
          Guardar
        </Button>}
        <Button
          className={classes.btn}
          simple
          onClick={() => dispatch(deleteOrder({ index, id: itm.id }))}
        >
          Eliminar
        </Button>
      </div>
      <CardPreviewModal item={itm} open={openModal} onClose={() => setOpenModal(false)} />
    </div>
  );
};

CartCard.propTypes = {
  item: PropTypes.object,
  index: PropTypes.number
};

export default CartCard;
