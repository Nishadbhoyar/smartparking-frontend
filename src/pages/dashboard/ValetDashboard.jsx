// // import { useEffect, useState } from "react";
// // import axios from "axios";
// // import { useNavigate } from "react-router-dom";
// // import {
// //   AlertCircle,
// //   Camera,
// //   CheckCircle2,
// //   Clock,
// //   Car,
// //   DollarSign,
// //   MapPin,
// //   Navigation,
// //   RefreshCw,
// //   Shield,
// //   Star,
// //   User,
// //   Zap
// // } from "lucide-react";

// // function ValetDashboard() {
// //   const [queue, setQueue] = useState([]);
// //   const [activeTask, setActiveTask] = useState(null);
// //   const [loading, setLoading] = useState(false);
// //   const [stats, setStats] = useState({
// //     completed: 0,
// //     rating: 4.8,
// //     earnings: 0
// //   });
// //   const navigate = useNavigate();

// //   // 1. Helper to get Auth Headers
// //   const getAuthConfig = () => {
// //     const token = localStorage.getItem("token");
// //     if (!token) return null;
// //     return {
// //       headers: { Authorization: `Bearer ${token}` },
// //       withCredentials: true
// //     };
// //   };

// //   const handleLogout = async () => {
// //     try {
// //       // Try to notify backend, but client-side cleanup is most important
// //       const config = getAuthConfig();
// //       if (config) {
// //          await axios.post("http://localhost:https://smartparking-backend-1.onrender.com/api/auth/logout", {}, config);
// //       }
// //     } catch (error) {
// //       console.error("Logout failed", error);
// //     } finally {
// //       localStorage.clear();
// //       navigate("/");
// //     }
// //   };

// //   const fetchQueue = async () => {
// //     const config = getAuthConfig();
// //     if (!config) {
// //       navigate("/login");
// //       return;
// //     }

// //     try {
// //       // ✅ Added config with Authorization Header
// //       const res = await axios.get("http://localhost:https://smartparking-backend-1.onrender.com/api/bookings/valet/queue", config);
// //       setQueue(res.data);
// //     } catch (err) {
// //       console.error("Fetch Queue Error:", err);
// //       if (err.response?.status === 401) {
// //         localStorage.clear();
// //         navigate("/login");
// //       }
// //     }
// //   };

// //   useEffect(() => {
// //     fetchQueue();
// //     const interval = setInterval(fetchQueue, 10000);
// //     return () => clearInterval(interval);
// //   }, []);

// //   const handleAccept = async (booking) => {
// //     const config = getAuthConfig();
// //     if (!config) {
// //         alert("Session expired");
// //         navigate("/login");
// //         return;
// //     }

// //     try {
// //       // ✅ Added config with Authorization Header
// //       await axios.post(
// //         `http://localhost:https://smartparking-backend-1.onrender.com/api/bookings/${booking.id}/pickup`, 
// //         {}, 
// //         config
// //       );
// //       setActiveTask(booking);
// //       fetchQueue();
// //     } catch (err) {
// //       console.error("Accept Task Error:", err);
// //       alert("Error accepting task. Check console for details.");
// //     }
// //   };

// //   const handleCompleteTask = async () => {
// //     if (!activeTask) return;
    
// //     // Simulate photo capture and GPS acquisition
// //     // In a real app, you would send this data to backend here
// //     alert("Task completed! Photo and location saved.");
    
// //     // You might want to add an API call here to mark as completed in backend
// //     // await axios.post(..., config);

// //     setActiveTask(null);
// //     fetchQueue();
// //   };

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/5 to-slate-50 p-4 md:p-8">
// //       {/* HEADER */}
// //       <div className="mb-8">
// //         <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
// //           <div>
// //             <div className="flex items-center gap-3 mb-3">
// //               <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg">
// //                 <Navigation className="w-5 h-5 text-white" />
// //               </div>
// //               <span className="text-sm font-semibold text-blue-600 uppercase tracking-wider">VALET CONSOLE</span>
// //             </div>
// //             <div className="flex items-center gap-4">
// //               <h1 className="text-3xl md:text-4xl font-bold text-slate-800">
// //                 Valet <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Operations</span>
// //               </h1>
// //               <button
// //                 onClick={fetchQueue}
// //                 disabled={loading}
// //                 className="p-2 text-slate-400 hover:text-slate-600 transition-colors"
// //               >
// //                 <RefreshCw className={`w-5 h-5 ${loading ? "animate-spin" : ""}`} />
// //               </button>
// //             </div>
// //             <p className="text-slate-500 mt-2">Manage valet requests and parking operations</p>
// //           </div>
          
// //           <button
// //             onClick={handleLogout}
// //             className="inline-flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-rose-500 to-pink-600 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-rose-500/30 transition-all"
// //           >
// //             Logout
// //           </button>
// //         </div>
// //       </div>

// //       {/* STATS */}
// //       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
// //         <div className="bg-white rounded-2xl border border-slate-200 p-6">
// //           <div className="flex items-center gap-4">
// //             <div className="p-3 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-xl">
// //               <CheckCircle2 className="w-6 h-6 text-emerald-600" />
// //             </div>
// //             <div>
// //               <p className="text-sm text-slate-500">Completed</p>
// //               <p className="text-2xl font-bold text-slate-800">{stats.completed}</p>
// //             </div>
// //           </div>
// //         </div>
        
// //         <div className="bg-white rounded-2xl border border-slate-200 p-6">
// //           <div className="flex items-center gap-4">
// //             <div className="p-3 bg-gradient-to-br from-amber-100 to-orange-100 rounded-xl">
// //               <Star className="w-6 h-6 text-amber-600 fill-current" />
// //             </div>
// //             <div>
// //               <p className="text-sm text-slate-500">Rating</p>
// //               <p className="text-2xl font-bold text-slate-800">{stats.rating}/5</p>
// //             </div>
// //           </div>
// //         </div>
        
