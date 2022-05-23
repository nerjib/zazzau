
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { Provider } from "react-redux";

// styles for this kit
import "assets/css/bootstrap.min.css";
import "assets/scss/now-ui-kit.scss?v=1.5.0";
import "assets/demo/demo.css?v=1.5.0";
import "assets/demo/nucleo-icons-page-styles.css?v=1.5.0";
// pages for this kit
import Index from "views/Index.js";
import NucleoIcons from "views/NucleoIcons.js";
import LoginPage from "views/profile/LoginPage.js";
import LandingPage from "views/profile/LandingPage.js";
import ProfilePage from "views/profile/ProfilePage.js";
import Sites from "views/sites";
import store from "../src/Redux/store";
import Customers from "views/customers";
import AddCustomer from "views/customers/addcustomers";

ReactDOM.render(
  <Provider store={store}>
  <BrowserRouter>
    <Switch>
      <Switch>
        <Route path="/index" render={(props) => <Index {...props} />} />
        <Route
          path="/home"
          render={(props) => <LandingPage {...props} />}
        />
        <Route
          path="/profile-page"
          render={(props) => <ProfilePage {...props} />}
        />
          <Route
          path="/sites"
          render={(props) => <Sites {...props} />}
        />
        
        <Route
          path="/login-page"
          render={(props) => <LoginPage {...props} />}
        />
         <Route
          path="/customers"
          render={(props) => <Customers {...props} />}
        />
         <Route
          path="/add-customer"
          render={(props) => <AddCustomer {...props} />}
        />
        <Redirect to="/home" />
        <Redirect from="/" to="/home" />
      </Switch>
    </Switch>
  </BrowserRouter></Provider>,
  document.getElementById("root")
);
