import React from "react";

import { makeStyles } from "@material-ui/styles";
import { deepOrange } from "@material-ui/core/colors";
import { Paper } from "@material-ui/core";

import styles from "./SubHeader.module.css";

const useStyles = makeStyles({
  root: {
    backgroundColor: deepOrange[100],
  }
});

const SubHeader = props => {
  const classes = useStyles();

  console.log(props);
  return (
    <Paper className={`${styles.root} ${classes.root}`} elevation={5}>
      {props.children}
    </Paper>
  );
};

export default SubHeader;
