import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Plus, Trash2, ArrowLeft, Save, MapPin, Car, Zap, Shield, Video, Umbrella } from "lucide-react";
import axios from "axios";
import L from "leaflet";
import { useNavigate, useParams } from "react-router-dom";

// Leaflet Icon Fix
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

// Custom Neon Colors matching your screenshot
const THEME = {
  neon: "#B9FF66", // The lime green from your screenshot
  dark: "#0a0a0a", // Deep black background
  card: "#121212", // Slightly lighter for cards
  input: "#1e1e1e", // Input background
  border: "#333333", // Subtle borders
  textMain: "#ffffff",
  textMuted: "#a1a1aa"
};

function LocationPicker({ setLocation }) {
  useMapEvents({
    click(e) {
      setLocation(e.latlng);
    },
  });
  return null;
}

function EditParkingLot() {
  const navigate = useNavigate();
  const { lotId } = useParams();

  const [isLoading, setIsLoading] = useState(true);

  // Form State
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  const [slots, setSlots] = useState([]);
  const [features, setFeatures] = useState({
    cctv: false,
    security: false,
    covered: false,
    evCharging: false,
  });

  // Fetch Data
  useEffect(() => {
    if (!lotId || lotId === "undefined") {
      alert("Invalid Parking Lot ID");
      navigate("/admin-dashboard");
      return;
    }

    const fetchLot = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`http://localhost:8080/api/parking-lots/${lotId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        const data = res.data;
        setName(data.name || "");
        setAddress(data.address || "");
        setDescription(data.description || "");

        if (data.location) {
          setLatitude(data.location.latitude);
          setLongitude(data.location.longitude);
        } else {
          setLatitude(data.latitude);
          setLongitude(data.longitude);
        }

        const amenities = data.amenities || {};
        setFeatures({
          cctv: amenities.cctv || false,
          security: amenities.security || false,
          covered: amenities.covered || false,
          evCharging: amenities.evCharging || false,
        });

        const parkingSlots = data.parkingSlots || data.slots;
        if (parkingSlots && parkingSlots.length > 0) {
          setSlots(parkingSlots);
        } else {
          setSlots([{ vehicleType: "CAR", capacity: 0, price: 0 }]);
        }

        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching lot:", err);
        if (err.response?.status === 401) {
          localStorage.clear();
          navigate("/login");
        } else {
          alert("Could not load parking lot details.");
          navigate("/admin-dashboard");
        }
      }
    };
    fetchLot();
  }, [lotId, navigate]);

  // Handlers
  const handleSlotChange = (index, field, value) => {
    const newSlots = [...slots];
    if (field === "capacity") newSlots[index][field] = parseInt(value) || 0;
    else if (field === "price") newSlots[index][field] = parseFloat(value) || 0;
    else newSlots[index][field] = value;
    setSlots(newSlots);
  };

  const addSlotRow = () => {
    setSlots([...slots, { vehicleType: "BIKE", capacity: 0, price: 0 }]);
  };

  const removeSlotRow = (index) => {
    setSlots(slots.filter((_, i) => i !== index));
  };

 const handleUpdate = async (e) => {
    // 1. Prevent page reload if this is attached to a <form onSubmit={handleUpdate}>
    if (e) e.preventDefault(); 

    const token = localStorage.getItem("token");
    
    // 2. Extract specific slot rates
    const carSlot = slots.find(s => s.vehicleType === "CAR");
    const bikeSlot = slots.find(s => s.vehicleType === "BIKE");
    const heavySlot = slots.find(s => s.vehicleType === "TRUCK" || s.vehicleType === "HEAVY");

    // 3. FLATTEN THE PAYLOAD to perfectly match ParkingLotDTO
    const payload = {
      name: name, 
      address: address, 
      description: description,
      // 👈 Added this! Ensure you have a 'type' state variable.
      latitude: latitude,            
      longitude: longitude,          
      cctv: features.cctv,            
      security: features.security,    
      covered: features.covered,       
      evCharging: features.evCharging, 
      carrate: carSlot ? carSlot.price : 0,
      bikerate: bikeSlot ? bikeSlot.price : 0,
      heavyrate: heavySlot ? heavySlot.price : 0,
      slots: slots // Passes the array so the updated MapperService can save them
    };

    try {
      const res = await axios.put(`http://localhost:8080/api/parking-lots/${lotId}`, payload, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      alert("Parking Lot Updated Successfully! ✅");
      navigate("/admin-dashboard");
      
    } catch (error) {
      console.error("Update failed:", error);
      
      if (error.response?.status === 401) {
        alert("Session expired. Please log in again.");
        localStorage.clear();
        navigate("/login");
      } else {
        // Grab the exact message from the backend if it exists, otherwise fallback
        const backendError = error.response?.data?.message || error.response?.data || "Failed to update parking lot";
        alert(`Error: ${backendError}`);
      }
    }
};

  // Helper for icons
  const getFeatureIcon = (key) => {
    switch(key) {
        case 'cctv': return <Video size={18} />;
        case 'security': return <Shield size={18} />;
        case 'covered': return <Umbrella size={18} />;
        case 'evCharging': return <Zap size={18} />;
        default: return <Car size={18} />;
    }
  }

  if (isLoading) return <div className="min-h-screen bg-black flex items-center justify-center text-[#B9FF66] font-mono text-xl animate-pulse">Loading System Data...</div>;

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-10 font-sans selection:bg-[#B9FF66] selection:text-black">
      
      {/* Container */}
      <div className="max-w-5xl mx-auto bg-[#121212] p-8 rounded-[2.5rem] shadow-2xl border border-[#222] relative overflow-hidden">
        
        {/* Subtle Background Glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#B9FF66] opacity-5 rounded-full blur-[100px] pointer-events-none"></div>

        {/* Header */}
        <div className="flex justify-between items-center mb-10 relative z-10">
          <div className="flex items-center gap-4">
             <button 
                onClick={() => navigate("/admin-dashboard")}
                className="group flex items-center justify-center w-10 h-10 rounded-full bg-[#1e1e1e] hover:bg-[#333] transition-all text-white border border-[#333]"
            >
                <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            </button>
            <div>
                <h2 className="text-4xl font-black text-white tracking-tight uppercase italic">Edit <span className="text-[#B9FF66]">Zone</span></h2>
                <p className="text-zinc-500 text-sm font-mono mt-1">ID: {lotId}</p>
            </div>
          </div>
          <div className="hidden md:block px-4 py-2 rounded-full border border-[#B9FF66]/30 bg-[#B9FF66]/10 text-[#B9FF66] text-xs font-bold uppercase tracking-wider">
            Live Editing Mode
          </div>
        </div>

        {/* 1. Basic Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="space-y-6">
            <div className="group">
                <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2 block group-focus-within:text-[#B9FF66] transition-colors">Parking Name</label>
                <input 
                    className="w-full p-4 bg-[#1e1e1e] rounded-xl border border-[#333] text-white font-bold placeholder-zinc-700 focus:outline-none focus:border-[#B9FF66] focus:ring-1 focus:ring-[#B9FF66] transition-all"
                    placeholder="e.g. Downtown Plaza" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                />
            </div>
            
            <div className="group">
                <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2 block group-focus-within:text-[#B9FF66] transition-colors">Location Address</label>
                <div className="relative">
                    <MapPin className="absolute left-4 top-4 text-zinc-600" size={20} />
                    <input 
                        className="w-full p-4 pl-12 bg-[#1e1e1e] rounded-xl border border-[#333] text-white font-bold placeholder-zinc-700 focus:outline-none focus:border-[#B9FF66] focus:ring-1 focus:ring-[#B9FF66] transition-all"
                        placeholder="Street Address" 
                        value={address} 
                        onChange={(e) => setAddress(e.target.value)} 
                    />
                </div>
            </div>

            <div className="group">
                 <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2 block group-focus-within:text-[#B9FF66] transition-colors">Description</label>
                <textarea 
                    className="w-full p-4 bg-[#1e1e1e] rounded-xl border border-[#333] text-zinc-300 font-medium placeholder-zinc-700 focus:outline-none focus:border-[#B9FF66] focus:ring-1 focus:ring-[#B9FF66] transition-all resize-none"
                    placeholder="Short description for drivers..." 
                    rows="4" 
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)} 
                />
            </div>
          </div>

          {/* 2. Map Section */}
          <div className="bg-[#1e1e1e] p-2 rounded-2xl border border-[#333] h-full min-h-[300px] flex flex-col">
             <div className="flex justify-between items-center px-2 mb-2">
                <span className="text-xs font-bold text-zinc-500 uppercase">Pin Point Location</span>
                <span className="text-[10px] text-[#B9FF66] bg-[#B9FF66]/10 px-2 py-0.5 rounded">Click on map</span>
             </div>
             <div className="flex-grow rounded-xl overflow-hidden relative border border-[#333]">
                <MapContainer center={[latitude || 18.5204, longitude || 73.8567]} zoom={15} className="h-full w-full z-0 grayscale-[50%] invert-[10%]">
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <LocationPicker setLocation={(loc) => { setLatitude(loc.lat); setLongitude(loc.lng); }} />
                {latitude && longitude && <Marker position={[latitude, longitude]} />}
                </MapContainer>
             </div>
          </div>
        </div>

        <div className="w-full h-px bg-gradient-to-r from-transparent via-[#333] to-transparent my-10"></div>

        {/* 3. Slots & Pricing */}
        <div className="mb-10">
            <div className="flex justify-between items-end mb-6">
                <div>
                    <h3 className="text-2xl font-bold text-white italic">Capacity & <span className="text-[#B9FF66]">Rates</span></h3>
                    <p className="text-zinc-500 text-sm">Configure vehicle types and hourly rates.</p>
                </div>
                <button onClick={addSlotRow} className="text-sm bg-[#1e1e1e] hover:bg-[#333] text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 border border-[#333] transition-all">
                    <Plus size={16} className="text-[#B9FF66]"/> Add Vehicle Type
                </button>
            </div>
            
            <div className="grid gap-4">
                {slots.map((slot, index) => (
                <div key={index} className="flex flex-col md:flex-row gap-4 items-center bg-[#1e1e1e] p-4 rounded-xl border border-[#333] hover:border-zinc-600 transition-colors group">
                    <div className="flex-1 w-full">
                        <label className="text-[10px] text-zinc-500 uppercase font-bold mb-1 block">Vehicle Type</label>
                        <select 
                            className="w-full p-2 bg-black rounded-lg border border-[#333] text-white font-bold focus:border-[#B9FF66] outline-none"
                            value={slot.vehicleType} 
                            onChange={(e) => handleSlotChange(index, "vehicleType", e.target.value)}
                        >
                            <option value="CAR">Car (Standard)</option>
                            <option value="BIKE">Motorbike</option>
                            <option value="TRUCK">Truck / Bus</option>
                        </select>
                    </div>
                    
                    <div className="flex-1 w-full">
                        <label className="text-[10px] text-zinc-500 uppercase font-bold mb-1 block">Total Spots</label>
                        <input type="number" 
                            className="w-full p-2 bg-black rounded-lg border border-[#333] text-white font-bold focus:border-[#B9FF66] outline-none"
                            value={slot.capacity} 
                            onChange={(e) => handleSlotChange(index, "capacity", e.target.value)} 
                        />
                    </div>
                    
                    <div className="flex-1 w-full">
                        <label className="text-[10px] text-zinc-500 uppercase font-bold mb-1 block">Hourly Rate</label>
                        <div className="relative">
                            <span className="absolute left-3 top-2 text-zinc-500 text-sm">$</span>
                            <input type="number" 
                                className="w-full p-2 pl-6 bg-black rounded-lg border border-[#333] text-[#B9FF66] font-bold focus:border-[#B9FF66] outline-none"
                                value={slot.price} 
                                onChange={(e) => handleSlotChange(index, "price", e.target.value)} 
                            />
                        </div>
                    </div>

                    <div className="pt-4 md:pt-0">
                         <button onClick={() => removeSlotRow(index)} className="p-2 text-zinc-600 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"><Trash2 size={20} /></button>
                    </div>
                </div>
                ))}
            </div>
        </div>

        {/* 4. Amenities */}
        <div className="mb-12">
            <h3 className="text-xl font-bold text-white italic mb-6">Smart <span className="text-[#B9FF66]">Features</span></h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Object.keys(features).map((key) => (
                    <label key={key} className={`
                        relative flex flex-col items-center justify-center p-6 rounded-2xl cursor-pointer border-2 transition-all duration-300
                        ${features[key] 
                            ? 'bg-[#B9FF66]/10 border-[#B9FF66] text-[#B9FF66]' 
                            : 'bg-[#1e1e1e] border-[#333] text-zinc-500 hover:border-zinc-500'}
                    `}>
                        <input type="checkbox" checked={features[key]} onChange={(e) => setFeatures({...features, [key]: e.target.checked})} className="hidden" />
                        <div className={`mb-3 ${features[key] ? 'text-[#B9FF66]' : 'text-zinc-500'}`}>
                            {getFeatureIcon(key)}
                        </div>
                        <span className="capitalize font-bold text-sm tracking-wide">
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                        </span>
                        {features[key] && <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-[#B9FF66] shadow-[0_0_10px_#B9FF66]"></div>}
                    </label>
                ))}
            </div>
        </div>

        {/* Footer Actions */}
        <button 
            onClick={handleUpdate} 
            className="w-full bg-[#B9FF66] text-black py-5 rounded-2xl font-black text-xl hover:bg-[#a6e65c] shadow-[0_0_20px_rgba(185,255,102,0.3)] hover:shadow-[0_0_30px_rgba(185,255,102,0.5)] transform hover:-translate-y-1 transition-all active:scale-95 flex justify-center items-center gap-3 uppercase tracking-wider"
        >
            <Save size={24} strokeWidth={3} /> Save Configuration
        </button>

      </div>
    </div>
  );
}

export default EditParkingLot;


// import { useState, useEffect } from "react";
// import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import { Plus, Trash2, Car, Bike, Truck, ArrowLeft, Save, MapPin } from "lucide-react";
// import axios from "axios";
// import L from "leaflet";
// import { useNavigate, useParams } from "react-router-dom";
// import icon from "leaflet/dist/images/marker-icon.png";
// import iconShadow from "leaflet/dist/images/marker-shadow.png";

// let DefaultIcon = L.icon({ iconUrl: icon, shadowUrl: iconShadow, iconSize: [25, 41], iconAnchor: [12, 41] });
// L.Marker.prototype.options.icon = DefaultIcon;

// /* ── Styles ── */
// const S = {
//   shell:     { minHeight: "100vh", background: "#0A0A0A", padding: "40px 16px 80px", fontFamily: "'Syne', sans-serif" },
//   loading:   { minHeight: "100vh", background: "#0A0A0A", display: "flex", alignItems: "center", justifyContent: "center", color: "#555", fontFamily: "'Syne', sans-serif" },
//   card:      { maxWidth: 860, margin: "0 auto", background: "#141414", border: "1px solid #242424", borderRadius: 24, padding: "36px 32px" },
//   backBtn:   { display: "inline-flex", alignItems: "center", gap: 8, background: "transparent", border: "1px solid #2e2e2e", color: "#aaa", borderRadius: 10, padding: "8px 16px", fontSize: 13, fontWeight: 600, cursor: "pointer", marginBottom: 28 },
//   titleRow:  { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 },
//   pageTitle: { fontSize: 28, fontWeight: 800, color: "#fff", letterSpacing: "-0.5px" },
//   idPill:    { background: "#00D4FF12", border: "1px solid #00D4FF25", color: "#00D4FF", fontSize: 11, fontWeight: 700, padding: "4px 12px", borderRadius: 99 },
//   pageSub:   { fontSize: 14, color: "#666", marginBottom: 36 },
//   section:   { marginBottom: 36 },
//   secTitle:  { fontSize: 13, fontWeight: 700, color: "#C8FF00", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 16 },
//   rowBetween:{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 },
//   grid2:     { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 },
//   grid4:     { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 },
//   label:     { display: "block", fontSize: 12, fontWeight: 600, color: "#888", marginBottom: 7 },
//   input:     { width: "100%", background: "#1a1a1a", border: "1px solid #2e2e2e", borderRadius: 12, padding: "13px 16px", fontSize: 14, color: "#fff", outline: "none", boxSizing: "border-box", fontFamily: "'Syne', sans-serif" },
//   select:    { width: "100%", background: "#1a1a1a", border: "1px solid #2e2e2e", borderRadius: 12, padding: "13px 16px", fontSize: 14, color: "#fff", outline: "none", boxSizing: "border-box", cursor: "pointer", fontFamily: "'Syne', sans-serif" },
//   textarea:  { width: "100%", background: "#1a1a1a", border: "1px solid #2e2e2e", borderRadius: 12, padding: "13px 16px", fontSize: 14, color: "#fff", outline: "none", boxSizing: "border-box", resize: "vertical", fontFamily: "'Syne', sans-serif" },
//   slotRow:   { display: "flex", gap: 10, alignItems: "center", background: "#1a1a1a", border: "1px solid #2a2a2a", borderRadius: 12, padding: "12px 14px", marginBottom: 10 },
//   slotIcon:  { color: "#C8FF00", flexShrink: 0 },
//   addBtn:    { display: "inline-flex", alignItems: "center", gap: 6, background: "#C8FF0012", border: "1px solid #C8FF0025", color: "#C8FF00", borderRadius: 9, padding: "7px 14px", fontSize: 12, fontWeight: 700, cursor: "pointer" },
//   delBtn:    { background: "#f8717112", border: "1px solid #f8717125", color: "#f87171", borderRadius: 8, padding: "8px", cursor: "pointer", display: "flex", alignItems: "center", flexShrink: 0 },
//   checkRow:  { display: "flex", alignItems: "center", gap: 10, background: "#1a1a1a", border: "1px solid #2a2a2a", borderRadius: 12, padding: "12px 14px", cursor: "pointer" },
//   checkLbl:  { fontSize: 13, fontWeight: 600, color: "#ccc", textTransform: "capitalize" },
//   checkbox:  { width: 18, height: 18, accentColor: "#C8FF00", cursor: "pointer", flexShrink: 0 },
//   mapWrap:   { borderRadius: 16, border: "1px solid #2e2e2e", overflow: "hidden", height: 280, position: "relative", zIndex: 0 },
//   divider:   { height: 1, background: "#1e1e1e", margin: "0 0 36px" },
//   saveBtn:   { width: "100%", background: "#C8FF00", color: "#000", border: "none", borderRadius: 14, padding: "16px", fontSize: 16, fontWeight: 800, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 },
// };

// const css = `
//   @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&display=swap');
//   body { font-family: 'Syne', sans-serif; margin: 0; }
//   .dark-input:focus { border-color: #C8FF00 !important; box-shadow: 0 0 0 3px #C8FF0015; }
//   .dark-btn:hover { opacity: 0.85; transform: translateY(-1px); }
//   select option { background: #1a1a1a; color: #fff; }
// `;

// function LocationPicker({ setLocation }) {
//   useMapEvents({ click(e) { setLocation(e.latlng); } });
//   return null;
// }

// function EditParkingLot() {
//   const navigate = useNavigate();
//   const { lotId } = useParams();
//   const [isLoading, setIsLoading] = useState(true);
//   const [name, setName] = useState("");
//   const [address, setAddress] = useState("");
//   const [description, setDescription] = useState("");
//   const [latitude, setLatitude] = useState(null);
//   const [longitude, setLongitude] = useState(null);
//   const [slots, setSlots] = useState([]);
//   const [features, setFeatures] = useState({ cctv: false, security: false, covered: false, evCharging: false });

//   useEffect(() => {
//     if (!lotId || lotId === "undefined") { alert("Invalid Parking Lot ID"); navigate("/admin-dashboard"); return; }
//     const fetchLot = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const res = await axios.get(`http://localhost:8080/api/parking-lots/${lotId}`, { headers: { Authorization: `Bearer ${token}` } });
//         const d = res.data;
//         setName(d.name || ""); setAddress(d.address || ""); setDescription(d.description || "");
//         if (d.location) { setLatitude(d.location.latitude); setLongitude(d.location.longitude); }
//         else { setLatitude(d.latitude); setLongitude(d.longitude); }
//         const am = d.amenities || {};
//         setFeatures({ cctv: am.cctv || false, security: am.security || false, covered: am.covered || false, evCharging: am.evCharging || false });
//         const ps = d.parkingSlots || d.slots;
//         setSlots(ps?.length > 0 ? ps : [{ vehicleType: "CAR", capacity: 0, price: 0 }]);
//         setIsLoading(false);
//       } catch (err) {
//         if (err.response?.status === 401) { localStorage.clear(); navigate("/login"); }
//         else { alert("Could not load parking lot details."); navigate("/admin-dashboard"); }
//       }
//     };
//     fetchLot();
//   }, [lotId, navigate]);

//   const changeSlot = (i, f, v) => {
//     const s = [...slots];
//     s[i][f] = f === "capacity" ? parseInt(v) || 0 : f === "price" ? parseFloat(v) || 0 : v;
//     setSlots(s);
//   };

//   const handleUpdate = async () => {
//     const token = localStorage.getItem("token");
//     try {
//       await axios.put(`http://localhost:8080/api/parking-lots/${lotId}`,
//         { name, address, description, location: { latitude, longitude }, parkingSlots: slots, amenities: features },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       alert("Parking Lot Updated Successfully!");
//       navigate("/admin-dashboard");
//     } catch (err) {
//       if (err.response?.status === 401) { localStorage.clear(); navigate("/login"); }
//       else alert("Failed to update parking lot");
//     }
//   };

//   if (isLoading) return <div style={S.loading}>Loading parking lot details…</div>;

//   const VehicleIcon = ({ t }) => t === "CAR" ? <Car size={16} /> : t === "BIKE" ? <Bike size={16} /> : <Truck size={16} />;

//   return (
//     <>
//       <style>{css}</style>
//       <div style={S.shell}>
//         <div style={S.card}>
//           <button style={S.backBtn} onClick={() => navigate("/admin-dashboard")} className="dark-btn">
//             <ArrowLeft size={15} /> Back to Dashboard
//           </button>
//           <div style={S.titleRow}>
//             <h1 style={S.pageTitle}>Edit Parking Lot</h1>
//             <span style={S.idPill}>ID: {lotId}</span>
//           </div>
//           <p style={S.pageSub}>Update your parking facility details</p>

//           {/* Basic Details */}
//           <div style={S.section}>
//             <p style={S.secTitle}>Basic Details</p>
//             <div style={S.grid2}>
//               <div><label style={S.label}>Lot Name</label>
//                 <input style={S.input} className="dark-input" placeholder="Name" value={name} onChange={e => setName(e.target.value)} /></div>
//               <div><label style={S.label}>Address</label>
//                 <input style={S.input} className="dark-input" placeholder="Address" value={address} onChange={e => setAddress(e.target.value)} /></div>
//             </div>
//             <div><label style={S.label}>Description</label>
//               <textarea style={S.textarea} className="dark-input" rows={2} placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} /></div>
//           </div>

//           <div style={S.divider} />

//           {/* Location */}
//           <div style={S.section}>
//             <div style={S.rowBetween}>
//               <p style={{ ...S.secTitle, marginBottom: 0 }}>Location</p>
//               {latitude && <span style={{ background: "#C8FF0015", border: "1px solid #C8FF0030", color: "#C8FF00", fontSize: 11, fontWeight: 700, padding: "4px 10px", borderRadius: 99, display: "inline-flex", alignItems: "center", gap: 5 }}><MapPin size={10} /> Pinned</span>}
//             </div>
//             <div style={S.mapWrap}>
//               <MapContainer center={[latitude || 18.5204, longitude || 73.8567]} zoom={15} style={{ height: "100%", width: "100%" }}>
//                 <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
//                 <LocationPicker setLocation={loc => { setLatitude(loc.lat); setLongitude(loc.lng); }} />
//                 {latitude && longitude && <Marker position={[latitude, longitude]} />}
//               </MapContainer>
//             </div>
//           </div>

//           <div style={S.divider} />

//           {/* Slots */}
//           <div style={S.section}>
//             <div style={S.rowBetween}>
//               <p style={{ ...S.secTitle, marginBottom: 0 }}>Slots & Pricing</p>
//               <button style={S.addBtn} onClick={() => setSlots([...slots, { vehicleType: "BIKE", capacity: 0, price: 0 }])} className="dark-btn">
//                 <Plus size={13} /> Add Type
//               </button>
//             </div>
//             {slots.map((slot, i) => (
//               <div key={i} style={S.slotRow}>
//                 <span style={S.slotIcon}><VehicleIcon t={slot.vehicleType} /></span>
//                 <select style={{ ...S.select, flex: 1 }} value={slot.vehicleType} onChange={e => changeSlot(i, "vehicleType", e.target.value)}>
//                   <option value="CAR">Car</option><option value="BIKE">Bike</option><option value="TRUCK">Truck</option>
//                 </select>
//                 <input type="number" style={{ ...S.input, flex: 1 }} className="dark-input" value={slot.capacity} placeholder="Spots" onChange={e => changeSlot(i, "capacity", e.target.value)} />
//                 <input type="number" style={{ ...S.input, flex: 1 }} className="dark-input" value={slot.price} placeholder="₹/hr" onChange={e => changeSlot(i, "price", e.target.value)} />
//                 <button style={S.delBtn} onClick={() => setSlots(slots.filter((_, idx) => idx !== i))}><Trash2 size={15} /></button>
//               </div>
//             ))}
//           </div>

//           <div style={S.divider} />

//           {/* Facilities */}
//           <div style={S.section}>
//             <p style={S.secTitle}>Facilities</p>
//             <div style={S.grid4}>
//               {Object.keys(features).map(key => (
//                 <label key={key} style={S.checkRow}>
//                   <input type="checkbox" style={S.checkbox} checked={features[key]} onChange={e => setFeatures({ ...features, [key]: e.target.checked })} />
//                   <span style={S.checkLbl}>{key.replace(/([A-Z])/g, ' $1').trim()}</span>
//                 </label>
//               ))}
//             </div>
//           </div>

//           <button style={S.saveBtn} onClick={handleUpdate} className="dark-btn">
//             <Save size={18} /> Update Parking Lot
//           </button>
//         </div>
//       </div>
//     </>
//   );
// }

// export default EditParkingLot;


// import { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { Car, Clock, MapPin, ArrowLeft, CheckCircle } from "lucide-react";

// /* ── Styles ── */
// const S = {
//   shell:     { minHeight: "100vh", background: "#0A0A0A", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 16px", fontFamily: "'Syne', sans-serif" },
//   loading:   { minHeight: "100vh", background: "#0A0A0A", display: "flex", alignItems: "center", justifyContent: "center" },
//   spinner:   { width: 44, height: 44, border: "3px solid #1e1e1e", borderTop: "3px solid #C8FF00", borderRadius: "50%", animation: "spin 0.8s linear infinite" },
//   card:      { width: "100%", maxWidth: 440, background: "#141414", border: "1px solid #242424", borderRadius: 24, padding: "32px 28px" },
//   backBtn:   { display: "inline-flex", alignItems: "center", gap: 7, background: "transparent", border: "none", color: "#888", fontSize: 13, fontWeight: 600, cursor: "pointer", marginBottom: 24, padding: 0 },
//   header:    { marginBottom: 24 },
//   title:     { fontSize: 22, fontWeight: 800, color: "#fff", letterSpacing: "-0.5px", marginBottom: 4 },
//   lotCard:   { background: "#1a1a1a", border: "1px solid #2a2a2a", borderRadius: 14, padding: "14px 16px", marginBottom: 24 },
//   lotName:   { fontSize: 15, fontWeight: 700, color: "#fff", marginBottom: 4 },
//   lotAddr:   { fontSize: 13, color: "#888", display: "flex", alignItems: "center", gap: 6 },
//   label:     { display: "block", fontSize: 12, fontWeight: 600, color: "#888", marginBottom: 7 },
//   select:    { width: "100%", background: "#1a1a1a", border: "1px solid #2e2e2e", borderRadius: 12, padding: "13px 16px", fontSize: 14, color: "#fff", outline: "none", boxSizing: "border-box", cursor: "pointer", fontFamily: "'Syne', sans-serif", marginBottom: 16 },
//   input:     { width: "100%", background: "#1a1a1a", border: "1px solid #2e2e2e", borderRadius: 12, padding: "13px 16px", fontSize: 14, color: "#fff", outline: "none", boxSizing: "border-box", fontFamily: "'Syne', sans-serif", marginBottom: 16 },
//   pricePill: { background: "#C8FF0012", border: "1px solid #C8FF0025", borderRadius: 12, padding: "12px 16px", marginBottom: 24, display: "flex", alignItems: "center", justifyContent: "space-between" },
//   priceLabel:{ fontSize: 13, color: "#888", fontWeight: 600 },
//   priceVal:  { fontSize: 18, fontWeight: 800, color: "#C8FF00" },
//   confirmBtn:{ width: "100%", background: "#C8FF00", color: "#000", border: "none", borderRadius: 12, padding: "14px", fontSize: 15, fontWeight: 800, cursor: "pointer", marginBottom: 10, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 },
//   cancelBtn: { width: "100%", background: "transparent", border: "1px solid #2e2e2e", color: "#888", borderRadius: 12, padding: "13px", fontSize: 14, fontWeight: 600, cursor: "pointer" },
//   fieldGroup:{ marginBottom: 16 },
// };

// const css = `
//   @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&display=swap');
//   body { font-family: 'Syne', sans-serif; margin: 0; }
//   @keyframes spin { to { transform: rotate(360deg); } }
//   .dark-input:focus { border-color: #C8FF00 !important; box-shadow: 0 0 0 3px #C8FF0015; }
//   .dark-btn:hover { opacity: 0.85; }
//   select option { background: #1a1a1a; color: #fff; }
// `;

// function BookingPage() {
//   const { lotId } = useParams();
//   const navigate = useNavigate();
//   const [user, setUser] = useState(null);
//   const [lot, setLot] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [formData, setFormData] = useState({ vehicleType: "CAR", startTime: "", endTime: "" });

//   useEffect(() => {
//     const stored = localStorage.getItem("user");
//     if (!stored) { alert("Please login first!"); navigate("/login"); return; }
//     setUser(JSON.parse(stored));
//     axios.get(`http://localhost:8080/api/parking-lots/${lotId}`)
//       .then(r => { setLot(r.data); setLoading(false); })
//       .catch(() => { alert("Failed to load lot details"); setLoading(false); });
//   }, [navigate, lotId]);

//   const getPrice = () => {
//     if (!lot?.slots) return 50;
//     const s = lot.slots.find(s => s.vehicleType === formData.vehicleType);
//     return s ? s.price : 50;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post("http://localhost:8080/api/bookings", {
//         user: { id: user.id }, lot: { id: lotId },
//         vehicleType: formData.vehicleType, serviceType: "SELF", status: "CONFIRMED",
//         startTime: formData.startTime, endTime: formData.endTime, totalAmount: getPrice()
//       });
//       alert(`Booking Confirmed! Booking ID: #${res.data.id}`);
//       navigate("/dashboard");
//     } catch (err) { alert("Failed to book: " + (err.response?.data || err.message)); }
//   };

//   if (loading) return (
//     <div style={S.loading}><style>{css}</style>
//       <div style={S.spinner} />
//     </div>
//   );

//   if (!lot) return (
//     <div style={S.shell}><style>{css}</style>
//       <div style={S.card}>
//         <p style={{ color: "#f87171", fontWeight: 700, marginBottom: 16 }}>Parking lot not found</p>
//         <button style={S.confirmBtn} onClick={() => navigate("/dashboard")}>Back to Dashboard</button>
//       </div>
//     </div>
//   );

//   return (
//     <>
//       <style>{css}</style>
//       <div style={S.shell}>
//         <div style={S.card}>
//           <button style={S.backBtn} onClick={() => navigate("/dashboard")} className="dark-btn">
//             <ArrowLeft size={15} /> Back
//           </button>

//           <div style={S.header}>
//             <h1 style={S.title}>Book Parking Spot</h1>
//           </div>

//           <div style={S.lotCard}>
//             <p style={S.lotName}>{lot.name}</p>
//             <p style={S.lotAddr}><MapPin size={13} color="#C8FF00" />{lot.address}</p>
//           </div>

//           <form onSubmit={handleSubmit}>
//             <div style={S.fieldGroup}>
//               <label style={S.label}>Vehicle Type</label>
//               <select required style={S.select} className="dark-input" value={formData.vehicleType}
//                 onChange={e => setFormData({ ...formData, vehicleType: e.target.value })}>
//                 <option value="CAR">Car</option>
//                 <option value="BIKE">Bike</option>
//                 <option value="HEAVY">Heavy Vehicle</option>
//                 <option value="CYCLE">Cycle</option>
//               </select>
//             </div>

//             <div style={S.fieldGroup}>
//               <label style={S.label}><Clock size={12} style={{ display: "inline", marginRight: 5 }} />Start Time</label>
//               <input type="datetime-local" required style={S.input} className="dark-input" value={formData.startTime}
//                 onChange={e => setFormData({ ...formData, startTime: e.target.value })} />
//             </div>

//             <div style={S.fieldGroup}>
//               <label style={S.label}><Clock size={12} style={{ display: "inline", marginRight: 5 }} />End Time</label>
//               <input type="datetime-local" required style={{ ...S.input, marginBottom: 0 }} className="dark-input" value={formData.endTime}
//                 onChange={e => setFormData({ ...formData, endTime: e.target.value })} />
//             </div>

//             <div style={{ height: 24 }} />

//             <div style={S.pricePill}>
//               <span style={S.priceLabel}><Car size={14} style={{ display: "inline", marginRight: 6 }} />{lot.name}</span>
//               <span style={S.priceVal}>₹{getPrice()}/hr</span>
//             </div>

//             <button type="submit" style={S.confirmBtn} className="dark-btn">
//               <CheckCircle size={16} /> Confirm Booking
//             </button>
//             <button type="button" style={S.cancelBtn} className="dark-btn" onClick={() => navigate("/dashboard")}>
//               Cancel
//             </button>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// }

// export default BookingPage;