import React, { useRef, useState } from "react";
import { Alert, Button, Card, Container, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passordConfirmationRef = useRef();
  const navigate = useNavigate();
  const handelSubmit = async (e) => {
    e.preventDefault();
    if (passwordRef.current.value !== passordConfirmationRef.current.value) {
      return setError("Password is NOT match");
    }
    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      navigate("/");
    } catch {
      setError("Failed to create an account");
    }
    setLoading(false);
  };
  return (
    <Container
      className=" container d-flex align-items-center justify-content-center"
      style={{ minHeight: "100 vh" }}
    >
      <Card className="w-100 " style={{ maxWidth: "400px" }}>
        <Card.Body>
          <h2 className="text-center mb-4">Signup</h2>
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
            <Form.Group>
              <Form.Label htmlFor="password">Password Confirmation</Form.Label>
              <Form.Control
                type="password"
                id="password-confirm"
                placeholder="Confirmation Password"
                ref={passordConfirmationRef}
              />
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              className="w-100 mt-3"
              disabled={loading}
            >
              Signup
            </Button>
          </Form>
          <div className="w-100 text-center mt-2">
            Already have an account? <Link to="/login"> Log In</Link>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Signup;
