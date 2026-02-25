// import { useState, useEffect } from "react"; // 👈 Added useEffect
// import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import { Navigation, Plus, Trash2, Car, Bike, Truck, ArrowLeft } from "lucide-react";
// import axios from "axios";
// import L from "leaflet";
// import { useNavigate } from "react-router-dom";

// // Fix for default Leaflet marker icons in React
// import icon from "leaflet/dist/images/marker-icon.png";
// import iconShadow from "leaflet/dist/images/marker-shadow.png";

// let DefaultIcon = L.icon({
//   iconUrl: icon,
//   shadowUrl: iconShadow,
//   iconSize: [25, 41],
//   iconAnchor: [12, 41],
// });
// L.Marker.prototype.options.icon = DefaultIcon;

// /* =============================
//    MAP CLICK LOCATION PICKER
// ============================= */
// function LocationPicker({ setLocation }) {
//   const [position, setPosition] = useState(null);
//   useMapEvents({
//     click(e) {
//       setPosition(e.latlng);
//       setLocation(e.latlng);
//     },
//   });
//   return position ? <Marker position={position} /> : null;
// }

// /* =============================
//    ADD PARKING LOT COMPONENT
// ============================= */
// function AddParkingLot() {
//   const navigate = useNavigate();

//   // ✅ 1. GET OWNER ID FROM STORAGE
//   const [ownerId, setOwnerId] = useState(null);

//   useEffect(() => {
//     const userStr = localStorage.getItem("user");
//     if (userStr) {
//       const user = JSON.parse(userStr);
//       setOwnerId(user.id);
//     } else {
//       alert("You must be logged in to add a lot.");
//       navigate("/login");
//     }
//   }, [navigate]);

//   // Basic Info
//   const [name, setName] = useState("");
//   const [address, setAddress] = useState("");
//   const [description, setDescription] = useState("");
//   const [type, setType] = useState("PUBLIC");

//   // Location Info
//   const [latitude, setLatitude] = useState(null);
//   const [longitude, setLongitude] = useState(null);

//   // Slot Configuration
//   const [slots, setSlots] = useState([
//     { vehicleType: "CAR", capacity: 0, price: 0 },
//   ]);

//   // Amenities
//   const [features, setFeatures] = useState({
//     cctv: false,
//     security: false,
//     covered: false,
//     evCharging: false,
//   });

//   // --- Handlers ---

//   const getCurrentLocation = () => {
//     navigator.geolocation.getCurrentPosition((pos) => {
//       setLatitude(pos.coords.latitude);
//       setLongitude(pos.coords.longitude);
//     });
//   };

//   const addSlotRow = () => {
//     setSlots([...slots, { vehicleType: "BIKE", capacity: 0, price: 0 }]);
//   };

//   const removeSlotRow = (index) => {
//     const newSlots = slots.filter((_, i) => i !== index);
//     setSlots(newSlots);
//   };

//   const handleSlotChange = (index, field, value) => {
//     const newSlots = [...slots];
//     // ✅ FIX: Prevent NaN if user clears the input
//     if (field === "capacity") {
//         newSlots[index][field] = parseInt(value) || 0; 
//     } else if (field === "price") {
//         newSlots[index][field] = parseFloat(value) || 0;
//     } else {
//         newSlots[index][field] = value;
//     }
//     setSlots(newSlots);
//   };

//   const handleFeatureChange = (e) => {
//     setFeatures({ ...features, [e.target.name]: e.target.checked });
//   };

//   const handleSubmit = async () => {
//     // Validation
//     if (!ownerId) {
//         alert("Error: Admin ID not found. Please relogin.");
//         return;
//     }
//     if (!latitude || !longitude) {
//       alert("Please select location on map");
//       return;
//     }

//     // ✅ GET THE TOKEN FROM LOCAL STORAGE
//     const token = localStorage.getItem("token"); 

//     // Construct Payload
//     const payload = {
//       name,
//       address,
//       description,
//       type, 
//       location: { latitude, longitude },
//       parkingSlots: slots, 
//       amenities: features,
//     };

