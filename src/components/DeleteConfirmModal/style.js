import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 700,
    textAlign: "center",
    top: 132,
    backgroundColor: "#fff",
    // border: '2px solid #000',
    borderRadius: 10,
    left: "50%",
    transform: "translate(-50%, 0)",
    // boxShadow: theme.shadows[5],
    padding: "40px 20px 20px",
    [theme.breakpoints.down("sm")]: {
      width: "80%",
    },
    [theme.breakpoints.down("xs")]: {
      width: "95%",
    },
  },
  close: {
    width: "100%",
    position: "relative",
  },
  closeIcon: {
    position: "absolute",
    top: -30,
    left: -10,
    // color: "#fff",
    cursor: "pointer",
    // [theme.breakpoints.down("xs")]: {
    //   top: -45,
    //   right: -20,
    // }
  },
  cardHeader: {
    "& h4": {
      fontWeight: "bold",
    },
  },
  cardBody: {
    [theme.breakpoints.down("xs")]: {
      fontSize: 14,
      overflowY: "auto",
    },
  },
  // dottedLine: {
  //   margin: "10px 0 20px",
  //   height: 1,
  //   flex: 1,
  //   backgroundImage: "linear-gradient(to right, #777 33%, rgba(255,255,255,0) 0%)",
  //   backgroundPosition: "bottom",
  //   backgroundSize: "5px 1px",
  //   backgroundRepeat: "repeat-x",
  // },
  // divider: {
  //   height: 1,
  //   backgroundColor: "#ccc",
  //   border: "none",
  // }
}));

export default useStyles;
