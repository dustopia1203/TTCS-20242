import { Container, Row, Col, Image } from "react-bootstrap";
import "./style.css";

function Home() {
  return (
    <div className="my-5">
      <Container className="text-light">
        <Row>
          <Col className="col-lg-6">
            <Image
              src="https://becodemy.com/_next/static/media/banner.8a9f498b.svg"
              width={450}
              height={450}
              lazyload="true"
              rounded
            />
          </Col>
          <Col className="col-lg-6">
            <h1 className="display-5 fw-bold lh-1 my-5">
              Begin your journey with us
            </h1>
            <p className="lead">
              We are here to help you learn the latest technologies and tools in
              the market. Our courses are designed to help you grow and succeed
              in your career.
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Home;
