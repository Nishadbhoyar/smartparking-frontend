// import { useEffect, useState, useCallback } from "react";
// import {
//   AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
// } from "recharts";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import AdminNavbar from "../../components/navbar/AdminNavbar";
// import {
//   BarChart3, Building2, Calendar, Car, DollarSign, Download,
//   Filter, RefreshCw, TrendingUp, Users, X, Plus, Edit2,
//   CheckCircle, PauseCircle
// } from "lucide-react";

// /* ─────────────────────────────────────────────────────────────
//    STYLES
// ───────────────────────────────────────────────────────────── */
// const S = {
//   shell: { minHeight: "100vh", background: "#0A0A0A", color: "#fff" },
//   page:  { maxWidth: 1400, margin: "0 auto", padding: "32px 24px 80px" },

//   /* Header */
//   header: {
//     display: "flex", flexWrap: "wrap", alignItems: "flex-start",
//     justifyContent: "space-between", gap: 24, marginBottom: 32,
//   },
//   headerLabel: {
//     display: "inline-flex", alignItems: "center", gap: 8,
//     background: "#C8FF0012", border: "1px solid #C8FF0030",
//     borderRadius: 999, padding: "5px 14px", fontSize: 12,
//     color: "#C8FF00", fontWeight: 700, letterSpacing: "0.1em",
//     textTransform: "uppercase", marginBottom: 14,
//   },
//   headerDot: {
//     width: 7, height: 7, borderRadius: "50%",
//     background: "#C8FF00", display: "inline-block",
//     animation: "pulse 2s ease-in-out infinite",
//   },
//   headerTitleRow: { display: "flex", alignItems: "center", gap: 12, marginBottom: 6 },
//   headerTitle: {
//     fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 800,
//     letterSpacing: "-1px", color: "#fff", margin: 0,
//   },
//   headerAccent: { color: "#C8FF00" },
//   headerSub: { fontSize: 14, color: "#888", marginTop: 4 },
//   headerActions: { display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" },

//   /* Buttons */
//   limeBtn: {
//     display: "inline-flex", alignItems: "center", gap: 7,
//     background: "#C8FF00", color: "#000", border: "none",
//     borderRadius: 11, padding: "11px 20px", fontWeight: 700,
//     fontSize: 14, cursor: "pointer",
//   },
//   ghostBtn: {
//     display: "inline-flex", alignItems: "center", gap: 7,
//     background: "transparent", color: "#ccc",
//     border: "1px solid #2e2e2e", borderRadius: 11,
//     padding: "11px 20px", fontWeight: 600, fontSize: 14, cursor: "pointer",
//   },

//   /* Time range */
//   timeRow: {
//     display: "flex", gap: 6, marginBottom: 32,
//     background: "#141414", border: "1px solid #222",
//     borderRadius: 12, padding: 5, width: "fit-content",
//   },
//   timeTab: {
//     background: "transparent", border: "none", color: "#888",
//     borderRadius: 9, padding: "8px 18px", fontSize: 13,
//     fontWeight: 600, cursor: "pointer",
//   },
//   timeTabActive: {
//     background: "#1e1e1e", border: "none", color: "#fff",
//     borderRadius: 9, padding: "8px 18px", fontSize: 13,
//     fontWeight: 700, cursor: "pointer", boxShadow: "0 1px 6px #00000060",
//   },

//   /* Stats grid */
//   statsGrid: {
//     display: "grid",
//     gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
//     gap: 16, marginBottom: 28,
//   },
//   statCard: {
//     background: "#141414", border: "1px solid #242424",
//     borderRadius: 18, padding: "22px 24px",
//     transition: "border-color 0.2s, transform 0.2s",
//   },
//   statCardTop: { display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 16 },
//   statIconWrap: {
//     width: 44, height: 44, borderRadius: 12,
//     display: "flex", alignItems: "center", justifyContent: "center",
//   },
//   trendBadge: {
//     display: "flex", alignItems: "center", gap: 4,
//     background: "#4ade8015", border: "1px solid #4ade8025",
//     borderRadius: 8, padding: "4px 9px",
//   },
//   trendText: { fontSize: 12, fontWeight: 700, color: "#4ade80" },
//   statLabel: { fontSize: 12, color: "#888", fontWeight: 600, marginBottom: 4 },
//   statValue: { fontSize: 28, fontWeight: 800, color: "#ffffff", lineHeight: 1, marginBottom: 4 },
//   statSub: { fontSize: 12, color: "#666" },

//   /* Chart section */
//   chartRow: {
//     display: "grid", gridTemplateColumns: "1fr 340px",
//     gap: 20, marginBottom: 28,
//   },
//   chartCard: {
//     background: "#141414", border: "1px solid #242424",
//     borderRadius: 18, padding: "24px",
//   },
//   activityCard: {
//     background: "#141414", border: "1px solid #242424",
//     borderRadius: 18, padding: "24px",
//   },
//   cardHeader: {
//     display: "flex", alignItems: "flex-start",
//     justifyContent: "space-between", marginBottom: 20,
//   },
//   cardTitle: { fontSize: 16, fontWeight: 700, color: "#fff", marginBottom: 3 },
//   cardSub: { fontSize: 13, color: "#888" },
//   chartWrap: { height: 260, width: "100%" },
//   chartEmpty: {
//     height: "100%", display: "flex",
//     alignItems: "center", justifyContent: "center",
//     color: "#555", fontSize: 14,
//   },
//   viewAllBtn: {
//     background: "transparent", border: "none",
//     color: "#C8FF00", fontSize: 13, fontWeight: 600, cursor: "pointer",
//   },
//   activityList: { display: "flex", flexDirection: "column", gap: 8 },
//   activityRow: {
//     display: "flex", alignItems: "center", gap: 12,
//     padding: "10px 12px", borderRadius: 10,
//     transition: "background 0.15s",
//   },
//   activityIcon: {
//     width: 36, height: 36, borderRadius: 9,
//     background: "#C8FF0012", border: "1px solid #C8FF0020",
//     display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
//   },
//   activityInfo: { flex: 1, minWidth: 0 },
//   activityVehicle: { fontSize: 13, fontWeight: 700, color: "#fff", marginBottom: 2 },
//   activityName: { fontSize: 12, color: "#888" },
//   emptyText: { color: "#555", fontSize: 14, textAlign: "center", padding: "20px 0" },

//   /* Tabs */
//   tabsRow: {
//     display: "flex", alignItems: "center",
//     justifyContent: "space-between", flexWrap: "wrap",
//     gap: 12, marginBottom: 16,
//   },
//   tabsGroup: {
//     display: "flex", gap: 4,
//     background: "#141414", border: "1px solid #242424",
//     borderRadius: 12, padding: 4,
//   },
//   tab: {
//     display: "inline-flex", alignItems: "center", gap: 7,
//     background: "transparent", border: "none",
//     color: "#888", borderRadius: 9,
//     padding: "9px 20px", fontSize: 13, fontWeight: 600, cursor: "pointer",
//   },
//   tabActive: {
//     display: "inline-flex", alignItems: "center", gap: 7,
//     background: "#1e1e1e", border: "none",
//     color: "#fff", borderRadius: 9,
//     padding: "9px 20px", fontSize: 13, fontWeight: 700, cursor: "pointer",
//   },
//   tabBadge: {
//     background: "#C8FF00", color: "#000",
//     fontSize: 11, fontWeight: 800, borderRadius: 99,
//     padding: "1px 7px",
//   },
//   tabsRight: { display: "flex", gap: 10 },
//   filterBadge: {
//     background: "#C8FF00", color: "#000",
//     fontSize: 11, fontWeight: 800, borderRadius: 99, padding: "1px 7px",
//   },

//   /* Table */
//   tableCard: {
//     background: "#141414", border: "1px solid #242424",
//     borderRadius: 18, overflow: "hidden",
//   },
//   tableWrap: { width: "100%", overflowX: "auto" },
//   tableHead: {
//     display: "grid", gridTemplateColumns: "repeat(6, 1fr)",
//     gap: 16, padding: "14px 24px",
//     background: "#0e0e0e", borderBottom: "1px solid #222",
//     minWidth: 700,
//   },
//   tableHeadCell: {
//     fontSize: 11, fontWeight: 700, color: "#555",
//     textTransform: "uppercase", letterSpacing: "0.08em",
//   },
//   tableRow: {
//     display: "grid", gridTemplateColumns: "repeat(6, 1fr)",
//     gap: 16, padding: "16px 24px",
//     borderBottom: "1px solid #1a1a1a",
//     transition: "background 0.15s",
//     minWidth: 700,
//     alignItems: "center",
//   },
//   tableCell: { display: "flex", alignItems: "center", gap: 10 },
//   cellPrimary: { fontSize: 14, fontWeight: 600, color: "#fff", marginBottom: 2 },
//   cellSecondary: { fontSize: 12, color: "#666" },

