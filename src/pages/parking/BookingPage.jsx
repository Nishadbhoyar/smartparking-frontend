// import { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";

// function BookingPage() {
//   const { lotId } = useParams();
//   const navigate = useNavigate();
//   const [user, setUser] = useState(null);
//   const [lot, setLot] = useState(null);
//   const [loading, setLoading] = useState(true);
  
//   const [formData, setFormData] = useState({
//     vehicleType: "CAR",
//     startTime: "",
//     endTime: "",
//   });

//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     if (!storedUser) {
//       alert("Please login first!");
//       navigate("/login");
//       return;
//     }
    
//     const userData = JSON.parse(storedUser);
//     setUser(userData);

//     // Fetch parking lot details
//     axios.get(`http://localhost:8080/api/parking-lots/${lotId}`)
//       .then((response) => {
//         setLot(response.data);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error("Error fetching lot:", error);
//         alert("Failed to load parking lot details");
//         setLoading(false);
//       });
//   }, [navigate, lotId]);

//   const getPrice = () => {
//     if (!lot || !lot.slots) return 50;
    
//     const slot = lot.slots.find(s => s.vehicleType === formData.vehicleType);
//     return slot ? slot.price : 50;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     const bookingData = {
//       user: { id: user.id },
//       lot: { id: lotId },
//       vehicleType: formData.vehicleType,
//       serviceType: "SELF",
//       status: "CONFIRMED",
//       startTime: formData.startTime,
//       endTime: formData.endTime,
//       totalAmount: getPrice()
//     };

//     try {
//       const response = await axios.post("http://localhost:8080/api/bookings", bookingData);
//       alert(`Booking Confirmed! ✅ Booking ID: #${response.data.id}`);
//       navigate("/dashboard");
//     } catch (error) {
//       console.error("Booking Error:", error);
//       alert("Failed to book spot: " + (error.response?.data || error.message));
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-100">
//         <div className="animate-spin w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full"></div>
//       </div>
//     );
//   }

//   if (!lot) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-100">
//         <div className="bg-white p-8 rounded-lg shadow-lg">
//           <p className="text-red-600 font-bold">Parking lot not found</p>
//           <button 
//             onClick={() => navigate("/dashboard")}
//             className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
//           >
//             Back to Dashboard
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="bg-white p-8 rounded-lg shadow-lg w-96">
//         <h2 className="text-2xl font-bold mb-6 text-blue-600">Book Parking Spot</h2>
        
//         <div className="mb-4 p-4 bg-blue-50 rounded-lg">
//           <h3 className="font-bold text-blue-900">{lot.name}</h3>
//           <p className="text-sm text-blue-700">{lot.address}</p>
//         </div>
        
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block text-gray-700 text-sm font-bold mb-2">Vehicle Type</label>
//             <select
//               required
//               className="w-full p-2 border rounded"
//               value={formData.vehicleType}
//               onChange={(e) => setFormData({...formData, vehicleType: e.target.value})}
//             >
//               <option value="CAR">Car</option>
//               <option value="BIKE">Bike</option>
//               <option value="HEAVY">Heavy Vehicle</option>
//               <option value="CYCLE">Cycle</option>
//             </select>
//           </div>

//           <div>
//             <label className="block text-gray-700 text-sm font-bold mb-2">Start Time</label>
//             <input
//               type="datetime-local"
//               required
//               className="w-full p-2 border rounded"
//               value={formData.startTime}
//               onChange={(e) => setFormData({...formData, startTime: e.target.value})}
//             />
//           </div>

//           <div>
//             <label className="block text-gray-700 text-sm font-bold mb-2">End Time</label>
//             <input
//               type="datetime-local"
//               required
//               className="w-full p-2 border rounded"
//               value={formData.endTime}
//               onChange={(e) => setFormData({...formData, endTime: e.target.value})}
//             />
//           </div>