// //         <div className="bg-white rounded-2xl border border-slate-200 p-6">
// //           <div className="flex items-center gap-4">
// //             <div className="p-3 bg-gradient-to-br from-violet-100 to-purple-100 rounded-xl">
// //               <DollarSign className="w-6 h-6 text-violet-600" />
// //             </div>
// //             <div>
// //               <p className="text-sm text-slate-500">Earnings</p>
// //               <p className="text-2xl font-bold text-slate-800">₹{stats.earnings}</p>
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       {/* MAIN CONTENT */}
// //       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
// //         {/* ACTIVE TASK */}
// //         <div className="lg:col-span-2">
// //           {activeTask ? (
// //             <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
// //               <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
// //                 <div className="flex items-center justify-between">
// //                   <div className="flex items-center gap-3">
// //                     <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
// //                       <Navigation className="w-6 h-6" />
// //                     </div>
// //                     <div>
// //                       <h3 className="text-xl font-bold">Active Mission</h3>
// //                       <p className="text-blue-100">Complete the parking process</p>
// //                     </div>
// //                   </div>
// //                   <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
// //                     In Progress
// //                   </span>
// //                 </div>
// //               </div>
              
// //               <div className="p-6">
// //                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
// //                   <div className="bg-slate-50 rounded-xl p-4">
// //                     <div className="flex items-center gap-3 mb-4">
// //                       <div className="p-2 bg-white rounded-lg">
// //                         <User className="w-5 h-5 text-slate-600" />
// //                       </div>
// //                       <div>
// //                         <p className="text-sm text-slate-500">Customer</p>
// //                         <p className="font-semibold text-slate-800">{activeTask.user?.name || "Guest"}</p>
// //                       </div>
// //                     </div>
// //                     <p className="text-sm text-slate-600">{activeTask.contactNumber || "Contact: N/A"}</p>
// //                   </div>
                  
// //                   <div className="bg-slate-50 rounded-xl p-4">
// //                     <div className="flex items-center gap-3 mb-4">
// //                       <div className="p-2 bg-white rounded-lg">
// //                         <Car className="w-5 h-5 text-slate-600" />
// //                       </div>
// //                       <div>
// //                         <p className="text-sm text-slate-500">Vehicle</p>
// //                         <p className="font-semibold text-slate-800">{activeTask.vehicleNumber}</p>
// //                       </div>
// //                     </div>
// //                     <p className="text-sm text-slate-600">{activeTask.vehicleModel || "Model: N/A"}</p>
// //                   </div>
// //                 </div>
                
// //                 <div className="mb-6">
// //                   <h4 className="text-sm font-medium text-slate-700 mb-3">Instructions</h4>
// //                   <div className="space-y-3">
// //                     <div className="flex items-center gap-3 text-sm text-slate-600">
// //                       <MapPin className="w-4 h-4 text-blue-500" />
// //                       <span>Navigate to customer location</span>
// //                     </div>
// //                     <div className="flex items-center gap-3 text-sm text-slate-600">
// //                       <Camera className="w-4 h-4 text-emerald-500" />
// //                       <span>Take photo after parking</span>
// //                     </div>
// //                     <div className="flex items-center gap-3 text-sm text-slate-600">
// //                       <Shield className="w-4 h-4 text-violet-500" />
// //                       <span>Secure the vehicle</span>
// //                     </div>
// //                   </div>
// //                 </div>
                
// //                 <button
// //                   onClick={handleCompleteTask}
// //                   className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold py-3.5 rounded-xl hover:shadow-lg hover:shadow-emerald-500/30 transition-all flex items-center justify-center gap-2"
// //                 >
// //                   <Camera className="w-5 h-5" />
// //                   Capture Photo & Complete Task
// //                 </button>
// //               </div>
// //             </div>
// //           ) : (
// //             <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center">
// //               <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
// //                 <Clock className="w-10 h-10 text-blue-600" />
// //               </div>
// //               <h3 className="text-lg font-semibold text-slate-800 mb-2">No Active Task</h3>
// //               <p className="text-slate-500 mb-6">Accept a request from the queue to start a mission</p>
// //               <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg">
// //                 <AlertCircle className="w-4 h-4" />
// //                 <span className="text-sm font-medium">Waiting for assignments</span>
// //               </div>
// //             </div>
// //           )}
// //         </div>

// //         {/* QUEUE */}
// //         <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
// //           <div className="border-b border-slate-200 p-6">
// //             <div className="flex items-center justify-between">
// //               <div>
// //                 <h3 className="text-lg font-semibold text-slate-800">Waiting Queue</h3>
// //                 <p className="text-sm text-slate-500">{queue.length} requests pending</p>
// //               </div>
// //               <button
// //                 onClick={fetchQueue}
// //                 className="p-2 hover:bg-slate-50 rounded-lg transition-colors"
// //               >
// //                 <RefreshCw className="w-4 h-4 text-slate-500" />
// //               </button>
// //             </div>
// //           </div>
          
// //           <div className="p-4">
// //             {queue.length === 0 ? (
// //               <div className="text-center py-12">
// //                 <div className="w-16 h-16 bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
// //                   <CheckCircle2 className="w-8 h-8 text-slate-400" />
// //                 </div>
// //                 <p className="text-slate-500 font-medium">All clear!</p>
// //                 <p className="text-sm text-slate-400 mt-1">No pending requests</p>
// //               </div>
// //             ) : (
// //               <div className="space-y-3">
// //                 {queue.map((booking) => (
// //                   <div 
// //                     key={booking.id} 
// //                     className="bg-slate-50 rounded-xl p-4 hover:bg-slate-100 transition-colors group"
// //                   >
// //                     <div className="flex items-center justify-between mb-3">
// //                       <div className="flex items-center gap-3">
// //                         <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg flex items-center justify-center">
// //                           <Car className="w-5 h-5 text-blue-600" />
// //                         </div>
// //                         <div>
// //                           <p className="font-medium text-slate-800">{booking.user?.name || "Guest"}</p>
// //                           <p className="text-xs text-slate-500">ID: #{booking.id}</p>
// //                         </div>
// //                       </div>
// //                       <span className="text-xs font-medium px-2 py-1 bg-amber-100 text-amber-700 rounded-full">
// //                         Waiting
// //                       </span>
// //                     </div>
                    