//   lotIconWrap: {
//     width: 36, height: 36, borderRadius: 9,
//     background: "#C8FF0012", border: "1px solid #C8FF0020",
//     display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
//   },
//   driverIcon: {
//     width: 36, height: 36, borderRadius: 9,
//     background: "#1e1e1e", border: "1px solid #2e2e2e",
//     display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
//   },

//   statusActive: {
//     display: "inline-flex", alignItems: "center", gap: 5,
//     background: "#4ade8015", border: "1px solid #4ade8030",
//     color: "#4ade80", borderRadius: 99, padding: "5px 12px",
//     fontSize: 12, fontWeight: 700, cursor: "pointer",
//   },
//   statusPaused: {
//     display: "inline-flex", alignItems: "center", gap: 5,
//     background: "#fbbf2415", border: "1px solid #fbbf2430",
//     color: "#fbbf24", borderRadius: 99, padding: "5px 12px",
//     fontSize: 12, fontWeight: 700, cursor: "pointer",
//   },

//   actionBtnBlue: {
//     width: 32, height: 32, borderRadius: 8,
//     background: "#00D4FF12", border: "1px solid #00D4FF25",
//     color: "#00D4FF", display: "flex", alignItems: "center",
//     justifyContent: "center", cursor: "pointer",
//   },
//   actionBtnRed: {
//     width: 32, height: 32, borderRadius: 8,
//     background: "#f8717112", border: "1px solid #f8717125",
//     color: "#f87171", display: "flex", alignItems: "center",
//     justifyContent: "center", cursor: "pointer",
//   },
//   releaseBtn: {
//     background: "#00D4FF18", border: "1px solid #00D4FF30",
//     color: "#00D4FF", borderRadius: 9,
//     padding: "7px 16px", fontSize: 13, fontWeight: 700, cursor: "pointer",
//   },

//   /* Badge */
//   badge: {
//     display: "inline-flex", alignItems: "center",
//     padding: "4px 10px", borderRadius: 99,
//     fontSize: 11, fontWeight: 700, whiteSpace: "nowrap",
//   },

//   /* Empty state */
//   emptyWrap: { padding: "60px 24px", textAlign: "center" },
//   emptyIconWrap: {
//     width: 64, height: 64, borderRadius: 16,
//     background: "#C8FF0010", border: "1px solid #C8FF0020",
//     display: "flex", alignItems: "center", justifyContent: "center",
//     margin: "0 auto 16px",
//   },
//   emptyTitle: { fontSize: 17, fontWeight: 700, color: "#fff", marginBottom: 8 },
//   emptyDesc: { fontSize: 14, color: "#888", marginBottom: 20 },
// };

// /* ─────────────────────────────────────────────────────────────
//    GLOBAL CSS
// ───────────────────────────────────────────────────────────── */
// const globalCSS = `
//   @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&display=swap');
//   body { font-family: 'Syne', sans-serif; margin: 0; }

//   @keyframes pulse {
//     0%, 100% { opacity: 1; transform: scale(1); }
//     50% { opacity: 0.5; transform: scale(0.85); }
//   }
//   .admin-spin { animation: spin 1s linear infinite; }
//   @keyframes spin { to { transform: rotate(360deg); } }

//   .admin-btn:hover { opacity: 0.85; transform: translateY(-1px); }
//   .stat-card:hover { border-color: #2e2e2e !important; transform: translateY(-2px); }
//   .table-row:hover { background: #1a1a1a !important; }
//   .activity-row:hover { background: #1a1a1a !important; }
// `;

// /* ─────────────────────────────────────────────────────────────
//    MAIN COMPONENT
// ───────────────────────────────────────────────────────────── */
// function AdminDashboard() {
//   const [allBookings, setAllBookings] = useState([]);
//   const [lots, setLots] = useState([]);
//   const [view, setView] = useState("active");
//   const [adminName, setAdminName] = useState("Admin");
//   const [totalRevenue, setTotalRevenue] = useState(0.0);
//   const [loading, setLoading] = useState(true);
//   const [timeRange, setTimeRange] = useState("week");
//   const [selectedFilters, setSelectedFilters] = useState([]);
//   const [chartData, setChartData] = useState([]);
//   const [recentActivity, setRecentActivity] = useState([]);
//   const [stats, setStats] = useState({ occupancy: 0, growth: 0, avgTime: "0h" });
//   const navigate = useNavigate();

//   const activeData = allBookings.filter(b =>
//     ["PARKED", "CONFIRMED", "VALET_PICKED_UP", "VALET_REQUESTED"].includes(b.status)
//   );
//   const historyData = allBookings.filter(b =>
//     ["LEFT_PARKING", "RETURNED", "COMPLETED", "RELEASED_BY_ADMIN"].includes(b.status)
//   );
//   const displayedBookings = view === "active" ? activeData : historyData;

//   const calculateStats = useCallback(() => {
//     const totalSlots = lots.reduce((sum, lot) => {
//       // ✅ compute from slots array, not lot.totalSlots (which doesn't exist)
//       const cap = lot.slots?.reduce((s, slot) => s + (slot.capacity || 0), 0) ?? 0;
//       return sum + cap;
//     }, 0);
//     const occupancyRate = totalSlots > 0 ? (activeData.length / totalSlots) * 100 : 0;
//     setStats(prev => ({
//       ...prev,
//       occupancy: Math.round(occupancyRate),
//       // avgTime is set from backend — don't overwrite it here
//     }));
//   }, [lots, allBookings]);

//   // ── Logout ──
//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     localStorage.removeItem("userId");
//     localStorage.removeItem("role");
//     navigate("/login");
//   };

//   // ── Toggle lot active/paused with optimistic update + revert on failure ──
//   const handleToggleStatus = async (lotId, currentStatus) => {
//     const statusToCheck = currentStatus || "ACTIVE";
//     const newStatus = statusToCheck === "PAUSED" ? "ACTIVE" : "PAUSED";
//     try {
//       // Optimistic update
//       setLots(prev => prev.map(lot => lot.id === lotId ? { ...lot, status: newStatus } : lot));
//       const token = localStorage.getItem("token");
//       await axios.patch(
//         `http://localhost:8080/api/parking-lots/${lotId}/status`,
//         { status: newStatus },
//         { headers: { Authorization: `Bearer ${token}` }, withCredentials: true }
//       );
//       // ✅ Refresh from server to ensure table stays in sync
//       fetchData();
//     } catch {
//       alert("Failed to update status. Reverting change.");
//       setLots(prev => prev.map(lot => lot.id === lotId ? { ...lot, status: currentStatus } : lot));
//     }
//   };

//   // ── Fetch all dashboard data (bookings, lots, earnings, chart stats) ──
//   const fetchData = async () => {
//     try {
//       const userStr = localStorage.getItem("user");
//       const token   = localStorage.getItem("token");
//       let adminId   = null;
//       if (userStr) { const user = JSON.parse(userStr); adminId = user.id; }
//       if (!adminId || !token) { navigate("/login"); return; }

//       const config = {
//         params: { adminId },
//         headers: { Authorization: `Bearer ${token}` },
//         withCredentials: true
//       };

//       // allSettled ensures a single failing endpoint won't break the rest
//       const results = await Promise.allSettled([
//         axios.get(`http://localhost:8080/api/bookings/admin`, config),
//         axios.get(`http://localhost:8080/api/parking-lots`, {
//           params: { ownerId: adminId },
//           headers: { Authorization: `Bearer ${token}` },
//           withCredentials: true
//         }),
//         axios.get(`http://localhost:8080/api/bookings/earnings`, config),
//         axios.get(`http://localhost:8080/api/admin/stats/dashboard`, config)
//       ]);

//       if (results[0].status === "fulfilled") setAllBookings(results[0].value.data);
//       if (results[1].status === "fulfilled") setLots(results[1].value.data);
//       if (results[2].status === "fulfilled") setTotalRevenue(results[2].value.data);
//       if (results[3].status === "fulfilled") {
//         const d = results[3].value.data;
//         // ✅ Populate all stats from backend dashboard endpoint
//         setChartData(d.chartData || []);
//         if (d.totalRevenue) setTotalRevenue(d.totalRevenue);
//         if (d.recentActivity) setRecentActivity(d.recentActivity);
//         setStats(prev => ({
//           ...prev,
//           occupancy: d.occupancyPercent ?? prev.occupancy,
//           avgTime: d.avgParkingHours != null ? `${d.avgParkingHours}h` : prev.avgTime,
//           growth: 0, // backend doesn't calculate growth yet
//         }));
//       }
//       calculateStats();
//     } catch (err) {
//       console.error("Error fetching data:", err);
//       if (err.response?.status === 401) {
//         localStorage.removeItem("token");
//         localStorage.removeItem("user");
//         navigate("/login");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     const role = localStorage.getItem("role");
//     if (role !== "OWNER" && role !== "ADMIN") { navigate("/login"); return; }
//     const userStr = localStorage.getItem("user");
//     if (userStr) {
//       const user = JSON.parse(userStr);
//       if (user.name) setAdminName(user.name.charAt(0).toUpperCase() + user.name.slice(1));
//     }
//     fetchData();
//     // Auto-refresh every 30 seconds
//     const interval = setInterval(fetchData, 30000);
//     return () => clearInterval(interval);
//   }, [navigate]);

