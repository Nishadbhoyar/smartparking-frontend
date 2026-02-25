// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useParams, useNavigate } from "react-router-dom";

// function LotBookings() {
//   const { lotId } = useParams();
//   const [bookings, setBookings] = useState([]);
//   const [lot, setLot] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     setLoading(true);

//     // Fetch lot details
//     axios.get(`http://localhost:8080/api/parking-lots/${lotId}`)
//       .then((response) => {
//         setLot(response.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching lot details:", error);
//       });

//     // Fetch bookings for this specific lot
//     axios.get(`http://localhost:8080/api/bookings/lot/${lotId}`)
//       .then((response) => {
//         setBookings(response.data);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error("Error fetching lot bookings:", error);
//         setLoading(false);
//       });
//   }, [lotId]);

//   const formatDateTime = (dateTimeString) => {
//     if (!dateTimeString) return "N/A";
//     const date = new Date(dateTimeString);
//     return date.toLocaleString();
//   };

//   const getStatusColor = (status) => {
//     switch (status) {
//       case "CONFIRMED":
//       case "PARKED":
//         return "bg-green-200 text-green-900";
//       case "COMPLETED":
//         return "bg-gray-200 text-gray-900";
//       case "PENDING":
//         return "bg-yellow-200 text-yellow-900";
//       case "VALET_REQUESTED":
//         return "bg-blue-200 text-blue-900";
//       default:
//         return "bg-gray-200 text-gray-900";
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
//         <div className="animate-spin w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <div className="flex justify-between items-center mb-6">
//         <div>
//           <h1 className="text-3xl font-bold text-gray-800">📋 Lot Manager</h1>
//           {lot && (
//             <div className="mt-2">
//               <p className="text-lg font-semibold text-gray-700">{lot.name}</p>
//               <p className="text-sm text-gray-500">{lot.address}</p>
//             </div>
//           )}
//         </div>
//         <button 
//           onClick={() => navigate("/dashboard")}
//           className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
//         >
//           Back to Dashboard
//         </button>
//       </div>

//       {/* Statistics */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
//         <div className="bg-white p-4 rounded-lg shadow">
//           <p className="text-sm text-gray-500">Total Bookings</p>
//           <p className="text-2xl font-bold text-blue-600">{bookings.length}</p>
//         </div>
//         <div className="bg-white p-4 rounded-lg shadow">
//           <p className="text-sm text-gray-500">Active</p>
//           <p className="text-2xl font-bold text-green-600">
//             {bookings.filter(b => b.status === "CONFIRMED" || b.status === "PARKED").length}
//           </p>
//         </div>
//         <div className="bg-white p-4 rounded-lg shadow">
//           <p className="text-sm text-gray-500">Completed</p>
//           <p className="text-2xl font-bold text-gray-600">
//             {bookings.filter(b => b.status === "COMPLETED").length}
//           </p>
//         </div>
//         <div className="bg-white p-4 rounded-lg shadow">
//           <p className="text-sm text-gray-500">Total Revenue</p>
//           <p className="text-2xl font-bold text-purple-600">
//             ₹{bookings.reduce((sum, b) => sum + (b.totalAmount || 0), 0).toFixed(2)}
//           </p>
//         </div>
//       </div>

