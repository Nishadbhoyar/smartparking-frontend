
// import { useEffect, useState, useCallback } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import jsPDF from "jspdf"; // Added for PDF generation
// import {
//   Car,
//   Clock,
//   CreditCard,
//   MapPin,
//   Navigation,
//   Phone,
//   Shield,
//   Sparkles,
//   Star,
//   User,
//   Zap
// } from "lucide-react";
// import UserNavbar from "../../components/navbar/UserNavbar";
// import CustomMap from "../../components/map/MapContainer";
// import ParkingLotBooking from "../../pages/parking/ParkingLotBooking";

// function UserDashboard() {
//   const [lots, setLots] = useState([]);
//   const [mode, setMode] = useState(null);
//   const [userId, setUserId] = useState(null);
//   const [selectedLot, setSelectedLot] = useState(null);
//   const [currentPosition, setCurrentPosition] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [hoveredLotId, setHoveredLotId] = useState(null);
//   const [stats, setStats] = useState({
//     bookings: 0,
//     hours: 0,
//     savings: 0
//   });
  
//   const [showProfileModal, setShowProfileModal] = useState(false);
//   const [profileData, setProfileData] = useState({ 
//     name: "", 
//     email: "", 
//     phoneNumber: "",
//     password: ""
//   });

//   const navigate = useNavigate();

//   // PDF Generation Logic
//   const generatePaySlip = (vehicleDetails) => {
//     const doc = new jsPDF();
//     // Unique code connected to particular user using ID and Timestamp
//     const uniqueCode = `PRK-${userId}-${Date.now().toString().slice(-6)}`;

//     // Slip Header
//     doc.setFontSize(22);
//     doc.setTextColor(37, 99, 235);
//     doc.text("PARKING PAY SLIP", 105, 30, { align: "center" });

//     // Details Section
//     doc.setFontSize(12);
//     doc.setTextColor(100);
//     doc.text(`Date: ${new Date().toLocaleString()}`, 20, 50);
//     doc.text(`User ID: ${userId}`, 20, 60);
    
//     doc.setDrawColor(200);
//     doc.line(20, 65, 190, 65);

//     doc.setFontSize(14);
//     doc.setTextColor(0);
//     doc.text("Vehicle Information", 20, 80);
//     doc.setFontSize(12);
//     doc.text(`Number: ${vehicleDetails.vehicleNumber}`, 20, 90);
//     doc.text(`Model: ${vehicleDetails.vehicleModel}`, 20, 100);
//     doc.text(`Contact: ${vehicleDetails.contactNumber}`, 20, 110);

//     // Unique Code Box
//     doc.setFillColor(248, 250, 252);
//     doc.rect(20, 130, 170, 30, 'F');
//     doc.setFontSize(16);
//     doc.setFont("helvetica", "bold");
//     doc.text(`VERIFICATION CODE: ${uniqueCode}`, 105, 150, { align: "center" });

//     doc.save(`ParkingSlip_${uniqueCode}.pdf`);
//   };

//   const calculateStats = useCallback(() => {
//     const bookings = 12;
//     const hours = 36;
//     const savings = 240;
//     setStats({ bookings, hours, savings });
//   }, []);

//  useEffect(() => {
//   // REPLACE your existing fetchUserAndLots function with this:
//     const fetchUserAndLots = async () => {
//       setLoading(true);
//       try {
//         // 1. Retrieve the token
//         const token = localStorage.getItem("token");

//         // 🚨 DEBUG LOGS: Open your browser Console (F12) to see these
// // console.log("1. Token from Storage:", token); 
// // console.log("2. Is Token valid string?", typeof token === 'string' && token.length > 10);
        
//         // 2. If no token, force login immediately
//         if (!token || token === "undefined" || token === "null") {
//   console.error("❌ Token is missing or invalid!");
//   navigate("/login");
//   return;
// }

//         // 3. Define the config with the Header
//         // ⚠️ CRITICAL: This is what was missing/broken
//         const config = {
//   headers: { Authorization: `Bearer ${token}` },
//   withCredentials: true
// };

//         // 4. Use Promise.all to fetch both endpoints in parallel
//         // Notice we pass 'config' as the second argument to BOTH calls
//         const [userRes, lotsRes] = await Promise.all([
//   axios.get("https://smartparking-backend-1.onrender.com/api/users/me", config),
//   axios.get("https://smartparking-backend-1.onrender.com/api/parking-lots", config)
// ]);

//         // 5. Update State with the results
//         if (userRes.data) {
//           const userData = userRes.data;
//           setUserId(userData.id);
//           localStorage.setItem("userId", userData.id);
          
//           if (!userData.phoneNumber) {
//              setProfileData({
//                name: userData.name || "",
//                email: userData.email,
//                phoneNumber: "",
//                password: ""
//              });
//              setShowProfileModal(true);
//            }
//         }
        
//         if (lotsRes.data) {
//           setLots(lotsRes.data);
//         }
        
//         calculateStats();

//       } catch (err) {
//         console.error("Auth/Fetch Error:", err);
        
//         // 6. Handle 401 (Expired Token) automatically
//         if (err.response?.status === 401) {
//           localStorage.removeItem("token");
//           localStorage.removeItem("user");
//           navigate("/login");
//         }
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchUserAndLots();

//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         pos => setCurrentPosition({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
//         err => console.error("Location error:", err)
//       );
//     }
//   }, [navigate, calculateStats]);

//   const handleUpdateProfile = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.put("https://smartparking-backend-1.onrender.com/api/users/me", 
//   { name: profileData.name, phoneNumber: profileData.phoneNumber, password: profileData.password },
//   { withCredentials: true }
// );
//       setShowProfileModal(false);
//       alert("Profile completed! You can now login with Google OR Password.");
//     } catch (err) {
//       alert("Failed to update profile. Please try again.");
//     }
//   };

//   const openNavigation = (lot) => {
//     if (!currentPosition) { 
//       alert("Getting your location..."); 
//       return; 
//     }
//     if (lot.latitude && lot.longitude) {
//       const url = `https://www.google.com/maps/dir/?api=1&origin=${currentPosition.lat},${currentPosition.lng}&destination=${lot.latitude},${lot.longitude}&travelmode=driving`;
//       window.open(url, "_blank");
//     } else { 
//       alert("Parking lot location not available"); 
//     }
//   };

//   const handleLogout = () => {
//     // Clear all saved user data
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     localStorage.removeItem("userId");
//     localStorage.removeItem("role");
    
//     // Send them back to the login screen
//     navigate("/login");
//   };

//   return (
//     <>
//       <UserNavbar />

//       {showProfileModal && (
//         <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
//           <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl relative">
//             <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-t-2xl"></div>
//             <div className="text-center mb-6">
//               <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
//                 <User className="w-8 h-8 text-blue-600" />
//               </div>
//               <h2 className="text-2xl font-bold text-slate-800">Complete Your Profile</h2>
//               <p className="text-slate-500 mt-2">Add your details to personalize your experience</p>
//             </div>
            
