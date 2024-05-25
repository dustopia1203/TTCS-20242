import { useState, useEffect } from "react";
import { Card, Col, Container, ListGroup, Row } from "react-bootstrap";
import { Outlet, useNavigate } from "react-router-dom";
import { useReload } from "../../hooks/reload";
import * as Icon from "react-bootstrap-icons";
import defaultAvatar from "../../../public/assets/default-avatar.png";
import "./style.css";

function Profile() {
  const [user, setUser] = useState(null);
  const [disabled, setDisabled] = useState(1);
  const navigate = useNavigate();
  const { reload } = useReload();

  useEffect(() => {
    const getUser = async () => {
      const data = await fetch("http://localhost:8080/api/user/me", {
        method: "GET",
        credentials: "include",
      });
      const response = await data.json();
      const user = response.user;
      setUser(user);
    };
    getUser();
  }, [reload]);

  return (
    <div className="mb-5">
      <Container>
        <Row>
          <Col className="col-xl-3 mt-5">
            <Card style={{ width: "18rem" }} bg="dark" text="light">
              <Card.Img
                variant="top"
                src={user?.avatar?.url || defaultAvatar}
                style={{ width: "50px", height: "50px", borderRadius: "50%" }}
                className="m-auto my-3"
              />
              <Card.Body>
                <Card.Title className="text-center">{user?.name}</Card.Title>
              </Card.Body>
              <ListGroup variant="flush" data-bs-theme="dark">
                <ListGroup.Item
                  className="sidebar-item"
                  disabled={disabled == 1}
                  onClick={() => {
                    setDisabled(1);
                    navigate("/profile");
                  }}
                >
                  <Icon.Person className="me-1 mb-1" /> Profile
                </ListGroup.Item>
                <ListGroup.Item
                  className="sidebar-item"
                  disabled={disabled == 2}
                  onClick={() => {
                    setDisabled(2);
                    navigate("/profile/change-password");
                  }}
                >
                  <Icon.Lock className="me-1 mb-1" /> Change password
                </ListGroup.Item>
                <ListGroup.Item
                  className="sidebar-item"
                  disabled={disabled == 3}
                  onClick={() => {
                    setDisabled(3);
                  }}
                >
                  <Icon.CardChecklist className="me-1 mb-1" /> Courses purchased
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
          <Col className="col-xl-9">
            <Outlet />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Profile;
