/*eslint-disable*/
import React from "react";

// reactstrap components
import { Container } from "reactstrap";

function DarkFooter() {
  return (
    <footer className="footer" data-background-color="black">
      <Container>
        <nav>
          <ul>
            <li>
              <a
                href="#"
                target="_blank"
              >
                Zazzau Properties
              </a>
            </li>
            <li>
              <a
                href="http://github.com/nerjib"
                target="_blank"
              >
                About Us
              </a>
            </li>
         
          </ul>
        </nav>
        <div className="copyright" id="copyright">
          © {new Date().getFullYear()}, Designed by{" "}
          <a
            href="/"
            target="_blank"
          >
            Entech
          </a>
          . 
        </div>
      </Container>
    </footer>
  );
}

export default DarkFooter;
