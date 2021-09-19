import React from 'react';
import PropTypes from "prop-types";
import classNames from "classnames";

import { Modal } from '@material-ui/core';

import { Close } from '@material-ui/icons';

import cardBackImg from 'assets/img/card-preview-back.png';
import useStyles from './style';

const CardPreviewModal = ({ item, open, onClose }) => {

  const classes = useStyles();

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="card-preview-modal"
      aria-describedby="card-preview-modal-body"
    >
      <div className={classNames(classes.paper)}>
        <div className={classes.close}>
          <Close className={classes.closeIcon} onClick={onClose} />
          <img className={classes.cardBackground} src={cardBackImg} />
        </div>
        <div className={classes.cardInfo}>
          <h5 className={classes.cardName}>{item.nameGift}</h5>
          <h3 className={classes.cardPrice}>${item.monto}</h3>
          <p className={classes.validDate}>{item.valid}</p>
          <img className={classes.cardImg} src={item.image} />
        </div>
        <div className={classes.dottedLine} />
        <div className={classes.cardBody}>
          <h5 className={classes.title}>De: {item.name}</h5>
          <p className={classes.text}>{item.email}</p>
          {item.friendGift && <>
            <hr className={classes.divider} />
            <h5 className={classes.title}>Para: {item.para}</h5>
            <p className={classes.text}>{item.friendEmail}</p>
            <p className={classes.text} style={{ marginTop: 20 }}>{item.mensaje}</p>
          </>}
        </div>
      </div>
    </Modal>
  );
};

CardPreviewModal.propTypes = {
  item: PropTypes.object,
  open: PropTypes.bool,
  onClose: PropTypes.func,
};

export default CardPreviewModal;
