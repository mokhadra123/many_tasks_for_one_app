import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import ForgetPassword from "./components/ForgetPassword";
import Dashboard from "./components/profilePage/Dashboard";
import AuthProvider from "./context/AuthContext";
import RequireAuth from "./context/RequireAuth";
import Islogged from "./context/Islogged";
import TodoProvider from "./context/TodoContext";

function App() {
  return (
    <div>
      <Router>
        <AuthProvider>
          <Routes>
            <Route
              path="/signup"
              element={
                <Islogged>
                  <Signup />
                </Islogged>
              }
            />
            <Route
              path="/login"
              element={
                <Islogged>
                  <Login />
                </Islogged>
              }
            />
            <Route path="/forgetpassword" element={<ForgetPassword />} />

            <Route
              path="/"
              element={
                <RequireAuth>
                  <TodoProvider>
                    <Dashboard />
                  </TodoProvider>
                </RequireAuth>
              }
            />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
