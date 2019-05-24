import React, { useState } from "react";

import { Grid, Button } from "@material-ui/core";

import EventInput from "../components/Events/EventInput";
import EventList from "../components/Events/EventList";
// import SubHeader from "../components/UI/SubHeader";

import styles from "./Events.module.css";

const Events = () => {
  const papers = { new: "NEW", list: "LIST" };
  const [current, setCurrent] = useState(null);
  const [active, setActive] = useState(false);

  const newCurrentHandler = currPaper => {
    if (currPaper === current) {
      setActive(!active);
    } else {
      setCurrent(currPaper);
      setActive(true);
    }
  };

  const cancelCurrentHandler = () => {
    setActive(false);
  };

  let activePaper;

  switch (current) {
    case papers.new:
      activePaper = <EventInput in={active} cancel={cancelCurrentHandler} />;
      break;
    case papers.list:
      activePaper = <EventList in={active} cancel={cancelCurrentHandler} />;
      break;
    default:
      activePaper = null;
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
            onClick={newCurrentHandler.bind(this, papers.new)}
          >
            Create Event
          </Button>
          <Button
            className={styles.btn}
            variant="contained"
            color="primary"
            size="large"
            onClick={newCurrentHandler.bind(this, papers.list)}
          >
            List Events
          </Button>
        </Grid>
        <Grid item xs={9}>
          {activePaper}
        </Grid>
      </Grid>
    </div>
  );
};

export default Events;