// //                     <div className="text-sm text-slate-600 mb-4">
// //                       <p className="mb-1"><strong>Vehicle:</strong> {booking.vehicleNumber}</p>
// //                       <p><strong>Model:</strong> {booking.vehicleModel || "N/A"}</p>
// //                     </div>
                    
// //                     <button
// //                       onClick={() => handleAccept(booking)}
// //                       disabled={!!activeTask}
// //                       className={`w-full py-2.5 rounded-lg font-medium transition-all ${
// //                         activeTask
// //                           ? "bg-slate-100 text-slate-400 cursor-not-allowed"
// //                           : "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-lg hover:shadow-blue-500/30"
// //                       }`}
// //                     >
// //                       {activeTask ? "Complete Current Task First" : "Accept Request"}
// //                     </button>
// //                   </div>
// //                 ))}
// //               </div>
// //             )}
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // export default ValetDashboard;

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
//   Zap,
//   Upload,
//   X,
//   Loader2
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
  
//   // 🆕 NEW STATES FOR COMPLETION
//   const [showCompleteModal, setShowCompleteModal] = useState(false);
//   const [completionData, setCompletionData] = useState({
//     lat: null,
//     lng: null,
//     images: [] // Stores the actual File objects
//   });
//   const [imagePreviews, setImagePreviews] = useState([]); // Stores URLs for preview
//   const [submitting, setSubmitting] = useState(false);

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
//       const config = getAuthConfig();
//       if (config) {
//          await axios.post("http://localhost:https://smartparking-backend-1.onrender.com/api/auth/logout", {}, config);
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
//       const res = await axios.get("http://localhost:https://smartparking-backend-1.onrender.com/api/bookings/valet/queue", config);
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
//     if (!config) return;

//     try {
//       await axios.post(
//         `http://localhost:https://smartparking-backend-1.onrender.com/api/bookings/${booking.id}/pickup`, 
//         {}, 
//         config
//       );
//       setActiveTask(booking);
//       fetchQueue();
//     } catch (err) {
//       alert("Error accepting task.");
//     }
//   };

//   // 📍 1. GET CURRENT GPS LOCATION
//   const handleGetLocation = () => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           setCompletionData(prev => ({
//             ...prev,
//             lat: position.coords.latitude,
//             lng: position.coords.longitude
//           }));
//         },
//         (error) => alert("Could not fetch location. Please enable GPS."),
//         { enableHighAccuracy: true }
//       );
//     } else {
//       alert("Geolocation is not supported by this browser.");
//     }
//   };

//   // 📸 2. HANDLE IMAGE SELECTION (MULTIPLE)
//   const handleImageChange = (e) => {
//     const files = Array.from(e.target.files);
//     if (files.length > 0) {
//       // Update File Objects
//       setCompletionData(prev => ({
//         ...prev,
//         images: [...prev.images, ...files]
//       }));

//       // Generate Previews
//       const newPreviews = files.map(file => URL.createObjectURL(file));
//       setImagePreviews(prev => [...prev, ...newPreviews]);
//     }
//   };

//   // ❌ REMOVE IMAGE
//   const removeImage = (index) => {
//     setCompletionData(prev => ({
//       ...prev,
//       images: prev.images.filter((_, i) => i !== index)
//     }));
//     setImagePreviews(prev => prev.filter((_, i) => i !== index));
//   };

//   // 🚀 3. SUBMIT COMPLETION DATA
//   const handleSubmitCompletion = async () => {
//     if (!completionData.lat || !completionData.lng) {
//       alert("Please tag the parking location first!");
//       return;
//     }
//     if (completionData.images.length === 0) {
//       if(!window.confirm("No proof images uploaded. Continue?")) return;
//     }

//     setSubmitting(true);
//     const config = getAuthConfig();

//     try {
//       // ✅ Create FormData for multipart upload
//       const formData = new FormData();
//       formData.append("parkedLat", completionData.lat);
//       formData.append("parkedLng", completionData.lng);
      
//       // Append all images
//       completionData.images.forEach((image) => {
//         formData.append("files", image);
//       });

//       // You might need to adjust the endpoint based on your BookingController
//       // Typically: /api/bookings/{id}/complete or /checkin
//       await axios.post(
//         `http://localhost:https://smartparking-backend-1.onrender.com/api/bookings/${activeTask.id}/complete`, 
//         formData, 
//         {
//           ...config,
//           headers: {
//             ...config.headers,
//             "Content-Type": "multipart/form-data" // Crucial for files
//           }
//         }
//       );

//       alert("✅ Vehicle Parked Successfully!");
//       setActiveTask(null);
//       setShowCompleteModal(false);
//       setCompletionData({ lat: null, lng: null, images: [] });
//       setImagePreviews([]);
//       fetchQueue();

//     } catch (err) {
//       console.error("Completion Error:", err);
//       alert("Failed to submit data. Check server logs.");
//     } finally {
//       setSubmitting(false);
//     }
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
//           </div>
          
//           <button
//             onClick={handleLogout}
//             className="inline-flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-rose-500 to-pink-600 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-rose-500/30 transition-all"
//           >
//             Logout
//           </button>
//         </div>
//       </div>

