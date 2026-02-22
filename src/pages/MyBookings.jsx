import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // ✅ Fixed: Imported useNavigate
import UserNavbar from "../components/navbar/UserNavbar";
import { MapPin, Clock, History, Car } from "lucide-react";

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [activeTab, setActiveTab] = useState("current"); // 'current' or 'history'
  
  // ✅ Fixed: Uncommented and initialized the hook
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchBookings = async () => {
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");

      // Redirect if no credentials found
      if (!userId || !token) {
        navigate("/login");
        return;
      }

      try {
        // ✅ Fixed: Added Authorization Header for security
        const config = {
          headers: { Authorization: `Bearer ${token}` }
        };

        const res = await axios.get(`http://localhost:https://smartparking-backend-1.onrender.com/api/bookings/user/${userId}`, config);
        setBookings(res.data);
      } catch (err) {
        console.error("Error fetching bookings:", err);
        
        // ✅ Fixed: Auto-logout on 401 Unauthorized
        if (err.response?.status === 401) {
          localStorage.clear();
          navigate("/login");
        }
      }
    };

    fetchBookings();
  }, [navigate]); // Added navigate to dependency array

  // ✅ Fixed: Google Maps URL structure
  const openLocation = (lat, lng) => {
    if (!lat || !lng) {
      alert("Location not available yet.");
      return;
    }
    const url = `https://www.google.com/maps/search/?api=1&query=$${lat},${lng}`;
    window.open(url, "_blank");
  };

  // Filter Logic
  const currentBookings = bookings.filter(b => 
    ["PENDING", "CONFIRMED", "VALET_REQUESTED", "VALET_PICKED_UP", "PARKED"].includes(b.status)
  );

  const historyBookings = bookings.filter(b => 
    ["COMPLETED", "LEFT_PARKING", "CANCELLED", "RELEASED_BY_ADMIN"].includes(b.status)
  );

  const displayedBookings = activeTab === "current" ? currentBookings : historyBookings;

  return (
    <>
      <UserNavbar />

      <div className="min-h-screen bg-[#f8fafc] bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-100 via-slate-50 to-purple-100 p-4 md:p-10 font-sans">
        
        <div className="mx-auto max-w-7xl animate-fadeIn">
          {/* HEADER */}
          <div className="mb-8 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-slate-800 tracking-tight">
                My <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">Bookings</span>
              </h2>
              <p className="mt-2 text-slate-500 font-medium">
                Manage your active parking and view history.
              </p>
            </div>

            {/* TAB SWITCHER */}
            <div className="flex bg-white/60 p-1 rounded-2xl border border-white/50 shadow-sm backdrop-blur-md">
              <button
                onClick={() => setActiveTab("current")}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all ${
                  activeTab === "current"
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/30"
                    : "text-slate-500 hover:bg-white/50"
                }`}
              >
                <Clock size={16} /> Current
                <span className="bg-white/20 px-2 py-0.5 rounded-md text-xs ml-1">
                  {currentBookings.length}
                </span>
              </button>
              
              <button
                onClick={() => setActiveTab("history")}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all ${
                  activeTab === "history"
                    ? "bg-slate-800 text-white shadow-lg shadow-slate-500/30"
                    : "text-slate-500 hover:bg-white/50"
                }`}
              >
                <History size={16} /> History
                <span className="bg-white/20 px-2 py-0.5 rounded-md text-xs ml-1">
                  {historyBookings.length}
                </span>
              </button>
            </div>
          </div>

          {/* EMPTY STATE */}
          {displayedBookings.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-white/40 py-20 text-center backdrop-blur-sm">
              <div className="mb-4 text-6xl opacity-20">
                {activeTab === "current" ? "🅿️" : "📜"}
              </div>
              <h3 className="text-xl font-bold text-slate-600">
                No {activeTab} bookings
              </h3>
              <p className="text-slate-500">
                {activeTab === "current" 
                  ? "You don't have any active parking sessions." 
                  : "Your past parking history will appear here."}
              </p>
            </div>
          ) : (
            /* BOOKING CARDS GRID */
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {displayedBookings.map((b) => (
                <BookingCard 
                  key={b.id} 
                  booking={b} 
                  openLocation={openLocation} 
                  isHistory={activeTab === "history"}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

// --- SUB-COMPONENT: Booking Card ---
function BookingCard({ booking, openLocation, isHistory }) {
  return (
    <div className={`group relative overflow-hidden rounded-3xl border p-6 shadow-xl backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${
      isHistory 
        ? "bg-slate-100/80 border-slate-200 grayscale-[0.5] hover:grayscale-0" 
        : "bg-white/70 border-white/50 shadow-indigo-100/50 hover:shadow-indigo-200/50"
    }`}>
      
      {/* Header */}
      <div className="relative z-10 flex items-start justify-between mb-4">
        <div>
          <p className="text-xs font-black uppercase tracking-widest text-slate-400">
            {isHistory ? "Completed" : "Active"} ID
          </p>
          <p className="font-mono text-xl font-bold text-slate-800">#{booking.id}</p>
        </div>
        <StatusBadge status={booking.status} />
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white/50 p-3 rounded-2xl border border-white/60">
          <p className="text-xs font-bold text-slate-400 uppercase mb-1">Vehicle</p>
          <div className="flex items-center gap-2 font-bold text-slate-700">
            <Car size={16} className="text-indigo-500"/>
            <span className="truncate">{booking.vehicleNumber || "N/A"}</span>
          </div>
        </div>
        <div className="bg-white/50 p-3 rounded-2xl border border-white/60">
          <p className="text-xs font-bold text-slate-400 uppercase mb-1">Time</p>
          <div className="flex items-center gap-2 font-bold text-slate-700">
            <Clock size={16} className="text-indigo-500"/>
            <span>{new Date(booking.startTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
          </div>
        </div>
      </div>

      {/* 📸 Image Section (Only if Active & Parked) */}
      {!isHistory && booking.parkedProofImage ? (
        <div className="mb-4">
          <p className="mb-2 text-xs font-bold text-slate-500">Valet Proof</p>
          <div className="overflow-hidden rounded-2xl border border-slate-100 shadow-sm h-40">
            <img
              src={booking.parkedProofImage}
              alt="Vehicle proof"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
          </div>
        </div>
      ) : null}

      {/* 📍 Action Buttons */}
      <div className="mt-auto border-t border-slate-200/50 pt-4">
        {!isHistory && booking.parkedLat && booking.parkedLng ? (
          <button 
            onClick={() => openLocation(booking.parkedLat, booking.parkedLng)}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-500/30 transition-all hover:scale-[1.02] hover:shadow-emerald-500/50"
          >
            <MapPin size={18} /> Track Vehicle
          </button>
        ) : isHistory ? (
          <button disabled className="w-full rounded-xl bg-slate-200 py-3 text-sm font-bold text-slate-400 cursor-not-allowed">
            Session Ended
          </button>
        ) : (
          <button disabled className="w-full rounded-xl bg-slate-100 py-3 text-sm font-bold text-slate-400 cursor-not-allowed border border-dashed border-slate-300">
            Waiting for Valet...
          </button>
        )}
      </div>
    </div>
  );
}

// --- HELPER COMPONENT: Status Badge ---
function StatusBadge({ status }) {
  let colorClass = "bg-slate-100 text-slate-600 border-slate-200";
  let icon = "⚪";

  const s = status ? status.toUpperCase() : "";

  if (s.includes("PARKED")) {
    colorClass = "bg-emerald-100 text-emerald-700 border-emerald-200";
    icon = "✅";
  } else if (s.includes("VALET") || s.includes("REQUEST")) {
    colorClass = "bg-purple-100 text-purple-700 border-purple-200";
    icon = "👮";
  } else if (s.includes("LEFT") || s.includes("COMPLETED")) {
    colorClass = "bg-slate-100 text-slate-500 border-slate-200";
    icon = "🏁";
  } else if (s.includes("PENDING")) {
    colorClass = "bg-amber-100 text-amber-700 border-amber-200";
    icon = "⏳";
  }

  return (
    <span className={`flex items-center gap-1.5 rounded-full border px-3 py-1 text-[10px] font-black uppercase tracking-wide ${colorClass}`}>
      <span>{icon}</span>
      {status ? status.replace(/_/g, " ") : "UNKNOWN"}
    </span>
  );
}

export default MyBookings;