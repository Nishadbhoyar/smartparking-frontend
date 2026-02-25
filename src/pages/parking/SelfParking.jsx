// import { useEffect, useState, useRef } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
// import { Navigation, Crosshair } from "lucide-react"; // Icons
// import "leaflet/dist/leaflet.css";
// import L from "leaflet";

// // 🔧 FIX: Fix broken Leaflet marker icons
// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
//   iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
//   shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
// });

// // ✅ NEW: Map Controller to handle "Fly To" animation
// function MapController({ center, triggerReset }) {
//   const map = useMap();
  
//   useEffect(() => {
//     if (center) {
//       map.flyTo(center, 16, { duration: 1.5 }); // Smooth animation
//     }
//   }, [triggerReset]); // Only fly when "Reset" is clicked (or first load)

//   return null;
// }

// function SelfParking() {
//   const { lotId } = useParams();
//   const navigate = useNavigate();

//   // 📍 STATE
//   const [userLocation, setUserLocation] = useState(null);
//   const [loadingLoc, setLoadingLoc] = useState(true);
//   const [resetTrigger, setResetTrigger] = useState(0); // Triggers map re-center

//   // Default Fallback (Armori)
//   const lotLocation = [20.4733646, 79.9804463]; 

//   // 📡 EFFECT: Get Live Location
//   useEffect(() => {
//     if (!navigator.geolocation) {
//       alert("Geolocation is not supported by your browser");
//       setLoadingLoc(false);
//       return;
//     }

//     // Watch Position (Updates automatically as you move)
//     const watchId = navigator.geolocation.watchPosition(
//       (position) => {
//         const newLoc = [position.coords.latitude, position.coords.longitude];
//         setUserLocation(newLoc);
//         setLoadingLoc(false);
        
//         // Auto-center ONLY on the very first fix
//         if (resetTrigger === 0) setResetTrigger(1);
//       },
//       (error) => {
//         console.error("GPS Error:", error);
//         setLoadingLoc(false);
//       },
//       { enableHighAccuracy: true }
//     );

//     return () => navigator.geolocation.clearWatch(watchId);
//   }, []);

//   // ✅ FUNCTION: Reset / Recenter Map
//   const handleResetLocation = () => {
//     if (userLocation) {
//         setResetTrigger(prev => prev + 1); // Triggers the MapController effect
//     } else {
//         alert("Still finding your location...");
//     }
//   };

//   const startParking = async () => {
//     if (!userLocation) {
//         alert("Waiting for GPS location...");
//         return;
//     }
//     try {
//       await axios.post(`http://localhost:8080/api/bookings/create`, {
//   lotId: lotId,
//   userLat: userLocation[0],
//   userLng: userLocation[1]
// });
//       alert("Parking Timer Started! ⏱️");
//       navigate("/dashboard");
//     } catch (error) {
//       console.error("Error starting parking:", error);
//       alert("Failed to start parking session.");
//     }
//   };

//   const openNavigation = () => {
//     if (!userLocation) return;
//     window.open(
//       `http://googleusercontent.com/maps.google.com/maps?saddr=${userLocation[0]},${userLocation[1]}&daddr=${lotLocation[0]},${lotLocation[1]}&dirflg=d`,
//       "_blank"
//     );
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-indigo-500 to-purple-600 p-4">
//       <div className="bg-white/95 backdrop-blur-xl p-6 rounded-3xl shadow-2xl w-full max-w-lg border border-white/20 relative">
        
//         {/* Header */}
//         <div className="text-center mb-6">
//           <div className="inline-block p-3 rounded-full bg-blue-50 text-blue-600 mb-2 shadow-sm">
//             <Crosshair className="w-8 h-8" />
//           </div>
//           <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
//             Self Parking
//           </h2>
//           <p className="text-gray-500 text-sm mt-1">
//             {userLocation ? "Location Locked ✅" : "Locating your vehicle..."}
//           </p>
//         </div>

//         {/* 🗺️ MAP CONTAINER */}
//         <div className="rounded-2xl overflow-hidden shadow-inner border-2 border-white mb-6 h-64 relative z-0 group">
//           {loadingLoc ? (
//             <div className="h-full w-full flex items-center justify-center bg-gray-100 text-gray-500 animate-pulse">
//                 <span>📍 Finding GPS...</span>
//             </div>
//           ) : (
//             <>
//                 <MapContainer 
//                     center={userLocation || lotLocation} 
//                     zoom={16} 
//                     scrollWheelZoom={true} 
//                     style={{ height: "100%", width: "100%" }}
//                 >
//                     <TileLayer
//                         attribution='© OpenStreetMap'
//                         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                     />
                    
