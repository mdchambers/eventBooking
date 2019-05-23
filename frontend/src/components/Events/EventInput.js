import React, { useState, useContext } from "react";

import AuthContext from "../../context/auth-context";

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

  const [eventData, setEventData] = useState({
    title: "",
    description: "",
    price: 0,
    date: ""
  });

  const changeHandler = name => event => {
    setEventData({
      ...eventData,
      [name]: event.target.value
    });
  };

  const submitHandler = event => {
    event.preventDefault();
    console.log(eventData);
    const price = +eventData.price;
    const reqBody = {
      query: `
        mutation {
          createEvent( eventInput: { 
            title: "${eventData.title}"
            description: "${eventData.description}"
            price: ${+price}
            date: "${eventData.date}"            
          }) {
            _id
            title
            description
            date
            price
            creator {
              _id
              email
            }
          }
        }
      `
    };
    console.log(JSON.stringify(reqBody));
    fetch("http://localhost:8000/graphql", {
      method: "POST",
      body: JSON.stringify(reqBody),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + authData.token
      }
    })
      .then(res => {
        // Catch errors from backend
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("failed");
        }
        return res.json();
      })
      .then(resData => {
        console.log(resData);
      })
      .catch(err => {
        // Only local errors (i.e. network connectivity), not errors thrown by backend caught here
        console.log(err);
      });
  };

  return (
    <Slide direction="left" in={props.in} mountOnEnter unmountOnExit>
      <Paper>
        <form>
          <Grid container style={{ padding: "10px 10px" }}>
            <Grid item xs={12}>
              <TextField
                label="Title"
                className={styles.textField}
                type="text"
                margin="normal"
                variant="filled"
                value={eventData.email}
                fullWidth
                onChange={changeHandler("title")}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Description"
                className={styles.textField}
                multiline
                type="text"
                margin="normal"
                variant="filled"
                fullWidth
                value={eventData.password}
                onChange={changeHandler("description")}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Price"
                className={styles.textField}
                type="text"
                margin="normal"
                variant="filled"
                fullWidth
                value={eventData.password}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  )
                }}
                onChange={changeHandler("price")}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Date"
                className={styles.textField}
                type="date"
                margin="normal"
                variant="filled"
                InputLabelProps={{ shrink: true }}
                value={eventData.password}
                onChange={changeHandler("date")}
              />
            </Grid>
            <Grid item xs={6}>
              <Button
                variant="contained"
                size="large"
                color="secondary"
                type="button"
                onClick={props.cancel}
              >
                Cancel
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                variant="contained"
                size="large"
                color="primary"
                type="button"
                onClick={submitHandler}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Slide>
  );
};

export default EventInput;
