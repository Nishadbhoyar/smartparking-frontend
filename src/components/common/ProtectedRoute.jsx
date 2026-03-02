import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, role }) {
  const token      = localStorage.getItem("token");
  const storedRole = localStorage.getItem("role")?.toUpperCase(); // ✅ normalize casing

  // 🔐 Not logged in — no token at all
  if (!token || !storedRole) {
    return <Navigate to="/login" replace />;
  }

  // 🔐 Wrong role — check against allowed roles
  if (role) {
    // ✅ ADMIN can access everything OWNER can
    const allowedRoles =
      role === "OWNER" ? ["OWNER", "ADMIN"] : [role.toUpperCase()];

    if (!allowedRoles.includes(storedRole)) {
      // Redirect to their actual dashboard instead of login
      const home =
        storedRole === "ADMIN" || storedRole === "OWNER" ? "/admin-dashboard" :
        storedRole === "VALET"                           ? "/valet-dashboard" :
                                                           "/user-dashboard";
      return <Navigate to={home} replace />;
    }
  }

  // ✅ Allowed
  return children;
}

export default ProtectedRoute;