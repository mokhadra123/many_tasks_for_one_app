import { addDoc, collection, deleteDoc, doc } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { db } from "../firebase";

const TodoContext = createContext();

const TodoProvider = ({ children }) => {
  const [todoList, setTodoList] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [filteredValue, setFilteredValue] = useState("all");

  const addTodo = async (newTodoItem) => {
    let newItem = {
      words: newTodoItem,
      status: "todo",
    };
    setTodoList([...todoList, newItem]);

    // Add data
    try {
      const docRef = await addDoc(collection(db, "tasks"), newItem);
      console.log("Document written with ID", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    // Get data
    // const querySnapshot = await getDocs(collection(db, "tasks"), {
    //   newTodoItem,
    // });
    // querySnapshot.forEach((doc) => {});
  };

  const deleteTask = async (deleteIndex, docId) => {
    // const newList = todoList.filter((_, index) => index !== deleteIndex);
    // setTodoList(newList);
    console.log("deleteIndex: ", deleteIndex);
    const newList = [...todoList];
    newList.splice(deleteIndex, 1);
    setTodoList(newList);
    localStorage.removeItem("Task");

    // delete from firestore
    try {
      const docRef = doc(db, "tasks");
      await deleteDoc(docRef);
      console.log("صح الصح يامعلم محمد");
    } catch (e) {
      console.error("false", e);
    }
  };

  const completeTask = (index) => {
    const newList = [...todoList];
    const currentItem = newList[index];

    if (currentItem.status === "todo") {
      currentItem.status = "complete";
      currentItem.words = (
        <span style={{ textDecoration: "line-through" }}>
          {currentItem.words}
        </span>
      );
    } else {
      currentItem.status = "todo";
      currentItem.words = currentItem.words.props.children;
    }

    newList[index] = currentItem;
    setTodoList(newList);
  };

  const chosenTasks = (status) => {
    setFilteredValue(status);
  };

  useEffect(() => {
    if (filteredValue === "all") {
      return setFilteredTasks(todoList);
    } else if (filteredValue === "complete") {
      return setFilteredTasks(
        todoList.filter((todo) => todo.status === "complete")
      );
    } else {
      return setFilteredTasks(
        todoList.filter((todo) => todo.status !== "complete")
      );
    }
  }, [todoList, filteredValue]);

  useEffect(() => {
    const getTasks = JSON.parse(localStorage.getItem("Task"));
    getTasks ? setTodoList(getTasks) : setTodoList([]);
  }, []);
  useEffect(() => {
    todoList?.length && localStorage.setItem("Task", JSON.stringify(todoList));
  }, [todoList]);

  return (
    <TodoContext.Provider
      value={{
        todoList,
        setTodoList,
        addTodo,
        deleteTask,
        completeTask,
        filteredValue,
        filteredTasks,
        chosenTasks,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
export default TodoProvider;
export const useTodoContext = () => {
  return useContext(TodoContext);
};
