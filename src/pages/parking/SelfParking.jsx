


// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";

// function SelfParking() {
//   const { lotId } = useParams();
//   const navigate = useNavigate();

//   const lotLat = 18.5204;   // fetch from backend later
//   const lotLng = 73.8567;

//   const startParking = async () => {
//     await axios.post(
//       `http://localhost:8080/api/bookings/create?lotId=${lotId}`
//     );
//     alert("Parking Started");
//     navigate("/dashboard");
//   };

//   const openNavigation = () => {
//     window.open(
//       `https://www.openstreetmap.org/directions?engine=fossgis_osrm_car&route=${lotLat},${lotLng}`,
//       "_blank"
//     );
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-blue-50">
//       <div className="bg-white p-8 rounded-xl shadow-lg w-96 text-center">
//         <h2 className="text-2xl font-bold mb-4">🅿️ Self Parking</h2>

//         <button
//           onClick={openNavigation}
//           className="w-full bg-slate-200 py-3 rounded-lg mb-4 font-bold"
//         >
//           🧭 Navigate to Parking
//         </button>

//         <button
//           onClick={startParking}
//           className="w-full bg-indigo-600 text-white py-3 rounded-lg font-bold"
//         >
//           ⏱️ Start Parking
//         </button>
//       </div>
//     </div>
//   );
// }

// export default SelfParking;


import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// 🔧 FIX: Fix broken Leaflet marker icons using CDN (Matches your MapContainer approach)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

function SelfParking() {
  const { lotId } = useParams();
  const navigate = useNavigate();

  // 📍 Mock Data (Replace with fetch based on lotId in useEffect)
  const lotLat = 18.5204;
  const lotLng = 73.8567;
  const position = [lotLat, lotLng];

  const startParking = async () => {
    try {
      await axios.post(
        `http://localhost:8080/api/bookings/create?lotId=${lotId}`
      );
      alert("Parking Timer Started! ⏱️");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error starting parking:", error);
      alert("Failed to start parking session.");
    }
  };

  const openNavigation = () => {
    // Uses OpenStreetMap navigation engine
    window.open(
      `https://www.openstreetmap.org/directions?engine=fossgis_osrm_car&route=${lotLat},${lotLng}`,
      "_blank"
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-indigo-500 to-purple-600 p-4">
      <div className="bg-white/95 backdrop-blur-xl p-6 rounded-3xl shadow-2xl w-full max-w-lg border border-white/20 transform transition-all hover:scale-[1.01] duration-300">
        
        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-block p-3 rounded-full bg-blue-50 text-blue-600 mb-2 shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
            Self Parking
          </h2>
          <p className="text-gray-500 text-sm mt-1">Verify location & start timer</p>
        </div>

        {/* 🗺️ MAP CONTAINER - Critical for display */}
        <div className="rounded-2xl overflow-hidden shadow-inner border-2 border-white mb-6 h-64 relative z-0">
          <MapContainer 
            center={position} 
            zoom={16} 
            scrollWheelZoom={false} 
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              attribution='&copy; OpenStreetMap'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position}>
              <Popup>
                <span className="font-bold text-indigo-600">Park Here!</span>
              </Popup>
            </Marker>
          </MapContainer>
        </div>

        {/* Buttons */}
        <div className="space-y-3">
          <button
            onClick={openNavigation}
            className="w-full group flex items-center justify-center gap-2 bg-blue-50 text-blue-600 font-bold py-3 rounded-xl hover:bg-blue-100 transition-all duration-200 border border-blue-200"
          >
            <span className="group-hover:translate-x-1 transition-transform">🧭</span> 
            Navigate to Location
          </button>

          <button
            onClick={startParking}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-bold py-3 rounded-xl shadow-lg hover:shadow-indigo-500/40 hover:scale-[1.02] active:scale-95 transition-all duration-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Start Parking Timer
          </button>
        </div>

      </div>
    </div>
  );
}

export default SelfParking;
