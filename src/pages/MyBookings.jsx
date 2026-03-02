// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom"; // ✅ Fixed: Imported useNavigate
// import UserNavbar from "../components/navbar/UserNavbar";
// import { MapPin, Clock, History, Car } from "lucide-react";

// function MyBookings() {
//   const [bookings, setBookings] = useState([]);
//   const [activeTab, setActiveTab] = useState("current"); // 'current' or 'history'
  
//   // ✅ Fixed: Uncommented and initialized the hook
//   const navigate = useNavigate(); 

//   useEffect(() => {
//     const fetchBookings = async () => {
//       const userId = localStorage.getItem("userId");
//       const token = localStorage.getItem("token");

//       // Redirect if no credentials found
//       if (!userId || !token) {
//         navigate("/login");
//         return;
//       }

//       try {
//         // ✅ Fixed: Added Authorization Header for security
//         const config = {
//           headers: { Authorization: `Bearer ${token}` }
//         };

//         const res = await axios.get(`http://localhost:8080/api/bookings/user/${userId}`, config);
//         setBookings(res.data);
//       } catch (err) {
//         console.error("Error fetching bookings:", err);
        
//         // ✅ Fixed: Auto-logout on 401 Unauthorized
//         if (err.response?.status === 401) {
//           localStorage.clear();
//           navigate("/login");
//         }
//       }
//     };

//     fetchBookings();
//   }, [navigate]); // Added navigate to dependency array

//   // ✅ Fixed: Google Maps URL structure
//   const openLocation = (lat, lng) => {
//     if (!lat || !lng) {
//       alert("Location not available yet.");
//       return;
//     }
//     const url = `https://www.google.com/maps?q=${lat},${lng}`;
//     window.open(url, "_blank");
//   };

//   // Filter Logic
//   const currentBookings = bookings.filter(b => 
//     ["PENDING", "CONFIRMED", "VALET_REQUESTED", "VALET_PICKED_UP", "PARKED"].includes(b.status)
//   );

//   const historyBookings = bookings.filter(b => 
//     ["COMPLETED", "LEFT_PARKING", "CANCELLED", "RELEASED_BY_ADMIN"].includes(b.status)
//   );

//   const displayedBookings = activeTab === "current" ? currentBookings : historyBookings;

//   return (
//     <>
//       <UserNavbar />

//       <div className="min-h-screen bg-[#f8fafc] bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-100 via-slate-50 to-purple-100 p-4 md:p-10 font-sans">
        
//         <div className="mx-auto max-w-7xl animate-fadeIn">
//           {/* HEADER */}
//           <div className="mb-8 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-4">
//             <div>
//               <h2 className="text-3xl md:text-4xl font-black text-slate-800 tracking-tight">
//                 My <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">Bookings</span>
//               </h2>
//               <p className="mt-2 text-slate-500 font-medium">
//                 Manage your active parking and view history.
//               </p>
//             </div>

//             {/* TAB SWITCHER */}
//             <div className="flex bg-white/60 p-1 rounded-2xl border border-white/50 shadow-sm backdrop-blur-md">
//               <button
//                 onClick={() => setActiveTab("current")}
//                 className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all ${
//                   activeTab === "current"
//                     ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/30"
//                     : "text-slate-500 hover:bg-white/50"
//                 }`}
//               >
//                 <Clock size={16} /> Current
//                 <span className="bg-white/20 px-2 py-0.5 rounded-md text-xs ml-1">
//                   {currentBookings.length}
//                 </span>
//               </button>
              
//               <button
//                 onClick={() => setActiveTab("history")}
//                 className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all ${
//                   activeTab === "history"
//                     ? "bg-slate-800 text-white shadow-lg shadow-slate-500/30"
//                     : "text-slate-500 hover:bg-white/50"
//                 }`}
//               >
//                 <History size={16} /> History
//                 <span className="bg-white/20 px-2 py-0.5 rounded-md text-xs ml-1">
//                   {historyBookings.length}
//                 </span>
//               </button>
//             </div>
//           </div>

