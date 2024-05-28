import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/auth";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import * as Icon from "react-bootstrap-icons";
import { Button, Card, ListGroup } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "./style.css";
import { useNavigate, Outlet } from "react-router-dom";

function Admin() {
  const [toggle, setToggle] = useState(true);
  const [active, setActive] = useState(false);
  const [disabled, setDisabled] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const { isAdmin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const getMessages = async () => {
      const data = await fetch(
        "http://localhost:8080/api/notification/get-all",
        {
          method: "GET",
          credentials: "include",
        }
      );
      const response = await data.json();
      const notifications = response.notifications;
      setNotifications(notifications);
    };
    getMessages();
  }, []);

  const readNotification = (id) => async () => {
    const data = await fetch(
      `http://localhost:8080/api/notification/update/${id}`,
      {
        method: "PUT",
        credentials: "include",
      }
    );
    const response = await data.json();
    const notifications = response.notifications;
    setNotifications(notifications);
  };

  const Toggle = () => {
    setToggle(!toggle);
  };

  if (!isAdmin) {
    return null;
  }
  return (
    <div className="container-fluid wrapper min-vh-100 ">
      <div className="row ">
        {toggle && (
          <div className="col-4 col-md-2 vh-100 position-fixed">
            <div className="bg-dark text-light sidebar p-2">
              <div>
                <Icon.PersonGear className="me-3 fs-5" />
                <span className="brand-name fs-5">Admin</span>
              </div>
              <hr />
              <ListGroup data-bs-theme="dark" variant="flush">
                <ListGroup.Item action active onClick={() => setDisabled(1)}>
                  <Icon.House className="fs-6 me-3" />
                  <span>Dashboard</span>
                </ListGroup.Item>
                <span>Data</span>
                <ListGroup.Item
                  action
                  disabled={disabled === 0}
                  onClick={() => {
                    setDisabled(0);
                    navigate("/admin/users");
                  }}
                >
                  <Icon.Person className="fs-6 me-3" />
                  <span>User</span>
                </ListGroup.Item>
                <ListGroup.Item
                  action
                  disabled={disabled === 1}
                  onClick={() => {
                    setDisabled(1);
                  }}
                >
                  <Icon.Receipt className="fs-6 me-3" />
                  <span>Invoices</span>
                </ListGroup.Item>
                <span>Content</span>
                <ListGroup.Item
                  action
                  disabled={disabled === 2}
                  onClick={() => {
                    setDisabled(2);
                    navigate("/admin/upload-course");
                  }}
                >
                  <Icon.PlusSquare className="fs-6 me-3" />
                  <span>Upload Course</span>
                </ListGroup.Item>
                <ListGroup.Item
                  action
                  disabled={disabled === 3}
                  onClick={() => {
                    setDisabled(3);
                    navigate("/admin/courses");
                  }}
                >
                  <Icon.PlayCircle className="fs-6 me-3" />
                  <span>Live Course</span>
                </ListGroup.Item>
                <span>Custom</span>
                <ListGroup.Item
                  action
                  disabled={disabled === 4}
                  onClick={() => setDisabled(4)}
                >
                  <Icon.Window className="fs-6 me-3" />
                  <span>Hero Banner</span>
                </ListGroup.Item>
                <ListGroup.Item
                  action
                  disabled={disabled === 5}
                  onClick={() => setDisabled(5)}
                >
                  <Icon.QuestionSquare className="fs-6 me-3" />
                  <span>FAQs</span>
                </ListGroup.Item>
                <ListGroup.Item
                  action
                  disabled={disabled === 6}
                  onClick={() => setDisabled(6)}
                >
                  <Icon.Tag className="fs-6 me-3" />
                  <span>Categories</span>
                </ListGroup.Item>
                <span>Controller</span>
                <ListGroup.Item
                  action
                  disabled={disabled === 7}
                  onClick={() => setDisabled(7)}
                >
                  <Icon.PersonLinesFill className="fs-6 me-3" />
                  <span>Manage Team</span>
                </ListGroup.Item>
                <span>Analytic</span>
                <ListGroup.Item
                  action
                  disabled={disabled === 8}
                  onClick={() => setDisabled(8)}
                >
                  <Icon.GraphUp className="fs-6 me-3" />
                  <span>Course Analytic</span>
                </ListGroup.Item>
              </ListGroup>
              <hr />
              <LinkContainer to="/profile">
                <div className="mb-3 back-section">
                  <Icon.ArrowReturnLeft className="fs-6 me-3" />
                  <span>Exit</span>
                </div>
              </LinkContainer>
            </div>
          </div>
        )}
        {toggle && <div className="col-4 col-md-2"></div>}
        <div className="col">
          <div className="px-3">
            <nav className="navbar navbar-expand-sm navbar-dark bg-transparent">
              <i
                className="navbar-brand bi bi-justify-left fs-4"
                onClick={Toggle}
              ></i>
              <i
                className="navbar-brand bi bi-bell ms-auto fs-4"
                onClick={() => setActive(!active)}
              ></i>
            </nav>
            {active && (
              <div data-bs-theme="dark">
                {notifications.length > 0 &&
                  notifications.map((item) => (
                    <Card
                      variant="dark"
                      key={item._id}
                      className="ms-auto "
                      style={{ width: "18rem" }}
                      disabled={item.status === "read"}
                      as={Button}
                      onClick={readNotification(item._id)}
                    >
                      <Card.Body>
                        <Card.Title>{item.title}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted fs-6">
                          {item.createdAt}
                        </Card.Subtitle>
                        <Card.Text>{item.message}</Card.Text>
                        {item.status === "read" && (
                          <Card.Subtitle className="mb-2 text-muted fs-6">
                            Seen at {item.updatedAt}
                          </Card.Subtitle>
                        )}
                      </Card.Body>
                    </Card>
                  ))}
              </div>
            )}
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Admin;
