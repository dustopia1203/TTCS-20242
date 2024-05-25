import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/auth";
import ToastComp from "../../components/ToastComp";
import "./style.css";

function Login() {
  const [email, setEmail] = useState("anv@gmail.com");
  const [password, setPassword] = useState("123456");
  const [checked, setChecked] = useState(0);
  const [log, setLog] = useState({
    show: false,
    type: "",
    message: "",
    textType: "",
  });
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const body = { email, password };
    const data = await fetch("http://localhost:8080/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      credentials: "include",
    });
    const response = await data.json();
    if (response.success) {
      const user = response.user;
      if (checked) {
        localStorage.setItem("user", JSON.stringify(user));
      }
      setLog({
        show: true,
        type: "Success",
        message: "Login success!",
        textType: "text-success",
      });
      setTimeout(() => {
        setLog({ show: false, type: "", message: "", textType: "" });
        setIsAuthenticated(true);
        navigate("/");
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
      setChecked(false);
    }
  };

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }
  return (
    <div className="my-5">
      <ToastComp log={log} />
      <Form className="form-signin mt-5">
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <Form.Text className="text-muted">
            We&apos;ll never share your email with anyone else.
          </Form.Text>
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
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check
            type="checkbox"
            label="Remember me"
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
          />
        </Form.Group>
        <div className="d-flex justify-content-between">
          <Button
            variant="outline-secondary"
            type="submit"
            onClick={handleLogin}
          >
            Login
          </Button>
          <LinkContainer to="/signup">
            <Button variant="secondary" type="submit">
              Sign up
            </Button>
          </LinkContainer>
        </div>
      </Form>
    </div>
  );
}

export default Login;