//           {/* EMPTY STATE */}
//           {displayedBookings.length === 0 ? (
//             <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-white/40 py-20 text-center backdrop-blur-sm">
//               <div className="mb-4 text-6xl opacity-20">
//                 {activeTab === "current" ? "🅿️" : "📜"}
//               </div>
//               <h3 className="text-xl font-bold text-slate-600">
//                 No {activeTab} bookings
//               </h3>
//               <p className="text-slate-500">
//                 {activeTab === "current" 
//                   ? "You don't have any active parking sessions." 
//                   : "Your past parking history will appear here."}
//               </p>
//             </div>
//           ) : (
//             /* BOOKING CARDS GRID */
//             <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
//               {displayedBookings.map((b) => (
//                 <BookingCard 
//                   key={b.id} 
//                   booking={b} 
//                   openLocation={openLocation} 
//                   isHistory={activeTab === "history"}
//                 />
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// }

// // --- SUB-COMPONENT: Booking Card ---
// function BookingCard({ booking, openLocation, isHistory }) {
//   return (
//     <div className={`group relative overflow-hidden rounded-3xl border p-6 shadow-xl backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${
//       isHistory 
//         ? "bg-slate-100/80 border-slate-200 grayscale-[0.5] hover:grayscale-0" 
//         : "bg-white/70 border-white/50 shadow-indigo-100/50 hover:shadow-indigo-200/50"
//     }`}>
      
//       {/* Header */}
//       <div className="relative z-10 flex items-start justify-between mb-4">
//         <div>
//           <p className="text-xs font-black uppercase tracking-widest text-slate-400">
//             {isHistory ? "Completed" : "Active"} ID
//           </p>
//           <p className="font-mono text-xl font-bold text-slate-800">#{booking.id}</p>
//         </div>
//         <StatusBadge status={booking.status} />
//       </div>

//       {/* Info Grid */}
//       <div className="grid grid-cols-2 gap-4 mb-6">
//         <div className="bg-white/50 p-3 rounded-2xl border border-white/60">
//           <p className="text-xs font-bold text-slate-400 uppercase mb-1">Vehicle</p>
//           <div className="flex items-center gap-2 font-bold text-slate-700">
//             <Car size={16} className="text-indigo-500"/>
//             <span className="truncate">{booking.vehicleNumber || "N/A"}</span>
//           </div>
//         </div>
//         <div className="bg-white/50 p-3 rounded-2xl border border-white/60">
//           <p className="text-xs font-bold text-slate-400 uppercase mb-1">Time</p>
//           <div className="flex items-center gap-2 font-bold text-slate-700">
//             <Clock size={16} className="text-indigo-500"/>
//             <span>{new Date(booking.startTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
//           </div>
//         </div>
//       </div>

//       {/* 📸 Image Section (Only if Active & Parked) */}
//       {!isHistory && booking.parkedProofImage ? (
//         <div className="mb-4">
//           <p className="mb-2 text-xs font-bold text-slate-500">Valet Proof</p>
//           <div className="overflow-hidden rounded-2xl border border-slate-100 shadow-sm h-40">
//             <img
//               src={booking.parkedProofImage}
//               alt="Vehicle proof"
//               className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
//             />
//           </div>
//         </div>
//       ) : null}

//       {/* 📍 Action Buttons */}
//       <div className="mt-auto border-t border-slate-200/50 pt-4">
//         {!isHistory && booking.parkedLat && booking.parkedLng ? (
//           <button 
//             onClick={() => openLocation(booking.parkedLat, booking.parkedLng)}
//             className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-500/30 transition-all hover:scale-[1.02] hover:shadow-emerald-500/50"
//           >
//             <MapPin size={18} /> Track Vehicle
//           </button>
//         ) : isHistory ? (
//           <button disabled className="w-full rounded-xl bg-slate-200 py-3 text-sm font-bold text-slate-400 cursor-not-allowed">
//             Session Ended
//           </button>
//         ) : (
//           <button disabled className="w-full rounded-xl bg-slate-100 py-3 text-sm font-bold text-slate-400 cursor-not-allowed border border-dashed border-slate-300">
//             Waiting for Valet...
//           </button>
//         )}
//       </div>
//     </div>
//   );
// }

