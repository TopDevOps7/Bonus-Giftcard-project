/* eslint-disable react/jsx-key */
/* eslint-disable prettier/prettier */
import React, { useEffect } from "react";
import classNames from "classnames";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { makeStyles, Hidden, Box, Typography, useTheme, useMediaQuery } from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import { Check } from "@material-ui/icons";

import { css } from "@emotion/react";
import PulseLoader from "react-spinners/PulseLoader";

import GridItem from "components/Grid/GridItem";
import GridContainer from "components/Grid/GridContainer";
import Button from "components/CustomButtons/Button";
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import { filterByCategory, getCards, cleanFilters, changePage } from "redux/actions/home";

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
  pagination: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
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
    marginTop: 15,
    [theme.breakpoints.down("530")]: {
      marginTop: 10,
    },
  },
  container: {
    maxWidth: 1080,
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
  discount: {
    textAlign: "center",
    minWidth: 120,
    marginLeft: "calc(100% - 120px)",
    backgroundColor: "#6600EE",
    padding: 10,
    borderTopLeftRadius: 10,
    color: "white",
    display: "flex",
    flexDirection: "column",
    transform: "translateY(-100%)",
    marginBottom: -70,
    "& br": {
      display: "none",
    },
    "& h1": {
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 0,
      marginTop: 0,
    },
    "& h2": {
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 0,
      marginTop: 0,
    },
    "& h3": {
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 0,
      marginTop: 0,
    },
    "& h4": {
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 0,
      marginTop: 0,
    },
    "& h5": {
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 0,
      marginTop: 0,
    },
    "& h6": {
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 0,
      marginTop: 0,
    },
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
      maxWidth: 220,
      whiteSpace: "normal",
      textAlign: "start",
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
  category_icon: {
    width: 30,
  },
});

const override = css`
  display: block;
  margin: 150px auto;
`;

const useStyles = makeStyles(styles);

export default function Cards() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const theme = useTheme();
  const navigate = useNavigate();
  const { partnerId } = useParams();
  const isXsMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const filterOptions = useSelector(({ home }) => home.filterOptions);
  const loading = useSelector(({ home }) => home.loading);
  const pagination = useSelector(({ home }) => home.pagination);
  const categories = useSelector(({ home }) => home.categories);

  sessionStorage.setItem("session", "session");
  // !partnerId && navigate("/2203c651-f239-436f-b813-2a988efcdf81");

  const { cards, count } = useSelector(({ home }) => {
    let filtered = home.cards
      .filter((x) => {
        let cats = x.categories;
        let dup = cats.filter((cat) => filterOptions.categories.includes(cat.name));
        return dup.length == 0 ? dup.length === filterOptions.categories.length : dup.length;
      })
      .filter((x) => {
        let range = filterOptions.price;
        if (!range?.length) return true;
        if (!x.amountsRange && !x.amountsFixed) return true;
        if (x.amountsRange) {
          if (
            (x.amountsRange.minAmount >= range[0] && x.amountsRange.minAmount < range[1]) ||
            (x.amountsRange.maxAmount > range[0] && x.amountsRange.maxAmount <= range[1])
          )
            return true;
        }
        if (x.amountsFixed.length != 0) {
          if (
            (x.amountsFixed[0].amount >= range[0] && x.amountsFixed[0].amount < range[1]) ||
            (x.amountsFixed[x.amountsFixed.length - 1].amount > range[0] &&
              x.amountsFixed[x.amountsFixed.length - 1].amount <= range[1])
          )
            return true;
        }
        return false;
      })
      .filter((x) => new RegExp(filterOptions.filterString, "i").test(x.name));
    return {
      count: Math.ceil(filtered.length / pagination.limit),
      cards: filtered.splice((pagination.page - 1) * pagination.limit, pagination.limit),
    };
  });

  const getStatus = (option) => {
    return filterOptions.categories.includes(option);
  };

  const handlePageChange = (evt, value) => {
    dispatch(changePage(value));
    window.scroll(0, isXsMobile ? 230 : 360);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    partnerId ? dispatch(getCards(partnerId, navigate)) : dispatch(getCards("", navigate));
    const timer = setTimeout(() => {
      dispatch(cleanFilters());
      dispatch(changePage(1));
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={classNames(classes.container, "cardBanner")}>
      <Hidden smDown>
        <div className={classes.sideFilter}>
          <h3>Categorías</h3>
          <div>
            {categories !== [] ? (
              categories.map((category) => (
                <Button
                  className={classNames(classes.filterButton, getStatus(category.name) && "active")}
                  simple
                  block
                  color="github"
                  onClick={() => dispatch(filterByCategory(category.name))}
                >
                  <span className="button-label">
                    {category.icon ? (
                      <img src={category.icon} className={classes.category_icon} />
                    ) : (
                      <div className={classes.category_icon}></div>
                    )}{" "}
                    <span>{category.name}</span>
                  </span>
                  {getStatus(category.name) && <Check color="primary" />}
                </Button>
              ))
            ) : (
              <div></div>
            )}
            <Button
              color="primary"
              block
              style={{ marginTop: 30 }}
              onClick={() => {
                document.getElementById("outlined-adornment-filter").value = "";
                dispatch(cleanFilters());
              }}
            >
              QUITAR FILTROS
            </Button>
          </div>
        </div>
      </Hidden>
      <div className={classes.content}>
        <GridContainer className={classes.cardAlign}>
          {cards.length !== 0 ? (
            <>
              <PulseLoader color={"#ab71ff"} speedMultiplier={1} loading={loading} css={override} size={15} margin={10} />
              {!loading && (
                <>
                  {cards.map((item, i) => {
                    let to = `card/detail/${item.id}`;
                    return (
                      <GridItem xs={12} sm={6} md={6} key={i}>
                        <Link to={to}>
                          <Card className={classes.textRight} id={item.id}>
                            <img
                              className={classes.imgCardTop}
                              src={item.image + "?w=300"}
                              alt="Card-img-cap"
                              width="100%"
                              draggable={false}
                            />
                            {item.discount && (
                              <div className={classes.discount} dangerouslySetInnerHTML={{ __html: item.discount.legend }}></div>
                            )}
                            <CardBody className={classes.cardBody}>
                              <h4 className={classes.cardTitle}>{item.name}</h4>
                              <div className={classes.cardInfo}>
                                {item.amountsRange !== null ? (
                                  <p className={classes.cardPrice}>{`$${item.amountsRange.minAmount / 100} - $${
                                    item.amountsRange.maxAmount / 100
                                  }`}</p>
                                ) : (
                                  <p className={classes.cardPrice}>
                                    {`$${item.amountsFixed[0].amount / 100} - $${
                                      item.amountsFixed[item.amountsFixed.length - 1].amount / 100
                                    }`}
                                  </p>
                                )}
                                <p className={classes.smallText}>Válido hasta {item.validity.description}</p>
                              </div>
                            </CardBody>
                          </Card>
                        </Link>
                      </GridItem>
                    );
                  })}
                  <GridItem xs={12} className={classes.pagination}>
                    <Pagination
                      count={count}
                      page={pagination.page}
                      color="primary"
                      variant="outlined"
                      shape="rounded"
                      size={isXsMobile ? "small" : "medium"}
                      onChange={handlePageChange}
                      showFirstButton
                      showLastButton
                    />
                  </GridItem>
                </>
              )}
            </>
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
