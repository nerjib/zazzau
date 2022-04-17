/*eslint-disable*/
import React from "react";

// reactstrap components
import { Container } from "reactstrap";

function TransparentFooter() {
  return (
    <footer className="footer">
      <Container>
        <nav>
          <ul>
            <li>
              <a
                href="https://github.com/nerjib"
                target="_blank"
              >
                Zazzau Properties
              </a>
            </li>
            <li>
              <a
                href="/"
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

export default TransparentFooter;
