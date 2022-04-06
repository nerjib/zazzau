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

function LoginPage() {
  const [firstFocus, setFirstFocus] = React.useState(false);
  const [lastFocus, setLastFocus] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [pword, setPword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
const [redirect, setRedirect] = useState(false)
const [login, setLogin] = useState('fail')


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

  useEffect(async()=>{
    const access = await ( localStorage.getItem('login'))
  //  alert(access)
    if(access=='pass'){
        setRedirect(true)
    }
},[])


  const  onSubmit =  (event) => {
  //  localStorage.setItem('login', '')
    event.preventDefault()
    setLoading(true)
    
    let data={
      pword,
      email
    }
    axios.post('https://zazzau.herokuapp.com/api/v1/auth/signin',data)
    .then(async res => {
      if (res.data['status'] === 'success') {
  await    localStorage.setItem('acttype', res.data['data'].role);
   //   localStorage.setItem('token', 'res.data.token');  
   await localStorage.setItem('id', res.data['data'].userId)   
  await localStorage.setItem('login', 'pass');

       setLogin('pass')
       setLoading(false)
       setRedirect(true)
       return <Redirect to='/home' tag={Link}> </Redirect>
      }else{
        setLoading(false)
        localStorage.setItem('login', 'stop');
        const error = new Error(res.error);
        throw error;
      }
    //  return < Redirect to="/home"/>
    //  alert(JSON.stringify(res.data['data'].userId))
    }).catch(e=>{
      console.error(e);
      setLoading(false)
      localStorage.setItem('login', 'stop');
    // return <Redirect to='/home'> </Redirect>
      alert('Error logging in  please try again');
      alert(e)
    
    })

      }

      if(redirect){
        //   alert('kk')
      return <Redirect to='/home' tag={Link}/>
       }
  return (
    <>
      <ExamplesNavbar />
      <div className="page-header clear-filter" filter-color="blue">
        <div
          className="page-header-image"
          style={{
            backgroundImage:
              "url(" + require("assets/img/login.jpg").default + ")",
          }}
        ></div>
        <div className="content">
          <Container>
            {redirect?'ok':'nop'}
            <Col className="ml-auto mr-auto" md="4">
              <Card className="card-login card-plain">
                <Form action="" className="form" method="">
                  <CardHeader className="text-center">
                    <div className="logo-container">
                      <img
                        alt="..."
                        src={require("assets/img/now-logo.png").default}
                      ></img>
                    </div>
                  </CardHeader>
                  <CardBody>
                    <InputGroup
                      className={
                        "no-border input-lg" +
                        (firstFocus ? " input-group-focus" : "")
                      }
                    >
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="now-ui-icons users_circle-08"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Email"
                        type="text"
                        onFocus={() => setFirstFocus(true)}
                        onBlur={() => setFirstFocus(false)}
                        onChange={(e) => setEmail(e.target.value)}
                      ></Input>
                    </InputGroup>
                    <InputGroup
                      className={
                        "no-border input-lg" +
                        (lastFocus ? " input-group-focus" : "")
                      }
                    >
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="now-ui-icons text_caps-small"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Password"
                        type="password"
                        onFocus={() => setLastFocus(true)}
                        onBlur={() => setLastFocus(false)}
                        onChange={(e) => setPword(e.target.value)}
                      ></Input>
                    </InputGroup>
                  </CardBody>
                  <CardFooter className="text-center">
                    <Button
                      block
                      className="btn-round"
                      color="info"
                      href="#pablo"
                      onClick={onSubmit}
                      size="lg"
                    >
                      Login
                    </Button>
                    <div className="pull-left">
                      <h6>
                        <a
                          className="link"
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          Create Account
                        </a>
                      </h6>
                    </div>
                    <div className="pull-right">
                      <h6>
                        <a
                          className="link"
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          Need Help?
                        </a>
                      </h6>
                    </div>
                  </CardFooter>
                </Form>
              </Card>
            </Col>
          </Container>
        </div>
        <TransparentFooter />
      </div>
    </>
  );
}

export default LoginPage;
