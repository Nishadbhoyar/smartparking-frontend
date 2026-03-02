import { useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { Car, Home, LogOut, Menu, X, Package, User, Lock, Mail, Eye, EyeOff, Check, AlertCircle } from "lucide-react";

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth <= breakpoint : false
  );
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth <= breakpoint);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, [breakpoint]);
  return isMobile;
}

function UserNavbar() {
  const navigate  = useNavigate();
  const location  = useLocation();
  const isMobile  = useIsMobile();
  const [isOpen,      setIsOpen]      = useState(false);
  const [scrolled,    setScrolled]    = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  useEffect(() => { setIsOpen(false); }, [location.pathname]);
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("userId");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <>
      <nav style={{
        ...S.nav,
        background:     scrolled ? "rgba(10,10,10,0.95)" : "transparent",
        boxShadow:      scrolled ? "0 1px 0 #1e1e1e"     : "none",
        backdropFilter: scrolled ? "blur(16px)"           : "none",
        padding:        scrolled ? "12px 0"               : "20px 0",
      }}>
        <div style={S.inner}>
          {/* LOGO */}
          <div onClick={() => navigate("/user-dashboard")} style={S.logo}>
            <div style={S.logoIconWrap}>
              <div style={S.logoGlow} />
              <div style={S.logoIcon}><Car size={20} color="#000" /></div>
            </div>
            <span style={S.logoText}>Park<span style={S.logoAccent}>Ease</span></span>
          </div>

          {!isMobile && (
            <div style={S.desktopNav}>
              <NavItem to="/user-dashboard"><Home size={15} /> Dashboard</NavItem>
              <NavItem to="/my-bookings"><Package size={15} /> My Bookings</NavItem>
              <button
                onClick={() => setShowProfile(true)}
                style={S.profileBtn}
                onMouseEnter={e => (e.currentTarget.style.background = "#C8FF0022")}
                onMouseLeave={e => (e.currentTarget.style.background = "#C8FF0012")}
              >
                <User size={15} /> My Profile
              </button>
              <button
                onClick={handleLogout}
                style={S.logoutBtn}
                onMouseEnter={e => (e.currentTarget.style.background = "#f8717128")}
                onMouseLeave={e => (e.currentTarget.style.background = "#f8717118")}
              >
                <LogOut size={15} /> Logout
              </button>
            </div>
          )}

          {isMobile && (
            <button onClick={() => setIsOpen(!isOpen)} style={S.hamburger}>
              {isOpen ? <X size={22} color="#fff" /> : <Menu size={22} color="#fff" />}
            </button>
          )}
        </div>

        {isMobile && isOpen && (
          <div style={S.mobileMenu}>
            <MobileNavItem to="/user-dashboard"  icon={<Home    size={18} />}>Dashboard</MobileNavItem>
            <MobileNavItem to="/my-bookings"     icon={<Package size={18} />}>My Bookings</MobileNavItem>
            <button onClick={() => { setShowProfile(true); setIsOpen(false); }} style={S.mobileProfileBtn}>
              <User size={18} /> My Profile
            </button>
            <button onClick={handleLogout} style={S.mobileLogout}>
              <LogOut size={18} /> Logout
            </button>
          </div>
        )}
      </nav>

      {showProfile && <ProfileModal onClose={() => setShowProfile(false)} accentColor="#C8FF00" />}
    </>
  );
}