// // --- HELPER COMPONENT: Status Badge ---
// function StatusBadge({ status }) {
//   let colorClass = "bg-slate-100 text-slate-600 border-slate-200";
//   let icon = "⚪";

//   const s = status ? status.toUpperCase() : "";

//   if (s.includes("PARKED")) {
//     colorClass = "bg-emerald-100 text-emerald-700 border-emerald-200";
//     icon = "✅";
//   } else if (s.includes("VALET") || s.includes("REQUEST")) {
//     colorClass = "bg-purple-100 text-purple-700 border-purple-200";
//     icon = "👮";
//   } else if (s.includes("LEFT") || s.includes("COMPLETED")) {
//     colorClass = "bg-slate-100 text-slate-500 border-slate-200";
//     icon = "🏁";
//   } else if (s.includes("PENDING")) {
//     colorClass = "bg-amber-100 text-amber-700 border-amber-200";
//     icon = "⏳";
//   }

//   return (
//     <span className={`flex items-center gap-1.5 rounded-full border px-3 py-1 text-[10px] font-black uppercase tracking-wide ${colorClass}`}>
//       <span>{icon}</span>
//       {status ? status.replace(/_/g, " ") : "UNKNOWN"}
//     </span>
//   );
// }

// export default MyBookings;


import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UserNavbar from "../components/navbar/UserNavbar";
import { MapPin, Clock, History, Car, Zap, CheckCircle2, AlertCircle, Timer } from "lucide-react";

