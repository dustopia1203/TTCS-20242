import { Row, Col, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./style.css";

function Footer() {
  return (
    <footer className="mt-5 bg-dark text-light">
      <Container fluid>
        <Row>
          <Col className="col-md-2 ms-2 mt-3">
            <Link
              to="/"
              className="text-light"
              style={{ textDecoration: "none" }}
            >
              <h1>LMS</h1>
            </Link>
          </Col>
          <Col className="col-md-3 mt-3 d-flex flex-column">
            <h5>Quick Links</h5>
            <Link
              to="/"
              className="text-light mb-2"
              style={{ textDecoration: "none" }}
            >
              Home
            </Link>
            <Link
              to="/courses"
              className="text-light mb-2"
              style={{ textDecoration: "none" }}
            >
              Courses
            </Link>
            <Link
              to="/faqs"
              className="text-light mb-2"
              style={{ textDecoration: "none" }}
            >
              FAQs
            </Link>
          </Col>
          <Col className="col-md-3 mt-3 d-flex flex-column">
            <h5>Socials</h5>
          </Col>
          <Col className="col-md-3 mt-3 d-flex flex-column">
            <h5>Contact info</h5>
            <div>
              <p>Admin</p>
              <p>Hanoi, Vietnam</p>
              <p>Tel: 0123-456-789</p>
              <p>Email: admin@mail.com</p>
            </div>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col className="mb-5 text-center">
            &copy; 2024 Nguyen Huu Hieu LMS. All Rights Reserved
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
