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
  Modal,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  Spinner
} from "reactstrap";
import axios from "axios";
//import Table from "@material-ui/core/Table";
import { connect } from "react-redux";
// core components
import Navbar from "components/Navbars/Navbar.js";
import ProfilePageHeader from "components/Headers/ProfilePageHeader.js";
import DefaultFooter from "components/Footers/DefaultFooter.js";
import MilleniumCity from "views/sites/milleniniumcity";
import LayoutMap from "views/sites/milleniniumcity";


const mapStateToProps = (state) => {
  return {
    role: state.role,
  };
};

function ConnectedCustomerProfile({role,match}) {
  const [pills, setPills] = React.useState("2");
  const [userId, setUserId] = useState('')
  let [details, setDetails] = useState([])
   let [userData, setUserData] = useState([])
   let [payments, setPayments] = useState([])
  let [modalView, setModalView] = useState(false)
  let [layout, setLayout] = useState('Kakuri')
  let [amount, setAmount] = useState('')
  let [plot, setPlot] = useState('')
  let [plotFocus, setPlotFocus] = useState(false)
   
   useEffect(()=>{
   


    axios.get('/api/v1/customers/details/'+match.params.id)
    .then((res) =>{

     //  setDetails(res.data)
       setUserData(res.data[0])
    })
    .catch(function(error){
         console.log(error)
    })    

    axios.get('/api/v1/customers/layouts/'+match.params.id)
    .then((res) =>{

       setDetails(res.data)
    })
    .catch(function(error){
         console.log(error)
    })    
    
    axios.get('/api/v1/payments/customer/'+match.params.id)
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


    const updatePayment =()=>{
setModalView(true)
    }
   
    const Submit = () =>{
      return alert('Payment Submitted')
      const data = {
        customerid: match.params.id,
        amount,
        plot,
        layout
      }
    }

    const PaymentOption = () => {

      return(
        <div>
         <InputGroup >
         <div style={{display:'block'}}>         <Spinner />
         </div>

                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                         <i className="now-ui-icons money-08"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Amount"
                        type="number"
                        value={amount}
                      
                        onChange={(e)=>setAmount(e.target.value)}
                       ></Input>

                   </InputGroup>
          <InputGroup>
                   <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                         <i className="now-ui-icons money-08"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <select className="form-control" value={layout} onChange={(e)=>setLayout(e.target.value)}>
                        <option value='Kakuri'>KAKURI</option>
                        <option value = 'MCity'>MILLENIUM CITY</option>
                        </select>
                       
          </InputGroup>
          <InputGroup className={
                        "no-border input-lg" +
                        (plotFocus ? " input-group-focus" : "")
                      }>
                      <Input
                        placeholder="Plot"
                        type="number"
                        onFocus={() => setPlotFocus(true)}
                        onBlur={() => setPlotFocus(false)}
                        value={plot}
                        onChange={(e)=>setPlot(e.target.value)}
                       ></Input>
                       
          </InputGroup>
                      <Button onClick={Submit}>Add</Button>
         
        </div>
      )


    }


  return (
    <>
    <Modal isOpen={modalView}>
      <PaymentOption/>
      <Button onClick={()=>setModalView(false)}>X</Button>
      </Modal>
      <Navbar />
      <div className="wrapper">
        <ProfilePageHeader noOfPlot={details.length} userData={userData}/>

        <div className="section">
          {role}{match.params.id}
          <Container>
            <Button className="btn btn-primary" onClick={updatePayment}>Update Payment</Button>
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

const CustomerProfile = connect(mapStateToProps)(ConnectedCustomerProfile);
export default CustomerProfile;
