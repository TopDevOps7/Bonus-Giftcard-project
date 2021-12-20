import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import { Modal } from "@material-ui/core";
import { Close } from "@material-ui/icons";

import useStyles from "./style_";

const CardPreviewModal = ({ open, onClose, content }) => {
  const classes = useStyles();

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="terms-use-modal" aria-describedby="terms-use-modal-body">
      <div className={classNames(classes.paper)}>
        <div className={classes.close}>
          <Close className={classes.closeIcon} onClick={onClose} />
        </div>
        <div className={classes.cardHeader}>
          <h4>Ubicaciones</h4>
        </div>
        <div className={classes.dottedLine} />
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </Modal>
  );
};

CardPreviewModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
};

export default CardPreviewModal;
