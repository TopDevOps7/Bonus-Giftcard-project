import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    display: "flex",
    [theme.breakpoints.down("sm")]: {
      overflowX: "hidden",
      // width: "100",
      margin: 0,
      flexDirection: "column",
    },
  },
  titleContainer: {
    display: "flex",
    alignItems: "center",
    "& > div": {
      marginLeft: 15,
    },
    "& h3": {
      margin: 0,
      fontSize: 20,
      fontWeight: "bold"
    },
    "& p": {
      margin: 0,
      fontSize: 12,
    },
  },
  leftSide: {
    width: "55%",
    minHeight: "calc(100vh - 200px)",
    paddingTop: 45,
    [theme.breakpoints.down("md")]: {},
    [theme.breakpoints.down("sm")]: {
      minHeight: "auto",
      width: "100%",
      padding: 30
    },
    [theme.breakpoints.down("xs")]: {
      padding: 15
    },
  },
  leftBody: {
    width: "70%",
    marginLeft: "auto",
    marginRight: 60,
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      margin: "0 auto"
    },
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  },
  leftTitle: {
    color: "#333",
    fontSize: 20,
    fontWeight: "bold",
    margin: "0 0 25px",
    lineHeight: 2.2,
  },

  twoInput: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    margin: "30px 0",
  },
  twoLeft: {
    "& .MuiOutlinedInput-root": {
      borderRadius: "5px 0 0 5px",
      borderRight: "0.5px solid #0000003b",
      "& .MuiOutlinedInput-notchedOutline": {
        borderRight: "none"
      },
      "&:hover": {
        borderRight: "1px solid #000000",
      },
      "&.Mui-focused": {
        borderRight: `2px solid ${theme.palette.primary.main}`,
      },
    }
  },
  twoRight: {
    "& .MuiOutlinedInput-root": {
      borderRadius: "0 5px 5px 0",
      // borderLeft: "0.5px solid #0000003b",
      "& .MuiOutlinedInput-notchedOutline": {
        borderLeft: "none"
      },
      "&:hover": {
        borderLeft: "1px solid #000000",
      },
      "&.Mui-focused": {
        borderLeft: `2px solid ${theme.palette.primary.main}`,
      },
    }
  },
  width100: {
    width: "100%"
  },
  nameInput: {
    flex: 0.7,
  },
  cpInput: {
    flex: 0.3,
  },
  dateInput: {
    flex: 0.5,
  },
  cvcInput: {
    flex: 0.5,
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
      paddingRight: 0
    }
  },
  applyButton: {
    margin: 0,
    height: 40,
    width: 96,
    zIndex: 5
  },
  rightSide: {
    minHeight: "calc(100vh - 200px)",
    width: "45%",
    paddingLeft: 40,
    paddingTop: 30,
    background: " #F8F8F8 0% 0% no-repeat padding-box",
    [theme.breakpoints.down("md")]: {
      paddingLeft: 30,
      paddingTop: 30,
    },
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      minHeight: "auto",
      padding: 30,
    },
    [theme.breakpoints.down("xs")]: {
      padding: "20px 15px"
    },
  },
  rightBody: {
    width: "55%",
    [theme.breakpoints.down("md")]: {
      width: "75%",
    },
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  rightTitle: {
    lineHeight: 2.2,
    fontSize: 20,
    fontWeight: 450,
  },
  rightSubTitle: {
    lineHeight: 4,
    fontSize: 16,
    display: "flex",
    alignItems: "baseline",
    justifyContent: "space-between",
    "& .total": {
      fontSize: 20
    }
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

    // display: "flex",
    // alignItems: "flex-end",
    // justifyItems: "space-between",
    // flexDirection: "column",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      padding: 10,
    },
    [theme.breakpoints.down("xs")]: {
      padding: 0
    },
  },
}));
export default useStyles;
