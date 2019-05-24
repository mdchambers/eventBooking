import React, { useState, useContext, useEffect } from "react";

import Event from "./Event";
import Spinner from "../UI/Spinner/Spinner";
import AuthContext from "../../context/auth-context";
import fetchQl from "../../helpers/fetchQL";

import {
  Paper,
  Slide,
  Typography,
  Grid,
  TextField,
  Button,
  InputAdornment
} from "@material-ui/core";

import styles from "./EventInput.module.css";

const EventInput = props => {
  const authData = useContext(AuthContext);

  const [eventData, setEventData] = useState(null);

  const fetchEvents = async () => {
    const reqBody = {
      query: `
      query {
        events {
          _id
          title
          description
          price
          date
          creator {
            email
          }
        }
      }
      `
    };

    try {
      const res = await fetchQl(reqBody, authData.token);
      // console.log(res);
      setEventData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  let eventCards = (
    <Grid item xs={12}>
      <Spinner />
    </Grid>
  );
  if (eventData) {
    // console.log(eventData.events);
    eventCards = eventData.events.map(event => {
      return (
        <Grid item key={event._id} xs={12}>
          <Event event={event} spacing={3} />
        </Grid>
      );
    });
  }

  return (
    <Slide direction="left" in={props.in} mountOnEnter unmountOnExit>
      {/* <Paper> */}
      <React.Fragment>
        <Typography variant="h4">Upcoming Events</Typography>
        <Grid
          container
          direction="column-reverse"
          alignItems="stretch"
          justify="space-between"
        >
          {eventCards}
        </Grid>
      </React.Fragment>
      {/* </Paper> */}
    </Slide>
  );
};

export default EventInput;