//       {/* STATS (Existing code) */}
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
//                 {/* Vehicle & User Info (Existing) */}
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
                
//                 {/* 📝 COMPLETION FORM (Replaces Instructions when activated) */}
//                 {!showCompleteModal ? (
//                   <div className="space-y-4">
//                     <div className="mb-6">
//                       <h4 className="text-sm font-medium text-slate-700 mb-3">Instructions</h4>
//                       <div className="space-y-3">
//                         <div className="flex items-center gap-3 text-sm text-slate-600">
//                           <MapPin className="w-4 h-4 text-blue-500" />
//                           <span>Navigate to customer location</span>
//                         </div>
//                         <div className="flex items-center gap-3 text-sm text-slate-600">
//                           <Shield className="w-4 h-4 text-violet-500" />
//                           <span>Park vehicle in designated spot</span>
//                         </div>
//                       </div>
//                     </div>
                    
//                     <button
//                       onClick={() => setShowCompleteModal(true)}
//                       className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold py-3.5 rounded-xl hover:shadow-lg hover:shadow-emerald-500/30 transition-all flex items-center justify-center gap-2"
//                     >
//                       <CheckCircle2 className="w-5 h-5" />
//                       Complete Task
//                     </button>
//                   </div>
//                 ) : (
//                   <div className="bg-slate-50 rounded-xl p-6 border border-slate-200 animate-in fade-in slide-in-from-bottom-4">
//                     <div className="flex justify-between items-center mb-4">
//                       <h4 className="font-bold text-slate-800">Finalize Parking</h4>
//                       <button onClick={() => setShowCompleteModal(false)} className="text-slate-400 hover:text-slate-600">
//                         <X className="w-5 h-5" />
//                       </button>
//                     </div>

//                     {/* 📍 1. LOCATION PICKER */}
//                     <div className="mb-6">
//                       <label className="block text-xs font-bold uppercase text-slate-500 mb-2">1. Tag Location</label>
//                       <div className="flex items-center gap-3">
//                         <button
//                           onClick={handleGetLocation}
//                           className="flex-1 bg-white border border-slate-300 text-slate-700 font-medium py-3 rounded-xl hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
//                         >
//                           <MapPin className="w-4 h-4 text-rose-500" />
//                           {completionData.lat ? "Update Location" : "Get Current Location"}
//                         </button>
//                         {completionData.lat && (
//                           <div className="bg-emerald-100 text-emerald-700 px-3 py-3 rounded-xl">
//                             <CheckCircle2 className="w-5 h-5" />
//                           </div>
//                         )}
//                       </div>
//                       {completionData.lat && (
//                         <p className="text-xs text-slate-500 mt-2 ml-1">
//                           📍 Coordinates: {completionData.lat.toFixed(4)}, {completionData.lng.toFixed(4)}
//                         </p>
//                       )}
//                     </div>

//                     {/* 📸 2. IMAGE UPLOAD */}
//                     <div className="mb-6">
//                       <label className="block text-xs font-bold uppercase text-slate-500 mb-2">2. Upload Proof</label>
//                       <div className="grid grid-cols-4 gap-2 mb-3">
//                         {/* Preview Images */}
//                         {imagePreviews.map((src, index) => (
//                           <div key={index} className="relative aspect-square rounded-lg overflow-hidden border border-slate-200 group">
//                             <img src={src} alt="proof" className="w-full h-full object-cover" />
//                             <button
//                               onClick={() => removeImage(index)}
//                               className="absolute top-1 right-1 bg-black/50 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-all"
//                             >
//                               <X className="w-3 h-3" />
//                             </button>
//                           </div>
//                         ))}
                        
//                         {/* Upload Button */}
//                         <label className="aspect-square rounded-lg border-2 border-dashed border-slate-300 hover:border-blue-500 hover:bg-blue-50 transition-all flex flex-col items-center justify-center cursor-pointer text-slate-400 hover:text-blue-500">
//                           <Upload className="w-6 h-6 mb-1" />
//                           <span className="text-[10px] font-bold">ADD</span>
//                           <input 
//                             type="file" 
//                             multiple 
//                             accept="image/*" 
//                             className="hidden" 
//                             onChange={handleImageChange}
//                           />
//                         </label>
//                       </div>
//                     </div>

//                     {/* 🚀 SUBMIT */}
//                     <button
//                       onClick={handleSubmitCompletion}
//                       disabled={submitting}
//                       className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold py-3.5 rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
//                     >
//                       {submitting ? (
//                         <>
//                           <Loader2 className="w-5 h-5 animate-spin" />
//                           Saving...
//                         </>
//                       ) : (
//                         "Submit & Finish"
//                       )}
//                     </button>
//                   </div>
//                 )}
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

//         {/* QUEUE SIDEBAR (Existing Code) */}
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
  AlertCircle, Camera, CheckCircle2, Clock, Car, DollarSign,
  MapPin, Navigation, RefreshCw, Shield, Star, User, Zap,
  Upload, X, Loader2, LogOut
} from "lucide-react";

/* ─── Design Tokens ──────────────────────────────────────────────── */
const C = {
  bg:       "#020308",
  surface:  "#0B0D17",
  card:     "#0F1220",
  border:   "rgba(255,255,255,0.07)",
  accent:   "#B8FF57",
  accentDim:"rgba(184,255,87,0.12)",
  blue:     "#4B9EFF",
  blueDim:  "rgba(75,158,255,0.12)",
  red:      "#FF6B6B",
  redDim:   "rgba(255,107,107,0.12)",
  amber:    "#FFB347",
  amberDim: "rgba(255,179,71,0.12)",
  green:    "#4ADE80",
  greenDim: "rgba(74,222,128,0.12)",
  purple:   "#C084FC",
  purpleDim:"rgba(192,132,252,0.12)",
  text:     "#F0F4FF",
  muted:    "#6B7594",
  white:    "#FFFFFF",
};

