import React from "react";

// reactstrap components
import { Container } from "reactstrap";

// core components

function ProfilePageHeader({noOfPlot, userData, details, payments}) {
  let pageHeader = React.createRef();

  React.useEffect(() => {
    if (window.innerWidth > 991) {
      const updateScroll = () => {
        let windowScrollTop = window.pageYOffset / 3;
        pageHeader.current.style.transform =
          "translate3d(0," + windowScrollTop + "px,0)";
      };
      window.addEventListener("scroll", updateScroll);
      return function cleanup() {
        window.removeEventListener("scroll", updateScroll);
      };
    }
  });
  return (
    <>
      <div
        className="page-header clear-filter page-header-small"
        filter-color="blue"
      >
        <div
          className="page-header-image"
          style={{
            backgroundImage:
              "url(" + require("assets/img/bg5.jpg").default + ")",
          }}
          ref={pageHeader}
        ></div>
        <Container>
          <div className="photo-container">
            <img alt="..." src={require("assets/img/ryan.jpg").default}></img>
          </div>
          <h3 className="title">{userData.name+ ' '+ userData.othername+ ' '+ userData.lastname}</h3>
          <p className="category">Civil Servant</p>
          <div className="content">
            <div className="social-description">
              <h2>{noOfPlot}</h2>
              <p>No of plots</p>
            </div>
            <div className="social-description">
              <h2>0</h2>
              <p>No of Houses</p>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}

export default ProfilePageHeader;
