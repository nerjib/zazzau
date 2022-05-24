import React, {useState, useEffect} from "react";
import { Link, useLocation, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { changeSite } from "../../Redux/actions";

// reactstrap components
import {
  Collapse,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  UncontrolledTooltip,
} from "reactstrap";


function mapDispatchToProps(dispatch) {
  return {
    changeSite: site=> dispatch(changeSite(site))


  };
}


function ConnectedNavbar(props) {
  const [navbarColor, setNavbarColor] = React.useState("navbar-transparent");
  const [collapseOpen, setCollapseOpen] = React.useState(false);
  const [acctType, setActType] = useState('')
  const [login, setLogin] = useState(false)
  const [site, setSite] =useState('')
  const location = useLocation();

  React.useEffect(() => {
    const updateNavbarColor = () => {
      if (
        document.documentElement.scrollTop > 399 ||
        document.body.scrollTop > 399
      ) {
        setNavbarColor("");
      } else if (
        document.documentElement.scrollTop < 400 ||
        document.body.scrollTop < 400
      ) {
        setNavbarColor("navbar-transparent");
      }
    };


    window.addEventListener("scroll", updateNavbarColor);
    return function cleanup() {
      window.removeEventListener("scroll", updateNavbarColor);
    };
  });

  useEffect(async()=>{
    const access = await ( localStorage.getItem('login'))
   let actType= localStorage.getItem('acttype')
   setActType(actType)
  //  alert(access)
    if(access=='pass'){
        setLogin(true)
    }
},[])

const logout = () => {
 // alert('kkk')
  localStorage.setItem('login', '')
  localStorage.setItem('acttype', '')
  setLogin(false)
  //return <Redirect to='/home' tag={Link}/>

}

const handleSite=(event)=> {
 // return alert(event)
 // event.preventDefault();
  setSite(event);
  props.changeSite( event);
}

  return (
    <>
      {collapseOpen ? (
        <div
          id="bodyClick"
          onClick={() => {
            document.documentElement.classList.toggle("nav-open");
            setCollapseOpen(false);
          }}
        />
      ) : null}
      <Navbar className={"fixed-top " + navbarColor} color="info" expand="lg">
        <Container>
          <UncontrolledDropdown className="button-dropdown">
            <DropdownToggle
              caret
              data-toggle="dropdown"
              href="#pablo"
              id="navbarDropdown"
              tag="a"
              onClick={(e) => e.preventDefault()}
            >
              <span className="button-bar"></span>
              <span className="button-bar"></span>
              <span className="button-bar"></span>
            </DropdownToggle>
            <DropdownMenu aria-labelledby="navbarDropdown">
              <DropdownItem header tag="a">
                Home
              </DropdownItem>
              <DropdownItem href="#pablo" onClick={(e) => e.preventDefault()}>
                Sites
              </DropdownItem>
              <DropdownItem href="#pablo" onClick={(e) => e.preventDefault()}>
                Another action
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
          <div className="navbar-translate">
            <NavbarBrand
              href="#"
              id="navbar-brand"
            >
              Zazzau Properties
            </NavbarBrand>
            <UncontrolledTooltip target="#navbar-brand">
              Home of homes
            </UncontrolledTooltip>
            <button
              className="navbar-toggler navbar-toggler"
              onClick={() => {
                document.documentElement.classList.toggle("nav-open");
                setCollapseOpen(!collapseOpen);
              }}
              aria-expanded={collapseOpen}
              type="button"
            >
              <span className="navbar-toggler-bar top-bar"></span>
              <span className="navbar-toggler-bar middle-bar"></span>
              <span className="navbar-toggler-bar bottom-bar"></span>
            </button>
          </div>
          <Collapse
            className="justify-content-end"
            isOpen={collapseOpen}
            navbar
          >
            <Nav navbar>
         { location.pathname=='/sites' &&   <UncontrolledDropdown nav>
                <DropdownToggle
                  caret
                  color="default"
                  href="#pablo"
                  nav
                  onClick={(e) => e.preventDefault()}
                >
                  <i className="now-ui-icons design_mobile mr-1"></i>
                  <p>Sites</p>
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem onClick={()=>handleSite('Millenium City')}>
                    Milleniun City
                  </DropdownItem>
                  <DropdownItem
                    onClick={()=>handleSite('KAKAURI')}
                  >
                    Kakuri
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>}
              

            <NavItem>
                <NavLink to="/home" tag={Link}>
                  Home
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/propertiess" tag={Link}>
                  Properties
                </NavLink>
              </NavItem>
            
            {/*login &&  <NavItem>
                <NavLink to="/profile-page" tag={Link}>
                  Profile
                </NavLink>
              </NavItem>*/}
              {acctType == 'admin'&& <NavItem>
                <NavLink to="/customers" tag={Link}>
                  Customers
                </NavLink>
              </NavItem>}
              <NavItem>
                <NavLink to="/about-us" tag={Link}>
                  About us
                </NavLink>
              </NavItem>
             {acctType == 'admin'? <NavItem>
                <NavLink to="/sites" tag={Link}>
                  All Sites
                </NavLink>
              </NavItem>:  
              <NavItem>
              <NavLink to="/sites" tag={Link}>
                  Sites
                </NavLink>
              </NavItem>}
           {login?  <NavItem >
                <NavLink to="/login-page"  tag={Link} onClick={logout}>
                  Logout
                </NavLink>
              </NavItem> :  <NavItem>
                <NavLink to="/login-page"  tag={Link}>
                  Login
                </NavLink>
              </NavItem>}
          
              <NavItem>
                <NavLink
                  href="https://twitter.com/zazzau"
                  target="_blank"
                  id="twitter-tooltip"
                >
                  <i className="fab fa-twitter"></i>
                  <p className="d-lg-none d-xl-none">Twitter</p>
                </NavLink>
                <UncontrolledTooltip target="#twitter-tooltip">
                  Follow us on Twitter
                </UncontrolledTooltip>
              </NavItem>
              <NavItem>
                <NavLink
                  href="https://www.facebook.com/zazzau"
                  target="_blank"
                  id="facebook-tooltip"
                >
                  <i className="fab fa-facebook-square"></i>
                  <p className="d-lg-none d-xl-none">Facebook</p>
                </NavLink>
                <UncontrolledTooltip target="#facebook-tooltip">
                  Like us on Facebook
                </UncontrolledTooltip>
              </NavItem>
              
              <NavItem>
                <NavLink
                  href="https://www.instagram.com/zazzau"
                  target="_blank"
                  id="instagram-tooltip"
                >
                  <i className="fab fa-instagram"></i>
                  <p className="d-lg-none d-xl-none">Instagram</p>
                </NavLink>
                <UncontrolledTooltip target="#instagram-tooltip">
                  Follow us on Instagram
                </UncontrolledTooltip>
              </NavItem>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </>
  );
}
const Navbars = connect(
  null,
  mapDispatchToProps
)(ConnectedNavbar);

export default Navbars;