//           <div className="bg-gray-50 p-3 rounded text-sm text-gray-600">
//             <p>Parking Lot: {lot.name}</p>
//             <p className="font-bold text-green-600">Price: ₹{getPrice()}/hr</p>
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 font-bold"
//           >
//             Confirm Booking
//           </button>

//           <button
//             type="button"
//             onClick={() => navigate("/dashboard")}
//             className="w-full bg-gray-400 text-white py-2 rounded hover:bg-gray-500 font-bold"
//           >
//             Cancel
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default BookingPage;


import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Car, Clock, MapPin, ArrowLeft, CheckCircle } from "lucide-react";

/* ── Styles ── */
const S = {
  shell:     { minHeight: "100vh", background: "#0A0A0A", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 16px", fontFamily: "'Syne', sans-serif" },
  loading:   { minHeight: "100vh", background: "#0A0A0A", display: "flex", alignItems: "center", justifyContent: "center" },
  spinner:   { width: 44, height: 44, border: "3px solid #1e1e1e", borderTop: "3px solid #C8FF00", borderRadius: "50%", animation: "spin 0.8s linear infinite" },
  card:      { width: "100%", maxWidth: 440, background: "#141414", border: "1px solid #242424", borderRadius: 24, padding: "32px 28px" },
  backBtn:   { display: "inline-flex", alignItems: "center", gap: 7, background: "transparent", border: "none", color: "#888", fontSize: 13, fontWeight: 600, cursor: "pointer", marginBottom: 24, padding: 0 },
  header:    { marginBottom: 24 },
  title:     { fontSize: 22, fontWeight: 800, color: "#fff", letterSpacing: "-0.5px", marginBottom: 4 },
  lotCard:   { background: "#1a1a1a", border: "1px solid #2a2a2a", borderRadius: 14, padding: "14px 16px", marginBottom: 24 },
  lotName:   { fontSize: 15, fontWeight: 700, color: "#fff", marginBottom: 4 },
  lotAddr:   { fontSize: 13, color: "#888", display: "flex", alignItems: "center", gap: 6 },
  label:     { display: "block", fontSize: 12, fontWeight: 600, color: "#888", marginBottom: 7 },
  select:    { width: "100%", background: "#1a1a1a", border: "1px solid #2e2e2e", borderRadius: 12, padding: "13px 16px", fontSize: 14, color: "#fff", outline: "none", boxSizing: "border-box", cursor: "pointer", fontFamily: "'Syne', sans-serif", marginBottom: 16 },
  input:     { width: "100%", background: "#1a1a1a", border: "1px solid #2e2e2e", borderRadius: 12, padding: "13px 16px", fontSize: 14, color: "#fff", outline: "none", boxSizing: "border-box", fontFamily: "'Syne', sans-serif", marginBottom: 16 },
  pricePill: { background: "#C8FF0012", border: "1px solid #C8FF0025", borderRadius: 12, padding: "12px 16px", marginBottom: 24, display: "flex", alignItems: "center", justifyContent: "space-between" },
  priceLabel:{ fontSize: 13, color: "#888", fontWeight: 600 },
  priceVal:  { fontSize: 18, fontWeight: 800, color: "#C8FF00" },
  confirmBtn:{ width: "100%", background: "#C8FF00", color: "#000", border: "none", borderRadius: 12, padding: "14px", fontSize: 15, fontWeight: 800, cursor: "pointer", marginBottom: 10, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 },
  cancelBtn: { width: "100%", background: "transparent", border: "1px solid #2e2e2e", color: "#888", borderRadius: 12, padding: "13px", fontSize: 14, fontWeight: 600, cursor: "pointer" },
  fieldGroup:{ marginBottom: 16 },
};

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&display=swap');
  body { font-family: 'Syne', sans-serif; margin: 0; }
  @keyframes spin { to { transform: rotate(360deg); } }
  .dark-input:focus { border-color: #C8FF00 !important; box-shadow: 0 0 0 3px #C8FF0015; }
  .dark-btn:hover { opacity: 0.85; }
  select option { background: #1a1a1a; color: #fff; }
`;

function BookingPage() {
  const { lotId } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [lot, setLot] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ vehicleType: "CAR", startTime: "", endTime: "" });

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (!stored) { alert("Please login first!"); navigate("/login"); return; }
    setUser(JSON.parse(stored));
    axios.get(`http://localhost:8080/api/parking-lots/${lotId}`)
      .then(r => { setLot(r.data); setLoading(false); })
      .catch(() => { alert("Failed to load lot details"); setLoading(false); });
  }, [navigate, lotId]);

  const getPrice = () => {
    if (!lot?.slots) return 50;
    const s = lot.slots.find(s => s.vehicleType === formData.vehicleType);
    return s ? s.price : 50;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8080/api/bookings", {
        user: { id: user.id }, lot: { id: lotId },
        vehicleType: formData.vehicleType, serviceType: "SELF", status: "CONFIRMED",
        startTime: formData.startTime, endTime: formData.endTime, totalAmount: getPrice()
      });
      alert(`Booking Confirmed! Booking ID: #${res.data.id}`);
      navigate("/dashboard");
    } catch (err) { alert("Failed to book: " + (err.response?.data || err.message)); }
  };

  if (loading) return (
    <div style={S.loading}><style>{css}</style>
      <div style={S.spinner} />
    </div>
  );

  if (!lot) return (
    <div style={S.shell}><style>{css}</style>
      <div style={S.card}>
        <p style={{ color: "#f87171", fontWeight: 700, marginBottom: 16 }}>Parking lot not found</p>
        <button style={S.confirmBtn} onClick={() => navigate("/dashboard")}>Back to Dashboard</button>
      </div>
    </div>
  );

  return (
    <>
      <style>{css}</style>
      <div style={S.shell}>
        <div style={S.card}>
          <button style={S.backBtn} onClick={() => navigate("/dashboard")} className="dark-btn">
            <ArrowLeft size={15} /> Back
          </button>

          <div style={S.header}>
            <h1 style={S.title}>Book Parking Spot</h1>
          </div>

          <div style={S.lotCard}>
            <p style={S.lotName}>{lot.name}</p>
            <p style={S.lotAddr}><MapPin size={13} color="#C8FF00" />{lot.address}</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div style={S.fieldGroup}>
              <label style={S.label}>Vehicle Type</label>
              <select required style={S.select} className="dark-input" value={formData.vehicleType}
                onChange={e => setFormData({ ...formData, vehicleType: e.target.value })}>
                <option value="CAR">Car</option>
                <option value="BIKE">Bike</option>
                <option value="HEAVY">Heavy Vehicle</option>
                <option value="CYCLE">Cycle</option>
              </select>
            </div>

            <div style={S.fieldGroup}>
              <label style={S.label}><Clock size={12} style={{ display: "inline", marginRight: 5 }} />Start Time</label>
              <input type="datetime-local" required style={S.input} className="dark-input" value={formData.startTime}
                onChange={e => setFormData({ ...formData, startTime: e.target.value })} />
            </div>

            <div style={S.fieldGroup}>
              <label style={S.label}><Clock size={12} style={{ display: "inline", marginRight: 5 }} />End Time</label>
              <input type="datetime-local" required style={{ ...S.input, marginBottom: 0 }} className="dark-input" value={formData.endTime}
                onChange={e => setFormData({ ...formData, endTime: e.target.value })} />
            </div>

            <div style={{ height: 24 }} />

            <div style={S.pricePill}>
              <span style={S.priceLabel}><Car size={14} style={{ display: "inline", marginRight: 6 }} />{lot.name}</span>
              <span style={S.priceVal}>₹{getPrice()}/hr</span>
            </div>

            <button type="submit" style={S.confirmBtn} className="dark-btn">
              <CheckCircle size={16} /> Confirm Booking
            </button>
            <button type="button" style={S.cancelBtn} className="dark-btn" onClick={() => navigate("/dashboard")}>
              Cancel
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default BookingPage;