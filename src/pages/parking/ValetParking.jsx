// import { useEffect, useState } from "react";
// import axios from "axios";

// function ValetDashboard() {
//   const [queue, setQueue] = useState([]);
//   const [myJob, setMyJob] = useState(null);

//   useEffect(() => {
//     fetchQueue();
//     const interval = setInterval(fetchQueue, 5000); // Auto-refresh every 5s
//     return () => clearInterval(interval);
//   }, []);

//   const fetchQueue = () => {
//     const token = localStorage.getItem("token"); // 🔑
    
//     axios.get("https://smartparking-backend-1.onrender.com/api/bookings/valet/queue", {
//   headers: { Authorization: `Bearer ${token}` }
// })
//       .then(res => setQueue(res.data))
//       .catch(err => console.error(err));
//   };

//   const handleAccept = (bookingId) => {
//     const token = localStorage.getItem("token"); // 🔑
    
//     axios.post(`https://smartparking-backend-1.onrender.com/api/bookings/${bookingId}/pickup`, {}, {
//   headers: { Authorization: `Bearer ${token}` }
// })
//       .then(res => {
//         setMyJob(res.data);
//         fetchQueue();
//       });
//   };
//   const handleReaject = (bookingId) => {
//     // Note: Assuming rejection logic also hits an endpoint, added token here too
//     const token = localStorage.getItem("token");
//     // You likely want a different endpoint for reject, but keeping your URL for now:
//    axios.post(`https://smartparking-backend-1.onrender.com/api/bookings/${bookingId}/pickup`, {}, {
//   headers: { Authorization: `Bearer ${token}` }
// })
//       .then(res => {
//         setMyJob(res.data);
//         fetchQueue();
//       });
//   };

//   return (
//     <div className="min-h-screen bg-slate-900 text-white p-6 font-sans">
//       <h1 className="text-2xl font-black mb-6 uppercase tracking-widest text-indigo-400">
//         Valet Control Center
//       </h1>

//       {myJob ? (
//         /* --- ACTIVE JOB VIEW --- */
//         <div className="bg-indigo-600 p-8 rounded-[2rem] shadow-2xl animate-pulse">
//           <h2 className="text-sm font-bold uppercase mb-2">Active Task</h2>
//           <p className="text-3xl font-black mb-4 uppercase">Pick up {myJob.user.name}'s Car</p>
//           <div className="bg-white/10 p-4 rounded-xl mb-6">
//             <p className="text-xs uppercase opacity-70">User Location</p>
//             <p className="font-mono text-lg">{myJob.pickupLat}, {myJob.pickupLng}</p>
//           </div>
//           <button className="w-full bg-white text-indigo-600 py-4 rounded-2xl font-black uppercase tracking-widest">
//             I have the keys
//           </button>
//         </div>
//       ) : (
//         /* --- QUEUE VIEW --- */
//         <div className="space-y-4">
//           <h3 className="text-gray-500 font-bold uppercase text-xs">Incoming Requests ({queue.length})</h3>
//           {queue.map(request => (
//             <div key={request.id} className="bg-slate-800 p-6 rounded-3xl border border-slate-700 flex justify-between items-center">
//               <div>
//                 <p className="font-bold text-lg">{request.user.name}</p>
//                 <p className="text-xs text-gray-400">ID: #{request.id} • Waiting for Pickup</p>
//               </div>
//               <button 
//                 onClick={() => handleAccept(request.id)}
//                 className="bg-indigo-500 hover:bg-indigo-400 px-6 py-3 rounded-2xl font-bold transition-all"
//               >
//                 Accept
//               </button>
//               <button 
//                 onClick={() => handleReaject(request.id)}
//                 className="bg-indigo-500 hover:bg-indigo-400 px-6 py-3 rounded-2xl font-bold transition-all"
//               >
//                 reject
//               </button>
//             </div>
//           ))}
//           {queue.length === 0 && <p className="text-slate-600 italic">No pending requests...</p>}
//         </div>
//       )}
//     </div>
//   );
// }

// export default ValetDashboard;




