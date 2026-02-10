
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { useState } from "react";
import "leaflet/dist/leaflet.css";

function LocationMarker({ setLocation }) {
  const [position, setPosition] = useState(null);

  useMapEvents({
    click(e) {
      setPosition(e.latlng);
      setLocation(e.latlng);
    }
  });

  return position ? (
    <Marker position={position} />
  ) : (
    // Visual cue for user to click
    <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-[1000] bg-white/90 backdrop-blur px-4 py-2 rounded-full shadow-lg text-xs font-bold text-blue-600 border border-blue-100 animate-bounce">
      👇 Tap map to pin location
    </div>
  );
}

export default function LocationPicker({ setLocation }) {
  return (
    <div className="w-full rounded-2xl overflow-hidden shadow-lg border border-gray-200 relative group">
      <MapContainer 
        center={[18.5204, 73.8567]} 
        zoom={13} 
        className="h-80 w-full z-0"
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <LocationMarker setLocation={setLocation} />
      </MapContainer>
      
      {/* Overlay hint */}
      <div className="absolute bottom-2 right-2 z-[999] bg-white/80 backdrop-blur px-2 py-1 rounded text-[10px] text-gray-500 shadow-sm pointer-events-none">
        Click to set coordinates
      </div>
    </div>
  );
}