//             <form onSubmit={handleUpdateProfile} className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
//                 <input 
//                   type="email" 
//                   value={profileData.email} 
//                   disabled 
//                   className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-600 opacity-75 cursor-not-allowed" 
//                 />
//                 <p className="text-xs text-emerald-600 mt-2 flex items-center gap-1">
//                   <Shield className="w-3 h-3" /> Verified via Google
//                 </p>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
//                 <input 
//                   type="text" 
//                   value={profileData.name} 
//                   onChange={e => setProfileData({...profileData, name: e.target.value})} 
//                   className="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all" 
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-slate-700 mb-2">
//                   Phone Number <span className="text-rose-500">*</span>
//                 </label>
//                 <input 
//                   type="tel" 
//                   required 
//                   placeholder="+91 98765 43210"
//                   value={profileData.phoneNumber} 
//                   onChange={e => setProfileData({...profileData, phoneNumber: e.target.value})} 
//                   className="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all" 
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-slate-700 mb-2">Create Password (Optional)</label>
//                 <input 
//                   type="password" 
//                   placeholder="Set a password for manual login"
//                   value={profileData.password} 
//                   onChange={e => setProfileData({...profileData, password: e.target.value})} 
//                   className="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all" 
//                 />
//                 <p className="text-xs text-slate-500 mt-2">Allows you to log in without Google</p>
//               </div>

//               <button 
//                 type="submit" 
//                 className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3.5 rounded-xl hover:shadow-lg hover:shadow-blue-500/30 transition-all"
//               >
//                 Save & Continue
//               </button>
//             </form>
//           </div>
//         </div>
//       )}

//       <div className={`min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/5 to-slate-50 p-4 md:p-8 ${showProfileModal ? 'blur-sm' : ''}`}>
//         <div className="relative z-10">
//           <div className="mb-8">
//             <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
//               <div>
//                 <div className="flex items-center gap-3 mb-3">
//                   <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg">
//                     <Car className="w-5 h-5 text-white" />
//                   </div>
//                   <span className="text-sm font-semibold text-blue-600 uppercase tracking-wider">USER DASHBOARD</span>
//                 </div>
//                 <h1 className="text-3xl md:text-4xl font-bold text-slate-800">
//                   Find Your Perfect <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Parking Spot</span>
//                 </h1>
//                 <p className="text-slate-500 mt-2">Book parking slots or request valet service instantly</p>
//               </div>
              
//               {mode && (
//                 <button
//                   onClick={() => setMode(null)}
//                   className="inline-flex items-center gap-2 px-4 py-3 bg-white border border-slate-200 text-slate-700 rounded-xl font-medium hover:border-slate-300 hover:shadow-sm transition-all"
//                 >
//                   <span>←</span> Back to Menu
//                 </button>
//               )}
//             </div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//             <div className="bg-white rounded-2xl border border-slate-200 p-6">
//               <div className="flex items-center gap-4">
//                 <div className="p-3 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl">
//                   <Clock className="w-6 h-6 text-blue-600" />
//                 </div>
//                 <div>
//                   <p className="text-sm text-slate-500">Total Parked</p>
//                   <p className="text-2xl font-bold text-slate-800">{stats.hours} hours</p>
//                 </div>
//               </div>
//             </div>
            
//             <div className="bg-white rounded-2xl border border-slate-200 p-6">
//               <div className="flex items-center gap-4">
//                 <div className="p-3 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-xl">
//                   <CreditCard className="w-6 h-6 text-emerald-600" />
//                 </div>
//                 <div>
//                   <p className="text-sm text-slate-500">Savings</p>
//                   <p className="text-2xl font-bold text-slate-800">₹{stats.savings}</p>
//                 </div>
//               </div>
//             </div>
            
//             <div className="bg-white rounded-2xl border border-slate-200 p-6">
//               <div className="flex items-center gap-4">
//                 <div className="p-3 bg-gradient-to-br from-violet-100 to-purple-100 rounded-xl">
//                   <Sparkles className="w-6 h-6 text-violet-600" />
//                 </div>
//                 <div>
//                   <p className="text-sm text-slate-500">Bookings</p>
//                   <p className="text-2xl font-bold text-slate-800">{stats.bookings}</p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {loading && (
//             <div className="flex flex-col items-center justify-center py-20">
//               <div className="relative">
//                 <div className="w-16 h-16 border-4 border-slate-200 rounded-full"></div>
//                 <div className="absolute top-0 left-0 w-16 h-16 border-4 border-transparent border-t-blue-600 rounded-full animate-spin"></div>
//               </div>
//               <p className="text-slate-600 font-medium mt-4">Loading parking options...</p>
//             </div>
//           )}

//           {!mode && !loading && (
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//               <OptionCard 
//                 title="Self Parking" 
//                 icon={<Navigation className="w-8 h-8" />}
//                 description="Navigate to nearby parking lots" 
//                 onClick={() => setMode("SELF")} 
//                 disabled={lots.length === 0}
//                 color="blue"
//               />
//               <OptionCard 
//                 title="Book Parking Slot" 
//                 icon={<MapPin className="w-8 h-8" />}
//                 description="Reserve parking for your vehicle" 
//                 onClick={() => setMode("BOOK")} 
//                 disabled={lots.length === 0}
//                 color="emerald"
//               />
//               <OptionCard 
//                 title="Valet Parking" 
//                 icon={<Zap className="w-8 h-8" />}
//                 description="Request valet from your location" 
//                 onClick={() => setMode("VALET")} 
//                 disabled={false}
//                 color="violet"
//               />
//             </div>
//           )}

//           {mode === "SELF" && !loading && (
//             <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
//               <div className="p-6 border-b border-slate-200">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <h3 className="text-lg font-semibold text-slate-800">Self Parking Navigation</h3>
//                     <p className="text-slate-500">Find and navigate to available parking spots</p>
//                   </div>
//                   <div className="flex items-center gap-3">
//                     {currentPosition && (
//                       <span className="text-sm text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-lg">
//                         <Navigation className="w-4 h-4 inline mr-1" />
//                         Location detected
//                       </span>
//                     )}
//                     <button
//                       onClick={handleLogout}
//                       className="px-4 py-2.5 bg-gradient-to-r from-rose-500 to-pink-600 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-rose-500/30 transition-all"
//                     >
//                       Logout
//                     </button>
//                   </div>
//                 </div>
//               </div>
//               <div className="h-[500px]">
//                 {lots.length > 0 ? (
//                   <CustomMap lots={lots} onSelectLot={(lot) => openNavigation(lot)} />
//                 ) : (
//                   <div className="h-full flex items-center justify-center">
//                     <div className="text-center">
//                       <MapPin className="w-16 h-16 text-slate-300 mx-auto mb-4" />
//                       <p className="text-slate-500 font-medium">No parking lots available</p>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>
//           )}

//           {mode === "BOOK" && !loading && (
//             <>
//               <div className="mb-6">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <h3 className="text-lg font-semibold text-slate-800">Available Parking Lots</h3>
//                     <p className="text-slate-500">Select a location to book your spot</p>
//                   </div>
//                   <div className="flex items-center gap-3">
//                     <button className="px-4 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-lg font-medium hover:border-slate-300 hover:shadow-sm transition-all">
//                       Filter
//                     </button>
//                     <button
//                       onClick={handleLogout}
//                       className="px-4 py-2.5 bg-gradient-to-r from-rose-500 to-pink-600 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-rose-500/30 transition-all"
//                     >
//                       Logout
//                     </button>
//                   </div>
//                 </div>
//               </div>
              
