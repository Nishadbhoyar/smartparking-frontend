// import { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { Car, CreditCard, X, Phone, ArrowRight, MapPin } from "lucide-react";

// function ParkingLotBooking({ lot, user, onClose }) {
//   const navigate = useNavigate();

//   const [selectedVehicle, setSelectedVehicle] = useState("CAR");
//   const [fullLotData, setFullLotData] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [fetchingData, setFetchingData] = useState(true);
//   const [vehicleNumber, setVehicleNumber] = useState("");
//   const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber || "");
//   const [startTime, setStartTime] = useState("");
//   const [endTime, setEndTime] = useState("");
//   const [totalPrice, setTotalPrice] = useState(0);
//   const [durationHours, setDurationHours] = useState(0);

//   useEffect(() => {
//     const now = new Date();
//     now.setMinutes(Math.ceil(now.getMinutes() / 15) * 15, 0, 0);
//     const twoHoursLater = new Date(now.getTime() + 2 * 60 * 60 * 1000);
    
//     const formatTime = (date) => {
//         const offset = date.getTimezoneOffset() * 60000;
//         return new Date(date.getTime() - offset).toISOString().slice(0, 16);
//     };
    
//     setStartTime(formatTime(now));
//     setEndTime(formatTime(twoHoursLater));

//     const fetchLotDetails = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const config = { headers: { Authorization: `Bearer ${token}` } };
//         const res = await axios.get(`http://localhost:8080/api/parking-lots/${lot.id}`, config);
//         setFullLotData(res.data);
//       } catch (err) {
//         if (err.response?.status === 401) navigate("/login");
//       } finally {
//         setFetchingData(false);
//       }
//     };
//     if (lot?.id) fetchLotDetails();
//   }, [lot, navigate]);

//   const getSlotDetails = () => {
//     if (!fullLotData || !fullLotData.slots) return null;
//     return fullLotData.slots.find((s) => s.vehicleType === selectedVehicle);
//   };
//   const slotDetails = getSlotDetails();
//   const isVehicleAvailable = !!slotDetails;

//   useEffect(() => {
//     if (startTime && endTime && slotDetails) {
//       const start = new Date(startTime);
//       const end = new Date(endTime);
//       const diffMs = end - start;
//       const diffHrs = Math.max(1, Math.ceil(diffMs / (1000 * 60 * 60))); 
//       setDurationHours(diffHrs);
//       setTotalPrice(diffHrs * slotDetails.price);
//     }
//   }, [startTime, endTime, slotDetails, selectedVehicle]);

//   const handleQuickDuration = (hours) => {
//     if (!startTime) return;
//     const start = new Date(startTime);
//     const newEnd = new Date(start.getTime() + hours * 60 * 60 * 1000);
//     const offset = newEnd.getTimezoneOffset() * 60000;
//     setEndTime(new Date(newEnd.getTime() - offset).toISOString().slice(0, 16));
//   };

//   const handleConfirmBooking = async () => {
//     if (!vehicleNumber.trim() || !phoneNumber.trim()) return alert("Please enter details");
//     if (new Date(endTime) <= new Date(startTime)) return alert("End time invalid");

//     setLoading(true);
//     const token = localStorage.getItem("token");
//     const config = { headers: { Authorization: `Bearer ${token}` } };

//     const bookingData = {
//       user: { id: user.id },
//       lot: { id: lot.id },
//       vehicleType: selectedVehicle,
//       vehicleNumber: vehicleNumber.toUpperCase(),
//       contactNumber: phoneNumber,
//       serviceType: "SELF",
//       status: "CONFIRMED",
//       startTime: new Date(startTime).toISOString(),
//       endTime: new Date(endTime).toISOString(),
//       totalAmount: totalPrice
//     };

//     try {
//       await axios.post("http://localhost:8080/api/bookings", bookingData, config);
//       alert("Booking Successful! 🎟️");
//       navigate("/user-dashboard");
//     } catch (err) {
//       alert("Failed: " + (err.response?.data || "Error"));
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (fetchingData) return null;

