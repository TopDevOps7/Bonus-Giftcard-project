import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import QRCode from "react-qr-code";
import { useSelector } from "react-redux";
import { makeStyles, useMediaQuery, useTheme } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  root: {
    width: "100%",
    display: "flex",
    position: "relative",
    margin: "20px 0",
  },
  giftcardNamemobile: {
    position: "absolute",
    top: "18px",
    right: "31px",
    color: "#fff",
    fontSize: "14px",
  },
  imagecard: {
    visibility: "visible",
    width: "310px",
    marginLeft: "17px",
    marginTop: "10px",
    marginBottom: "10px",
  },

  amount: {
    position: "absolute",
    right: "30px",
    top: "50px",
    fontSize: "24px",
    color: "#fff",
    fontWeight: 700,
  },

  valid: {
    position: "absolute",
    right: "30px",
    top: "87px",
    color: "#fff",
    fontSize: "12px",
  },
  cardbox: {
    boxShadow: "2px 2px 13px -6px #00000087",
    width: "336px",
    height: "208px",
    position: "relative",
  },
  buyer: {
    position: "absolute",
    top: "147px",
    right: "30px",
    fontSize: "10px",
    color: "#fff",
  },
  boldspan: {
    fontWeight: "bold",
    fontSize: "16px",
  },
  successUUID: {
    position: "absolute",
    top: "170px",
    right: "30px",
    color: "#fff",
    fontSize: "10px",
  },
  bgPart_1: {
    top: "49px",
    right: "152px",
    width: "32.8px",
    bottom: "369px",
    zIndex: 3,
    position: "absolute",
  },
  textNumber: {
    position: "absolute",
    width: "270px",
    right: "30px",
    top: "114px",
    color: "#067BD8",
    fontWeight: "bold",
    fontSize: "16px",
    backgroundColor: "#EFEFEF",
    borderRadius: "10px",
    textAlign: "center",
  },
  leftSide: {
    flex: 0.5,
    backgroundColor: "#fff",
    padding: "30px 15px 0",
    borderRadius: "5px 0 0 5px",
    boxShadow: "2px 2px 13px -6px #00000087",
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
      color: "#fff",
    },
    "& > div > .giftcardName": {
      position: "absolute",
      top: 20,
      right: 20,
      fontSize: 14,
      margin: 0,
    },

    "& > div > .amount": {
      position: "absolute",
      top: 45,
      right: 20,
      fontSize: 24,
      fontWeight: "bold",
      margin: 0,
    },
    "& > div > .valid": {
      position: "absolute",
      top: 80,
      right: 20,
      fontSize: 12,
      margin: 0,
    },
    "& > div > .textNumber": {
      position: "absolute",
      width: "250px",
      top: 105,
      right: 20,
      fontSize: 16,
      color: "#067BD8",
      backgroundColor: "#EFEFEF",
      borderRadius: "10px",
      fontWeight: "bold",
      margin: 0,
    },
    "& > div > .buyer": {
      position: "absolute",
      bottom: 30,
      right: 20,
      fontSize: 10,
      margin: 0,
    },
    "& > div > .successUUID": {
      position: "absolute",
      bottom: 10,
      right: 20,
      fontSize: 10,
      margin: 0,
    },
  },
  rightSide: {
    flex: 0.5,
    padding: 14,
    maxWidth: "inherit",
    wordBreak: "break-all",
    borderRadius: "0 5px 5px 0",
    boxShadow: "2px 2px 13px -6px #00000087",
    backgroundColor: "#fff",
    "& h5": {
      fontWeight: "100",
      marginBottom: 10,
      fontSize: "14px",
      margin: 0,
    },
    "& p": {
      fontSize: "12px",
      margin: 0,
    },
  },
  rightSide_: {
    flex: 0.5,
    padding: 14,
    maxWidth: "inherit",
    wordBreak: "break-all",
    borderRadius: "0 5px 5px 0",
    boxShadow: "2px 2px 13px -6px #00000087",
    backgroundColor: "#fff",
    "& h4": {
      fontWeight: "bold",
      marginBottom: 0,
    },
    "& h5": {
      fontWeight: "100",
      margin: 0,
      fontSize: "14px",
    },
    "& p": {
      fontSize: "12px",
      margin: 0,
    },
  },
  bottomSide: {
    flex: "0.5",
    paddingLeft: "25px",
    paddingRight: "25px",
    paddingBottom: "20px",
    borderRadius: "0 5px 5px 0",
    backgroundColor: "#fff",
    fontSize: "14px",
    top: "235px",
    width: "335px",
    zIndex: -2,
    boxShadow: "2px 2px 13px -6px #00000087",
    "& h5": {
      fontWeight: "100",
      marginBottom: 10,
      fontSize: "14px",
      margin: 0,
    },
    "& p": {
      fontSize: "12px",
      margin: 0,
    },
  },
  bottomSide_: {
    flex: "0.5",
    paddingLeft: "25px",
    paddingRight: "25px",
    paddingBottom: "20px",
    borderRadius: "0 5px 5px 0",
    backgroundColor: "#fff",
    fontSize: "14px",
    top: "235px",
    width: "335px",
    zIndex: -2,
    boxShadow: "2px 2px 13px -6px #00000087",
    "& h4": {
      fontWeight: "bold",
      marginBottom: 0,
    },
    "& h5": {
      fontWeight: "100",
      margin: 0,
      fontSize: "14px",
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
      width: 30,
    },
  },

  qrBackground: {
    position: "absolute",
    top: 25,
    left: 30,
    backgroundColor: "#fff",
    width: "110px",
    height: "110px",
  },
  dotline_v_start: {
    position: "absolute",
    width: "100%",
    height: 10,
    borderRadius: "0px 0px 10px 10px",
    top: 0,
    background: "white",
    boxShadow: "0px -3px 1px 0px #0002 inset",
  },
  dotline_v_end: {
    position: "absolute",
    width: "100%",
    height: 10,
    borderRadius: "10px 10px 0px 0px",
    bottom: 0,
    background: "white",
    boxShadow: "0px 3px 1px 0px #0002 inset",
  },
  dotline_container_v: {
    alignItems: "center",
    position: "relative",
    width: "20px",
    backgroundColor: "white",
  },
  dotline_v: {
    position: "absolute",
    width: 12,
    top: 15,
    height: "calc(100% - 30px)",
    borderRight: "4px dotted #0004",
  },
  dotline_h_start: {
    position: "absolute",
    height: "100%",
    width: 10,
    borderRadius: "0px 10px 10px 0px",
    left: 0,
    background: "white",
    boxShadow: "-3px 0px 1px 0px #0002 inset",
  },
  dotline_h_end: {
    position: "absolute",
    height: "100%",
    width: 10,
    borderRadius: "10px 0px 0px 10px",
    right: 0,
    background: "white",
    boxShadow: "3px 0px 1px 0px #0002 inset",
  },
  dotline_container_h: {
    alignItems: "center",
    position: "relative",
    width: "336px",
    height: "20px",
    backgroundColor: "white",
  },
  dotline_h: {
    position: "absolute",
    height: 12,
    left: 15,
    width: "calc(100% - 30px)",
    borderBottom: "4px dotted #0004",
  },
  mobileqrBackground: {
    bottom: "184px",
    left: "50px",
    width: "110px",
    height: "110px",
    position: "relative",
    backgroundColor: "#fff",
  },
  qrImg: {
    position: "absolute",
    top: 5,
    left: 5,
  },
  margin_bottom_5: {
    marginBottom: 5,
  },
  margin_bottom_0: {
    marginBottom: 0,
  },
  margin_top_5: {
    marginTop: 5,
  },
  rowStyle: {
    marginTop: "40px",
    position: "relative",
  },
  logo: {
    width: "30px !important",
    height: "30px !important",
    position: "absolute",
    right: 30,
    top: 15,
  },
  logo_: {
    width: "30px !important",
    height: "30px !important",
    position: "absolute",
    right: 30,
    top: 25,
  },
}));

