import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 1080,
    width: "100%",
    margin: "35px auto",
    textAlign: "center",
  },
  img_mail: {
    width: "10%",
    [theme.breakpoints.down("700")]: {
      width: "20%",
    },
  },
  img_mail_: {
    width: "15%",
    [theme.breakpoints.down("700")]: {
      width: "25%",
    },
    [theme.breakpoints.down("400")]: {
      width: "40%",
    },
  },
  hr_center: {
    margin: "30px auto",
    width: "30%",
    [theme.breakpoints.down("700")]: {
      width: "50%",
    },
  },
  hr_style: {
    border: "1px solid #E5E5E5",
    margin: "auto",
  },
  txt_content_width: {
    width: "100%",
    [theme.breakpoints.down("700")]: {
      width: "80%",
      margin: "auto",
    },
  },
  txt_content: {
    letterSpacing: 0.18,
    color: "#000000DE",
    opacity: 1,
  },
  txt_content_bold: {
    fontWeight: "bold",
    letterSpacing: 0.18,
    color: "#000000DE",
    opacity: 1,
  },
  txt_content_sub: {
    fontSize: 11,
    letterSpacing: 0.1,
    color: "#000000DE",
    opacity: 1,
  },
  success_tittle: {
    font: "normal normal normal 48px/56px Roboto",
    letterSpacing: 0,
    color: "#000000DE",
    opacity: 1,
  },
  margin_top_30: {
    marginTop: 30,
  },
  margin_top_50: {
    marginTop: 50,
  },
  margin_top_150: {
    marginTop: 150,
  },
}));
export default useStyles;