//   return (
//     <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center z-[9999] p-4 animate-in fade-in zoom-in-95 duration-200">
//       <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl flex flex-col md:flex-row overflow-hidden max-h-[85vh]">
        
//         {/* === LEFT PANEL === */}
//         <div className="flex-1 p-6 overflow-y-auto no-scrollbar">
            
//             <div className="flex justify-between items-start mb-5">
//                 <div>
//                     <h2 className="text-xl font-black text-slate-800 tracking-tight">Reserve Spot</h2>
//                     <div className="flex items-center gap-1.5 mt-1 text-slate-500 text-xs font-bold">
//                         <MapPin className="w-3.5 h-3.5 text-indigo-500" />
//                         <span>{fullLotData?.name || lot.name}</span>
//                     </div>
//                 </div>
//                 <button onClick={onClose} className="p-1.5 hover:bg-slate-100 rounded-full transition-colors">
//                     <X className="w-5 h-5 text-slate-400" />
//                 </button>
//             </div>

//             <div className="mb-6">
//                 <div className="grid grid-cols-3 gap-3">
//                     {[
//                         { id: 'BIKE', label: 'Bike', icon: '🏍️' },
//                         { id: 'CAR', label: 'Car', icon: '🚗' },
//                         { id: 'HEAVY', label: 'Heavy', icon: '🚛' }
//                     ].map((v) => {
//                         const isSupported = fullLotData?.slots?.some(s => s.vehicleType === v.id);
//                         const isSelected = selectedVehicle === v.id;
//                         return (
//                             <button
//                                 key={v.id}
//                                 disabled={!isSupported}
//                                 onClick={() => setSelectedVehicle(v.id)}
//                                 className={`h-16 rounded-xl border-2 transition-all flex flex-col items-center justify-center gap-1
//                                     ${!isSupported ? 'opacity-30 grayscale cursor-not-allowed bg-slate-50' : ''}
//                                     ${isSelected ? 'border-indigo-600 bg-indigo-50/50 shadow-md' : 'border-slate-100 bg-white hover:border-indigo-200'}
//                                 `}
//                             >
//                                 <span className="text-xl">{v.icon}</span>
//                                 <span className={`text-[10px] font-black uppercase ${isSelected ? 'text-indigo-700' : 'text-slate-400'}`}>{v.label}</span>
//                             </button>
//                         );
//                     })}
//                 </div>
//             </div>

//             <div className="mb-6">
//                  <div className="relative pl-4 border-l-2 border-dashed border-slate-200 space-y-3">
//                     <div className="relative">
//                         <div className="absolute -left-[21px] top-3 w-3 h-3 bg-emerald-500 rounded-full ring-2 ring-white"></div>
//                         <div className="bg-slate-50 px-3 py-2 rounded-xl border border-slate-200 focus-within:border-emerald-400 focus-within:ring-1 focus-within:ring-emerald-200 transition-all">
//                             <label className="text-[9px] font-bold text-emerald-600 uppercase block">Arrive</label>
//                             <input 
//                                 type="datetime-local" 
//                                 className="w-full bg-transparent font-bold text-slate-700 outline-none text-xs font-mono"
//                                 value={startTime}
//                                 onChange={(e) => setStartTime(e.target.value)}
//                             />
//                         </div>
//                     </div>

//                     <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar pl-1">
//                         {[1, 2, 3, 4, 12, 24].map(h => (
//                             <button key={h} onClick={() => handleQuickDuration(h)}
//                                 className={`px-2.5 py-1 rounded-md text-[10px] font-bold border transition-all whitespace-nowrap
//                                     ${durationHours === h ? "bg-indigo-600 text-white border-indigo-600" : "bg-white text-slate-500 border-slate-200 hover:border-indigo-300"}
//                                 `}
//                             >+{h}h</button>
//                         ))}
//                     </div>

