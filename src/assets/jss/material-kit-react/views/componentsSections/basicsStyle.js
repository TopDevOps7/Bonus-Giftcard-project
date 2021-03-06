import { container, title } from "assets/jss/material-kit-react";
import customCheckboxRadioSwitch from "assets/jss/material-kit-react/customCheckboxRadioSwitch";

const basicsStyle = (theme) => ({
  sections: {
    padding: "70px 0",
  },
  container,
  content: {
    marginTop: 146,
    marginBottom: 50,
    paddingTop: 1,
    [theme.breakpoints.down("sm")]: {
      marginTop: 130,
    },
  },
  hiddenContent: {
    [theme.breakpoints.down("sm")]: {
      marginTop: 82,
    },
  },
  title: {
    ...title,
    marginTop: "30px",
    minHeight: "32px",
    textDecoration: "none",
  },
  space50: {
    height: "50px",
    display: "block",
  },
  space70: {
    height: "70px",
    display: "block",
  },
  icons: {
    width: "17px",
    height: "17px",
    color: "#FFFFFF",
  },
  ...customCheckboxRadioSwitch,
});

export default basicsStyle;
