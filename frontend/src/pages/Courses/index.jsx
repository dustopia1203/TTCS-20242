import { useState, useEffect } from "react";
import * as Icon from "react-bootstrap-icons";
import { LinkContainer } from "react-router-bootstrap";
import { Card, Button, Row, Col, Container } from "react-bootstrap";
import "./style.css";

function Courses() {
  const [courses, setCourses] = useState(null);

  useEffect(() => {
    const getCourses = async () => {
      const data = await fetch("http://localhost:8080/api/course/get-courses", {
        method: "GET",
        credentials: "include",
      });
      const response = await data.json();
      setCourses(response.courses);
    };
    getCourses();
  }, []);

  return (
    <Container>
      <Row>
        {courses &&
          courses.map((course, index) => (
            <Col md={6} lg={4} key={index}>
              <Card className="bg-dark text-light" style={{ width: "18rem" }}>
                <Card.Img
                  className="mx-auto"
                  variant="top"
                  src={course.thumbnail.url}
                  style={{ width: "150px", height: "150px" }}
                />
                <Card.Body className="mt-2">
                  <Card.Title>{course.name}</Card.Title>
                  <div className="d-flex justify-content-between">
                    <Card.Subtitle>{course.rating}/5*</Card.Subtitle>
                    <Card.Subtitle>{course.purchased} Students</Card.Subtitle>
                  </div>
                  <div className="d-flex">
                    <Card.Subtitle className="me-2">
                      <s> {course.estimatedPrice + "$"} </s>
                    </Card.Subtitle>
                    <Card.Subtitle>
                      {course.price === 0 ? "Free" : course.price + "$"}
                    </Card.Subtitle>
                  </div>
                  <div className="mb-2">
                    <Icon.List className="mb-1" />
                    {course.courseData.length} lectures
                  </div>
                  <LinkContainer to={`/course/${course._id}`}>
                    <Button variant="primary">View course</Button>
                  </LinkContainer>
                </Card.Body>
              </Card>
            </Col>
          ))}
      </Row>
    </Container>
  );
}

export default Courses;
