import React, { useRef, useState } from "react";
import { Alert, Button, Card, Container, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ForgetPassword = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { resetPassword } = useAuth();
  const [message, setMassage] = useState("");
  const emailRef = useRef();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMassage("check your inbox to get new pssword");
    } catch {
      setError("Faild to Reset your password");
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
          <h2 className="text-center mb-4">Reset Password</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {message && <Alert variant="success">{message}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label htmlFor="email">Email</Form.Label>
              <Form.Control
                type="email"
                id="email"
                placeholder="Enter Your Email"
                ref={emailRef}
              />
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              className="w-100 mt-3"
              disabled={loading}
            >
              Reset Password
            </Button>
          </Form>
          <div className="w-100 text-center mt-3">
            <Link to="/login"> Log In</Link>
          </div>
          <div className="w-100 text-center mt-2">
            I do not have an account? <Link to="/signup"> Sign Up</Link>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ForgetPassword;
