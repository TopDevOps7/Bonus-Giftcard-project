// import {
// primaryColor,
// dangerColor,
// successColor,
// defaultFont,
// } from "assets/jss/material-kit-react";

const customOutlinedInputStyle = {
  root: {
    borderRadius: 5
  },
  info: {
    fontSize: 12,
    color: "#666",
    marginBottom: 20
  },
  error: {
    fontSize: 12,
    color: "red",
    marginBottom: 0
  },
  block: {
    width: "100%"
  },
  small: {
    height: 40,

    "& input": {
      padding: "10px 14px",
    }
  },
  large: {
    height: 56,

    "& input": {
      padding: "14px 14px",
    }
  },
  default: {
    height: 48,

    "& input": {
      padding: "18px 14px",
    }
  }
};

export default customOutlinedInputStyle;
