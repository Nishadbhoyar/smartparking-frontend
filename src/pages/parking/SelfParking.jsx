


// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import L from "leaflet";

// // 🔧 FIX: Fix broken Leaflet marker icons
// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
//   iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
//   shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
// });

// // Helper component to smoothly center map when location changes
// function RecenterMap({ position }) {
//   const map = useMap();
//   useEffect(() => {
//     if (position) map.setView(position, map.getZoom());
//   }, [position, map]);
//   return null;
// }

// function SelfParking() {
//   const { lotId } = useParams();
//   const navigate = useNavigate();

//   // 📍 STATE: Store the user's LIVE location
//   const [userLocation, setUserLocation] = useState(null);
//   const [loadingLoc, setLoadingLoc] = useState(true);

//   // 🏁 Destination (Parking Lot) - You would normally fetch this
//   const lotLocation = [18.5204, 73.8567]; // Hardcoded Lot Location

//   // 📡 EFFECT: Get Live Location
//   useEffect(() => {
//     if (!navigator.geolocation) {
//       alert("Geolocation is not supported by your browser");
//       setLoadingLoc(false);
//       return;
//     }

//     // Use watchPosition to track movement in real-time
//     const watchId = navigator.geolocation.watchPosition(
//       (position) => {
//         setUserLocation([position.coords.latitude, position.coords.longitude]);
//         setLoadingLoc(false);
//       },
//       (error) => {
//         console.error("Error getting location:", error);
//         alert("Please enable location services to use Self Parking.");
//         setLoadingLoc(false);
//       },
//       { enableHighAccuracy: true }
//     );

//     // Cleanup: Stop tracking when component unmounts
//     return () => navigator.geolocation.clearWatch(watchId);
//   }, []);

//   const startParking = async () => {
//     if (!userLocation) {
//         alert("Waiting for location...");
//         return;
//     }
//     try {
//       // Send the user's ACTUAL location to the backend
//       await axios.post(`http://localhost:https://smartparking-backend-1.onrender.com/api/bookings/create`, {
//         lotId: lotId,
//         userLat: userLocation[0],
//         userLng: userLocation[1]
//       });
//       alert("Parking Timer Started! ⏱️");
//       navigate("/dashboard");
//     } catch (error) {
//       console.error("Error starting parking:", error);
//       alert("Failed to start parking session.");
//     }
//   };

//   const openNavigation = () => {
//     if (!userLocation) return;
//     // Open Google Maps Navigation from Current Loc -> Lot Loc
//     window.open(
//       `https://www.google.com/maps/dir/?api=1&origin=${userLocation[0]},${userLocation[1]}&destination=${lotLocation[0]},${lotLocation[1]}&travelmode=driving`,
//       "_blank"
//     );
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-indigo-500 to-purple-600 p-4">
//       <div className="bg-white/95 backdrop-blur-xl p-6 rounded-3xl shadow-2xl w-full max-w-lg border border-white/20">
        
//         {/* Header */}
//         <div className="text-center mb-6">
//           <div className="inline-block p-3 rounded-full bg-blue-50 text-blue-600 mb-2 shadow-sm">
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
//             </svg>
//           </div>
//           <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
//             Self Parking
//           </h2>
//           <p className="text-gray-500 text-sm mt-1">Locating your vehicle...</p>
//         </div>

//         {/* 🗺️ MAP CONTAINER */}
//         <div className="rounded-2xl overflow-hidden shadow-inner border-2 border-white mb-6 h-64 relative z-0">
//           {loadingLoc ? (
//             <div className="h-full w-full flex items-center justify-center bg-gray-100 text-gray-500 animate-pulse">
//                 <span>📍 Finding GPS...</span>
//             </div>
//           ) : (
//             <MapContainer 
//                 center={userLocation || lotLocation} 
//                 zoom={16} 
//                 scrollWheelZoom={true} 
//                 style={{ height: "100%", width: "100%" }}
//             >
//                 <TileLayer
//                     attribution='&copy; OpenStreetMap'
//                     url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                 />
//                 <RecenterMap position={userLocation} />

//                 {/* 🔵 YOU ARE HERE */}
//                 {userLocation && (
//                     <Marker position={userLocation}>
//                         <Popup>
//                             <span className="font-bold text-blue-600">You are here 🔵</span>
//                         </Popup>
//                     </Marker>
//                 )}

//                 {/* 🅿️ DESTINATION */}
//                 <Marker position={lotLocation}>
//                     <Popup>
//                         <span className="font-bold text-indigo-600">Parking Lot 🏁</span>
//                     </Popup>
//                 </Marker>
//             </MapContainer>
//           )}
//         </div>

//         {/* Buttons */}
//         <div className="space-y-3">
//           <button
//             onClick={openNavigation}
//             disabled={!userLocation}
//             className="w-full group flex items-center justify-center gap-2 bg-blue-50 text-blue-600 font-bold py-3 rounded-xl hover:bg-blue-100 transition-all duration-200 border border-blue-200 disabled:opacity-50"
//           >
//             <span className="group-hover:translate-x-1 transition-transform">🧭</span> 
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

