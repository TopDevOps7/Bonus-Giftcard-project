import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      alignItems: "center",
    },
    [theme.breakpoints.down("xs")]: {
      alignItems: "end",
    },
  },
  paper: {
    // position: "absolute",
    width: 330,
    // top: 132,
    borderRadius: 15,
    marginBottom: 10,
    backgroundColor: "#FFF",
    // border: '2px solid #000',
    // left: "50%",
    // transform: "translate(-50%, 0)",
    // boxShadow: theme.shadows[5],
    padding: 0,
    minHeight: 367,
  },
  close: {
    width: "100%",
    position: "relative",
  },
  closeIcon: {
    position: "absolute",
    top: -20,
    right: -25,
    color: "#fff",
    cursor: "pointer",
    [theme.breakpoints.down("xs")]: {
      top: -30,
      right: 10,
    },
  },
  modalBody: {
    margin: "25px auto",
    width: 296,
    position: "relative",
    // color: "#fff",
  },
  filterButton: {
    padding: 0,
    textTransform: "initial",
    fontSize: 13,
    justifyContent: "space-between",
    "&.active": {
      "& .button-label": {
        color: theme.palette.primary.main,
      },
    },
    "& .button-label": {
      display: "flex",
      alignItems: "center",
    },
    "& .button-label > span": {
      paddingTop: 5,
      paddingLeft: 8,
    },
  },
  category_icon_m: {
    width: 30,
  },
}));

export default useStyles;
