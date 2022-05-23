import React from "react";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Col,
} from "reactstrap";
import { connect } from "react-redux";


// core components
import Navbar from "components/Navbars/Navbar.js";
import TransparentFooter from "components/Footers/TransparentFooter.js";
import MilleniumCity from "./milleniniumcity";
import Kakuri from "./kakuri";


const mapStateToProps = state => {
  return {  site: state.site };
};

function ConnectedSites({ site }) {
  const [firstFocus, setFirstFocus] = React.useState(false);
  const [lastFocus, setLastFocus] = React.useState(false);
  React.useEffect(() => {
    document.body.classList.add("login-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    return function cleanup() {
      document.body.classList.remove("login-page");
      document.body.classList.remove("sidebar-collapse");
    };
  }, []);


  return (
    <>
      <Navbar />
      <div className="page-header clear-filter" >
        <div className="container">
        {site=="Millenium City"?<MilleniumCity />:<Kakuri/>}
        </div>
        <TransparentFooter />
      </div>
    </>
  );
}

const Sites = connect(mapStateToProps)(ConnectedSites);


export default Sites;