//     console.log("Submitting Payload:", payload);

//     try {
//       // ✅ ADDED AUTHORIZATION HEADER
//       await axios.post(
//   `http://localhost:8080/api/parking-lots?ownerId=${ownerId}`,
//   payload,
//   {
//     headers: {
//       Authorization: `Bearer ${token}` 
//     }
//   }
// );
      
//       alert("Parking Lot Added Successfully!");
//       navigate("/admin-dashboard");
//     } catch (error) {
//       console.error(error);
//       // The Axios interceptor we discussed will handle the 401 redirect automatically
//       if (error.response?.status !== 401) {
//         alert("Failed to add parking lot");
//       }
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto bg-white p-8 rounded-3xl shadow-xl my-10 border border-slate-100">
      
//       <button 
//         onClick={() => navigate("/admin-dashboard")}
//         className="flex items-center text-slate-500 hover:text-slate-800 font-bold mb-4 transition-colors hover:-translate-x-1 duration-200"
//       >
//         <ArrowLeft className="mr-2" size={20} /> Back to Dashboard
//       </button>

//       <h2 className="text-3xl font-black mb-6 text-slate-800">Add New Parking Lot</h2>

//       {/* 1. Basic Details */}
//       {/* 1. Basic Details */}
//       <div className="space-y-4 mb-8">
//         <h3 className="text-xl font-bold text-slate-700">Details</h3>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <input
//             className="w-full p-4 bg-slate-50 rounded-xl border border-slate-200 focus:outline-indigo-500 font-bold text-slate-700"
//             placeholder="Parking Lot Name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//           />
//           <input
//             className="w-full p-4 bg-slate-50 rounded-xl border border-slate-200 focus:outline-indigo-500 font-bold text-slate-700"
//             placeholder="Address / Area"
//             value={address}
//             onChange={(e) => setAddress(e.target.value)}
//           />
//         </div>

//         {/* ✅ NEW: Parking Type Dropdown */}
//         <div>
//             <label className="block text-sm font-bold text-slate-500 mb-2 ml-1">Parking Type</label>
//             <select
//               value={type}
//               onChange={(e) => setType(e.target.value)}
//               className="w-full p-4 bg-slate-50 rounded-xl border border-slate-200 font-bold text-slate-700 focus:outline-indigo-500 cursor-pointer"
//             >
//               <option value="PUBLIC">Public / Street Parking</option>
//               <option value="MALL">Mall / Commercial Complex</option>
//               <option value="RESIDENTIAL">Residential Society</option>
//               <option value="OFFICE">Corporate / Office</option>
//               <option value="AIRPORT">Airport / Station</option>
//               <option value="EVENT">Event / Stadium</option>
//             </select>
//         </div>

//         <textarea
//           className="w-full p-4 bg-slate-50 rounded-xl border border-slate-200 focus:outline-indigo-500 font-medium text-slate-600"
//           placeholder="Description (e.g., Near Main Market, Enter from back gate...)"
//           rows="2"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//         />
//       </div>

//       {/* 2. Slot Configuration (Dynamic) */}
//       <div className="mb-8">
//         <div className="flex justify-between items-center mb-4">
//           <h3 className="text-xl font-bold text-slate-700">Capacity & Pricing</h3>
//           <button
//             onClick={addSlotRow}
//             className="text-sm bg-indigo-100 text-indigo-700 px-4 py-2 rounded-xl font-bold flex items-center gap-1 hover:bg-indigo-200 transition"
//           >
//             <Plus size={16} /> Add Vehicle Type
//           </button>
//         </div>

//         <div className="space-y-3">
//           {slots.map((slot, index) => (
//             <div key={index} className="flex flex-wrap md:flex-nowrap gap-3 items-center bg-slate-50 p-3 rounded-xl border border-slate-200">
//               {/* Icon Logic */}
//               <div className="text-slate-400 p-2">
//                 {slot.vehicleType === 'CAR' && <Car />}
//                 {slot.vehicleType === 'BIKE' && <Bike />}
//                 {slot.vehicleType === 'TRUCK' && <Truck />}
//               </div>