/* ─── Inline styles & keyframes injected once ─── */
const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@400;500;600&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg:        #0b0d11;
    --surface:   #13161d;
    --surface2:  #1a1e28;
    --border:    #252932;
    --accent:    #b3f000;
    --accent-dim:#8ab800;
    --text:      #f0f2f7;
    --muted:     #6b7280;
    --danger:    #ff4d6d;
    --purple:    #a78bfa;
    --amber:     #fbbf24;
    --emerald:   #34d399;
  }

  .parkease-bookings {
    min-height: 100vh;
    background: var(--bg);
    font-family: 'DM Sans', sans-serif;
    color: var(--text);
    padding-bottom: 60px;
  }

  /* ── Top bar ── */
  .bookings-header {
    padding: 28px 20px 0;
    max-width: 960px;
    margin: 0 auto;
  }

  .bookings-title {
    font-family: 'Syne', sans-serif;
    font-size: clamp(26px, 7vw, 40px);
    font-weight: 800;
    letter-spacing: -1px;
    line-height: 1.1;
  }

  .bookings-title span {
    color: var(--accent);
  }

  .bookings-subtitle {
    color: var(--muted);
    font-size: 14px;
    margin-top: 6px;
    font-weight: 500;
  }

  /* ── Tab switcher ── */
  .tab-pill {
    display: inline-flex;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 999px;
    padding: 5px;
    margin-top: 24px;
    gap: 4px;
  }

  .tab-btn {
    display: flex;
    align-items: center;
    gap: 7px;
    padding: 10px 22px;
    border-radius: 999px;
    border: none;
    cursor: pointer;
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    font-weight: 600;
    transition: all 0.22s ease;
    background: transparent;
    color: var(--muted);
  }

  .tab-btn.active-current {
    background: var(--accent);
    color: #0b0d11;
    box-shadow: 0 0 20px rgba(179, 240, 0, 0.35);
  }

  .tab-btn.active-history {
    background: var(--surface2);
    color: var(--text);
    border: 1px solid var(--border);
  }

  .tab-count {
    font-size: 11px;
    font-weight: 700;
    padding: 2px 7px;
    border-radius: 999px;
    background: rgba(255,255,255,0.12);
  }

  .tab-btn.active-current .tab-count {
    background: rgba(0,0,0,0.2);
  }

  /* ── Grid ── */
  .bookings-grid {
    max-width: 960px;
    margin: 28px auto 0;
    padding: 0 16px;
    display: grid;
    grid-template-columns: 1fr;
    gap: 16px;
  }

  @media (min-width: 640px) {
    .bookings-grid { grid-template-columns: repeat(2, 1fr); }
  }
  @media (min-width: 900px) {
    .bookings-grid { grid-template-columns: repeat(3, 1fr); }
  }

  /* ── Card ── */
  .booking-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 20px;
    padding: 20px;
    position: relative;
    overflow: hidden;
    transition: transform 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease;
  }

  .booking-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 50px rgba(0,0,0,0.5);
    border-color: #333844;
  }

  .booking-card.active-card {
    border-color: rgba(179, 240, 0, 0.18);
  }

  .booking-card.active-card:hover {
    border-color: rgba(179, 240, 0, 0.4);
    box-shadow: 0 20px 50px rgba(179, 240, 0, 0.08);
  }

  /* green glow line at top */
  .booking-card.active-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, var(--accent), transparent);
    opacity: 0.7;
  }

  /* ── Card header ── */
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 16px;
  }

  .card-id-label {
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: var(--muted);
  }

  .card-id {
    font-family: 'Syne', sans-serif;
    font-size: 20px;
    font-weight: 800;
    color: var(--text);
    margin-top: 2px;
  }

  /* ── Info chips ── */
  .info-row {
    display: flex;
    gap: 10px;
    margin-bottom: 16px;
  }

  .info-chip {
    flex: 1;
    background: var(--surface2);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 10px 12px;
  }

  .chip-label {
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    color: var(--muted);
    margin-bottom: 5px;
  }

  .chip-value {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 13px;
    font-weight: 600;
    color: var(--text);
  }

  /* ── Proof image ── */
  .proof-wrap {
    border-radius: 14px;
    overflow: hidden;
    height: 130px;
    margin-bottom: 14px;
    border: 1px solid var(--border);
  }

  .proof-wrap img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.6s ease;
  }

  .booking-card:hover .proof-wrap img {
    transform: scale(1.06);
  }

  /* ── Action button ── */
  .card-action-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    width: 100%;
    padding: 13px;
    border-radius: 12px;
    border: none;
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.2s ease;
    margin-top: 14px;
    border-top: 1px solid var(--border);
    padding-top: 14px;
  }

  .btn-track {
    background: var(--accent);
    color: #0b0d11;
    border-top: none;
    border-radius: 12px;
    padding: 13px;
    box-shadow: 0 0 18px rgba(179, 240, 0, 0.25);
  }

  .btn-track:hover {
    background: #c8ff00;
    transform: scale(1.02);
    box-shadow: 0 0 28px rgba(179, 240, 0, 0.4);
  }

  .btn-waiting {
    background: transparent;
    color: var(--muted);
    border: 1px dashed var(--border);
    border-radius: 12px;
    padding: 13px;
    border-top: 1px dashed var(--border);
    cursor: default;
  }

  .btn-ended {
    background: transparent;
    color: var(--muted);
    border-top: 1px solid var(--border);
    cursor: default;
    border-radius: 0;
    padding-top: 14px;
  }

  /* ── Status badge ── */
  .status-badge {
    display: flex;
    align-items: center;
    gap: 5px;
    padding: 5px 11px;
    border-radius: 999px;
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
    border: 1px solid transparent;
    white-space: nowrap;
  }

  .badge-parked    { background: rgba(52,211,153,0.12); color: var(--emerald); border-color: rgba(52,211,153,0.25); }
  .badge-valet     { background: rgba(167,139,250,0.12); color: var(--purple); border-color: rgba(167,139,250,0.25); }
  .badge-pending   { background: rgba(251,191,36,0.12); color: var(--amber); border-color: rgba(251,191,36,0.25); }
  .badge-completed { background: rgba(107,114,128,0.12); color: var(--muted); border-color: rgba(107,114,128,0.2); }
  .badge-cancelled { background: rgba(255,77,109,0.1); color: var(--danger); border-color: rgba(255,77,109,0.2); }
  .badge-default   { background: rgba(107,114,128,0.1); color: var(--muted); border-color: var(--border); }

  /* ── Empty state ── */
  .empty-state {
    max-width: 960px;
    margin: 32px auto 0;
    padding: 0 16px;
  }

  .empty-inner {
    background: var(--surface);
    border: 1px dashed var(--border);
    border-radius: 24px;
    padding: 60px 20px;
    text-align: center;
  }

  .empty-icon {
    font-size: 52px;
    opacity: 0.15;
    margin-bottom: 16px;
  }

  .empty-title {
    font-family: 'Syne', sans-serif;
    font-size: 20px;
    font-weight: 700;
    color: var(--text);
    margin-bottom: 8px;
  }

  .empty-sub {
    font-size: 14px;
    color: var(--muted);
  }

  /* ── Pulse dot for active ── */
  .pulse-dot {
    width: 8px; height: 8px;
    border-radius: 50%;
    background: var(--accent);
    display: inline-block;
    position: relative;
    margin-right: 4px;
  }
  .pulse-dot::after {
    content: '';
    position: absolute;
    inset: -3px;
    border-radius: 50%;
    background: var(--accent);
    opacity: 0.3;
    animation: ripple 1.5s infinite;
  }
  @keyframes ripple {
    0%   { transform: scale(1); opacity: 0.3; }
    100% { transform: scale(2.4); opacity: 0; }
  }

  /* ── Fade in ── */
  @keyframes fadeUp {
    from { opacity:0; transform: translateY(18px); }
    to   { opacity:1; transform: translateY(0); }
  }
  .fade-up {
    animation: fadeUp 0.4s ease both;
  }
