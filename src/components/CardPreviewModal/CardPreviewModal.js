import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Modal } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import { useSelector } from "react-redux";
import cardBackImg from "assets/img/card-preview-back.png";
import useStyles from "./style";

const CardPreviewModal = ({ item, open, onClose }) => {
  const classes = useStyles();
  const [cardNum, setCardNum] = useState(0);
  const cardsDesign = useSelector(({ home }) => home.cardsDesign);

  useEffect(() => {
    cardsDesign &&
      cardsDesign.length != 0 &&
      cardsDesign.map((card, ind) => {
        card.name == item.cardsDesign.name && setCardNum(ind);
      });
  }, [cardsDesign]);

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="card-preview-modal" aria-describedby="card-preview-modal-body">
      <div className={classNames(classes.paper)}>
        <div className={classes.close}>
          <Close className={classes.closeIcon} onClick={onClose} />
          <img className={classes.cardBackground} src={cardBackImg} />
        </div>
        <div className={classes.cardInfo}>
          {item.cardsDesign.logo == "image" ? (
            <img className={classes.logo} src={item.logo} alt={item.giftcard.name} draggable={false} />
          ) : (
            <h5 className={classes.cardName} style={{ color: item.cardsDesign.style }}>
              {item.giftcard.name}
            </h5>
          )}
          <h3 className={classes.cardPrice} style={{ color: item.cardsDesign.style }}>
            ${item.amount / 100}
          </h3>
          <img src={cardsDesign && cardsDesign.length != 0 && cardsDesign[cardNum].path} className={classes.cardImg} />
        </div>
        <div className={classes.dottedLine} />
        <div className={classes.cardBody}>
          {item.isGift && (
            <>
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