//               {/* Vehicle Type Select */}
//               <select
//                 className="p-3 bg-white rounded-lg border w-full md:w-1/4 font-bold text-slate-700"
//                 value={slot.vehicleType}
//                 onChange={(e) => handleSlotChange(index, "vehicleType", e.target.value)}
//               >
//                 <option value="CAR">Car (4 Wheeler)</option>
//                 <option value="BIKE">Bike (2 Wheeler)</option>
//                 <option value="TRUCK">Truck/Heavy</option>
//               </select>

//               {/* Capacity Input */}
//               <input
//                 type="number"
//                 placeholder="Total Spots"
//                 className="p-3 bg-white rounded-lg border w-full md:w-1/4 font-bold text-slate-700"
//                 value={slot.capacity}
//                 onChange={(e) => handleSlotChange(index, "capacity", e.target.value)}
//               />

//               {/* Price Input */}
//               <input
//                 type="number"
//                 placeholder="Price/Hr (₹)"
//                 className="p-3 bg-white rounded-lg border w-full md:w-1/4 font-bold text-slate-700"
//                 value={slot.price}
//                 onChange={(e) => handleSlotChange(index, "price", e.target.value)}
//               />

//               {/* Remove Button */}
//               {slots.length > 1 && (
//                 <button
//                   onClick={() => removeSlotRow(index)}
//                   className="p-3 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
//                 >
//                   <Trash2 size={20} />
//                 </button>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* 3. Amenities / Features */}
//       <div className="mb-8">
//         <h3 className="text-xl font-bold text-slate-700 mb-4">Facilities</h3>
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//           {Object.keys(features).map((key) => (
//             <label key={key} className="flex items-center space-x-3 bg-slate-50 p-3 rounded-xl cursor-pointer hover:bg-slate-100 border border-slate-200 transition">
//               <input
//                 type="checkbox"
//                 name={key}
//                 checked={features[key]}
//                 onChange={handleFeatureChange}
//                 className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500 accent-indigo-600"
//               />
//               <span className="capitalize text-slate-700 font-bold text-sm">
//                 {key.replace(/([A-Z])/g, ' $1').trim()}
//               </span>
//             </label>
//           ))}
//         </div>
//       </div>

//       {/* 4. Map Location */}
//       <div className="mb-8">
//         <div className="flex justify-between items-center mb-4">
//             <h3 className="text-xl font-bold text-slate-700">Location</h3>
//             {latitude && (
//                 <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded font-bold">
//                     Selected
//                 </span>
//             )}
//         </div>
        
//         <button
//           onClick={getCurrentLocation}
//           className="mb-4 flex items-center gap-2 bg-slate-800 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-black transition shadow-lg shadow-slate-900/20"
//         >
//           <Navigation size={16} /> Use My Current Location
//         </button>

//         <MapContainer
//           center={[18.5204, 73.8567]}
//           zoom={13}
//           className="h-64 rounded-xl border-2 border-slate-200 z-0"
//         >
//           <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
//           <LocationPicker
//             setLocation={(loc) => {
//               setLatitude(loc.lat);
//               setLongitude(loc.lng);
//             }}
//           />
//           {latitude && longitude && <Marker position={[latitude, longitude]} />}
//         </MapContainer>
//       </div>

//       {/* Submit */}
//       <button
//         onClick={handleSubmit}
//         className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold text-lg hover:scale-[1.02] hover:bg-indigo-700 shadow-xl shadow-indigo-200 transition-all"
//       >
//         Save Parking Lot
//       </button>
//     </div>
//   );
// }

// export default AddParkingLot;


