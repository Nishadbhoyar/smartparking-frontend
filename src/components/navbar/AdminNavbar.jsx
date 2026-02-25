// // Updated AdminNavbar.jsx - Simplified for consistency
// import { useState, useEffect } from "react";
// import { NavLink, useNavigate, useLocation } from "react-router-dom";
// import { Building2, LogOut, Menu, X, Home, Plus } from "lucide-react";

// function AdminNavbar() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [isOpen, setIsOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);

//   useEffect(() => {
//     setIsOpen(false);
//   }, [location.pathname]);

//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 20);
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const handleLogout = () => {
//     localStorage.clear();
//     navigate("/");
//   };

//   return (
//     <nav className={`sticky top-0 z-50 w-full transition-all duration-300 ${
//       scrolled ? "bg-white/95 backdrop-blur-xl shadow-lg py-3" : "bg-transparent py-6"
//     }`}>
//       <div className="max-w-7xl mx-auto px-6">
//         <div className="flex items-center justify-between">
//           {/* LOGO */}
//           <div 
//             onClick={() => navigate("/admin-dashboard")}
//             className="flex items-center gap-3 group cursor-pointer"
//           >
//             <div className="relative">
//               <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg blur-md group-hover:blur-lg transition-all opacity-70" />
//               <div className="relative w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
//                 <Building2 className="w-6 h-6 text-white" />
//               </div>
//             </div>
//             <span className="text-xl font-bold text-slate-800">Admin<span className="text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text">Panel</span></span>
//           </div>

//           {/* DESKTOP NAV */}
//           <div className="hidden md:flex items-center gap-4">
//             <NavItem to="/admin-dashboard">
//               <Home className="w-4 h-4 mr-2" />
//               Dashboard
//             </NavItem>
//             <NavItem to="/add-parking-lot">
//               <Plus className="w-4 h-4 mr-2" />
//               Add Lot
//             </NavItem>
//             <button
//               onClick={handleLogout}
//               className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-rose-500 to-pink-600 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-rose-500/30 transition-all"
//             >
//               <LogOut className="w-4 h-4" />
//               Logout
//             </button>
//           </div>

//           {/* MOBILE TOGGLE */}
//           <button
//             onClick={() => setIsOpen(!isOpen)}
//             className="md:hidden p-2 hover:bg-slate-100 rounded-lg transition-colors"
//           >
//             {isOpen ? (
//               <X className="w-6 h-6 text-slate-700" />
//             ) : (
//               <Menu className="w-6 h-6 text-slate-700" />
//             )}
//           </button>
//         </div>

//         {/* MOBILE MENU */}
//         {isOpen && (
//           <div className="md:hidden mt-4 bg-white rounded-xl border border-slate-200 shadow-xl p-4 animate-slide-down">
//             <MobileNavItem to="/admin-dashboard" icon={<Home className="w-5 h-5" />}>
//               Dashboard
//             </MobileNavItem>
//             <MobileNavItem to="/add-parking-lot" icon={<Plus className="w-5 h-5" />}>
//               Add Lot
//             </MobileNavItem>
//             <button
//               onClick={handleLogout}
//               className="w-full mt-4 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-rose-500 to-pink-600 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-rose-500/30 transition-all"
//             >
//               <LogOut className="w-5 h-5" />
//               Logout
//             </button>
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// }

// function NavItem({ to, children }) {
//   return (
//     <NavLink
//       to={to}
//       className={({ isActive }) =>
//         `flex items-center px-4 py-2.5 rounded-xl font-medium transition-all ${
//           isActive
//             ? "bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-600 border border-blue-100"
//             : "text-slate-600 hover:text-slate-800 hover:bg-slate-50"
//         }`
//       }
//     >
//       {children}
//     </NavLink>
//   );
// }

// function MobileNavItem({ to, icon, children }) {
//   return (
//     <NavLink
//       to={to}
//       className={({ isActive }) =>
//         `flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all mb-2 ${
//           isActive
//             ? "bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-600 border border-blue-100"
//             : "text-slate-600 hover:text-slate-800 hover:bg-slate-50"
//         }`
//       }
//     >
//       {icon}
//       {children}
//     </NavLink>
//   );
// }

// export default AdminNavbar;

import { useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { Building2, LogOut, Menu, X, Home, Plus } from "lucide-react";

/* ── tiny hook: is the viewport mobile-sized? ── */
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

function AdminNavbar() {
  const navigate   = useNavigate();
  const location   = useLocation();
  const isMobile   = useIsMobile();
  const [isOpen,   setIsOpen]   = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => { setIsOpen(false); }, [location.pathname]);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const handleLogout = () => { localStorage.clear(); navigate("/"); };

  return (
    <nav style={{
      ...S.nav,
      background:     scrolled ? "rgba(10,10,10,0.95)" : "transparent",
      boxShadow:      scrolled ? "0 1px 0 #1e1e1e"     : "none",
      backdropFilter: scrolled ? "blur(16px)"           : "none",
      padding:        scrolled ? "12px 0"               : "20px 0",
    }}>
      <div style={S.inner}>

        {/* LOGO */}
        <div onClick={() => navigate("/admin-dashboard")} style={S.logo}>
          <div style={S.logoIconWrap}>
            <div style={S.logoGlow} />
            <div style={S.logoIcon}>
              <Building2 size={20} color="#000" />
            </div>
          </div>
          <span style={S.logoText}>
            Admin<span style={S.logoAccent}>Panel</span>
          </span>
          <span style={S.adminBadge}>OWNER</span>
        </div>

        {/* DESKTOP NAV — conditionally rendered via JS, no CSS @media needed */}
        {!isMobile && (
          <div style={S.desktopNav}>
            <NavItem to="/admin-dashboard"><Home size={15} /> Dashboard</NavItem>
            <NavItem to="/add-parking-lot"><Plus size={15} /> Add Lot</NavItem>
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

        {/* HAMBURGER — conditionally rendered via JS */}
        {isMobile && (
          <button onClick={() => setIsOpen(!isOpen)} style={S.hamburger}>
            {isOpen ? <X size={22} color="#fff" /> : <Menu size={22} color="#fff" />}
          </button>
        )}
      </div>

      {/* MOBILE DROPDOWN */}
      {isMobile && isOpen && (
        <div style={S.mobileMenu}>
          <MobileNavItem to="/admin-dashboard" icon={<Home size={18} />}>
            Dashboard
          </MobileNavItem>
          <MobileNavItem to="/add-parking-lot" icon={<Plus size={18} />}>
            Add Lot
          </MobileNavItem>
          <button onClick={handleLogout} style={S.mobileLogout}>
            <LogOut size={18} /> Logout
          </button>
        </div>
      )}
    </nav>
  );
}

function NavItem({ to, children }) {
  return (
    <NavLink
      to={to}
      style={({ isActive }) => ({
        display: "flex", alignItems: "center", gap: 7,
        padding: "9px 16px", borderRadius: 10, fontSize: 14,
        fontWeight: 600, textDecoration: "none", transition: "all 0.15s",
        background: isActive ? "#C8FF0015"           : "transparent",
        color:      isActive ? "#C8FF00"             : "#aaa",
        border:     isActive ? "1px solid #C8FF0030" : "1px solid transparent",
      })}
    >
      {children}
    </NavLink>
  );
}

function MobileNavItem({ to, icon, children }) {
  return (
    <NavLink
      to={to}
      style={({ isActive }) => ({
        display: "flex", alignItems: "center", gap: 12,
        padding: "12px 16px", borderRadius: 12, fontSize: 14,
        fontWeight: 600, textDecoration: "none", marginBottom: 6,
        background: isActive ? "#C8FF0015"           : "transparent",
        color:      isActive ? "#C8FF00"             : "#ccc",
        border:     isActive ? "1px solid #C8FF0030" : "1px solid transparent",
      })}
    >
      {icon}{children}
    </NavLink>
  );
}

/* All responsive logic lives in JS above — zero @media in this file */
const S = {
  nav: {
    position: "sticky", top: 0, zIndex: 50,
    width: "100%", transition: "all 0.3s",
    fontFamily: "'Syne', sans-serif",
  },
  inner: {
    maxWidth: 1400, margin: "0 auto", padding: "0 24px",
    display: "flex", alignItems: "center", justifyContent: "space-between",
  },
  logo: {
    display: "flex", alignItems: "center", gap: 10,
    cursor: "pointer", userSelect: "none",
  },
  logoIconWrap: { position: "relative", width: 38, height: 38 },
  logoGlow: {
    position: "absolute", inset: 0,
    background: "radial-gradient(circle, #C8FF0060 0%, transparent 70%)",
    borderRadius: 10, filter: "blur(6px)",
  },
  logoIcon: {
    position: "relative", width: 38, height: 38,
    background: "#C8FF00", borderRadius: 10,
    display: "flex", alignItems: "center", justifyContent: "center",
  },
  logoText:   { fontSize: 18, fontWeight: 800, color: "#fff", letterSpacing: "-0.5px" },
  logoAccent: { color: "#C8FF00" },
  adminBadge: {
    background: "#C8FF0015", border: "1px solid #C8FF0030",
    color: "#C8FF00", fontSize: 10, fontWeight: 800,
    letterSpacing: "0.1em", padding: "3px 8px", borderRadius: 99,
  },
  desktopNav: { display: "flex", alignItems: "center", gap: 8 },
  logoutBtn: {
    display: "flex", alignItems: "center", gap: 7,
    background: "#f8717118", border: "1px solid #f8717130",
    color: "#f87171", borderRadius: 10,
    padding: "9px 16px", fontWeight: 600, fontSize: 14,
    cursor: "pointer", transition: "background 0.15s",
  },
  hamburger: {
    background: "transparent", border: "1px solid #2e2e2e",
    borderRadius: 8, padding: "6px", cursor: "pointer",
    display: "flex", alignItems: "center", justifyContent: "center",
  },
  mobileMenu: {
    maxWidth: 1400, margin: "0 auto", padding: "12px 24px 16px",
    borderTop: "1px solid #1e1e1e",
    background: "rgba(10,10,10,0.98)", backdropFilter: "blur(16px)",
  },
  mobileLogout: {
    display: "flex", alignItems: "center", gap: 10,
    width: "100%", justifyContent: "center", padding: "12px 16px",
    background: "#f8717118", border: "1px solid #f8717130",
    color: "#f87171", borderRadius: 12,
    fontWeight: 700, fontSize: 14, cursor: "pointer", marginTop: 8,
  },
};

export default AdminNavbar;