import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { Navigation, Crosshair } from "lucide-react"; // Icons
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// 🔧 FIX: Fix broken Leaflet marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// ✅ NEW: Map Controller to handle "Fly To" animation
function MapController({ center, triggerReset }) {
  const map = useMap();
  
  useEffect(() => {
    if (center) {
      map.flyTo(center, 16, { duration: 1.5 }); // Smooth animation
    }
  }, [triggerReset]); // Only fly when "Reset" is clicked (or first load)

  return null;
}

function SelfParking() {
  const { lotId } = useParams();
  const navigate = useNavigate();

  // 📍 STATE
  const [userLocation, setUserLocation] = useState(null);
  const [loadingLoc, setLoadingLoc] = useState(true);
  const [resetTrigger, setResetTrigger] = useState(0); // Triggers map re-center

  // Default Fallback (Armori)
  const lotLocation = [20.4733646, 79.9804463]; 

  // 📡 EFFECT: Get Live Location
  useEffect(() => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      setLoadingLoc(false);
      return;
    }

    // Watch Position (Updates automatically as you move)
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const newLoc = [position.coords.latitude, position.coords.longitude];
        setUserLocation(newLoc);
        setLoadingLoc(false);
        
        // Auto-center ONLY on the very first fix
        if (resetTrigger === 0) setResetTrigger(1);
      },
      (error) => {
        console.error("GPS Error:", error);
        setLoadingLoc(false);
      },
      { enableHighAccuracy: true }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  // ✅ FUNCTION: Reset / Recenter Map
  const handleResetLocation = () => {
    if (userLocation) {
        setResetTrigger(prev => prev + 1); // Triggers the MapController effect
    } else {
        alert("Still finding your location...");
    }
  };

  const startParking = async () => {
    if (!userLocation) {
        alert("Waiting for GPS location...");
        return;
    }
    try {
      await axios.post(`https://smartparking-backend-1.onrender.com/api/bookings/create`, {
        lotId: lotId,
        userLat: userLocation[0],
        userLng: userLocation[1]
      });
      alert("Parking Timer Started! ⏱️");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error starting parking:", error);
      alert("Failed to start parking session.");
    }
  };

  const openNavigation = () => {
    if (!userLocation) return;
    window.open(
      `http://googleusercontent.com/maps.google.com/maps?saddr=${userLocation[0]},${userLocation[1]}&daddr=${lotLocation[0]},${lotLocation[1]}&dirflg=d`,
      "_blank"
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-indigo-500 to-purple-600 p-4">
      <div className="bg-white/95 backdrop-blur-xl p-6 rounded-3xl shadow-2xl w-full max-w-lg border border-white/20 relative">
        
        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-block p-3 rounded-full bg-blue-50 text-blue-600 mb-2 shadow-sm">
            <Crosshair className="w-8 h-8" />
          </div>
          <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
            Self Parking
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            {userLocation ? "Location Locked ✅" : "Locating your vehicle..."}
          </p>
        </div>

        {/* 🗺️ MAP CONTAINER */}
        <div className="rounded-2xl overflow-hidden shadow-inner border-2 border-white mb-6 h-64 relative z-0 group">
          {loadingLoc ? (
            <div className="h-full w-full flex items-center justify-center bg-gray-100 text-gray-500 animate-pulse">
                <span>📍 Finding GPS...</span>
            </div>
          ) : (
            <>
                <MapContainer 
                    center={userLocation || lotLocation} 
                    zoom={16} 
                    scrollWheelZoom={true} 
                    style={{ height: "100%", width: "100%" }}
                >
                    <TileLayer
                        attribution='© OpenStreetMap'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    
                    {/* Controls Map Movement */}
                    <MapController center={userLocation || lotLocation} triggerReset={resetTrigger} />

                    {/* 🔵 YOU ARE HERE */}
                    {userLocation && (
                        <Marker position={userLocation}>
                            <Popup>
                                <span className="font-bold text-blue-600">You are here 🔵</span>
                            </Popup>
                        </Marker>
                    )}

                    {/* 🅿️ DESTINATION */}
                    <Marker position={lotLocation}>
                        <Popup>
                            <span className="font-bold text-indigo-600">Parking Lot 🏁</span>
                        </Popup>
                    </Marker>
                </MapContainer>

                {/* ✅ RESET BUTTON (Floating on Map) */}
                <button 
                    onClick={handleResetLocation}
                    className="absolute bottom-4 right-4 z-[999] bg-white p-2.5 rounded-full shadow-lg text-slate-700 hover:text-blue-600 hover:bg-blue-50 transition-all active:scale-95 border border-slate-200"
                    title="Recenter Map"
                >
                    <Crosshair className="w-5 h-5" />
                </button>
            </>
          )}
        </div>

        {/* Buttons */}
        <div className="space-y-3">
          <button
            onClick={openNavigation}
            disabled={!userLocation}
            className="w-full group flex items-center justify-center gap-2 bg-blue-50 text-blue-600 font-bold py-3 rounded-xl hover:bg-blue-100 transition-all duration-200 border border-blue-200 disabled:opacity-50"
          >
            <Navigation className="w-5 h-5 group-hover:translate-x-1 transition-transform" /> 
            Navigate to Lot
          </button>

          <button
            onClick={startParking}
            disabled={!userLocation}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-bold py-3 rounded-xl shadow-lg hover:shadow-indigo-500/40 hover:scale-[1.02] active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loadingLoc ? "Locating..." : "Start Parking Timer"}
          </button>
        </div>

      </div>
    </div>
  );
}

export default SelfParking;