//                     {/* Controls Map Movement */}
//                     <MapController center={userLocation || lotLocation} triggerReset={resetTrigger} />

//                     {/* 🔵 YOU ARE HERE */}
//                     {userLocation && (
//                         <Marker position={userLocation}>
//                             <Popup>
//                                 <span className="font-bold text-blue-600">You are here 🔵</span>
//                             </Popup>
//                         </Marker>
//                     )}

//                     {/* 🅿️ DESTINATION */}
//                     <Marker position={lotLocation}>
//                         <Popup>
//                             <span className="font-bold text-indigo-600">Parking Lot 🏁</span>
//                         </Popup>
//                     </Marker>
//                 </MapContainer>

//                 {/* ✅ RESET BUTTON (Floating on Map) */}
//                 <button 
//                     onClick={handleResetLocation}
//                     className="absolute bottom-4 right-4 z-[999] bg-white p-2.5 rounded-full shadow-lg text-slate-700 hover:text-blue-600 hover:bg-blue-50 transition-all active:scale-95 border border-slate-200"
//                     title="Recenter Map"
//                 >
//                     <Crosshair className="w-5 h-5" />
//                 </button>
//             </>
//           )}
//         </div>

//         {/* Buttons */}
//         <div className="space-y-3">
//           <button
//             onClick={openNavigation}
//             disabled={!userLocation}
//             className="w-full group flex items-center justify-center gap-2 bg-blue-50 text-blue-600 font-bold py-3 rounded-xl hover:bg-blue-100 transition-all duration-200 border border-blue-200 disabled:opacity-50"
//           >
//             <Navigation className="w-5 h-5 group-hover:translate-x-1 transition-transform" /> 
//             Navigate to Lot
//           </button>

//           <button
//             onClick={startParking}
//             disabled={!userLocation}
//             className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-bold py-3 rounded-xl shadow-lg hover:shadow-indigo-500/40 hover:scale-[1.02] active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             {loadingLoc ? "Locating..." : "Start Parking Timer"}
//           </button>
//         </div>

//       </div>
//     </div>
//   );
// }

// export default SelfParking;





import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { Navigation, Crosshair, ArrowLeft, MapPin } from "lucide-react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

