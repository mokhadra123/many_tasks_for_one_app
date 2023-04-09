import React, { useState } from "react";
import { Alert, Button, Card, Form, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useTodoContext } from "../../context/TodoContext";
import TodoList from "./TodoList";

const Dashboard = () => {
  const [error, setError] = useState("");
  const [text, setText] = useState("");
  const { currentUser, logout } = useAuth();
  const { addTodo, chosenTasks, filteredTasks } = useTodoContext();
  const navigate = useNavigate();

  const handleLogout = async () => {
    setError("");
    try {
      await logout();
      navigate("/login");
    } catch {
      setError("Failed to Log Out");
    }
  };
  const handleChange = (e) => {
    setText(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text) {
      return;
    }

    addTodo(text);
    setText("");
  };

  const handleTasksChange = (e) => {
    chosenTasks(e.target.value);
  };

  return (
    <Container
      className="  d-flex align-items-center justify-content-center"
      style={{ minHeight: "100 vh" }}
    >
      <Card
        className="w-100  mt-2"
        style={{ maxWidth: "400px", maxHeight: "100vh" }}
      >
        <Card.Body>
          <h2 className="text-center mb-5">Todo</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <div className="w-100 text-start m-1">
            <Button
              className="btn btn-primary w-25 mt-3"
              onClick={handleLogout}
            >
              Log Out
            </Button>
          </div>
          {currentUser ? (
            <div>
              <strong>Email:</strong> {currentUser.email}
            </div>
          ) : (
            <div>You are not logged in.</div>
          )}

          <Form onSubmit={handleSubmit}>
            <Form.Group className=" mb-3">
              <Form.Label>
                <strong>Enter your Task</strong>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Your Task"
                onChange={handleChange}
                value={text}
              />
            </Form.Group>
            <Button
              className="btn btn-primary w-50 mt-1 mb-3"
              type="submit"
              onClick={handleSubmit}
            >
              Add
            </Button>
            <div className="box">
              <select
                className="dropdown"
                value={filteredTasks.status}
                onChange={handleTasksChange}
              >
                <option value="all">All</option>
                <option value="complete">Complete</option>
                <option value="todo">Todo</option>
              </select>

              <h3 className="text-center">
                The Number of Tasks are {filteredTasks.length}
              </h3>
            </div>
          </Form>
          <TodoList />
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Dashboard;
