import React from "react";

import { Typography, Button } from "@material-ui/core";
import { Card, CardContent, CardActions, CardHeader } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

import classes from "./Event.module.css";
const useStyles = makeStyles({
  eventCard: {
    margin: "0 0 10px 0"
  },
  eventHeader: {
    paddingBottom: 0,
  },
  price: {
    fontSize: "1.5em"
  },
  eventDesc: {
    fontSize: '14pt',
  }
});

const Event = props => {
  const styles = useStyles();
  // console.log(props);

  const date = new Date(props.event.date).toDateString();
  return (
    <Card className={styles.eventCard}>
      <CardHeader
      className={styles.eventHeader}
        title={props.event.title}
        subheader={"Created by: " + props.event.creator.email}
      />
      <CardContent>
        <Typography className={styles.eventDesc} variant="body1">{props.event.description}</Typography>
        <Typography className={styles.price} variant="body2">
          ${props.event.price}
        </Typography>
        <Typography  variant="body2">{date}</Typography>
      </CardContent>
      <CardActions>
        <Button color="secondary" size="small">Book Event</Button>
      </CardActions>
    </Card>
  );
};

export default Event;