//   // ── Release a parked vehicle ──
//   const handleRelease = async (id) => {
//     if (window.confirm("Mark this vehicle as 'Left Parking'?")) {
//       try {
//         const token = localStorage.getItem("token");
//         await axios.post(
//           `http://localhost:8080/api/bookings/${id}/release`,
//           {},
//           { headers: { Authorization: `Bearer ${token}` }, withCredentials: true }
//         );
//         setAllBookings(prev => prev.map(b => b.id === id ? { ...b, status: "LEFT_PARKING" } : b));
//         alert("Car status updated successfully!");
//       } catch (err) {
//         console.error(err);
//         alert("Failed to update status.");
//       }
//     }
//   };

//   // ── Delete a parking lot ──
//   const handleDeleteLot = async (lotId) => {
//     if (window.confirm("Are you sure you want to delete this parking lot?")) {
//       try {
//         const token = localStorage.getItem("token");
//         await axios.delete(`http://localhost:8080/api/parking-lots/${lotId}`, {
//           headers: { Authorization: `Bearer ${token}` },
//           withCredentials: true
//         });
//         setLots(prev => prev.filter(lot => lot.id !== lotId));
//         alert("Parking lot deleted successfully!");
//         // ✅ Refresh from server to sync all stats
//         fetchData();
//       } catch (err) {
//         console.error("Delete failed:", err);
//         alert("Failed to delete parking lot.");
//       }
//     }
//   };

//   // ── Export all bookings to CSV ──
//   const handleExportData = () => {
//     if (allBookings.length === 0) return alert("No data to export!");
//     const headers = ["Booking ID", "Vehicle Number", "Customer Name", "Location", "Status", "Amount", "Start Time"];
//     const csvRows = [headers.join(",")];
//     allBookings.forEach(b => {
//       csvRows.push([
//         b.id,
//         b.vehicleNumber || "N/A",
//         b.driverName    || "Guest",
//         b.parkingLot?.name || "Unknown",
//         b.status,
//         b.totalAmount   || 0,
//         new Date(b.startTime).toLocaleString()
//       ].map(c => `"${c}"`).join(","));
//     });
//     const blob = new Blob([csvRows.join("\n")], { type: "text/csv" });
//     const url  = window.URL.createObjectURL(blob);
//     const link = document.createElement("a");
//     link.href     = url;
//     link.download = `Parking_Report_${new Date().toISOString().split("T")[0]}.csv`;
//     link.click();
//   };

//   // ── Calculate real duration (live for active sessions, actual for history) ──
//   const calculateDuration = (startTime, endTime) => {
//     if (!startTime) return "N/A";
//     const start   = new Date(startTime);
//     const end     = endTime ? new Date(endTime) : new Date(); // current time if still parked
//     const diffHrs = ((end - start) / (1000 * 60 * 60)).toFixed(1);
//     return `${Math.max(0, diffHrs)}h`;
//   };

//   const timeRanges = [
//     { id: "day",   label: "Today" },
//     { id: "week",  label: "This Week" },
//     { id: "month", label: "This Month" },
//     { id: "year",  label: "This Year" },
//   ];

//   /* ── RENDER ── */
//   return (
//     <>
//       <style>{globalCSS}</style>
//       <div style={S.shell}>
//         <AdminNavbar />

//         <div style={S.page}>

//           {/* ── HEADER ── */}
//           <div style={S.header}>
//             <div>
//               <span style={S.headerLabel}>
//                 <span style={S.headerDot} />
//                 Admin Console
//               </span>
//               <div style={S.headerTitleRow}>
//                 <h1 style={S.headerTitle}>
//                   Welcome, <span style={S.headerAccent}>{adminName}</span>
//                 </h1>
//                 {loading && <RefreshCw size={18} color="#C8FF00" className="admin-spin" />}
//               </div>
//               <p style={S.headerSub}>Manage your parking facilities and monitor operations</p>
//             </div>

//             <div style={S.headerActions}>
//               <button
//                 onClick={() => navigate("/add-parking-lot")}
//                 style={S.limeBtn}
//                 className="admin-btn"
//               >
//                 <Plus size={16} /> Add Location
//               </button>
//               <button onClick={handleExportData} style={S.ghostBtn} className="admin-btn">
//                 <Download size={16} /> Export CSV
//               </button>
//             </div>
//           </div>

//           {/* ── TIME RANGE ── */}
//           <div style={S.timeRow}>
//             {timeRanges.map(r => (
//               <button
//                 key={r.id}
//                 onClick={() => setTimeRange(r.id)}
//                 style={timeRange === r.id ? S.timeTabActive : S.timeTab}
//                 className="admin-btn"
//               >
//                 {r.label}
//               </button>
//             ))}
//           </div>

//           {/* ── STAT CARDS ── */}
//           <div style={S.statsGrid}>
//             <StatCard
//               title="Total Properties" value={lots.length}
//               icon={<Building2 size={20} />} accent="#C8FF00" trend={stats.growth}
//             />
//             <StatCard
//               title="Active Sessions" value={activeData.length}
//               icon={<Users size={20} />} accent="#00D4FF"
//               sub={`${stats.occupancy}% occupancy`}
//             />
//             <StatCard
//               title="Total Revenue" value={`₹${totalRevenue.toFixed(2)}`}
//               icon={<DollarSign size={20} />} accent="#FF6B35" trend={15.2}
//             />
//             <StatCard
//               title="Avg. Parking Time" value={stats.avgTime}
//               icon={<Calendar size={20} />} accent="#a78bfa"
//             />
//           </div>

//           {/* ── CHART + RECENT ACTIVITY ── */}
//           <div style={S.chartRow}>
//             {/* Revenue Chart */}
//             <div style={S.chartCard}>
//               <div style={S.cardHeader}>
//                 <div>
//                   <h3 style={S.cardTitle}>Revenue Overview</h3>
//                   <p style={S.cardSub}>Revenue trends over selected period</p>
//                 </div>
//                 <BarChart3 size={18} color="#555" />
//               </div>
//               <div style={S.chartWrap}>
//                 {chartData.length > 0 ? (
//                   <ResponsiveContainer width="100%" height="100%">
//                     <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
//                       <defs>
//                         <linearGradient id="adminRevGrad" x1="0" y1="0" x2="0" y2="1">
//                           <stop offset="5%"  stopColor="#C8FF00" stopOpacity={0.25} />
//                           <stop offset="95%" stopColor="#C8FF00" stopOpacity={0} />
//                         </linearGradient>
//                       </defs>
//                       <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#222" />
//                       <XAxis dataKey="name" axisLine={false} tickLine={false}
//                         tick={{ fontSize: 11, fill: "#666" }} dy={10} />
//                       <YAxis axisLine={false} tickLine={false}
//                         tick={{ fontSize: 11, fill: "#666" }}
//                         tickFormatter={v => `₹${v}`} />
//                       <Tooltip
//                         contentStyle={{
//                           background: "#1a1a1a", border: "1px solid #2e2e2e",
//                           borderRadius: 10, color: "#fff", fontSize: 13
//                         }}
//                         formatter={v => [`₹${v}`, "Revenue"]}
//                       />
//                       <Area type="monotone" dataKey="revenue" stroke="#C8FF00"
//                         strokeWidth={2.5} fillOpacity={1} fill="url(#adminRevGrad)" />
//                     </AreaChart>
//                   </ResponsiveContainer>
//                 ) : (
//                   <div style={S.chartEmpty}>
//                     {loading ? "Loading chart data…" : "No chart data available"}
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Recent Activity */}
//             <div style={S.activityCard}>
//               <div style={S.cardHeader}>
//                 <div>
//                   <h3 style={S.cardTitle}>Recent Activity</h3>
//                   <p style={S.cardSub}>Latest operations and updates</p>
//                 </div>
//                 <button style={S.viewAllBtn} onClick={() => setView("active")}>View all</button>
//               </div>
//               <div style={S.activityList}>
//                 {recentActivity.length === 0 && activeData.length === 0 ? (
//                   <p style={S.emptyText}>No active sessions</p>
//                 ) : (
//                   (recentActivity.length > 0 ? recentActivity : activeData.slice(0, 5)).map((item, idx) => (
//                     <div key={item.bookingId || item.id || idx} style={S.activityRow} className="activity-row">
//                       <div style={S.activityIcon}>
//                         <Car size={16} color="#C8FF00" />
//                       </div>
//                       <div style={S.activityInfo}>
//                         <p style={S.activityVehicle}>{item.vehicleNumber || item.vehicleNumber}</p>
//                         <p style={S.activityName}>{item.lotName || item.driverName || "Guest"}</p>
//                       </div>
//                       <StatusBadge status={item.status} />
//                     </div>
//                   ))
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* ── TABS ── */}
//           <div style={S.tabsRow}>
//             <div style={S.tabsGroup}>
//               {["active", "history", "lots"].map(tab => (
//                 <button
//                   key={tab}
//                   onClick={() => setView(tab)}
//                   style={view === tab ? S.tabActive : S.tab}
//                   className="admin-btn"
//                 >
//                   {tab === "active"  && "Live Sessions"}
//                   {tab === "history" && "History"}
//                   {tab === "lots"    && "My Locations"}
//                   {tab === "active" && activeData.length > 0 && (
//                     <span style={S.tabBadge}>{activeData.length}</span>
//                   )}
//                 </button>
//               ))}
//             </div>
//             <div style={S.tabsRight}>
//               <button style={S.ghostBtn} className="admin-btn">
//                 <Filter size={14} />
//                 Filter
//                 {selectedFilters.length > 0 && (
//                   <span style={S.filterBadge}>{selectedFilters.length}</span>
//                 )}
//               </button>
//             </div>
//           </div>

