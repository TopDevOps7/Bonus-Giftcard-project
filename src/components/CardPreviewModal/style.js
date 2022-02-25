import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 330,
    top: 132,
    backgroundColor: "transparent",
    // border: '2px solid #000',
    left: "50%",
    transform: "translate(-50%, 0)",
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
  cardBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 330,
    borderRadius: 5,
    zIndex: -1,
  },
  cardInfo: {
    margin: "56px auto 0",
    width: 296,
    position: "relative",
    color: "#fff",
  },
  logo: {
    width: "30px !important",
    height: "30px !important",
    position: "absolute",
    right: 20,
    top: 10,
  },
  cardImg: {
    width: 296,
    height: 185,
    borderRadius: 10,
    // boxShadow: "2px 2px 10px -1px #00000042"
  },
  cardName: {
    position: "absolute",
    fontSize: 16,
    top: 16,
    right: 18,
    margin: 0,
  },
  cardPrice: {
    top: 37,
    fontSize: 24,
    right: 18,
    position: "absolute",
    fontWeight: "bold",
    margin: 0,
  },
  validDate: {
    fontSize: 14,
    bottom: 8,
    left: 15,
    position: "absolute",
    margin: 0,
  },
  dottedLine: {
    margin: 30,
    marginBottom: 20,
    height: 1,
    flex: 1,
    backgroundImage: "linear-gradient(to right, #777 33%, rgba(255,255,255,0) 0%)",
    backgroundPosition: "bottom",
    backgroundSize: "5px 1px",
    backgroundRepeat: "repeat-x",
  },
  cardBody: {
    background: "white",
    borderRadius: 5,
    padding: 30,
    paddingTop: 0,
  },
  title: {
    fontSize: 16,
    margin: 0,
    fontWeight: 500,
  },
  text: {
    fontSize: 14,
    margin: 0,
  },
  divider: {
    height: 1,
    backgroundColor: "#ccc",
    border: "none",
  },
}));

export default useStyles;
