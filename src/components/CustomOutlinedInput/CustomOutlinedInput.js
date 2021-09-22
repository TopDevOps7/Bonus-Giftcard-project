import React from 'react';
// nodejs library to set properties for components
import PropTypes from "prop-types";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { TextField, makeStyles } from "@material-ui/core";

import { Field } from "formik";

import styles from "assets/jss/material-kit-react/components/customOutlinedInputStyle";

const useStyles = makeStyles(styles);

const CustomOutlinedInput = ({
  type,
  value,
  error,
  name,
  info,
  className,
  block,
  id,
  ...rest
}) => {
  const classes = useStyles();
  classes;
  return (
    <>
      <Field name={name} id={id} value={value}>
        {({ field }) => (
          <TextField
            variant="outlined"
            margin="dense"
            type={type}
            className={classNames(className, { [classes.block]: block })}
            {...field}
            error={Boolean(error)}
            helperText={error}
            {...rest}
          // size="small"
          />
        )}
      </Field>
      {/* <p className={classes.error}>{error}</p> */}
      <p className={classes.info}>{info}</p>
    </>
  );
};

CustomOutlinedInput.propTypes = {
  id: PropTypes.string,
  type: PropTypes.string,
  className: PropTypes.string,
  info: PropTypes.string,
  error: PropTypes.string,
  block: PropTypes.bool,
  name: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default CustomOutlinedInput;