const Success = ({ item, successItem, buyer, email, phone }) => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
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
    <div>
      {!isMobile && (
        <div className={classes.root}>
          <div className={classes.leftSide}>
            <div>
              <img src={cardsDesign && cardsDesign.length != 0 && cardsDesign[cardNum].path} />
              {successItem.type == "qr" && successItem.number != null ? (
                <div className={classes.qrBackground}>
                  <QRCode className={classes.qrImg} title="test" value={successItem.number} size={100} />
                </div>
              ) : (
                <div></div>
              )}
              {item.cardsDesign.logo == "image" ? (
                <img className={classes.logo} src={item.logo} alt={item.giftcard.name} draggable={false} />
              ) : (
                <h5 className="giftcardName" style={{ color: item.cardsDesign.style }}>
                  {item.giftcard.name}
                </h5>
              )}
              <h5 className="amount" style={{ color: item.cardsDesign.style }}>
                {item.amount / 100 + " mxn"}
              </h5>
              {successItem.type == "text" && successItem.number != null ? (
                <h5 className="textNumber">&nbsp;&nbsp;{successItem.number}&nbsp;&nbsp;</h5>
              ) : (
                <div></div>
              )}
              {successItem.validity == null ? (
                <h5 className="valid" style={{ color: item.cardsDesign.style }}>
                  {"Vigencia: "}
                </h5>
              ) : (
                <h5 className="valid" style={{ color: item.cardsDesign.style }}>
                  {"Vigencia: " + successItem.validity.description.substr(0, 10)}
                </h5>
              )}
              {successItem.number == null ? (
                successItem.gift ? (
                  <h4 className="buyer" style={{ color: item.cardsDesign.style }}>
                    {successItem.gift.name}
                  </h4>
                ) : (
                  <h4 className="buyer"></h4>
                )
              ) : (
                <h4 className="buyer" style={{ color: item.cardsDesign.style }}>
                  {buyer}
                </h4>
              )}
              {successItem.number == null ? (
                <p className="successUUID" style={{ color: item.cardsDesign.style }}>
                  {successItem.orderId}
                </p>
              ) : (
                <p className="successUUID" style={{ color: item.cardsDesign.style }}>
                  {successItem.uuid}
                </p>
              )}
            </div>
            <br />
          </div>
          <div className={classes.dotline_container_v}>
            <div className={classes.dotline_v_start}></div>
            <div className={classes.dotline_v}></div>
            <div className={classes.dotline_v_end}></div>
          </div>
          {successItem.number == null ? (
            successItem.gift ? (
              <div className={classes.rightSide_}>
                <h4>De: </h4>
                <h5>
                  <span className={classes.boldspan}>{buyer}</span>
                </h5>
                <h5>{email}</h5>
                <h5>{phone}</h5>
                <h4>Para: </h4>
                <span className={classes.boldspan}>{successItem.gift.name}</span>
                <h5>{successItem.gift.email}</h5>
                <h5>{successItem.gift.message}</h5>
              </div>
            ) : (
              <div className={classes.rightSide_}>
                <h4>De: </h4>
                <h5>
                  <span className={classes.boldspan}>{buyer}</span>
                </h5>
                <h5>{email}</h5>
                <h5>{phone}</h5>
                <h4>Para: </h4>
              </div>
            )
          ) : (
            <div className={classes.rightSide}>
              <br />
              <h5>
                <span className={classes.boldspan}>{buyer}</span>
              </h5>
              <h5>{email}</h5>
              <h5>{phone}</h5>
            </div>
          )}
        </div>
      )}
      {isMobile && (
        <div className={classes.rowStyle}>
          <div className={classes.cardbox}>
            <img className={classes.imagecard} src={cardsDesign && cardsDesign.length != 0 && cardsDesign[cardNum].path} />
            {successItem.type == "qr" && successItem.number != null ? (
              <div className={classes.mobileqrBackground}>
                <QRCode className={classes.qrImg} title="test" value={successItem.number} size={100} />
              </div>
            ) : (
              <div className={classes.mobileqrBackground1}></div>
            )}
            {item.cardsDesign.logo == "image" ? (
              <img className={classes.logo_} src={item.logo} alt={item.giftcard.name} draggable={false} />
            ) : (
              <h5 className={classes.giftcardNamemobile} style={{ color: item.cardsDesign.style }}>
                {item.giftcard.name}
              </h5>
            )}
            <h5 className={classes.amount} style={{ color: item.cardsDesign.style }}>
              {item.amount / 100 + " mxn"}
            </h5>
            {successItem.type == "text" && successItem.number != null ? (
              <h5 className={classes.textNumber}>&nbsp;&nbsp;{successItem.number}&nbsp;&nbsp;</h5>
            ) : (
              <div></div>
            )}
            {successItem.validity == null ? (
              <h5 className={classes.valid} style={{ color: item.cardsDesign.style }}>
                {"Vigencia: "}
              </h5>
            ) : (
              <h5 className={classes.valid} style={{ color: item.cardsDesign.style }}>
                {"Vigencia: " + successItem.validity.description.substr(0, 10)}
              </h5>
            )}
            {successItem.number == null ? (
              successItem.gift ? (
                <h4 className={classes.buyer} style={{ color: item.cardsDesign.style }}>
                  {successItem.gift.name}
                </h4>
              ) : (
                <h4 className={classes.buyer}></h4>
              )
            ) : (
              <h4 className={classes.buyer} style={{ color: item.cardsDesign.style }}>
                {buyer}
              </h4>
            )}
            {successItem.number == null ? (
              <p className={classes.successUUID} style={{ color: item.cardsDesign.style }}>
                {successItem.orderId}
              </p>
            ) : (
              <p className={classes.successUUID} style={{ color: item.cardsDesign.style }}>
                {successItem.uuid}
              </p>
            )}
          </div>
          <div className={classes.dotline_container_h}>
            <div className={classes.dotline_h_start}></div>
            <div className={classes.dotline_h}></div>
            <div className={classes.dotline_h_end}></div>
          </div>
          {successItem.number == null ? (
            <div className={classes.bottomSide_}>
              <h4 style={{ marginTop: "0" }}>De: </h4>
              <h5>
                <span className={classes.boldspan}>{buyer}</span>
              </h5>
              <h5>{email}</h5>
              <h5>{phone}</h5>
              <h4>Para: </h4>
              <span className={classes.boldspan}>{successItem.gift.name}</span>
              <h5>{successItem.gift.email}</h5>
              <h5>{successItem.gift.message}</h5>
            </div>
          ) : (
            <div className={classes.bottomSide}>
              <br />
              <h5>
                <span className={classes.boldspan}>{buyer}</span>
              </h5>
              <h5>{email}</h5>
              <h5>{phone}</h5>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

Success.prototype = {
  item: PropTypes.object,
};

export default Success;
