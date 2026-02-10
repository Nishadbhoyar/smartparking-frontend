import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons missing in React Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Component to recenter map when user location changes
function MapRecenter({ center }) {
  const map = useMap();
  useEffect(() => {
    if (center) map.setView(center, 15);
  }, [center, map]);
  return null;
}

// 🟢 NEW: Smart Marker Component
// This handles the hover effect independently for each marker
const ParkingMarker = ({ lot, isHovered, onSelectLot }) => {
  const markerRef = useRef(null);

  // 👂 Listen for hover changes
  useEffect(() => {
    if (markerRef.current) {
      if (isHovered) {
        markerRef.current.openPopup();
      } else {
        markerRef.current.closePopup();
      }
    }
  }, [isHovered]);

  const lat = parseFloat(lot.latitude);
  const lng = parseFloat(lot.longitude);

  // Safety check for invalid coordinates
  if (isNaN(lat) || isNaN(lng)) return null;

  return (
    <Marker ref={markerRef} position={[lat, lng]}>
      <Popup>
        <div className="min-w-[150px] font-sans">
          <h4 className="font-black uppercase text-sm text-slate-800 mb-1">{lot.name}</h4>
          <p className="text-xs text-slate-500 mb-3 leading-tight">{lot.address}</p>
          
          <div className="flex justify-between items-center border-t border-slate-100 pt-3">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase">Rate</p>
              <span className="text-indigo-600 font-black text-sm">
                ₹{lot.slots?.[0]?.price || 50}<span className="text-[10px] text-slate-400 font-medium">/hr</span>
              </span>
            </div>
            
            <button 
              onClick={() => onSelectLot(lot)} // 👈 Connects to booking modal
              disabled={lot.status === 'PAUSED'}
              className={`px-3 py-1.5 rounded-lg text-[10px] font-bold tracking-wide text-white transition-all ${
                lot.status === 'PAUSED' 
                  ? 'bg-slate-300 cursor-not-allowed' 
                  : 'bg-slate-900 hover:bg-indigo-600 shadow-lg'
              }`}
            >
              {lot.status === 'PAUSED' ? 'CLOSED' : 'BOOK'}
            </button>
          </div>
        </div>
      </Popup>
    </Marker>
  );
};

// 🟢 MAIN COMPONENT
function CustomMap({ lots, onSelectLot, hoveredLotId }) {
  const [currentPosition, setCurrentPosition] = useState([18.5204, 73.8567]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentPosition([position.coords.latitude, position.coords.longitude]);
        },
        (error) => console.log("Using default coordinates provided."),
        { enableHighAccuracy: true }
      );
    }
  }, []);

  return (
    <div className="h-full w-full rounded-3xl overflow-hidden shadow-inner border border-gray-200 relative z-0">
      <MapContainer center={currentPosition} zoom={15} style={{ height: "100%", width: "100%" }}>
        <MapRecenter center={currentPosition} />
        
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; OpenStreetMap'
        />

        {/* 📍 User Location */}
        <Marker position={currentPosition}>
          <Popup>
             <b className="text-indigo-600">You are here</b>
          </Popup>
        </Marker>

        {/* 🅿️ Parking Lots Rendered via Smart Marker */}
        {lots && lots.map((lot) => (
          <ParkingMarker 
            key={lot.id} 
            lot={lot} 
            isHovered={lot.id === hoveredLotId} // 👈 Pass the hover state
            onSelectLot={onSelectLot}           // 👈 Pass the booking handler
          />
        ))}
      </MapContainer>
    </div>
  );
}

export default CustomMap;