import { useEffect, useState } from "react";
import axios from "axios";
import { Car, Clock, CheckCircle, XCircle, RefreshCw, User, MapPin } from "lucide-react";

/* ── Styles ── */
const S = {
  shell:       { minHeight: "100vh", background: "#0A0A0A", padding: "32px 20px 80px", fontFamily: "'Syne', sans-serif" },
  inner:       { maxWidth: 680, margin: "0 auto" },
  header:      { marginBottom: 32 },
  label:       { display: "inline-flex", alignItems: "center", gap: 8, background: "#C8FF0012", border: "1px solid #C8FF0030", borderRadius: 999, padding: "5px 14px", fontSize: 12, color: "#C8FF00", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 14 },
  labelDot:    { width: 7, height: 7, borderRadius: "50%", background: "#C8FF00", animation: "pulse 2s ease-in-out infinite", display: "inline-block" },
  title:       { fontSize: 28, fontWeight: 800, color: "#fff", letterSpacing: "-0.5px", marginBottom: 4 },
  sub:         { fontSize: 14, color: "#666" },
  activeCard:  { background: "#141414", border: "2px solid #C8FF0040", borderRadius: 24, padding: "28px 26px", marginBottom: 16 },
  activeTag:   { display: "inline-flex", alignItems: "center", gap: 6, background: "#C8FF0015", color: "#C8FF00", borderRadius: 99, padding: "5px 12px", fontSize: 11, fontWeight: 700, marginBottom: 18 },
  activeTitle: { fontSize: 13, color: "#888", fontWeight: 600, marginBottom: 6 },
  activeName:  { fontSize: 26, fontWeight: 800, color: "#fff", marginBottom: 20 },
  locCard:     { background: "#1a1a1a", border: "1px solid #2a2a2a", borderRadius: 14, padding: "14px 16px", marginBottom: 20 },
  locLabel:    { fontSize: 11, fontWeight: 700, color: "#555", textTransform: "uppercase", marginBottom: 6, display: "flex", alignItems: "center", gap: 6 },
  locVal:      { fontFamily: "monospace", fontSize: 15, color: "#C8FF00", fontWeight: 700 },
  keysBtn:     { width: "100%", background: "#C8FF00", color: "#000", border: "none", borderRadius: 14, padding: "14px", fontSize: 15, fontWeight: 800, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 },
  queueTop:    { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 },
  queueLabel:  { fontSize: 12, fontWeight: 700, color: "#555", textTransform: "uppercase", letterSpacing: "0.08em" },
  countBadge:  { background: "#C8FF0015", border: "1px solid #C8FF0025", color: "#C8FF00", borderRadius: 99, padding: "3px 10px", fontSize: 12, fontWeight: 800 },
  reqCard:     { background: "#141414", border: "1px solid #242424", borderRadius: 18, padding: "20px 22px", marginBottom: 12 },
  reqTop:      { display: "flex", alignItems: "center", gap: 12, marginBottom: 16 },
  reqIcon:     { width: 42, height: 42, background: "#1e1e1e", border: "1px solid #2e2e2e", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 },
  reqName:     { fontSize: 16, fontWeight: 700, color: "#fff", marginBottom: 3 },
  reqId:       { fontSize: 12, color: "#666" },
  reqBtns:     { display: "flex", gap: 10 },
  acceptBtn:   { flex: 1, background: "#C8FF00", color: "#000", border: "none", borderRadius: 10, padding: "11px", fontSize: 13, fontWeight: 800, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 },
  rejectBtn:   { flex: 1, background: "#f8717112", border: "1px solid #f8717125", color: "#f87171", borderRadius: 10, padding: "11px", fontSize: 13, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 },
  emptyWrap:   { background: "#141414", border: "1px solid #242424", borderRadius: 18, padding: "60px 24px", textAlign: "center" },
  emptyIcon:   { fontSize: 32, marginBottom: 12 },
  emptyTxt:    { fontSize: 15, color: "#555", fontWeight: 600 },
  refreshBtn:  { display: "inline-flex", alignItems: "center", gap: 7, background: "transparent", border: "1px solid #2e2e2e", color: "#888", borderRadius: 10, padding: "8px 16px", fontSize: 13, fontWeight: 600, cursor: "pointer" },
};

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&display=swap');
  body { font-family: 'Syne', sans-serif; margin: 0; }
  @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(0.85)} }
  .dark-btn:hover { opacity: 0.85; transform: translateY(-1px); }
