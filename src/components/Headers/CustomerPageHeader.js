import React from "react";

// reactstrap components
import { Button, Container } from "reactstrap";

// core components

function CustomerPageHeader() {
  let pageHeader = React.createRef();

 
  return (
    <>
      <div className="page-header">
        <div
       
          ref={pageHeader}
        ></div>
      
      </div>
    </>
  );
}

export default CustomerPageHeader;
