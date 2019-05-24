import React, { useState, useContext } from "react";

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

  const submitHandler = async event => {
    event.preventDefault();
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

    try {
      const res = await fetchQl(reqBody, authData.token);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
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