//           {/* ── DATA TABLE ── */}
//           <div style={S.tableCard}>
//             {view === "lots" ? (
//               <LotsTable
//                 lots={lots}
//                 handleToggleStatus={handleToggleStatus}
//                 handleDeleteLot={handleDeleteLot}
//                 navigate={navigate}
//               />
//             ) : (
//               <BookingsTable
//                 displayedBookings={displayedBookings}
//                 view={view}
//                 handleRelease={handleRelease}
//                 calculateDuration={calculateDuration}
//               />
//             )}
//           </div>

//         </div>
//       </div>
//     </>
//   );
// }

// /* ─────────────────────────────────────────────────────────────
//    STAT CARD
// ───────────────────────────────────────────────────────────── */
// function StatCard({ title, value, icon, accent, trend, sub }) {
//   return (
//     <div style={S.statCard} className="stat-card">
//       <div style={S.statCardTop}>
//         <div style={{ ...S.statIconWrap, background: `${accent}18`, border: `1px solid ${accent}30` }}>
//           <span style={{ color: accent }}>{icon}</span>
//         </div>
//         {trend != null && (
//           <div style={S.trendBadge}>
//             <TrendingUp size={12} color="#4ade80" />
//             <span style={S.trendText}>{trend}%</span>
//           </div>
//         )}
//       </div>
//       <p style={S.statLabel}>{title}</p>
//       <p style={S.statValue}>{value}</p>
//       {sub && <p style={S.statSub}>{sub}</p>}
//     </div>
//   );
// }

// /* ─────────────────────────────────────────────────────────────
//    STATUS BADGE
// ───────────────────────────────────────────────────────────── */
// function StatusBadge({ status }) {
//   const cfg = {
//     PARKED:            { bg: "#4ade8020", color: "#4ade80", border: "#4ade8030" },
//     CONFIRMED:         { bg: "#00D4FF20", color: "#00D4FF", border: "#00D4FF30" },
//     VALET_PICKED_UP:   { bg: "#a78bfa20", color: "#a78bfa", border: "#a78bfa30" },
//     VALET_REQUESTED:   { bg: "#fbbf2420", color: "#fbbf24", border: "#fbbf2430" },
//     LEFT_PARKING:      { bg: "#88888820", color: "#aaa",    border: "#33333330" },
//     COMPLETED:         { bg: "#4ade8020", color: "#4ade80", border: "#4ade8030" },
//     RETURNED:          { bg: "#818cf820", color: "#818cf8", border: "#818cf830" },
//     RELEASED_BY_ADMIN: { bg: "#f8717120", color: "#f87171", border: "#f8717130" },
//   };
//   const c = cfg[status] || { bg: "#33333320", color: "#aaa", border: "#33333330" };
//   return (
//     <span style={{ ...S.badge, background: c.bg, color: c.color, border: `1px solid ${c.border}` }}>
//       {status ? status.replace(/_/g, " ") : "Unknown"}
//     </span>
//   );
// }

// /* ─────────────────────────────────────────────────────────────
//    LOTS TABLE
// ───────────────────────────────────────────────────────────── */
// function LotsTable({ lots, handleToggleStatus, handleDeleteLot, navigate }) {
//   // Helper: compute total capacity from slots array returned by backend
//   const getTotalCapacity = (lot) =>
//     lot.slots?.reduce((sum, s) => sum + (s.capacity || 0), 0) ?? 0;

//   // Helper: build a readable rate string from the lot's rate fields
//   const getRateLabel = (lot) => {
//     const rates = [];
//     if (lot.carrate)   rates.push(`Car ₹${lot.carrate}`);
//     if (lot.bikerate)  rates.push(`Bike ₹${lot.bikerate}`);
//     if (lot.heavyrate) rates.push(`Heavy ₹${lot.heavyrate}`);
//     return rates.length > 0 ? rates.join(" · ") : "N/A";
//   };

//   return (
//     <div style={S.tableWrap}>
//       <div style={{ ...S.tableHead, gridTemplateColumns: "repeat(6, 1fr)" }}>
//         {["Location", "Address", "Capacity", "Rates / hr", "Status", "Actions"].map(h => (
//           <div key={h} style={S.tableHeadCell}>{h}</div>
//         ))}
//       </div>

//       {lots.length === 0 ? (
//         <EmptyState
//           icon="🏢" title="No Parking Lots"
//           description="Add your first parking location to get started"
//           action={() => navigate("/add-parking-lot")} actionText="Add Location"
//         />
//       ) : (
//         lots.map(lot => (
//           <div key={lot.id} style={S.tableRow} className="table-row">
//             {/* Name */}
//             <div style={S.tableCell}>
//               <div style={S.lotIconWrap}><Building2 size={16} color="#C8FF00" /></div>
//               <div>
//                 <p style={S.cellPrimary}>{lot.name}</p>
//                 <p style={S.cellSecondary}>#{lot.id}</p>
//               </div>
//             </div>
//             {/* Address */}
//             <div style={S.tableCell}>
//               <p style={{ ...S.cellSecondary, color: "#bbb" }}>{lot.address || "—"}</p>
//             </div>
//             {/* Capacity — computed from slots array */}
//             {/* <div style={S.tableCell}>
//               <div>
//                 <p style={S.cellPrimary}>{getTotalCapacity(lot)}</p>
//                 <p style={S.cellSecondary}>total slots</p>
//               </div>
//             </div> */}
//             {/* Rates — dynamic from backend */}
//             <div style={S.tableCell}>
//               <p style={{ ...S.cellSecondary, color: "#C8FF00", fontSize: 11, lineHeight: 1.6 }}>
//                 {getRateLabel(lot)}
//               </p>
//             </div>
//             {/* Status Toggle */}
//             <div style={S.tableCell}>
//               <button
//                 onClick={() => handleToggleStatus(lot.id, lot.status)}
//                 style={lot.status === "PAUSED" ? S.statusPaused : S.statusActive}
//                 className="admin-btn"
//               >
//                 {lot.status === "PAUSED"
//                   ? <><PauseCircle size={13} /> Paused</>
//                   : <><CheckCircle size={13} /> Active</>
//                 }
//               </button>
//             </div>
//             {/* Actions */}
//             <div style={{ ...S.tableCell, gap: 8 }}>
//               <button
//                 onClick={() => navigate(`/edit-parking-lot/${lot.id}`)}
//                 style={S.actionBtnBlue} className="admin-btn" title="Edit"
//               >
//                 <Edit2 size={14} />
//               </button>
//               <button
//                 onClick={() => handleDeleteLot(lot.id)}
//                 style={S.actionBtnRed} className="admin-btn" title="Delete"
//               >
//                 <X size={14} />
//               </button>
//             </div>
//           </div>
//         ))
//       )}
//     </div>
//   );
// }

// /* ─────────────────────────────────────────────────────────────
//    BOOKINGS TABLE
// ───────────────────────────────────────────────────────────── */
// function BookingsTable({ displayedBookings, view, handleRelease, calculateDuration }) {
//   return (
//     <div style={S.tableWrap}>
//       <div style={S.tableHead}>
//         {["Driver", "Vehicle", "Location", "Duration", "Status", "Actions"].map(h => (
//           <div key={h} style={S.tableHeadCell}>{h}</div>
//         ))}
//       </div>

