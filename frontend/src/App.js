import React from "react";
import { Route, Switch } from "react-router-dom";

import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";
import { deepOrange, lime } from '@material-ui/core/colors'

import Header from "./components/UI/Header";

import Auth from "./containers/Auth";
import Home from "./containers/Home";
import Events from "./containers/Events";
import Bookings from "./containers/Bookings";


const theme = createMuiTheme({
  palette: {
    primary: deepOrange,
    secondary: lime,
  }
})

// TODO auth page
// TODO auth protection
// TODO view events
// TODO create events
// TODO view bookings
// TODO create booking
// TODO delete booking
function App() {
  return (
    <div className="App">
      <MuiThemeProvider theme={theme}>
        <Header />
        <Switch>
          <Route path="/auth" component={Auth} />
          <Route path="/events" component={Events} />
          <Route path="/bookings" component={Bookings} />
          <Route path="/" component={Home} />
        </Switch>
      </MuiThemeProvider>
    </div>
  );
}

export default App;
