import React from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import classNames from "classnames";

import { Modal } from "@material-ui/core";
import { Check, Close } from "@material-ui/icons";
import Button from "components/CustomButtons/Button";
import { filterByCategory, cleanFilters } from "redux/actions/home";

import useStyles from "./style";

const FilterModal = ({ open, onClose }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const filterOptions = useSelector(({ home }) => home.filterOptions);
  const categories = useSelector(({ home }) => home.categories);

  const getStatus = (option) => {
    return filterOptions.categories.includes(option);
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      className={classes.root}
      aria-labelledby="filter-modal"
      aria-describedby="filter-modal-body"
    >
      <div className={classNames(classes.paper, "animate__animated", "animate__fadeInUpBig", "animate__faster")}>
        <div className={classes.close}>
          <Close className={classes.closeIcon} onClick={onClose} />
        </div>
        <div className={classes.modalBody}>
          <h4>
            <b>Categorías</b>
          </h4>
          <div>
            {categories !== [] ? (
              categories.map((category) => (
                <Button
                  className={classNames(classes.filterButton, getStatus(category.name) && "active")}
                  simple
                  block
                  color="github"
                  onClick={() => dispatch(filterByCategory(category.name))}
                  key={category.name}
                >
                  <span className="button-label">
                    {category.icon ? (
                      <img src={category.icon} className={classes.category_icon_m} />
                    ) : (
                      <div className={classes.category_icon_m}></div>
                    )}{" "}
                    <span>{category.name}</span>
                  </span>
                  {getStatus(category.name) && <Check color="primary" />}
                </Button>
              ))
            ) : (
              <div></div>
            )}

            <Button color="primary" block style={{ marginTop: 30 }} onClick={onClose}>
              MOSTRAR RESULTADOS
            </Button>
            <Button
              color="danger"
              block
              onClick={() => {
                document.getElementById("outlined-adornment-filter").value = "";
                dispatch(cleanFilters());
                onClose();
              }}
            >
              QUITAR FILTROS
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

FilterModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
};

export default FilterModal;