/* ── PROFILE MODAL (shared logic) ── */
function ProfileModal({ onClose, accentColor }) {
  const stored = JSON.parse(localStorage.getItem("user") || "{}");
  const [tab,       setTab]       = useState("info");
  const [name,      setName]      = useState(stored.name  || "");
  const [email,     setEmail]     = useState(stored.email || "");
  const [currentPw, setCurrentPw] = useState("");
  const [newPw,     setNewPw]     = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [showCur,   setShowCur]   = useState(false);
  const [showNew,   setShowNew]   = useState(false);
  const [showCon,   setShowCon]   = useState(false);
  const [loading,   setLoading]   = useState(false);
  const [status,    setStatus]    = useState(null);

  const token  = localStorage.getItem("token");
  const accent = accentColor;
  const initial = (stored.name || stored.email || "U")[0].toUpperCase();

  const saveInfo = async () => {
    if (!name.trim() || !email.trim()) {
      setStatus({ type: "error", msg: "Name and email cannot be empty." }); return;
    }
    setLoading(true); setStatus(null);
    try {
      const res  = await fetch("http://localhost:8080/api/users/update-profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ name, email }),
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("user", JSON.stringify({ ...stored, name, email }));
        setStatus({ type: "success", msg: "Profile updated successfully!" });
      } else {
        setStatus({ type: "error", msg: data.message || "Update failed." });
      }
    } catch {
      setStatus({ type: "error", msg: "Network error. Please try again." });
    } finally { setLoading(false); }
  };

  const savePassword = async () => {
    if (!currentPw || !newPw || !confirmPw) {
      setStatus({ type: "error", msg: "All password fields are required." }); return;
    }
    if (newPw.length < 6) {
      setStatus({ type: "error", msg: "New password must be at least 6 characters." }); return;
    }
    if (newPw !== confirmPw) {
      setStatus({ type: "error", msg: "New passwords do not match." }); return;
    }
    setLoading(true); setStatus(null);
    try {
      const res  = await fetch("http://localhost:8080/api/users/change-password", {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ currentPassword: currentPw, newPassword: newPw }),
      });
      const data = await res.json();
      if (res.ok) {
        setCurrentPw(""); setNewPw(""); setConfirmPw("");
        setStatus({ type: "success", msg: "Password changed successfully!" });
      } else {
        setStatus({ type: "error", msg: data.message || "Password change failed." });
      }
    } catch {
      setStatus({ type: "error", msg: "Network error. Please try again." });
    } finally { setLoading(false); }
  };

  return (
    <div style={M.overlay} onClick={e => e.target === e.currentTarget && onClose()}>
      <div style={M.modal}>
        <div style={M.header}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ ...M.avatar, background: `${accent}22`, border: `2px solid ${accent}40`, color: accent }}>
              {initial}
            </div>
            <div>
              <div style={{ color: "#fff", fontWeight: 700, fontSize: 16 }}>{stored.name || "My Account"}</div>
              <div style={{ color: "#666", fontSize: 12, marginTop: 2 }}>{stored.email || ""}</div>
            </div>
          </div>
          <button onClick={onClose} style={M.closeBtn}><X size={18} color="#888" /></button>
        </div>

        <div style={M.tabRow}>
          {["info", "password"].map(t => (
            <button key={t} onClick={() => { setTab(t); setStatus(null); }} style={{
              ...M.tab,
              color:        tab === t ? accent : "#666",
              borderBottom: tab === t ? `2px solid ${accent}` : "2px solid transparent",
              fontWeight:   tab === t ? 700 : 500,
            }}>
              {t === "info" ? "Profile Info" : "Change Password"}
            </button>
          ))}
        </div>

        <div style={M.body}>
          {status && (
            <div style={{ ...M.statusBanner,
              background:  status.type === "success" ? "#1a3a1a" : "#3a1a1a",
              borderColor: status.type === "success" ? "#2d7a2d" : "#7a2d2d",
              color:       status.type === "success" ? "#6ee46e" : "#f87171" }}>
              {status.type === "success" ? <Check size={15} /> : <AlertCircle size={15} />}
              {status.msg}
            </div>
          )}

          {tab === "info" ? (
            <>
              <Field label="Full Name" icon={<User size={15} color="#555" />}>
                <input value={name} onChange={e => setName(e.target.value)} placeholder="Enter your name"
                  style={{ ...M.input, borderColor: "#2e2e2e" }}
                  onFocus={e => (e.target.style.borderColor = accent)}
                  onBlur={e  => (e.target.style.borderColor = "#2e2e2e")} />
              </Field>
              <Field label="Email Address" icon={<Mail size={15} color="#555" />}>
                <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter your email" type="email"
                  style={{ ...M.input, borderColor: "#2e2e2e" }}
                  onFocus={e => (e.target.style.borderColor = accent)}
                  onBlur={e  => (e.target.style.borderColor = "#2e2e2e")} />
              </Field>
              <button onClick={saveInfo} disabled={loading}
                style={{ ...M.saveBtn, background: accent, opacity: loading ? 0.7 : 1 }}>
                {loading ? "Saving…" : "Save Changes"}
              </button>
            </>
          ) : (
            <>
              <PwField label="Current Password"     value={currentPw} onChange={setCurrentPw} show={showCur} toggle={() => setShowCur(!showCur)} accent={accent} />
              <PwField label="New Password"          value={newPw}     onChange={setNewPw}     show={showNew} toggle={() => setShowNew(!showNew)} accent={accent} hint="Minimum 6 characters" />
              <PwField label="Confirm New Password"  value={confirmPw} onChange={setConfirmPw} show={showCon} toggle={() => setShowCon(!showCon)} accent={accent} match={confirmPw.length > 0 ? newPw === confirmPw : null} />
              <button onClick={savePassword} disabled={loading}
                style={{ ...M.saveBtn, background: accent, opacity: loading ? 0.7 : 1 }}>
                {loading ? "Updating…" : "Update Password"}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function Field({ label, icon, children }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <label style={{ display: "flex", alignItems: "center", gap: 6, color: "#888", fontSize: 12, fontWeight: 600, letterSpacing: "0.05em", marginBottom: 8 }}>
        {icon} {label.toUpperCase()}
      </label>
      {children}
    </div>
  );
}

function PwField({ label, value, onChange, show, toggle, accent, hint, match }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <label style={{ display: "flex", alignItems: "center", gap: 6, color: "#888", fontSize: 12, fontWeight: 600, letterSpacing: "0.05em", marginBottom: 8 }}>
        <Lock size={15} color="#555" /> {label.toUpperCase()}
      </label>
      <div style={{ position: "relative" }}>
        <input value={value} onChange={e => onChange(e.target.value)} type={show ? "text" : "password"} placeholder="••••••••"
          style={{ ...M.input, paddingRight: 44,
            borderWidth: "1px", borderStyle: "solid",
            borderColor: match === true ? "#2d7a2d" : match === false ? "#7a2d2d" : "#2e2e2e" }}
          onFocus={e => (e.target.style.borderColor = accent)}
          onBlur={e  => (e.target.style.borderColor = match === true ? "#2d7a2d" : match === false ? "#7a2d2d" : "#2e2e2e")} />
        <button onClick={toggle} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", padding: 0 }}>
          {show ? <EyeOff size={16} color="#555" /> : <Eye size={16} color="#555" />}
        </button>
      </div>
      {hint && <div style={{ color: "#555", fontSize: 11, marginTop: 5 }}>{hint}</div>}
    </div>
  );
}

