// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import {
//   AlertCircle,
//   Camera,
//   CheckCircle2,
//   Clock,
//   Car,
//   DollarSign,
//   MapPin,
//   Navigation,
//   RefreshCw,
//   Shield,
//   Star,
//   User,
//   Zap
// } from "lucide-react";

// function ValetDashboard() {
//   const [queue, setQueue] = useState([]);
//   const [activeTask, setActiveTask] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [stats, setStats] = useState({
//     completed: 0,
//     rating: 4.8,
//     earnings: 0
//   });
//   const navigate = useNavigate();

//   // 1. Helper to get Auth Headers
//   const getAuthConfig = () => {
//     const token = localStorage.getItem("token");
//     if (!token) return null;
//     return {
//       headers: { Authorization: `Bearer ${token}` },
//       withCredentials: true
//     };
//   };

//   const handleLogout = async () => {
//     try {
//       // Try to notify backend, but client-side cleanup is most important
//       const config = getAuthConfig();
//       if (config) {
//          await axios.post("http://localhost:8080/api/auth/logout", {}, config);
//       }
//     } catch (error) {
//       console.error("Logout failed", error);
//     } finally {
//       localStorage.clear();
//       navigate("/");
//     }
//   };

//   const fetchQueue = async () => {
//     const config = getAuthConfig();
//     if (!config) {
//       navigate("/login");
//       return;
//     }

//     try {
//       // ✅ Added config with Authorization Header
//       const res = await axios.get("http://localhost:8080/api/bookings/valet/queue", config);
//       setQueue(res.data);
//     } catch (err) {
//       console.error("Fetch Queue Error:", err);
//       if (err.response?.status === 401) {
//         localStorage.clear();
//         navigate("/login");
//       }
//     }
//   };

//   useEffect(() => {
//     fetchQueue();
//     const interval = setInterval(fetchQueue, 10000);
//     return () => clearInterval(interval);
//   }, []);

//   const handleAccept = async (booking) => {
//     const config = getAuthConfig();
//     if (!config) {
//         alert("Session expired");
//         navigate("/login");
//         return;
//     }

//     try {
//       // ✅ Added config with Authorization Header
//       await axios.post(
//         `http://localhost:8080/api/bookings/${booking.id}/pickup`, 
//         {}, 
//         config
//       );
//       setActiveTask(booking);
//       fetchQueue();
//     } catch (err) {
//       console.error("Accept Task Error:", err);
//       alert("Error accepting task. Check console for details.");
//     }
//   };

//   const handleCompleteTask = async () => {
//     if (!activeTask) return;
    
//     // Simulate photo capture and GPS acquisition
//     // In a real app, you would send this data to backend here
//     alert("Task completed! Photo and location saved.");
    
//     // You might want to add an API call here to mark as completed in backend
//     // await axios.post(..., config);

//     setActiveTask(null);
//     fetchQueue();
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/5 to-slate-50 p-4 md:p-8">
//       {/* HEADER */}
//       <div className="mb-8">
//         <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
//           <div>
//             <div className="flex items-center gap-3 mb-3">
//               <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg">
//                 <Navigation className="w-5 h-5 text-white" />
//               </div>
//               <span className="text-sm font-semibold text-blue-600 uppercase tracking-wider">VALET CONSOLE</span>
//             </div>
//             <div className="flex items-center gap-4">
//               <h1 className="text-3xl md:text-4xl font-bold text-slate-800">
//                 Valet <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Operations</span>
//               </h1>
//               <button
//                 onClick={fetchQueue}
//                 disabled={loading}
//                 className="p-2 text-slate-400 hover:text-slate-600 transition-colors"
//               >
//                 <RefreshCw className={`w-5 h-5 ${loading ? "animate-spin" : ""}`} />
//               </button>
//             </div>
//             <p className="text-slate-500 mt-2">Manage valet requests and parking operations</p>
//           </div>
          
//           <button
//             onClick={handleLogout}
//             className="inline-flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-rose-500 to-pink-600 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-rose-500/30 transition-all"
//           >
//             Logout
//           </button>
//         </div>
//       </div>

