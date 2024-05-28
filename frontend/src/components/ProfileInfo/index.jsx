import { useEffect, useState } from "react";
import { Form, Button, Container, Image } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";
import { useReload } from "../../hooks/reload";
import ToastComp from "../ToastComp";
import defaultAvatar from "/assets/default-avatar.png";
import "./style.css";

function ProfileInfo() {
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [log, setLog] = useState({
    show: false,
    type: "",
    message: "",
    textType: "",
  });
  const { reload, setReload } = useReload();

  useEffect(() => {
    setReload(!reload);
  }, [avatar]);

  useEffect(() => {
    const getUser = async () => {
      const data = await fetch("http://localhost:8080/api/user/me", {
        method: "GET",
        credentials: "include",
      });
      const response = await data.json();
      const user = response.user;
      setUser(user);
      setName(user?.name);
      setEmail(user?.email);
      setAvatar(user?.avatar.url);
    };
    getUser();
  }, []);

  const handleAvatar = async (e) => {
    const fileReader = new FileReader();
    fileReader.onload = async () => {
      if (fileReader.readyState === 2) {
        const result = fileReader.result;
        const data = await fetch(
          "http://localhost:8080/api/user/update-avatar",
          {
            method: "PUT",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ avatar: result }),
          }
        );
        const response = await data.json();
        if (response.success) {
          setLog({
            show: true,
            type: "Success",
            message: "Changed avatar successfully",
            textType: "text-success",
          });
          setTimeout(() => {
            setLog({
              show: false,
              type: "",
              message: "",
              textType: "",
            });
          }, 1500);
          setAvatar(result);
        } else {
          setLog({
            show: true,
            type: "Error",
            message: response.message,
            textType: "text-danger",
          });
          setTimeout(() => {
            setLog({
              show: false,
              type: "",
              message: "",
              textType: "",
            });
          }, 1500);
        }
      }
    };
    fileReader.readAsDataURL(e.target.files[0]);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const data = await fetch("http://localhost:8080/api/user/update-info", {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email }),
    });
    const response = await data.json();
    if (response.success) {
      setLog({
        show: true,
        type: "Success",
        message: "Changed user information successfully",
        textType: "text-success",
      });
      setTimeout(() => {
        setLog({
          show: false,
          type: "",
          message: "",
          textType: "",
        });
      }, 1500);
    } else {
      setLog({
        show: true,
        type: "Error",
        message: response.message,
        textType: "text-danger",
      });
      setTimeout(() => {
        setLog({
          show: false,
          type: "",
          message: "",
          textType: "",
        });
      }, 1500);
    }
  };

  return (
    <div className="mt-5">
      <ToastComp log={log} />
      <Container className="mx-5 text-white">
        <div className="d-flex justify-content-center align-items-center mb-3">
          <Form className="position-relative avatar-overlay">
            <Image
              src={avatar || defaultAvatar}
              roundedCircle
              width={100}
              height={100}
            />
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Control
                type="file"
                hidden
                onChange={(e) => handleAvatar(e)}
              />
            </Form.Group>
            <Icon.PencilSquare
              style={{
                position: "absolute",
                right: 0,
                bottom: 0,
                fontSize: "1.5rem",
                color: "white",
              }}
              onClick={() => document.getElementById("formFile").click()}
            />
          </Form>
        </div>
        <Form onSubmit={handleUpdate}>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Button variant="outline-primary" type="submit">
            Update
          </Button>
        </Form>
      </Container>
    </div>
  );
}

export default ProfileInfo;
