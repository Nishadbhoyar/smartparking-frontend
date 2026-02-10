import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, role }) {
  const storedRole = localStorage.getItem("role");

  // 🔐 Not logged in
  if (!storedRole) {
    return <Navigate to="/login" replace />;
  }

  // 🔐 Wrong role
  if (role && storedRole !== role) {
    return <Navigate to="/login" replace />;
  }

  // ✅ Allowed
  return children;
}

export default ProtectedRoute;
