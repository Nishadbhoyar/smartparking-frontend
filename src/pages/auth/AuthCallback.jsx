import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { Loader2, CheckCircle, XCircle } from "lucide-react";

// ── Helper: role → dashboard path ──────────────────────────────
function getDashboardPath(role) {
  const r = role?.toUpperCase();
  if (r === "ADMIN" || r === "OWNER") return "/admin-dashboard";
  if (r === "VALET")                  return "/valet-dashboard";
  return "/user-dashboard";
}

const AuthCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate       = useNavigate();
  const [status, setStatus] = useState("loading"); // "loading" | "success" | "error"
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const token = searchParams.get("token");
    const role  = searchParams.get("role");   // present for OAuth, absent for magic link
    const id    = searchParams.get("id");     // present for OAuth, absent for magic link

    // ── No token at all ──────────────────────────────────────
    if (!token) {
      navigate("/login?error=oauth_failure", { replace: true });
      return;
    }

    // ── OAuth flow: role + id come in the URL ─────────────────
    // Backend already issued the JWT directly — no API call needed
    if (role && id) {
      localStorage.setItem("token",  token);
      localStorage.setItem("role",   role.toUpperCase());
      localStorage.setItem("userId", id);
      // Build a minimal user object so components that read it don't break
      localStorage.setItem("user", JSON.stringify({ id, role: role.toUpperCase() }));

      setStatus("success");
      setTimeout(() => {
        navigate(getDashboardPath(role), { replace: true });
      }, 800);
      return;
    }

    // ── Magic link flow: token is a one-time link token, verify it ──
    // role + id are NOT in the URL — we get them from the API response
    axios
      .post("http://localhost:8080/api/auth/verify-magic-link", { token })
      .then(({ data }) => {
        const { token: jwt, user } = data;

        if (!jwt || !user) {
          throw new Error("Invalid response from server.");
        }

        localStorage.setItem("token",  jwt);
        localStorage.setItem("role",   user.role?.toUpperCase());
        localStorage.setItem("userId", String(user.id));
        localStorage.setItem("user",   JSON.stringify(user));

        setStatus("success");
        setTimeout(() => {
          navigate(getDashboardPath(user.role), { replace: true });
        }, 800);
      })
      .catch((err) => {
        console.error("Magic link verification failed:", err);
        const msg =
          err.response?.data?.message ||
          "This link has expired or already been used.";
        setErrorMsg(msg);
        setStatus("error");
        // Auto-redirect to login after showing error
        setTimeout(() => {
          navigate("/login?error=magic_link_expired", { replace: true });
        }, 3000);
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // ✅ run once on mount only — searchParams won't change

  // ── UI ────────────────────────────────────────────────────────
  return (
    <div style={{
      minHeight: "100vh",
      background: "#020308",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "'DM Sans', sans-serif",
      color: "#F0F4FF",
      padding: 24,
    }}>
      {status === "loading" && (
        <>
          <div style={{ position: "relative", marginBottom: 24 }}>
            <div style={{
              position: "absolute", inset: 0, borderRadius: "50%",
              background: "#B8FF57", opacity: 0.15, filter: "blur(20px)",
            }} />
            <Loader2
              size={52}
              color="#B8FF57"
              style={{ animation: "spin 0.9s linear infinite", position: "relative" }}
            />
          </div>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 10 }}>
            Verifying your link…
          </h2>
          <p style={{ fontSize: 14, color: "#6B7594" }}>
            Please wait while we securely log you in.
          </p>
        </>
      )}

      {status === "success" && (
        <>
          <CheckCircle size={52} color="#B8FF57" style={{ marginBottom: 20 }} />
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 10 }}>
            Verified! Redirecting…
          </h2>
          <p style={{ fontSize: 14, color: "#6B7594" }}>
            Taking you to your dashboard.
          </p>
        </>
      )}

      {status === "error" && (
        <>
          <XCircle size={52} color="#f87171" style={{ marginBottom: 20 }} />
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 10, color: "#f87171" }}>
            Link Expired
          </h2>
          <p style={{ fontSize: 14, color: "#6B7594", textAlign: "center", maxWidth: 320 }}>
            {errorMsg}
          </p>
          <p style={{ fontSize: 13, color: "#444", marginTop: 16 }}>
            Redirecting you back to login…
          </p>
        </>
      )}

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
};

export default AuthCallback;