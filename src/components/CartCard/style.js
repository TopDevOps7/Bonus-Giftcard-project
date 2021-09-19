import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    // width: "35vw",
    display: "flex",
    // alignItems: "start",
    justifyContent: "start",
    height: "auto",
    marginTop: 40,
    marginBottom: 20,
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
  },
  imageContainer: {
    width: 120,
    "& a": {
      display: "flex",
      alignItems: "center",
      marginTop: 5,
      fontSize: 14,
      fontWeight: 450
    }
  },
  image: {
    width: 106,
    height: 70,
    boxShadow: "2px 2px 10px -1px #00000042",
    borderRadius: 5,
    [theme.breakpoints.down("sm")]: {
      width: "106",
    },
  },
  infoContainer: {
    flex: 1,
    paddingRight: 20,
    [theme.breakpoints.down("sm")]: {
      paddingRight: 0,
    },
  },
  title: {
    marginBottom: 0,
    fontWeight: "bold",
    "&:first-child": {
      fontSize: 15
    },
    "&:last-child": {
      marginBottom: 20,
      fontWeight: 450
    }
  },
  descTitle: {
    marginBottom: 5,
    lineHeight: 1,
    fontSize: 13,
    marginTop: 20,
    fontWeight: 500,
  },
  desc: {
    fontSize: 12,
    lineHeight: 1.5,
  },
  amountContainer: {
    width: 100,
    textAlign: "center",
    [theme.breakpoints.down("sm")]: {
      width: "auto",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      flexWrap: "wrap"
    },
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
      justifyContent: "space-around",
      height: 65,
    },
  },
  count: {
    marginBottom: 20,
    [theme.breakpoints.down("sm")]: {
      margin: 10,
    },
  },
  price: {
    fontWeight: "bold",
    [theme.breakpoints.down("sm")]: {
      margin: 10,
    },
  },
  actionContainer: {
    width: 90,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
  },
  editIcon: {
    cursor: "pointer",
    margin: 10
  },
  btn: {
    backgroundColor: "#fff",
    color: "#0078D7",
    width: "auto",
    textTransform: "initial",
    padding: 10,
    "&:hover": {
      textDecoration: "underline",
      color: "#0078D7",
      // fontWeight: "bold",
    }
  },
  amountInput: {
    width: 100,
    height: 30,
    padding: 0,
    marginBottom: 20,

    "& input": {
      fontSize: 13,
      paddingTop: 8,
      paddingBottom: 8,
      textAlign: "center"
    },
    [theme.breakpoints.down("sm")]: {
      marginBottom: 0,
    }
  },
  amountControlBtn: {
    height: 30,
    width: 15,
    padding: 15,
    margin: 0,
    zIndex: 5
  },
  priceInput: {
    width: 90,
    height: 30,
    "& input": {
      fontSize: 13
    },
    "& p": {
      fontSize: 14
    }
  },
  descTitleEdit: {
    width: "100%",
    height: 40,
    "& input": {
      fontSize: 14,
      padding: "10px 14px"
    }
  },
  descEdit: {
  }
}));
export default useStyles;
