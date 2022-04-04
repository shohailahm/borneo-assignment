import { Navigate } from "react-router-dom";
import Home from "../Containers/Home";
import Signup from "../Containers/Signup";
import LoginPage from "./../Containers/LoginPage";
import Reports from "./../Containers/Reports";

const ProtectedRoute = ({ user, redirectPath = "/login", children }) => {
  if (!user) {
    return <Navigate to={redirectPath} replace />;
  }

  return children;
};

export const routes = (user) => {
  return [
    {
      path: "/",
      element: (
        <ProtectedRoute user={user}>
          <Home />
        </ProtectedRoute>
      ),
    },
    {
      path: "/reports",
      element: (
        <ProtectedRoute user={user}>
          <Reports />
        </ProtectedRoute>
      ),
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
  ];
};
