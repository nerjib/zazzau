import React,{useState, useEffect} from "react";
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
import axios from 'axios';
import { Link, Route, Redirect } from 'react-router-dom';

// core components
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import TransparentFooter from "components/Footers/TransparentFooter.js";
import LandingPageHeader from "components/Headers/LandingPageHeader";
import CustomerPageHeader from "components/Headers/CustomerPageHeader";

function Customers() {
  const [firstFocus, setFirstFocus] = React.useState(false);
  const [lastFocus, setLastFocus] = React.useState(false);
  const [customers, setCustomers] = React.useState('');
  const [pword, setPword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
const [redirect, setRedirect] = useState(false)
const [login, setLogin] = useState('fail')

useEffect(() => {
  axios.get('https://zazzau.herokuapp.com/api/v1/customers')
  .then(res => {
    setCustomers(res.data)
  }).catch(err => {console.log(err)})
}, [])

let tbData=[];
if (customers.length>0){
  Object.keys(customers).map((i,j) => {
    tbData.push(<tr key={j}><td>{j+1}</td><td >{`${customers[i].name} ${customers[i].lastname} ${customers[i].firstnam}`}</td>
    <td>{customers[i].email}</td><td>{customers[i].phone}</td></tr>
    )
}
)
}

  return (
    <>
      <div className="page-header " >
      <ExamplesNavbar />
        <div className="content">
        
          <Container  >
          <Button 
              className="btn-round btn-white"
              color="default"
              to="/add-customer"
              size="lg"
              tag={Link}
            >
              Add New Customer
            </Button>
              <table className="table table-hover left" style={{alignment:'left', textAlign:'left'}}>
                <thead>
                    <tr>
                        <th>SN</th><th>Name</th><th>Organization</th><th>Number of Assets</th>
                    </tr>
                    </thead>
                    <tbody>
                      {tbData}
                      {tbData}
                    </tbody>
                    </table>
          </Container>
        </div>
        <TransparentFooter />
      </div>
    </>
  );
}

export default Customers;
