import { makeStyles } from "@material-ui/core/styles";
import { container, title } from "../../assets/jss/material-kit-react";

const useStyles = makeStyles((theme) => ({
  root: {
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
  header: {
    height: 200,
    borderRadius: 30,
    backgroundColor: "#fff",
    marginTop: -90,
    display: "flex",
    justifyContent: "space-around",
    [theme.breakpoints.down("xs")]: {
      marginTop: -35,
    },
  },
  background: {
    backgroundSize: "100% 100%",
    backgroundRepeat: "no-repeat",
    height: 400,
    [theme.breakpoints.down("sm")]: {
      height: 300,
    },
    [theme.breakpoints.down("xs")]: {
      height: 200,
    },
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
  },
  cardDesign: {
    marginLeft: 15,
    position: "relative",
    color: "white",
    width: 338,
    "& img": {
      width: 338,
      height: 218
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
      // marginRight: "auto",
    },
  },
  cardDesignImages: {
    display: "flex",
    // height: 223,
    height: 80,
    [theme.breakpoints.down("xs")]: {
      marginLeft: 0,
    },
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
    }
  },
  description: {
    marginTop: -70,
    display: 'flex',
    justifyContent: "space-around",
    flexWrap: "wrap",
    alignItems: "end",
    [theme.breakpoints.down("xs")]: {

    }
  },
  rightPara: {
    width: "40%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    flexWrap: "wrap",
    [theme.breakpoints.down("xs")]: {
      width: "95%",
      justifyContent: "space-between",
    },
    "& span": {
      fontSize: 12
    },
  },
  leftPara: {
    width: "30%",
    [theme.breakpoints.down("xs")]: {
      width: "95%",
      marginTop: 5,
      marginBottom: 15
    }
  },
  link: {
    textDecoration: "underline",
  },
  leftSide: {
    width: "40%",
    marginLeft: 20,
    [theme.breakpoints.down("sm")]: {
      width: "100%",
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
    width: "40%",
    // textAlign: "center",
    "& h3": {
      fontWeight: 'bold',
      fontSize: 40,
    },
    [theme.breakpoints.down("xs")]: {
      width: "45%",
      "& h3": {
        fontSize: 30,
      },
    },
    [theme.breakpoints.down("sm")]: {
      "& h3": {
        fontSize: 35,
      },
    },
  },
  inputPara: {
    fontSize: 12,
    color: "#666",
  },
  rightTitle: {
    textAlign: "right",
    // marginTop: -50,
    "& h3": {
      fontSize: 34,
      fontWeight: 'bold',
      marginBottom: 0
    },
    width: "30%",
    [theme.breakpoints.down("xs")]: {
      width: "45%",
      "& h3": {
        fontSize: 24,
      },
      "& p": {
        fontSize: 12,
      },
      // marginTop: -40,
    },
    [theme.breakpoints.down("sm")]: {
      "& h3": {
        fontSize: 28,
      },
      "& p": {
        fontSize: 13,
      },
      // marginTop: -40,
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
      boxShadow: "0 14px 26px -12px rgb(153 153 153 / 42%), 0 4px 23px 0px rgb(0 0 0 / 12%), 0 8px 10px -5px rgb(153 153 153 / 20%)",
      backgroundColor: "#999999"
    },
    [theme.breakpoints.down("sm")]: {
      width: 70,
    },
  },
  rightSpan: {
    lineHeight: 5.2,
  },
  span: {
    marginRight: 50,
  },
  // submitButton: {
  //   background: "#FFFFFF 0% 0% no-repeat padding-box",
  //   color: "#00000061",
  //   // boxShadow: " 4px 2px 2px #00000024,-4px 2px 2px #00000024",
  //   opacity: 1,
  // },
  sections: {
    padding: "50px 0",
    [theme.breakpoints.down("sm")]: {
      width: "100vw",
      padding: 0,
    },
  },
  submitText: {
    color: "#00000099",
    marginTop: 20
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
}));
export default useStyles;
