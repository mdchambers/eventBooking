import React, { useState } from "react";

import { Grid, Paper, Button, Typography } from "@material-ui/core";

import EventInput from "../components/Events/EventInput";
// import SubHeader from "../components/UI/SubHeader";
import styles from "./Events.module.css";

const Events = () => {
  const [newEvent, setNewEvent] = useState(false);
  const newEventHandler = () => {
    setNewEvent(!newEvent);
  };
  const cancelNewEventHandler = () => {
    setNewEvent(false);
  }

  return (
    <div className={styles.eventRoot}>
      {/* <SubHeader>
        <Typography variant="h3">Events</Typography>
      </SubHeader> */}
      <Grid container>

        <Grid item xs={3}>
          <Button
            className={styles.btn}
            variant="contained"
            color="primary"
            size="large"
            onClick={newEventHandler}
          >
            Create Event
          </Button>
        </Grid>

        <Grid item xs={9}>
          <EventInput in={newEvent} cancel={cancelNewEventHandler} />
        </Grid>

      </Grid>
    </div>
  );
};

export default Events;
