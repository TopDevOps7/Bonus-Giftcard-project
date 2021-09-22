import React from 'react';
import PropTypes from "prop-types";
import classNames from "classnames";

import { Modal } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import Button from "components/CustomButtons/Button";

import useStyles from './style';

const DeleteConfirmModal = ({ open, onClose, onOk }) => {

  const classes = useStyles();

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="delete-confirm-modal"
      aria-describedby="delete-confirm-modal-body"
    >
      <div className={classNames(classes.paper)}>
        <div className={classes.close}>
          <Close className={classes.closeIcon} onClick={onClose} />
        </div>
        <div className={classes.cardHeader}>
          <h4>¿Deseas eliminar este artículo de tu carrito?</h4>
        </div>
        <div className={classes.cardBody}>
          <Button color="primary" block onClick={() => { onOk(); onClose(); }}>ELIMINAR</Button>
          <Button block onClick={onClose}>VOLVER</Button>
        </div>
      </div>
    </Modal>
  );
};

DeleteConfirmModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onOk: PropTypes.func,
};

export default DeleteConfirmModal;