`;

function injectStyles(id, css) {
  if (typeof document !== "undefined" && !document.getElementById(id)) {
    const el = document.createElement("style");
    el.id = id;
    el.textContent = css;
    document.head.appendChild(el);
  }
}

function MyBookings() {
  injectStyles("parkease-bookings-styles", globalStyles);

  const [bookings, setBookings] = useState([]);
  const [activeTab, setActiveTab] = useState("current");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookings = async () => {
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");
      if (!userId || !token) { navigate("/login"); return; }
      try {
        const res = await axios.get(`http://localhost:8080/api/bookings/user/${userId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setBookings(res.data);
      } catch (err) {
        console.error("Error fetching bookings:", err);
        if (err.response?.status === 401) { localStorage.clear(); navigate("/login"); }
      }
    };
    fetchBookings();
  }, [navigate]);

  const openLocation = (lat, lng) => {
    if (!lat || !lng) { alert("Location not available yet."); return; }
    window.open(`https://www.google.com/maps?q=${lat},${lng}`, "_blank");
  };

  const currentBookings = bookings.filter(b =>
    ["PENDING","CONFIRMED","VALET_REQUESTED","VALET_PICKED_UP","PARKED"].includes(b.status)
  );
  const historyBookings = bookings.filter(b =>
    ["COMPLETED","LEFT_PARKING","CANCELLED","RELEASED_BY_ADMIN"].includes(b.status)
  );
  const displayedBookings = activeTab === "current" ? currentBookings : historyBookings;

  return (
    <>
      <UserNavbar />
      <div className="parkease-bookings">

        {/* Header */}
        <div className="bookings-header">
          <h2 className="bookings-title">
            My <span>Bookings</span>
          </h2>
          <p className="bookings-subtitle">Manage your active parking sessions &amp; history.</p>

          {/* Tab switcher */}
          <div className="tab-pill">
            <button
              className={`tab-btn ${activeTab === "current" ? "active-current" : ""}`}
              onClick={() => setActiveTab("current")}
            >
              {activeTab === "current" && <span className="pulse-dot" />}
              <Zap size={14} />
              Current
              <span className="tab-count">{currentBookings.length}</span>
            </button>
            <button
              className={`tab-btn ${activeTab === "history" ? "active-history" : ""}`}
              onClick={() => setActiveTab("history")}
            >
              <History size={14} />
              History
              <span className="tab-count">{historyBookings.length}</span>
            </button>
          </div>
        </div>

        {/* Content */}
        {displayedBookings.length === 0 ? (
          <div className="empty-state">
            <div className="empty-inner fade-up">
              <div className="empty-icon">{activeTab === "current" ? "🅿️" : "📜"}</div>
              <h3 className="empty-title">No {activeTab} bookings</h3>
              <p className="empty-sub">
                {activeTab === "current"
                  ? "You don't have any active parking sessions."
                  : "Your past parking history will appear here."}
              </p>
            </div>
          </div>
        ) : (
          <div className="bookings-grid">
            {displayedBookings.map((b, i) => (
              <div
                key={b.id}
                className="fade-up"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <BookingCard
                  booking={b}
                  openLocation={openLocation}
                  isHistory={activeTab === "history"}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

/* ─── Booking Card ─── */
function BookingCard({ booking, openLocation, isHistory }) {
  return (
    <div className={`booking-card ${!isHistory ? "active-card" : ""}`}>
      {/* Header */}
      <div className="card-header">
        <div>
          <p className="card-id-label">{isHistory ? "Past" : "Active"} ID</p>
          <p className="card-id">#{booking.id}</p>
        </div>
        <StatusBadge status={booking.status} />
      </div>

      {/* Info chips */}
      <div className="info-row">
        <div className="info-chip">
          <p className="chip-label">Vehicle</p>
          <div className="chip-value">
            <Car size={14} color="#b3f000" />
            <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {booking.vehicleNumber || "N/A"}
            </span>
          </div>
        </div>
        <div className="info-chip">
          <p className="chip-label">Time</p>
          <div className="chip-value">
            <Clock size={14} color="#b3f000" />
            <span>{new Date(booking.startTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
          </div>
        </div>
      </div>

      {/* Proof image */}
      {!isHistory && booking.parkedProofImage && (
        <div className="proof-wrap">
          <img src={booking.parkedProofImage} alt="Valet proof" />
        </div>
      )}

      {/* Action */}
      {!isHistory && booking.parkedLat && booking.parkedLng ? (
        <button
          className="card-action-btn btn-track"
          onClick={() => openLocation(booking.parkedLat, booking.parkedLng)}
        >
          <MapPin size={16} /> Track Vehicle
        </button>
      ) : isHistory ? (
        <button className="card-action-btn btn-ended" disabled>
          <CheckCircle2 size={14} style={{ marginRight: 4 }} /> Session Ended
        </button>
      ) : (
        <button className="card-action-btn btn-waiting" disabled>
          <Timer size={14} style={{ marginRight: 4 }} /> Waiting for Valet…
        </button>
      )}
    </div>
  );
}

/* ─── Status Badge ─── */
function StatusBadge({ status }) {
  const s = status ? status.toUpperCase() : "";
  let cls = "badge-default";
  let icon = null;

  if (s.includes("PARKED"))                        { cls = "badge-parked";    icon = <CheckCircle2 size={10} />; }
  else if (s.includes("VALET") || s.includes("REQUEST")) { cls = "badge-valet";    icon = <Zap size={10} />; }
  else if (s.includes("PENDING"))                  { cls = "badge-pending";   icon = <Timer size={10} />; }
  else if (s.includes("CANCEL"))                   { cls = "badge-cancelled"; icon = <AlertCircle size={10} />; }
  else if (s.includes("COMPLETED") || s.includes("LEFT")) { cls = "badge-completed"; }

  return (
    <span className={`status-badge ${cls}`}>
      {icon}
      {status ? status.replace(/_/g, " ") : "UNKNOWN"}
    </span>
  );
}

export default MyBookings;