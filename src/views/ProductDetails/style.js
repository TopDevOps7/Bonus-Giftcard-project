import { makeStyles } from "@material-ui/core/styles";
import { container, title } from "../../assets/jss/material-kit-react";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 1080,
    fontFamily: "Roboto",
    color: "#000",
    margin: "auto",
    // width: "900px",
    [theme.breakpoints.down("xs")]: {
      overflowX: "hidden",
      width: "100vw",
      // margin: 0,
    },
  },
  pink_area: {
    backgroundColor: "#C099F8",
    fontWeight: "bold",
    fontSize: 14,
    padding: "3px 10px",
    width: "fit-content",
  },
  sub_discount: {
    backgroundColor: "white",
    borderTopRightRadius: 100,
    height: 32,
    marginLeft: -1,
    // [theme.breakpoints.up("1080")]: {
    //   height: "3.2vw",
    // },
    [theme.breakpoints.down(1500)]: {
      height: "2.1vw",
    },
    [theme.breakpoints.down(1350)]: {
      height: "2.15vw",
    },
    [theme.breakpoints.down("md")]: {
      height: "2.2vw",
    },
    [theme.breakpoints.down("xs")]: {
      height: "2.5vw",
    },
  },
  discount_div: {
    padding: 10,
  },

  discount: {
    textAlign: "center",
    padding: 0,
    minWidth: 120,
    marginLeft: "calc(100% - 120px)",
    backgroundImage: "linear-gradient( #6600EE 98%, white 2%)",
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
  header: {
    marginTop: 20,
    display: "flex",
    justifyContent: "space-around",
    flexWrap: "wrap",
  },
  background: {
    height: "auto",
    width: 100,
  },
  pBody: {
    display: "flex",
    marginTop: 40,
    justifyContent: "space-around",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      borderRadius: 50,
    },
  },
  divider: {
    height: 1,
    backgroundColor: "#ddd",
    border: "none",
    [theme.breakpoints.down("xs")]: {
      // width: "1%",
      margin: "auto 20px",
    },
  },
  label: {
    cursor: "pointer",
    marginRight: 5,
    "& span": {
      fontSize: 14,
    },
  },
  label_: {
    marginRight: 5,
    fontSize: 14,
    fontWeight: "bolder",
    color: "#AAAAAA",
  },
  label_top: {
    marginTop: 10,
  },
  logo: {
    width: "30px !important",
    height: "30px !important",
    position: "absolute",
    right: 30,
    top: 15,
  },
  cardDesign: {
    marginLeft: 15,
    position: "relative",
    color: "white",
    width: 338,
    "& img": {
      width: 338,
      height: 218,
    },
    "& .title": {
      position: "absolute",
      fontWeight: "bold",
      top: 5,
      right: 30,
    },
    "& .validDate": {
      position: "absolute",
      bottom: 5,
      left: 25,
    },
    [theme.breakpoints.down("sm")]: {
      marginLeft: 10,
    },
    [theme.breakpoints.down("xs")]: {
      marginLeft: 10,
      width: "auto",
      // marginRight: "auto",
      "& img": {
        width: "98%",
        height: "auto",
      },
    },
  },
  cardDesignImages: {
    display: "flex",
    height: 100,
    flexWrap: "wrap",
    marginBottom: 20,
    [theme.breakpoints.down("xs")]: {
      marginLeft: 0,
    },
  },
  field: {
    margin: "10px 0",
  },
  countryList: {
    ...theme.typography.body1,
  },
  cardDesignImage: {
    width: 50,
    height: 37,
    marginLeft: 8,
    border: "1px solid transparent",
    cursor: "pointer",
    "&.active": {
      cursor: "default",
      border: "1px solid #444",
      borderRadius: 5,
    },
  },
  description: {
    marginTop: 20,
    display: "flex",
    justifyContent: "space-around",
    flexWrap: "wrap",
    alignItems: "end",
    [theme.breakpoints.down("350")]: {
      marginTop: 0,
    },
  },
  rightPara: {
    width: "40%",
    display: "flex",
    justifyContent: "space-around",
    flexWrap: "wrap",
    [theme.breakpoints.down("xs")]: {
      width: "95%",
      justifyContent: "space-between",
      marginLeft: 30,
      marginRight: 30,
    },
    "& span": {
      fontSize: 12,
    },
    "& h3": {
      fontSize: 34,
      fontWeight: "bold",
      marginTop: -90,
    },
  },
  rightPara_: {
    width: "40%",
    marginRight: "1%",
    display: "flex",
    justifyContent: "flex-end",
    flexWrap: "wrap",
    [theme.breakpoints.down("xs")]: {
      width: "95%",
      justifyContent: "flex-end",
      marginLeft: 30,
      marginRight: 30,
    },
    "& span": {
      fontSize: 12,
    },
    "& h3": {
      fontSize: 34,
      fontWeight: "bold",
      marginTop: -90,
    },
  },
  leftPara: {
    width: "50%",
    [theme.breakpoints.down("xs")]: {
      width: "95%",
      marginTop: 5,
      marginBottom: 15,
      marginLeft: 20,
      marginRight: 20,
    },
    "& h3": {
      fontSize: 34,
      fontWeight: "bold",
      marginTop: 0,
    },
  },
  terms: {
    fontSize: 13,
    cursor: "pointer",
    textDecoration: "underline",
    color: "#3078D0",
  },
  leftSide: {
    width: "40%",
    marginLeft: 20,
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      marginLeft: 0,
    },
  },
  rightSide: {
    width: "40%",
    // marginRight: 30,
    [theme.breakpoints.down("sm")]: {
      width: "94%",
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  leftTitle: {
    width: "50%",
    "& h3": {
      fontSize: 34,
      fontWeight: "bold",
      marginTop: 0,
      marginLeft: 20,
    },
    [theme.breakpoints.down("530")]: {
      "& h3": {
        fontSize: 20,
        fontWeight: "bold",
        marginTop: 0,
      },
    },
    [theme.breakpoints.down("350")]: {
      width: "100%",
      marginLeft: 10,
      flexWrap: "wrap",
    },
  },
  inputPara: {
    fontSize: 12,
    color: "#666",
  },
  rightTitle: {
    width: "50%",
    textAlign: "right",
    "& h3": {
      fontSize: 34,
      fontWeight: "bold",
      marginTop: 0,
      marginRight: 30,
    },
    [theme.breakpoints.down("530")]: {
      "& h3": {
        fontSize: 20,
        fontWeight: "bold",
        marginTop: 0,
      },
    },
    [theme.breakpoints.down("350")]: {
      width: "100%",
      textAlign: "left",
      marginTop: 10,
      marginBottom: 15,
      marginLeft: 30,
      flexWrap: "wrap",
    },
  },
  price: {
    borderRadius: 300,
    backgroundColor: "#0000001E",
    color: "#000",
    padding: "10px 12px 5px",
    fontSize: 12,
    marginRight: 10,
    "&.active": {
      color: "#FFFFFF",
      boxShadow:
        "0 14px 26px -12px rgb(153 153 153 / 42%), 0 4px 23px 0px rgb(0 0 0 / 12%), 0 8px 10px -5px rgb(153 153 153 / 20%)",
      backgroundColor: "#999999",
    },
  },
  price_active: {
    background: "#EDE1FD",
    color: "black",
    border: "solid",
    borderWidth: 1,
  },
  rightSpan: {
    lineHeight: 5.2,
  },
  span: {
    marginRight: 50,
  },
  twoInput: {
    width: "100%",
    display: "flex",
    alignItems: "center",
  },
  couponInput: {
    width: "70%",
  },
  margin_top_20: {
    marginTop: 20,
  },
  couponButton: {
    width: "30%",
    marginTop: -8,
    marginLeft: -1,
  },
  sections: {
    padding: "50px 0",
    [theme.breakpoints.down("sm")]: {
      width: "100vw",
      padding: 0,
    },
  },
  submitText: {
    color: "#00000099",
    marginTop: 20,
  },
  container,
  title: {
    ...title,
    marginTop: 30,
    minHeight: 32,
    textDecoration: "none",
  },
  space50: {
    height: 50,
    display: "block",
  },
  space70: {
    height: 70,
    display: "block",
  },
  icons: {
    width: 17,
    height: 17,
    color: "#FFFFFF",
  },
  errorCouponText: {
    marginTop: -10,
    marginLeft: 15,
    color: "red",
    fontSize: 13,
  },
  loading: {
    marginLeft: 5,
  },
}));
export default useStyles;