function NavItem({ to, children }) {
  return (
    <NavLink to={to} style={({ isActive }) => ({
      display: "flex", alignItems: "center", gap: 7,
      padding: "9px 16px", borderRadius: 10, fontSize: 14,
      fontWeight: 600, textDecoration: "none", transition: "all 0.15s",
      background: isActive ? "#C8FF0015" : "transparent",
      color:      isActive ? "#C8FF00"   : "#aaa",
      border:     isActive ? "1px solid #C8FF0030" : "1px solid transparent",
    })}>
      {children}
    </NavLink>
  );
}

function MobileNavItem({ to, icon, children }) {
  return (
    <NavLink to={to} style={({ isActive }) => ({
      display: "flex", alignItems: "center", gap: 12,
      padding: "12px 16px", borderRadius: 12, fontSize: 14,
      fontWeight: 600, textDecoration: "none", marginBottom: 6,
      background: isActive ? "#C8FF0015" : "transparent",
      color:      isActive ? "#C8FF00"   : "#ccc",
      border:     isActive ? "1px solid #C8FF0030" : "1px solid transparent",
    })}>
      {icon}{children}
    </NavLink>
  );
}

const S = {
  nav: { position: "sticky", top: 0, zIndex: 50, width: "100%", transition: "all 0.3s", fontFamily: "'Syne', sans-serif" },
  inner: { maxWidth: 1400, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between" },
  logo: { display: "flex", alignItems: "center", gap: 10, cursor: "pointer", userSelect: "none" },
  logoIconWrap: { position: "relative", width: 38, height: 38 },
  logoGlow: { position: "absolute", inset: 0, background: "radial-gradient(circle, #C8FF0060 0%, transparent 70%)", borderRadius: 10, filter: "blur(6px)" },
  logoIcon: { position: "relative", width: 38, height: 38, background: "#C8FF00", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center" },
  logoText:   { fontSize: 18, fontWeight: 800, color: "#fff", letterSpacing: "-0.5px" },
  logoAccent: { color: "#C8FF00" },
  desktopNav: { display: "flex", alignItems: "center", gap: 8 },
  profileBtn: { display: "flex", alignItems: "center", gap: 7, background: "#C8FF0012", border: "1px solid #C8FF0025", color: "#C8FF00", borderRadius: 10, padding: "9px 16px", fontWeight: 600, fontSize: 14, cursor: "pointer", transition: "background 0.15s" },
  logoutBtn:  { display: "flex", alignItems: "center", gap: 7, background: "#f8717118", border: "1px solid #f8717130", color: "#f87171", borderRadius: 10, padding: "9px 16px", fontWeight: 600, fontSize: 14, cursor: "pointer", transition: "background 0.15s" },
  hamburger:  { background: "transparent", border: "1px solid #2e2e2e", borderRadius: 8, padding: "6px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" },
  mobileMenu: { maxWidth: 1400, margin: "0 auto", padding: "12px 24px 16px", borderTop: "1px solid #1e1e1e", background: "rgba(10,10,10,0.98)", backdropFilter: "blur(16px)" },
  mobileProfileBtn: { display: "flex", alignItems: "center", gap: 10, width: "100%", padding: "12px 16px", background: "#C8FF0012", border: "1px solid #C8FF0025", color: "#C8FF00", borderRadius: 12, fontWeight: 700, fontSize: 14, cursor: "pointer", marginBottom: 6 },
  mobileLogout:     { display: "flex", alignItems: "center", gap: 10, width: "100%", justifyContent: "center", padding: "12px 16px", background: "#f8717118", border: "1px solid #f8717130", color: "#f87171", borderRadius: 12, fontWeight: 700, fontSize: 14, cursor: "pointer", marginTop: 8 },
};

const M = {
  overlay: { position: "fixed", inset: 0, background: "rgba(0,0,0,0.75)", backdropFilter: "blur(8px)", zIndex: 999, display: "flex", alignItems: "center", justifyContent: "center", padding: 20, fontFamily: "'Syne', sans-serif" },
  modal:   { background: "#111", border: "1px solid #2a2a2a", borderRadius: 20, width: "100%", maxWidth: 440, overflow: "hidden", boxShadow: "0 24px 80px rgba(0,0,0,0.6)" },
  header:  { padding: "22px 24px", borderBottom: "1px solid #1e1e1e", display: "flex", alignItems: "center", justifyContent: "space-between" },
  avatar:  { width: 46, height: 46, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, fontWeight: 800 },
  closeBtn: { background: "#1a1a1a", border: "1px solid #2e2e2e", borderRadius: 8, padding: 7, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" },
  tabRow:  { display: "flex", borderBottom: "1px solid #1e1e1e", padding: "0 24px" },
  tab:     { flex: 1, padding: "14px 0", background: "none", border: "none", borderBottom: "2px solid transparent", cursor: "pointer", fontSize: 13, letterSpacing: "0.02em", transition: "all 0.15s" },
  body:    { padding: 24 },
  statusBanner: { display: "flex", alignItems: "center", gap: 8, padding: "10px 14px", borderRadius: 10, border: "1px solid", fontSize: 13, marginBottom: 18, fontWeight: 500 },
  input:   { width: "100%", background: "#161616", borderWidth: "1px", borderStyle: "solid", borderColor: "#2e2e2e", borderRadius: 10, padding: "11px 14px", color: "#fff", fontSize: 14, outline: "none", transition: "border-color 0.2s", boxSizing: "border-box" },
  saveBtn: { width: "100%", padding: "13px", borderRadius: 12, border: "none", color: "#000", fontWeight: 800, fontSize: 14, cursor: "pointer", marginTop: 8, letterSpacing: "0.03em", transition: "opacity 0.15s" },
};

export default UserNavbar;