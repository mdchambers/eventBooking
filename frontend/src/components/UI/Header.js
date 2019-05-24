import React, { useContext } from "react";
// import PropTypes from "prop-types";
// import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
// import { useTheme } from "@material-ui/styles";

import AuthContext from "../../context/auth-context";

import { Link, NavLink } from "react-router-dom";

import classes from "./Header.module.css";

function Header(props) {
  // const theme = useTheme();
  // console.log(theme);
  const authData = useContext(AuthContext);

  let authButton = (
    <NavLink
      className={classes.headerNav}
      activeClassName={classes.active}
      to="/auth"
    >
      <Button color="inherit">Login</Button>
    </NavLink>
  );
  if (authData.userId) {
    authButton = (
      <NavLink
        className={classes.headerNav}
        activeClassName={classes.active}
        to="/logout"
      >
        <Button color="inherit">Logout</Button>
      </NavLink>
    );
  }
  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar} position="static">
        <Toolbar>
          <IconButton
            className={classes.menuButton}
            color="inherit"
            aria-label="Menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            color="inherit"
            className={classes.loginHeader}
          >
            <Link className={classes.headerNav} to="/">
              SparkEvent
            </Link>
          </Typography>
          <NavLink
            className={classes.headerNav}
            activeClassName={classes.active}
            to="/events"
          >
            <Button color="inherit">Events</Button>
          </NavLink>
          <NavLink
            className={classes.headerNav}
            activeClassName={classes.active}
            to="/bookings"
          >
            <Button color="inherit">Bookings</Button>
          </NavLink>
          {authButton}
        </Toolbar>
      </AppBar>
    </div>
  );
}

// Header.propTypes = {
//   classes: PropTypes.object.isRequired
// };

export default Header;