//       {/* STATS */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//         <div className="bg-white rounded-2xl border border-slate-200 p-6">
//           <div className="flex items-center gap-4">
//             <div className="p-3 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-xl">
//               <CheckCircle2 className="w-6 h-6 text-emerald-600" />
//             </div>
//             <div>
//               <p className="text-sm text-slate-500">Completed</p>
//               <p className="text-2xl font-bold text-slate-800">{stats.completed}</p>
//             </div>
//           </div>
//         </div>
        
//         <div className="bg-white rounded-2xl border border-slate-200 p-6">
//           <div className="flex items-center gap-4">
//             <div className="p-3 bg-gradient-to-br from-amber-100 to-orange-100 rounded-xl">
//               <Star className="w-6 h-6 text-amber-600 fill-current" />
//             </div>
//             <div>
//               <p className="text-sm text-slate-500">Rating</p>
//               <p className="text-2xl font-bold text-slate-800">{stats.rating}/5</p>
//             </div>
//           </div>
//         </div>
        
//         <div className="bg-white rounded-2xl border border-slate-200 p-6">
//           <div className="flex items-center gap-4">
//             <div className="p-3 bg-gradient-to-br from-violet-100 to-purple-100 rounded-xl">
//               <DollarSign className="w-6 h-6 text-violet-600" />
//             </div>
//             <div>
//               <p className="text-sm text-slate-500">Earnings</p>
//               <p className="text-2xl font-bold text-slate-800">₹{stats.earnings}</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* MAIN CONTENT */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//         {/* ACTIVE TASK */}
//         <div className="lg:col-span-2">
//           {activeTask ? (
//             <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
//               <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center gap-3">
//                     <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
//                       <Navigation className="w-6 h-6" />
//                     </div>
//                     <div>
//                       <h3 className="text-xl font-bold">Active Mission</h3>
//                       <p className="text-blue-100">Complete the parking process</p>
//                     </div>
//                   </div>
//                   <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
//                     In Progress
//                   </span>
//                 </div>
//               </div>
              
//               <div className="p-6">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//                   <div className="bg-slate-50 rounded-xl p-4">
//                     <div className="flex items-center gap-3 mb-4">
//                       <div className="p-2 bg-white rounded-lg">
//                         <User className="w-5 h-5 text-slate-600" />
//                       </div>
//                       <div>
//                         <p className="text-sm text-slate-500">Customer</p>
//                         <p className="font-semibold text-slate-800">{activeTask.user?.name || "Guest"}</p>
//                       </div>
//                     </div>
//                     <p className="text-sm text-slate-600">{activeTask.contactNumber || "Contact: N/A"}</p>
//                   </div>
                  
//                   <div className="bg-slate-50 rounded-xl p-4">
//                     <div className="flex items-center gap-3 mb-4">
//                       <div className="p-2 bg-white rounded-lg">
//                         <Car className="w-5 h-5 text-slate-600" />
//                       </div>
//                       <div>
//                         <p className="text-sm text-slate-500">Vehicle</p>
//                         <p className="font-semibold text-slate-800">{activeTask.vehicleNumber}</p>
//                       </div>
//                     </div>
//                     <p className="text-sm text-slate-600">{activeTask.vehicleModel || "Model: N/A"}</p>
//                   </div>
//                 </div>
                
//                 <div className="mb-6">
//                   <h4 className="text-sm font-medium text-slate-700 mb-3">Instructions</h4>
//                   <div className="space-y-3">
//                     <div className="flex items-center gap-3 text-sm text-slate-600">
//                       <MapPin className="w-4 h-4 text-blue-500" />
//                       <span>Navigate to customer location</span>
//                     </div>
//                     <div className="flex items-center gap-3 text-sm text-slate-600">
//                       <Camera className="w-4 h-4 text-emerald-500" />
//                       <span>Take photo after parking</span>
//                     </div>
//                     <div className="flex items-center gap-3 text-sm text-slate-600">
//                       <Shield className="w-4 h-4 text-violet-500" />
//                       <span>Secure the vehicle</span>
//                     </div>
//                   </div>
//                 </div>
                
