import React,{useState, useEffect} from "react";

// reactstrap components
import {
  Button,
  NavItem,
  NavLink,
  Nav,
  TabContent,
  TabPane,
  Container,
  Row,
  Col,
  UncontrolledTooltip,
  Card,
  Image
} from "reactstrap";
import axios from "axios";
//import Table from "@material-ui/core/Table";
import { connect } from "react-redux";
// core components
import Navbar from "../../components/Navbars/Navbar.js";
import ProfilePageHeader from "../../components/Headers/ProfilePageHeader.js";
import DefaultFooter from "../../components/Footers/DefaultFooter.js";
import LayoutMap from "../../views/sites/milleniniumcity";
import LandingPageHeader from "components/Headers/LandingPageHeader.js";
import { changeProperties } from "../../../src/Redux/actions";

function mapStateToProps (state){
  return {
    role: state.role,
    properties: state.properties,
  };
};

function mapDispatchToProps (dispatch){
  return {
    changeProperty: (property) => dispatch(changeProperties(property)),
  }
}


function ConnectedProperties({ properties, role}) {
  const [pills, setPills] = React.useState("2");
  const [userId, setUserId] = useState('')
  let [details, setDetails] = useState([])
   let [userData, setUserData] = useState([])
   let [payments, setPayments] = useState([])
   let [acttype, setActType] = useState('')


   
   
  React.useEffect(() => {
    document.body.classList.add("profile-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    return function cleanup() {
      document.body.classList.remove("profile-page");
      document.body.classList.remove("sidebar-collapse");
    };
  }, []);

useEffect(()=>{
setActType( localStorage.getItem('acttype'))
},[])


    const goToBuy =()=>{
        if (acttype===''){
          return alert('Please login to buy')
        }
      return  alert('added to cart')
    }
    
  return (
    <>
      <Navbar />
      <div className="wrapper">
        <LandingPageHeader/>

        <div className="section">
          <Container>
           <Card className="card-body">     
            <Row>
            {properties.length>0 &&  Object.keys(properties).map((e,i)=>
              <div style={{margin:10}}>
             <img src={properties[e].url} width='200' height={200}/>
             <div>
             {properties[e].status}  <br/>
             N{properties[e].amount}  <br/>
              {properties[e].site}  <br/>
              <Button color="primary" disabled={properties[e].status==='Available'?false:true} onClick={goToBuy}  >Buy</Button>
    
             </div>       
             </div>)}
             </Row>
           </Card>
          </Container>
        </div>
        <DefaultFooter />
      </div>
    </>
  );
}

const Properties = connect( mapStateToProps, mapDispatchToProps)(ConnectedProperties);
export default Properties;