//               <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//                 <div className="lg:col-span-2">
//                   <div className="bg-white rounded-2xl border border-slate-200 p-6">
//                     <div className="h-[400px] rounded-xl overflow-hidden">
//                       <CustomMap 
//                         lots={lots} 
//                         onSelectLot={(lot) => setSelectedLot(lot)} 
//                         hoveredLotId={hoveredLotId} 
//                       />
//                     </div>
//                   </div>
//                 </div>
                
//                 <div className="space-y-4 h-[400px] overflow-y-auto pr-3">
//                   {lots.map((lot, index) => (
//                     <ParkingLotCard
//                       key={lot.id}
//                       lot={lot}
//                       isPaused={lot.status === "PAUSED"}
//                       index={index}
//                       hoveredLotId={hoveredLotId}
//                       setHoveredLotId={setHoveredLotId}
//                       setSelectedLot={setSelectedLot}
//                     />
//                   ))}
//                 </div>
//               </div>
//             </>
//           )}

//           {mode === "VALET" && !loading && (
//             <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
//               <div className="p-6 border-b border-slate-200">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <h3 className="text-lg font-semibold text-slate-800">Valet Service</h3>
//                     <p className="text-slate-500">Request professional valet parking service</p>
//                   </div>
//                   <button
//                     onClick={handleLogout}
//                     className="px-4 py-2.5 bg-gradient-to-r from-rose-500 to-pink-600 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-rose-500/30 transition-all"
//                   >
//                     Logout
//                   </button>
//                 </div>
//               </div>
//               <div className="p-6">
//                 <ValetRequestPanel 
//                   userId={userId} 
//                   currentPosition={currentPosition} 
//                   setWatchId={() => {}}
//                   onDownload={generatePaySlip} // Pass the PDF function down
//                 />
//               </div>
//             </div>
//           )}

//           {selectedLot && (
//             <ParkingLotBooking lot={selectedLot} user={{ id: userId }} onClose={() => setSelectedLot(null)} />
//           )}
//         </div>
//       </div>
//     </>
//   );
// }

// function ParkingLotCard({ lot, isPaused, index, hoveredLotId, setHoveredLotId, setSelectedLot }) {
//   return (
//     <div
//       onClick={() => !isPaused && setSelectedLot(lot)}
//       onMouseEnter={() => setHoveredLotId(lot.id)}
//       onMouseLeave={() => setHoveredLotId(null)}
//       className={`bg-white rounded-xl border ${
//         isPaused 
//           ? "border-slate-200 opacity-60 cursor-not-allowed" 
//           : "border-slate-200 hover:border-blue-300 hover:shadow-md cursor-pointer"
//       } transition-all`}
//     >
//       <div className={`p-4 rounded-t-xl ${
//         isPaused ? "bg-slate-100" : "bg-gradient-to-r from-blue-50 to-indigo-50"
//       }`}>
//         <div className="flex items-center justify-between">
//           <div className="flex items-center gap-3">
//             <div className={`p-2 rounded-lg ${
//               isPaused ? "bg-slate-200" : "bg-white"
//             }`}>
//               <Car className={`w-5 h-5 ${isPaused ? "text-slate-400" : "text-blue-600"}`} />
//             </div>
//             <div>
//               <h4 className="font-semibold text-slate-800">{lot.name}</h4>
//               <p className="text-sm text-slate-500">ID: #{lot.id}</p>
//             </div>
//           </div>
//           {isPaused ? (
//             <span className="px-3 py-1 bg-slate-100 text-slate-600 text-sm font-medium rounded-full">
//               Maintenance
//             </span>
//           ) : (
//             <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-sm font-medium rounded-full">
//               Available
//             </span>
//           )}
//         </div>
//       </div>
      
//       <div className="p-4">
//         <div className="flex items-center gap-2 text-slate-600 mb-3">
//           <MapPin className="w-4 h-4" />
//           <p className="text-sm line-clamp-1">{lot.address || "Address not available"}</p>
//         </div>
        
//         <div className="flex items-center justify-between">
//           <div>
//             <p className="text-xs text-slate-500">Rate per hour</p>
//             <p className="text-xl font-bold text-slate-800">₹{lot.slots?.[0]?.price || "50"}</p>
//           </div>
          
//           <button
//             disabled={isPaused}
//             className={`px-4 py-2 rounded-lg font-medium ${
//               isPaused
//                 ? "bg-slate-100 text-slate-400 cursor-not-allowed"
//                 : "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-lg hover:shadow-blue-500/30"
//             } transition-all`}
//           >
//             {isPaused ? "Unavailable" : "Book Now"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// function OptionCard({ title, icon, description, onClick, disabled, color }) {
//   const colorClasses = {
//     blue: "from-blue-500 to-indigo-500",
//     emerald: "from-emerald-500 to-teal-500",
//     violet: "from-violet-500 to-purple-500"
//   };

//   return (
//     <button
//       onClick={onClick}
//       disabled={disabled}
//       className={`relative bg-white rounded-2xl border border-slate-200 p-6 text-left hover:shadow-lg hover:border-slate-300 transition-all group ${
//         disabled ? "opacity-50 cursor-not-allowed" : ""
//       }`}
//     >
//       <div className="flex items-start justify-between mb-4">
//         <div className={`p-3 rounded-xl bg-gradient-to-br ${colorClasses[color]} bg-opacity-10`}>
//           <div className={`text-${color.split('-')[0]}-600`}>{icon}</div>
//         </div>
//         {!disabled && (
//           <div className="opacity-0 group-hover:opacity-100 transition-opacity">
//             <Star className="w-5 h-5 text-amber-400 fill-current" />
//           </div>
//         )}
//       </div>
      
//       <h3 className="text-lg font-semibold text-slate-800 mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-indigo-600 transition-all">
//         {title}
//       </h3>
//       <p className="text-sm text-slate-500">{description}</p>
      
//       {disabled && (
//         <div className="mt-4 text-xs text-rose-600 font-medium">
//           ⚠️ Service temporarily unavailable
//         </div>
//       )}
//     </button>
//   );
// }

// function ValetRequestPanel({ userId, currentPosition, setWatchId, onDownload }) {
//   const [status, setStatus] = useState("IDLE");
//   const [vehicleDetails, setVehicleDetails] = useState({
//     vehicleNumber: "",
//     vehicleModel: "",
//     contactNumber: ""
//   });

//   // ✅ THIS FUNCTION WAS MISSING. I HAVE ADDED IT BACK.
//   const handleInputChange = (e) => {
//     setVehicleDetails({ ...vehicleDetails, [e.target.name]: e.target.value });
//   };

//   const handleRequestValet = async (e) => {
//     e.preventDefault();
//     if (!currentPosition) {
//       alert("Getting your location... Please wait.");
//       return;
//     }

//     setStatus("REQUESTING");

//     try {
//       const token = localStorage.getItem("token");
      
