
import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf"; // Added for PDF generation
import {
  Car,
  Clock,
  CreditCard,
  MapPin,
  Navigation,
  Phone,
  Shield,
  Sparkles,
  Star,
  User,
  Zap
} from "lucide-react";
import UserNavbar from "../../components/navbar/UserNavbar";
import CustomMap from "../../components/map/MapContainer";
import ParkingLotBooking from "../../pages/parking/ParkingLotBooking";

function UserDashboard() {
  const [lots, setLots] = useState([]);
  const [mode, setMode] = useState(null);
  const [userId, setUserId] = useState(null);
  const [selectedLot, setSelectedLot] = useState(null);
  const [currentPosition, setCurrentPosition] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hoveredLotId, setHoveredLotId] = useState(null);
  const [stats, setStats] = useState({
    bookings: 0,
    hours: 0,
    savings: 0
  });
  
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [profileData, setProfileData] = useState({ 
    name: "", 
    email: "", 
    phoneNumber: "",
    password: ""
  });

  const navigate = useNavigate();

  // PDF Generation Logic
  const generatePaySlip = (vehicleDetails) => {
    const doc = new jsPDF();
    // Unique code connected to particular user using ID and Timestamp
    const uniqueCode = `PRK-${userId}-${Date.now().toString().slice(-6)}`;

    // Slip Header
    doc.setFontSize(22);
    doc.setTextColor(37, 99, 235);
    doc.text("PARKING PAY SLIP", 105, 30, { align: "center" });

    // Details Section
    doc.setFontSize(12);
    doc.setTextColor(100);
    doc.text(`Date: ${new Date().toLocaleString()}`, 20, 50);
    doc.text(`User ID: ${userId}`, 20, 60);
    
    doc.setDrawColor(200);
    doc.line(20, 65, 190, 65);

    doc.setFontSize(14);
    doc.setTextColor(0);
    doc.text("Vehicle Information", 20, 80);
    doc.setFontSize(12);
    doc.text(`Number: ${vehicleDetails.vehicleNumber}`, 20, 90);
    doc.text(`Model: ${vehicleDetails.vehicleModel}`, 20, 100);
    doc.text(`Contact: ${vehicleDetails.contactNumber}`, 20, 110);

    // Unique Code Box
    doc.setFillColor(248, 250, 252);
    doc.rect(20, 130, 170, 30, 'F');
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text(`VERIFICATION CODE: ${uniqueCode}`, 105, 150, { align: "center" });

    doc.save(`ParkingSlip_${uniqueCode}.pdf`);
  };

  const calculateStats = useCallback(() => {
    const bookings = 12;
    const hours = 36;
    const savings = 240;
    setStats({ bookings, hours, savings });
  }, []);

 useEffect(() => {
  // REPLACE your existing fetchUserAndLots function with this:
    const fetchUserAndLots = async () => {
      setLoading(true);
      try {
        // 1. Retrieve the token
        const token = localStorage.getItem("token");

        // 🚨 DEBUG LOGS: Open your browser Console (F12) to see these
// console.log("1. Token from Storage:", token); 
// console.log("2. Is Token valid string?", typeof token === 'string' && token.length > 10);
        
        // 2. If no token, force login immediately
        if (!token || token === "undefined" || token === "null") {
  console.error("❌ Token is missing or invalid!");
  navigate("/login");
  return;
}

        // 3. Define the config with the Header
        // ⚠️ CRITICAL: This is what was missing/broken
        const config = {
  headers: { Authorization: `Bearer ${token}` },
  withCredentials: true
};

        // 4. Use Promise.all to fetch both endpoints in parallel
        // Notice we pass 'config' as the second argument to BOTH calls
        const [userRes, lotsRes] = await Promise.all([
          axios.get("https://smartparking-backend-1.onrender.com/api/users/me", config),
          axios.get("https://smartparking-backend-1.onrender.com/api/parking-lots", config)
        ]);

        // 5. Update State with the results
        if (userRes.data) {
          const userData = userRes.data;
          setUserId(userData.id);
          localStorage.setItem("userId", userData.id);
          
          if (!userData.phoneNumber) {
             setProfileData({
               name: userData.name || "",
               email: userData.email,
               phoneNumber: "",
               password: ""
             });
             setShowProfileModal(true);
           }
        }
        
        if (lotsRes.data) {
          setLots(lotsRes.data);
        }
        
        calculateStats();

      } catch (err) {
        console.error("Auth/Fetch Error:", err);
        
        // 6. Handle 401 (Expired Token) automatically
        if (err.response?.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchUserAndLots();

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        pos => setCurrentPosition({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        err => console.error("Location error:", err)
      );
    }
  }, [navigate, calculateStats]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      await axios.put("https://smartparking-backend-1.onrender.com/api/users/me", 
        { 
          name: profileData.name, 
          phoneNumber: profileData.phoneNumber,
          password: profileData.password
        },
        { withCredentials: true }
      );
      setShowProfileModal(false);
      alert("Profile completed! You can now login with Google OR Password.");
    } catch (err) {
      alert("Failed to update profile. Please try again.");
    }
  };

  const openNavigation = (lot) => {
    if (!currentPosition) { 
      alert("Getting your location..."); 
      return; 
    }
    if (lot.latitude && lot.longitude) {
      const url = `https://www.google.com/maps/dir/?api=1&origin=${currentPosition.lat},${currentPosition.lng}&destination=${lot.latitude},${lot.longitude}&travelmode=driving`;
      window.open(url, "_blank");
    } else { 
      alert("Parking lot location not available"); 
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <>
      <UserNavbar />

      {showProfileModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl relative">
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-t-2xl"></div>
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <User className="w-8 h-8 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-800">Complete Your Profile</h2>
              <p className="text-slate-500 mt-2">Add your details to personalize your experience</p>
            </div>
            
            <form onSubmit={handleUpdateProfile} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
                <input 
                  type="email" 
                  value={profileData.email} 
                  disabled 
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-600 opacity-75 cursor-not-allowed" 
                />
                <p className="text-xs text-emerald-600 mt-2 flex items-center gap-1">
                  <Shield className="w-3 h-3" /> Verified via Google
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
                <input 
                  type="text" 
                  value={profileData.name} 
                  onChange={e => setProfileData({...profileData, name: e.target.value})} 
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all" 
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Phone Number <span className="text-rose-500">*</span>
                </label>
                <input 
                  type="tel" 
                  required 
                  placeholder="+91 98765 43210"
                  value={profileData.phoneNumber} 
                  onChange={e => setProfileData({...profileData, phoneNumber: e.target.value})} 
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all" 
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Create Password (Optional)</label>
                <input 
                  type="password" 
                  placeholder="Set a password for manual login"
                  value={profileData.password} 
                  onChange={e => setProfileData({...profileData, password: e.target.value})} 
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all" 
                />
                <p className="text-xs text-slate-500 mt-2">Allows you to log in without Google</p>
              </div>

              <button 
                type="submit" 
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3.5 rounded-xl hover:shadow-lg hover:shadow-blue-500/30 transition-all"
              >
                Save & Continue
              </button>
            </form>
          </div>
        </div>
      )}

      <div className={`min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/5 to-slate-50 p-4 md:p-8 ${showProfileModal ? 'blur-sm' : ''}`}>
        <div className="relative z-10">
          <div className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg">
                    <Car className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-sm font-semibold text-blue-600 uppercase tracking-wider">USER DASHBOARD</span>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-slate-800">
                  Find Your Perfect <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Parking Spot</span>
                </h1>
                <p className="text-slate-500 mt-2">Book parking slots or request valet service instantly</p>
              </div>
              
              {mode && (
                <button
                  onClick={() => setMode(null)}
                  className="inline-flex items-center gap-2 px-4 py-3 bg-white border border-slate-200 text-slate-700 rounded-xl font-medium hover:border-slate-300 hover:shadow-sm transition-all"
                >
                  <span>←</span> Back to Menu
                </button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl">
                  <Clock className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-500">Total Parked</p>
                  <p className="text-2xl font-bold text-slate-800">{stats.hours} hours</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-xl">
                  <CreditCard className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-500">Savings</p>
                  <p className="text-2xl font-bold text-slate-800">₹{stats.savings}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-to-br from-violet-100 to-purple-100 rounded-xl">
                  <Sparkles className="w-6 h-6 text-violet-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-500">Bookings</p>
                  <p className="text-2xl font-bold text-slate-800">{stats.bookings}</p>
                </div>
              </div>
            </div>
          </div>

          {loading && (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-slate-200 rounded-full"></div>
                <div className="absolute top-0 left-0 w-16 h-16 border-4 border-transparent border-t-blue-600 rounded-full animate-spin"></div>
              </div>
              <p className="text-slate-600 font-medium mt-4">Loading parking options...</p>
            </div>
          )}

          {!mode && !loading && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <OptionCard 
                title="Self Parking" 
                icon={<Navigation className="w-8 h-8" />}
                description="Navigate to nearby parking lots" 
                onClick={() => setMode("SELF")} 
                disabled={lots.length === 0}
                color="blue"
              />
              <OptionCard 
                title="Book Parking Slot" 
                icon={<MapPin className="w-8 h-8" />}
                description="Reserve parking for your vehicle" 
                onClick={() => setMode("BOOK")} 
                disabled={lots.length === 0}
                color="emerald"
              />
              <OptionCard 
                title="Valet Parking" 
                icon={<Zap className="w-8 h-8" />}
                description="Request valet from your location" 
                onClick={() => setMode("VALET")} 
                disabled={false}
                color="violet"
              />
            </div>
          )}

          {mode === "SELF" && !loading && (
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
              <div className="p-6 border-b border-slate-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-800">Self Parking Navigation</h3>
                    <p className="text-slate-500">Find and navigate to available parking spots</p>
                  </div>
                  <div className="flex items-center gap-3">
                    {currentPosition && (
                      <span className="text-sm text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-lg">
                        <Navigation className="w-4 h-4 inline mr-1" />
                        Location detected
                      </span>
                    )}
                    <button
                      onClick={handleLogout}
                      className="px-4 py-2.5 bg-gradient-to-r from-rose-500 to-pink-600 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-rose-500/30 transition-all"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
              <div className="h-[500px]">
                {lots.length > 0 ? (
                  <CustomMap lots={lots} onSelectLot={(lot) => openNavigation(lot)} />
                ) : (
                  <div className="h-full flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                      <p className="text-slate-500 font-medium">No parking lots available</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {mode === "BOOK" && !loading && (
            <>
              <div className="mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-800">Available Parking Lots</h3>
                    <p className="text-slate-500">Select a location to book your spot</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button className="px-4 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-lg font-medium hover:border-slate-300 hover:shadow-sm transition-all">
                      Filter
                    </button>
                    <button
                      onClick={handleLogout}
                      className="px-4 py-2.5 bg-gradient-to-r from-rose-500 to-pink-600 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-rose-500/30 transition-all"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <div className="bg-white rounded-2xl border border-slate-200 p-6">
                    <div className="h-[400px] rounded-xl overflow-hidden">
                      <CustomMap 
                        lots={lots} 
                        onSelectLot={(lot) => setSelectedLot(lot)} 
                        hoveredLotId={hoveredLotId} 
                      />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4 h-[400px] overflow-y-auto pr-3">
                  {lots.map((lot, index) => (
                    <ParkingLotCard
                      key={lot.id}
                      lot={lot}
                      isPaused={lot.status === "PAUSED"}
                      index={index}
                      hoveredLotId={hoveredLotId}
                      setHoveredLotId={setHoveredLotId}
                      setSelectedLot={setSelectedLot}
                    />
                  ))}
                </div>
              </div>
            </>
          )}

          {mode === "VALET" && !loading && (
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
              <div className="p-6 border-b border-slate-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-800">Valet Service</h3>
                    <p className="text-slate-500">Request professional valet parking service</p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2.5 bg-gradient-to-r from-rose-500 to-pink-600 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-rose-500/30 transition-all"
                  >
                    Logout
                  </button>
                </div>
              </div>
              <div className="p-6">
                <ValetRequestPanel 
                  userId={userId} 
                  currentPosition={currentPosition} 
                  setWatchId={() => {}}
                  onDownload={generatePaySlip} // Pass the PDF function down
                />
              </div>
            </div>
          )}

          {selectedLot && (
            <ParkingLotBooking lot={selectedLot} user={{ id: userId }} onClose={() => setSelectedLot(null)} />
          )}
        </div>
      </div>
    </>
  );
}

function ParkingLotCard({ lot, isPaused, index, hoveredLotId, setHoveredLotId, setSelectedLot }) {
  return (
    <div
      onClick={() => !isPaused && setSelectedLot(lot)}
      onMouseEnter={() => setHoveredLotId(lot.id)}
      onMouseLeave={() => setHoveredLotId(null)}
      className={`bg-white rounded-xl border ${
        isPaused 
          ? "border-slate-200 opacity-60 cursor-not-allowed" 
          : "border-slate-200 hover:border-blue-300 hover:shadow-md cursor-pointer"
      } transition-all`}
    >
      <div className={`p-4 rounded-t-xl ${
        isPaused ? "bg-slate-100" : "bg-gradient-to-r from-blue-50 to-indigo-50"
      }`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${
              isPaused ? "bg-slate-200" : "bg-white"
            }`}>
              <Car className={`w-5 h-5 ${isPaused ? "text-slate-400" : "text-blue-600"}`} />
            </div>
            <div>
              <h4 className="font-semibold text-slate-800">{lot.name}</h4>
              <p className="text-sm text-slate-500">ID: #{lot.id}</p>
            </div>
          </div>
          {isPaused ? (
            <span className="px-3 py-1 bg-slate-100 text-slate-600 text-sm font-medium rounded-full">
              Maintenance
            </span>
          ) : (
            <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-sm font-medium rounded-full">
              Available
            </span>
          )}
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-center gap-2 text-slate-600 mb-3">
          <MapPin className="w-4 h-4" />
          <p className="text-sm line-clamp-1">{lot.address || "Address not available"}</p>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-500">Rate per hour</p>
            <p className="text-xl font-bold text-slate-800">₹{lot.slots?.[0]?.price || "50"}</p>
          </div>
          
          <button
            disabled={isPaused}
            className={`px-4 py-2 rounded-lg font-medium ${
              isPaused
                ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-lg hover:shadow-blue-500/30"
            } transition-all`}
          >
            {isPaused ? "Unavailable" : "Book Now"}
          </button>
        </div>
      </div>
    </div>
  );
}

function OptionCard({ title, icon, description, onClick, disabled, color }) {
  const colorClasses = {
    blue: "from-blue-500 to-indigo-500",
    emerald: "from-emerald-500 to-teal-500",
    violet: "from-violet-500 to-purple-500"
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`relative bg-white rounded-2xl border border-slate-200 p-6 text-left hover:shadow-lg hover:border-slate-300 transition-all group ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-xl bg-gradient-to-br ${colorClasses[color]} bg-opacity-10`}>
          <div className={`text-${color.split('-')[0]}-600`}>{icon}</div>
        </div>
        {!disabled && (
          <div className="opacity-0 group-hover:opacity-100 transition-opacity">
            <Star className="w-5 h-5 text-amber-400 fill-current" />
          </div>
        )}
      </div>
      
      <h3 className="text-lg font-semibold text-slate-800 mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-indigo-600 transition-all">
        {title}
      </h3>
      <p className="text-sm text-slate-500">{description}</p>
      
      {disabled && (
        <div className="mt-4 text-xs text-rose-600 font-medium">
          ⚠️ Service temporarily unavailable
        </div>
      )}
    </button>
  );
}

function ValetRequestPanel({ userId, currentPosition, setWatchId, onDownload }) {
  const [status, setStatus] = useState("IDLE");
  const [vehicleDetails, setVehicleDetails] = useState({
    vehicleNumber: "",
    vehicleModel: "",
    contactNumber: ""
  });

  // ✅ THIS FUNCTION WAS MISSING. I HAVE ADDED IT BACK.
  const handleInputChange = (e) => {
    setVehicleDetails({ ...vehicleDetails, [e.target.name]: e.target.value });
  };

  const handleRequestValet = async (e) => {
    e.preventDefault();
    if (!currentPosition) {
      alert("Getting your location... Please wait.");
      return;
    }

    setStatus("REQUESTING");

    try {
      const token = localStorage.getItem("token");
      
      // ✅ This includes the fix for the 400 Error (Nested User Object)
      await axios.post("https://smartparking-backend-1.onrender.com/api/bookings", {
        user: { id: userId }, 
        vehicleNumber: vehicleDetails.vehicleNumber,
        vehicleModel: vehicleDetails.vehicleModel,
        contactNumber: vehicleDetails.contactNumber,
        pickupLat: currentPosition.lat,
        pickupLng: currentPosition.lng,
        status: "VALET_REQUESTED",
        serviceType: "VALET"
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setStatus("WAITING");
    } catch (err) {
      console.error("Valet Request Failed:", err);
      setStatus("FORM"); 
      alert("Server Error: Could not send request. Check console for details.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-gradient-to-br from-slate-50 to-white rounded-2xl border border-slate-200 p-8">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Zap className="w-10 h-10 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800">Premium Valet Service</h2>
          <p className="text-slate-500 mt-2">Professional valet service at your location</p>
        </div>
        
        {status === "IDLE" && (
          <div className="text-center">
            <p className="text-slate-600 mb-6">Our valet will come to your current location. Provide vehicle details for identification.</p>
            <button
              onClick={() => setStatus("FORM")}
              disabled={!currentPosition}
              className={`inline-flex items-center gap-2 px-8 py-3 rounded-xl font-semibold ${
                currentPosition
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-lg hover:shadow-blue-500/30"
                  : "bg-slate-100 text-slate-400 cursor-not-allowed"
              } transition-all`}
            >
              {currentPosition ? "Request Valet" : "Detecting Location..."}
            </button>
          </div>
        )}
        
        {status === "FORM" && (
          <form onSubmit={handleRequestValet} className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <button type="button" onClick={() => setStatus("IDLE")} className="text-slate-400 hover:text-slate-600">
                ← Back
              </button>
              <h3 className="text-lg font-semibold text-slate-800">Vehicle Details</h3>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Vehicle Number</label>
              <input
                name="vehicleNumber"
                required
                placeholder="MH-12-AB-1234"
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                value={vehicleDetails.vehicleNumber}
                onChange={handleInputChange}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Model & Color</label>
              <input
                name="vehicleModel"
                required
                placeholder="Red Swift / Black Honda City"
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                value={vehicleDetails.vehicleModel}
                onChange={handleInputChange}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Contact Number</label>
              <input
                name="contactNumber"
                required
                type="tel"
                placeholder="Your mobile number"
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                value={vehicleDetails.contactNumber}
                onChange={handleInputChange}
              />
            </div>
            
            {currentPosition && (
              <div className="bg-emerald-50 text-emerald-700 p-3 rounded-lg text-sm font-medium">
                <Navigation className="w-4 h-4 inline mr-2" />
                Location detected successfully
              </div>
            )}
            
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3.5 rounded-xl hover:shadow-lg hover:shadow-blue-500/30 transition-all"
            >
              Confirm Valet Request
            </button>
          </form>
        )}
        
        {status === "REQUESTING" && (
          <div className="text-center py-12">
            <div className="relative w-16 h-16 mx-auto mb-6">
              <div className="absolute inset-0 border-4 border-blue-100 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-transparent border-t-blue-600 rounded-full animate-spin"></div>
            </div>
            <p className="text-slate-700 font-medium">Finding available valets...</p>
            <p className="text-sm text-slate-500 mt-2">Please wait while we connect you</p>
          </div>
        )}
        
        {status === "WAITING" && (
          <div className="text-center py-8">
            <div className="w-20 h-20 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Shield className="w-10 h-10 text-emerald-600" />
            </div>
            <h3 className="text-xl font-semibold text-slate-800 mb-2">Valet Request Confirmed!</h3>
            <p className="text-slate-600 mb-6">A valet will contact you shortly at <strong>{vehicleDetails.contactNumber}</strong></p>
            <div className="bg-slate-50 rounded-xl p-4 mb-6">
              <div className="flex justify-between mb-2">
                <span className="text-sm text-slate-500">Vehicle:</span>
                <span className="font-medium text-slate-800">{vehicleDetails.vehicleNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-slate-500">Status:</span>
                <span className="font-medium text-emerald-600">Waiting for valet</span>
              </div>
            </div>

            {/* Added Download Button */}
            <button
              onClick={() => onDownload(vehicleDetails)}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold py-3.5 rounded-xl hover:shadow-lg hover:shadow-emerald-500/30 transition-all"
            >
              <CreditCard className="w-5 h-5" />
              Download Pay Slip
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserDashboard;