//       {displayedBookings.length === 0 ? (
//         <EmptyState
//           icon={view === "active" ? "🚗" : "📋"}
//           title={view === "active" ? "No Active Sessions" : "No History"}
//           description={
//             view === "active"
//               ? "No vehicles are currently parked"
//               : "No historical bookings found"
//           }
//         />
//       ) : (
//         displayedBookings.map(booking => (
//           <div key={booking.id} style={S.tableRow} className="table-row">
//             {/* Driver */}
//             <div style={S.tableCell}>
//               <div style={S.driverIcon}><Users size={15} color="#aaa" /></div>
//               <div>
//                 <p style={S.cellPrimary}>{booking.driverName || "Guest"}</p>
//                 <p style={S.cellSecondary}>{booking.contactNumber || "N/A"}</p>
//               </div>
//             </div>
//             {/* Vehicle */}
//             <div style={S.tableCell}>
//               <div>
//                 <p style={S.cellPrimary}>{booking.vehicleNumber}</p>
//                 <p style={S.cellSecondary}>{booking.vehicleModel || "N/A"}</p>
//               </div>
//             </div>
//             {/* Location */}
//             <div style={S.tableCell}>
//               <p style={{ ...S.cellSecondary, color: "#bbb" }}>
//                 {booking.lotName || "Unknown Location"}
//               </p>
//             </div>
//             {/* Duration — live for active sessions, actual for history */}
//             <div style={S.tableCell}>
//               <div>
//                 <p style={S.cellPrimary}>{calculateDuration(booking.startTime, booking.endTime)}</p>
//                 <p style={S.cellSecondary}>parked</p>
//               </div>
//             </div>
//             {/* Status */}
//             <div style={S.tableCell}>
//               <StatusBadge status={booking.status} />
//             </div>
//             {/* Release (active tab only) */}
//             <div style={S.tableCell}>
//               {view === "active" && (
//                 <button
//                   onClick={() => handleRelease(booking.id)}
//                   style={S.releaseBtn}
//                   className="admin-btn"
//                 >
//                   Release
//                 </button>
//               )}
//             </div>
//           </div>
//         ))
//       )}
//     </div>
//   );
// }

// /* ─────────────────────────────────────────────────────────────
//    EMPTY STATE
// ───────────────────────────────────────────────────────────── */
// function EmptyState({ icon, title, description, action, actionText }) {
//   return (
//     <div style={S.emptyWrap}>
//       <div style={S.emptyIconWrap}><span style={{ fontSize: 28 }}>{icon}</span></div>
//       <h3 style={S.emptyTitle}>{title}</h3>
//       <p style={S.emptyDesc}>{description}</p>
//       {action && (
//         <button onClick={action} style={S.limeBtn} className="admin-btn">
//           {actionText}
//         </button>
//       )}
//     </div>
//   );
// }

// export default AdminDashboard;


import { useEffect, useState, useCallback } from "react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../../components/navbar/AdminNavbar";
import {
  BarChart3, Building2, Calendar, Car, DollarSign, Download,
  Filter, RefreshCw, TrendingUp, Users, X, Plus, Edit2,
  CheckCircle, PauseCircle
} from "lucide-react";

