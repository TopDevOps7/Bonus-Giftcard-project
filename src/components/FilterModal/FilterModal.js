import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import classNames from "classnames";

import { Modal, Slider } from "@material-ui/core";

import { Check, Close, Favorite, Fastfood, LocalPharmacy, EmojiNature, MovieFilter, Computer } from "@material-ui/icons";

import GridItem from "components/Grid/GridItem";
import GridContainer from "components/Grid/GridContainer";
import Button from "components/CustomButtons/Button";

import { filterByCategory, cleanFilters, filterByPrice } from "redux/actions/home";

import useStyles from "./style";

function valuetext(value) {
  return `${value}$`;
}

const FilterModal = ({ open, onClose }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const filterOptions = useSelector(({ home }) => home.filterOptions);

  const [value, setValue] = useState(filterOptions.price);

  const handleChange = (event, newValue) => {
    dispatch(filterByPrice(newValue));
  };

  const getStatus = (option) => {
    return filterOptions.categories.includes(option);
  };

  useEffect(() => {
    setValue(filterOptions.price);
  }, [filterOptions.price]);

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
            <b>Rango de precio</b>
          </h4>
          <GridContainer>
            <GridItem xs={6} sm={6} md={6} style={{ paddingLeft: 0 }}>
              <p>{`$${value[0]}`}</p>
            </GridItem>
            <GridItem xs={6} sm={6} md={6} style={{ paddingRight: 0 }}>
              <p style={{ textAlign: "right" }}>{`$${value[1]}`}</p>
            </GridItem>
          </GridContainer>
          <Slider
            value={value}
            onChangeCommitted={handleChange}
            onChange={(ev, va) => setValue(va)}
            valueLabelDisplay="off"
            aria-labelledby="range-slider"
            getAriaValueText={valuetext}
            // scale={(x) => x * (filterOptions.available)}
            step={10}
            min={0}
            max={filterOptions.maxAmount}
          />
          <br />
          <hr />
          <h4>
            <b>Categorías</b>
          </h4>
          <div>
            <Button
              className={classNames(classes.filterButton, getStatus("Food") && "active")}
              simple
              block
              color="github"
              onClick={() => dispatch(filterByCategory("Food"))}
            >
              <span className="button-label">
                <Fastfood /> <span>Comida y bebidas</span>
              </span>
              {getStatus("Food") && <Check color="primary" />}
            </Button>
            <Button
              simple
              className={classNames(classes.filterButton, getStatus("Wellbeing") && "active")}
              block
              color="github"
              onClick={() => dispatch(filterByCategory("Wellbeing"))}
            >
              <span className="button-label">
                <LocalPharmacy /> <span>Belleza y bienestar</span>
              </span>
              {getStatus("Wellbeing") && <Check color="primary" />}
            </Button>
            <Button
              simple
              className={classNames(classes.filterButton, getStatus("Entertainment") && "active")}
              block
              color="github"
              onClick={() => dispatch(filterByCategory("Entertainment"))}
            >
              <span className="button-label">
                <MovieFilter /> <span>Entretenimiento</span>
              </span>
              {getStatus("Entertainment") && <Check color="primary" />}
            </Button>
            <Button
              simple
              className={classNames(classes.filterButton, getStatus("Fashion") && "active")}
              block
              color="github"
              onClick={() => dispatch(filterByCategory("Fashion"))}
            >
              <span className="button-label">
                <Favorite /> <span>Moda</span>
              </span>
              {getStatus("Fashion") && <Check color="primary" />}
            </Button>
            <Button
              simple
              className={classNames(classes.filterButton, getStatus("Travel") && "active")}
              block
              color="github"
              onClick={() => dispatch(filterByCategory("Travel"))}
            >
              <span className="button-label">
                <EmojiNature /> <span>Turismo y viajes</span>
              </span>
              {getStatus("Travel") && <Check color="primary" />}
            </Button>
            <Button
              simple
              className={classNames(classes.filterButton, getStatus("Digital") && "active")}
              block
              color="github"
              onClick={() => dispatch(filterByCategory("Digital"))}
            >
              <span className="button-label">
                <Computer /> <span>Tecnología</span>
              </span>
              {getStatus("Digital") && <Check color="primary" />}
            </Button>

            <Button color="primary" block style={{ marginTop: 30 }} onClick={onClose}>
              MOSTRAR RESULTADOS
            </Button>
            <Button
              color="danger"
              block
              onClick={() => {
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
