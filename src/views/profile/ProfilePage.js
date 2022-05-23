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
import Navbar from "components/Navbars/Navbar.js";
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
      <Navbar />
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


          </Container>
        </div>
        <div style={{margin:100, heigth:'50%'}}>
        <LayoutMap/>
        </div>
        <DefaultFooter />
      </div>
    </>
  );
}

export default ProfilePage;
