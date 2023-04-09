import React from "react";
import { Card } from "react-bootstrap";
import { useTodoContext } from "../../context/TodoContext";

const TodoList = () => {
  const { deleteTask, completeTask, filteredTasks } = useTodoContext();

  const handleDelte = (index) => {
    deleteTask(index);
  };

  const handleComplete = (index) => {
    completeTask(index);
  };

  return (
    <>
      <Post
        filteredTasks={filteredTasks}
        deleteTask={handleDelte}
        completeTask={handleComplete}
      />
    </>
  );
};

const Post = ({ deleteTask, completeTask, filteredTasks }) => {
  return (
    <div>
      {filteredTasks.map((task, index) => {
        return (
          <Card key={index} className=" rounded-sm border border-dark mt-3">
            <div className="d-flex justify-content-between align-items-center">
              <Card.Body>
                <strong>{task.words}</strong>
              </Card.Body>
              <button
                className="btn btn-success btn-sm   pt-2 pb-2  "
                onClick={() => completeTask(index)}
              >
                Complete
              </button>
              <button
                className="btn btn-danger btn-sm m-1 pt-2 pb-2  "
                onClick={() => deleteTask(index)}
              >
                Delete
              </button>
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default TodoList;
