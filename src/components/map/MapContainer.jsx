import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons missing in React Leaflet
delete L.Icon.Default.prototype._getIconUrl;

// ── Custom dark-themed parking marker icon ──
const parkingIcon = L.divIcon({
  className: '',
  html: `
    <div style="
      width: 36px; height: 36px;
      background: #C8FF00;
      border: 3px solid #0A0A0A;
      border-radius: 50% 50% 50% 0;
      transform: rotate(-45deg);
      box-shadow: 0 4px 14px rgba(200,255,0,0.5);
      display: flex; align-items: center; justify-content: center;
    ">
      <span style="
        transform: rotate(45deg);
        font-size: 14px;
        font-weight: 900;
        color: #000;
        line-height: 1;
        display: block;
        text-align: center;
        padding-top: 2px;
      ">P</span>
    </div>
  `,
  iconSize: [36, 36],
  iconAnchor: [18, 36],
  popupAnchor: [0, -38],
});

// ── Custom user location icon ──
const userIcon = L.divIcon({
  className: '',
  html: `
    <div style="
      width: 18px; height: 18px;
      background: #C8FF00;
      border: 3px solid #0A0A0A;
      border-radius: 50%;
      box-shadow: 0 0 0 6px rgba(200,255,0,0.2), 0 0 0 12px rgba(200,255,0,0.08);
    "></div>
  `,
  iconSize: [18, 18],
  iconAnchor: [9, 9],
  popupAnchor: [0, -12],
});

// Popup styles injected once
const darkPopupCSS = `
  .leaflet-popup-content-wrapper {
    background: #141414 !important;
    border: 1px solid #2a2a2a !important;
    border-radius: 14px !important;
    box-shadow: 0 8px 32px rgba(0,0,0,0.6) !important;
    padding: 0 !important;
    overflow: hidden;
  }
  .leaflet-popup-content {
    margin: 0 !important;
    width: auto !important;
  }
  .leaflet-popup-tip {
    background: #141414 !important;
    border: 1px solid #2a2a2a !important;
  }
  .leaflet-popup-tip-container {
    filter: drop-shadow(0 2px 4px rgba(0,0,0,0.5));
  }
  .leaflet-popup-close-button {
    color: #555 !important;
    font-size: 18px !important;
    top: 8px !important;
    right: 10px !important;
  }
  .leaflet-popup-close-button:hover {
    color: #C8FF00 !important;
  }
  .leaflet-control-zoom a {
    background: #141414 !important;
    color: #C8FF00 !important;
    border-color: #2a2a2a !important;
  }
  .leaflet-control-zoom a:hover {
    background: #1e1e1e !important;
  }
  .leaflet-control-attribution {
    background: rgba(10,10,10,0.8) !important;
    color: #444 !important;
    font-size: 10px !important;
  }
  .leaflet-control-attribution a {
    color: #666 !important;
  }
  /* Compact "You are here" popup — no extra padding */
  .you-here-popup .leaflet-popup-content-wrapper {
    border-radius: 8px !important;
  }
  .you-here-popup .leaflet-popup-content {
    margin: 0 !important;
    line-height: 1 !important;
  }
`;

// Component to recenter map when user location changes — UNCHANGED
function MapRecenter({ center }) {
  const map = useMap();
  useEffect(() => {
    if (center) map.setView(center, 15);
  }, [center, map]);
  return null;
}

