import React from 'react';
// nodejs library to set properties for components
import PropTypes from "prop-types";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { OutlinedInput, makeStyles } from "@material-ui/core";

import { Field } from "formik";

import styles from "assets/jss/material-kit-react/components/customOutlinedInputStyle";

const useStyles = makeStyles(styles);

const CustomOutlinedInput = ({
  type,
  placeholder,
  value,
  error,
  name,
  info,
  label,
  startAdornment,
  endAdornment,
  style,
  className,
  size,
  block,
  id,
  multiline,
  ...rest
}) => {
  const classes = useStyles();
  return (
    <>
      <h6>{label}</h6>
      <Field name={name} id={id} value={value}>
        {({ field }) => (
          <OutlinedInput
            id={id}
            className={classNames({
              [classes.block]: block,
              [classes.small]: !multiline && size === "small",
              [classes.large]: !multiline && size === "large",
              [classes.default]: !multiline && (size === "default" || (size !== "small" && size !== "large"))
            }, className, classes.root)}
            style={style}
            type={type}
            placeholder={placeholder}
            {...field}
            error={Boolean(error)}
            startAdornment={startAdornment}
            endAdornment={endAdornment}
            multiline={multiline}
            {...rest}
          />
        )}
      </Field>
      <p className={classes.error}>{error}</p>
      <p className={classes.info}>{info}</p>
    </>
  );
};

CustomOutlinedInput.propTypes = {
  id: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  size: PropTypes.string,
  info: PropTypes.string,
  label: PropTypes.string,
  style: PropTypes.object,
  error: PropTypes.string,
  block: PropTypes.bool,
  multiline: PropTypes.bool,
  name: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  startAdornment: PropTypes.node,
  endAdornment: PropTypes.node
};

export default CustomOutlinedInput;