/* ─────────────────────────────────────────────────────────────
   GLOBAL CSS  (all responsive overrides live here)
───────────────────────────────────────────────────────────── */
const globalCSS = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&display=swap');
  body { font-family: 'Syne', sans-serif; margin: 0; }

  @keyframes pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.5; transform: scale(0.85); }
  }
  .admin-spin { animation: spin 1s linear infinite; }
  @keyframes spin { to { transform: rotate(360deg); } }

  .admin-btn:hover { opacity: 0.85; transform: translateY(-1px); }
  .stat-card-admin:hover { border-color: #2e2e2e !important; transform: translateY(-2px); }
  .table-row-admin:hover { background: #1a1a1a !important; }
  .activity-row-admin:hover { background: #1a1a1a !important; }

  /* ── Responsive: chart row ── */
  .admin-chart-row {
    display: grid;
    grid-template-columns: 1fr 340px;
    gap: 20px;
    margin-bottom: 28px;
  }
  /* ── Responsive: main tabs row ── */
  .admin-tabs-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 12px;
    margin-bottom: 16px;
  }
  /* ── Responsive: time range ── */
  .admin-time-row {
    display: flex;
    gap: 6px;
    margin-bottom: 32px;
    background: #141414;
    border: 1px solid #222;
    border-radius: 12px;
    padding: 5px;
    width: fit-content;
    flex-wrap: wrap;
  }
  /* ── Page padding ── */
  .admin-page {
    max-width: 1400px;
    margin: 0 auto;
    padding: 32px 24px 80px;
  }

  @media (max-width: 900px) {
    .admin-chart-row {
      grid-template-columns: 1fr !important;
    }
    .admin-page {
      padding: 20px 16px 60px;
    }
  }

  @media (max-width: 600px) {
    .admin-time-row {
      width: 100%;
      justify-content: center;
    }
    .admin-tabs-row {
      flex-direction: column;
      align-items: flex-start;
    }
    .admin-page {
      padding: 16px 12px 60px;
    }
  }
`;

/* ─────────────────────────────────────────────────────────────
   STYLES (inline — layout-critical only)
───────────────────────────────────────────────────────────── */
const S = {
  shell: { minHeight: "100vh", background: "#0A0A0A", color: "#fff" },

  /* Header */
  header: {
    display: "flex", flexWrap: "wrap", alignItems: "flex-start",
    justifyContent: "space-between", gap: 24, marginBottom: 32,
  },
  headerLabel: {
    display: "inline-flex", alignItems: "center", gap: 8,
    background: "#C8FF0012", border: "1px solid #C8FF0030",
    borderRadius: 999, padding: "5px 14px", fontSize: 12,
    color: "#C8FF00", fontWeight: 700, letterSpacing: "0.1em",
    textTransform: "uppercase", marginBottom: 14,
  },
  headerDot: {
    width: 7, height: 7, borderRadius: "50%",
    background: "#C8FF00", display: "inline-block",
    animation: "pulse 2s ease-in-out infinite",
  },
  headerTitleRow: { display: "flex", alignItems: "center", gap: 12, marginBottom: 6 },
  headerTitle: {
    fontSize: "clamp(22px, 4vw, 40px)", fontWeight: 800,
    letterSpacing: "-1px", color: "#fff", margin: 0,
  },
  headerAccent: { color: "#C8FF00" },
  headerSub: { fontSize: 14, color: "#888", marginTop: 4 },
  headerActions: { display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" },

  /* Buttons */
  limeBtn: {
    display: "inline-flex", alignItems: "center", gap: 7,
    background: "#C8FF00", color: "#000", border: "none",
    borderRadius: 11, padding: "11px 20px", fontWeight: 700,
    fontSize: 14, cursor: "pointer",
  },
  ghostBtn: {
    display: "inline-flex", alignItems: "center", gap: 7,
    background: "transparent", color: "#ccc",
    border: "1px solid #2e2e2e", borderRadius: 11,
    padding: "11px 20px", fontWeight: 600, fontSize: 14, cursor: "pointer",
  },

  /* Time range tabs */
  timeTab: {
    background: "transparent", border: "none", color: "#888",
    borderRadius: 9, padding: "8px 18px", fontSize: 13,
    fontWeight: 600, cursor: "pointer",
  },
  timeTabActive: {
    background: "#1e1e1e", border: "none", color: "#fff",
    borderRadius: 9, padding: "8px 18px", fontSize: 13,
    fontWeight: 700, cursor: "pointer", boxShadow: "0 1px 6px #00000060",
  },

  /* Stats grid */
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: 16, marginBottom: 28,
  },
  statCard: {
    background: "#141414", border: "1px solid #242424",
    borderRadius: 18, padding: "22px 24px",
    transition: "border-color 0.2s, transform 0.2s",
  },
  statCardTop: { display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 16 },
  statIconWrap: {
    width: 44, height: 44, borderRadius: 12,
    display: "flex", alignItems: "center", justifyContent: "center",
  },
  trendBadge: {
    display: "flex", alignItems: "center", gap: 4,
    background: "#4ade8015", border: "1px solid #4ade8025",
    borderRadius: 8, padding: "4px 9px",
  },
  trendText: { fontSize: 12, fontWeight: 700, color: "#4ade80" },
  statLabel: { fontSize: 12, color: "#888", fontWeight: 600, marginBottom: 4 },
  statValue: { fontSize: 28, fontWeight: 800, color: "#ffffff", lineHeight: 1, marginBottom: 4 },
  statSub: { fontSize: 12, color: "#666" },

  /* Chart card */
  chartCard: {
    background: "#141414", border: "1px solid #242424",
    borderRadius: 18, padding: "24px",
  },
  activityCard: {
    background: "#141414", border: "1px solid #242424",
    borderRadius: 18, padding: "24px",
  },
  cardHeader: {
    display: "flex", alignItems: "flex-start",
    justifyContent: "space-between", marginBottom: 20,
  },
  cardTitle: { fontSize: 16, fontWeight: 700, color: "#fff", marginBottom: 3 },
  cardSub: { fontSize: 13, color: "#888" },
  chartWrap: { height: 260, width: "100%" },
  chartEmpty: {
    height: "100%", display: "flex",
    alignItems: "center", justifyContent: "center",
    color: "#555", fontSize: 14,
  },
  viewAllBtn: {
    background: "transparent", border: "none",
    color: "#C8FF00", fontSize: 13, fontWeight: 600, cursor: "pointer",
  },
  activityList: { display: "flex", flexDirection: "column", gap: 8 },
  activityRow: {
    display: "flex", alignItems: "center", gap: 12,
    padding: "10px 12px", borderRadius: 10,
    transition: "background 0.15s",
  },
  activityIcon: {
    width: 36, height: 36, borderRadius: 9,
    background: "#C8FF0012", border: "1px solid #C8FF0020",
    display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
  },
  activityInfo: { flex: 1, minWidth: 0 },
  activityVehicle: { fontSize: 13, fontWeight: 700, color: "#fff", marginBottom: 2 },
  activityName: { fontSize: 12, color: "#888" },
  emptyText: { color: "#555", fontSize: 14, textAlign: "center", padding: "20px 0" },

  /* Tabs */
  tabsGroup: {
    display: "flex", gap: 4,
    background: "#141414", border: "1px solid #242424",
    borderRadius: 12, padding: 4, flexWrap: "wrap",
  },
  tab: {
    display: "inline-flex", alignItems: "center", gap: 7,
    background: "transparent", border: "none",
    color: "#888", borderRadius: 9,
    padding: "9px 16px", fontSize: 13, fontWeight: 600, cursor: "pointer",
  },
  tabActive: {
    display: "inline-flex", alignItems: "center", gap: 7,
    background: "#1e1e1e", border: "none",
    color: "#fff", borderRadius: 9,
    padding: "9px 16px", fontSize: 13, fontWeight: 700, cursor: "pointer",
  },
  tabBadge: {
    background: "#C8FF00", color: "#000",
    fontSize: 11, fontWeight: 800, borderRadius: 99,
    padding: "1px 7px",
  },
  tabsRight: { display: "flex", gap: 10 },
  filterBadge: {
    background: "#C8FF00", color: "#000",
    fontSize: 11, fontWeight: 800, borderRadius: 99, padding: "1px 7px",
  },

  /* Table */
  tableCard: {
    background: "#141414", border: "1px solid #242424",
    borderRadius: 18, overflow: "hidden",
  },
  tableWrap: { width: "100%", overflowX: "auto" },
  tableHead: {
    display: "grid", gridTemplateColumns: "repeat(6, 1fr)",
    gap: 16, padding: "14px 24px",
    background: "#0e0e0e", borderBottom: "1px solid #222",
    minWidth: 680,
  },
  tableHeadCell: {
    fontSize: 11, fontWeight: 700, color: "#555",
    textTransform: "uppercase", letterSpacing: "0.08em",
  },
  tableRow: {
    display: "grid", gridTemplateColumns: "repeat(6, 1fr)",
    gap: 16, padding: "16px 24px",
    borderBottom: "1px solid #1a1a1a",
    transition: "background 0.15s",
    minWidth: 680,
    alignItems: "center",
  },
  tableCell: { display: "flex", alignItems: "center", gap: 10 },
  cellPrimary: { fontSize: 14, fontWeight: 600, color: "#fff", marginBottom: 2 },
  cellSecondary: { fontSize: 12, color: "#666" },

  lotIconWrap: {
    width: 36, height: 36, borderRadius: 9,
    background: "#C8FF0012", border: "1px solid #C8FF0020",
    display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
  },
  driverIcon: {
    width: 36, height: 36, borderRadius: 9,
    background: "#1e1e1e", border: "1px solid #2e2e2e",
    display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
  },

  statusActive: {
    display: "inline-flex", alignItems: "center", gap: 5,
    background: "#4ade8015", border: "1px solid #4ade8030",
    color: "#4ade80", borderRadius: 99, padding: "5px 12px",
    fontSize: 12, fontWeight: 700, cursor: "pointer",
  },
  statusPaused: {
    display: "inline-flex", alignItems: "center", gap: 5,
    background: "#fbbf2415", border: "1px solid #fbbf2430",
    color: "#fbbf24", borderRadius: 99, padding: "5px 12px",
    fontSize: 12, fontWeight: 700, cursor: "pointer",
  },

  actionBtnBlue: {
    width: 32, height: 32, borderRadius: 8,
    background: "#00D4FF12", border: "1px solid #00D4FF25",
    color: "#00D4FF", display: "flex", alignItems: "center",
    justifyContent: "center", cursor: "pointer",
  },
  actionBtnRed: {
    width: 32, height: 32, borderRadius: 8,
    background: "#f8717112", border: "1px solid #f8717125",
    color: "#f87171", display: "flex", alignItems: "center",
    justifyContent: "center", cursor: "pointer",
  },
  releaseBtn: {
    background: "#00D4FF18", border: "1px solid #00D4FF30",
    color: "#00D4FF", borderRadius: 9,
    padding: "7px 16px", fontSize: 13, fontWeight: 700, cursor: "pointer",
  },

  badge: {
    display: "inline-flex", alignItems: "center",
    padding: "4px 10px", borderRadius: 99,
    fontSize: 11, fontWeight: 700, whiteSpace: "nowrap",
  },

  /* Empty state */
  emptyWrap: { padding: "60px 24px", textAlign: "center" },
  emptyIconWrap: {
    width: 64, height: 64, borderRadius: 16,
    background: "#C8FF0010", border: "1px solid #C8FF0020",
    display: "flex", alignItems: "center", justifyContent: "center",
    margin: "0 auto 16px",
  },
  emptyTitle: { fontSize: 17, fontWeight: 700, color: "#fff", marginBottom: 8 },
  emptyDesc: { fontSize: 14, color: "#888", marginBottom: 20 },
};

/* ─────────────────────────────────────────────────────────────
   MAIN COMPONENT  (logic 100% unchanged)
───────────────────────────────────────────────────────────── */
function AdminDashboard() {
  const [allBookings, setAllBookings] = useState([]);
  const [lots, setLots] = useState([]);
  const [view, setView] = useState("active");
  const [adminName, setAdminName] = useState("Admin");
  const [totalRevenue, setTotalRevenue] = useState(0.0);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState("week");
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);
  const [stats, setStats] = useState({ occupancy: 0, growth: 0, avgTime: "0h" });
  const navigate = useNavigate();

  const activeData = allBookings.filter(b =>
    ["PARKED", "CONFIRMED", "VALET_PICKED_UP", "VALET_REQUESTED"].includes(b.status)
  );
  const historyData = allBookings.filter(b =>
    ["LEFT_PARKING", "RETURNED", "COMPLETED", "RELEASED_BY_ADMIN"].includes(b.status)
  );
  const displayedBookings = view === "active" ? activeData : historyData;

  const calculateStats = useCallback(() => {
    const totalSlots = lots.reduce((sum, lot) => {
      const cap = lot.slots?.reduce((s, slot) => s + (slot.capacity || 0), 0) ?? 0;
      return sum + cap;
    }, 0);
    const occupancyRate = totalSlots > 0 ? (activeData.length / totalSlots) * 100 : 0;
    setStats(prev => ({ ...prev, occupancy: Math.round(occupancyRate) }));
  }, [lots, allBookings]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("userId");
    localStorage.removeItem("role");
    navigate("/login");
  };

  const handleToggleStatus = async (lotId, currentStatus) => {
  const statusToCheck = currentStatus || "ACTIVE";
  const newStatus = statusToCheck === "PAUSED" ? "ACTIVE" : "PAUSED";

  // Optimistic update
  setLots(prev =>
    prev.map(lot => lot.id === lotId ? { ...lot, status: newStatus } : lot)
  );

  try {
    const token = localStorage.getItem("token");
    await axios.patch(
      `http://localhost:8080/api/parking-lots/${lotId}/status`,
      { status: newStatus },
      { headers: { Authorization: `Bearer ${token}` }, withCredentials: true }
    );
    // ✅ Remove fetchData() from here — optimistic update already handles the UI
    // The 30-second auto-refresh interval will sync naturally
  } catch {
    alert("Failed to update status. Reverting change.");
    // Revert on failure
    setLots(prev =>
      prev.map(lot => lot.id === lotId ? { ...lot, status: currentStatus } : lot)
    );
  }
};

  const fetchData = async () => {
    try {
      const userStr = localStorage.getItem("user");
      const token   = localStorage.getItem("token");
      let adminId   = null;
      if (userStr) { const user = JSON.parse(userStr); adminId = user.id; }
      if (!adminId || !token) { navigate("/login"); return; }

      const config = {
        params: { adminId },
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true
      };

      const results = await Promise.allSettled([
        axios.get(`http://localhost:8080/api/bookings/admin`, config),
        axios.get(`http://localhost:8080/api/parking-lots`, {
          params: { ownerId: adminId },
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true
        }),
        axios.get(`http://localhost:8080/api/bookings/earnings`, config),
        axios.get(`http://localhost:8080/api/admin/stats/dashboard`, config)
      ]);

      if (results[0].status === "fulfilled") setAllBookings(results[0].value.data);
      if (results[1].status === "fulfilled") setLots(results[1].value.data);
      if (results[2].status === "fulfilled") setTotalRevenue(results[2].value.data);
      if (results[3].status === "fulfilled") {
        const d = results[3].value.data;
        setChartData(d.chartData || []);
        if (d.totalRevenue) setTotalRevenue(d.totalRevenue);
        if (d.recentActivity) setRecentActivity(d.recentActivity);
        setStats(prev => ({
          ...prev,
          occupancy: d.occupancyPercent ?? prev.occupancy,
          avgTime: d.avgParkingHours != null ? `${d.avgParkingHours}h` : prev.avgTime,
          growth: 0,
        }));
      }
      calculateStats();
    } catch (err) {
      console.error("Error fetching data:", err);
      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "OWNER" && role !== "ADMIN") { navigate("/login"); return; }
    const userStr = localStorage.getItem("user");
    if (userStr) {
      const user = JSON.parse(userStr);
      if (user.name) setAdminName(user.name.charAt(0).toUpperCase() + user.name.slice(1));
    }
    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, [navigate]);

  const handleRelease = async (id) => {
    if (window.confirm("Mark this vehicle as 'Left Parking'?")) {
      try {
        const token = localStorage.getItem("token");
        await axios.post(
          `http://localhost:8080/api/bookings/${id}/release`,
          {},
          { headers: { Authorization: `Bearer ${token}` }, withCredentials: true }
        );
        setAllBookings(prev => prev.map(b => b.id === id ? { ...b, status: "LEFT_PARKING" } : b));
        alert("Car status updated successfully!");
      } catch (err) {
        console.error(err);
        alert("Failed to update status.");
      }
    }
  };

  const handleDeleteLot = async (lotId) => {
    if (window.confirm("Are you sure you want to delete this parking lot?")) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`http://localhost:8080/api/parking-lots/${lotId}`, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true
        });
        setLots(prev => prev.filter(lot => lot.id !== lotId));
        alert("Parking lot deleted successfully!");
        fetchData();
      } catch (err) {
        console.error("Delete failed:", err);
        alert("Failed to delete parking lot.");
      }
    }
  };

  const handleExportData = () => {
    if (allBookings.length === 0) return alert("No data to export!");
    const headers = ["Booking ID", "Vehicle Number", "Customer Name", "Location", "Status", "Amount", "Start Time"];
    const csvRows = [headers.join(",")];
    allBookings.forEach(b => {
      csvRows.push([
        b.id, b.vehicleNumber || "N/A", b.driverName || "Guest",
        b.parkingLot?.name || "Unknown", b.status, b.totalAmount || 0,
        new Date(b.startTime).toLocaleString()
      ].map(c => `"${c}"`).join(","));
    });
    const blob = new Blob([csvRows.join("\n")], { type: "text/csv" });
    const url  = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href     = url;
    link.download = `Parking_Report_${new Date().toISOString().split("T")[0]}.csv`;
    link.click();
  };

  const calculateDuration = (startTime, endTime) => {
    if (!startTime) return "N/A";
    const start   = new Date(startTime);
    const end     = endTime ? new Date(endTime) : new Date();
    const diffHrs = ((end - start) / (1000 * 60 * 60)).toFixed(1);
    return `${Math.max(0, diffHrs)}h`;
  };

  const timeRanges = [
    { id: "day",   label: "Today" },
    { id: "week",  label: "This Week" },
    { id: "month", label: "This Month" },
    { id: "year",  label: "This Year" },
  ];

  return (
    <>
      <style>{globalCSS}</style>
      <div style={S.shell}>
        <AdminNavbar />

        <div className="admin-page">

          {/* ── HEADER ── */}
          <div style={S.header}>
            <div>
              <span style={S.headerLabel}>
                <span style={S.headerDot} />
                Admin Console
              </span>
              <div style={S.headerTitleRow}>
                <h1 style={S.headerTitle}>
                  Welcome, <span style={S.headerAccent}>{adminName}</span>
                </h1>
                {loading && <RefreshCw size={18} color="#C8FF00" className="admin-spin" />}
              </div>
              <p style={S.headerSub}>Manage your parking facilities and monitor operations</p>
            </div>

            <div style={S.headerActions}>
              <button onClick={() => navigate("/add-parking-lot")} style={S.limeBtn} className="admin-btn">
                <Plus size={16} /> Add Location
              </button>
              <button onClick={handleExportData} style={S.ghostBtn} className="admin-btn">
                <Download size={16} /> Export CSV
              </button>
            </div>
          </div>

          {/* ── TIME RANGE ── */}
          <div className="admin-time-row">
            {timeRanges.map(r => (
              <button
                key={r.id}
                onClick={() => setTimeRange(r.id)}
                style={timeRange === r.id ? S.timeTabActive : S.timeTab}
                className="admin-btn"
              >
                {r.label}
              </button>
            ))}
          </div>

          {/* ── STAT CARDS ── */}
          <div style={S.statsGrid}>
            <StatCard title="Total Properties" value={lots.length} icon={<Building2 size={20} />} accent="#C8FF00" trend={stats.growth} />
            <StatCard title="Active Sessions" value={activeData.length} icon={<Users size={20} />} accent="#00D4FF" sub={`${stats.occupancy}% occupancy`} />
            <StatCard title="Total Revenue" value={`₹${totalRevenue.toFixed(2)}`} icon={<DollarSign size={20} />} accent="#FF6B35" trend={15.2} />
            <StatCard title="Avg. Parking Time" value={stats.avgTime} icon={<Calendar size={20} />} accent="#a78bfa" />
          </div>

          {/* ── CHART + RECENT ACTIVITY ── */}
          <div className="admin-chart-row">
            {/* Revenue Chart */}
            <div style={S.chartCard}>
              <div style={S.cardHeader}>
                <div>
                  <h3 style={S.cardTitle}>Revenue Overview</h3>
                  <p style={S.cardSub}>Revenue trends over selected period</p>
                </div>
                <BarChart3 size={18} color="#555" />
              </div>
              <div style={S.chartWrap}>
                {chartData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="adminRevGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%"  stopColor="#C8FF00" stopOpacity={0.25} />
                          <stop offset="95%" stopColor="#C8FF00" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#222" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#666" }} dy={10} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#666" }} tickFormatter={v => `₹${v}`} />
                      <Tooltip
                        contentStyle={{ background: "#1a1a1a", border: "1px solid #2e2e2e", borderRadius: 10, color: "#fff", fontSize: 13 }}
                        formatter={v => [`₹${v}`, "Revenue"]}
                      />
                      <Area type="monotone" dataKey="revenue" stroke="#C8FF00" strokeWidth={2.5} fillOpacity={1} fill="url(#adminRevGrad)" />
                    </AreaChart>
                  </ResponsiveContainer>
                ) : (
                  <div style={S.chartEmpty}>{loading ? "Loading chart data…" : "No chart data available"}</div>
                )}
              </div>
            </div>

            {/* Recent Activity */}
            <div style={S.activityCard}>
              <div style={S.cardHeader}>
                <div>
                  <h3 style={S.cardTitle}>Recent Activity</h3>
                  <p style={S.cardSub}>Latest operations and updates</p>
                </div>
                <button style={S.viewAllBtn} onClick={() => setView("active")}>View all</button>
              </div>
              <div style={S.activityList}>
                {recentActivity.length === 0 && activeData.length === 0 ? (
                  <p style={S.emptyText}>No active sessions</p>
                ) : (
                  (recentActivity.length > 0 ? recentActivity : activeData.slice(0, 5)).map((item, idx) => (
                    <div key={item.bookingId || item.id || idx} style={S.activityRow} className="activity-row-admin">
                      <div style={S.activityIcon}><Car size={16} color="#C8FF00" /></div>
                      <div style={S.activityInfo}>
                        <p style={S.activityVehicle}>{item.vehicleNumber}</p>
                        <p style={S.activityName}>{item.lotName || item.driverName || "Guest"}</p>
                      </div>
                      <StatusBadge status={item.status} />
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* ── TABS ── */}
          <div className="admin-tabs-row">
            <div style={S.tabsGroup}>
              {["active", "history", "lots"].map(tab => (
                <button key={tab} onClick={() => setView(tab)} style={view === tab ? S.tabActive : S.tab} className="admin-btn">
                  {tab === "active"  && "Live Sessions"}
                  {tab === "history" && "History"}
                  {tab === "lots"    && "My Locations"}
                  {tab === "active" && activeData.length > 0 && (
                    <span style={S.tabBadge}>{activeData.length}</span>
                  )}
                </button>
              ))}
            </div>
            <div style={S.tabsRight}>
              <button style={S.ghostBtn} className="admin-btn">
                <Filter size={14} />
                Filter
                {selectedFilters.length > 0 && <span style={S.filterBadge}>{selectedFilters.length}</span>}
              </button>
            </div>
          </div>

          {/* ── DATA TABLE ── */}
          <div style={S.tableCard}>
            {view === "lots" ? (
              <LotsTable lots={lots} handleToggleStatus={handleToggleStatus} handleDeleteLot={handleDeleteLot} navigate={navigate} />
            ) : (
              <BookingsTable displayedBookings={displayedBookings} view={view} handleRelease={handleRelease} calculateDuration={calculateDuration} />
            )}
          </div>

        </div>
      </div>
    </>
  );
}

/* ─── STAT CARD ─── */
function StatCard({ title, value, icon, accent, trend, sub }) {
  return (
    <div style={S.statCard} className="stat-card-admin">
      <div style={S.statCardTop}>
        <div style={{ ...S.statIconWrap, background: `${accent}18`, border: `1px solid ${accent}30` }}>
          <span style={{ color: accent }}>{icon}</span>
        </div>
        {trend != null && (
          <div style={S.trendBadge}>
            <TrendingUp size={12} color="#4ade80" />
            <span style={S.trendText}>{trend}%</span>
          </div>
        )}
      </div>
      <p style={S.statLabel}>{title}</p>
      <p style={S.statValue}>{value}</p>
      {sub && <p style={S.statSub}>{sub}</p>}
    </div>
  );
}

/* ─── STATUS BADGE ─── */
function StatusBadge({ status }) {
  const cfg = {
    PARKED:            { bg: "#4ade8020", color: "#4ade80", border: "#4ade8030" },
    CONFIRMED:         { bg: "#00D4FF20", color: "#00D4FF", border: "#00D4FF30" },
    VALET_PICKED_UP:   { bg: "#a78bfa20", color: "#a78bfa", border: "#a78bfa30" },
    VALET_REQUESTED:   { bg: "#fbbf2420", color: "#fbbf24", border: "#fbbf2430" },
    LEFT_PARKING:      { bg: "#88888820", color: "#aaa",    border: "#33333330" },
    COMPLETED:         { bg: "#4ade8020", color: "#4ade80", border: "#4ade8030" },
    RETURNED:          { bg: "#818cf820", color: "#818cf8", border: "#818cf830" },
    RELEASED_BY_ADMIN: { bg: "#f8717120", color: "#f87171", border: "#f8717130" },
  };
  const c = cfg[status] || { bg: "#33333320", color: "#aaa", border: "#33333330" };
  return (
    <span style={{ ...S.badge, background: c.bg, color: c.color, border: `1px solid ${c.border}` }}>
      {status ? status.replace(/_/g, " ") : "Unknown"}
    </span>
  );
}

/* ─── LOTS TABLE ─── */
function LotsTable({ lots, handleToggleStatus, handleDeleteLot, navigate }) {
  const getRateLabel = (lot) => {
    const rates = [];
    if (lot.carrate)   rates.push(`Car ₹${lot.carrate}`);
    if (lot.bikerate)  rates.push(`Bike ₹${lot.bikerate}`);
    if (lot.heavyrate) rates.push(`Heavy ₹${lot.heavyrate}`);
    return rates.length > 0 ? rates.join(" · ") : "N/A";
  };

  return (
    <div style={S.tableWrap}>
      <div style={S.tableHead}>
        {["Location", "Address", /*"Capacity"*/, "Rates / hr", "Status", "Actions"].map(h => (
          <div key={h} style={S.tableHeadCell}>{h}</div>
        ))}
      </div>
      {lots.length === 0 ? (
        <EmptyState icon="🏢" title="No Parking Lots" description="Add your first parking location to get started" action={() => navigate("/add-parking-lot")} actionText="Add Location" />
      ) : (
        lots.map(lot => (
          <div key={lot.id} style={S.tableRow} className="table-row-admin">
            <div style={S.tableCell}>
              <div style={S.lotIconWrap}><Building2 size={16} color="#C8FF00" /></div>
              <div>
                <p style={S.cellPrimary}>{lot.name}</p>
                <p style={S.cellSecondary}>#{lot.id}</p>
              </div>
            </div>
            <div style={S.tableCell}>
              <p style={{ ...S.cellSecondary, color: "#bbb" }}>{lot.address || "—"}</p>
            </div>
            <div style={S.tableCell}>
              <p style={{ ...S.cellSecondary, color: "#bbb" }}>{lot.totalSlots || "—"}</p>
            </div>
            <div style={S.tableCell}>
              <p style={{ ...S.cellSecondary, color: "#C8FF00", fontSize: 11, lineHeight: 1.6 }}>{getRateLabel(lot)}</p>
            </div>
            <div style={S.tableCell}>
              <button onClick={() => handleToggleStatus(lot.id, lot.status)} style={lot.status === "PAUSED" ? S.statusPaused : S.statusActive} className="admin-btn">
                {lot.status === "PAUSED" ? <><PauseCircle size={13} /> Paused</> : <><CheckCircle size={13} /> Active</>}
              </button>
            </div>
            <div style={{ ...S.tableCell, gap: 8 }}>
              <button onClick={() => navigate(`/edit-parking-lot/${lot.id}`)} style={S.actionBtnBlue} className="admin-btn" title="Edit"><Edit2 size={14} /></button>
              <button onClick={() => handleDeleteLot(lot.id)} style={S.actionBtnRed} className="admin-btn" title="Delete"><X size={14} /></button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

/* ─── BOOKINGS TABLE ─── */
function BookingsTable({ displayedBookings, view, handleRelease, calculateDuration }) {
  return (
    <div style={S.tableWrap}>
      <div style={S.tableHead}>
        {["Driver", "Vehicle", "Location", "Duration", "Status", "Actions"].map(h => (
          <div key={h} style={S.tableHeadCell}>{h}</div>
        ))}
      </div>
      {displayedBookings.length === 0 ? (
        <EmptyState
          icon={view === "active" ? "🚗" : "📋"}
          title={view === "active" ? "No Active Sessions" : "No History"}
          description={view === "active" ? "No vehicles are currently parked" : "No historical bookings found"}
        />
      ) : (
        displayedBookings.map(booking => (
          <div key={booking.id} style={S.tableRow} className="table-row-admin">
            <div style={S.tableCell}>
              <div style={S.driverIcon}><Users size={15} color="#aaa" /></div>
              <div>
                <p style={S.cellPrimary}>{booking.driverName || "Guest"}</p>
                <p style={S.cellSecondary}>{booking.contactNumber || "N/A"}</p>
              </div>
            </div>
            <div style={S.tableCell}>
              <div>
                <p style={S.cellPrimary}>{booking.vehicleNumber}</p>
                <p style={S.cellSecondary}>{booking.vehicleModel || "N/A"}</p>
              </div>
            </div>
            <div style={S.tableCell}>
              <p style={{ ...S.cellSecondary, color: "#bbb" }}>{booking.lotName || "Unknown Location"}</p>
            </div>
            <div style={S.tableCell}>
              <div>
                <p style={S.cellPrimary}>{calculateDuration(booking.startTime, booking.endTime)}</p>
                <p style={S.cellSecondary}>parked</p>
              </div>
            </div>
            <div style={S.tableCell}><StatusBadge status={booking.status} /></div>
            <div style={S.tableCell}>
              {view === "active" && (
                <button onClick={() => handleRelease(booking.id)} style={S.releaseBtn} className="admin-btn">Release</button>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

/* ─── EMPTY STATE ─── */
function EmptyState({ icon, title, description, action, actionText }) {
  return (
    <div style={S.emptyWrap}>
      <div style={S.emptyIconWrap}><span style={{ fontSize: 28 }}>{icon}</span></div>
      <h3 style={S.emptyTitle}>{title}</h3>
      <p style={S.emptyDesc}>{description}</p>
      {action && <button onClick={action} style={S.limeBtn} className="admin-btn">{actionText}</button>}
    </div>
  );
}

export default AdminDashboard;