// Smart Marker Component — logic UNCHANGED, only styling updated
const ParkingMarker = ({ lot, isHovered, onSelectLot }) => {
  const markerRef = useRef(null);

  useEffect(() => {
    if (markerRef.current) {
      if (isHovered) markerRef.current.openPopup();
      else markerRef.current.closePopup();
    }
  }, [isHovered]);

  const lat = parseFloat(lot.latitude);
  const lng = parseFloat(lot.longitude);

  if (isNaN(lat) || isNaN(lng)) return null;

  const isPaused = lot.status === 'PAUSED';

  return (
    <Marker ref={markerRef} position={[lat, lng]} icon={parkingIcon}>
      <Popup>
        <div style={{ minWidth: 180, fontFamily: "'Syne', sans-serif", padding: '16px' }}>
          {/* Header */}
          <div style={{ marginBottom: 10 }}>
            <h4 style={{
              margin: 0, fontSize: 15, fontWeight: 800,
              color: '#ffffff', letterSpacing: '-0.3px',
            }}>
              {lot.name}
            </h4>
            <p style={{
              margin: '4px 0 0', fontSize: 11,
              color: '#666', lineHeight: 1.4,
            }}>
              {lot.address}
            </p>
          </div>

          {/* Divider */}
          <div style={{ borderTop: '1px solid #2a2a2a', marginBottom: 12 }} />

          {/* Price + Button */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 18, fontWeight: 800, color: '#C8FF00' }}>
              ₹{lot.slots?.[0]?.price || 50}
              <span style={{ fontSize: 11, color: '#555', fontWeight: 400 }}>/hr</span>
            </span>
            <button
              onClick={() => onSelectLot(lot)}
              disabled={isPaused}
              style={{
                padding: '7px 14px',
                borderRadius: 8,
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: '0.06em',
                border: 'none',
                cursor: isPaused ? 'not-allowed' : 'pointer',
                background: isPaused ? '#2a2a2a' : '#C8FF00',
                color: isPaused ? '#555' : '#000',
                transition: 'opacity 0.2s',
              }}
            >
              {isPaused ? 'CLOSED' : 'BOOK'}
            </button>
          </div>
        </div>
      </Popup>
    </Marker>
  );
};

function CustomMap({ lots, onSelectLot, hoveredLotId }) {
  // ✅ FIX: Default to Armori (Your Coordinates) — UNCHANGED
  const [currentPosition, setCurrentPosition] = useState([20.4733646, 79.9804463]);

  useEffect(() => {
    if (navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          setCurrentPosition([position.coords.latitude, position.coords.longitude]);
        },
        (error) => console.warn("GPS Error (Using Default):", error.message),
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
      return () => navigator.geolocation.clearWatch(watchId);
    }
  }, []);

  return (
    <>
      {/* Inject dark popup + control styles */}
      <style>{darkPopupCSS}</style>

      <div style={{
        height: '100%', width: '100%',
        borderRadius: 20, overflow: 'hidden',
        border: '1px solid #242424',
        boxShadow: '0 0 0 1px #1a1a1a inset',
        position: 'relative', zIndex: 0,
      }}>
        <MapContainer center={currentPosition} zoom={15} style={{ height: '100%', width: '100%' }}>
          <MapRecenter center={currentPosition} />

          {/* ── Dark map tiles (CartoDB Dark Matter) ── */}
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          />

          {/* 📍 User Location — logic UNCHANGED */}
          <Marker position={currentPosition} icon={userIcon}>
            <Popup minWidth={90} maxWidth={120} className="you-here-popup">
              <div style={{
                display: 'flex', alignItems: 'center', gap: 6,
                padding: '6px 10px',
                fontFamily: "'Syne', sans-serif",
                whiteSpace: 'nowrap',
              }}>
                <div style={{
                  width: 7, height: 7, borderRadius: '50%', flexShrink: 0,
                  background: '#C8FF00', boxShadow: '0 0 5px #C8FF0090',
                }} />
                <span style={{ fontSize: 12, fontWeight: 700, color: '#fff' }}>
                  You are here
                </span>
              </div>
            </Popup>
          </Marker>

          {/* 🅿️ Parking Lots — logic UNCHANGED */}
          {lots && lots.map((lot) => (
            <ParkingMarker
              key={lot.id}
              lot={lot}
              isHovered={lot.id === hoveredLotId}
              onSelectLot={onSelectLot}
            />
          ))}
        </MapContainer>
      </div>
    </>
  );
}

export default CustomMap;