//       <div className="bg-white shadow-md rounded-lg overflow-hidden">
//         <table className="min-w-full leading-normal">
//           <thead>
//             <tr>
//               <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                 Booking ID
//               </th>
//               <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                 User
//               </th>
//               <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                 Vehicle
//               </th>
//               <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                 Time
//               </th>
//               <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                 Status
//               </th>
//               <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                 Amount
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {bookings.length > 0 ? (
//               bookings.map((booking) => (
//                 <tr key={booking.id} className="hover:bg-gray-50">
//                   <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
//                     <span className="font-mono font-bold text-blue-600">#{booking.id}</span>
//                   </td>
//                   <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
//                     <div>
//                       <p className="text-gray-900 font-semibold whitespace-no-wrap">
//                         {booking.user?.name || "Unknown User"}
//                       </p>
//                       <p className="text-gray-500 text-xs">
//                         {booking.user?.email || ""}
//                       </p>
//                     </div>
//                   </td>
//                   <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
//                     <div>
//                       <p className="text-gray-900 font-semibold">
//                         {booking.vehicleType || "N/A"}
//                       </p>
//                       {booking.vehicleNumber && (
//                         <p className="text-gray-500 text-xs">{booking.vehicleNumber}</p>
//                       )}
//                     </div>
//                   </td>
//                   <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
//                     <div className="text-xs">
//                       <p className="text-gray-600">
//                         <span className="font-semibold">Start:</span> {formatDateTime(booking.startTime)}
//                       </p>
//                       {booking.endTime && (
//                         <p className="text-gray-600">
//                           <span className="font-semibold">End:</span> {formatDateTime(booking.endTime)}
//                         </p>
//                       )}
//                     </div>
//                   </td>
//                   <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
//                     <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(booking.status)}`}>
//                       {booking.status}
//                     </span>
//                   </td>
//                   <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
//                     <span className="font-bold text-green-700">
//                       ₹{booking.totalAmount?.toFixed(2) || "0.00"}
//                     </span>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="6" className="px-5 py-5 text-center text-gray-500">
//                   <div className="flex flex-col items-center justify-center py-10">
//                     <span className="text-4xl mb-2">📭</span>
//                     <p>No bookings found for this lot yet.</p>
//                   </div>
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// export default LotBookings;




import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Building2, Users, CheckCircle, DollarSign } from "lucide-react";

/* ── Styles ── */
const S = {
  shell:      { minHeight: "100vh", background: "#0A0A0A", padding: "32px 24px 80px", fontFamily: "'Syne', sans-serif" },
  loading:    { minHeight: "100vh", background: "#0A0A0A", display: "flex", alignItems: "center", justifyContent: "center" },
  spinner:    { width: 44, height: 44, border: "3px solid #1e1e1e", borderTop: "3px solid #C8FF00", borderRadius: "50%", animation: "spin 0.8s linear infinite" },
  inner:      { maxWidth: 1100, margin: "0 auto" },
  topRow:     { display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 16, marginBottom: 32 },
  backBtn:    { display: "inline-flex", alignItems: "center", gap: 8, background: "transparent", border: "1px solid #2e2e2e", color: "#aaa", borderRadius: 10, padding: "8px 16px", fontSize: 13, fontWeight: 600, cursor: "pointer" },
  lotName:    { fontSize: 26, fontWeight: 800, color: "#fff", letterSpacing: "-0.5px", marginBottom: 4 },
  lotAddr:    { fontSize: 14, color: "#888" },
  statsGrid:  { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 28 },
  statCard:   { background: "#141414", border: "1px solid #242424", borderRadius: 18, padding: "20px 22px" },
  statLabel:  { fontSize: 12, color: "#888", fontWeight: 600, marginBottom: 6 },
  statVal:    { fontSize: 28, fontWeight: 800 },
  tableCard:  { background: "#141414", border: "1px solid #242424", borderRadius: 18, overflow: "hidden" },
  tableHead:  { display: "grid", gridTemplateColumns: "80px 1fr 1fr 1.4fr 120px 90px", gap: 16, padding: "14px 24px", background: "#0e0e0e", borderBottom: "1px solid #222" },
  headCell:   { fontSize: 11, fontWeight: 700, color: "#555", textTransform: "uppercase", letterSpacing: "0.08em" },
  tableRow:   { display: "grid", gridTemplateColumns: "80px 1fr 1fr 1.4fr 120px 90px", gap: 16, padding: "16px 24px", borderBottom: "1px solid #1a1a1a", alignItems: "center" },
  cellPrimary:{ fontSize: 14, fontWeight: 600, color: "#fff", marginBottom: 2 },
  cellSub:    { fontSize: 12, color: "#666" },
  idBadge:    { fontFamily: "monospace", fontSize: 13, fontWeight: 700, color: "#C8FF00" },
  emptyWrap:  { padding: "60px 24px", textAlign: "center" },
  emptyIcon:  { fontSize: 32, marginBottom: 12 },
  emptyTitle: { fontSize: 16, fontWeight: 700, color: "#fff", marginBottom: 6 },
  emptyDesc:  { fontSize: 14, color: "#666" },
};

const statusColors = {
  CONFIRMED:       { bg: "#4ade8015", color: "#4ade80", border: "#4ade8025" },
  PARKED:          { bg: "#4ade8015", color: "#4ade80", border: "#4ade8025" },
  COMPLETED:       { bg: "#88888815", color: "#aaa",    border: "#33333325" },
  PENDING:         { bg: "#fbbf2415", color: "#fbbf24", border: "#fbbf2425" },
  VALET_REQUESTED: { bg: "#00D4FF15", color: "#00D4FF", border: "#00D4FF25" },
};

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&display=swap');
  body { font-family: 'Syne', sans-serif; margin: 0; }
  @keyframes spin { to { transform: rotate(360deg); } }
  .lot-row:hover { background: #1a1a1a !important; }
  .dark-btn:hover { opacity: 0.85; }
`;

function StatusBadge({ status }) {
  const c = statusColors[status] || { bg: "#33333315", color: "#aaa", border: "#33333325" };
  return (
    <span style={{ background: c.bg, color: c.color, border: `1px solid ${c.border}`, borderRadius: 99, padding: "4px 10px", fontSize: 11, fontWeight: 700, whiteSpace: "nowrap" }}>
      {status || "Unknown"}
    </span>
  );
}

function LotBookings() {
  const { lotId } = useParams();
  const [bookings, setBookings] = useState([]);
  const [lot, setLot] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:8080/api/parking-lots/${lotId}`).then(r => setLot(r.data)).catch(console.error);
    axios.get(`http://localhost:8080/api/bookings/lot/${lotId}`)
      .then(r => { setBookings(r.data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [lotId]);

  const fmt = (dt) => { if (!dt) return "N/A"; return new Date(dt).toLocaleString(); };

  const stats = [
    { label: "Total Bookings", val: bookings.length, color: "#C8FF00", icon: <Building2 size={18} /> },
    { label: "Active", val: bookings.filter(b => ["CONFIRMED", "PARKED"].includes(b.status)).length, color: "#4ade80", icon: <Users size={18} /> },
    { label: "Completed", val: bookings.filter(b => b.status === "COMPLETED").length, color: "#aaa", icon: <CheckCircle size={18} /> },
    { label: "Total Revenue", val: `₹${bookings.reduce((s, b) => s + (b.totalAmount || 0), 0).toFixed(2)}`, color: "#a78bfa", icon: <DollarSign size={18} /> },
  ];

  if (loading) return <div style={S.loading}><style>{css}</style><div style={S.spinner} /></div>;

  return (
    <>
      <style>{css}</style>
      <div style={S.shell}>
        <div style={S.inner}>

          {/* Header */}
          <div style={S.topRow}>
            <div>
              <button style={S.backBtn} onClick={() => navigate("/admin-dashboard")} className="dark-btn">
                <ArrowLeft size={15} /> Back to Dashboard
              </button>
              <div style={{ height: 16 }} />
              {lot && <>
                <h1 style={S.lotName}>{lot.name}</h1>
                <p style={S.lotAddr}>{lot.address}</p>
              </>}
            </div>
          </div>

          {/* Stats */}
          <div style={S.statsGrid}>
            {stats.map(s => (
              <div key={s.label} style={S.statCard}>
                <p style={S.statLabel}>{s.label}</p>
                <p style={{ ...S.statVal, color: s.color }}>{s.val}</p>
              </div>
            ))}
          </div>

          {/* Table */}
          <div style={S.tableCard}>
            <div style={S.tableHead}>
              {["Booking ID", "User", "Vehicle", "Time", "Status", "Amount"].map(h => (
                <div key={h} style={S.headCell}>{h}</div>
              ))}
            </div>

            {bookings.length === 0 ? (
              <div style={S.emptyWrap}>
                <div style={S.emptyIcon}>📭</div>
                <p style={S.emptyTitle}>No Bookings Yet</p>
                <p style={S.emptyDesc}>This lot has no recorded bookings</p>
              </div>
            ) : (
              bookings.map(b => (
                <div key={b.id} style={S.tableRow} className="lot-row">
                  <div><span style={S.idBadge}>#{b.id}</span></div>
                  <div>
                    <p style={S.cellPrimary}>{b.user?.name || "Unknown"}</p>
                    <p style={S.cellSub}>{b.user?.email || ""}</p>
                  </div>
                  <div>
                    <p style={S.cellPrimary}>{b.vehicleType || "N/A"}</p>
                    {b.vehicleNumber && <p style={S.cellSub}>{b.vehicleNumber}</p>}
                  </div>
                  <div>
                    <p style={{ ...S.cellSub, color: "#bbb" }}>▶ {fmt(b.startTime)}</p>
                    {b.endTime && <p style={S.cellSub}>■ {fmt(b.endTime)}</p>}
                  </div>
                  <div><StatusBadge status={b.status} /></div>
                  <div><span style={{ fontSize: 14, fontWeight: 700, color: "#4ade80" }}>₹{b.totalAmount?.toFixed(2) || "0.00"}</span></div>
                </div>
              ))
            )}
          </div>

        </div>
      </div>
    </>
  );
}

export default LotBookings;