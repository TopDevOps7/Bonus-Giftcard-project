import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    display: "flex",
    [theme.breakpoints.down("sm")]: {
      overflowX: "hidden",
      margin: 0,
      flexDirection: "column",
    },
  },
  leftSide: {
    width: "55%",
    minHeight: "calc(100vh - 200px)",
    paddingTop: 45,
    [theme.breakpoints.down("sm")]: {
      minHeight: "auto",
      width: "100%",
      padding: 30,
    },
    [theme.breakpoints.down("xs")]: {
      padding: 10,
    },
  },
  leftTitle: {
    color: "#333",
    fontSize: 32,
    fontWeight: "bold",
    margin: "0 10px 25px auto",
    lineHeight: 2.2,
    width: "35vw",
    [theme.breakpoints.down("md")]: {
      width: "45vw",
    },
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      marginBottom: 0,
      marginTop: 5,
      fontSize: 24,
    },
  },
  finalBtn: {
    width: "100%",
    // [theme.breakpoints.down("md")]: {
    //   width: "100vw",
    // },
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
    minHeight: "calc(100vh - 200px)",
    width: "45%",
    paddingLeft: 30,
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
    width: "55%",
    [theme.breakpoints.down("md")]: {
      width: "70%",
    },
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  rightTitle: {
    lineHeight: 2.2,
    fontSize: 20,
    fontWeight: 450,
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
    width: "35vw",

    // display: "flex",
    // alignItems: "flex-end",
    // justifyItems: "space-between",
    // flexDirection: "column",
    [theme.breakpoints.down("md")]: {
      width: "45vw",
    },
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      padding: 0,
    },
  },
}));
export default useStyles;
