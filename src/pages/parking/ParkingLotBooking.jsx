// import { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// function ParkingLotBooking({ lot, user, onClose }) {
//   const [selectedVehicle, setSelectedVehicle] = useState("CAR");
//   const [fullLotData, setFullLotData] = useState(null); // Store full backend data
//   const [loading, setLoading] = useState(false);
//   const [fetchingData, setFetchingData] = useState(true);
//   const navigate = useNavigate();

//   // 1. FETCH FULL DATA (To get up-to-date slots & pricing)
//   useEffect(() => {
//     const fetchLotDetails = async () => {
//       try {
//         // Fetch specific lot by ID to get the 'slots' array
//         const res = await axios.get(`http://localhost:8080/api/parking-lots/${lot.id}`);
//         setFullLotData(res.data);
//       } catch (err) {
//         console.error("Error fetching lot details:", err);
//       } finally {
//         setFetchingData(false);
//       }
//     };

//     if (lot?.id) {
//       fetchLotDetails();
//     }
//   }, [lot]);

//   // 2. DYNAMIC RATE FINDER
//   const getSlotDetails = () => {
//     if (!fullLotData || !fullLotData.slots) return null;
//     return fullLotData.slots.find((s) => s.vehicleType === selectedVehicle);
//   };

//   const slotDetails = getSlotDetails();
//   const isVehicleAvailable = !!slotDetails; // True if this lot supports the vehicle

//   // 3. CONFIRMATION LOGIC
//   const handleConfirmBooking = async () => {
//     setLoading(true);
    
//     // Calculate initial estimated amount (e.g., 1 hour) or 0
//     const hourlyRate = slotDetails ? slotDetails.price : 0;

//     const bookingData = {
//       user: { id: user.id },
//       lot: { id: lot.id },
//       vehicleType: selectedVehicle,
//       vehicleNumber: "MH-12-AB-1234", // Ideally, ask user for this input
//       serviceType: "SELF",
//       status: "CONFIRMED",
//       startTime: new Date().toISOString(),
//       totalAmount: hourlyRate // Saving the rate as initial amount
//     };

//     try {
//       await axios.post("http://localhost:8080/api/bookings", bookingData);
//       alert("Booking Confirmed!");
//       navigate("/user-dashboard"); // Redirect to dashboard
//     } catch (err) {
//       alert("Booking failed: " + (err.response?.data || "Server Error"));
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (fetchingData) return <div className="fixed inset-0 bg-slate-900/60 z-[9999] flex items-center justify-center text-white">Loading rates...</div>;
//   // 👇👇 PASTE YOUR CODE HERE 👇👇
//   if (lot.status === "PAUSED") {
//     return (
//       <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-[9999] p-4">
//         <div className="bg-white w-full max-w-sm rounded-2xl p-6 text-center shadow-2xl">
//           <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
//             ⚠️
//           </div>
//           <h2 className="text-xl font-bold text-slate-800 mb-2">Temporarily Closed</h2>
//           <p className="text-slate-500 text-sm mb-6">
//             The parking lot <strong>{lot.name}</strong> is currently under maintenance and cannot accept new bookings.
//           </p>
//           <button 
//             onClick={onClose}
//             className="w-full bg-slate-100 text-slate-700 font-bold py-3 rounded-xl hover:bg-slate-200"
//           >
//             Close
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-[9999] p-4 animate-in fade-in duration-200">
//       <div className="bg-white w-full max-w-md rounded-[2rem] p-8 shadow-2xl relative">
//         <button onClick={onClose} className="absolute top-6 right-6 text-slate-300 hover:text-slate-800 font-bold">✕</button>
        
//         <h2 className="text-2xl font-black text-slate-800 mb-1 uppercase tracking-tighter">Secure Spot</h2>
//         <p className="text-slate-500 text-sm mb-6">{fullLotData?.name || lot.name}</p>

//         {/* VEHICLE SELECTOR - Only show available types if desired, or show all and disable */}
//         <label className="text-[10px] font-black uppercase text-slate-400 mb-3 block tracking-widest">
//           Select Vehicle Type
//         </label>
//         <div className="flex gap-3 mb-6">
//           {[
//             { id: 'BIKE', icon: '🏍️' },
//             { id: 'CAR', icon: '🚗' },
//             { id: 'HEAVY', icon: '🚛' } // Changed TRUCK to HEAVY to match your backend enum if needed
//           ].map((v) => {
//             // Check if this specific vehicle type exists in the fetched slots
//             const isSupported = fullLotData?.slots?.some(s => s.vehicleType === v.id);
            