//       // ✅ This includes the fix for the 400 Error (Nested User Object)
//       await axios.post("https://smartparking-backend-1.onrender.com/api/bookings", {
//   user: { id: userId }, 
//   vehicleNumber: vehicleDetails.vehicleNumber,
//   vehicleModel: vehicleDetails.vehicleModel,
//   contactNumber: vehicleDetails.contactNumber,
//   pickupLat: currentPosition.lat,
//   pickupLng: currentPosition.lng,
//   status: "VALET_REQUESTED",
//   serviceType: "VALET"
// }, {
//   headers: { Authorization: `Bearer ${token}` }
// });

//       setStatus("WAITING");
//     } catch (err) {
//       console.error("Valet Request Failed:", err);
//       setStatus("FORM"); 
//       alert("Server Error: Could not send request. Check console for details.");
//     }
//   };

//   return (
//     <div className="max-w-2xl mx-auto">
//       <div className="bg-gradient-to-br from-slate-50 to-white rounded-2xl border border-slate-200 p-8">
//         <div className="text-center mb-8">
//           <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
//             <Zap className="w-10 h-10 text-blue-600" />
//           </div>
//           <h2 className="text-2xl font-bold text-slate-800">Premium Valet Service</h2>
//           <p className="text-slate-500 mt-2">Professional valet service at your location</p>
//         </div>
        
//         {status === "IDLE" && (
//           <div className="text-center">
//             <p className="text-slate-600 mb-6">Our valet will come to your current location. Provide vehicle details for identification.</p>
//             <button
//               onClick={() => setStatus("FORM")}
//               disabled={!currentPosition}
//               className={`inline-flex items-center gap-2 px-8 py-3 rounded-xl font-semibold ${
//                 currentPosition
//                   ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-lg hover:shadow-blue-500/30"
//                   : "bg-slate-100 text-slate-400 cursor-not-allowed"
//               } transition-all`}
//             >
//               {currentPosition ? "Request Valet" : "Detecting Location..."}
//             </button>
//           </div>
//         )}
        
//         {status === "FORM" && (
//           <form onSubmit={handleRequestValet} className="space-y-4">
//             <div className="flex items-center gap-2 mb-4">
//               <button type="button" onClick={() => setStatus("IDLE")} className="text-slate-400 hover:text-slate-600">
//                 ← Back
//               </button>
//               <h3 className="text-lg font-semibold text-slate-800">Vehicle Details</h3>
//             </div>
            
//             <div>
//               <label className="block text-sm font-medium text-slate-700 mb-2">Vehicle Number</label>
//               <input
//                 name="vehicleNumber"
//                 required
//                 placeholder="MH-12-AB-1234"
//                 className="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
//                 value={vehicleDetails.vehicleNumber}
//                 onChange={handleInputChange}
//               />
//             </div>
            
//             <div>
//               <label className="block text-sm font-medium text-slate-700 mb-2">Model & Color</label>
//               <input
//                 name="vehicleModel"
//                 required
//                 placeholder="Red Swift / Black Honda City"
//                 className="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
//                 value={vehicleDetails.vehicleModel}
//                 onChange={handleInputChange}
//               />
//             </div>
            
//             <div>
//               <label className="block text-sm font-medium text-slate-700 mb-2">Contact Number</label>
//               <input
//                 name="contactNumber"
//                 required
//                 type="tel"
//                 placeholder="Your mobile number"
//                 className="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
//                 value={vehicleDetails.contactNumber}
//                 onChange={handleInputChange}
//               />
//             </div>
            
//             {currentPosition && (
//               <div className="bg-emerald-50 text-emerald-700 p-3 rounded-lg text-sm font-medium">
//                 <Navigation className="w-4 h-4 inline mr-2" />
//                 Location detected successfully
//               </div>
//             )}
            
//             <button
//               type="submit"
//               className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3.5 rounded-xl hover:shadow-lg hover:shadow-blue-500/30 transition-all"
//             >
//               Confirm Valet Request
//             </button>
//           </form>
//         )}
        
//         {status === "REQUESTING" && (
//           <div className="text-center py-12">
//             <div className="relative w-16 h-16 mx-auto mb-6">
//               <div className="absolute inset-0 border-4 border-blue-100 rounded-full"></div>
//               <div className="absolute inset-0 border-4 border-transparent border-t-blue-600 rounded-full animate-spin"></div>
//             </div>
//             <p className="text-slate-700 font-medium">Finding available valets...</p>
//             <p className="text-sm text-slate-500 mt-2">Please wait while we connect you</p>
//           </div>
//         )}
        
//         {status === "WAITING" && (
//           <div className="text-center py-8">
//             <div className="w-20 h-20 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
//               <Shield className="w-10 h-10 text-emerald-600" />
//             </div>
//             <h3 className="text-xl font-semibold text-slate-800 mb-2">Valet Request Confirmed!</h3>
//             <p className="text-slate-600 mb-6">A valet will contact you shortly at <strong>{vehicleDetails.contactNumber}</strong></p>
//             <div className="bg-slate-50 rounded-xl p-4 mb-6">
//               <div className="flex justify-between mb-2">
//                 <span className="text-sm text-slate-500">Vehicle:</span>
//                 <span className="font-medium text-slate-800">{vehicleDetails.vehicleNumber}</span>
//               </div>
//               <div className="flex justify-between">
//                 <span className="text-sm text-slate-500">Status:</span>
//                 <span className="font-medium text-emerald-600">Waiting for valet</span>
//               </div>
//             </div>

//             {/* Added Download Button */}
//             <button
//               onClick={() => onDownload(vehicleDetails)}
//               className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold py-3.5 rounded-xl hover:shadow-lg hover:shadow-emerald-500/30 transition-all"
//             >
//               <CreditCard className="w-5 h-5" />
//               Download Pay Slip
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default UserDashboard;


import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import {
  Car,
  Clock,
  CreditCard,
  MapPin,
  Navigation,
  Shield,
  Zap,
  Search,
  CalendarCheck,
  Star,
  ChevronRight,
  ArrowRight,
  User,
  Phone,
  TrendingUp,
  CheckCircle,
} from "lucide-react";
import UserNavbar from "../../components/navbar/UserNavbar";
import CustomMap from "../../components/map/MapContainer";
import ParkingLotBooking from "../../pages/parking/ParkingLotBooking";