//                     <div className="relative">
//                         <div className="absolute -left-[21px] top-3 w-3 h-3 bg-rose-500 rounded-full ring-2 ring-white"></div>
//                         <div className="bg-slate-50 px-3 py-2 rounded-xl border border-slate-200 focus-within:border-rose-400 focus-within:ring-1 focus-within:ring-rose-200 transition-all">
//                             <label className="text-[9px] font-bold text-rose-500 uppercase block">Depart</label>
//                             <input 
//                                 type="datetime-local" 
//                                 className="w-full bg-transparent font-bold text-slate-700 outline-none text-xs font-mono"
//                                 value={endTime}
//                                 onChange={(e) => setEndTime(e.target.value)}
//                             />
//                         </div>
//                     </div>
//                  </div>
//             </div>

//             <div className="grid grid-cols-2 gap-3">
//                 <div className="bg-white px-3 py-2 rounded-xl border border-slate-200 flex items-center gap-2">
//                     <Car className="text-slate-300 w-4 h-4" />
//                     <div>
//                         <label className="text-[9px] font-bold text-slate-400 uppercase block leading-none">Vehicle No</label>
//                         <input placeholder="MH-12-AB-1234" className="w-full font-bold text-slate-700 text-xs outline-none uppercase placeholder:font-normal"
//                             value={vehicleNumber} onChange={(e) => setVehicleNumber(e.target.value)} />
//                     </div>
//                 </div>
//                 <div className="bg-white px-3 py-2 rounded-xl border border-slate-200 flex items-center gap-2">
//                     <Phone className="text-slate-300 w-4 h-4" />
//                     <div>
//                         <label className="text-[9px] font-bold text-slate-400 uppercase block leading-none">Mobile</label>
//                         <input placeholder="9876543210" className="w-full font-bold text-slate-700 text-xs outline-none placeholder:font-normal"
//                             value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
//                     </div>
//                 </div>
//             </div>
//         </div>

//         {/* === RIGHT PANEL === */}
//         <div className="w-full md:w-72 bg-slate-50 border-l border-slate-200 p-6 flex flex-col justify-between relative">
//             <div className="absolute top-0 right-0 p-20 bg-indigo-500/5 rounded-full blur-2xl pointer-events-none" />

//             <div>
//                 <h3 className="font-black text-slate-800 text-sm uppercase tracking-widest mb-4 flex items-center gap-2">
//                     <CreditCard className="w-4 h-4 text-indigo-600" /> Summary
//                 </h3>

//                 <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3 relative overflow-hidden">
//                     <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-violet-500" />
//                     <div className="flex justify-between items-center text-xs">
//                         <span className="text-slate-500 font-medium">Rate</span>
//                         <span className="font-bold text-slate-800">₹{slotDetails?.price || 0}/hr</span>
//                     </div>
//                     <div className="flex justify-between items-center text-xs">
//                         <span className="text-slate-500 font-medium">Time</span>
//                         <span className="font-bold text-slate-800">{durationHours} hrs</span>
//                     </div>
//                     <div className="my-1 border-t border-dashed border-slate-100"></div>
//                     <div className="flex justify-between items-end">
//                         <span className="text-slate-500 font-bold text-[10px] uppercase">Total</span>
//                         <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-br from-indigo-600 to-violet-600">
//                             ₹{totalPrice}
//                         </span>
//                     </div>
//                 </div>
                
//                 {isVehicleAvailable && slotDetails.capacity < 5 && (
//                     <p className="mt-3 text-center text-[10px] text-amber-600 font-bold bg-amber-50 py-1 rounded-md border border-amber-100">
//                         🔥 Only {slotDetails.capacity} spots left!
//                     </p>
//                 )}
//             </div>

//             <div className="mt-6 space-y-2">
//                 <button
//                     onClick={handleConfirmBooking}
//                     disabled={loading || !isVehicleAvailable || !vehicleNumber || !phoneNumber || totalPrice <= 0}
//                     className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white text-sm font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
//                 >
//                     {loading ? "Processing..." : "Confirm Booking"}
//                     {!loading && <ArrowRight className="w-4 h-4" />}
//                 </button>

//                 <div className="text-center text-[9px] text-slate-400 font-medium flex items-center justify-center gap-1">
//                     <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></div> Instant Confirmation
//                 </div>
//             </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ParkingLotBooking;




