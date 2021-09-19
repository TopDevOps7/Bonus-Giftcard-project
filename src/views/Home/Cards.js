/* eslint-disable react/jsx-key */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react'
import {
  useSelector,
  useDispatch
} from "react-redux"
import {
  filterByCategory,
  getCards,
  cleanFilters,
  filterByPrice
} from "../../redux/actions/home"
import GridItem from "components/Grid/GridItem"
import GridContainer from "components/Grid/GridContainer"
import Slider from "@material-ui/core/Slider"
import { makeStyles } from '@material-ui/core/styles'
import Button from "components/CustomButtons/Button"
import Favorite from "@material-ui/icons/Favorite"
import Fastfood from "@material-ui/icons/Fastfood"
import LocalPharmacy from "@material-ui/icons/LocalPharmacy"
import EmojiNatureIcon from '@material-ui/icons/EmojiNature';
import MovieFilter from "@material-ui/icons/MovieFilter"
import ComputerIcon from '@material-ui/icons/Computer';
import Card from "components/Card/Card"
import CardBody from "components/Card/CardBody"
import { Link } from "react-router-dom";
import classNames from 'classnames';

import { cardTitle } from "assets/jss/material-kit-react";

const styles = {
  cardTitle,
  container: {
    margin: '30px auto',
    display: 'flex',
    alignItems: 'start',
  },
  textCenter: {
    textAlign: "center"
  },
  textRight: {
    textAlign: "right"
  },
  smallText: {
    fontSize: '12px'
  },
  cardAlign: {
    // marginLeft: '0 !important',
    // marginRight: '15px !important',
    // padding: '0 !important'
  },
  filterButton: {
    paddingLeft: 0,
    paddingRight: 0,
    textTransform: 'initial',
    fontSize: 15,
    justifyContent: 'space-between',
    '& .button-label': {
      display: 'flex',
      alignItems: 'center'
    },
    '& .button-label > span': {
      paddingTop: 5,
      paddingLeft: 8
    }
  },
  title: {
    marginTop: 10
  },
  sideFilter: {
    minWidth: '275px',
    maxWidth: '275px',
    width: '275px',
    marginRight: '50px',
    paddingLeft: 0,
    position: "sticky",
    top: 160
  },
  content: {
    flex: 1
  }
}

const useStyles = makeStyles(styles);

function valuetext(value) {
  return `${value}°C`;
}

export default function Cards() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [value, setValue] = useState([1, 5000]);
  const cards = useSelector((state) => state.home.filteredCards);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    dispatch(filterByPrice(newValue))
  };

  useEffect(() => {
    dispatch(getCards());
  }, [])

  return (
    <div className={classNames(classes.container, 'cardBanner')}>
      <div className={classes.sideFilter}>
        <GridContainer style={{ alignItems: 'center' }}>
          <GridItem xs={6} sm={6} md={6} style={{ paddingLeft: 0 }}>
            <h2 className={classes.title}>Filtros</h2>
          </GridItem>
          <GridItem xs={6} sm={6} md={6} style={{ paddingRight: 0 }}>
            <Button color="transparent" onClick={() => dispatch(cleanFilters())}>Quitar filtros</Button>
          </GridItem>
        </GridContainer>
        <h3>Rango de precio</h3>
        <GridContainer>
          <GridItem xs={6} sm={6} md={6} style={{ paddingLeft: 0 }}>
            <p>{`$${value[0] * 50}`}</p>
          </GridItem>
          <GridItem xs={6} sm={6} md={6} style={{ paddingRight: 0 }}>
            <p style={{ textAlign: 'right' }}>{`$${value[1] * 50}`}</p>
          </GridItem>
        </GridContainer>
        <Slider
          value={value}
          onChange={handleChange}
          valueLabelDisplay="auto"
          aria-labelledby="range-slider"
          getAriaValueText={valuetext}
          scale={(x) => x * 50}
        />
        <br />
        <br />
        <hr />
        <br />
        <h3>Categorías</h3>
        <div>
          <Button
            className={classes.filterButton}
            simple
            block
            color="github"
            onClick={() => dispatch(filterByCategory("Food"))}
          >
            <span className="button-label"><Fastfood /> <span>Comida y bebidas</span></span>
          </Button>
          <Button
            simple
            className={classes.filterButton}
            block
            color="github"
            onClick={() => dispatch(filterByCategory("Wellbeing"))}
          >
            <span className="button-label"><LocalPharmacy /> <span>Belleza y bienestar</span></span>
          </Button>
          <Button
            simple
            className={classes.filterButton}
            block
            color="github"
            onClick={() => dispatch(filterByCategory("Entertainment"))}
          >
            <span className="button-label"><MovieFilter /> <span>Entretenimiento</span></span>
          </Button>
          <Button
            simple
            className={classes.filterButton}
            block
            color="github"
            onClick={() => dispatch(filterByCategory("Fashion"))}
          >
            <span className="button-label"><Favorite /> <span>Moda</span></span>
          </Button>
          <Button
            simple
            className={classes.filterButton}
            block
            color="github"
            onClick={() => dispatch(filterByCategory("Travel"))}
          >
            <span className="button-label"><EmojiNatureIcon /> <span>Turismo y viajes</span></span>
          </Button>
          <Button
            simple
            className={classes.filterButton}
            block
            color="github"
            onClick={() => dispatch(filterByCategory("Digital"))}
          >
            <span className="button-label"><ComputerIcon /> <span>Tecnología</span></span>
          </Button>
        </div>
      </div>
      <div className={classes.content}>
        <GridContainer className={classes.cardAlign}>
          {cards.length !== 0 ? cards.map((item, i) => {
            return (
              <GridItem xs={6} sm={12} md={6} key={i}>
                <Link to={`/card/detail/${item.id}`}>
                  <Card className={classes.textRight} id={item.id}>
                    <img className={classes.imgCardTop} src={item.image} alt="Card-img-cap" />
                    <CardBody>
                      <h4 className={classes.cardTitle}>{item.name}</h4>
                      {item.amountsRange !== null ? (
                        <p>
                          {`$${item.amountsRange.minAmount} - $${item.amountsRange.maxAmount}`}
                        </p>
                      ) : <p>&nbsp;</p>}
                      <p className={classes.smallText}>Válido hasta {item.validity.description}</p>
                    </CardBody>
                  </Card>
                </Link>
              </GridItem>
            )
          }) : <p>No hay resultados</p>}
        </GridContainer>
      </div>
    </div>
  )
}