/* ─────────────────────────────────────────────────────────────
   MAIN DASHBOARD
───────────────────────────────────────────────────────────── */
function UserDashboard() {
  const [lots, setLots] = useState([]);
  const [mode, setMode] = useState(null);
  const [userId, setUserId] = useState(null);
  const [selectedLot, setSelectedLot] = useState(null);
  const [currentPosition, setCurrentPosition] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hoveredLotId, setHoveredLotId] = useState(null);
  const [stats, setStats] = useState({ bookings: 0, hours: 0, savings: 0 });
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
  });

  const navigate = useNavigate();

  /* PDF pay-slip */
  const generatePaySlip = (vehicleDetails) => {
    const doc = new jsPDF();
    const uniqueCode = `PRK-${userId}-${Date.now().toString().slice(-6)}`;
    doc.setFontSize(22);
    doc.setTextColor(37, 99, 235);
    doc.text("PARKING PAY SLIP", 105, 30, { align: "center" });
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
    doc.setFillColor(248, 250, 252);
    doc.rect(20, 130, 170, 30, "F");
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text(`VERIFICATION CODE: ${uniqueCode}`, 105, 150, { align: "center" });
    doc.save(`ParkingSlip_${uniqueCode}.pdf`);
  };

  const calculateStats = useCallback(() => {
    setStats({ bookings: 12, hours: 36, savings: 240 });
  }, []);

  useEffect(() => {
    const fetchUserAndLots = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        if (!token || token === "undefined" || token === "null") {
          navigate("/login");
          return;
        }
        const config = {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        };
        const [userRes, lotsRes] = await Promise.all([
          axios.get("https://smartparking-backend-1.onrender.com/api/users/me", config),
          axios.get("https://smartparking-backend-1.onrender.com/api/parking-lots", config),
        ]);
        if (userRes.data) {
          const userData = userRes.data;
          setUserId(userData.id);
          localStorage.setItem("userId", userData.id);
          if (!userData.phoneNumber) {
            setProfileData({
              name: userData.name || "",
              email: userData.email,
              phoneNumber: "",
              password: "",
            });
            setShowProfileModal(true);
          }
        }
        if (lotsRes.data) setLots(lotsRes.data);
        calculateStats();
      } catch (err) {
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
        (pos) =>
          setCurrentPosition({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          }),
        (err) => console.error("Location error:", err)
      );
    }
  }, [navigate, calculateStats]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        "https://smartparking-backend-1.onrender.com/api/users/me",
        {
          name: profileData.name,
          phoneNumber: profileData.phoneNumber,
          password: profileData.password,
        },
        { withCredentials: true }
      );
      setShowProfileModal(false);
    } catch {
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

  /* ── Loading screen ── */
  if (loading) {
    return (
      <div style={styles.loadingWrapper}>
        <div style={styles.loadingInner}>
          <div style={styles.loadingLogo}>
            <Car size={28} color="#C8FF00" />
          </div>
          <p style={styles.loadingText}>Loading your dashboard…</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <style>{globalCSS}</style>

      {/* ── Profile completion modal ── */}
      {showProfileModal && (
        <div style={styles.modalBackdrop}>
          <div style={styles.modalCard} className="park-modal">
            <div style={styles.modalHeader}>
              <div style={styles.modalIconWrap}>
                <User size={24} color="#C8FF00" />
              </div>
              <h2 style={styles.modalTitle}>Complete Your Profile</h2>
              <p style={styles.modalSubtitle}>
                A few more details to unlock all features
              </p>
            </div>
            <form onSubmit={handleUpdateProfile} style={styles.modalForm}>
              <ParkInput
                label="Full Name"
                placeholder="John Doe"
                value={profileData.name}
                onChange={(e) =>
                  setProfileData({ ...profileData, name: e.target.value })
                }
              />
              <ParkInput
                label="Phone Number"
                placeholder="+91 9876543210"
                value={profileData.phoneNumber}
                onChange={(e) =>
                  setProfileData({
                    ...profileData,
                    phoneNumber: e.target.value,
                  })
                }
                required
              />
              <ParkInput
                label="Set a Password"
                type="password"
                placeholder="Min. 8 characters"
                value={profileData.password}
                onChange={(e) =>
                  setProfileData({ ...profileData, password: e.target.value })
                }
              />
              <button type="submit" style={styles.limeBtn} className="lime-btn">
                Save & Continue
                <ArrowRight size={16} />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ── App shell ── */}
      <div style={styles.shell}>
        <UserNavbar />

        {/* ── HERO ── */}
        <section style={styles.hero}>
          <div style={styles.heroGlow} />
          <div style={styles.heroContent}>
            <span style={styles.heroPill}>
              <span style={styles.heroPillDot} />
              Live Dashboard
            </span>
            <h1 style={styles.heroTitle}>
              Park <span style={styles.heroAccent}>Smarter.</span>
            </h1>
            <p style={styles.heroSub}>
              Find a spot, book a slot, or call a valet — all in one place.
            </p>
          </div>

          {/* Stats row */}
          <div style={styles.statsRow}>
            {[
              { label: "Total Bookings", value: stats.bookings, icon: <CalendarCheck size={18} color="#C8FF00" /> },
              { label: "Hours Parked", value: stats.hours, icon: <Clock size={18} color="#C8FF00" /> },
              { label: "Savings (₹)", value: stats.savings, icon: <TrendingUp size={18} color="#C8FF00" /> },
            ].map((s) => (
              <div key={s.label} style={styles.statCard} className="stat-card">
                <div style={styles.statIcon}>{s.icon}</div>
                <div>
                  <div style={styles.statValue}>{s.value}</div>
                  <div style={styles.statLabel}>{s.label}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── SERVICE SELECTOR ── */}
        {!mode && (
          <section style={styles.serviceSection}>
            <p style={styles.sectionLabel}>Choose a Service</p>
            <h2 style={styles.sectionTitle}>What do you need today?</h2>

            <div style={styles.serviceGrid}>
              <ServiceCard
                icon={<Search size={28} />}
                tag="Instant"
                title="Self Parking"
                description="Browse lots near you on a live map and navigate directly to an open spot."
                accent="#C8FF00"
                onClick={() => setMode("self")}
              />
              <ServiceCard
                icon={<CalendarCheck size={28} />}
                tag="Reserved"
                title="Book a Slot"
                description="Reserve a specific bay for your vehicle in advance and pay securely online."
                accent="#00D4FF"
                onClick={() => setMode("book")}
              />
              <ServiceCard
                icon={<Zap size={28} />}
                tag="Premium"
                title="Valet Service"
                description="A trained valet comes to you, parks and retrieves your vehicle on demand."
                accent="#FF6B35"
                onClick={() => setMode("valet")}
              />
            </div>
          </section>
        )}

        {/* ── ACTIVE MODE PANEL ── */}
        {mode && (
          <section style={styles.panelSection}>
            <button
              onClick={() => { setMode(null); setSelectedLot(null); }}
              style={styles.backBtn}
              className="back-btn"
            >
              ← Back to Services
            </button>

            {/* SELF PARKING */}
            {mode === "self" && (
              <div>
                <PanelHeader
                  icon={<Search size={22} color="#C8FF00" />}
                  title="Self Parking"
                  subtitle="Tap a lot to get directions"
                  accent="#C8FF00"
                />
                <div style={styles.mapWrap}>
                  <CustomMap
                    lots={lots}
                    onSelectLot={(lot) => openNavigation(lot)}
                    hoveredLotId={hoveredLotId}
                  />
                </div>
                {lots.length > 0 && (
                  <div style={styles.lotsGrid}>
                    {lots.map((lot) => (
                      <LotCard
                        key={lot.id}
                        lot={lot}
                        isHovered={hoveredLotId === lot.id}
                        onHover={() => setHoveredLotId(lot.id)}
                        onLeave={() => setHoveredLotId(null)}
                        onNavigate={() => openNavigation(lot)}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* BOOK A SLOT */}
            {mode === "book" && (
              <div>
                <PanelHeader
                  icon={<CalendarCheck size={22} color="#00D4FF" />}
                  title="Book a Slot"
                  subtitle="Select a lot on the map or from the list below"
                  accent="#00D4FF"
                />
                {selectedLot ? (
                  <ParkingLotBooking
                    lot={selectedLot}
                    user={{ id: userId }}
                    onClose={() => setSelectedLot(null)}
                  />
                ) : (
                  <>
                    <div style={styles.bookGrid}>
                      {/* Map column */}
                      <div style={styles.mapWrap}>
                        <CustomMap
                          lots={lots}
                          onSelectLot={(lot) => setSelectedLot(lot)}
                          hoveredLotId={hoveredLotId}
                        />
                      </div>
                      {/* Lots list column */}
                      <div style={styles.bookList}>
                        {lots.map((lot) => (
                          <LotCard
                            key={lot.id}
                            lot={lot}
                            accent="#00D4FF"
                            actionLabel="Book Now"
                            isHovered={hoveredLotId === lot.id}
                            onHover={() => setHoveredLotId(lot.id)}
                            onLeave={() => setHoveredLotId(null)}
                            onNavigate={() => setSelectedLot(lot)}
                          />
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}

            {/* VALET */}
            {mode === "valet" && (
              <div>
                <PanelHeader
                  icon={<Zap size={22} color="#FF6B35" />}
                  title="Valet Service"
                  subtitle="Premium door-to-door parking"
                  accent="#FF6B35"
                />
                <ValetRequestPanel
                  userId={userId}
                  currentPosition={currentPosition}
                  onDownload={generatePaySlip}
                />
              </div>
            )}
          </section>
        )}
      </div>
    </>
  );
}

/* ─────────────────────────────────────────────────────────────
   SERVICE CARD
───────────────────────────────────────────────────────────── */
function ServiceCard({ icon, tag, title, description, accent, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{ ...styles.svcCard, "--accent": accent }}
      className="svc-card"
    >
      <div style={{ ...styles.svcIconWrap, background: `${accent}18`, border: `1px solid ${accent}30` }}>
        <span style={{ color: accent }}>{icon}</span>
      </div>
      <span style={{ ...styles.svcTag, color: accent, background: `${accent}15` }}>{tag}</span>
      <h3 style={styles.svcTitle}>{title}</h3>
      <p style={styles.svcDesc}>{description}</p>
      <div style={{ ...styles.svcArrow, color: accent }} className="svc-arrow">
        <ChevronRight size={20} />
      </div>
    </button>
  );
}

/* ─────────────────────────────────────────────────────────────
   PANEL HEADER
───────────────────────────────────────────────────────────── */
function PanelHeader({ icon, title, subtitle, accent }) {
  return (
    <div style={styles.panelHeader}>
      <div style={{ ...styles.panelIconWrap, background: `${accent}18`, border: `1px solid ${accent}30` }}>
        {icon}
      </div>
      <div>
        <h2 style={styles.panelTitle}>{title}</h2>
        <p style={styles.panelSub}>{subtitle}</p>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   LOT CARD
───────────────────────────────────────────────────────────── */
function LotCard({ lot, isHovered, onHover, onLeave, onNavigate, accent = "#C8FF00", actionLabel = "Navigate" }) {
  const available = lot.availableSpots ?? lot.capacity ?? "?";
  return (
    <div
      style={{
        ...styles.lotCard,
        ...(isHovered ? styles.lotCardHovered : {}),
      }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <div style={styles.lotCardTop}>
        <div style={styles.lotDot} />
        <span style={styles.lotAvail}>{available} spots</span>
      </div>
      <h4 style={styles.lotName}>{lot.name}</h4>
      <div style={styles.lotMeta}>
        <MapPin size={12} color="#666" />
        <span style={styles.lotAddr}>{lot.address || "Location on map"}</span>
      </div>
      {lot.pricePerHour && (
        <div style={styles.lotPrice}>
          ₹{lot.pricePerHour}
          <span style={styles.lotPriceUnit}>/hr</span>
        </div>
      )}
      <button
        onClick={onNavigate}
        style={{ ...styles.lotBtn, background: accent, color: accent === "#C8FF00" ? "#000" : "#fff" }}
        className="lot-btn"
      >
        {actionLabel}
        <ArrowRight size={14} />
      </button>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   VALET PANEL
───────────────────────────────────────────────────────────── */
function ValetRequestPanel({ userId, currentPosition, onDownload }) {
  const [status, setStatus] = useState("IDLE");
  const [vehicleDetails, setVehicleDetails] = useState({
    vehicleNumber: "",
    vehicleModel: "",
    contactNumber: "",
  });

  const handleInputChange = (e) => {
    setVehicleDetails({ ...vehicleDetails, [e.target.name]: e.target.value });
  };

  const handleRequestValet = async (e) => {
    e.preventDefault();
    if (!currentPosition) { alert("Getting your location..."); return; }
    setStatus("REQUESTING");
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "https://smartparking-backend-1.onrender.com/api/bookings",
        {
          user: { id: userId },
          vehicleNumber: vehicleDetails.vehicleNumber,
          vehicleModel: vehicleDetails.vehicleModel,
          contactNumber: vehicleDetails.contactNumber,
          pickupLat: currentPosition.lat,
          pickupLng: currentPosition.lng,
          status: "VALET_REQUESTED",
          serviceType: "VALET",
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setStatus("WAITING");
    } catch (err) {
      console.error(err);
      setStatus("FORM");
      alert("Server error. Please try again.");
    }
  };

  return (
    <div style={styles.valetWrap}>
      <div style={styles.valetCard}>
        {status === "IDLE" && (
          <div style={styles.valetCenter}>
            <div style={styles.valetIconBig}>
              <Zap size={36} color="#FF6B35" />
            </div>
            <h3 style={styles.valetTitle}>Premium Valet</h3>
            <p style={styles.valetSub}>
              Our trained valet will come to your current location, park and
              retrieve your vehicle on demand.
            </p>
            <div style={styles.valetFeatures}>
              {["Licensed professionals", "Real-time tracking", "Instant confirmation"].map((f) => (
                <div key={f} style={styles.valetFeatureRow}>
                  <CheckCircle size={15} color="#FF6B35" />
                  <span style={styles.valetFeatureText}>{f}</span>
                </div>
              ))}
            </div>
            <button
              onClick={() => setStatus("FORM")}
              disabled={!currentPosition}
              style={{
                ...styles.valetBtn,
                opacity: currentPosition ? 1 : 0.5,
                cursor: currentPosition ? "pointer" : "not-allowed",
              }}
              className="valet-btn"
            >
              {currentPosition ? "Request Valet" : "Detecting location…"}
              <Zap size={16} />
            </button>
          </div>
        )}

        {status === "FORM" && (
          <form onSubmit={handleRequestValet} style={styles.valetForm}>
            <button
              type="button"
              onClick={() => setStatus("IDLE")}
              style={styles.formBack}
            >
              ← Back
            </button>
            <h3 style={styles.valetTitle}>Vehicle Details</h3>
            <ParkInput
              label="Vehicle Number"
              name="vehicleNumber"
              placeholder="MH-12-AB-1234"
              value={vehicleDetails.vehicleNumber}
              onChange={handleInputChange}
              required
            />
            <ParkInput
              label="Model & Colour"
              name="vehicleModel"
              placeholder="Red Swift / Black Honda City"
              value={vehicleDetails.vehicleModel}
              onChange={handleInputChange}
              required
            />
            <ParkInput
              label="Contact Number"
              name="contactNumber"
              type="tel"
              placeholder="Your mobile number"
              value={vehicleDetails.contactNumber}
              onChange={handleInputChange}
              required
            />
            {currentPosition && (
              <div style={styles.locationBadge}>
                <Navigation size={13} color="#C8FF00" />
                Location detected
              </div>
            )}
            <button type="submit" style={styles.valetBtn} className="valet-btn">
              Confirm Valet Request
              <Zap size={16} />
            </button>
          </form>
        )}

        {status === "REQUESTING" && (
          <div style={styles.valetCenter}>
            <div style={styles.spinner} className="park-spinner" />
            <p style={styles.valetSub}>Finding available valets…</p>
          </div>
        )}

        {status === "WAITING" && (
          <div style={styles.valetCenter}>
            <div style={{ ...styles.valetIconBig, background: "#C8FF0018", border: "1px solid #C8FF0030" }}>
              <Shield size={36} color="#C8FF00" />
            </div>
            <h3 style={styles.valetTitle}>Valet Confirmed!</h3>
            <p style={styles.valetSub}>
              A valet will contact you shortly at{" "}
              <strong style={{ color: "#fff" }}>{vehicleDetails.contactNumber}</strong>
            </p>
            <div style={styles.confirmBox}>
              <div style={styles.confirmRow}>
                <span style={styles.confirmLabel}>Vehicle</span>
                <span style={styles.confirmValue}>{vehicleDetails.vehicleNumber}</span>
              </div>
              <div style={styles.confirmRow}>
                <span style={styles.confirmLabel}>Model</span>
                <span style={styles.confirmValue}>{vehicleDetails.vehicleModel}</span>
              </div>
              <div style={styles.confirmRow}>
                <span style={styles.confirmLabel}>Status</span>
                <span style={{ ...styles.confirmValue, color: "#C8FF00" }}>
                  Waiting for valet
                </span>
              </div>
            </div>
            <button
              onClick={() => onDownload(vehicleDetails)}
              style={{ ...styles.valetBtn, background: "#C8FF00", color: "#000" }}
              className="valet-btn"
            >
              Download Pay Slip
              <CreditCard size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   REUSABLE INPUT
───────────────────────────────────────────────────────────── */
function ParkInput({ label, ...props }) {
  return (
    <div style={styles.inputGroup}>
      <label style={styles.inputLabel}>{label}</label>
      <input style={styles.input} className="park-input" {...props} />
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   STYLES
───────────────────────────────────────────────────────────── */
const styles = {
  /* Loading */
  loadingWrapper: {
    minHeight: "100vh",
    background: "#0A0A0A",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  loadingInner: { textAlign: "center" },
  loadingLogo: {
    width: 56,
    height: 56,
    borderRadius: 14,
    background: "#C8FF0020",
    border: "1px solid #C8FF0040",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 16px",
  },
  loadingText: { color: "#666", fontSize: 14 },

  /* App shell */
  shell: { minHeight: "100vh", background: "#0A0A0A", color: "#fff" },

  /* Modal */
  modalBackdrop: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.85)",
    backdropFilter: "blur(8px)",
    zIndex: 999,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  modalCard: {
    background: "#161616",
    border: "1px solid #2e2e2e",
    borderRadius: 20,
    padding: 36,
    width: "100%",
    maxWidth: 420,
  },
  modalHeader: { textAlign: "center", marginBottom: 28 },
  modalIconWrap: {
    width: 52,
    height: 52,
    borderRadius: 14,
    background: "#C8FF0018",
    border: "1px solid #C8FF0035",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 16px",
  },
  modalTitle: { fontSize: 22, fontWeight: 700, color: "#ffffff", marginBottom: 6 },
  modalSubtitle: { fontSize: 14, color: "#aaa" },
  modalForm: { display: "flex", flexDirection: "column", gap: 16 },
  limeBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    background: "#C8FF00",
    color: "#000",
    border: "none",
    borderRadius: 12,
    padding: "14px 24px",
    fontWeight: 700,
    fontSize: 15,
    cursor: "pointer",
    marginTop: 8,
  },

  /* Hero */
  hero: {
    position: "relative",
    padding: "60px 24px 0",
    maxWidth: 1280,
    margin: "0 auto",
    overflow: "hidden",
  },
  heroGlow: {
    position: "absolute",
    top: 0,
    left: "50%",
    transform: "translateX(-50%)",
    width: 600,
    height: 300,
    background: "radial-gradient(ellipse, #C8FF0015 0%, transparent 70%)",
    pointerEvents: "none",
  },
  heroContent: { position: "relative", zIndex: 1 },
  heroPill: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    background: "#C8FF0012",
    border: "1px solid #C8FF0030",
    borderRadius: 999,
    padding: "6px 16px",
    fontSize: 13,
    color: "#C8FF00",
    fontWeight: 600,
    marginBottom: 20,
  },
  heroPillDot: {
    width: 7,
    height: 7,
    borderRadius: "50%",
    background: "#C8FF00",
    animation: "pulse 2s ease-in-out infinite",
  },
  heroTitle: {
    fontSize: "clamp(40px, 6vw, 72px)",
    fontWeight: 800,
    lineHeight: 1.05,
    letterSpacing: "-2px",
    color: "#fff",
    marginBottom: 14,
  },
  heroAccent: { color: "#C8FF00" },
  heroSub: { fontSize: 17, color: "#aaa", maxWidth: 440, marginBottom: 40 },

  statsRow: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: 16,
    marginBottom: 60,
  },
  statCard: {
    background: "#181818",
    border: "1px solid #2e2e2e",
    borderRadius: 16,
    padding: "20px 24px",
    display: "flex",
    alignItems: "center",
    gap: 16,
    transition: "border-color 0.2s",
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    background: "#C8FF0018",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  statValue: { fontSize: 26, fontWeight: 800, color: "#ffffff", lineHeight: 1 },
  statLabel: { fontSize: 12, color: "#999", marginTop: 4 },

  /* Services */
  serviceSection: {
    maxWidth: 1280,
    margin: "0 auto",
    padding: "0 24px 80px",
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: 600,
    letterSpacing: "0.15em",
    textTransform: "uppercase",
    color: "#C8FF00",
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: "clamp(26px, 4vw, 40px)",
    fontWeight: 800,
    color: "#fff",
    marginBottom: 36,
    letterSpacing: "-1px",
  },
  serviceGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: 20,
  },
  svcCard: {
    background: "#161616",
    border: "1px solid #2a2a2a",
    borderRadius: 20,
    padding: "28px 24px 24px",
    textAlign: "left",
    cursor: "pointer",
    position: "relative",
    transition: "border-color 0.25s, transform 0.2s",
  },
  svcIconWrap: {
    width: 52,
    height: 52,
    borderRadius: 14,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  svcTag: {
    display: "inline-block",
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: "0.08em",
    padding: "4px 10px",
    borderRadius: 999,
    marginBottom: 12,
    textTransform: "uppercase",
  },
  svcTitle: {
    fontSize: 20,
    fontWeight: 700,
    color: "#fff",
    marginBottom: 10,
  },
  svcDesc: { fontSize: 14, color: "#999", lineHeight: 1.6, marginBottom: 20 },
  svcArrow: {
    display: "flex",
    alignItems: "center",
    transition: "transform 0.2s",
  },

  /* Panel */
  panelSection: {
    maxWidth: 1280,
    margin: "0 auto",
    padding: "0 24px 80px",
  },
  backBtn: {
    background: "transparent",
    border: "1px solid #333",
    color: "#aaa",
    borderRadius: 10,
    padding: "8px 16px",
    fontSize: 13,
    cursor: "pointer",
    marginBottom: 28,
    transition: "color 0.2s, border-color 0.2s",
  },
  panelHeader: {
    display: "flex",
    alignItems: "center",
    gap: 16,
    marginBottom: 28,
  },
  panelIconWrap: {
    width: 46,
    height: 46,
    borderRadius: 12,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  panelTitle: { fontSize: 22, fontWeight: 700, color: "#fff" },
  panelSub: { fontSize: 14, color: "#999", marginTop: 3 },

  /* Map */
  mapWrap: {
    borderRadius: 18,
    border: "1px solid #1c1c1c",
    marginBottom: 24,
    height: 500,
    position: "relative",
    zIndex: 0,
  },

  /* Book layout */
  bookGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 340px",
    gap: 20,
    alignItems: "start",
  },
  bookList: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
    maxHeight: 500,
    overflowY: "auto",
  },

  /* Lots grid */
  lotsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
    gap: 16,
  },
  lotCard: {
    background: "#181818",
    border: "1px solid #2e2e2e",
    borderRadius: 16,
    padding: "20px",
    transition: "border-color 0.2s, transform 0.2s",
  },
  lotCardHovered: {
    borderColor: "#C8FF0060",
    transform: "translateY(-2px)",
    background: "#1e1e1e",
  },
  lotCardTop: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
  },
  lotDot: {
    width: 8,
    height: 8,
    borderRadius: "50%",
    background: "#4ade80",
    flexShrink: 0,
    boxShadow: "0 0 6px #4ade8090",
  },
  lotAvail: { fontSize: 12, color: "#4ade80", fontWeight: 600 },
  lotName: { fontSize: 15, fontWeight: 700, color: "#ffffff", marginBottom: 6 },
  lotMeta: { display: "flex", alignItems: "center", gap: 5, marginBottom: 12 },
  lotAddr: { fontSize: 12, color: "#aaa" },
  lotPrice: { fontSize: 22, fontWeight: 800, color: "#ffffff", marginBottom: 14 },
  lotPriceUnit: { fontSize: 13, fontWeight: 400, color: "#888" },
  lotBtn: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    width: "100%",
    justifyContent: "center",
    border: "none",
    borderRadius: 10,
    padding: "10px 0",
    fontWeight: 700,
    fontSize: 13,
    cursor: "pointer",
  },

  /* Valet */
  valetWrap: { maxWidth: 520, margin: "0 auto" },
  valetCard: {
    background: "#161616",
    border: "1px solid #2a2a2a",
    borderRadius: 20,
    padding: 36,
  },
  valetCenter: { textAlign: "center" },
  valetIconBig: {
    width: 72,
    height: 72,
    borderRadius: 20,
    background: "#FF6B3518",
    border: "1px solid #FF6B3530",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 20px",
  },
  valetTitle: {
    fontSize: 24,
    fontWeight: 700,
    color: "#fff",
    marginBottom: 10,
  },
  valetSub: { fontSize: 14, color: "#aaa", lineHeight: 1.6, marginBottom: 24 },
  valetFeatures: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    marginBottom: 28,
    textAlign: "left",
    background: "#FF6B3510",
    border: "1px solid #FF6B3525",
    borderRadius: 12,
    padding: "16px 20px",
  },
  valetFeatureRow: { display: "flex", alignItems: "center", gap: 10 },
  valetFeatureText: { fontSize: 13, color: "#ccc" },
  valetBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    width: "100%",
    background: "#FF6B35",
    color: "#fff",
    border: "none",
    borderRadius: 12,
    padding: "14px 24px",
    fontWeight: 700,
    fontSize: 15,
    cursor: "pointer",
  },
  valetForm: { display: "flex", flexDirection: "column", gap: 16 },
  formBack: {
    background: "transparent",
    border: "none",
    color: "#aaa",
    fontSize: 13,
    cursor: "pointer",
    textAlign: "left",
    padding: 0,
    marginBottom: 8,
  },
  locationBadge: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    background: "#C8FF0010",
    border: "1px solid #C8FF0025",
    borderRadius: 10,
    padding: "10px 14px",
    fontSize: 13,
    color: "#C8FF00",
    fontWeight: 600,
  },
  confirmBox: {
    background: "#1a1a1a",
    border: "1px solid #2e2e2e",
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    width: "100%",
  },
  confirmRow: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  confirmLabel: { fontSize: 13, color: "#888" },
  confirmValue: { fontSize: 13, color: "#eee", fontWeight: 600 },

  /* Spinner */
  spinner: {
    width: 48,
    height: 48,
    borderRadius: "50%",
    border: "3px solid #1a1a1a",
    borderTopColor: "#FF6B35",
    margin: "0 auto 20px",
  },

  /* Input */
  inputGroup: { display: "flex", flexDirection: "column", gap: 6 },
  inputLabel: { fontSize: 13, fontWeight: 600, color: "#bbb" },
  input: {
    background: "#1a1a1a",
    border: "1px solid #333",
    borderRadius: 10,
    padding: "12px 14px",
    fontSize: 14,
    color: "#fff",
    outline: "none",
    width: "100%",
    boxSizing: "border-box",
  },
};

/* ─────────────────────────────────────────────────────────────
   GLOBAL CSS (animations + hover effects)
───────────────────────────────────────────────────────────── */
const globalCSS = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&display=swap');

  body { font-family: 'Syne', sans-serif; margin: 0; }

  @keyframes pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.5; transform: scale(0.85); }
  }

  .park-spinner { animation: spin 0.8s linear infinite; }
  @keyframes spin { to { transform: rotate(360deg); } }

  .svc-card:hover {
    border-color: var(--accent, #C8FF00) !important;
    transform: translateY(-4px);
  }
  .svc-card:hover .svc-arrow {
    transform: translateX(4px);
  }

  .stat-card:hover { border-color: #C8FF0030 !important; }

  .back-btn:hover { color: #fff !important; border-color: #444 !important; }

  .park-input:focus {
    border-color: #C8FF00 !important;
    box-shadow: 0 0 0 3px #C8FF0015;
  }

  .lime-btn:hover, .valet-btn:hover, .lot-btn:hover {
    opacity: 0.88;
    transform: translateY(-1px);
  }

  .park-modal {
    animation: modalIn 0.25s ease;
  }
  @keyframes modalIn {
    from { opacity: 0; transform: scale(0.97) translateY(8px); }
    to   { opacity: 1; transform: scale(1) translateY(0); }
  }
`;

export default UserDashboard;