import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Navigation, Plus, Trash2, Car, Bike, Truck, ArrowLeft, MapPin } from "lucide-react";
import axios from "axios";
import L from "leaflet";
import { useNavigate } from "react-router-dom";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({ iconUrl: icon, shadowUrl: iconShadow, iconSize: [25, 41], iconAnchor: [12, 41] });
L.Marker.prototype.options.icon = DefaultIcon;

/* ── Styles ── */
const S = {
  shell:    { minHeight: "100vh", background: "#0A0A0A", padding: "40px 16px 80px", fontFamily: "'Syne', sans-serif" },
  card:     { maxWidth: 860, margin: "0 auto", background: "#141414", border: "1px solid #242424", borderRadius: 24, padding: "36px 32px" },
  backBtn:  { display: "inline-flex", alignItems: "center", gap: 8, background: "transparent", border: "1px solid #2e2e2e", color: "#aaa", borderRadius: 10, padding: "8px 16px", fontSize: 13, fontWeight: 600, cursor: "pointer", marginBottom: 28 },
  pageTitle:{ fontSize: 28, fontWeight: 800, color: "#fff", letterSpacing: "-0.5px", marginBottom: 6 },
  pageSub:  { fontSize: 14, color: "#666", marginBottom: 36 },
  section:  { marginBottom: 36 },
  secTitle: { fontSize: 13, fontWeight: 700, color: "#C8FF00", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 16 },
  rowBetween: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 },
  grid2:    { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 },
  grid4:    { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 },
  label:    { display: "block", fontSize: 12, fontWeight: 600, color: "#888", marginBottom: 7 },
  input:    { width: "100%", background: "#1a1a1a", border: "1px solid #2e2e2e", borderRadius: 12, padding: "13px 16px", fontSize: 14, color: "#fff", outline: "none", boxSizing: "border-box", fontFamily: "'Syne', sans-serif" },
  select:   { width: "100%", background: "#1a1a1a", border: "1px solid #2e2e2e", borderRadius: 12, padding: "13px 16px", fontSize: 14, color: "#fff", outline: "none", boxSizing: "border-box", cursor: "pointer", fontFamily: "'Syne', sans-serif" },
  textarea: { width: "100%", background: "#1a1a1a", border: "1px solid #2e2e2e", borderRadius: 12, padding: "13px 16px", fontSize: 14, color: "#fff", outline: "none", boxSizing: "border-box", resize: "vertical", fontFamily: "'Syne', sans-serif" },
  slotRow:  { display: "flex", gap: 10, alignItems: "center", background: "#1a1a1a", border: "1px solid #2a2a2a", borderRadius: 12, padding: "12px 14px", marginBottom: 10 },
  slotIcon: { color: "#C8FF00", flexShrink: 0 },
  addBtn:   { display: "inline-flex", alignItems: "center", gap: 6, background: "#C8FF0012", border: "1px solid #C8FF0025", color: "#C8FF00", borderRadius: 9, padding: "7px 14px", fontSize: 12, fontWeight: 700, cursor: "pointer" },
  delBtn:   { background: "#f8717112", border: "1px solid #f8717125", color: "#f87171", borderRadius: 8, padding: "8px", cursor: "pointer", display: "flex", alignItems: "center", flexShrink: 0 },
  checkRow: { display: "flex", alignItems: "center", gap: 10, background: "#1a1a1a", border: "1px solid #2a2a2a", borderRadius: 12, padding: "12px 14px", cursor: "pointer" },
  checkLbl: { fontSize: 13, fontWeight: 600, color: "#ccc", textTransform: "capitalize" },
  checkbox: { width: 18, height: 18, accentColor: "#C8FF00", cursor: "pointer", flexShrink: 0 },
  locBtn:   { display: "inline-flex", alignItems: "center", gap: 8, background: "#1a1a1a", border: "1px solid #2e2e2e", color: "#ccc", borderRadius: 10, padding: "10px 18px", fontSize: 13, fontWeight: 600, cursor: "pointer", marginBottom: 14 },
  mapWrap:  { borderRadius: 16, border: "1px solid #2e2e2e", overflow: "hidden", height: 280, position: "relative", zIndex: 0 },
  pill:     { background: "#C8FF0015", border: "1px solid #C8FF0030", color: "#C8FF00", fontSize: 11, fontWeight: 700, padding: "4px 10px", borderRadius: 99, display: "inline-flex", alignItems: "center", gap: 5 },
  saveBtn:  { width: "100%", background: "#C8FF00", color: "#000", border: "none", borderRadius: 14, padding: "16px", fontSize: 16, fontWeight: 800, cursor: "pointer", marginTop: 8 },
  divider:  { height: 1, background: "#1e1e1e", margin: "0 0 36px" },
};

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&display=swap');
  body { font-family: 'Syne', sans-serif; margin: 0; }
  .dark-input:focus { border-color: #C8FF00 !important; box-shadow: 0 0 0 3px #C8FF0015; }
  .dark-btn:hover { opacity: 0.85; transform: translateY(-1px); }
  select option { background: #1a1a1a; color: #fff; }
`;

function LocationPicker({ setLocation }) {
  const [pos, setPos] = useState(null);
  useMapEvents({ click(e) { setPos(e.latlng); setLocation(e.latlng); } });
  return pos ? <Marker position={pos} /> : null;
}

function AddParkingLot() {
  const navigate = useNavigate();
  const [ownerId, setOwnerId] = useState(null);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("PUBLIC");
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [slots, setSlots] = useState([{ vehicleType: "CAR", capacity: 0, price: 0 }]);
  const [features, setFeatures] = useState({ cctv: false, security: false, covered: false, evCharging: false });

  useEffect(() => {
    const u = localStorage.getItem("user");
    if (u) setOwnerId(JSON.parse(u).id);
    else { alert("You must be logged in."); navigate("/login"); }
  }, [navigate]);

  const getCurrentLocation = () => navigator.geolocation.getCurrentPosition(p => {
    setLatitude(p.coords.latitude); setLongitude(p.coords.longitude);
  });

  const addSlot = () => setSlots([...slots, { vehicleType: "BIKE", capacity: 0, price: 0 }]);
  const removeSlot = (i) => setSlots(slots.filter((_, idx) => idx !== i));
  const changeSlot = (i, f, v) => {
    const s = [...slots];
    s[i][f] = f === "capacity" ? parseInt(v) || 0 : f === "price" ? parseFloat(v) || 0 : v;
    setSlots(s);
  };

  const handleSubmit = async () => {
    if (!ownerId) { alert("Admin ID not found. Relogin."); return; }
    if (!latitude || !longitude) { alert("Please select a location on the map."); return; }
    const token = localStorage.getItem("token");
    try {
      await axios.post(`http://localhost:8080/api/parking-lots?ownerId=${ownerId}`,
        { name, address, description, type, location: { latitude, longitude }, parkingSlots: slots, amenities: features },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Parking Lot Added Successfully!");
      navigate("/admin-dashboard");
    } catch (err) { if (err.response?.status !== 401) alert("Failed to add parking lot"); }
  };

  const VehicleIcon = ({ t }) => t === "CAR" ? <Car size={16} /> : t === "BIKE" ? <Bike size={16} /> : <Truck size={16} />;

  return (
    <>
      <style>{css}</style>
      <div style={S.shell}>
        <div style={S.card}>
          <button style={S.backBtn} onClick={() => navigate("/admin-dashboard")} className="dark-btn">
            <ArrowLeft size={15} /> Back to Dashboard
          </button>
          <h1 style={S.pageTitle}>Add Parking Lot</h1>
          <p style={S.pageSub}>Register a new parking facility</p>

          {/* Basic Details */}
          <div style={S.section}>
            <p style={S.secTitle}>Basic Details</p>
            <div style={S.grid2}>
              <div><label style={S.label}>Lot Name</label>
                <input style={S.input} className="dark-input" placeholder="e.g. Central Plaza Parking" value={name} onChange={e => setName(e.target.value)} /></div>
              <div><label style={S.label}>Address</label>
                <input style={S.input} className="dark-input" placeholder="e.g. Near Main Market" value={address} onChange={e => setAddress(e.target.value)} /></div>
            </div>
            <div style={{ marginBottom: 14 }}>
              <label style={S.label}>Parking Type</label>
              <select style={S.select} className="dark-input" value={type} onChange={e => setType(e.target.value)}>
                <option value="PUBLIC">Public / Street Parking</option>
                <option value="MALL">Mall / Commercial Complex</option>
                <option value="RESIDENTIAL">Residential Society</option>
                <option value="OFFICE">Corporate / Office</option>
                <option value="AIRPORT">Airport / Station</option>
                <option value="EVENT">Event / Stadium</option>
              </select>
            </div>
            <div><label style={S.label}>Description</label>
              <textarea style={S.textarea} className="dark-input" rows={2} placeholder="Enter from back gate, near food court..." value={description} onChange={e => setDescription(e.target.value)} /></div>
          </div>

          <div style={S.divider} />

          {/* Capacity & Pricing */}
          <div style={S.section}>
            <div style={S.rowBetween}>
              <p style={{ ...S.secTitle, marginBottom: 0 }}>Capacity & Pricing</p>
              <button style={S.addBtn} onClick={addSlot} className="dark-btn"><Plus size={13} /> Add Vehicle Type</button>
            </div>
            {slots.map((slot, i) => (
              <div key={i} style={S.slotRow}>
                <span style={S.slotIcon}><VehicleIcon t={slot.vehicleType} /></span>
                <select style={{ ...S.select, flex: 1 }} value={slot.vehicleType} onChange={e => changeSlot(i, "vehicleType", e.target.value)}>
                  <option value="CAR">Car (4 Wheeler)</option>
                  <option value="BIKE">Bike (2 Wheeler)</option>
                  <option value="TRUCK">Truck / Heavy</option>
                </select>
                <input type="number" style={{ ...S.input, flex: 1 }} className="dark-input" placeholder="Spots" value={slot.capacity} onChange={e => changeSlot(i, "capacity", e.target.value)} />
                <input type="number" style={{ ...S.input, flex: 1 }} className="dark-input" placeholder="₹/hr" value={slot.price} onChange={e => changeSlot(i, "price", e.target.value)} />
                {slots.length > 1 && <button style={S.delBtn} onClick={() => removeSlot(i)}><Trash2 size={15} /></button>}
              </div>
            ))}
          </div>

          <div style={S.divider} />

          {/* Facilities */}
          <div style={S.section}>
            <p style={S.secTitle}>Facilities</p>
            <div style={S.grid4}>
              {Object.keys(features).map(key => (
                <label key={key} style={S.checkRow}>
                  <input type="checkbox" style={S.checkbox} name={key} checked={features[key]}
                    onChange={e => setFeatures({ ...features, [key]: e.target.checked })} />
                  <span style={S.checkLbl}>{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                </label>
              ))}
            </div>
          </div>

          <div style={S.divider} />

          {/* Location */}
          <div style={S.section}>
            <div style={S.rowBetween}>
              <p style={{ ...S.secTitle, marginBottom: 0 }}>Location</p>
              {latitude && <span style={S.pill}><MapPin size={10} /> Selected</span>}
            </div>
            <button style={S.locBtn} onClick={getCurrentLocation} className="dark-btn">
              <Navigation size={14} /> Use My Current Location
            </button>
            <div style={S.mapWrap}>
              <MapContainer center={[18.5204, 73.8567]} zoom={13} style={{ height: "100%", width: "100%" }}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <LocationPicker setLocation={loc => { setLatitude(loc.lat); setLongitude(loc.lng); }} />
                {latitude && longitude && <Marker position={[latitude, longitude]} />}
              </MapContainer>
            </div>
          </div>

          <button style={S.saveBtn} onClick={handleSubmit} className="dark-btn">Save Parking Lot</button>
        </div>
      </div>
    </>
  );
}

export default AddParkingLot;