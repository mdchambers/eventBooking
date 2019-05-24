import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";

import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";
// import { ThemeProvider } from "@material-ui/styles";
import { deepOrange, blueGrey } from "@material-ui/core/colors";

import AuthContext from "./context/auth-context";

import Header from "./components/UI/Header";

import Auth from "./containers/Auth";
import Home from "./containers/Home";
import Events from "./containers/Events";
import Bookings from "./containers/Bookings";
import Logout from "./containers/Logout";

const theme = createMuiTheme({
  palette: {
    primary: deepOrange,
    secondary: blueGrey
  }
});
// TODO auth page
// TODO auth protection
// TODO view events
// TODO create events
// TODO view bookings
// TODO create booking
// TODO delete booking
const App = props => {
  const [authState, setAuthState] = useState({
    userId: null,
    token: null,
    tokenExpiration: null
  });

  // Check if auth data in local storage when mounted
  useEffect(() => {
    console.log('getting auth from storage');
    const token = localStorage.getItem("token");
    if (token) {
      setAuthState({
        userId: localStorage.getItem('userId'),
        token: localStorage.getItem('token'),
      })
    }
  }, []);

  const loginHandler = loginData => {
    console.log("logging in");
    console.log(loginData);
    setAuthState(loginData);
    localStorage.setItem('token', loginData.token);
    localStorage.setItem('userId', loginData.userId);
  };

  const logoutHandler = () => {
    console.log("logging out");
    setAuthState({
      userId: null,
      token: null,
      tokenExpiration: null
    });
  };
  // console.log(props);
  return (
    <div className="App">
      <MuiThemeProvider theme={theme}>
        <AuthContext.Provider
          value={{
            token: authState.token,
            userId: authState.userId,
            login: loginHandler,
            logout: logoutHandler
          }}
        >
          <Header />
          <Switch>
            <Route path="/auth" component={Auth} />
            <Route path="/events" component={Events} />
            <Route path="/bookings" component={Bookings} />
            <Route path="/logout" component={Logout} />
            <Route path="/" component={Home} />
          </Switch>
        </AuthContext.Provider>
      </MuiThemeProvider>
    </div>
  );
};

export default App;