`;

function ValetDashboard() {
  const [queue, setQueue] = useState([]);
  const [myJob, setMyJob] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchQueue = () => {
    const token = localStorage.getItem("token");
    setRefreshing(true);
    axios.get("https://smartparking-backend-1.onrender.com/api/bookings/valet/queue", { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setQueue(res.data))
      .catch(console.error)
      .finally(() => setRefreshing(false));
  };

  useEffect(() => {
    fetchQueue();
    const interval = setInterval(fetchQueue, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleAccept = (id) => {
    const token = localStorage.getItem("token");
    axios.post(`https://smartparking-backend-1.onrender.com/api/bookings/${id}/pickup`, {}, { headers: { Authorization: `Bearer ${token}` } })
      .then(res => { setMyJob(res.data); fetchQueue(); });
  };

  const handleReject = (id) => {
    const token = localStorage.getItem("token");
    axios.post(`https://smartparking-backend-1.onrender.com/api/bookings/${id}/reject`, {}, { headers: { Authorization: `Bearer ${token}` } })
      .then(() => fetchQueue())
      .catch(() => fetchQueue());
  };

  return (
    <>
      <style>{css}</style>
      <div style={S.shell}>
        <div style={S.inner}>

          {/* Header */}
          <div style={S.header}>
            <span style={S.label}><span style={S.labelDot} /> Valet Console</span>
            <h1 style={S.title}>Valet Control Center</h1>
            <p style={S.sub}>Manage live pickup requests from drivers</p>
          </div>

          {myJob ? (
            /* ── Active Job ── */
            <div style={S.activeCard}>
              <div style={S.activeTag}><Car size={12} /> Active Task</div>
              <p style={S.activeTitle}>Pick up vehicle for</p>
              <p style={S.activeName}>{myJob.user?.name || "Driver"}</p>
              <div style={S.locCard}>
                <div style={S.locLabel}><MapPin size={12} /> Pickup Location</div>
                <div style={S.locVal}>{myJob.pickupLat}, {myJob.pickupLng}</div>
              </div>
              <button style={S.keysBtn} className="dark-btn">
                <CheckCircle size={16} /> I Have the Keys
              </button>
            </div>
          ) : (
            /* ── Queue ── */
            <>
              <div style={S.queueTop}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={S.queueLabel}>Incoming Requests</span>
                  <span style={S.countBadge}>{queue.length}</span>
                </div>
                <button onClick={fetchQueue} style={S.refreshBtn} className="dark-btn">
                  <RefreshCw size={13} style={{ animation: refreshing ? "spin 1s linear infinite" : "none" }} />
                  Refresh
                </button>
              </div>

              {queue.length === 0 ? (
                <div style={S.emptyWrap}>
                  <div style={S.emptyIcon}>🚗</div>
                  <p style={S.emptyTxt}>No pending requests right now</p>
                </div>
              ) : (
                queue.map(req => (
                  <div key={req.id} style={S.reqCard}>
                    <div style={S.reqTop}>
                      <div style={S.reqIcon}><User size={18} color="#C8FF00" /></div>
                      <div>
                        <p style={S.reqName}>{req.user?.name || "Driver"}</p>
                        <p style={S.reqId}>ID: #{req.id} · Waiting for pickup</p>
                      </div>
                    </div>
                    <div style={S.reqBtns}>
                      <button onClick={() => handleAccept(req.id)} style={S.acceptBtn} className="dark-btn">
                        <CheckCircle size={14} /> Accept
                      </button>
                      <button onClick={() => handleReject(req.id)} style={S.rejectBtn} className="dark-btn">
                        <XCircle size={14} /> Reject
                      </button>
                    </div>
                  </div>
                ))
              )}
            </>
          )}

        </div>
      </div>
    </>
  );
}

export default ValetDashboard;