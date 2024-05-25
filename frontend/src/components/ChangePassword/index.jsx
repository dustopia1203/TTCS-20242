import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import ToastComp from "../ToastComp";

function ChangePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [log, setLog] = useState({
    show: false,
    type: "",
    message: "",
    textType: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setLog({
        show: true,
        type: "Error",
        message: "Password mismatch",
        textType: "text-danger",
      });
      return;
    }
    const data = await fetch("http://localhost:8080/api/user/update-password", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ oldPassword, newPassword }),
    });
    const response = await data.json();
    if (response.success) {
      setLog({
        show: true,
        type: "Success",
        message: "Changed password successfully",
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
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
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
    <div>
      <ToastComp log={log} />
      <Form className="form-signin mt-5">
        <Form.Group className="mb-3" controlId="old-password">
          <Form.Label>Old password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Old password"
            value={oldPassword}
            onChange={(e) => {
              setOldPassword(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>New password</Form.Label>
          <Form.Control
            type="password"
            placeholder="New password"
            value={newPassword}
            onChange={(e) => {
              setNewPassword(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="confirm-password">
          <Form.Label>Confirm new password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
          />
        </Form.Group>
        <div className="d-flex justify-content-between">
          <Button variant="secondary" type="submit" onClick={handleSubmit}>
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default ChangePassword;
