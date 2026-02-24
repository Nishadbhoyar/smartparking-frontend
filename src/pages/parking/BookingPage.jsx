import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function BookingPage() {
  const { lotId } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [lot, setLot] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const [formData, setFormData] = useState({
    vehicleType: "CAR",
    startTime: "",
    endTime: "",
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      alert("Please login first!");
      navigate("/login");
      return;
    }
    
    const userData = JSON.parse(storedUser);
    setUser(userData);

    // Fetch parking lot details
    axios.get(`http://localhost:8080/api/parking-lots/${lotId}`)
      .then((response) => {
        setLot(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching lot:", error);
        alert("Failed to load parking lot details");
        setLoading(false);
      });
  }, [navigate, lotId]);

  const getPrice = () => {
    if (!lot || !lot.slots) return 50;
    
    const slot = lot.slots.find(s => s.vehicleType === formData.vehicleType);
    return slot ? slot.price : 50;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const bookingData = {
      user: { id: user.id },
      lot: { id: lotId },
      vehicleType: formData.vehicleType,
      serviceType: "SELF",
      status: "CONFIRMED",
      startTime: formData.startTime,
      endTime: formData.endTime,
      totalAmount: getPrice()
    };

    try {
      const response = await axios.post("http://localhost:8080/api/bookings", bookingData);
      alert(`Booking Confirmed! ✅ Booking ID: #${response.data.id}`);
      navigate("/dashboard");
    } catch (error) {
      console.error("Booking Error:", error);
      alert("Failed to book spot: " + (error.response?.data || error.message));
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-spin w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full"></div>
      </div>
    );
  }

  if (!lot) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <p className="text-red-600 font-bold">Parking lot not found</p>
          <button 
            onClick={() => navigate("/dashboard")}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-blue-600">Book Parking Spot</h2>
        
        <div className="mb-4 p-4 bg-blue-50 rounded-lg">
          <h3 className="font-bold text-blue-900">{lot.name}</h3>
          <p className="text-sm text-blue-700">{lot.address}</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Vehicle Type</label>
            <select
              required
              className="w-full p-2 border rounded"
              value={formData.vehicleType}
              onChange={(e) => setFormData({...formData, vehicleType: e.target.value})}
            >
              <option value="CAR">Car</option>
              <option value="BIKE">Bike</option>
              <option value="HEAVY">Heavy Vehicle</option>
              <option value="CYCLE">Cycle</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Start Time</label>
            <input
              type="datetime-local"
              required
              className="w-full p-2 border rounded"
              value={formData.startTime}
              onChange={(e) => setFormData({...formData, startTime: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">End Time</label>
            <input
              type="datetime-local"
              required
              className="w-full p-2 border rounded"
              value={formData.endTime}
              onChange={(e) => setFormData({...formData, endTime: e.target.value})}
            />
          </div>

          <div className="bg-gray-50 p-3 rounded text-sm text-gray-600">
            <p>Parking Lot: {lot.name}</p>
            <p className="font-bold text-green-600">Price: ₹{getPrice()}/hr</p>
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 font-bold"
          >
            Confirm Booking
          </button>

          <button
            type="button"
            onClick={() => navigate("/dashboard")}
            className="w-full bg-gray-400 text-white py-2 rounded hover:bg-gray-500 font-bold"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}

export default BookingPage;