//                 <button
//                   onClick={handleCompleteTask}
//                   className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold py-3.5 rounded-xl hover:shadow-lg hover:shadow-emerald-500/30 transition-all flex items-center justify-center gap-2"
//                 >
//                   <Camera className="w-5 h-5" />
//                   Capture Photo & Complete Task
//                 </button>
//               </div>
//             </div>
//           ) : (
//             <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center">
//               <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
//                 <Clock className="w-10 h-10 text-blue-600" />
//               </div>
//               <h3 className="text-lg font-semibold text-slate-800 mb-2">No Active Task</h3>
//               <p className="text-slate-500 mb-6">Accept a request from the queue to start a mission</p>
//               <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg">
//                 <AlertCircle className="w-4 h-4" />
//                 <span className="text-sm font-medium">Waiting for assignments</span>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* QUEUE */}
//         <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
//           <div className="border-b border-slate-200 p-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <h3 className="text-lg font-semibold text-slate-800">Waiting Queue</h3>
//                 <p className="text-sm text-slate-500">{queue.length} requests pending</p>
//               </div>
//               <button
//                 onClick={fetchQueue}
//                 className="p-2 hover:bg-slate-50 rounded-lg transition-colors"
//               >
//                 <RefreshCw className="w-4 h-4 text-slate-500" />
//               </button>
//             </div>
//           </div>
          
//           <div className="p-4">
//             {queue.length === 0 ? (
//               <div className="text-center py-12">
//                 <div className="w-16 h-16 bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
//                   <CheckCircle2 className="w-8 h-8 text-slate-400" />
//                 </div>
//                 <p className="text-slate-500 font-medium">All clear!</p>
//                 <p className="text-sm text-slate-400 mt-1">No pending requests</p>
//               </div>
//             ) : (
//               <div className="space-y-3">
//                 {queue.map((booking) => (
//                   <div 
//                     key={booking.id} 
//                     className="bg-slate-50 rounded-xl p-4 hover:bg-slate-100 transition-colors group"
//                   >
//                     <div className="flex items-center justify-between mb-3">
//                       <div className="flex items-center gap-3">
//                         <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg flex items-center justify-center">
//                           <Car className="w-5 h-5 text-blue-600" />
//                         </div>
//                         <div>
//                           <p className="font-medium text-slate-800">{booking.user?.name || "Guest"}</p>
//                           <p className="text-xs text-slate-500">ID: #{booking.id}</p>
//                         </div>
//                       </div>
//                       <span className="text-xs font-medium px-2 py-1 bg-amber-100 text-amber-700 rounded-full">
//                         Waiting
//                       </span>
//                     </div>
                    
//                     <div className="text-sm text-slate-600 mb-4">
//                       <p className="mb-1"><strong>Vehicle:</strong> {booking.vehicleNumber}</p>
//                       <p><strong>Model:</strong> {booking.vehicleModel || "N/A"}</p>
//                     </div>
                    
//                     <button
//                       onClick={() => handleAccept(booking)}
//                       disabled={!!activeTask}
//                       className={`w-full py-2.5 rounded-lg font-medium transition-all ${
//                         activeTask
//                           ? "bg-slate-100 text-slate-400 cursor-not-allowed"
//                           : "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-lg hover:shadow-blue-500/30"
//                       }`}
//                     >
//                       {activeTask ? "Complete Current Task First" : "Accept Request"}
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ValetDashboard;

import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  AlertCircle,
  Camera,
  CheckCircle2,
  Clock,
  Car,
  DollarSign,
  MapPin,
  Navigation,
  RefreshCw,
  Shield,
  Star,
  User,
  Zap,
  Upload,
  X,
  Loader2
} from "lucide-react";