import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Car, CreditCard, X, Phone, ArrowRight, MapPin } from "lucide-react";

/* ── Styles ── */
const S = {
  overlay:   { position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 9999, padding: 16 },
  modal:     { background: "#141414", border: "1px solid #242424", borderRadius: 24, width: "100%", maxWidth: 700, display: "flex", overflow: "hidden", maxHeight: "90vh" },
  left:      { flex: 1, padding: "28px 24px", overflowY: "auto" },
  right:     { width: 280, background: "#0e0e0e", borderLeft: "1px solid #1e1e1e", padding: "28px 22px", display: "flex", flexDirection: "column", justifyContent: "space-between" },
  topRow:    { display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 22 },
  title:     { fontSize: 18, fontWeight: 800, color: "#fff", letterSpacing: "-0.3px", marginBottom: 4 },
  lotSub:    { display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#888", fontWeight: 600 },
  closeBtn:  { background: "#1e1e1e", border: "1px solid #2e2e2e", borderRadius: 8, padding: 6, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 },
  secLabel:  { fontSize: 11, fontWeight: 700, color: "#555", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 12 },
  vGrid:     { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginBottom: 22 },
  vCard:     (active, supported) => ({
    height: 64, borderRadius: 14, border: `2px solid ${active ? "#C8FF00" : "#242424"}`, background: active ? "#C8FF0010" : "#1a1a1a",
    display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 4,
    cursor: supported ? "pointer" : "not-allowed", opacity: supported ? 1 : 0.3, transition: "all 0.15s",
  }),
  vLabel:    (active) => ({ fontSize: 10, fontWeight: 700, textTransform: "uppercase", color: active ? "#C8FF00" : "#555" }),
  timeline:  { borderLeft: "2px dashed #2a2a2a", paddingLeft: 16, marginBottom: 20 },
  timeBlock: { background: "#1a1a1a", border: "1px solid #2a2a2a", borderRadius: 12, padding: "10px 14px", marginBottom: 4 },
  timeLbl:   (color) => ({ fontSize: 9, fontWeight: 700, textTransform: "uppercase", color, display: "block", marginBottom: 3 }),
  timeInput: { width: "100%", background: "transparent", border: "none", outline: "none", color: "#fff", fontSize: 12, fontWeight: 700, fontFamily: "monospace" },
  quickRow:  { display: "flex", gap: 6, overflowX: "auto", paddingBottom: 4, marginBottom: 12 },
  quickBtn:  (active) => ({ padding: "5px 10px", borderRadius: 7, border: `1px solid ${active ? "#C8FF00" : "#2e2e2e"}`, background: active ? "#C8FF00" : "#1a1a1a", color: active ? "#000" : "#888", fontSize: 11, fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap" }),
  inputRow:  { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 },
  inputBox:  { background: "#1a1a1a", border: "1px solid #2e2e2e", borderRadius: 12, padding: "10px 14px", display: "flex", alignItems: "center", gap: 10 },
  inputLbl:  { fontSize: 9, fontWeight: 700, color: "#555", textTransform: "uppercase", display: "block", marginBottom: 3 },
  inputField:{ width: "100%", background: "transparent", border: "none", outline: "none", color: "#fff", fontSize: 12, fontWeight: 700, fontFamily: "'Syne', sans-serif" },
  rTitle:    { fontSize: 13, fontWeight: 700, color: "#fff", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 18, display: "flex", alignItems: "center", gap: 8 },
  sumCard:   { background: "#141414", border: "1px solid #242424", borderRadius: 16, padding: "16px", marginBottom: 12 },
  sumRow:    { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 },
  sumLabel:  { fontSize: 12, color: "#666", fontWeight: 600 },
  sumVal:    { fontSize: 13, fontWeight: 700, color: "#fff" },
  sumDivider:{ height: 1, background: "#1e1e1e", margin: "10px 0" },
  totalVal:  { fontSize: 30, fontWeight: 800, color: "#C8FF00" },
  confirmBtn:(disabled) => ({
    width: "100%", background: disabled ? "#1e1e1e" : "#C8FF00", color: disabled ? "#444" : "#000",
    border: "none", borderRadius: 12, padding: "13px", fontSize: 14, fontWeight: 800,
    cursor: disabled ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 8,
  }),
  instBadge: { display: "flex", alignItems: "center", justifyContent: "center", gap: 6, fontSize: 11, color: "#555", fontWeight: 600 },
  dot:       { width: 6, height: 6, borderRadius: "50%", background: "#4ade80" },
  warnPill:  { background: "#fbbf2412", border: "1px solid #fbbf2425", color: "#fbbf24", borderRadius: 8, padding: "6px 10px", fontSize: 11, fontWeight: 700, textAlign: "center", marginTop: 10 },
};

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&display=swap');
  .dark-input:focus { border-color: #C8FF00 !important; }
  input[type="datetime-local"]::-webkit-calendar-picker-indicator { filter: invert(1) opacity(0.4); cursor: pointer; }
`;

function ParkingLotBooking({ lot, user, onClose }) {
  const navigate = useNavigate();
  const [selectedVehicle, setSelectedVehicle] = useState("CAR");
  const [fullLotData, setFullLotData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetchingData, setFetchingData] = useState(true);
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber || "");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [durationHours, setDurationHours] = useState(0);

  useEffect(() => {
    const now = new Date();
    now.setMinutes(Math.ceil(now.getMinutes() / 15) * 15, 0, 0);
    const later = new Date(now.getTime() + 2 * 60 * 60 * 1000);
    const fmt = d => { const o = d.getTimezoneOffset() * 60000; return new Date(d.getTime() - o).toISOString().slice(0, 16); };
    setStartTime(fmt(now)); setEndTime(fmt(later));

    const fetch = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`http://localhost:8080/api/parking-lots/${lot.id}`, { headers: { Authorization: `Bearer ${token}` } });
        setFullLotData(res.data);
      } catch (err) { if (err.response?.status === 401) navigate("/login"); }
      finally { setFetchingData(false); }
    };
    if (lot?.id) fetch();
  }, [lot, navigate]);

  const slotDetails = fullLotData?.slots?.find(s => s.vehicleType === selectedVehicle) || null;
  const isAvailable = !!slotDetails;

  useEffect(() => {
    if (startTime && endTime && slotDetails) {
      const diffHrs = Math.max(1, Math.ceil((new Date(endTime) - new Date(startTime)) / 3600000));
      setDurationHours(diffHrs);
      setTotalPrice(diffHrs * slotDetails.price);
    }
  }, [startTime, endTime, slotDetails, selectedVehicle]);

  const setQuick = (h) => {
    if (!startTime) return;
    const end = new Date(new Date(startTime).getTime() + h * 3600000);
    const o = end.getTimezoneOffset() * 60000;
    setEndTime(new Date(end.getTime() - o).toISOString().slice(0, 16));
  };

  const handleConfirm = async () => {
    if (!vehicleNumber.trim() || !phoneNumber.trim()) return alert("Please enter all details");
    if (new Date(endTime) <= new Date(startTime)) return alert("End time must be after start time");
    setLoading(true);
    const token = localStorage.getItem("token");
    try {
      await axios.post("http://localhost:8080/api/bookings", {
        user: { id: user.id }, lot: { id: lot.id },
        vehicleType: selectedVehicle, vehicleNumber: vehicleNumber.toUpperCase(),
        contactNumber: phoneNumber, serviceType: "SELF", status: "CONFIRMED",
        startTime: new Date(startTime).toISOString(), endTime: new Date(endTime).toISOString(), totalAmount: totalPrice
      }, { headers: { Authorization: `Bearer ${token}` } });
      alert("Booking Successful!");
      navigate("/user-dashboard");
    } catch (err) { alert("Failed: " + (err.response?.data || "Error")); }
    finally { setLoading(false); }
  };

  if (fetchingData) return null;

  const vehicles = [{ id: "BIKE", label: "Bike", icon: "🏍️" }, { id: "CAR", label: "Car", icon: "🚗" }, { id: "HEAVY", label: "Heavy", icon: "🚛" }];

  return (
    <>
      <style>{css}</style>
      <div style={S.overlay}>
        <div style={S.modal}>

          {/* LEFT */}
          <div style={S.left}>
            <div style={S.topRow}>
              <div>
                <h2 style={S.title}>Reserve Spot</h2>
                <div style={S.lotSub}><MapPin size={12} color="#C8FF00" />{fullLotData?.name || lot.name}</div>
              </div>
              <button onClick={onClose} style={S.closeBtn}><X size={16} color="#888" /></button>
            </div>

            {/* Vehicle Picker */}
            <p style={S.secLabel}>Vehicle Type</p>
            <div style={S.vGrid}>
              {vehicles.map(v => {
                const supported = fullLotData?.slots?.some(s => s.vehicleType === v.id);
                const active = selectedVehicle === v.id;
                return (
                  <button key={v.id} disabled={!supported} onClick={() => setSelectedVehicle(v.id)} style={S.vCard(active, supported)}>
                    <span style={{ fontSize: 22 }}>{v.icon}</span>
                    <span style={S.vLabel(active)}>{v.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Timeline */}
            <p style={S.secLabel}>Duration</p>
            <div style={S.timeline}>
              <div style={S.timeBlock}>
                <label style={S.timeLbl("#4ade80")}>Arrive</label>
                <input type="datetime-local" style={S.timeInput} value={startTime} onChange={e => setStartTime(e.target.value)} />
              </div>
              <div style={S.quickRow}>
                {[1, 2, 3, 4, 12, 24].map(h => (
                  <button key={h} onClick={() => setQuick(h)} style={S.quickBtn(durationHours === h)}>+{h}h</button>
                ))}
              </div>
              <div style={S.timeBlock}>
                <label style={S.timeLbl("#f87171")}>Depart</label>
                <input type="datetime-local" style={S.timeInput} value={endTime} onChange={e => setEndTime(e.target.value)} />
              </div>
            </div>

            {/* Vehicle & Phone */}
            <p style={S.secLabel}>Details</p>
            <div style={S.inputRow}>
              <div style={S.inputBox}>
                <Car size={14} color="#555" />
                <div style={{ flex: 1 }}>
                  <label style={S.inputLbl}>Vehicle No.</label>
                  <input style={S.inputField} placeholder="MH-12-AB-1234" value={vehicleNumber} onChange={e => setVehicleNumber(e.target.value)} />
                </div>
              </div>
              <div style={S.inputBox}>
                <Phone size={14} color="#555" />
                <div style={{ flex: 1 }}>
                  <label style={S.inputLbl}>Mobile</label>
                  <input style={S.inputField} placeholder="9876543210" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} />
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div style={S.right}>
            <div>
              <div style={S.rTitle}><CreditCard size={15} color="#C8FF00" /> Summary</div>
              <div style={S.sumCard}>
                <div style={S.sumRow}><span style={S.sumLabel}>Rate</span><span style={S.sumVal}>₹{slotDetails?.price || 0}/hr</span></div>
                <div style={S.sumRow}><span style={S.sumLabel}>Duration</span><span style={S.sumVal}>{durationHours}h</span></div>
                <div style={S.sumDivider} />
                <div style={S.sumRow}>
                  <span style={{ ...S.sumLabel, fontSize: 11, textTransform: "uppercase" }}>Total</span>
                  <span style={S.totalVal}>₹{totalPrice}</span>
                </div>
              </div>
              {isAvailable && slotDetails.capacity < 5 && (
                <div style={S.warnPill}>🔥 Only {slotDetails.capacity} spots left!</div>
              )}
            </div>

            <div>
              <button style={S.confirmBtn(!isAvailable || !vehicleNumber || !phoneNumber || totalPrice <= 0 || loading)}
                disabled={!isAvailable || !vehicleNumber || !phoneNumber || totalPrice <= 0 || loading}
                onClick={handleConfirm}>
                {loading ? "Processing…" : "Confirm Booking"} {!loading && <ArrowRight size={15} />}
              </button>
              <div style={S.instBadge}><div style={S.dot} /> Instant Confirmation</div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

export default ParkingLotBooking;