//             return (
//               <button
//                 key={v.id}
//                 disabled={!isSupported} // Disable if lot doesn't support this type
//                 onClick={() => setSelectedVehicle(v.id)}
//                 className={`flex-1 py-3 rounded-2xl flex flex-col items-center gap-1 transition-all border-2 
//                   ${!isSupported ? 'opacity-30 cursor-not-allowed bg-slate-100 border-slate-100 grayscale' : ''}
//                   ${selectedVehicle === v.id && isSupported
//                     ? 'border-indigo-600 bg-indigo-50 text-indigo-600' 
//                     : 'border-slate-100 bg-slate-50 text-slate-400'
//                   }`}
//               >
//                 <span className="text-2xl">{v.icon}</span>
//                 <span className="text-[9px] font-black">{v.id}</span>
//               </button>
//             );
//           })}
//         </div>

//         {/* LIVE PRICE PREVIEW */}
//         <div className="bg-slate-900 text-white p-6 rounded-3xl mb-6 flex justify-between items-center">
//           <div>
//             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Hourly Rate</p>
//             {isVehicleAvailable ? (
//                 <p className="text-3xl font-black">₹{slotDetails.price}<span className="text-sm font-normal text-slate-500">/hr</span></p>
//             ) : (
//                 <p className="text-xl font-bold text-red-400">Unavailable</p>
//             )}
//           </div>
//           <div className="text-right opacity-50">
//              <p className="text-[10px] font-bold uppercase tracking-widest">Vehicle</p>
//              <p className="font-bold">{selectedVehicle}</p>
//           </div>
//         </div>

//         {/* CAPACITY WARNING */}
//         {isVehicleAvailable && slotDetails.capacity < 5 && (
//             <p className="text-xs text-amber-600 font-bold mb-4 text-center">
//                 ⚠️ Only {slotDetails.capacity} spots left!
//             </p>
//         )}

//         <button 
//           disabled={loading || !isVehicleAvailable}
//           onClick={handleConfirmBooking}
//           className={`w-full text-white py-4 rounded-2xl font-black uppercase tracking-widest shadow-xl transition-all active:scale-95
//             ${loading || !isVehicleAvailable ? "bg-slate-400 cursor-not-allowed shadow-none" : "bg-indigo-600 hover:bg-indigo-700 shadow-indigo-200"}
//           `}
//         >
//           {loading ? "Processing..." : isVehicleAvailable ? "Confirm Booking" : "Not Available"}
//         </button>
//       </div>
//     </div>
//   );
// }

// export default ParkingLotBooking;




import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Car, Clock, CreditCard, Calendar, Phone, FileText, X } from "lucide-react";

