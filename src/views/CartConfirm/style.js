import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 1080,
    width: "100%",
    display: "flex",
    margin: "-35px auto",
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
      fontWeight: "bold",
    },
    "& p": {
      margin: 0,
      fontSize: 12,
    },
  },
  Breadcrumb: {
    display: "flex",
    alignItems: "center",
  },
  MainBreadcrumb: {
    fontSize: 12,
    color: "#0078D7",
  },
  ArrowBreadcrumb: {
    fontSize: 12,
  },
  SubBreadcrumb: {
    fontSize: 12,
  },
  OrderIdTittle: {
    textAlign: "right",
    fontSize: 12,
  },
  leftSide: {
    width: "60%",
    minHeight: "calc(100vh - 170px)",
    paddingTop: 45,
    [theme.breakpoints.down("md")]: {},
    [theme.breakpoints.down("sm")]: {
      minHeight: "auto",
      width: "100%",
      padding: 30,
    },
    [theme.breakpoints.down("xs")]: {
      padding: 15,
    },
  },
  leftBody: {
    width: "85%",
    marginLeft: "auto",
    marginRight: "5%",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      margin: "0 auto",
    },
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  },
  leftTitle: {
    color: "#333",
    fontSize: 20,
    fontWeight: "bold",
    margin: 0,
    lineHeight: 2.2,
  },
  marginY2: {
    margin: "15px 0",
  },
  twoInput: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    margin: "20px 0",
  },
  cardMargin: {
    margin: "20px 0",
  },
  twoLeft: {
    "& .MuiOutlinedInput-root": {
      borderRadius: "5px 0 0 5px",
      borderRight: "0.5px solid #0000003b",
      "& .MuiOutlinedInput-notchedOutline": {
        borderRight: "none",
      },
      "&:hover": {
        borderRight: "1px solid #000000",
      },
      "&.Mui-focused": {
        borderRight: `2px solid ${theme.palette.primary.main}`,
      },
    },
    "& .MuiFormHelperText-root": {
      letterSpacing: "-0.2px",
    },
  },
  twoRight: {
    "& .MuiOutlinedInput-root": {
      borderRadius: "0 5px 5px 0",
      // borderLeft: "0.5px solid #0000003b",
      "& .MuiOutlinedInput-notchedOutline": {
        borderLeft: "none",
      },
      "&:hover": {
        borderLeft: "1px solid #000000",
      },
      "&.Mui-focused": {
        borderLeft: `2px solid ${theme.palette.primary.main}`,
      },
    },
  },
  width100: {
    width: "100%",
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
    paddingTop: 30,
    background: " #F8F8F8 0% 0% no-repeat padding-box",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      minHeight: "auto",
      padding: 30,
    },
    [theme.breakpoints.down("xs")]: {
      padding: "20px 15px",
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
    fontWeight: 450,
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
      padding: 0,
    },
  },

  cc_logo: {
    opacity: 0.35,
  },

  cc_logo_active: {
    opacity: 1,
  },

  error_valid: {
    color: "#2ECC40",
  },

  error_invalid: {
    color: "#FF4136",
  },

  error_text: {
    fontWeight: "bold",
    marginTop: 10,
    marginLeft: "8px",
    display: "none",
  },

  error_text_: {
    fontWeight: "bold",
    marginTop: 10,
    marginLeft: "8px",
  },

  cardNumber_input: {
    width: "100%",
    height: "40px",
    borderColor: "#c6c6c6",
    borderStyle: "solid",
    borderRadius: "5px",
    borderWidth: "1px",
  },

  cardNumber_input_: {
    marginTop: "10px",
    marginBottom: "8px",
    marginLeft: "10px",
    fontSize: "16px",
    height: "20px",
    borderColor: "#FFFFFF",
    borderWidth: "0px",
  },

  align_center: {
    textAlign: "center",
  },
}));
export default useStyles;