/**

 <GridContainer className={classNames('cardBanner', classes.container)}>
      <GridItem className={classNames(classes.sideFilter, 'hiddenFilters')} xs={12} sm={12} md={2}>
        <GridContainer style={{ alignItems: 'center' }}>
          <GridItem xs={6} sm={6} md={6} style={{ paddingLeft: 0 }}>
            <h2 className={classes.title}>Filtros</h2>
          </GridItem>
          <GridItem xs={6} sm={6} md={6} style={{ paddingRight: 0 }}>
            <Button color="transparent" onClick={() => dispatch(cleanFilters())}>Quitar filtros</Button>
          </GridItem>
        </GridContainer>
        <h3>Rango de precio</h3>
        <GridContainer>
          <GridItem xs={6} sm={6} md={6} style={{ paddingLeft: 0 }}>
            <p>{`$${value[0] * 50}`}</p>
          </GridItem>
          <GridItem xs={6} sm={6} md={6} style={{ paddingRight: 0 }}>
            <p style={{ textAlign: 'right' }}>{`$${value[1] * 50}`}</p>
          </GridItem>
        </GridContainer>
        <Slider
          value={value}
          onChange={handleChange}
          valueLabelDisplay="auto"
          aria-labelledby="range-slider"
          getAriaValueText={valuetext}
          scale={(x) => x * 50}
        />
        <br />
        <br />
        <hr />
        <br />
        <h3>Categorías</h3>
        <div>
          <Button
            className={classes.filterButton}
            simple
            block
            color="github"
            onClick={() => dispatch(filterByCategory("Food"))}
          >
            <span className="button-label"><Fastfood /> <span>Comida y bebidas</span></span>
          </Button>
          <Button
            simple
            className={classes.filterButton}
            block
            color="github"
            onClick={() => dispatch(filterByCategory("Wellbeing"))}
          >
            <span className="button-label"><LocalPharmacy /> <span>Belleza y bienestar</span></span>
          </Button>
          <Button
            simple
            className={classes.filterButton}
            block
            color="github"
            onClick={() => dispatch(filterByCategory("Entertainment"))}
          >
            <span className="button-label"><MovieFilter /> <span>Entretenimiento</span></span>
          </Button>
          <Button
            simple
            className={classes.filterButton}
            block
            color="github"
            onClick={() => dispatch(filterByCategory("Fashion"))}
          >
            <span className="button-label"><Favorite /> <span>Moda</span></span>
          </Button>
          <Button
            simple
            className={classes.filterButton}
            block
            color="github"
            onClick={() => dispatch(filterByCategory("Travel"))}
          >
            <span className="button-label"><EmojiNatureIcon /> <span>Turismo y viajes</span></span>
          </Button>
          <Button
            simple
            className={classes.filterButton}
            block
            color="github"
            onClick={() => dispatch(filterByCategory("Digital"))}
          >
            <span className="button-label"><ComputerIcon /> <span>Tecnología</span></span>
          </Button>
        </div>
      </GridItem>
      <GridItem xs={12} sm={12} md={6}>
        <GridContainer className={classes.cardAlign}>
          {cards.length !== 0 ? cards.map((item) => {
            return (
              <GridItem xs={6} sm={6} md={6}>
                <Link to={`/card/detail/${item.id}`}>
                  <Card className={classes.textRight} id={item.id}>
                    <img className={classes.imgCardTop} src={item.image} alt="Card-img-cap" />
                    <CardBody>
                      <h4 className={classes.cardTitle}>{item.name}</h4>
                      {item.amountsRange !== null ? (
                        <p>
                          {`$${item.amountsRange.minAmount} - $${item.amountsRange.maxAmount}`}
                        </p>
                      ) : <p>&nbsp;</p>}
                      <p className={classes.smallText}>Válido hasta {item.validity.description}</p>
                    </CardBody>
                  </Card>
                </Link>
              </GridItem>
            )
          }) : <p>No hay resultados</p>}
        </GridContainer>
      </GridItem>
    </GridContainer>

*/