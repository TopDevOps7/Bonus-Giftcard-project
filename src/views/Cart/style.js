import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 1080,
    width: "100%",
    display: "flex",
    margin: "-35px auto",
    [theme.breakpoints.down("sm")]: {
      overflowX: "hidden",
      margin: 0,
      flexDirection: "column",
    },
  },
  leftSide: {
    width: "60%",
    minHeight: "calc(100vh - 170px)",
    paddingTop: 45,
    [theme.breakpoints.down("sm")]: {
      minHeight: "auto",
      width: "100%",
      paddingLeft: "5%",
      paddingRight: "5%",
    },
  },
  leftTitle: {
    color: "#333",
    fontSize: 32,
    fontWeight: "bold",
    margin: "0 10px 25px auto",
    lineHeight: 2.2,
    width: "85%",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      marginBottom: 0,
      marginTop: 5,
      fontSize: 24,
    },
  },
  finalBtn: {
    width: "100%",
  },
  finalPara: {
    textAlign: "center",
    marginTop: 20,
  },
  wiithButton: {
    width: "100%",
    "& .MuiOutlinedInput-adornedEnd": {
      paddingRight: 0,
    },
  },
  applyButton: {
    margin: 0,
    height: 40,
    width: 96,
    zIndex: 5,
  },
  rightSide: {
    minHeight: "calc(100vh - 170px)",
    width: "40%",
    paddingTop: 35,
    background: " #F8F8F8 0% 0% no-repeat padding-box",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      minHeight: "auto",
      padding: "20px 30px",
    },
    [theme.breakpoints.down("xs")]: {
      padding: 15,
    },
  },
  rightBody: {
    width: "90%",
    paddingLeft: "10%",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      paddingLeft: "1%",
      paddingRight: "1%",
    },
  },
  rightTitle: {
    lineHeight: 2.2,
    fontSize: 20,
    fontWeight: 500,
    paddingTop: 30,
    [theme.breakpoints.down("sm")]: {
      lineHeight: 2,
      fontSize: 18,
      marginTop: 0,
    },
  },
  rightSubTitle: {
    lineHeight: 4,
    fontSize: 16,
    display: "flex",
    alignItems: "baseline",
    justifyContent: "space-between",
    "& .total": {
      fontSize: 20,
    },
    [theme.breakpoints.down("sm")]: {
      margin: 0,
      fontSize: 15,
      "& .total": {
        fontSize: 18,
      },
    },
  },
  dottedLine: {
    margin: "0 5px",
    height: 1,
    flex: 1,
    backgroundImage: "linear-gradient(to right, black 33%, rgba(255,255,255,0) 0%)",
    backgroundPosition: "bottom",
    backgroundSize: "5px 1px",
    backgroundRepeat: "repeat-x",
  },
  product: {
    marginTop: 20,
    marginRight: 10,
    marginLeft: "auto",
    width: "85%",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      padding: 0,
    },
  },
  margin_bottom_400: {
    marginBottom: 400,
  },
  margin_top_50: {
    marginTop: 50,
  },
  margin_top_80: {
    marginTop: 80,
  },
  couponDiv: {
    marginTop: 20,
    marginBottom: -20,
  },
  twoInput: {
    width: "100%",
    display: "flex",
    alignItems: "center",
  },
  couponInput: {
    width: "70%",
  },
  couponButton: {
    width: "30%",
    marginTop: -8,
    marginLeft: -1,
  },
  errorCouponText: {
    marginTop: -10,
    marginLeft: 15,
    color: "red",
    fontSize: 13,
  },
  successCouponText: {
    marginTop: -10,
    marginLeft: 15,
    color: "green",
    fontSize: 13,
  },
  recalcTotalText: {
    marginTop: 20,
    textAlign: "right",
    marginBottom: -45,
    fontSize: 13,
  },
  recalcTotalText_: {
    marginTop: 40,
    textAlign: "right",
    marginBottom: -45,
    fontSize: 13,
  },
  loading: {
    marginLeft: 5,
  },
}));
export default useStyles;
