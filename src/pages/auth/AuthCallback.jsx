import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Loader2 } from "lucide-react";

const AuthCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get("token");
    const role = searchParams.get("role");
    const id = searchParams.get("id");

    if (token) {
      // 1. Store authentication data
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("userId", id);
      
      // Optional: Store a user object if your app relies on it
      // localStorage.setItem("user", JSON.stringify({ id, role, email: "..." }));

      // 2. Determine redirect path based on Role
      const userRole = role ? role.toUpperCase() : "DRIVER";
      let targetPath = "/user-dashboard";

      if (userRole === "ADMIN" || userRole === "OWNER") {
        targetPath = "/admin-dashboard";
      } else if (userRole === "VALET") {
        targetPath = "/valet-dashboard";
      }

      // 3. Redirect to the dashboard
      navigate(targetPath, { replace: true });
    } else {
      // If something went wrong (no token), go back to login
      navigate("/login?error=oauth_failure");
    }
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-900 text-white">
      <Loader2 className="w-12 h-12 animate-spin text-indigo-500 mb-4" />
      <h2 className="text-xl font-semibold">Completing Secure Login...</h2>
      <p className="text-slate-400 text-sm mt-2">Please wait while we redirect you.</p>
    </div>
  );
};

export default AuthCallback;