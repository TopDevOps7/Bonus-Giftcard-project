import React from 'react';
import PropTypes from "prop-types";
import QRCode from "react-qr-code";

import { makeStyles } from "@material-ui/core";

import bgPart from 'assets/img/success-bg-part.png';

const useStyles = makeStyles(() => ({
  root: {
    width: "100%",
    display: "flex",
    // alignItems: "start",
    // justifyContent: "space-between",
    position: "relative",
    margin: "20px 0",
  },
  leftSide: {
    flex: 0.5,
    backgroundColor: "#fff",
    padding: "30px 15px 0",
    borderRadius: "5px 0 0 5px",
    boxShadow: '2px 2px 13px -6px #00000087',
    textAlign: "center",
    "& > div > img": {
      width: 290,
      height: 175,
      borderRadius: 15,
    },
    "& > p": {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    },
    "& > div": {
      position: "relative",
      width: 290,
      height: 175,
      color: "#fff"
    },
    "& > div > .companyName": {
      position: "absolute",
      top: 10,
      right: 20,
      fontSize: 12,
      margin: 0,
    },
    "& > div > .title": {
      position: "absolute",
      top: 30,
      right: 20,
      fontSize: 22,
      fontWeight: "bold",
      margin: 0,
    },
    "& > div > .expireDate": {
      position: "absolute",
      bottom: 5,
      left: 15,
      fontSize: 12,
      margin: 0,
    },
  },
  rightSide: {
    flex: 0.5,
    padding: 14,
    borderRadius: "0 5px 5px 0",
    boxShadow: '2px 2px 13px -6px #00000087',
    backgroundColor: "#fff",
    "& h4": {
      fontSize: "16px",
      fontWeight: "bold",
      margin: 0,
    },
    "& h5": {
      fontWeight: "450",
      marginBottom: 20,
      fontSize: "14px",
      margin: 0,
    },
    "& p": {
      fontSize: "12px",
      margin: 0,
    },
  },
  bgPart: {
    width: 30,
    position: "relative",
    "& > img": {
      position: "absolute",
      height: "100%",
      top: 0,
      left: 0,
      width: 30
    }
  },
  dottedLineVertical: {
    margin: 15,
    marginBottom: 15,
    width: 1,
    flex: 1,
    height: "100%",
    backgroundImage: "linear-gradient(to right, #777 33%, rgba(255,255,255,0) 0%)",
    backgroundPosition: "bottom",
    backgroundSize: "1px 5px",
    backgroundRepeat: "repeat-y",
  }
}));

const Success = ({ item }) => {

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.leftSide}>
        <div>
          <img src={item.image} />
          <h5 className="companyName">Nombre de empresa</h5>
          <h4 className="title">DESCUENTO</h4>
          <p className="expireDate">FECHA DE EXPIRACIÓN</p>
        </div>
        <br />
        <hr />
        <p><span>Status de entrega:</span> <span>Enviada</span></p>
      </div>
      <div className={classes.bgPart}>
        <div className={classes.dottedLineVertical} />
        <img src={bgPart} />
      </div>
      <div className={classes.rightSide}>
        <h4>De: </h4>
        <h5>{item.name}</h5>
        <h4>Para: </h4>
        <h5 style={{ marginBottom: 0 }}>{item.para}</h5>
        <h5>Email: {item.email}</h5>

        <p>{item.mensaje} </p>
        <QRCode title="test" value="hello" size={100} />
      </div>
    </div>
  )
}

Success.prototype = {
  item: PropTypes.object
}

export default Success;