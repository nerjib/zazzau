
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect, HashRouter, Router } from "react-router-dom";
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
import Properties from "views/properties";
import CustomerProfile from "views/customers/customerProfile";

ReactDOM.render(
  <Provider store={store}>
  <HashRouter>
      <Switch>
      <Route path="/home" exact component={LandingPage} />
      <Route path="/propertiess" exact component={Properties} />
      <Route path="/profile-page" exact component={ProfilePage} />
      <Route path="/sites" exact component={Sites} />
      <Route path="/customers" exact component={Customers} />
      <Route path="/customers/:id" exact component={CustomerProfile} />
      <Route path="/login-page" exact component={LoginPage} />
      <Route path="/add-customer" exact component={AddCustomer} />

        
      </Switch>
  </HashRouter></Provider>,
  document.getElementById("root")
);
