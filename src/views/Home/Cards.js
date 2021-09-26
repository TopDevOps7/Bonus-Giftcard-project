/* eslint-disable react/jsx-key */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";
import { useSelector, useDispatch } from "react-redux";
import { Slider, makeStyles, Hidden, Box, Typography } from "@material-ui/core";

import { Favorite, Fastfood, LocalPharmacy, EmojiNature, MovieFilter, Computer, Check } from "@material-ui/icons";

import GridItem from "components/Grid/GridItem";
import GridContainer from "components/Grid/GridContainer";
import Button from "components/CustomButtons/Button";
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import { filterByCategory, getCards, cleanFilters, filterByPrice } from "redux/actions/home";

import { cardTitle } from "assets/jss/material-kit-react";

const styles = (theme) => ({
  cardBody: {
    [theme.breakpoints.down("sm")]: {
      // display: "flex",
      // alignItems: "start",
      // justifyContent: "space-between",
    },
  },
  noresult: {
    marginTop: "10vh",
    [theme.breakpoints.down("sm")]: {
      fontSize: 30,
    },
  },
  cardTitle: {
    ...cardTitle,
    textAlign: "left",
    marginBottom: 0,
    fontSize: 20,
    [theme.breakpoints.down("sm")]: {
      fontSize: 22,
      lineHeight: 1,
      margin: 0,
    },
  },
  cardInfo: {},
  cardPrice: {
    fontSize: 22,
    margin: 0,
    fontWeight: 400,
  },
  container: {
    margin: "30px auto",
    display: "flex",
    alignItems: "start",
    [theme.breakpoints.down("sm")]: {
      display: "block",
    },
  },
  textCenter: {
    textAlign: "center",
  },
  textRight: {
    textAlign: "right",
  },
  smallText: {
    fontSize: "12px",
  },
  cardAlign: {
    // marginLeft: '0 !important',
    // marginRight: '15px !important',
    // padding: '0 !important'
  },
  filterButton: {
    paddingLeft: 0,
    paddingRight: 0,
    textTransform: "initial",
    fontSize: 15,
    justifyContent: "space-between",
    "&.active": {
      "& .button-label": {
        color: theme.palette.primary.main,
      },
    },
    "& .button-label": {
      display: "flex",
      alignItems: "center",
    },
    "& .button-label > span": {
      paddingTop: 5,
      paddingLeft: 8,
    },
  },
  title: {
    marginTop: 10,
  },
  sideFilter: {
    minWidth: "275px",
    maxWidth: "275px",
    width: "275px",
    marginRight: "50px",
    paddingLeft: 0,
    position: "sticky",
    top: 160,
  },
  content: {
    flex: 1,
  },
});

const useStyles = makeStyles(styles);

function valuetext(value) {
  return `$${value}`;
}

export default function Cards() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const filterOptions = useSelector(({ home }) => home.filterOptions);
  const cards = useSelector(({ home }) => {
    let filtered = home.cards
      .filter((x) => {
        let cats = x.categories;
        let dup = cats.filter((cat) => home.filterOptions.categories.includes(cat.name));
        return dup.length === home.filterOptions.categories.length;
      })
      .filter((x) => {
        let range = home.filterOptions.price;
        if (!range?.length) return true;
        if (!x.amountsRange && !x.amountsFixed) return true;
        if (x.amountsRange) {
          if (
            (x.amountsRange.minAmount >= range[0] && x.amountsRange.minAmount < range[1]) ||
            (x.amountsRange.maxAmount > range[0] && x.amountsRange.maxAmount <= range[1])
          )
            return true;
        }
        if (x.amountsFixed) {
          if (
            (x.amountsFixed[0] >= range[0] && x.amountsFixed[0] < range[1]) ||
            (x.amountsFixed[x.amountsFixed.length - 1] > range[0] && x.amountsFixed[x.amountsFixed.length - 1] <= range[1])
          )
            return true;
        }
        return false;
      })
      .filter((x) => new RegExp(home.filterOptions.filterString, "i").test(x.name));
    return filtered;
  });

  const [value, setValue] = useState(filterOptions.price);

  const handleChange = (event, newValue) => {
    dispatch(filterByPrice(newValue));
  };

  const getStatus = (option) => {
    return filterOptions.categories.includes(option);
  };

  useEffect(() => {
    dispatch(getCards());
  }, []);

  useEffect(() => {
    setValue(filterOptions.price);
  }, [filterOptions.price]);

  return (
    <div className={classNames(classes.container, "cardBanner")}>
      <Hidden smDown>
        <div className={classes.sideFilter}>
          <GridContainer style={{ alignItems: "center" }}>
            <GridItem xs={6} sm={6} md={6} style={{ paddingLeft: 0 }}>
              <h2 className={classes.title}>Filtros</h2>
            </GridItem>
            <GridItem xs={6} sm={6} md={6} style={{ paddingRight: 0 }}>
              <Button color="transparent" onClick={() => dispatch(cleanFilters())}>
                Quitar filtros
              </Button>
            </GridItem>
          </GridContainer>
          <h3>Rango de precio</h3>
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
          <br />
          <hr />
          <br />
          <h3>Categorías</h3>
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
            <Button color="primary" block style={{ marginTop: 30 }} onClick={() => dispatch(cleanFilters())}>
              QUITAR FILTROS
            </Button>
          </div>
        </div>
      </Hidden>
      <div className={classes.content}>
        <GridContainer className={classes.cardAlign}>
          {cards.length !== 0 ? (
            cards.map((item, i) => {
              return (
                <GridItem xs={12} sm={6} md={6} key={i}>
                  <Link to={`/card/detail/${item.id}`}>
                    <Card className={classes.textRight} id={item.id}>
                      <img className={classes.imgCardTop} src={item.image} alt="Card-img-cap" />
                      <CardBody className={classes.cardBody}>
                        <h4 className={classes.cardTitle}>{item.name}</h4>
                        <div className={classes.cardInfo}>
                          {item.amountsRange !== null ? (
                            <p
                              className={classes.cardPrice}
                            >{`$${item.amountsRange.minAmount} - $${item.amountsRange.maxAmount}`}</p>
                          ) : (
                            <p className={classes.cardPrice}>&nbsp;</p>
                          )}
                          <p className={classes.smallText}>Válido hasta {item.validity.description}</p>
                        </div>
                      </CardBody>
                    </Card>
                  </Link>
                </GridItem>
              );
            })
          ) : (
            <Box display="flex" flexDirection="column" height="100%" width="100%" justifyContent="center">
              <Box textAlign="center">
                <Typography align="center" color="textPrimary" variant="h5" className={classes.noresult}>
                  No hay resultados.
                </Typography>
              </Box>
            </Box>
          )}
        </GridContainer>
      </div>
    </div>
  );
}
