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
} from "reactstrap";
import axios from "axios";
//import Table from "@material-ui/core/Table";

// core components
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import ProfilePageHeader from "components/Headers/ProfilePageHeader.js";
import DefaultFooter from "components/Footers/DefaultFooter.js";
import MilleniumCity from "views/sites/milleniniumcity";
import LayoutMap from "views/sites/milleniniumcity";

function ProfilePage() {
  const [pills, setPills] = React.useState("2");
  const [userId, setUserId] = useState('')
  let [details, setDetails] = useState([])
   let [userData, setUserData] = useState([])
   let [payments, setPayments] = useState([])
 


   
   useEffect(()=>{
   
    axios.get('https://zazzau.herokuapp.com/api/v1/customers/details/'+localStorage.getItem('id'))
    .then((res) =>{

     //  setDetails(res.data)
       setUserData(res.data[0])
    })
    .catch(function(error){
         console.log(error)
    })    

    axios.get('https://zazzau.herokuapp.com/api/v1/customers/layouts/'+localStorage.getItem('id'))
    .then((res) =>{

       setDetails(res.data)
    })
    .catch(function(error){
         console.log(error)
    })    
    
    axios.get('https://zazzau.herokuapp.com/api/v1/payments/customer/'+localStorage.getItem('id'))
    .then((res) =>{

       setPayments(res.data)
    })
    .catch(function(error){
         console.log(error)
    })
   },[])


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



  let tableData= []
    let layMap = []

    if(details.length>0){
        Object.keys(details).map((e,i)=>{
         //   tableData.push([i+1, details[e].proposedlayout,details[e].plotno, details[e].amount, details[e].sum, details[e].amount-details[e].sum,<a href='#'>edit</a>])
           tableData.push(<tr><td>{i+1}</td><td>{details[e].proposedlayout}</td><td>{details[e].plotno}</td><td>{details[e].amount}</td><td>{details[e].sum}</td><td>{details[e].amount-details[e].sum}</td></tr>)
       //    details[e].proposedlayout=='Kakuri'?layMap.push(<LayoutMap plot={details[e].plotno} layout={details[e].proposedlayout}/>)
         //   :layMap.push(<MCity plot={details[e].plotno} layout={details[e].proposedlayout}/>)
        })

    }
    
    let paymentTableData= []

    if(payments.length>0){
        Object.keys(payments).map((e,i)=>{
            paymentTableData.push(<tr><td>{i+1}</td><td>{payments[e].amount}</td><td>{payments[e].layout}</td><td>{payments[e].plot}</td><td>{payments[e].date}</td></tr>)
        })

    }
   
  return (
    <>
      <ExamplesNavbar />
      <div className="wrapper">
        <ProfilePageHeader noOfPlot={details.length} userData={userData}/>
        <div className="section">
          <Container>
            <h3 className="title">Payment Status</h3>
            <table className="table">
              <thead>
                <tr><th>sn</th><th>Layout</th><th>Plot </th><th>Amount</th><th>Paid</th><th>Balance</th></tr>
              </thead>
              <tbody>
                {tableData}
              </tbody>
            </table>
            <h3 className="title">
            Payment History {userId?userId:''}   
            </h3>

            <div style={{ alignSelf:'flex-start'}}>
            <table className="table" >
              <thead>
                <tr>
                  <th>sn</th><th>Amount </th><th>Layout</th><th>Plot</th><th>Date</th>
                </tr>
                </thead>
                <tbody>
                  {paymentTableData}
                </tbody>
            </table>
            </div>

            <Row>
              <Col className="ml-auto mr-auto" md="6">
                <h4 className="title text-center">My Portfolio</h4>
                <div className="nav-align-center">
                  <Nav
                    className="nav-pills-info nav-pills-just-icons"
                    pills
                    role="tablist"
                  >
                    <NavItem>
                      <NavLink
                        className={pills === "1" ? "active" : ""}
                        href="#pablo"
                        onClick={(e) => {
                          e.preventDefault();
                          setPills("1");
                        }}
                      >
                        <i className="now-ui-icons design_image"></i>
                      </NavLink>
                      Houses
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={pills === "2" ? "active" : ""}
                        href="#pablo"
                        onClick={(e) => {
                          e.preventDefault();
                          setPills("2");
                        }}
                      >
                        <i className="now-ui-icons location_world"></i>
                      </NavLink>
                      Layout
                    </NavItem>
              
                  </Nav>
                </div>
              </Col>
              <TabContent className="gallery" activeTab={"pills" + pills}>
                <TabPane tabId="pills1">
                  <Col className="ml-auto mr-auto" md="10">
                    <Row className="collections">
                      <Col md="6">
                        <img
                          alt="..."
                          className="img-raised"
                          src={require("assets/img/bg1.jpg").default}
                        ></img>
                        <img
                          alt="..."
                          className="img-raised"
                          src={require("assets/img/bg3.jpg").default}
                        ></img>
                      </Col>
                      <Col md="6">
                        <img
                          alt="..."
                          className="img-raised"
                          src={require("assets/img/bg8.jpg").default}
                        ></img>
                        <img
                          alt="..."
                          className="img-raised"
                          src={require("assets/img/bg7.jpg").default}
                        ></img>
                      </Col>
                    </Row>
                  </Col>
                </TabPane>
                <TabPane tabId="pills2">
                  <Col className="ml-auto mr-auto" md="10">
                    <Row className="collections">
                      <Col md="6">
                        <img
                          alt="..."
                          className="img-raised"
                          src={require("assets/img/bg6.jpg").default}
                        ></img>
                        <img
                          alt="..."
                          className="img-raised"
                          src={require("assets/img/bg11.jpg").default}
                        ></img>
                      </Col>
                      <Col md="6">
                        <img
                          alt="..."
                          className="img-raised"
                          src={require("assets/img/bg7.jpg").default}
                        ></img>
                        <img
                          alt="..."
                          className="img-raised"
                          src={require("assets/img/bg8.jpg").default}
                        ></img>
                      </Col>
                    </Row>
                  </Col>
                </TabPane>
              </TabContent>
            </Row>
          </Container>
        </div>
        <LayoutMap/>
        <DefaultFooter />
      </div>
    </>
  );
}

export default ProfilePage;