function ValetDashboard() {
  const [queue, setQueue] = useState([]);
  const [activeTask, setActiveTask] = useState(null);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({
    completed: 0,
    rating: 4.8,
    earnings: 0
  });
  
  // 🆕 NEW STATES FOR COMPLETION
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const [completionData, setCompletionData] = useState({
    lat: null,
    lng: null,
    images: [] // Stores the actual File objects
  });
  const [imagePreviews, setImagePreviews] = useState([]); // Stores URLs for preview
  const [submitting, setSubmitting] = useState(false);

  const navigate = useNavigate();

  // 1. Helper to get Auth Headers
  const getAuthConfig = () => {
    const token = localStorage.getItem("token");
    if (!token) return null;
    return {
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: true
    };
  };

  const handleLogout = async () => {
    try {
      const config = getAuthConfig();
      if (config) {
         await axios.post("http://localhost:8080/api/auth/logout", {}, config);
      }
    } catch (error) {
      console.error("Logout failed", error);
    } finally {
      localStorage.clear();
      navigate("/");
    }
  };

  const fetchQueue = async () => {
    const config = getAuthConfig();
    if (!config) {
      navigate("/login");
      return;
    }

    try {
      const res = await axios.get("http://localhost:8080/api/bookings/valet/queue", config);
      setQueue(res.data);
    } catch (err) {
      console.error("Fetch Queue Error:", err);
      if (err.response?.status === 401) {
        localStorage.clear();
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    fetchQueue();
    const interval = setInterval(fetchQueue, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleAccept = async (booking) => {
    const config = getAuthConfig();
    if (!config) return;

    try {
      await axios.post(
        `http://localhost:8080/api/bookings/${booking.id}/pickup`, 
        {}, 
        config
      );
      setActiveTask(booking);
      fetchQueue();
    } catch (err) {
      alert("Error accepting task.");
    }
  };

  // 📍 1. GET CURRENT GPS LOCATION
  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCompletionData(prev => ({
            ...prev,
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }));
        },
        (error) => alert("Could not fetch location. Please enable GPS."),
        { enableHighAccuracy: true }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  // 📸 2. HANDLE IMAGE SELECTION (MULTIPLE)
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      // Update File Objects
      setCompletionData(prev => ({
        ...prev,
        images: [...prev.images, ...files]
      }));

      // Generate Previews
      const newPreviews = files.map(file => URL.createObjectURL(file));
      setImagePreviews(prev => [...prev, ...newPreviews]);
    }
  };

  // ❌ REMOVE IMAGE
  const removeImage = (index) => {
    setCompletionData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

  // 🚀 3. SUBMIT COMPLETION DATA
  const handleSubmitCompletion = async () => {
    if (!completionData.lat || !completionData.lng) {
      alert("Please tag the parking location first!");
      return;
    }
    if (completionData.images.length === 0) {
      if(!window.confirm("No proof images uploaded. Continue?")) return;
    }

    setSubmitting(true);
    const config = getAuthConfig();

    try {
      // ✅ Create FormData for multipart upload
      const formData = new FormData();
      formData.append("parkedLat", completionData.lat);
      formData.append("parkedLng", completionData.lng);
      
      // Append all images
      completionData.images.forEach((image) => {
        formData.append("files", image);
      });

      // You might need to adjust the endpoint based on your BookingController
      // Typically: /api/bookings/{id}/complete or /checkin
      await axios.post(
        `http://localhost:8080/api/bookings/${activeTask.id}/complete`, 
        formData, 
        {
          ...config,
          headers: {
            ...config.headers,
            "Content-Type": "multipart/form-data" // Crucial for files
          }
        }
      );

      alert("✅ Vehicle Parked Successfully!");
      setActiveTask(null);
      setShowCompleteModal(false);
      setCompletionData({ lat: null, lng: null, images: [] });
      setImagePreviews([]);
      fetchQueue();

    } catch (err) {
      console.error("Completion Error:", err);
      alert("Failed to submit data. Check server logs.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/5 to-slate-50 p-4 md:p-8">
      {/* HEADER */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg">
                <Navigation className="w-5 h-5 text-white" />
              </div>
              <span className="text-sm font-semibold text-blue-600 uppercase tracking-wider">VALET CONSOLE</span>
            </div>
            <div className="flex items-center gap-4">
              <h1 className="text-3xl md:text-4xl font-bold text-slate-800">
                Valet <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Operations</span>
              </h1>
              <button
                onClick={fetchQueue}
                disabled={loading}
                className="p-2 text-slate-400 hover:text-slate-600 transition-colors"
              >
                <RefreshCw className={`w-5 h-5 ${loading ? "animate-spin" : ""}`} />
              </button>
            </div>
          </div>
          
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-rose-500 to-pink-600 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-rose-500/30 transition-all"
          >
            Logout
          </button>
        </div>
      </div>

      {/* STATS (Existing code) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-xl">
              <CheckCircle2 className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <p className="text-sm text-slate-500">Completed</p>
              <p className="text-2xl font-bold text-slate-800">{stats.completed}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-br from-amber-100 to-orange-100 rounded-xl">
              <Star className="w-6 h-6 text-amber-600 fill-current" />
            </div>
            <div>
              <p className="text-sm text-slate-500">Rating</p>
              <p className="text-2xl font-bold text-slate-800">{stats.rating}/5</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-br from-violet-100 to-purple-100 rounded-xl">
              <DollarSign className="w-6 h-6 text-violet-600" />
            </div>
            <div>
              <p className="text-sm text-slate-500">Earnings</p>
              <p className="text-2xl font-bold text-slate-800">₹{stats.earnings}</p>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* ACTIVE TASK */}
        <div className="lg:col-span-2">
          {activeTask ? (
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                      <Navigation className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">Active Mission</h3>
                      <p className="text-blue-100">Complete the parking process</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
                    In Progress
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                {/* Vehicle & User Info (Existing) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-slate-50 rounded-xl p-4">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-white rounded-lg">
                        <User className="w-5 h-5 text-slate-600" />
                      </div>
                      <div>
                        <p className="text-sm text-slate-500">Customer</p>
                        <p className="font-semibold text-slate-800">{activeTask.user?.name || "Guest"}</p>
                      </div>
                    </div>
                    <p className="text-sm text-slate-600">{activeTask.contactNumber || "Contact: N/A"}</p>
                  </div>
                  
                  <div className="bg-slate-50 rounded-xl p-4">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-white rounded-lg">
                        <Car className="w-5 h-5 text-slate-600" />
                      </div>
                      <div>
                        <p className="text-sm text-slate-500">Vehicle</p>
                        <p className="font-semibold text-slate-800">{activeTask.vehicleNumber}</p>
                      </div>
                    </div>
                    <p className="text-sm text-slate-600">{activeTask.vehicleModel || "Model: N/A"}</p>
                  </div>
                </div>
                
                {/* 📝 COMPLETION FORM (Replaces Instructions when activated) */}
                {!showCompleteModal ? (
                  <div className="space-y-4">
                    <div className="mb-6">
                      <h4 className="text-sm font-medium text-slate-700 mb-3">Instructions</h4>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3 text-sm text-slate-600">
                          <MapPin className="w-4 h-4 text-blue-500" />
                          <span>Navigate to customer location</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-slate-600">
                          <Shield className="w-4 h-4 text-violet-500" />
                          <span>Park vehicle in designated spot</span>
                        </div>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => setShowCompleteModal(true)}
                      className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold py-3.5 rounded-xl hover:shadow-lg hover:shadow-emerald-500/30 transition-all flex items-center justify-center gap-2"
                    >
                      <CheckCircle2 className="w-5 h-5" />
                      Complete Task
                    </button>
                  </div>
                ) : (
                  <div className="bg-slate-50 rounded-xl p-6 border border-slate-200 animate-in fade-in slide-in-from-bottom-4">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="font-bold text-slate-800">Finalize Parking</h4>
                      <button onClick={() => setShowCompleteModal(false)} className="text-slate-400 hover:text-slate-600">
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    {/* 📍 1. LOCATION PICKER */}
                    <div className="mb-6">
                      <label className="block text-xs font-bold uppercase text-slate-500 mb-2">1. Tag Location</label>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={handleGetLocation}
                          className="flex-1 bg-white border border-slate-300 text-slate-700 font-medium py-3 rounded-xl hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
                        >
                          <MapPin className="w-4 h-4 text-rose-500" />
                          {completionData.lat ? "Update Location" : "Get Current Location"}
                        </button>
                        {completionData.lat && (
                          <div className="bg-emerald-100 text-emerald-700 px-3 py-3 rounded-xl">
                            <CheckCircle2 className="w-5 h-5" />
                          </div>
                        )}
                      </div>
                      {completionData.lat && (
                        <p className="text-xs text-slate-500 mt-2 ml-1">
                          📍 Coordinates: {completionData.lat.toFixed(4)}, {completionData.lng.toFixed(4)}
                        </p>
                      )}
                    </div>

                    {/* 📸 2. IMAGE UPLOAD */}
                    <div className="mb-6">
                      <label className="block text-xs font-bold uppercase text-slate-500 mb-2">2. Upload Proof</label>
                      <div className="grid grid-cols-4 gap-2 mb-3">
                        {/* Preview Images */}
                        {imagePreviews.map((src, index) => (
                          <div key={index} className="relative aspect-square rounded-lg overflow-hidden border border-slate-200 group">
                            <img src={src} alt="proof" className="w-full h-full object-cover" />
                            <button
                              onClick={() => removeImage(index)}
                              className="absolute top-1 right-1 bg-black/50 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-all"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                        
                        {/* Upload Button */}
                        <label className="aspect-square rounded-lg border-2 border-dashed border-slate-300 hover:border-blue-500 hover:bg-blue-50 transition-all flex flex-col items-center justify-center cursor-pointer text-slate-400 hover:text-blue-500">
                          <Upload className="w-6 h-6 mb-1" />
                          <span className="text-[10px] font-bold">ADD</span>
                          <input 
                            type="file" 
                            multiple 
                            accept="image/*" 
                            className="hidden" 
                            onChange={handleImageChange}
                          />
                        </label>
                      </div>
                    </div>

                    {/* 🚀 SUBMIT */}
                    <button
                      onClick={handleSubmitCompletion}
                      disabled={submitting}
                      className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold py-3.5 rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        "Submit & Finish"
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Clock className="w-10 h-10 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">No Active Task</h3>
              <p className="text-slate-500 mb-6">Accept a request from the queue to start a mission</p>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg">
                <AlertCircle className="w-4 h-4" />
                <span className="text-sm font-medium">Waiting for assignments</span>
              </div>
            </div>
          )}
        </div>

        {/* QUEUE SIDEBAR (Existing Code) */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          <div className="border-b border-slate-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-slate-800">Waiting Queue</h3>
                <p className="text-sm text-slate-500">{queue.length} requests pending</p>
              </div>
              <button
                onClick={fetchQueue}
                className="p-2 hover:bg-slate-50 rounded-lg transition-colors"
              >
                <RefreshCw className="w-4 h-4 text-slate-500" />
              </button>
            </div>
          </div>
          
          <div className="p-4">
            {queue.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8 text-slate-400" />
                </div>
                <p className="text-slate-500 font-medium">All clear!</p>
                <p className="text-sm text-slate-400 mt-1">No pending requests</p>
              </div>
            ) : (
              <div className="space-y-3">
                {queue.map((booking) => (
                  <div 
                    key={booking.id} 
                    className="bg-slate-50 rounded-xl p-4 hover:bg-slate-100 transition-colors group"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg flex items-center justify-center">
                          <Car className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium text-slate-800">{booking.user?.name || "Guest"}</p>
                          <p className="text-xs text-slate-500">ID: #{booking.id}</p>
                        </div>
                      </div>
                      <span className="text-xs font-medium px-2 py-1 bg-amber-100 text-amber-700 rounded-full">
                        Waiting
                      </span>
                    </div>
                    
                    <div className="text-sm text-slate-600 mb-4">
                      <p className="mb-1"><strong>Vehicle:</strong> {booking.vehicleNumber}</p>
                      <p><strong>Model:</strong> {booking.vehicleModel || "N/A"}</p>
                    </div>
                    
                    <button
                      onClick={() => handleAccept(booking)}
                      disabled={!!activeTask}
                      className={`w-full py-2.5 rounded-lg font-medium transition-all ${
                        activeTask
                          ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                          : "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-lg hover:shadow-blue-500/30"
                      }`}
                    >
                      {activeTask ? "Complete Current Task First" : "Accept Request"}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ValetDashboard;