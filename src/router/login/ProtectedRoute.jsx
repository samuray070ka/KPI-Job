import { Navigate } from "react-router-dom";

function ProtectedRoute({ role: allowedRoles, children }) {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  if (!token) {
    return <Navigate to="/login" />;
  }

  const roles = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];

  if (!roles.includes(userRole)) {
    return <Navigate to="/not-authorized" />;
  }

  return children;
}

export default ProtectedRoute;