/* ── Styles ── */
const S = {
  shell:      { minHeight: "100vh", background: "#0A0A0A", display: "flex", alignItems: "center", justifyContent: "center", padding: 20, fontFamily: "'Syne', sans-serif" },
  card:       { width: "100%", maxWidth: 480, background: "#141414", border: "1px solid #242424", borderRadius: 24, padding: 28, position: "relative" },
  backBtn:    { display: "inline-flex", alignItems: "center", gap: 8, background: "transparent", border: "none", color: "#888", fontSize: 13, fontWeight: 600, cursor: "pointer", marginBottom: 20, padding: 0 },
  headerIcon: { width: 52, height: 52, background: "#C8FF0012", border: "1px solid #C8FF0025", borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14 },
  title:      { fontSize: 24, fontWeight: 800, color: "#fff", letterSpacing: "-0.5px", marginBottom: 6 },
  statusRow:  { display: "flex", alignItems: "center", gap: 8, marginBottom: 24 },
  statusDot:  (ok) => ({ width: 8, height: 8, borderRadius: "50%", background: ok ? "#4ade80" : "#fbbf24", boxShadow: ok ? "0 0 6px #4ade8060" : "0 0 6px #fbbf2460" }),
  statusTxt:  (ok) => ({ fontSize: 13, color: ok ? "#4ade80" : "#fbbf24", fontWeight: 600 }),
  mapWrap:    { borderRadius: 16, border: "1px solid #2e2e2e", overflow: "hidden", height: 280, position: "relative", zIndex: 0, marginBottom: 20 },
  mapFallback:{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#1a1a1a", color: "#555", fontSize: 14, fontWeight: 600 },
  recenterBtn:{ position: "absolute", bottom: 12, right: 12, zIndex: 999, background: "#141414", border: "1px solid #2e2e2e", borderRadius: 10, padding: 9, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" },
  navBtn:     { width: "100%", background: "#1a1a1a", border: "1px solid #2e2e2e", color: "#ccc", borderRadius: 12, padding: "13px", fontSize: 14, fontWeight: 700, cursor: "pointer", marginBottom: 10, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 },
  startBtn:   (disabled) => ({ width: "100%", background: disabled ? "#1e1e1e" : "#C8FF00", color: disabled ? "#444" : "#000", border: "none", borderRadius: 12, padding: "14px", fontSize: 15, fontWeight: 800, cursor: disabled ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }),
};

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&display=swap');
  body { font-family: 'Syne', sans-serif; margin: 0; }
  .dark-btn:hover { opacity: 0.85; }
`;

function MapController({ center, triggerReset }) {
  const map = useMap();
  useEffect(() => { if (center) map.flyTo(center, 16, { duration: 1.5 }); }, [triggerReset]);
  return null;
}

function SelfParking() {
  const { lotId } = useParams();
  const navigate = useNavigate();
  const [userLocation, setUserLocation] = useState(null);
  const [loadingLoc, setLoadingLoc] = useState(true);
  const [resetTrigger, setResetTrigger] = useState(0);
  const lotLocation = [20.4733646, 79.9804463];

  useEffect(() => {
    if (!navigator.geolocation) { alert("Geolocation not supported"); setLoadingLoc(false); return; }
    const id = navigator.geolocation.watchPosition(
      pos => {
        const loc = [pos.coords.latitude, pos.coords.longitude];
        setUserLocation(loc); setLoadingLoc(false);
        if (resetTrigger === 0) setResetTrigger(1);
      },
      err => { console.error(err); setLoadingLoc(false); },
      { enableHighAccuracy: true }
    );
    return () => navigator.geolocation.clearWatch(id);
  }, []);

  const handleReset = () => {
    if (userLocation) setResetTrigger(p => p + 1);
    else alert("Still finding your location...");
  };

  const startParking = async () => {
    if (!userLocation) { alert("Waiting for GPS..."); return; }
    try {
      await axios.post("http://localhost:8080/api/bookings/create", { lotId, userLat: userLocation[0], userLng: userLocation[1] });
      alert("Parking Timer Started!");
      navigate("/dashboard");
    } catch { alert("Failed to start parking session."); }
  };

  const openNav = () => {
    if (!userLocation) return;
    window.open(`https://maps.google.com/maps?saddr=${userLocation[0]},${userLocation[1]}&daddr=${lotLocation[0]},${lotLocation[1]}&dirflg=d`, "_blank");
  };

  const locReady = !!userLocation && !loadingLoc;

  return (
    <>
      <style>{css}</style>
      <div style={S.shell}>
        <div style={S.card}>
          <button style={S.backBtn} onClick={() => navigate(-1)} className="dark-btn">
            <ArrowLeft size={15} /> Back
          </button>

          <div style={S.headerIcon}><Crosshair size={24} color="#C8FF00" /></div>
          <h1 style={S.title}>Self Parking</h1>
          <div style={S.statusRow}>
            <div style={S.statusDot(locReady)} />
            <span style={S.statusTxt(locReady)}>
              {loadingLoc ? "Finding your location…" : locReady ? "Location locked ✓" : "GPS unavailable"}
            </span>
          </div>

          <div style={S.mapWrap}>
            {loadingLoc ? (
              <div style={S.mapFallback}><MapPin size={18} style={{ marginRight: 8 }} /> Finding GPS…</div>
            ) : (
              <>
                <MapContainer center={userLocation || lotLocation} zoom={16} scrollWheelZoom style={{ height: "100%", width: "100%" }}>
                  <TileLayer attribution="© OpenStreetMap" url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  <MapController center={userLocation || lotLocation} triggerReset={resetTrigger} />
                  {userLocation && (
                    <Marker position={userLocation}>
                      <Popup><strong style={{ color: "#4ade80" }}>You are here</strong></Popup>
                    </Marker>
                  )}
                  <Marker position={lotLocation}>
                    <Popup><strong style={{ color: "#C8FF00" }}>Parking Lot</strong></Popup>
                  </Marker>
                </MapContainer>
                <button onClick={handleReset} style={S.recenterBtn} title="Recenter">
                  <Crosshair size={16} color="#C8FF00" />
                </button>
              </>
            )}
          </div>

          <button onClick={openNav} disabled={!locReady} style={{ ...S.navBtn, opacity: locReady ? 1 : 0.4 }} className="dark-btn">
            <Navigation size={16} /> Navigate to Lot
          </button>
          <button onClick={startParking} disabled={!locReady} style={S.startBtn(!locReady)} className="dark-btn">
            {loadingLoc ? "Locating…" : "Start Parking Timer"}
          </button>
        </div>
      </div>
    </>
  );
}

export default SelfParking;