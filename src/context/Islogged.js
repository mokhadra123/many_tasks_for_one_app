import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const Islogged = ({ children }) => {
  const { currentUser } = useAuth();

  if (currentUser) {
    return <Navigate to="/ " />;
  }
  return children;
};

export default Islogged;
