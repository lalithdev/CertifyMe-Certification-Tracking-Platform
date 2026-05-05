import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, allowedRole }) {
  let user = null;
  try {
    const storedUser = localStorage.getItem("user");
    user = storedUser ? JSON.parse(storedUser) : null;
  } catch (error) {
    console.error("Error parsing user from localStorage:", error);
  }

  console.log(`[ProtectedRoute] Path: ${window.location.pathname} | User:`, user);

  // ❌ Not logged in
  if (!user) {
    console.warn("[ProtectedRoute] No user found, redirecting to login");
    return <Navigate to="/login" replace />;
  }

  // ❌ Role mismatch
  const getRoleString = (r) => {
    if (typeof r === "string") return r.toLowerCase();
    if (r && typeof r === "object" && r.name) return r.name.toLowerCase();
    return "";
  };

  const role = getRoleString(user.role);
  if (role !== allowedRole.toLowerCase()) {
    console.error(`Role mismatch: expected ${allowedRole}, got ${role}`);
    return <Navigate to="/login" replace />;
  }

  // ✅ Allow access
  return children;
}

export default ProtectedRoute;