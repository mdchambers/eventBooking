import React, { useState } from "react";

import { Paper, Grid, TextField, Button, Typography } from "@material-ui/core";

import styles from "./Auth.module.css";

const Auth = () => {
  const [isSignin, setIsSignin] = useState(true);
  const [credentials, setCredentials] = useState({
    email: "",
    password: ""
  });

  const submitHandler = event => {
    event.preventDefault();
  }

  return (
    <div className={styles.authPage}>
      <Paper className={styles.authForm}>
        <form>
          <Grid container style={{ padding: "0 10px" }}>
            <Grid style={{paddingTop: "10px"}} item xs={12}>
              <Typography className={styles.loginHeader} variant="h3">
                {isSignin ? "Login" : "Sign Up"}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="outlined-email-input"
                label="Email"
                className={styles.textField}
                type="email"
                name="email"
                autoComplete="email"
                margin="normal"
                variant="outlined"
                value={credentials.email}
                onChange={event => {
                  setCredentials({
                    email: event.target.value,
                    password: credentials.password
                  });
                }}
                autoFocus
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="outlined-password-input"
                label="Password"
                className={styles.textField}
                type="password"
                autoComplete="current-password"
                margin="normal"
                variant="outlined"
                fullWidth
                value={credentials.password}
                onChange={event => {
                  setCredentials({
                    email: credentials.email,
                    password: event.target.value
                  });
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <Button
                variant="contained"
                size="large"
                color="secondary"
                type="button"
                onClick={() => {
                  setIsSignin(!isSignin);
                }}
              >
                {isSignin ? "Signup?" : "Back"}
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                variant="contained"
                size="large"
                color="primary"
                type="submit"
                onClick={submitHandler}
              >
                {isSignin ? "Login" : "Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </div>
  );
};

export default Auth;