function ParkingLotBooking({ lot, user, onClose }) {
  const navigate = useNavigate();
  
  // Data States
  const [selectedVehicle, setSelectedVehicle] = useState("CAR");
  const [fullLotData, setFullLotData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetchingData, setFetchingData] = useState(true);

  // Form States
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [durationHours, setDurationHours] = useState(0);

  // 1. FETCH DATA & INIT TIMES
  useEffect(() => {
    // Set default times (Now -> Now + 2 hours)
    const now = new Date();
    const twoHoursLater = new Date(now.getTime() + 2 * 60 * 60 * 1000);
    
    // Format for input[type="datetime-local"] (YYYY-MM-DDTHH:MM)
    const formatTime = (date) => date.toISOString().slice(0, 16);
    
    setStartTime(formatTime(now));
    setEndTime(formatTime(twoHoursLater));

    const fetchLotDetails = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/api/parking-lots/${lot.id}`);
        setFullLotData(res.data);
      } catch (err) {
        console.error("Error fetching lot details:", err);
      } finally {
        setFetchingData(false);
      }
    };

    if (lot?.id) fetchLotDetails();
  }, [lot]);

  // 2. GET CURRENT VEHICLE SLOT DETAILS
  const getSlotDetails = () => {
    if (!fullLotData || !fullLotData.slots) return null;
    return fullLotData.slots.find((s) => s.vehicleType === selectedVehicle);
  };
  const slotDetails = getSlotDetails();
  const isVehicleAvailable = !!slotDetails;

  // 3. RE-CALCULATE PRICE WHEN TIMES CHANGE
  useEffect(() => {
    if (startTime && endTime && slotDetails) {
      const start = new Date(startTime);
      const end = new Date(endTime);
      const diffMs = end - start;
      const diffHrs = Math.max(1, Math.ceil(diffMs / (1000 * 60 * 60))); // Minimum 1 hour

      setDurationHours(diffHrs);
      setTotalPrice(diffHrs * slotDetails.price);
    }
  }, [startTime, endTime, slotDetails, selectedVehicle]);

  // 4. SUBMIT BOOKING
  const handleConfirmBooking = async () => {
    if (!vehicleNumber.trim() || !phoneNumber.trim()) {
      alert("Please enter all details");
      return;
    }

    if (new Date(endTime) <= new Date(startTime)) {
        alert("End time must be after start time");
        return;
    }

    setLoading(true);

    const bookingData = {
      user: { id: user.id },
      lot: { id: lot.id },
      vehicleType: selectedVehicle,
      vehicleNumber: vehicleNumber.toUpperCase(),
      contactNumber: phoneNumber,
      serviceType: "SELF",
      status: "CONFIRMED",
      startTime: new Date(startTime).toISOString(),
      endTime: new Date(endTime).toISOString(), // 🟢 Sending End Time now
      totalAmount: totalPrice // 🟢 Sending Calculated Price
    };

    try {
      await axios.post("http://localhost:8080/api/bookings", bookingData);
      alert("Booking Successful! 🎟️");
      navigate("/user-dashboard");
    } catch (err) {
      alert("Booking failed: " + (err.response?.data || "Server Error"));
    } finally {
      setLoading(false);
    }
  };

  if (fetchingData) return null;

  // 🛑 PAUSED STATE
  if (lot.status === "PAUSED") {
    return (
      <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-[9999] p-4">
        <div className="bg-white w-full max-w-sm rounded-2xl p-6 text-center shadow-2xl animate-in zoom-in-95">
          <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">⚠️</div>
          <h2 className="text-xl font-bold text-slate-800 mb-2">Temporarily Closed</h2>
          <p className="text-slate-500 text-sm mb-6">This location is under maintenance.</p>
          <button onClick={onClose} className="w-full bg-slate-100 font-bold py-3 rounded-xl hover:bg-slate-200">Close</button>
        </div>
      </div>
    );
  }

  // ✅ ATTRACTIVE UI
  return (
    <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-md flex items-center justify-center z-[9999] p-4 md:p-6 overflow-y-auto">
      <div className="bg-white w-full max-w-4xl rounded-[2.5rem] shadow-2xl flex flex-col md:flex-row overflow-hidden relative animate-in zoom-in-95 duration-200">
        
        {/* CLOSE BUTTON */}
        <button onClick={onClose} className="absolute top-4 right-4 z-10 p-2 bg-white/50 hover:bg-slate-100 rounded-full backdrop-blur-sm transition-all">
            <X className="w-6 h-6 text-slate-500" />
        </button>

        {/* LEFT PANEL: CONFIGURATION */}
        <div className="flex-1 p-8 md:p-10 space-y-8">
            <div>
                <h2 className="text-3xl font-black text-slate-800 tracking-tight mb-1">Reserve Spot</h2>
                <div className="flex items-center gap-2 text-slate-500 text-sm font-medium">
                    <span className="bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wide">Self Park</span>
                    <span>•</span>
                    <span>{fullLotData?.name || lot.name}</span>
                </div>
            </div>

            {/* VEHICLE SELECTOR */}
            <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 block">Vehicle Type</label>
                <div className="grid grid-cols-3 gap-3">
                    {[
                        { id: 'BIKE', label: 'Bike', icon: '🏍️' },
                        { id: 'CAR', label: 'Car', icon: '🚗' },
                        { id: 'HEAVY', label: 'Heavy', icon: '🚛' }
                    ].map((v) => {
                        const isSupported = fullLotData?.slots?.some(s => s.vehicleType === v.id);
                        const isSelected = selectedVehicle === v.id;
                        return (
                            <button
                                key={v.id}
                                disabled={!isSupported}
                                onClick={() => setSelectedVehicle(v.id)}
                                className={`relative py-3 rounded-2xl flex flex-col items-center gap-1 transition-all border-2
                                    ${!isSupported ? 'opacity-40 grayscale cursor-not-allowed border-slate-100 bg-slate-50' : ''}
                                    ${isSelected ? 'border-indigo-600 bg-indigo-50 text-indigo-700 shadow-sm' : 'border-slate-100 bg-white text-slate-600 hover:border-slate-200'}
                                `}
                            >
                                <span className="text-2xl">{v.icon}</span>
                                <span className="text-[10px] font-black uppercase">{v.label}</span>
                                {isSelected && <div className="absolute top-2 right-2 w-2 h-2 bg-indigo-600 rounded-full"></div>}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* TIME & DATE SELECTOR */}
            <div>
                 <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <Clock size={14} /> Duration
                 </label>
                 <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 focus-within:ring-2 focus-within:ring-indigo-500 transition-all">
                        <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Arrive After</span>
                        <input 
                            type="datetime-local" 
                            className="w-full bg-transparent text-sm font-bold text-slate-700 outline-none"
                            value={startTime}
                            onChange={(e) => setStartTime(e.target.value)}
                        />
                    </div>
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 focus-within:ring-2 focus-within:ring-indigo-500 transition-all">
                        <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Leave Before</span>
                        <input 
                            type="datetime-local" 
                            className="w-full bg-transparent text-sm font-bold text-slate-700 outline-none"
                            value={endTime}
                            onChange={(e) => setEndTime(e.target.value)}
                        />
                    </div>
                 </div>
            </div>

            {/* DETAILS FORM */}
            <div className="space-y-4">
                 <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1 flex items-center gap-2">
                    <FileText size={14} /> Your Details
                 </label>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-slate-50 px-4 py-3 rounded-xl border border-slate-200 flex items-center gap-3 focus-within:ring-2 focus-within:ring-indigo-500 transition-all">
                        <Car className="text-slate-400 w-5 h-5" />
                        <div className="flex-1">
                            <input 
                                placeholder="MH-12-AB-1234" 
                                className="w-full bg-transparent text-sm font-bold text-slate-700 placeholder:font-normal outline-none uppercase"
                                value={vehicleNumber}
                                onChange={(e) => setVehicleNumber(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="bg-slate-50 px-4 py-3 rounded-xl border border-slate-200 flex items-center gap-3 focus-within:ring-2 focus-within:ring-indigo-500 transition-all">
                        <Phone className="text-slate-400 w-5 h-5" />
                        <div className="flex-1">
                            <input 
                                placeholder="9876543210" 
                                type="tel"
                                className="w-full bg-transparent text-sm font-bold text-slate-700 placeholder:font-normal outline-none"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                            />
                        </div>
                    </div>
                 </div>
            </div>
        </div>

        {/* RIGHT PANEL: BILL SUMMARY (TICKET STYLE) */}
        <div className="w-full md:w-80 bg-slate-50 border-l border-slate-200 p-8 flex flex-col relative">
            
            {/* Ticket Visual Decoration */}
            <div className="absolute -left-3 top-1/2 w-6 h-6 bg-slate-900/70 backdrop-blur-md rounded-full"></div>
            
            <h3 className="font-black text-slate-800 text-lg mb-6 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-indigo-600" /> Bill Summary
            </h3>

            <div className="space-y-4 flex-1">
                <div className="flex justify-between text-sm">
                    <span className="text-slate-500 font-medium">Rate per hour</span>
                    <span className="font-bold text-slate-800">₹{slotDetails?.price || 0}</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-slate-500 font-medium">Duration</span>
                    <span className="font-bold text-slate-800">{durationHours} hrs</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-slate-500 font-medium">Booking Fee</span>
                    <span className="font-bold text-green-600">Free</span>
                </div>
                
                <div className="my-4 border-t-2 border-dashed border-slate-200"></div>
                
                <div className="flex justify-between items-end">
                    <span className="text-slate-500 font-bold text-sm">Total Pay</span>
                    <span className="text-3xl font-black text-indigo-600">₹{totalPrice}</span>
                </div>
            </div>

            {/* Capacity Warning */}
            {isVehicleAvailable && slotDetails.capacity < 5 && (
                <div className="mt-6 mb-4 bg-amber-50 text-amber-700 px-3 py-2 rounded-lg text-xs font-bold text-center border border-amber-100">
                    🔥 Hurry! Only {slotDetails.capacity} spots left
                </div>
            )}

            <button 
                disabled={loading || !isVehicleAvailable}
                onClick={handleConfirmBooking}
                className={`w-full py-4 rounded-xl font-bold shadow-xl transition-all active:scale-95 flex items-center justify-center gap-2
                    ${loading || !isVehicleAvailable 
                        ? "bg-slate-300 text-slate-500 cursor-not-allowed shadow-none" 
                        : "bg-gradient-to-r from-indigo-600 to-violet-600 text-white hover:shadow-indigo-500/30"
                    }
                `}
            >
                {loading ? (
                    <>Processing...</>
                ) : (
                    <>Confirm Payment <span className="bg-white/20 px-2 py-0.5 rounded text-xs">→</span></>
                )}
            </button>
        </div>
      </div>
    </div>
  );
}

export default ParkingLotBooking;