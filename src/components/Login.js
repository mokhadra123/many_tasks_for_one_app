import React, { useRef, useState } from "react";
import { Button, Card, Form, Alert, Container } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  const location = useLocation();
  const protectPath = location.state?.path || "/login" || "/signup";
  const redirectPath = location.state?.path || "/";

  const handelSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      navigate(redirectPath, { replace: true });
      navigate(protectPath, { replace: true });
    } catch {
      setError("Failed to login");
    }
  };
  return (
    <Container
      className=" container d-flex align-items-center justify-content-center"
      style={{ minHeight: "100 vh" }}
    >
      <Card className="w-100 " style={{ maxWidth: "400px" }}>
        <Card.Body>
          <h2 className="text-center mb-4">Login</h2>
          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handelSubmit}>
            <Form.Group>
              <Form.Label htmlFor="email">Email</Form.Label>
              <Form.Control
                type="email"
                id="email"
                placeholder="Enter Your Email"
                ref={emailRef}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="password">Password</Form.Label>
              <Form.Control
                type="password"
                id="password"
                placeholder="Enter Your Password"
                ref={passwordRef}
              />
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              className="w-100 mt-3"
              disabled={loading}
            >
              Login
            </Button>
          </Form>
          <div className="w-100 text-center mt-3">
            <Link to="/forgetpassword"> forgetpassword</Link>
          </div>
          <div className="w-100 text-center mt-2">
            I do not have an account? <Link to="/signup"> Sign Up</Link>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Login;
