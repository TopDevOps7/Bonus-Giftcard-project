import React from 'react';
import PropTypes from "prop-types";
import classNames from "classnames";

import { Modal } from '@material-ui/core';
import { Close } from '@material-ui/icons';

import useStyles from './style';

const CardPreviewModal = ({ open, onClose }) => {

  const classes = useStyles();

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="terms-use-modal"
      aria-describedby="terms-use-modal-body"
    >
      <div className={classNames(classes.paper)}>
        <div className={classes.close}>
          <Close className={classes.closeIcon} onClick={onClose} />
        </div>
        <div className={classes.cardHeader}>
          <h4>Condiciones de uso</h4>
        </div>
        <div className={classes.dottedLine} />
        <div className={classes.cardBody}>
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
          dolore magna aliquyam era, sed diam voluptua.
          At vero eos et accusam et justo duo dolores et ea rebum.
          Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
          dolore magna aliquyam era, sed diam voluptua.
          At vero eos et accusam et justo duo dolores et ea rebum.
          Stet clita kasd gubergren, no sea takimata sanctus est.
          <br />
          <br />
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
          dolore magna aliquyam era, sed diam voluptua.
          At vero eos et accusam et justo duo dolores et ea rebum.
          Stet clita kasd gubergren, no sea takimata sanctus est
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
          dolore magna aliquyam era, sed diam voluptua.
          At vero eos et accusam et justo duo dolores et ea rebum.
          Stet clita kasd gubergren, no sea takimata sanctus est
        </div>
      </div>
    </Modal>
  );
};

CardPreviewModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
};

export default CardPreviewModal;
