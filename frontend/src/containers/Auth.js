import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";

import AuthContext from "../context/auth-context";

import { Paper, Grid, TextField, Button, Typography } from "@material-ui/core";

import styles from "./Auth.module.css";

const Auth = props => {
  const [isSignin, setIsSignin] = useState(true);
  const [credentials, setCredentials] = useState({
    email: "",
    password: ""
  });

  const auth = useContext(AuthContext);

  const submitHandler = event => {
    event.preventDefault();

    // validate
    if (credentials.email.trim() === 0 || credentials.password.trim() === 0) {
      return;
    }

    // Call to backend
    // Sign in
    let reqBody = {
      query: `
        query {
          login(email: "${credentials.email}" password: "${
        credentials.password
      }") {
            userId
            token
            tokenExpiration
          }
        }
      `
    };

    if (!isSignin) {
      // Register user

      reqBody = {
        query: `
          mutation {
            createUser( userInput: { email: "${
              credentials.email
            }", password: "${credentials.password}"}) {
              _id
              email
            }
          }
        `
      };
    }
    fetch("http://localhost:8000/graphql", {
      method: "POST",
      body: JSON.stringify(reqBody),
      headers: {
        "Content-Type": "application/json"
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
        // Check if login data returned
        if (resData.data.login) {
          console.log("logging in");
          const loginData = resData.data.login;
          auth.login(loginData);
          // console.log(props);
          props.history.push("/");
        }
      })
      .catch(err => {
        // Only local errors (i.e. network connectivity), not errors thrown by backend caught here
        console.log(err);
      });
  };

  const changeHandler = name => event => {
    setCredentials({
      ...credentials,
      [name]: event.target.value
    });
  };

  return (
    <div className={styles.authPage}>
      <Paper className={styles.authForm}>
        <form>
          <Grid container style={{ padding: "0 10px" }}>
            <Grid style={{ paddingTop: "10px" }} item xs={12}>
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
                onChange={changeHandler("email")}
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
                onChange={changeHandler("password")}
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
