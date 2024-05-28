import { useState, useEffect } from "react";
import * as Icon from "react-bootstrap-icons";
import { Modal, Form, Button } from "react-bootstrap";
import ToastComp from "../ToastComp";
import "./style.css";

function GetAllUser() {
  const [show, setShow] = useState(false);
  const [users, setUsers] = useState(null);
  const [log, setLog] = useState({
    show: false,
    type: "",
    message: "",
    textType: "",
  });
  const [role, setRole] = useState("");
  const [id, setId] = useState("");

  useEffect(() => {
    const getUsers = async () => {
      const data = await fetch("http://localhost:8080/api/user/get-all-users", {
        method: "GET",
        credentials: "include",
      });
      const response = await data.json();
      const users = response.users;
      setUsers(users);
    };
    if (!users) {
      getUsers();
    }
  }, [users]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleUpdate = async () => {
    const data = await fetch("http://localhost:8080/api/user/update-role", {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        role,
      }),
    });
    const response = await data.json();
    if (response.success) {
      setLog({
        show: true,
        type: "Success",
        message: "User updated!",
        textType: "text-success",
      });
      setTimeout(() => {
        setLog({ show: false, type: "", message: "", textType: "" });
        setUsers(null);
        handleClose();
      }, 1500);
    } else {
      setLog({
        show: true,
        type: "Failed",
        message: "Error occurred!",
        textType: "text-danger",
      });
      setTimeout(() => {
        setLog({ show: false, type: "", message: "", textType: "" });
      }, 1500);
    }
  };

  const handleDelete = async (id) => {
    const data = await fetch(`http://localhost:8080/api/user/delete/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    const response = await data.json();
    if (response.success) {
      setLog({
        show: true,
        type: "Success",
        message: "User deleted!",
        textType: "text-success",
      });
      setTimeout(() => {
        setLog({ show: false, type: "", message: "", textType: "" });
        setUsers(null);
      }, 1500);
    } else {
      setLog({
        show: true,
        type: "Failed",
        message: "Error occurred!",
        textType: "text-danger",
      });
      setTimeout(() => {
        setLog({ show: false, type: "", message: "", textType: "" });
      }, 1500);
    }
  };

  return (
    <>
      <ToastComp log={log} />
      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Edit course</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="role">
              <Form.Label>Change user role</Form.Label>
              <Form.Control
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-between">
          <Button variant="secondary" onClick={handleClose}>
            Back
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
      <table className="w-100 text-center mx-auto table" data-bs-theme="dark">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Role</th>
            <th scope="col">Joined at</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        {users?.map((user, index) => (
          <tbody key={user._id}>
            <tr>
              <th scope="row">{index + 1}</th>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{user.createdAt}</td>
              <td>
                <div className="d-flex justify-content-around">
                  <Icon.PencilFill
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setId(user._id);
                      setRole(user.role);
                      handleShow();
                    }}
                  />
                  <Icon.Trash2Fill
                    style={{ cursor: "pointer" }}
                    onClick={() => handleDelete(user._id)}
                  />
                </div>
              </td>
            </tr>
          </tbody>
        ))}
      </table>
    </>
  );
}

export default GetAllUser;
