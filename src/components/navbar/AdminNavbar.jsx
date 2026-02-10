// Updated AdminNavbar.jsx - Simplified for consistency
import { useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { Building2, LogOut, Menu, X, Home, Plus } from "lucide-react";

function AdminNavbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <nav className={`sticky top-0 z-50 w-full transition-all duration-300 ${
      scrolled ? "bg-white/95 backdrop-blur-xl shadow-lg py-3" : "bg-transparent py-6"
    }`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between">
          {/* LOGO */}
          <div 
            onClick={() => navigate("/admin-dashboard")}
            className="flex items-center gap-3 group cursor-pointer"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg blur-md group-hover:blur-lg transition-all opacity-70" />
              <div className="relative w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <Building2 className="w-6 h-6 text-white" />
              </div>
            </div>
            <span className="text-xl font-bold text-slate-800">Admin<span className="text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text">Panel</span></span>
          </div>

          {/* DESKTOP NAV */}
          <div className="hidden md:flex items-center gap-4">
            <NavItem to="/admin-dashboard">
              <Home className="w-4 h-4 mr-2" />
              Dashboard
            </NavItem>
            <NavItem to="/add-parking-lot">
              <Plus className="w-4 h-4 mr-2" />
              Add Lot
            </NavItem>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-rose-500 to-pink-600 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-rose-500/30 transition-all"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>

          {/* MOBILE TOGGLE */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            {isOpen ? (
              <X className="w-6 h-6 text-slate-700" />
            ) : (
              <Menu className="w-6 h-6 text-slate-700" />
            )}
          </button>
        </div>

        {/* MOBILE MENU */}
        {isOpen && (
          <div className="md:hidden mt-4 bg-white rounded-xl border border-slate-200 shadow-xl p-4 animate-slide-down">
            <MobileNavItem to="/admin-dashboard" icon={<Home className="w-5 h-5" />}>
              Dashboard
            </MobileNavItem>
            <MobileNavItem to="/add-parking-lot" icon={<Plus className="w-5 h-5" />}>
              Add Lot
            </MobileNavItem>
            <button
              onClick={handleLogout}
              className="w-full mt-4 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-rose-500 to-pink-600 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-rose-500/30 transition-all"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

function NavItem({ to, children }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center px-4 py-2.5 rounded-xl font-medium transition-all ${
          isActive
            ? "bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-600 border border-blue-100"
            : "text-slate-600 hover:text-slate-800 hover:bg-slate-50"
        }`
      }
    >
      {children}
    </NavLink>
  );
}

function MobileNavItem({ to, icon, children }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all mb-2 ${
          isActive
            ? "bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-600 border border-blue-100"
            : "text-slate-600 hover:text-slate-800 hover:bg-slate-50"
        }`
      }
    >
      {icon}
      {children}
    </NavLink>
  );
}

export default AdminNavbar;