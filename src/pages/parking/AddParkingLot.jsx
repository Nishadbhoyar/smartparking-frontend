import { useState, useEffect } from "react"; // 👈 Added useEffect
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Navigation, Plus, Trash2, Car, Bike, Truck, ArrowLeft } from "lucide-react";
import axios from "axios";
import L from "leaflet";
import { useNavigate } from "react-router-dom";

// Fix for default Leaflet marker icons in React
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

/* =============================
   MAP CLICK LOCATION PICKER
============================= */
function LocationPicker({ setLocation }) {
  const [position, setPosition] = useState(null);
  useMapEvents({
    click(e) {
      setPosition(e.latlng);
      setLocation(e.latlng);
    },
  });
  return position ? <Marker position={position} /> : null;
}

/* =============================
   ADD PARKING LOT COMPONENT
============================= */
function AddParkingLot() {
  const navigate = useNavigate();

  // ✅ 1. GET OWNER ID FROM STORAGE
  const [ownerId, setOwnerId] = useState(null);

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      const user = JSON.parse(userStr);
      setOwnerId(user.id);
    } else {
      alert("You must be logged in to add a lot.");
      navigate("/login");
    }
  }, [navigate]);

  // Basic Info
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("PUBLIC");

  // Location Info
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  // Slot Configuration
  const [slots, setSlots] = useState([
    { vehicleType: "CAR", capacity: 0, price: 0 },
  ]);

  // Amenities
  const [features, setFeatures] = useState({
    cctv: false,
    security: false,
    covered: false,
    evCharging: false,
  });

  // --- Handlers ---

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setLatitude(pos.coords.latitude);
      setLongitude(pos.coords.longitude);
    });
  };

  const addSlotRow = () => {
    setSlots([...slots, { vehicleType: "BIKE", capacity: 0, price: 0 }]);
  };

  const removeSlotRow = (index) => {
    const newSlots = slots.filter((_, i) => i !== index);
    setSlots(newSlots);
  };

  const handleSlotChange = (index, field, value) => {
    const newSlots = [...slots];
    // ✅ FIX: Prevent NaN if user clears the input
    if (field === "capacity") {
        newSlots[index][field] = parseInt(value) || 0; 
    } else if (field === "price") {
        newSlots[index][field] = parseFloat(value) || 0;
    } else {
        newSlots[index][field] = value;
    }
    setSlots(newSlots);
  };

  const handleFeatureChange = (e) => {
    setFeatures({ ...features, [e.target.name]: e.target.checked });
  };

  const handleSubmit = async () => {
    // Validation
    if (!ownerId) {
        alert("Error: Admin ID not found. Please relogin.");
        return;
    }
    if (!latitude || !longitude) {
      alert("Please select location on map");
      return;
    }

    // ✅ GET THE TOKEN FROM LOCAL STORAGE
    const token = localStorage.getItem("token"); 

    // Construct Payload
    const payload = {
      name,
      address,
      description,
      type, 
      location: { latitude, longitude },
      parkingSlots: slots, 
      amenities: features,
    };

    console.log("Submitting Payload:", payload);

    try {
      // ✅ ADDED AUTHORIZATION HEADER
      await axios.post(
  `http://localhost:8080/api/parking-lots?ownerId=${ownerId}`,
  payload,
  {
    headers: {
      Authorization: `Bearer ${token}` 
    }
  }
);
      
      alert("Parking Lot Added Successfully!");
      navigate("/admin-dashboard");
    } catch (error) {
      console.error(error);
      // The Axios interceptor we discussed will handle the 401 redirect automatically
      if (error.response?.status !== 401) {
        alert("Failed to add parking lot");
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-3xl shadow-xl my-10 border border-slate-100">
      
      <button 
        onClick={() => navigate("/admin-dashboard")}
        className="flex items-center text-slate-500 hover:text-slate-800 font-bold mb-4 transition-colors hover:-translate-x-1 duration-200"
      >
        <ArrowLeft className="mr-2" size={20} /> Back to Dashboard
      </button>

      <h2 className="text-3xl font-black mb-6 text-slate-800">Add New Parking Lot</h2>

      {/* 1. Basic Details */}
      {/* 1. Basic Details */}
      <div className="space-y-4 mb-8">
        <h3 className="text-xl font-bold text-slate-700">Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            className="w-full p-4 bg-slate-50 rounded-xl border border-slate-200 focus:outline-indigo-500 font-bold text-slate-700"
            placeholder="Parking Lot Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="w-full p-4 bg-slate-50 rounded-xl border border-slate-200 focus:outline-indigo-500 font-bold text-slate-700"
            placeholder="Address / Area"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        {/* ✅ NEW: Parking Type Dropdown */}
        <div>
            <label className="block text-sm font-bold text-slate-500 mb-2 ml-1">Parking Type</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full p-4 bg-slate-50 rounded-xl border border-slate-200 font-bold text-slate-700 focus:outline-indigo-500 cursor-pointer"
            >
              <option value="PUBLIC">Public / Street Parking</option>
              <option value="MALL">Mall / Commercial Complex</option>
              <option value="RESIDENTIAL">Residential Society</option>
              <option value="OFFICE">Corporate / Office</option>
              <option value="AIRPORT">Airport / Station</option>
              <option value="EVENT">Event / Stadium</option>
            </select>
        </div>

        <textarea
          className="w-full p-4 bg-slate-50 rounded-xl border border-slate-200 focus:outline-indigo-500 font-medium text-slate-600"
          placeholder="Description (e.g., Near Main Market, Enter from back gate...)"
          rows="2"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      {/* 2. Slot Configuration (Dynamic) */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-slate-700">Capacity & Pricing</h3>
          <button
            onClick={addSlotRow}
            className="text-sm bg-indigo-100 text-indigo-700 px-4 py-2 rounded-xl font-bold flex items-center gap-1 hover:bg-indigo-200 transition"
          >
            <Plus size={16} /> Add Vehicle Type
          </button>
        </div>

        <div className="space-y-3">
          {slots.map((slot, index) => (
            <div key={index} className="flex flex-wrap md:flex-nowrap gap-3 items-center bg-slate-50 p-3 rounded-xl border border-slate-200">
              {/* Icon Logic */}
              <div className="text-slate-400 p-2">
                {slot.vehicleType === 'CAR' && <Car />}
                {slot.vehicleType === 'BIKE' && <Bike />}
                {slot.vehicleType === 'TRUCK' && <Truck />}
              </div>

              {/* Vehicle Type Select */}
              <select
                className="p-3 bg-white rounded-lg border w-full md:w-1/4 font-bold text-slate-700"
                value={slot.vehicleType}
                onChange={(e) => handleSlotChange(index, "vehicleType", e.target.value)}
              >
                <option value="CAR">Car (4 Wheeler)</option>
                <option value="BIKE">Bike (2 Wheeler)</option>
                <option value="TRUCK">Truck/Heavy</option>
              </select>

              {/* Capacity Input */}
              <input
                type="number"
                placeholder="Total Spots"
                className="p-3 bg-white rounded-lg border w-full md:w-1/4 font-bold text-slate-700"
                value={slot.capacity}
                onChange={(e) => handleSlotChange(index, "capacity", e.target.value)}
              />

              {/* Price Input */}
              <input
                type="number"
                placeholder="Price/Hr (₹)"
                className="p-3 bg-white rounded-lg border w-full md:w-1/4 font-bold text-slate-700"
                value={slot.price}
                onChange={(e) => handleSlotChange(index, "price", e.target.value)}
              />

              {/* Remove Button */}
              {slots.length > 1 && (
                <button
                  onClick={() => removeSlotRow(index)}
                  className="p-3 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                >
                  <Trash2 size={20} />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 3. Amenities / Features */}
      <div className="mb-8">
        <h3 className="text-xl font-bold text-slate-700 mb-4">Facilities</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.keys(features).map((key) => (
            <label key={key} className="flex items-center space-x-3 bg-slate-50 p-3 rounded-xl cursor-pointer hover:bg-slate-100 border border-slate-200 transition">
              <input
                type="checkbox"
                name={key}
                checked={features[key]}
                onChange={handleFeatureChange}
                className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500 accent-indigo-600"
              />
              <span className="capitalize text-slate-700 font-bold text-sm">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* 4. Map Location */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-slate-700">Location</h3>
            {latitude && (
                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded font-bold">
                    Selected
                </span>
            )}
        </div>
        
        <button
          onClick={getCurrentLocation}
          className="mb-4 flex items-center gap-2 bg-slate-800 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-black transition shadow-lg shadow-slate-900/20"
        >
          <Navigation size={16} /> Use My Current Location
        </button>

        <MapContainer
          center={[18.5204, 73.8567]}
          zoom={13}
          className="h-64 rounded-xl border-2 border-slate-200 z-0"
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <LocationPicker
            setLocation={(loc) => {
              setLatitude(loc.lat);
              setLongitude(loc.lng);
            }}
          />
          {latitude && longitude && <Marker position={[latitude, longitude]} />}
        </MapContainer>
      </div>

      {/* Submit */}
      <button
        onClick={handleSubmit}
        className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold text-lg hover:scale-[1.02] hover:bg-indigo-700 shadow-xl shadow-indigo-200 transition-all"
      >
        Save Parking Lot
      </button>
    </div>
  );
}

export default AddParkingLot;