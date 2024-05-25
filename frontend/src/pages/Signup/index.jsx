import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/auth";
import ToastComp from "../../components/ToastComp";
import "./style.css";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [log, setLog] = useState({
    show: false,
    type: "",
    message: "",
    textType: "",
  });
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password != confirmPassword) {
      setLog({
        show: true,
        type: "Failed",
        message: "Password do not match",
        textType: "text-danger",
      });
      setTimeout(() => {
        setLog({ show: false, type: "", message: "", textType: "" });
      }, 1500);
      return;
    }
    const body = { name, email, password };
    const data = await fetch("http://localhost:8080/api/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      credentials: "include",
    });
    const response = await data.json();
    if (response.success) {
      setLog({
        show: true,
        type: "Success",
        message: "Signup success!",
        textType: "text-success",
      });
      setTimeout(() => {
        setLog({ show: false, type: "", message: "", textType: "" });
        navigate("/login");
      }, 1500);
    } else {
      setLog({
        show: true,
        type: "Failed",
        message: response.message,
        textType: "text-danger",
      });
      setTimeout(() => {
        setLog({ show: false, type: "", message: "", textType: "" });
      }, 1500);
    }
  };

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }
  return (
    <div className="my-5">
      <ToastComp log={log} />
      <Form className="form-signin mt-5">
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="confirm-password">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
            required
          />
        </Form.Group>
        <Button variant="secondary" type="submit" onClick={handleSubmit}>
          Sign me up!
        </Button>
      </Form>
    </div>
  );
}

export default Signup;
