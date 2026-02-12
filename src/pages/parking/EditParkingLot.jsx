import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Navigation, Plus, Trash2, Car, Bike, Truck, ArrowLeft, Save } from "lucide-react";
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

  // ✅ FETCH DATA ON LOAD
  useEffect(() => {
    if (!lotId || lotId === "undefined") {
        alert("Invalid Parking Lot ID");
        navigate("/admin-dashboard");
        return;
    }

    const fetchLot = async () => {
      try {
        // ✅ 1. Get token from localStorage
        const token = localStorage.getItem("token");

        // ✅ 2. Include Authorization header in the GET request
        const res = await axios.get(`http://localhost:8080/api/parking-lots/${lotId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const data = res.data;

        // Populate State
        setName(data.name || "");
        setAddress(data.address || "");
        setDescription(data.description || "");
        
        // Handle location mapping from backend structure
        if (data.location) {
            setLatitude(data.location.latitude);
            setLongitude(data.location.longitude);
        } else {
            setLatitude(data.latitude);
            setLongitude(data.longitude);
        }
        
        // Map Features/Amenities
        const amenities = data.amenities || {};
        setFeatures({
          cctv: amenities.cctv || false,
          security: amenities.security || false,
          covered: amenities.covered || false,
          evCharging: amenities.evCharging || false,
        });

        // Map Slots
        const parkingSlots = data.parkingSlots || data.slots;
        if (parkingSlots && parkingSlots.length > 0) {
            setSlots(parkingSlots);
        } else {
            setSlots([{ vehicleType: "CAR", capacity: 0, price: 0 }]);
        }

        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching lot:", err);
        // ✅ 3. Handle unauthorized redirect
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

  // --- Handlers ---

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

  const handleUpdate = async () => {
    const token = localStorage.getItem("token"); // ✅ Get token for update

    const payload = {
      name, address, description,
      location: { latitude, longitude },
      parkingSlots: slots,
      amenities: features,
    };

    try {
      // ✅ 4. Include Authorization header in the PUT request
      await axios.put(`http://localhost:8080/api/parking-lots/${lotId}`, payload, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      alert("Parking Lot Updated Successfully!");
      navigate("/admin-dashboard");
    } catch (error) {
      console.error(error);
      if (error.response?.status === 401) {
        localStorage.clear();
        navigate("/login");
      } else {
        alert("Failed to update parking lot");
      }
    }
  };

  if (isLoading) return <div className="p-10 text-center font-bold text-slate-500">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-3xl shadow-xl my-10 border border-slate-100">
      
      <button 
        onClick={() => navigate("/admin-dashboard")}
        className="flex items-center text-slate-500 hover:text-slate-800 font-bold mb-4 transition-colors hover:-translate-x-1 duration-200"
      >
        <ArrowLeft className="mr-2" size={20} /> Back to Dashboard
      </button>

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-black text-slate-800">Edit Parking Lot</h2>
        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold">ID: {lotId}</span>
      </div>

      {/* 1. Basic Details */}
      <div className="space-y-4 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input className="w-full p-4 bg-slate-50 rounded-xl border border-slate-200 font-bold text-slate-700"
            placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
          <input className="w-full p-4 bg-slate-50 rounded-xl border border-slate-200 font-bold text-slate-700"
            placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} />
        </div>
        <textarea className="w-full p-4 bg-slate-50 rounded-xl border border-slate-200 font-medium text-slate-600"
          placeholder="Description" rows="2" value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>

      {/* 2. Map */}
      <div className="mb-8">
        <h3 className="text-xl font-bold text-slate-700 mb-2">Location</h3>
        <MapContainer center={[latitude || 18.5204, longitude || 73.8567]} zoom={15} className="h-64 rounded-xl border-2 border-slate-200 z-0">
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <LocationPicker setLocation={(loc) => { setLatitude(loc.lat); setLongitude(loc.lng); }} />
          {latitude && longitude && <Marker position={[latitude, longitude]} />}
        </MapContainer>
      </div>

      {/* 3. Slots */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
           <h3 className="text-xl font-bold text-slate-700">Slots & Pricing</h3>
           <button onClick={addSlotRow} className="text-sm bg-indigo-50 text-indigo-600 px-3 py-1 rounded-lg font-bold flex items-center gap-1 hover:bg-indigo-100"><Plus size={16}/> Add Type</button>
        </div>
        <div className="space-y-3">
          {slots.map((slot, index) => (
            <div key={index} className="flex gap-3 items-center bg-slate-50 p-3 rounded-xl border border-slate-200">
              <select className="p-3 bg-white rounded-lg border w-1/3 font-bold text-slate-700" value={slot.vehicleType} onChange={(e) => handleSlotChange(index, "vehicleType", e.target.value)}>
                <option value="CAR">Car</option><option value="BIKE">Bike</option><option value="TRUCK">Truck</option>
              </select>
              <input type="number" className="p-3 bg-white rounded-lg border w-1/3 font-bold text-slate-700" value={slot.capacity} onChange={(e) => handleSlotChange(index, "capacity", e.target.value)} placeholder="Cap" />
              <input type="number" className="p-3 bg-white rounded-lg border w-1/3 font-bold text-slate-700" value={slot.price} onChange={(e) => handleSlotChange(index, "price", e.target.value)} placeholder="₹" />
              <button onClick={() => removeSlotRow(index)} className="text-red-400 hover:text-red-600"><Trash2 size={20} /></button>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Amenities */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {Object.keys(features).map((key) => (
            <label key={key} className="flex items-center space-x-3 bg-slate-50 p-3 rounded-xl cursor-pointer hover:bg-slate-100 border border-slate-200">
              <input type="checkbox" checked={features[key]} onChange={(e) => setFeatures({...features, [key]: e.target.checked})} className="w-5 h-5 accent-indigo-600" />
              <span className="capitalize text-slate-700 font-bold text-sm">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
            </label>
        ))}
      </div>

      <button onClick={handleUpdate} className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-blue-700 shadow-xl shadow-blue-200 flex justify-center items-center gap-2 transition-all active:scale-95">
        <Save size={20} /> Update Parking Lot
      </button>
    </div>
  );
}

export default EditParkingLot;