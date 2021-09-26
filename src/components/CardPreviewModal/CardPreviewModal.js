import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import moment from "moment";

import { Modal } from "@material-ui/core";

import { Close } from "@material-ui/icons";

import cardBackImg from "assets/img/card-preview-back.png";
import useStyles from "./style";
import { cards } from "./../../constants/index";

const CardPreviewModal = ({ item, open, onClose }) => {
  const classes = useStyles();

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="card-preview-modal" aria-describedby="card-preview-modal-body">
      <div className={classNames(classes.paper)}>
        <div className={classes.close}>
          <Close className={classes.closeIcon} onClick={onClose} />
          <img className={classes.cardBackground} src={cardBackImg} />
        </div>
        <div className={classes.cardInfo}>
          <h5 className={classes.cardName}>{item.giftcard.name}</h5>
          <h3 className={classes.cardPrice}>${item.amount}</h3>
          <p className={classes.validDate}>
            Válido hasta el {moment(new Date(Number(item.giftcard.validity?.endDate))).format("DD/MM/YYYY")}
          </p>
          <img className={classes.cardImg} src={cards[item.style]} />
        </div>
        <div className={classes.dottedLine} />
        <div className={classes.cardBody}>
          <h5 className={classes.title}>De: {item.name}</h5>
          <p className={classes.text}>{item.email}</p>
          {item.isGift && (
            <>
              <hr className={classes.divider} />
              <h5 className={classes.title}>Para: {item.toName}</h5>
              <p className={classes.text}>{item.toEmail}</p>
              <p className={classes.text} style={{ marginTop: 20 }}>
                {item.toMessage}
              </p>
            </>
          )}
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