const G = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');
  *, *::before, *::after { box-sizing:border-box; }
  .vd-root { font-family:'DM Sans',sans-serif; background:${C.bg}; color:${C.text}; min-height:100vh; }
  .df { font-family:'Syne',sans-serif; }
  .grid-bg { position:fixed;inset:0;pointer-events:none;z-index:0;
    background-image:linear-gradient(rgba(255,255,255,0.02) 1px,transparent 1px),
      linear-gradient(90deg,rgba(255,255,255,0.02) 1px,transparent 1px);
    background-size:60px 60px; }
  .orb-a { position:fixed;width:500px;height:500px;border-radius:50%;
    background:radial-gradient(circle,rgba(184,255,87,0.08) 0%,transparent 70%);
    filter:blur(120px);pointer-events:none;z-index:0;top:-120px;right:-80px;
    animation:orbF 10s ease-in-out infinite alternate; }
  .orb-b { position:fixed;width:400px;height:400px;border-radius:50%;
    background:radial-gradient(circle,rgba(75,158,255,0.07) 0%,transparent 70%);
    filter:blur(100px);pointer-events:none;z-index:0;bottom:-60px;left:-80px;
    animation:orbF 14s ease-in-out infinite alternate-reverse; }
  @keyframes orbF { from{transform:translate(0,0) scale(1);} to{transform:translate(20px,28px) scale(1.05);} }
  @keyframes spin { from{transform:rotate(0deg);} to{transform:rotate(360deg);} }
  @keyframes pulse { 0%,100%{opacity:1;} 50%{opacity:.4;} }
  .vd-content { position:relative;z-index:1;padding:28px 32px;max-width:1300px;margin:0 auto; }
  .dark-card { background:${C.card};border:1px solid ${C.border};border-radius:20px;overflow:hidden; }
  .stat-card { background:${C.card};border:1px solid ${C.border};border-radius:16px;padding:22px 24px; }
  .queue-item { background:${C.surface};border:1px solid ${C.border};border-radius:14px;padding:16px;
    transition:border-color .2s; }
  .queue-item:hover { border-color:rgba(184,255,87,0.15); }
  .icon-box { width:40px;height:40px;border-radius:12px;display:flex;align-items:center;justify-content:center;flex-shrink:0; }
  .btn-primary { display:inline-flex;align-items:center;gap:8px;padding:13px 24px;
    border-radius:12px;font-weight:700;font-size:14px;font-family:'Syne',sans-serif;
    background:${C.accent};color:${C.bg};border:none;cursor:pointer;transition:all .25s; }
  .btn-primary:hover:not(:disabled) { background:#cbff6e;box-shadow:0 0 28px rgba(184,255,87,.35);transform:translateY(-1px); }
  .btn-primary:disabled { opacity:.5;cursor:not-allowed; }
  .btn-green { display:inline-flex;align-items:center;gap:8px;padding:13px 24px;
    border-radius:12px;font-weight:700;font-size:14px;font-family:'Syne',sans-serif;
    background:${C.greenDim};color:${C.green};border:1px solid rgba(74,222,128,0.2);cursor:pointer;transition:all .25s; }
  .btn-green:hover { background:rgba(74,222,128,0.2);box-shadow:0 0 24px rgba(74,222,128,.12); }
  .btn-ghost { display:inline-flex;align-items:center;gap:8px;padding:10px 18px;
    border-radius:11px;font-weight:500;font-size:13px;background:transparent;
    color:${C.muted};border:1px solid ${C.border};cursor:pointer;transition:all .25s; }
  .btn-ghost:hover { border-color:rgba(255,255,255,.15);color:${C.text}; }
  .btn-danger { display:inline-flex;align-items:center;gap:8px;padding:10px 18px;
    border-radius:11px;font-weight:600;font-size:13px;font-family:'Syne',sans-serif;
    background:${C.redDim};color:${C.red};border:1px solid rgba(255,107,107,0.2);cursor:pointer;transition:all .25s; }
  .btn-danger:hover { background:rgba(255,107,107,0.2); }
  .btn-blue { display:flex;align-items:center;justify-content:center;gap:8px;padding:12px 20px;
    border-radius:12px;font-weight:700;font-size:14px;font-family:'Syne',sans-serif;
    background:${C.blueDim};color:${C.blue};border:1px solid rgba(75,158,255,0.2);cursor:pointer;transition:all .25s; }
  .btn-blue:hover { background:rgba(75,158,255,0.2); }
  .btn-accept { width:100%;padding:11px;border-radius:11px;font-weight:700;font-size:13px;
    font-family:'Syne',sans-serif;border:none;cursor:pointer;transition:all .25s; }
  .upload-zone { aspect-ratio:1;border-radius:10px;border:2px dashed ${C.border};
    display:flex;flex-direction:column;align-items:center;justify-content:center;
    cursor:pointer;transition:all .25s;color:${C.muted}; }
  .upload-zone:hover { border-color:rgba(184,255,87,0.35);color:${C.accent}; }
  .loc-label { font-size:11px;font-weight:700;color:${C.muted};text-transform:uppercase;
    letter-spacing:.07em;font-family:'Syne',sans-serif;margin-bottom:10px;display:block; }
  .mission-banner { background:linear-gradient(135deg,rgba(184,255,87,0.1) 0%,rgba(75,158,255,0.08) 100%);
    border-bottom:1px solid rgba(184,255,87,0.1);padding:20px 24px; }
  .live-dot { width:8px;height:8px;border-radius:50%;background:${C.accent};
    display:inline-block;box-shadow:0 0 8px ${C.accent};animation:pulse 2s infinite; }
  ::-webkit-scrollbar{width:4px;height:4px;}
  ::-webkit-scrollbar-track{background:${C.bg};}
  ::-webkit-scrollbar-thumb{background:rgba(184,255,87,.12);border-radius:2px;}
`;

/* ─── Main ValetDashboard ────────────────────────────────────────── */
function ValetDashboard() {
  const [queue, setQueue] = useState([]);
  const [activeTask, setActiveTask] = useState(null);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({ completed: 0, rating: 4.8, earnings: 0 });
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const [completionData, setCompletionData] = useState({ lat: null, lng: null, images: [] });
  const [imagePreviews, setImagePreviews] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  /* ── All original logic unchanged ── */
  const getAuthConfig = () => {
    const token = localStorage.getItem("token");
    if (!token) return null;
    return { headers: { Authorization: `Bearer ${token}` }, withCredentials: true };
  };

  const handleLogout = async () => {
    try {
      const config = getAuthConfig();
      if (config) await axios.post("https://smartparking-backend-1.onrender.com/api/auth/logout", {}, config);
    } catch (error) { console.error("Logout failed", error); }
    finally { localStorage.clear(); navigate("/"); }
  };

  const fetchQueue = async () => {
    const config = getAuthConfig();
    if (!config) { navigate("/login"); return; }
    try {
      const res = await axios.get("https://smartparking-backend-1.onrender.com/api/bookings/valet/queue", config);
      setQueue(res.data);
    } catch (err) {
      console.error("Fetch Queue Error:", err);
      if (err.response?.status === 401) { localStorage.clear(); navigate("/login"); }
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
      await axios.post(`https://smartparking-backend-1.onrender.com/api/bookings/${booking.id}/pickup`, {}, config);
      setActiveTask(booking);
      fetchQueue();
    } catch { alert("Error accepting task."); }
  };

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => setCompletionData(prev => ({ ...prev, lat: position.coords.latitude, lng: position.coords.longitude })),
        () => alert("Could not fetch location. Please enable GPS."),
        { enableHighAccuracy: true }
      );
    } else { alert("Geolocation is not supported by this browser."); }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      setCompletionData(prev => ({ ...prev, images: [...prev.images, ...files] }));
      setImagePreviews(prev => [...prev, ...files.map(f => URL.createObjectURL(f))]);
    }
  };

  const removeImage = (index) => {
    setCompletionData(prev => ({ ...prev, images: prev.images.filter((_, i) => i !== index) }));
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmitCompletion = async () => {
    if (!completionData.lat || !completionData.lng) { alert("Please tag the parking location first!"); return; }
    if (completionData.images.length === 0) { if (!window.confirm("No proof images uploaded. Continue?")) return; }
    setSubmitting(true);
    const config = getAuthConfig();
    try {
      const formData = new FormData();
      formData.append("parkedLat", completionData.lat);
      formData.append("parkedLng", completionData.lng);
      completionData.images.forEach(img => formData.append("files", img));
      await axios.post(`https://smartparking-backend-1.onrender.com/api/bookings/${activeTask.id}/complete`, formData, {
        ...config, headers: { ...config.headers, "Content-Type": "multipart/form-data" }
      });
      alert("✅ Vehicle Parked Successfully!");
      setActiveTask(null); setShowCompleteModal(false);
      setCompletionData({ lat: null, lng: null, images: [] }); setImagePreviews([]);
      fetchQueue();
    } catch (err) {
      console.error("Completion Error:", err);
      alert("Failed to submit data. Check server logs.");
    } finally { setSubmitting(false); }
  };

  const statItems = [
    { label: "Completed", value: stats.completed, icon: <CheckCircle2 size={20}/>, color: C.green, dim: C.greenDim },
    { label: "Rating", value: `${stats.rating}/5`, icon: <Star size={20}/>, color: C.amber, dim: C.amberDim },
    { label: "Earnings", value: `₹${stats.earnings}`, icon: <DollarSign size={20}/>, color: C.purple, dim: C.purpleDim },
  ];

  return (
    <>
      <style>{G}</style>
      <div className="vd-root">
        <div className="grid-bg"/><div className="orb-a"/><div className="orb-b"/>
        <div className="vd-content">

          {/* ─── HEADER ─── */}
          <div style={{ display:"flex", flexWrap:"wrap", alignItems:"flex-start", justifyContent:"space-between", gap:20, marginBottom:28 }}>
            <div>
              <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:10 }}>
                <div style={{ padding:"6px 12px", background:C.accentDim, border:`1px solid rgba(184,255,87,0.2)`, borderRadius:8, display:"flex", alignItems:"center", gap:6 }}>
                  <Navigation size={13} color={C.accent}/>
                  <span className="df" style={{ fontSize:11, fontWeight:700, color:C.accent, textTransform:"uppercase", letterSpacing:".08em" }}>Valet Console</span>
                </div>
                <button onClick={fetchQueue} disabled={loading}
                  style={{ width:32, height:32, borderRadius:8, background:C.surface, border:`1px solid ${C.border}`, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", transition:"all .2s" }}>
                  <RefreshCw size={14} color={C.muted} style={{ animation: loading ? "spin 1s linear infinite" : "none" }}/>
                </button>
              </div>
              <h1 className="df" style={{ fontSize:"clamp(24px,3.5vw,38px)", fontWeight:800, color:C.white, letterSpacing:"-0.04em", marginBottom:6 }}>
                Valet <span style={{ color:C.accent }}>Operations</span>
              </h1>
              <p style={{ fontSize:14, color:C.muted }}>Manage valet requests and parking operations</p>
            </div>
            <button className="btn-danger" onClick={handleLogout}><LogOut size={14}/> Logout</button>
          </div>

          {/* ─── STAT CARDS ─── */}
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(180px,1fr))", gap:14, marginBottom:28 }}>
            {statItems.map(s => (
              <div key={s.label} className="stat-card">
                <div style={{ display:"flex", alignItems:"center", gap:14 }}>
                  <div style={{ width:44, height:44, borderRadius:13, background:s.dim, border:`1px solid ${s.color}28`, display:"flex", alignItems:"center", justifyContent:"center", color:s.color }}>
                    {s.icon}
                  </div>
                  <div>
                    <p style={{ fontSize:12, color:C.muted, marginBottom:4 }}>{s.label}</p>
                    <p className="df" style={{ fontSize:22, fontWeight:800, color:C.white, letterSpacing:"-0.03em", lineHeight:1 }}>{s.value}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ─── MAIN GRID ─── */}
          <div style={{ display:"grid", gridTemplateColumns:"2fr 1fr", gap:20 }}>

            {/* ─── ACTIVE TASK ─── */}
            <div>
              {activeTask ? (
                <div className="dark-card">
                  {/* Mission Banner */}
                  <div className="mission-banner">
                    <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                      <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                        <div style={{ width:44, height:44, borderRadius:13, background:C.accentDim, display:"flex", alignItems:"center", justifyContent:"center" }}>
                          <Navigation size={20} color={C.accent}/>
                        </div>
                        <div>
                          <h3 className="df" style={{ fontSize:18, fontWeight:800, color:C.white, letterSpacing:"-0.02em" }}>Active Mission</h3>
                          <p style={{ fontSize:13, color:C.muted }}>Complete the parking process</p>
                        </div>
                      </div>
                      <div style={{ display:"flex", alignItems:"center", gap:6, padding:"6px 14px", background:C.accentDim, border:`1px solid rgba(184,255,87,0.2)`, borderRadius:100 }}>
                        <span className="live-dot"/>
                        <span className="df" style={{ fontSize:12, fontWeight:700, color:C.accent }}>In Progress</span>
                      </div>
                    </div>
                  </div>

                  <div style={{ padding:24 }}>
                    {/* Customer + Vehicle Info */}
                    <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14, marginBottom:24 }}>
                      {[
                        { label:"Customer", value:activeTask.user?.name || "Guest", sub:activeTask.contactNumber || "N/A", icon:<User size={16}/>, color:C.blue, dim:C.blueDim },
                        { label:"Vehicle", value:activeTask.vehicleNumber, sub:activeTask.vehicleModel || "Model: N/A", icon:<Car size={16}/>, color:C.accent, dim:C.accentDim },
                      ].map(card => (
                        <div key={card.label} style={{ background:C.surface, border:`1px solid ${C.border}`, borderRadius:14, padding:"16px 18px" }}>
                          <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:12 }}>
                            <div style={{ width:34, height:34, borderRadius:10, background:card.dim, display:"flex", alignItems:"center", justifyContent:"center", color:card.color }}>{card.icon}</div>
                            <div>
                              <p style={{ fontSize:11, color:C.muted }}>{card.label}</p>
                              <p className="df" style={{ fontSize:15, fontWeight:700, color:C.white, letterSpacing:"-0.02em" }}>{card.value}</p>
                            </div>
                          </div>
                          <p style={{ fontSize:12, color:C.muted }}>{card.sub}</p>
                        </div>
                      ))}
                    </div>

                    {/* Instructions / Completion Form */}
                    {!showCompleteModal ? (
                      <div>
                        <p className="df" style={{ fontSize:13, fontWeight:700, color:C.muted, textTransform:"uppercase", letterSpacing:".06em", marginBottom:14 }}>Instructions</p>
                        <div style={{ display:"flex", flexDirection:"column", gap:10, marginBottom:24 }}>
                          {[
                            { icon:<MapPin size={16}/>, color:C.blue, text:"Navigate to customer location" },
                            { icon:<Shield size={16}/>, color:"#C084FC", text:"Park vehicle in designated spot" },
                          ].map((step, i) => (
                            <div key={i} style={{ display:"flex", alignItems:"center", gap:12, padding:"12px 16px", background:C.surface, border:`1px solid ${C.border}`, borderRadius:12 }}>
                              <div style={{ width:32, height:32, borderRadius:9, background:`${step.color}18`, display:"flex", alignItems:"center", justifyContent:"center", color:step.color }}>
                                {step.icon}
                              </div>
                              <span style={{ fontSize:14, color:C.muted }}>{step.text}</span>
                            </div>
                          ))}
                        </div>
                        <button className="btn-green" onClick={() => setShowCompleteModal(true)} style={{ width:"100%", justifyContent:"center" }}>
                          <CheckCircle2 size={18}/> Complete Task
                        </button>
                      </div>
                    ) : (
                      /* ─── Completion Form ─── */
                      <div style={{ background:C.surface, border:`1px solid ${C.border}`, borderRadius:16, padding:20 }}>
                        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:20 }}>
                          <h4 className="df" style={{ fontSize:16, fontWeight:700, color:C.white }}>Finalize Parking</h4>
                          <button onClick={() => setShowCompleteModal(false)}
                            style={{ width:32, height:32, borderRadius:8, background:C.redDim, border:`1px solid rgba(255,107,107,0.2)`, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer" }}>
                            <X size={14} color={C.red}/>
                          </button>
                        </div>

                        {/* Location */}
                        <div style={{ marginBottom:20 }}>
                          <span className="loc-label">1. Tag Location</span>
                          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                            <button className="btn-ghost" onClick={handleGetLocation} style={{ flex:1, justifyContent:"center" }}>
                              <MapPin size={14} color={C.red}/> {completionData.lat ? "Update Location" : "Get Current Location"}
                            </button>
                            {completionData.lat && (
                              <div style={{ width:40, height:40, borderRadius:11, background:C.greenDim, border:`1px solid rgba(74,222,128,0.2)`, display:"flex", alignItems:"center", justifyContent:"center" }}>
                                <CheckCircle2 size={18} color={C.green}/>
                              </div>
                            )}
                          </div>
                          {completionData.lat && (
                            <p style={{ fontSize:12, color:C.muted, marginTop:8 }}>📍 {completionData.lat.toFixed(4)}, {completionData.lng.toFixed(4)}</p>
                          )}
                        </div>

                        {/* Image Upload */}
                        <div style={{ marginBottom:20 }}>
                          <span className="loc-label">2. Upload Proof</span>
                          <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:8 }}>
                            {imagePreviews.map((src, i) => (
                              <div key={i} style={{ position:"relative", aspectRatio:"1", borderRadius:10, overflow:"hidden", border:`1px solid ${C.border}` }}>
                                <img src={src} alt="proof" style={{ width:"100%", height:"100%", objectFit:"cover" }}/>
                                <button onClick={() => removeImage(i)}
                                  style={{ position:"absolute", top:4, right:4, width:22, height:22, borderRadius:"50%", background:"rgba(0,0,0,0.7)", border:"none", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer" }}>
                                  <X size={11} color="#fff"/>
                                </button>
                              </div>
                            ))}
                            <label className="upload-zone" style={{ aspectRatio:"1" }}>
                              <Upload size={20}/>
                              <span style={{ fontSize:10, fontWeight:700, marginTop:4 }}>ADD</span>
                              <input type="file" multiple accept="image/*" style={{ display:"none" }} onChange={handleImageChange}/>
                            </label>
                          </div>
                        </div>

                        {/* Submit */}
                        <button onClick={handleSubmitCompletion} disabled={submitting}
                          className="btn-primary" style={{ width:"100%", justifyContent:"center" }}>
                          {submitting ? <><Loader2 size={16} style={{ animation:"spin 1s linear infinite" }}/> Saving...</> : "Submit & Finish"}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                /* ─── No Active Task ─── */
                <div className="dark-card" style={{ padding:40, textAlign:"center" }}>
                  <div style={{ width:72, height:72, borderRadius:20, background:C.blueDim, display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 20px" }}>
                    <Clock size={32} color={C.blue}/>
                  </div>
                  <h3 className="df" style={{ fontSize:20, fontWeight:800, color:C.white, letterSpacing:"-0.03em", marginBottom:8 }}>No Active Task</h3>
                  <p style={{ fontSize:14, color:C.muted, marginBottom:24 }}>Accept a request from the queue to start a mission</p>
                  <div style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"10px 18px", background:C.accentDim, border:`1px solid rgba(184,255,87,0.2)`, borderRadius:100 }}>
                    <span className="live-dot"/>
                    <span style={{ fontSize:13, fontWeight:600, color:C.accent }}>Waiting for assignments</span>
                  </div>
                </div>
              )}
            </div>

            {/* ─── QUEUE SIDEBAR ─── */}
            <div className="dark-card">
              <div style={{ padding:"20px 20px 16px", borderBottom:`1px solid ${C.border}`, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                <div>
                  <h3 className="df" style={{ fontSize:16, fontWeight:700, color:C.white, letterSpacing:"-0.02em" }}>Waiting Queue</h3>
                  <p style={{ fontSize:12, color:C.muted, marginTop:2 }}>
                    {queue.length > 0 ? (
                      <><span style={{ color:C.amber, fontWeight:700 }}>{queue.length}</span> requests pending</>
                    ) : "No pending requests"}
                  </p>
                </div>
                <button onClick={fetchQueue}
                  style={{ width:34, height:34, borderRadius:10, background:C.surface, border:`1px solid ${C.border}`, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", transition:"all .2s" }}>
                  <RefreshCw size={14} color={C.muted}/>
                </button>
              </div>

              <div style={{ padding:16 }}>
                {queue.length === 0 ? (
                  <div style={{ textAlign:"center", padding:"40px 16px" }}>
                    <div style={{ width:56, height:56, borderRadius:16, background:C.accentDim, display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 16px" }}>
                      <CheckCircle2 size={24} color={C.accent}/>
                    </div>
                    <p className="df" style={{ fontSize:15, fontWeight:700, color:C.white, marginBottom:4 }}>All clear!</p>
                    <p style={{ fontSize:13, color:C.muted }}>No pending requests</p>
                  </div>
                ) : (
                  <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                    {queue.map(booking => (
                      <div key={booking.id} className="queue-item">
                        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:12 }}>
                          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                            <div className="icon-box" style={{ background:C.blueDim }}><Car size={16} color={C.blue}/></div>
                            <div>
                              <p style={{ fontSize:14, fontWeight:600, color:C.text }}>{booking.user?.name || "Guest"}</p>
                              <p style={{ fontSize:11, color:C.muted }}>#{booking.id}</p>
                            </div>
                          </div>
                          <span style={{ padding:"4px 10px", borderRadius:100, fontSize:10, fontWeight:700, background:C.amberDim, color:C.amber, fontFamily:"Syne,sans-serif" }}>Waiting</span>
                        </div>
                        <div style={{ marginBottom:12, display:"flex", flexDirection:"column", gap:4 }}>
                          <p style={{ fontSize:13, color:C.muted }}><strong style={{ color:C.text }}>Vehicle:</strong> {booking.vehicleNumber}</p>
                          <p style={{ fontSize:13, color:C.muted }}><strong style={{ color:C.text }}>Model:</strong> {booking.vehicleModel || "N/A"}</p>
                        </div>
                        <button onClick={() => handleAccept(booking)} disabled={!!activeTask}
                          className="btn-accept"
                          style={{
                            background: activeTask ? "rgba(107,117,148,0.1)" : C.accentDim,
                            color: activeTask ? C.muted : C.accent,
                            border: `1px solid ${activeTask ? C.border : "rgba(184,255,87,0.2)"}`,
                            cursor: activeTask ? "not-allowed" : "pointer",
                          }}>
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
      </div>
    </>
  );
}

export default ValetDashboard;