// // import { useEffect, useState, useCallback } from "react";
// // import axios from "axios";
// // import { useNavigate } from "react-router-dom";
// // import jsPDF from "jspdf";
// // import {
// //   Car,
// //   Clock,
// //   CreditCard,
// //   MapPin,
// //   Navigation,
// //   Shield,
// //   Zap,
// //   Search,
// //   CalendarCheck,
// //   Star,
// //   ChevronRight,
// //   ArrowRight,
// //   User,
// //   Phone,
// //   TrendingUp,
// //   CheckCircle,
// //   Key // 👈 Added Key icon for OTPs
// // } from "lucide-react";
// // import UserNavbar from "../../components/navbar/UserNavbar";
// // import CustomMap from "../../components/map/MapContainer";
// // import ParkingLotBooking from "../../pages/parking/ParkingLotBooking";

// // /* ─────────────────────────────────────────────────────────────
// //    MAIN DASHBOARD
// // ───────────────────────────────────────────────────────────── */
// // function UserDashboard() {
// //   const [lots, setLots] = useState([]);
// //   const [mode, setMode] = useState(null);
// //   const [userId, setUserId] = useState(null);
// //   const [selectedLot, setSelectedLot] = useState(null);
// //   const [currentPosition, setCurrentPosition] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [hoveredLotId, setHoveredLotId] = useState(null);
// //   const [focusedLot, setFocusedLot] = useState(null); // Added state for map focus
// //   const [stats, setStats] = useState({ bookings: 0, hours: 0, savings: 0 });
// //   const [showProfileModal, setShowProfileModal] = useState(false);
// //   const [profileData, setProfileData] = useState({
// //     name: "",
// //     email: "",
// //     phoneNumber: "",
// //     password: "",
// //   });

// //   const navigate = useNavigate();

// //   /* PDF pay-slip */
// //   const generatePaySlip = (vehicleDetails) => {
// //     const doc = new jsPDF();
// //     const uniqueCode = `PRK-${userId}-${Date.now().toString().slice(-6)}`;
// //     doc.setFontSize(22);
// //     doc.setTextColor(37, 99, 235);
// //     doc.text("PARKING PAY SLIP", 105, 30, { align: "center" });
// //     doc.setFontSize(12);
// //     doc.setTextColor(100);
// //     doc.text(`Date: ${new Date().toLocaleString()}`, 20, 50);
// //     doc.text(`User ID: ${userId}`, 20, 60);
// //     doc.setDrawColor(200);
// //     doc.line(20, 65, 190, 65);
// //     doc.setFontSize(14);
// //     doc.setTextColor(0);
// //     doc.text("Vehicle Information", 20, 80);
// //     doc.setFontSize(12);
// //     doc.text(`Number: ${vehicleDetails.vehicleNumber}`, 20, 90);
// //     doc.text(`Model: ${vehicleDetails.vehicleModel}`, 20, 100);
// //     doc.text(`Contact: ${vehicleDetails.contactNumber}`, 20, 110);
// //     doc.setFillColor(248, 250, 252);
// //     doc.rect(20, 130, 170, 30, "F");
// //     doc.setFontSize(16);
// //     doc.setFont("helvetica", "bold");
// //     doc.text(`VERIFICATION CODE: ${uniqueCode}`, 105, 150, { align: "center" });
// //     doc.save(`ParkingSlip_${uniqueCode}.pdf`);
// //   };

// //   const calculateStats = useCallback(() => {
// //     setStats({ bookings: 12, hours: 36, savings: 240 });
// //   }, []);

// //   useEffect(() => {
// //     const fetchUserAndLots = async () => {
// //       setLoading(true);
// //       try {
// //         const token = localStorage.getItem("token");
// //         if (!token || token === "undefined" || token === "null") {
// //           navigate("/login");
// //           return;
// //         }
// //         const config = {
// //           headers: { Authorization: `Bearer ${token}` },
// //           withCredentials: true,
// //         };
// //         const [userRes, lotsRes] = await Promise.all([
// //           axios.get("http://localhost:8080/api/users/me", config),
// //           axios.get("http://localhost:8080/api/parking-lots", config),
// //         ]);
// //         if (userRes.data) {
// //           const userData = userRes.data;
// //           setUserId(userData.id);
// //           localStorage.setItem("userId", userData.id);
// //           if (!userData.phoneNumber) {
// //             setProfileData({
// //               name: userData.name || "",
// //               email: userData.email,
// //               phoneNumber: "",
// //               password: "",
// //             });
// //             setShowProfileModal(true);
// //           }
// //         }
// //         if (lotsRes.data) setLots(lotsRes.data);
// //         calculateStats();
// //       } catch (err) {
// //         if (err.response?.status === 401) {
// //           localStorage.removeItem("token");
// //           localStorage.removeItem("user");
// //           navigate("/login");
// //         }
// //       } finally {
// //         setLoading(false);
// //       }
// //     };
// //     fetchUserAndLots();

// //     if (navigator.geolocation) {
// //       navigator.geolocation.getCurrentPosition(
// //         (pos) =>
// //           setCurrentPosition({
// //             lat: pos.coords.latitude,
// //             lng: pos.coords.longitude,
// //           }),
// //         (err) => console.error("Location error:", err)
// //       );
// //     }
// //   }, [navigate, calculateStats]);

// //   const handleUpdateProfile = async (e) => {
// //     e.preventDefault();
// //     try {
// //       await axios.put(
// //         "http://localhost:8080/api/users/me",
// //         {
// //           name: profileData.name,
// //           phoneNumber: profileData.phoneNumber,
// //           password: profileData.password,
// //         },
// //         { withCredentials: true }
// //       );
// //       setShowProfileModal(true);
// //     } catch {
// //       alert("Failed to update profile. Please try again.");
// //     }
// //   };

// //   const openNavigation = (lot) => {
// //     if (!currentPosition) {
// //       alert("Getting your location...");
// //       return;
// //     }
// //     if (lot.latitude && lot.longitude) {
// //       const url = `https://www.google.com/maps/dir/?api=1&origin=${currentPosition.lat},${currentPosition.lng}&destination=${lot.latitude},${lot.longitude}&travelmode=driving`;
// //       window.open(url, "_blank");
// //     } else {
// //       alert("Parking lot location not available");
// //     }
// //   };

// //   if (loading) {
// //     return (
// //       <div style={styles.loadingWrapper}>
// //         <div style={styles.loadingInner}>
// //           <div style={styles.loadingLogo}>
// //             <Car size={28} color="#C8FF00" />
// //           </div>
// //           <p style={styles.loadingText}>Loading your dashboard…</p>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <>
// //       <style>{globalCSS}</style>

// //       {/* ── Profile completion modal ── */}
// //       {showProfileModal && (
// //         <div style={styles.modalBackdrop}>
// //           <div style={styles.modalCard} className="park-modal">
// //             <div style={styles.modalHeader}>
// //               <div style={styles.modalIconWrap}>
// //                 <User size={24} color="#C8FF00" />
// //               </div>
// //               <h2 style={styles.modalTitle}>Complete Your Profile</h2>
// //               <p style={styles.modalSubtitle}>
// //                 A few more details to unlock all features
// //               </p>
// //             </div>
// //             <form onSubmit={handleUpdateProfile} style={styles.modalForm}>
// //               <ParkInput
// //                 label="Full Name"
// //                 placeholder="John Doe"
// //                 value={profileData.name}
// //                 onChange={(e) =>
// //                   setProfileData({ ...profileData, name: e.target.value })
// //                 }
// //               />
// //               <ParkInput
// //                 label="Phone Number"
// //                 placeholder="+91 9876543210"
// //                 value={profileData.phoneNumber}
// //                 onChange={(e) =>
// //                   setProfileData({
// //                     ...profileData,
// //                     phoneNumber: e.target.value,
// //                   })
// //                 }
// //                 required
// //               />
// //               <ParkInput
// //                 label="Set a Password"
// //                 type="password"
// //                 placeholder="Min. 8 characters"
// //                 value={profileData.password}
// //                 onChange={(e) =>
// //                   setProfileData({ ...profileData, password: e.target.value })
// //                 }
// //               />
// //               <button type="submit" style={styles.limeBtn} className="lime-btn">
// //                 Save & Continue
// //                 <ArrowRight size={16} />
// //               </button>
// //             </form>
// //           </div>
// //         </div>
// //       )}

// //       {/* ── App shell ── */}
// //       <div style={styles.shell}>
// //         <UserNavbar />

// //         {/* ── HERO ── */}
// //         <section style={styles.hero}>
// //           <div style={styles.heroGlow} />
// //           <div style={styles.heroContent}>
// //             <span style={styles.heroPill}>
// //               <span style={styles.heroPillDot} />
// //               Live Dashboard
// //             </span>
// //             <h1 style={styles.heroTitle}>
// //               Park <span style={styles.heroAccent}>Smarter.</span>
// //             </h1>
// //             <p style={styles.heroSub}>
// //               Find a spot, book a slot, or call a valet — all in one place.
// //             </p>
// //           </div>

// //           <div style={styles.statsRow}>
// //             {[
// //               { label: "Total Bookings", value: stats.bookings, icon: <CalendarCheck size={18} color="#C8FF00" /> },
// //               { label: "Hours Parked", value: stats.hours, icon: <Clock size={18} color="#C8FF00" /> },
// //               { label: "Savings (₹)", value: stats.savings, icon: <TrendingUp size={18} color="#C8FF00" /> },
// //             ].map((s) => (
// //               <div key={s.label} style={styles.statCard} className="stat-card">
// //                 <div style={styles.statIcon}>{s.icon}</div>
// //                 <div>
// //                   <div style={styles.statValue}>{s.value}</div>
// //                   <div style={styles.statLabel}>{s.label}</div>
// //                 </div>
// //               </div>
// //             ))}
// //           </div>
// //         </section>

// //         {/* ── SERVICE SELECTOR ── */}
// //         {!mode && (
// //           <section style={styles.serviceSection}>
// //             <p style={styles.sectionLabel}>Choose a Service</p>
// //             <h2 style={styles.sectionTitle}>What do you need today?</h2>

// //             <div style={styles.serviceGrid}>
// //               <ServiceCard
// //                 icon={<Search size={28} />}
// //                 tag="Instant"
// //                 title="Self Parking"
// //                 description="Browse lots near you on a live map and navigate directly to an open spot."
// //                 accent="#C8FF00"
// //                 onClick={() => setMode("self")}
// //               />
// //               <ServiceCard
// //                 icon={<CalendarCheck size={28} />}
// //                 tag="Reserved"
// //                 title="Book a Slot"
// //                 description="Reserve a specific bay for your vehicle in advance and pay securely online."
// //                 accent="#00D4FF"
// //                 onClick={() => setMode("book")}
// //               />
// //               <ServiceCard
// //                 icon={<Zap size={28} />}
// //                 tag="Premium"
// //                 title="Valet Service"
// //                 description="A trained valet comes to you, parks and retrieves your vehicle on demand."
// //                 accent="#FF6B35"
// //                 onClick={() => setMode("valet")}
// //               />
// //             </div>
// //           </section>
// //         )}

// //         {/* ── ACTIVE MODE PANEL ── */}
// //         {mode && (
// //           <section style={styles.panelSection}>
// //             <button
// //               onClick={() => { setMode(null); setSelectedLot(null); setFocusedLot(null); }}
// //               style={styles.backBtn}
// //               className="back-btn"
// //             >
// //               ← Back to Services
// //             </button>

// //             {/* SELF PARKING */}
// //             {mode === "self" && (
// //               <div>
// //                 <PanelHeader
// //                   icon={<Search size={22} color="#C8FF00" />}
// //                   title="Self Parking"
// //                   subtitle="Tap a lot to get directions"
// //                   accent="#C8FF00"
// //                 />
// //                 <div style={styles.mapWrap}>
// //                   <CustomMap
// //                     lots={lots}
// //                     onSelectLot={(lot) => openNavigation(lot)}
// //                     hoveredLotId={hoveredLotId}
// //                     focusedLot={focusedLot}
// //                     center={focusedLot ? { lat: focusedLot.latitude, lng: focusedLot.longitude } : currentPosition}
// //                   />
// //                 </div>
// //                 {lots.length > 0 && (
// //                   <div style={styles.lotsGrid}>
// //                     {lots.map((lot) => (
// //                       <LotCard
// //                         key={lot.id}
// //                         lot={lot}
// //                         isHovered={hoveredLotId === lot.id}
// //                         onHover={() => {
// //                           setHoveredLotId(lot.id);
// //                           setFocusedLot(lot);
// //                         }}
// //                         onLeave={() => setHoveredLotId(null)}
// //                         onClick={() => setFocusedLot(lot)}
// //                         onNavigate={() => openNavigation(lot)}
// //                       />
// //                     ))}
// //                   </div>
// //                 )}
// //               </div>
// //             )}

// //             {/* BOOK A SLOT */}
// //             {mode === "book" && (
// //               <div>
// //                 <PanelHeader
// //                   icon={<CalendarCheck size={22} color="#00D4FF" />}
// //                   title="Book a Slot"
// //                   subtitle="Select a lot on the map or from the list below"
// //                   accent="#00D4FF"
// //                 />
// //                 {selectedLot ? (
// //                   <ParkingLotBooking
// //                     lot={selectedLot}
// //                     user={{ id: userId }}
// //                     onClose={() => setSelectedLot(null)}
// //                   />
// //                 ) : (
// //                   <>
// //                     <div style={styles.bookGrid}>
// //                       {/* Map column */}
// //                       <div style={styles.mapWrap}>
// //                         <CustomMap
// //                           lots={lots}
// //                           onSelectLot={(lot) => {
// //                             setSelectedLot(lot);
// //                             setFocusedLot(lot);
// //                           }}
// //                           hoveredLotId={hoveredLotId}
// //                           focusedLot={focusedLot}
// //                           center={focusedLot ? { lat: focusedLot.latitude, lng: focusedLot.longitude } : currentPosition}
// //                         />
// //                       </div>
// //                       {/* Lots list column */}
// //                       <div style={styles.bookList}>
// //                         {lots.map((lot) => (
// //                           <LotCard
// //                             key={lot.id}
// //                             lot={lot}
// //                             accent="#00D4FF"
// //                             actionLabel="Book Now"
// //                             isHovered={hoveredLotId === lot.id}
// //                             onHover={() => {
// //                               setHoveredLotId(lot.id);
// //                               setFocusedLot(lot);
// //                             }}
// //                             onLeave={() => setHoveredLotId(null)}
// //                             onClick={() => setFocusedLot(lot)}
// //                             onNavigate={() => setSelectedLot(lot)}
// //                           />
// //                         ))}
// //                       </div>
// //                     </div>
// //                   </>
// //                 )}
// //               </div>
// //             )}

// //             {/* VALET */}
// //             {mode === "valet" && (
// //               <div>
// //                 <PanelHeader
// //                   icon={<Zap size={22} color="#FF6B35" />}
// //                   title="Valet Service"
// //                   subtitle="Premium door-to-door parking"
// //                   accent="#FF6B35"
// //                 />
// //                 <ValetRequestPanel
// //                   userId={userId}
// //                   currentPosition={currentPosition}
// //                   onDownload={generatePaySlip}
// //                 />
// //               </div>
// //             )}
// //           </section>
// //         )}
// //       </div>
// //     </>
// //   );
// // }

// // /* ─────────────────────────────────────────────────────────────
// //    SERVICE CARD
// // ───────────────────────────────────────────────────────────── */
// // function ServiceCard({ icon, tag, title, description, accent, onClick }) {
// //   return (
// //     <button
// //       onClick={onClick}
// //       style={{ ...styles.svcCard, "--accent": accent }}
// //       className="svc-card"
// //     >
// //       <div style={{ ...styles.svcIconWrap, background: `${accent}18`, border: `1px solid ${accent}30` }}>
// //         <span style={{ color: accent }}>{icon}</span>
// //       </div>
// //       <span style={{ ...styles.svcTag, color: accent, background: `${accent}15` }}>{tag}</span>
// //       <h3 style={styles.svcTitle}>{title}</h3>
// //       <p style={styles.svcDesc}>{description}</p>
// //       <div style={{ ...styles.svcArrow, color: accent }} className="svc-arrow">
// //         <ChevronRight size={20} />
// //       </div>
// //     </button>
// //   );
// // }

// // /* ─────────────────────────────────────────────────────────────
// //    PANEL HEADER
// // ───────────────────────────────────────────────────────────── */
// // function PanelHeader({ icon, title, subtitle, accent }) {
// //   return (
// //     <div style={styles.panelHeader}>
// //       <div style={{ ...styles.panelIconWrap, background: `${accent}18`, border: `1px solid ${accent}30` }}>
// //         {icon}
// //       </div>
// //       <div>
// //         <h2 style={styles.panelTitle}>{title}</h2>
// //         <p style={styles.panelSub}>{subtitle}</p>
// //       </div>
// //     </div>
// //   );
// // }

// // /* ─────────────────────────────────────────────────────────────
// //    LOT CARD
// // ───────────────────────────────────────────────────────────── */
// // function LotCard({ lot, isHovered, onHover, onLeave, onClick, onNavigate, accent = "#C8FF00", actionLabel = "Navigate" }) {
// //   const available = lot.availableSpots ?? lot.capacity ?? "?";
// //   return (
// //     <div
// //       onClick={onClick}
// //       style={{
// //         ...styles.lotCard,
// //         ...(isHovered ? styles.lotCardHovered : {}),
// //         cursor: onClick ? "pointer" : "default"
// //       }}
// //       onMouseEnter={onHover}
// //       onMouseLeave={onLeave}
// //     >
// //       <div style={styles.lotCardTop}>
// //         <div style={styles.lotDot} />
// //         <span style={styles.lotAvail}>{available} spots</span>
// //       </div>
// //       <h4 style={styles.lotName}>{lot.name}</h4>
// //       <div style={styles.lotMeta}>
// //         <MapPin size={12} color="#666" />
// //         <span style={styles.lotAddr}>{lot.address || "Location on map"}</span>
// //       </div>
// //       {lot.pricePerHour && (
// //         <div style={styles.lotPrice}>
// //           ₹{lot.pricePerHour}
// //           <span style={styles.lotPriceUnit}>/hr</span>
// //         </div>
// //       )}
// //       <button
// //         onClick={(e) => {
// //           e.stopPropagation();
// //           onNavigate();
// //         }}
// //         style={{ ...styles.lotBtn, background: accent, color: accent === "#C8FF00" ? "#000" : "#fff" }}
// //         className="lot-btn"
// //       >
// //         {actionLabel}
// //         <ArrowRight size={14} />
// //       </button>
// //     </div>
// //   );
// // }

// // /* ─────────────────────────────────────────────────────────────
// //    VALET PANEL (UPDATED WITH OTP FLOW)
// // ───────────────────────────────────────────────────────────── */
// // function ValetRequestPanel({ userId, currentPosition, onDownload }) {
// //   const [status, setStatus] = useState("IDLE");
// //   const [activeBooking, setActiveBooking] = useState(null);
// //   const [vehicleDetails, setVehicleDetails] = useState({
// //     vehicleNumber: "",
// //     vehicleModel: "",
// //     vehicleType: "CAR",
// //     contactNumber: "",
// //   });

// //   const handleInputChange = (e) => {
// //     setVehicleDetails({ ...vehicleDetails, [e.target.name]: e.target.value });
// //   };

// //   // Poll for booking updates if we have an active booking
// //   useEffect(() => {
// //     let interval;
// //     if (status === "ACTIVE_BOOKING" && activeBooking && activeBooking.status !== "COMPLETED") {
// //       interval = setInterval(async () => {
// //         try {
// //           const token = localStorage.getItem("token");
// //           const res = await axios.get(`http://localhost:8080/api/bookings/${activeBooking.id}`, {
// //             headers: { Authorization: `Bearer ${token}` }
// //           });
// //           setActiveBooking(res.data);
// //         } catch (err) {
// //           console.error("Failed to fetch booking status", err);
// //         }
// //       }, 5000); // Check every 5 seconds
// //     }
// //     return () => clearInterval(interval);
// //   }, [status, activeBooking]);

// // const handleRequestValet = async (e) => {
// //   e.preventDefault();

// //   let rawUserId = userId || localStorage.getItem("userId");

// //   if (!rawUserId || rawUserId === "null" || rawUserId === "undefined") {
// //     alert("User session not found. Please log out and log in again.");
// //     return;
// //   }

// //   if (!currentPosition) {
// //     alert("Getting your location...");
// //     return;
// //   }

// //   setStatus("REQUESTING");

// //   try {
// //     const token = localStorage.getItem("token");

// //     const payload = {
// //       userId: parseInt(rawUserId, 10),
// //       vehicleNumber: vehicleDetails.vehicleNumber,
// //       vehicleModel: vehicleDetails.vehicleModel,
// //       vehicleType: vehicleDetails.vehicleType || "CAR",
// //       contactNumber: vehicleDetails.contactNumber,
// //       pickupLat: currentPosition.lat,
// //       pickupLng: currentPosition.lng,
// //       status: "VALET_REQUESTED",
// //       serviceType: "VALET",
// //     };

// //     console.log("SENDING PAYLOAD:", payload);

// //     const res = await axios.post(
// //       "http://localhost:8080/api/bookings",
// //       payload,
// //       { headers: { Authorization: `Bearer ${token}` } }
// //     );

// //     setActiveBooking(res.data);
// //     setStatus("ACTIVE_BOOKING");

// //   } catch (err) {
// //     console.error("BOOKING ERROR:", err.response?.data || err);
// //     setStatus("FORM");
// //     alert("Server error. Please try again.");
// //   }
// // };

// //   const handleRequestReturn = async () => {
// //     try {
// //       const token = localStorage.getItem("token");
// //       const res = await axios.post(
// //         `http://localhost:8080/api/bookings/${activeBooking.id}/request-return`,
// //         {},
// //         { headers: { Authorization: `Bearer ${token}` } }
// //       );
// //       // The backend returns { message: "...", booking: {...} }
// //       setActiveBooking(res.data.booking || res.data);
// //     } catch (err) {
// //       alert("Failed to request return: " + (err.response?.data?.error || err.message));
// //     }
// //   };

// //   return (
// //     <div style={styles.valetWrap}>
// //       <div style={styles.valetCard}>
// //         {status === "IDLE" && (
// //           <div style={styles.valetCenter}>
// //             <div style={styles.valetIconBig}>
// //               <Zap size={36} color="#FF6B35" />
// //             </div>
// //             <h3 style={styles.valetTitle}>Premium Valet</h3>
// //             <p style={styles.valetSub}>
// //               Our trained valet will come to your current location, park and
// //               retrieve your vehicle on demand.
// //             </p>
// //             <div style={styles.valetFeatures}>
// //               {["Licensed professionals", "Real-time tracking", "Instant confirmation"].map((f) => (
// //                 <div key={f} style={styles.valetFeatureRow}>
// //                   <CheckCircle size={15} color="#FF6B35" />
// //                   <span style={styles.valetFeatureText}>{f}</span>
// //                 </div>
// //               ))}
// //             </div>
// //             <button
// //               onClick={() => setStatus("FORM")}
// //               disabled={!currentPosition}
// //               style={{
// //                 ...styles.valetBtn,
// //                 opacity: currentPosition ? 1 : 0.5,
// //                 cursor: currentPosition ? "pointer" : "not-allowed",
// //               }}
// //               className="valet-btn"
// //             >
// //               {currentPosition ? "Request Valet" : "Detecting location…"}
// //               <Zap size={16} />
// //             </button>
// //           </div>
// //         )}

// //         {status === "FORM" && (
// //           <form onSubmit={handleRequestValet} style={styles.valetForm}>
// //             <button
// //               type="button"
// //               onClick={() => setStatus("IDLE")}
// //               style={styles.formBack}
// //             >
// //               ← Back
// //             </button>
// //             <h3 style={styles.valetTitle}>Vehicle Details</h3>
// //             <ParkInput
// //               label="Vehicle Number"
// //               name="vehicleNumber"
// //               placeholder="MH-12-AB-1234"
// //               value={vehicleDetails.vehicleNumber}
// //               onChange={handleInputChange}
// //               required
// //             />
// //             <ParkInput
// //               label="Model & Colour"
// //               name="vehicleModel"
// //               placeholder="Red Swift / Black Honda City"
// //               value={vehicleDetails.vehicleModel}
// //               onChange={handleInputChange}
// //               required
// //             />
// //             {/* Vehicle Type Selector */}
// //             <div style={styles.inputGroup}>
// //               <label style={styles.inputLabel}>Vehicle Type</label>
// //               <select
// //                 name="vehicleType"
// //                 value={vehicleDetails.vehicleType}
// //                 onChange={handleInputChange}
// //                 style={{ ...styles.input, cursor: "pointer" }}
// //               >
// //                 <option value="CAR">🚗 Car</option>
// //                 <option value="BIKE">🏍️ Bike</option>
// //                 <option value="HEAVY">🚛 Heavy Vehicle</option>
// //               </select>
// //             </div>
// //             <ParkInput
// //               label="Contact Number"
// //               name="contactNumber"
// //               type="tel"
// //               placeholder="Your mobile number"
// //               value={vehicleDetails.contactNumber}
// //               onChange={handleInputChange}
// //               required
// //             />
// //             {currentPosition && (
// //               <div style={styles.locationBadge}>
// //                 <Navigation size={13} color="#C8FF00" />
// //                 Location detected
// //               </div>
// //             )}
// //             <button type="submit" style={styles.valetBtn} className="valet-btn">
// //               Confirm Valet Request
// //               <Zap size={16} />
// //             </button>
// //           </form>
// //         )}

// //         {status === "REQUESTING" && (
// //           <div style={styles.valetCenter}>
// //             <div style={styles.spinner} className="park-spinner" />
// //             <p style={styles.valetSub}>Submitting your request…</p>
// //           </div>
// //         )}

// //         {status === "ACTIVE_BOOKING" && activeBooking && (
// //           <div style={styles.valetCenter}>
// //             <div style={{ ...styles.valetIconBig, background: "#C8FF0018", border: "1px solid #C8FF0030" }}>
// //               <Shield size={36} color="#C8FF00" />
// //             </div>
            
// //             <h3 style={styles.valetTitle}>
// //               {activeBooking.status.replace(/_/g, " ")}
// //             </h3>

// //             {/* OTP DISPLAYS */}
// //             {/* Show Pickup OTP as soon as booking is created (VALET_REQUESTED) OR when valet is assigned */}
// //             {(activeBooking.status === "VALET_REQUESTED" || activeBooking.status === "VALET_ASSIGNED") && (
// //               <div style={styles.otpBox}>
// //                 <div style={styles.otpLabel}>🔑 Your Pickup OTP</div>
// //                 <div style={styles.otpText}>{activeBooking.pickupOtp || "------"}</div>
// //                 <p style={{ fontSize: 12, color: "#aaa", marginTop: 8 }}>
// //                   Share this 6-digit code with the valet when they arrive to hand over your keys.
// //                 </p>
// //               </div>
// //             )}

// //             {activeBooking.status === "RETURN_REQUESTED" && (
// //               <div style={{ ...styles.otpBox, background: "#FF6B3515", border: "1px dashed #FF6B35" }}>
// //                 <div style={{ ...styles.otpLabel, color: "#FF6B35" }}>🔑 Your Dropoff OTP</div>
// //                 <div style={styles.otpText}>{activeBooking.dropoffOtp || "------"}</div>
// //                 <p style={{ fontSize: 12, color: "#aaa", marginTop: 8 }}>
// //                   Share this 6-digit code with the valet to receive your keys back.
// //                 </p>
// //               </div>
// //             )}

// //             {/* Subtext based on status */}
// //             {(activeBooking.status === "VALET_REQUESTED") && (
// //               <p style={styles.valetSub}>Finding an available valet for you. Please wait...</p>
// //             )}
// //             {activeBooking.status === "VALET_PICKED_UP" && (
// //               <p style={styles.valetSub}>The valet is currently parking your vehicle.</p>
// //             )}
// //             {activeBooking.status === "PARKED" && (
// //               <p style={styles.valetSub}>Your car is safely parked in the lot.</p>
// //             )}

// //             <div style={styles.confirmBox}>
// //               <div style={styles.confirmRow}>
// //                 <span style={styles.confirmLabel}>Vehicle</span>
// //                 <span style={styles.confirmValue}>{activeBooking.vehicleNumber}</span>
// //               </div>
// //               {activeBooking.valetId && (
// //                 <div style={styles.confirmRow}>
// //                   <span style={styles.confirmLabel}>Valet ID</span>
// //                   <span style={styles.confirmValue}>#{activeBooking.valetId}</span>
// //                 </div>
// //               )}
// //             </div>

// //             {/* Actions based on status */}
// //             {activeBooking.status === "PARKED" && (
// //               <button
// //                 onClick={handleRequestReturn}
// //                 style={{ ...styles.valetBtn, background: "#FF6B35", color: "#fff", marginBottom: 12 }}
// //                 className="valet-btn"
// //               >
// //                 Request Vehicle Return
// //                 <Key size={16} />
// //               </button>
// //             )}

// //             {activeBooking.status === "COMPLETED" && (
// //               <button
// //                 onClick={() => { setStatus("IDLE"); setActiveBooking(null); }}
// //                 style={{ ...styles.valetBtn, background: "#C8FF00", color: "#000", marginBottom: 12 }}
// //                 className="valet-btn"
// //               >
// //                 Start New Request
// //               </button>
// //             )}

// //             {activeBooking.status !== "COMPLETED" && (
// //               <button
// //                 onClick={() => onDownload(activeBooking)}
// //                 style={{ ...styles.valetBtn, background: "transparent", color: "#C8FF00", border: "1px solid #C8FF00" }}
// //                 className="valet-btn"
// //               >
// //                 Download Pay Slip
// //                 <CreditCard size={16} />
// //               </button>
// //             )}
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }

// // /* ─────────────────────────────────────────────────────────────
// //    REUSABLE INPUT
// // ───────────────────────────────────────────────────────────── */
// // function ParkInput({ label, ...props }) {
// //   return (
// //     <div style={styles.inputGroup}>
// //       <label style={styles.inputLabel}>{label}</label>
// //       <input style={styles.input} className="park-input" {...props} />
// //     </div>
// //   );
// // }

// // /* ─────────────────────────────────────────────────────────────
// //    STYLES
// // ───────────────────────────────────────────────────────────── */
// // const styles = {
// //   /* Loading */
// //   loadingWrapper: {
// //     minHeight: "100vh",
// //     background: "#0A0A0A",
// //     display: "flex",
// //     alignItems: "center",
// //     justifyContent: "center",
// //   },
// //   loadingInner: { textAlign: "center" },
// //   loadingLogo: {
// //     width: 56,
// //     height: 56,
// //     borderRadius: 14,
// //     background: "#C8FF0020",
// //     border: "1px solid #C8FF0040",
// //     display: "flex",
// //     alignItems: "center",
// //     justifyContent: "center",
// //     margin: "0 auto 16px",
// //   },
// //   loadingText: { color: "#666", fontSize: 14 },

// //   /* App shell */
// //   shell: { minHeight: "100vh", background: "#0A0A0A", color: "#fff" },

// //   /* Modal */
// //   modalBackdrop: {
// //     position: "fixed",
// //     inset: 0,
// //     background: "rgba(0,0,0,0.85)",
// //     backdropFilter: "blur(8px)",
// //     zIndex: 999,
// //     display: "flex",
// //     alignItems: "center",
// //     justifyContent: "center",
// //     padding: 24,
// //   },
// //   modalCard: {
// //     background: "#161616",
// //     border: "1px solid #2e2e2e",
// //     borderRadius: 20,
// //     padding: 36,
// //     width: "100%",
// //     maxWidth: 420,
// //   },
// //   modalHeader: { textAlign: "center", marginBottom: 28 },
// //   modalIconWrap: {
// //     width: 52,
// //     height: 52,
// //     borderRadius: 14,
// //     background: "#C8FF0018",
// //     border: "1px solid #C8FF0035",
// //     display: "flex",
// //     alignItems: "center",
// //     justifyContent: "center",
// //     margin: "0 auto 16px",
// //   },
// //   modalTitle: { fontSize: 22, fontWeight: 700, color: "#ffffff", marginBottom: 6 },
// //   modalSubtitle: { fontSize: 14, color: "#aaa" },
// //   modalForm: { display: "flex", flexDirection: "column", gap: 16 },
// //   limeBtn: {
// //     display: "flex",
// //     alignItems: "center",
// //     justifyContent: "center",
// //     gap: 8,
// //     background: "#C8FF00",
// //     color: "#000",
// //     border: "none",
// //     borderRadius: 12,
// //     padding: "14px 24px",
// //     fontWeight: 700,
// //     fontSize: 15,
// //     cursor: "pointer",
// //     marginTop: 8,
// //   },

// //   /* Hero */
// //   hero: {
// //     position: "relative",
// //     padding: "60px 24px 0",
// //     maxWidth: 1280,
// //     margin: "0 auto",
// //     overflow: "hidden",
// //   },
// //   heroGlow: {
// //     position: "absolute",
// //     top: 0,
// //     left: "50%",
// //     transform: "translateX(-50%)",
// //     width: 600,
// //     height: 300,
// //     background: "radial-gradient(ellipse, #C8FF0015 0%, transparent 70%)",
// //     pointerEvents: "none",
// //   },
// //   heroContent: { position: "relative", zIndex: 1 },
// //   heroPill: {
// //     display: "inline-flex",
// //     alignItems: "center",
// //     gap: 8,
// //     background: "#C8FF0012",
// //     border: "1px solid #C8FF0030",
// //     borderRadius: 999,
// //     padding: "6px 16px",
// //     fontSize: 13,
// //     color: "#C8FF00",
// //     fontWeight: 600,
// //     marginBottom: 20,
// //   },
// //   heroPillDot: {
// //     width: 7,
// //     height: 7,
// //     borderRadius: "50%",
// //     background: "#C8FF00",
// //     animation: "pulse 2s ease-in-out infinite",
// //   },
// //   heroTitle: {
// //     fontSize: "clamp(40px, 6vw, 72px)",
// //     fontWeight: 800,
// //     lineHeight: 1.05,
// //     letterSpacing: "-2px",
// //     color: "#fff",
// //     marginBottom: 14,
// //   },
// //   heroAccent: { color: "#C8FF00" },
// //   heroSub: { fontSize: 17, color: "#aaa", maxWidth: 440, marginBottom: 40 },

// //   statsRow: {
// //     display: "grid",
// //     gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
// //     gap: 16,
// //     marginBottom: 60,
// //   },
// //   statCard: {
// //     background: "#181818",
// //     border: "1px solid #2e2e2e",
// //     borderRadius: 16,
// //     padding: "20px 24px",
// //     display: "flex",
// //     alignItems: "center",
// //     gap: 16,
// //     transition: "border-color 0.2s",
// //   },
// //   statIcon: {
// //     width: 40,
// //     height: 40,
// //     borderRadius: 10,
// //     background: "#C8FF0018",
// //     display: "flex",
// //     alignItems: "center",
// //     justifyContent: "center",
// //     flexShrink: 0,
// //   },
// //   statValue: { fontSize: 26, fontWeight: 800, color: "#ffffff", lineHeight: 1 },
// //   statLabel: { fontSize: 12, color: "#999", marginTop: 4 },

// //   /* Services */
// //   serviceSection: {
// //     maxWidth: 1280,
// //     margin: "0 auto",
// //     padding: "0 24px 80px",
// //   },
// //   sectionLabel: {
// //     fontSize: 12,
// //     fontWeight: 600,
// //     letterSpacing: "0.15em",
// //     textTransform: "uppercase",
// //     color: "#C8FF00",
// //     marginBottom: 10,
// //   },
// //   sectionTitle: {
// //     fontSize: "clamp(26px, 4vw, 40px)",
// //     fontWeight: 800,
// //     color: "#fff",
// //     marginBottom: 36,
// //     letterSpacing: "-1px",
// //   },
// //   serviceGrid: {
// //     display: "grid",
// //     gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
// //     gap: 20,
// //   },
// //   svcCard: {
// //     background: "#161616",
// //     border: "1px solid #2a2a2a",
// //     borderRadius: 20,
// //     padding: "28px 24px 24px",
// //     textAlign: "left",
// //     cursor: "pointer",
// //     position: "relative",
// //     transition: "border-color 0.25s, transform 0.2s",
// //   },
// //   svcIconWrap: {
// //     width: 52,
// //     height: 52,
// //     borderRadius: 14,
// //     display: "flex",
// //     alignItems: "center",
// //     justifyContent: "center",
// //     marginBottom: 16,
// //   },
// //   svcTag: {
// //     display: "inline-block",
// //     fontSize: 11,
// //     fontWeight: 700,
// //     letterSpacing: "0.08em",
// //     padding: "4px 10px",
// //     borderRadius: 999,
// //     marginBottom: 12,
// //     textTransform: "uppercase",
// //   },
// //   svcTitle: {
// //     fontSize: 20,
// //     fontWeight: 700,
// //     color: "#fff",
// //     marginBottom: 10,
// //   },
// //   svcDesc: { fontSize: 14, color: "#999", lineHeight: 1.6, marginBottom: 20 },
// //   svcArrow: {
// //     display: "flex",
// //     alignItems: "center",
// //     transition: "transform 0.2s",
// //   },

// //   /* Panel */
// //   panelSection: {
// //     maxWidth: 1280,
// //     margin: "0 auto",
// //     padding: "0 24px 80px",
// //   },
// //   backBtn: {
// //     background: "transparent",
// //     border: "1px solid #333",
// //     color: "#aaa",
// //     borderRadius: 10,
// //     padding: "8px 16px",
// //     fontSize: 13,
// //     cursor: "pointer",
// //     marginBottom: 28,
// //     transition: "color 0.2s, border-color 0.2s",
// //   },
// //   panelHeader: {
// //     display: "flex",
// //     alignItems: "center",
// //     gap: 16,
// //     marginBottom: 28,
// //   },
// //   panelIconWrap: {
// //     width: 46,
// //     height: 46,
// //     borderRadius: 12,
// //     display: "flex",
// //     alignItems: "center",
// //     justifyContent: "center",
// //     flexShrink: 0,
// //   },
// //   panelTitle: { fontSize: 22, fontWeight: 700, color: "#fff" },
// //   panelSub: { fontSize: 14, color: "#999", marginTop: 3 },

// //   /* Map */
// //   mapWrap: {
// //     borderRadius: 18,
// //     border: "1px solid #1c1c1c",
// //     marginBottom: 24,
// //     height: 500,
// //     position: "relative",
// //     zIndex: 0,
// //   },

// //   /* Book layout */
// //   bookGrid: {
// //     display: "grid",
// //     gridTemplateColumns: "1fr 340px",
// //     gap: 20,
// //     alignItems: "start",
// //   },
// //   bookList: {
// //     display: "flex",
// //     flexDirection: "column",
// //     gap: 12,
// //     maxHeight: 500,
// //     overflowY: "auto",
// //   },

// //   /* Lots grid */
// //   lotsGrid: {
// //     display: "grid",
// //     gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
// //     gap: 16,
// //   },
// //   lotCard: {
// //     background: "#181818",
// //     border: "1px solid #2e2e2e",
// //     borderRadius: 16,
// //     padding: "20px",
// //     transition: "border-color 0.2s, transform 0.2s",
// //   },
// //   lotCardHovered: {
// //     borderColor: "#C8FF0060",
// //     transform: "translateY(-2px)",
// //     background: "#1e1e1e",
// //   },
// //   lotCardTop: {
// //     display: "flex",
// //     alignItems: "center",
// //     gap: 8,
// //     marginBottom: 8,
// //   },
// //   lotDot: {
// //     width: 8,
// //     height: 8,
// //     borderRadius: "50%",
// //     background: "#4ade80",
// //     flexShrink: 0,
// //     boxShadow: "0 0 6px #4ade8090",
// //   },
// //   lotAvail: { fontSize: 12, color: "#4ade80", fontWeight: 600 },
// //   lotName: { fontSize: 15, fontWeight: 700, color: "#ffffff", marginBottom: 6 },
// //   lotMeta: { display: "flex", alignItems: "center", gap: 5, marginBottom: 12 },
// //   lotAddr: { fontSize: 12, color: "#aaa" },
// //   lotPrice: { fontSize: 22, fontWeight: 800, color: "#ffffff", marginBottom: 14 },
// //   lotPriceUnit: { fontSize: 13, fontWeight: 400, color: "#888" },
// //   lotBtn: {
// //     display: "flex",
// //     alignItems: "center",
// //     gap: 6,
// //     width: "100%",
// //     justifyContent: "center",
// //     border: "none",
// //     borderRadius: 10,
// //     padding: "10px 0",
// //     fontWeight: 700,
// //     fontSize: 13,
// //     cursor: "pointer",
// //   },

// //   /* Valet & OTP */
// //   valetWrap: { maxWidth: 520, margin: "0 auto" },
// //   valetCard: {
// //     background: "#161616",
// //     border: "1px solid #2a2a2a",
// //     borderRadius: 20,
// //     padding: 36,
// //   },
// //   valetCenter: { textAlign: "center" },
// //   valetIconBig: {
// //     width: 72,
// //     height: 72,
// //     borderRadius: 20,
// //     background: "#FF6B3518",
// //     border: "1px solid #FF6B3530",
// //     display: "flex",
// //     alignItems: "center",
// //     justifyContent: "center",
// //     margin: "0 auto 20px",
// //   },
// //   valetTitle: {
// //     fontSize: 24,
// //     fontWeight: 700,
// //     color: "#fff",
// //     marginBottom: 10,
// //     textTransform: "capitalize"
// //   },
// //   valetSub: { fontSize: 14, color: "#aaa", lineHeight: 1.6, marginBottom: 24 },
// //   valetFeatures: {
// //     display: "flex",
// //     flexDirection: "column",
// //     gap: 10,
// //     marginBottom: 28,
// //     textAlign: "left",
// //     background: "#FF6B3510",
// //     border: "1px solid #FF6B3525",
// //     borderRadius: 12,
// //     padding: "16px 20px",
// //   },
// //   valetFeatureRow: { display: "flex", alignItems: "center", gap: 10 },
// //   valetFeatureText: { fontSize: 13, color: "#ccc" },
// //   valetBtn: {
// //     display: "flex",
// //     alignItems: "center",
// //     justifyContent: "center",
// //     gap: 8,
// //     width: "100%",
// //     background: "#FF6B35",
// //     color: "#fff",
// //     border: "none",
// //     borderRadius: 12,
// //     padding: "14px 24px",
// //     fontWeight: 700,
// //     fontSize: 15,
// //     cursor: "pointer",
// //   },
// //   valetForm: { display: "flex", flexDirection: "column", gap: 16 },
// //   formBack: {
// //     background: "transparent",
// //     border: "none",
// //     color: "#aaa",
// //     fontSize: 13,
// //     cursor: "pointer",
// //     textAlign: "left",
// //     padding: 0,
// //     marginBottom: 8,
// //   },
// //   locationBadge: {
// //     display: "flex",
// //     alignItems: "center",
// //     gap: 8,
// //     background: "#C8FF0010",
// //     border: "1px solid #C8FF0025",
// //     borderRadius: 10,
// //     padding: "10px 14px",
// //     fontSize: 13,
// //     color: "#C8FF00",
// //     fontWeight: 600,
// //   },
// //   confirmBox: {
// //     background: "#1a1a1a",
// //     border: "1px solid #2e2e2e",
// //     borderRadius: 12,
// //     padding: 20,
// //     marginBottom: 20,
// //     width: "100%",
// //   },
// //   confirmRow: {
// //     display: "flex",
// //     justifyContent: "space-between",
// //     marginBottom: 10,
// //   },
// //   confirmLabel: { fontSize: 13, color: "#888" },
// //   confirmValue: { fontSize: 13, color: "#eee", fontWeight: 600 },
  
// //   // New OTP Styles
// //   otpBox: {
// //     background: "#C8FF0015",
// //     border: "1px dashed #C8FF00",
// //     borderRadius: 12,
// //     padding: "20px",
// //     textAlign: "center",
// //     marginBottom: "24px"
// //   },
// //   otpLabel: { 
// //     fontSize: 12, 
// //     color: "#C8FF00", 
// //     textTransform: "uppercase", 
// //     letterSpacing: 1, 
// //     marginBottom: 8,
// //     fontWeight: 700
// //   },
// //   otpText: { 
// //     fontSize: 36, 
// //     fontWeight: 800, 
// //     color: "#fff", 
// //     letterSpacing: 8 
// //   },

// //   /* Spinner */
// //   spinner: {
// //     width: 48,
// //     height: 48,
// //     borderRadius: "50%",
// //     border: "3px solid #1a1a1a",
// //     borderTopColor: "#FF6B35",
// //     margin: "0 auto 20px",
// //   },

// //   /* Input */
// //   inputGroup: { display: "flex", flexDirection: "column", gap: 6 },
// //   inputLabel: { fontSize: 13, fontWeight: 600, color: "#bbb" },
// //   input: {
// //     background: "#1a1a1a",
// //     border: "1px solid #333",
// //     borderRadius: 10,
// //     padding: "12px 14px",
// //     fontSize: 14,
// //     color: "#fff",
// //     outline: "none",
// //     width: "100%",
// //     boxSizing: "border-box",
// //   },
// // };

// // /* ─────────────────────────────────────────────────────────────
// //    GLOBAL CSS (animations + hover effects)
// // ───────────────────────────────────────────────────────────── */
// // const globalCSS = `
// //   @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&display=swap');

// //   body { font-family: 'Syne', sans-serif; margin: 0; }

// //   @keyframes pulse {
// //     0%, 100% { opacity: 1; transform: scale(1); }
// //     50% { opacity: 0.5; transform: scale(0.85); }
// //   }

// //   .park-spinner { animation: spin 0.8s linear infinite; }
// //   @keyframes spin { to { transform: rotate(360deg); } }

// //   .svc-card:hover {
// //     border-color: var(--accent, #C8FF00) !important;
// //     transform: translateY(-4px);
// //   }
// //   .svc-card:hover .svc-arrow {
// //     transform: translateX(4px);
// //   }

// //   .stat-card:hover { border-color: #C8FF0030 !important; }

// //   .back-btn:hover { color: #fff !important; border-color: #444 !important; }

// //   .park-input:focus {
// //     border-color: #C8FF00 !important;
// //     box-shadow: 0 0 0 3px #C8FF0015;
// //   }

// //   .lime-btn:hover, .valet-btn:hover, .lot-btn:hover {
// //     opacity: 0.88;
// //     transform: translateY(-1px);
// //   }

// //   .park-modal {
// //     animation: modalIn 0.25s ease;
// //   }
// //   @keyframes modalIn {
// //     from { opacity: 0; transform: scale(0.97) translateY(8px); }
// //     to   { opacity: 1; transform: scale(1) translateY(0); }
// //   }
// // `;

// // export default UserDashboard;



// import { useEffect, useState, useCallback } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import jsPDF from "jspdf";
// import {
//   Car,
//   Clock,
//   CreditCard,
//   MapPin,
//   Navigation,
//   Shield,
//   Zap,
//   Search,
//   CalendarCheck,
//   Star,
//   ChevronRight,
//   ArrowRight,
//   User,
//   Phone,
//   TrendingUp,
//   CheckCircle,
//   Key // 👈 Added Key icon for OTPs
// } from "lucide-react";
// import UserNavbar from "../../components/navbar/UserNavbar";
// import CustomMap from "../../components/map/MapContainer";
// import ParkingLotBooking from "../../pages/parking/ParkingLotBooking";

// /* ─────────────────────────────────────────────────────────────
//    MAIN DASHBOARD
// ───────────────────────────────────────────────────────────── */
// function UserDashboard() {
//   const [lots, setLots] = useState([]);
//   const [mode, setMode] = useState(null);
//   const [userId, setUserId] = useState(null);
//   const [selectedLot, setSelectedLot] = useState(null);
//   const [currentPosition, setCurrentPosition] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [hoveredLotId, setHoveredLotId] = useState(null);
//   const [focusedLot, setFocusedLot] = useState(null); // Added state for map focus
//   const [stats, setStats] = useState({ bookings: 0, hours: 0, savings: 0 });
//   const [showProfileModal, setShowProfileModal] = useState(false);
//   const [profileData, setProfileData] = useState({
//     name: "",
//     email: "",
//     phoneNumber: "",
//     password: "",
//   });

//   const navigate = useNavigate();

//   /* PDF pay-slip */
//   const generatePaySlip = (vehicleDetails) => {
//     const doc = new jsPDF();
//     const uniqueCode = `PRK-${userId}-${Date.now().toString().slice(-6)}`;
//     doc.setFontSize(22);
//     doc.setTextColor(37, 99, 235);
//     doc.text("PARKING PAY SLIP", 105, 30, { align: "center" });
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
//     doc.setFillColor(248, 250, 252);
//     doc.rect(20, 130, 170, 30, "F");
//     doc.setFontSize(16);
//     doc.setFont("helvetica", "bold");
//     doc.text(`VERIFICATION CODE: ${uniqueCode}`, 105, 150, { align: "center" });
//     doc.save(`ParkingSlip_${uniqueCode}.pdf`);
//   };

//   const calculateStats = useCallback(() => {
//     setStats({ bookings: 12, hours: 36, savings: 240 });
//   }, []);

//   useEffect(() => {
//     const fetchUserAndLots = async () => {
//       setLoading(true);
//       try {
//         const token = localStorage.getItem("token");
//         if (!token || token === "undefined" || token === "null") {
//           navigate("/login");
//           return;
//         }
//         const config = {
//           headers: { Authorization: `Bearer ${token}` },
//           withCredentials: true,
//         };
//         const [userRes, lotsRes] = await Promise.all([
//           axios.get("http://localhost:8080/api/users/me", config),
//           axios.get("http://localhost:8080/api/parking-lots", config),
//         ]);
//         if (userRes.data) {
//           const userData = userRes.data;
//           setUserId(userData.id);
//           localStorage.setItem("userId", userData.id);
//           if (!userData.phoneNumber) {
//             setProfileData({
//               name: userData.name || "",
//               email: userData.email,
//               phoneNumber: "",
//               password: "",
//             });
//             setShowProfileModal(true);
//           }
//         }
//         if (lotsRes.data) setLots(lotsRes.data);
//         calculateStats();
//       } catch (err) {
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
//         (pos) =>
//           setCurrentPosition({
//             lat: pos.coords.latitude,
//             lng: pos.coords.longitude,
//           }),
//         (err) => console.error("Location error:", err)
//       );
//     }
//   }, [navigate, calculateStats]);

//   const handleUpdateProfile = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.put(
//         "http://localhost:8080/api/users/me",
//         {
//           name: profileData.name,
//           phoneNumber: profileData.phoneNumber,
//           password: profileData.password,
//         },
//         { withCredentials: true }
//       );
//       setShowProfileModal(true);
//     } catch {
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

//   if (loading) {
//     return (
//       <div style={styles.loadingWrapper}>
//         <div style={styles.loadingInner}>
//           <div style={styles.loadingLogo}>
//             <Car size={28} color="#C8FF00" />
//           </div>
//           <p style={styles.loadingText}>Loading your dashboard…</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <>
//       <style>{globalCSS}</style>

//       {/* ── Profile completion modal ── */}
//       {showProfileModal && (
//         <div style={styles.modalBackdrop}>
//           <div style={styles.modalCard} className="park-modal">
//             <div style={styles.modalHeader}>
//               <div style={styles.modalIconWrap}>
//                 <User size={24} color="#C8FF00" />
//               </div>
//               <h2 style={styles.modalTitle}>Complete Your Profile</h2>
//               <p style={styles.modalSubtitle}>
//                 A few more details to unlock all features
//               </p>
//             </div>
//             <form onSubmit={handleUpdateProfile} style={styles.modalForm}>
//               <ParkInput
//                 label="Full Name"
//                 placeholder="John Doe"
//                 value={profileData.name}
//                 onChange={(e) =>
//                   setProfileData({ ...profileData, name: e.target.value })
//                 }
//               />
//               <ParkInput
//                 label="Phone Number"
//                 placeholder="+91 9876543210"
//                 value={profileData.phoneNumber}
//                 onChange={(e) =>
//                   setProfileData({
//                     ...profileData,
//                     phoneNumber: e.target.value,
//                   })
//                 }
//                 required
//               />
//               <ParkInput
//                 label="Set a Password"
//                 type="password"
//                 placeholder="Min. 8 characters"
//                 value={profileData.password}
//                 onChange={(e) =>
//                   setProfileData({ ...profileData, password: e.target.value })
//                 }
//               />
//               <button type="submit" style={styles.limeBtn} className="lime-btn">
//                 Save & Continue
//                 <ArrowRight size={16} />
//               </button>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* ── App shell ── */}
//       <div style={styles.shell}>
//         <UserNavbar />

//         {/* ── HERO ── */}
//         <section style={styles.hero} className="hero-section">
//           <div style={styles.heroGlow} />
//           <div style={styles.heroContent}>
//             <span style={styles.heroPill}>
//               <span style={styles.heroPillDot} />
//               Live Dashboard
//             </span>
//             <h1 style={styles.heroTitle}>
//               Park <span style={styles.heroAccent}>Smarter.</span>
//             </h1>
//             <p style={styles.heroSub}>
//               Find a spot, book a slot, or call a valet — all in one place.
//             </p>
//           </div>

//           <div style={styles.statsRow} className="stats-row-wrap">
//             {[
//               { label: "Total Bookings", value: stats.bookings, icon: <CalendarCheck size={18} color="#C8FF00" /> },
//               { label: "Hours Parked", value: stats.hours, icon: <Clock size={18} color="#C8FF00" /> },
//               { label: "Savings (₹)", value: stats.savings, icon: <TrendingUp size={18} color="#C8FF00" /> },
//             ].map((s) => (
//               <div key={s.label} style={styles.statCard} className="stat-card">
//                 <div style={styles.statIcon}>{s.icon}</div>
//                 <div>
//                   <div style={styles.statValue}>{s.value}</div>
//                   <div style={styles.statLabel}>{s.label}</div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </section>

//         {/* ── SERVICE SELECTOR ── */}
//         {!mode && (
//           <section style={styles.serviceSection} className="service-section-wrap">
//             <p style={styles.sectionLabel}>Choose a Service</p>
//             <h2 style={styles.sectionTitle}>What do you need today?</h2>

//             <div style={styles.serviceGrid} className="service-grid-wrap">
//               <ServiceCard
//                 icon={<Search size={28} />}
//                 tag="Instant"
//                 title="Self Parking"
//                 description="Browse lots near you on a live map and navigate directly to an open spot."
//                 accent="#C8FF00"
//                 onClick={() => setMode("self")}
//               />
//               <ServiceCard
//                 icon={<CalendarCheck size={28} />}
//                 tag="Reserved"
//                 title="Book a Slot"
//                 description="Reserve a specific bay for your vehicle in advance and pay securely online."
//                 accent="#00D4FF"
//                 onClick={() => setMode("book")}
//               />
//               <ServiceCard
//                 icon={<Zap size={28} />}
//                 tag="Premium"
//                 title="Valet Service"
//                 description="A trained valet comes to you, parks and retrieves your vehicle on demand."
//                 accent="#FF6B35"
//                 onClick={() => setMode("valet")}
//               />
//             </div>
//           </section>
//         )}

//         {/* ── ACTIVE MODE PANEL ── */}
//         {mode && (
//           <section style={styles.panelSection} className="panel-section-wrap">
//             <button
//               onClick={() => { setMode(null); setSelectedLot(null); setFocusedLot(null); }}
//               style={styles.backBtn}
//               className="back-btn"
//             >
//               ← Back to Services
//             </button>

//             {/* SELF PARKING */}
//             {mode === "self" && (
//               <div>
//                 <PanelHeader
//                   icon={<Search size={22} color="#C8FF00" />}
//                   title="Self Parking"
//                   subtitle="Tap a lot to get directions"
//                   accent="#C8FF00"
//                 />
//                 <div style={styles.mapWrap} className="map-wrap-inner">
//                   <CustomMap
//                     lots={lots}
//                     onSelectLot={(lot) => openNavigation(lot)}
//                     hoveredLotId={hoveredLotId}
//                     focusedLot={focusedLot}
//                     center={focusedLot ? { lat: focusedLot.latitude, lng: focusedLot.longitude } : currentPosition}
//                   />
//                 </div>
//                 {lots.length > 0 && (
//                   <div style={styles.lotsGrid}>
//                     {lots.map((lot) => (
//                       <LotCard
//                         key={lot.id}
//                         lot={lot}
//                         isHovered={hoveredLotId === lot.id}
//                         onHover={() => {
//                           setHoveredLotId(lot.id);
//                           setFocusedLot(lot);
//                         }}
//                         onLeave={() => setHoveredLotId(null)}
//                         onClick={() => setFocusedLot(lot)}
//                         onNavigate={() => openNavigation(lot)}
//                       />
//                     ))}
//                   </div>
//                 )}
//               </div>
//             )}

//             {/* BOOK A SLOT */}
//             {mode === "book" && (
//               <div>
//                 <PanelHeader
//                   icon={<CalendarCheck size={22} color="#00D4FF" />}
//                   title="Book a Slot"
//                   subtitle="Select a lot on the map or from the list below"
//                   accent="#00D4FF"
//                 />
//                 {selectedLot ? (
//                   <ParkingLotBooking
//                     lot={selectedLot}
//                     user={{ id: userId }}
//                     onClose={() => setSelectedLot(null)}
//                   />
//                 ) : (
//                   <>
//                     <div style={styles.bookGrid} className="book-grid-wrap">
//                       {/* Map column */}
//                       <div style={styles.mapWrap} className="map-wrap-inner">
//                         <CustomMap
//                           lots={lots}
//                           onSelectLot={(lot) => {
//                             setSelectedLot(lot);
//                             setFocusedLot(lot);
//                           }}
//                           hoveredLotId={hoveredLotId}
//                           focusedLot={focusedLot}
//                           center={focusedLot ? { lat: focusedLot.latitude, lng: focusedLot.longitude } : currentPosition}
//                         />
//                       </div>
//                       {/* Lots list column */}
//                       <div style={styles.bookList}>
//                         {lots.map((lot) => (
//                           <LotCard
//                             key={lot.id}
//                             lot={lot}
//                             accent="#00D4FF"
//                             actionLabel="Book Now"
//                             isHovered={hoveredLotId === lot.id}
//                             onHover={() => {
//                               setHoveredLotId(lot.id);
//                               setFocusedLot(lot);
//                             }}
//                             onLeave={() => setHoveredLotId(null)}
//                             onClick={() => setFocusedLot(lot)}
//                             onNavigate={() => setSelectedLot(lot)}
//                           />
//                         ))}
//                       </div>
//                     </div>
//                   </>
//                 )}
//               </div>
//             )}

//             {/* VALET */}
//             {mode === "valet" && (
//               <div>
//                 <PanelHeader
//                   icon={<Zap size={22} color="#FF6B35" />}
//                   title="Valet Service"
//                   subtitle="Premium door-to-door parking"
//                   accent="#FF6B35"
//                 />
//                 <ValetRequestPanel
//                   userId={userId}
//                   currentPosition={currentPosition}
//                   onDownload={generatePaySlip}
//                 />
//               </div>
//             )}
//           </section>
//         )}
//       </div>
//     </>
//   );
// }

// /* ─────────────────────────────────────────────────────────────
//    SERVICE CARD
// ───────────────────────────────────────────────────────────── */
// function ServiceCard({ icon, tag, title, description, accent, onClick }) {
//   return (
//     <button
//       onClick={onClick}
//       style={{ ...styles.svcCard, "--accent": accent }}
//       className="svc-card"
//     >
//       <div style={{ ...styles.svcIconWrap, background: `${accent}18`, border: `1px solid ${accent}30` }}>
//         <span style={{ color: accent }}>{icon}</span>
//       </div>
//       <span style={{ ...styles.svcTag, color: accent, background: `${accent}15` }}>{tag}</span>
//       <h3 style={styles.svcTitle}>{title}</h3>
//       <p style={styles.svcDesc}>{description}</p>
//       <div style={{ ...styles.svcArrow, color: accent }} className="svc-arrow">
//         <ChevronRight size={20} />
//       </div>
//     </button>
//   );
// }

// /* ─────────────────────────────────────────────────────────────
//    PANEL HEADER
// ───────────────────────────────────────────────────────────── */
// function PanelHeader({ icon, title, subtitle, accent }) {
//   return (
//     <div style={styles.panelHeader}>
//       <div style={{ ...styles.panelIconWrap, background: `${accent}18`, border: `1px solid ${accent}30` }}>
//         {icon}
//       </div>
//       <div>
//         <h2 style={styles.panelTitle}>{title}</h2>
//         <p style={styles.panelSub}>{subtitle}</p>
//       </div>
//     </div>
//   );
// }

// /* ─────────────────────────────────────────────────────────────
//    LOT CARD
// ───────────────────────────────────────────────────────────── */
// function LotCard({ lot, isHovered, onHover, onLeave, onClick, onNavigate, accent = "#C8FF00", actionLabel = "Navigate" }) {
//   const available = lot.availableSpots ?? lot.capacity ?? "?";
//   const isPaused = lot.status === "PAUSED";

//   return (
//     <div
//       onClick={!isPaused ? onClick : undefined}
//       style={{
//         ...styles.lotCard,
//         ...(isHovered && !isPaused ? styles.lotCardHovered : {}),
//         cursor: isPaused ? "not-allowed" : onClick ? "pointer" : "default",
//         opacity: isPaused ? 0.6 : 1,
//       }}
//       onMouseEnter={!isPaused ? onHover : undefined}
//       onMouseLeave={!isPaused ? onLeave : undefined}
//     >
//       <div style={styles.lotCardTop}>
//         {/* ✅ Dot and text now reflect actual status */}
//         <div style={{
//           ...styles.lotDot,
//           background: isPaused ? "#f87171" : "#4ade80",
//           boxShadow: isPaused ? "0 0 6px #f8717190" : "0 0 6px #4ade8090",
//         }} />
//         <span style={{ ...styles.lotAvail, color: isPaused ? "#f87171" : "#4ade80" }}>
//           {isPaused ? "Closed" : `${available} spots`}
//         </span>
//       </div>

//       <h4 style={styles.lotName}>{lot.name}</h4>
//       <div style={styles.lotMeta}>
//         <MapPin size={12} color="#666" />
//         <span style={styles.lotAddr}>{lot.address || "Location on map"}</span>
//       </div>
//       {lot.pricePerHour && (
//         <div style={styles.lotPrice}>
//           ₹{lot.pricePerHour}
//           <span style={styles.lotPriceUnit}>/hr</span>
//         </div>
//       )}

//       {/* ✅ Button is disabled and styled differently when paused */}
//       <button
//         onClick={(e) => {
//           e.stopPropagation();
//           if (!isPaused) onNavigate();
//         }}
//         disabled={isPaused}
//         style={{
//           ...styles.lotBtn,
//           background: isPaused ? "#2a2a2a" : accent,
//           color: isPaused ? "#666" : accent === "#C8FF00" ? "#000" : "#fff",
//           cursor: isPaused ? "not-allowed" : "pointer",
//           border: isPaused ? "1px solid #333" : "none",
//         }}
//         className="lot-btn"
//       >
//         {isPaused ? "Currently Closed" : actionLabel}
//         {!isPaused && <ArrowRight size={14} />}
//       </button>
//     </div>
//   );
// }

// /* ─────────────────────────────────────────────────────────────
//    VALET PANEL (UPDATED WITH OTP FLOW)
// ───────────────────────────────────────────────────────────── */
// function ValetRequestPanel({ userId, currentPosition, onDownload }) {
//   const [status, setStatus] = useState("IDLE");
//   const [activeBooking, setActiveBooking] = useState(null);
//   const [vehicleDetails, setVehicleDetails] = useState({
//     vehicleNumber: "",
//     vehicleModel: "",
//     vehicleType: "CAR",
//     contactNumber: "",
//   });

//   const handleInputChange = (e) => {
//     setVehicleDetails({ ...vehicleDetails, [e.target.name]: e.target.value });
//   };

//   // Poll for booking updates if we have an active booking
//   useEffect(() => {
//     let interval;
//     if (status === "ACTIVE_BOOKING" && activeBooking && activeBooking.status !== "COMPLETED") {
//       interval = setInterval(async () => {
//         try {
//           const token = localStorage.getItem("token");
//           const res = await axios.get(`http://localhost:8080/api/bookings/${activeBooking.id}`, {
//             headers: { Authorization: `Bearer ${token}` }
//           });
//           setActiveBooking(res.data);
//         } catch (err) {
//           console.error("Failed to fetch booking status", err);
//         }
//       }, 5000); // Check every 5 seconds
//     }
//     return () => clearInterval(interval);
//   }, [status, activeBooking]);

// const handleRequestValet = async (e) => {
//   e.preventDefault();

//   let rawUserId = userId || localStorage.getItem("userId");

//   if (!rawUserId || rawUserId === "null" || rawUserId === "undefined") {
//     alert("User session not found. Please log out and log in again.");
//     return;
//   }

//   if (!currentPosition) {
//     alert("Getting your location...");
//     return;
//   }

//   setStatus("REQUESTING");

//   try {
//     const token = localStorage.getItem("token");

//     const payload = {
//       userId: parseInt(rawUserId, 10),
//       vehicleNumber: vehicleDetails.vehicleNumber,
//       vehicleModel: vehicleDetails.vehicleModel,
//       vehicleType: vehicleDetails.vehicleType || "CAR",
//       contactNumber: vehicleDetails.contactNumber,
//       pickupLat: currentPosition.lat,
//       pickupLng: currentPosition.lng,
//       status: "VALET_REQUESTED",
//       serviceType: "VALET",
//     };

//     console.log("SENDING PAYLOAD:", payload);

//     const res = await axios.post(
//       "http://localhost:8080/api/bookings",
//       payload,
//       { headers: { Authorization: `Bearer ${token}` } }
//     );

//     setActiveBooking(res.data);
//     setStatus("ACTIVE_BOOKING");

//   } catch (err) {
//     console.error("BOOKING ERROR:", err.response?.data || err);
//     setStatus("FORM");
//     alert("Server error. Please try again.");
//   }
// };

//   const handleRequestReturn = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const res = await axios.post(
//         `http://localhost:8080/api/bookings/${activeBooking.id}/request-return`,
//         {},
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       // The backend returns { message: "...", booking: {...} }
//       setActiveBooking(res.data.booking || res.data);
//     } catch (err) {
//       alert("Failed to request return: " + (err.response?.data?.error || err.message));
//     }
//   };

//   return (
//     <div style={styles.valetWrap}>
//       <div style={styles.valetCard}>
//         {status === "IDLE" && (
//           <div style={styles.valetCenter}>
//             <div style={styles.valetIconBig}>
//               <Zap size={36} color="#FF6B35" />
//             </div>
//             <h3 style={styles.valetTitle}>Premium Valet</h3>
//             <p style={styles.valetSub}>
//               Our trained valet will come to your current location, park and
//               retrieve your vehicle on demand.
//             </p>
//             <div style={styles.valetFeatures}>
//               {["Licensed professionals", "Real-time tracking", "Instant confirmation"].map((f) => (
//                 <div key={f} style={styles.valetFeatureRow}>
//                   <CheckCircle size={15} color="#FF6B35" />
//                   <span style={styles.valetFeatureText}>{f}</span>
//                 </div>
//               ))}
//             </div>
//             <button
//               onClick={() => setStatus("FORM")}
//               disabled={!currentPosition}
//               style={{
//                 ...styles.valetBtn,
//                 opacity: currentPosition ? 1 : 0.5,
//                 cursor: currentPosition ? "pointer" : "not-allowed",
//               }}
//               className="valet-btn"
//             >
//               {currentPosition ? "Request Valet" : "Detecting location…"}
//               <Zap size={16} />
//             </button>
//           </div>
//         )}

//         {status === "FORM" && (
//           <form onSubmit={handleRequestValet} style={styles.valetForm}>
//             <button
//               type="button"
//               onClick={() => setStatus("IDLE")}
//               style={styles.formBack}
//             >
//               ← Back
//             </button>
//             <h3 style={styles.valetTitle}>Vehicle Details</h3>
//             <ParkInput
//               label="Vehicle Number"
//               name="vehicleNumber"
//               placeholder="MH-12-AB-1234"
//               value={vehicleDetails.vehicleNumber}
//               onChange={handleInputChange}
//               required
//             />
//             <ParkInput
//               label="Model & Colour"
//               name="vehicleModel"
//               placeholder="Red Swift / Black Honda City"
//               value={vehicleDetails.vehicleModel}
//               onChange={handleInputChange}
//               required
//             />
//             {/* Vehicle Type Selector */}
//             <div style={styles.inputGroup}>
//               <label style={styles.inputLabel}>Vehicle Type</label>
//               <select
//                 name="vehicleType"
//                 value={vehicleDetails.vehicleType}
//                 onChange={handleInputChange}
//                 style={{ ...styles.input, cursor: "pointer" }}
//               >
//                 <option value="CAR">🚗 Car</option>
//                 <option value="BIKE">🏍️ Bike</option>
//                 <option value="HEAVY">🚛 Heavy Vehicle</option>
//               </select>
//             </div>
//             <ParkInput
//               label="Contact Number"
//               name="contactNumber"
//               type="tel"
//               placeholder="Your mobile number"
//               value={vehicleDetails.contactNumber}
//               onChange={handleInputChange}
//               required
//             />
//             {currentPosition && (
//               <div style={styles.locationBadge}>
//                 <Navigation size={13} color="#C8FF00" />
//                 Location detected
//               </div>
//             )}
//             <button type="submit" style={styles.valetBtn} className="valet-btn">
//               Confirm Valet Request
//               <Zap size={16} />
//             </button>
//           </form>
//         )}

//         {status === "REQUESTING" && (
//           <div style={styles.valetCenter}>
//             <div style={styles.spinner} className="park-spinner" />
//             <p style={styles.valetSub}>Submitting your request…</p>
//           </div>
//         )}

//         {status === "ACTIVE_BOOKING" && activeBooking && (
//           <div style={styles.valetCenter}>
//             <div style={{ ...styles.valetIconBig, background: "#C8FF0018", border: "1px solid #C8FF0030" }}>
//               <Shield size={36} color="#C8FF00" />
//             </div>
            
//             <h3 style={styles.valetTitle}>
//               {activeBooking.status.replace(/_/g, " ")}
//             </h3>

//             {/* OTP DISPLAYS */}
//             {/* Show Pickup OTP as soon as booking is created (VALET_REQUESTED) OR when valet is assigned */}
//             {(activeBooking.status === "VALET_REQUESTED" || activeBooking.status === "VALET_ASSIGNED") && (
//               <div style={styles.otpBox}>
//                 <div style={styles.otpLabel}>🔑 Your Pickup OTP</div>
//                 <div style={styles.otpText}>{activeBooking.pickupOtp || "------"}</div>
//                 <p style={{ fontSize: 12, color: "#aaa", marginTop: 8 }}>
//                   Share this 6-digit code with the valet when they arrive to hand over your keys.
//                 </p>
//               </div>
//             )}

//             {activeBooking.status === "RETURN_REQUESTED" && (
//               <div style={{ ...styles.otpBox, background: "#FF6B3515", border: "1px dashed #FF6B35" }}>
//                 <div style={{ ...styles.otpLabel, color: "#FF6B35" }}>🔑 Your Dropoff OTP</div>
//                 <div style={styles.otpText}>{activeBooking.dropoffOtp || "------"}</div>
//                 <p style={{ fontSize: 12, color: "#aaa", marginTop: 8 }}>
//                   Share this 6-digit code with the valet to receive your keys back.
//                 </p>
//               </div>
//             )}

//             {/* Subtext based on status */}
//             {(activeBooking.status === "VALET_REQUESTED") && (
//               <p style={styles.valetSub}>Finding an available valet for you. Please wait...</p>
//             )}
//             {activeBooking.status === "VALET_PICKED_UP" && (
//               <p style={styles.valetSub}>The valet is currently parking your vehicle.</p>
//             )}
//             {activeBooking.status === "PARKED" && (
//               <p style={styles.valetSub}>Your car is safely parked in the lot.</p>
//             )}

//             <div style={styles.confirmBox}>
//               <div style={styles.confirmRow}>
//                 <span style={styles.confirmLabel}>Vehicle</span>
//                 <span style={styles.confirmValue}>{activeBooking.vehicleNumber}</span>
//               </div>
//               {activeBooking.valetId && (
//                 <div style={styles.confirmRow}>
//                   <span style={styles.confirmLabel}>Valet ID</span>
//                   <span style={styles.confirmValue}>#{activeBooking.valetId}</span>
//                 </div>
//               )}
//             </div>

//             {/* Actions based on status */}
//             {activeBooking.status === "PARKED" && (
//               <button
//                 onClick={handleRequestReturn}
//                 style={{ ...styles.valetBtn, background: "#FF6B35", color: "#fff", marginBottom: 12 }}
//                 className="valet-btn"
//               >
//                 Request Vehicle Return
//                 <Key size={16} />
//               </button>
//             )}

//             {activeBooking.status === "COMPLETED" && (
//               <button
//                 onClick={() => { setStatus("IDLE"); setActiveBooking(null); }}
//                 style={{ ...styles.valetBtn, background: "#C8FF00", color: "#000", marginBottom: 12 }}
//                 className="valet-btn"
//               >
//                 Start New Request
//               </button>
//             )}

//             {activeBooking.status !== "COMPLETED" && (
//               <button
//                 onClick={() => onDownload(activeBooking)}
//                 style={{ ...styles.valetBtn, background: "transparent", color: "#C8FF00", border: "1px solid #C8FF00" }}
//                 className="valet-btn"
//               >
//                 Download Pay Slip
//                 <CreditCard size={16} />
//               </button>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// /* ─────────────────────────────────────────────────────────────
//    REUSABLE INPUT
// ───────────────────────────────────────────────────────────── */
// function ParkInput({ label, ...props }) {
//   return (
//     <div style={styles.inputGroup}>
//       <label style={styles.inputLabel}>{label}</label>
//       <input style={styles.input} className="park-input" {...props} />
//     </div>
//   );
// }

// /* ─────────────────────────────────────────────────────────────
//    STYLES
// ───────────────────────────────────────────────────────────── */
// const styles = {
//   /* Loading */
//   loadingWrapper: {
//     minHeight: "100vh",
//     background: "#0A0A0A",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   loadingInner: { textAlign: "center" },
//   loadingLogo: {
//     width: 56,
//     height: 56,
//     borderRadius: 14,
//     background: "#C8FF0020",
//     border: "1px solid #C8FF0040",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     margin: "0 auto 16px",
//   },
//   loadingText: { color: "#666", fontSize: 14 },

//   /* App shell */
//   shell: { minHeight: "100vh", background: "#0A0A0A", color: "#fff" },

//   /* Modal */
//   modalBackdrop: {
//     position: "fixed",
//     inset: 0,
//     background: "rgba(0,0,0,0.85)",
//     backdropFilter: "blur(8px)",
//     zIndex: 999,
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     padding: 24,
//   },
//   modalCard: {
//     background: "#161616",
//     border: "1px solid #2e2e2e",
//     borderRadius: 20,
//     padding: 36,
//     width: "100%",
//     maxWidth: 420,
//   },
//   modalHeader: { textAlign: "center", marginBottom: 28 },
//   modalIconWrap: {
//     width: 52,
//     height: 52,
//     borderRadius: 14,
//     background: "#C8FF0018",
//     border: "1px solid #C8FF0035",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     margin: "0 auto 16px",
//   },
//   modalTitle: { fontSize: 22, fontWeight: 700, color: "#ffffff", marginBottom: 6 },
//   modalSubtitle: { fontSize: 14, color: "#aaa" },
//   modalForm: { display: "flex", flexDirection: "column", gap: 16 },
//   limeBtn: {
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     gap: 8,
//     background: "#C8FF00",
//     color: "#000",
//     border: "none",
//     borderRadius: 12,
//     padding: "14px 24px",
//     fontWeight: 700,
//     fontSize: 15,
//     cursor: "pointer",
//     marginTop: 8,
//   },

//   /* Hero */
//   hero: {
//     position: "relative",
//     padding: "60px 24px 0",
//     maxWidth: 1280,
//     margin: "0 auto",
//     overflow: "hidden",
//   },
//   heroGlow: {
//     position: "absolute",
//     top: 0,
//     left: "50%",
//     transform: "translateX(-50%)",
//     width: 600,
//     height: 300,
//     background: "radial-gradient(ellipse, #C8FF0015 0%, transparent 70%)",
//     pointerEvents: "none",
//   },
//   heroContent: { position: "relative", zIndex: 1 },
//   heroPill: {
//     display: "inline-flex",
//     alignItems: "center",
//     gap: 8,
//     background: "#C8FF0012",
//     border: "1px solid #C8FF0030",
//     borderRadius: 999,
//     padding: "6px 16px",
//     fontSize: 13,
//     color: "#C8FF00",
//     fontWeight: 600,
//     marginBottom: 20,
//   },
//   heroPillDot: {
//     width: 7,
//     height: 7,
//     borderRadius: "50%",
//     background: "#C8FF00",
//     animation: "pulse 2s ease-in-out infinite",
//   },
//   heroTitle: {
//     fontSize: "clamp(40px, 6vw, 72px)",
//     fontWeight: 800,
//     lineHeight: 1.05,
//     letterSpacing: "-2px",
//     color: "#fff",
//     marginBottom: 14,
//   },
//   heroAccent: { color: "#C8FF00" },
//   heroSub: { fontSize: 17, color: "#aaa", maxWidth: 440, marginBottom: 40 },

//   statsRow: {
//     display: "grid",
//     gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
//     gap: 16,
//     marginBottom: 60,
//   },
//   statCard: {
//     background: "#181818",
//     border: "1px solid #2e2e2e",
//     borderRadius: 16,
//     padding: "20px 24px",
//     display: "flex",
//     alignItems: "center",
//     gap: 16,
//     transition: "border-color 0.2s",
//   },
//   statIcon: {
//     width: 40,
//     height: 40,
//     borderRadius: 10,
//     background: "#C8FF0018",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     flexShrink: 0,
//   },
//   statValue: { fontSize: 26, fontWeight: 800, color: "#ffffff", lineHeight: 1 },
//   statLabel: { fontSize: 12, color: "#999", marginTop: 4 },

//   /* Services */
//   serviceSection: {
//     maxWidth: 1280,
//     margin: "0 auto",
//     padding: "0 24px 80px",
//   },
//   sectionLabel: {
//     fontSize: 12,
//     fontWeight: 600,
//     letterSpacing: "0.15em",
//     textTransform: "uppercase",
//     color: "#C8FF00",
//     marginBottom: 10,
//   },
//   sectionTitle: {
//     fontSize: "clamp(26px, 4vw, 40px)",
//     fontWeight: 800,
//     color: "#fff",
//     marginBottom: 36,
//     letterSpacing: "-1px",
//   },
//   serviceGrid: {
//     display: "grid",
//     gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
//     gap: 20,
//   },
//   svcCard: {
//     background: "#161616",
//     border: "1px solid #2a2a2a",
//     borderRadius: 20,
//     padding: "28px 24px 24px",
//     textAlign: "left",
//     cursor: "pointer",
//     position: "relative",
//     transition: "border-color 0.25s, transform 0.2s",
//   },
//   svcIconWrap: {
//     width: 52,
//     height: 52,
//     borderRadius: 14,
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     marginBottom: 16,
//   },
//   svcTag: {
//     display: "inline-block",
//     fontSize: 11,
//     fontWeight: 700,
//     letterSpacing: "0.08em",
//     padding: "4px 10px",
//     borderRadius: 999,
//     marginBottom: 12,
//     textTransform: "uppercase",
//   },
//   svcTitle: {
//     fontSize: 20,
//     fontWeight: 700,
//     color: "#fff",
//     marginBottom: 10,
//   },
//   svcDesc: { fontSize: 14, color: "#999", lineHeight: 1.6, marginBottom: 20 },
//   svcArrow: {
//     display: "flex",
//     alignItems: "center",
//     transition: "transform 0.2s",
//   },

//   /* Panel */
//   panelSection: {
//     maxWidth: 1280,
//     margin: "0 auto",
//     padding: "0 24px 80px",
//   },
//   backBtn: {
//     background: "transparent",
//     border: "1px solid #333",
//     color: "#aaa",
//     borderRadius: 10,
//     padding: "8px 16px",
//     fontSize: 13,
//     cursor: "pointer",
//     marginBottom: 28,
//     transition: "color 0.2s, border-color 0.2s",
//   },
//   panelHeader: {
//     display: "flex",
//     alignItems: "center",
//     gap: 16,
//     marginBottom: 28,
//   },
//   panelIconWrap: {
//     width: 46,
//     height: 46,
//     borderRadius: 12,
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     flexShrink: 0,
//   },
//   panelTitle: { fontSize: 22, fontWeight: 700, color: "#fff" },
//   panelSub: { fontSize: 14, color: "#999", marginTop: 3 },

//   /* Map */
//   mapWrap: {
//     borderRadius: 18,
//     border: "1px solid #1c1c1c",
//     marginBottom: 24,
//     height: 500,
//     position: "relative",
//     zIndex: 0,
//   },

//   /* Book layout */
//   bookGrid: {
//     display: "grid",
//     gridTemplateColumns: "1fr 340px",
//     gap: 20,
//     alignItems: "start",
//   },
//   bookList: {
//     display: "flex",
//     flexDirection: "column",
//     gap: 12,
//     maxHeight: 500,
//     overflowY: "auto",
//   },

//   /* Lots grid */
//   lotsGrid: {
//     display: "grid",
//     gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
//     gap: 16,
//   },
//   lotCard: {
//   background: "#161616",
//   borderWidth: "1px",       // ✅ use longhand
//   borderStyle: "solid",     // ✅ use longhand
//   borderColor: "#242424",   // ✅ use longhand — now safe to override
//   borderRadius: 16,
//   padding: 20,
//   transition: "border-color 0.2s, transform 0.2s, background 0.2s",
// },
// lotCardHovered: {
//   borderColor: "#C8FF0060", // ✅ no conflict now
//   transform: "translateY(-2px)",
//   background: "#1e1e1e",
// },
//   lotCardTop: {
//     display: "flex",
//     alignItems: "center",
//     gap: 8,
//     marginBottom: 8,
//   },
//   lotDot: {
//     width: 8,
//     height: 8,
//     borderRadius: "50%",
//     background: "#4ade80",
//     flexShrink: 0,
//     boxShadow: "0 0 6px #4ade8090",
//   },
//   lotAvail: { fontSize: 12, color: "#4ade80", fontWeight: 600 },
//   lotName: { fontSize: 15, fontWeight: 700, color: "#ffffff", marginBottom: 6 },
//   lotMeta: { display: "flex", alignItems: "center", gap: 5, marginBottom: 12 },
//   lotAddr: { fontSize: 12, color: "#aaa" },
//   lotPrice: { fontSize: 22, fontWeight: 800, color: "#ffffff", marginBottom: 14 },
//   lotPriceUnit: { fontSize: 13, fontWeight: 400, color: "#888" },
//   lotBtn: {
//     display: "flex",
//     alignItems: "center",
//     gap: 6,
//     width: "100%",
//     justifyContent: "center",
//     border: "none",
//     borderRadius: 10,
//     padding: "10px 0",
//     fontWeight: 700,
//     fontSize: 13,
//     cursor: "pointer",
//   },

//   /* Valet & OTP */
//   valetWrap: { maxWidth: 520, margin: "0 auto" },
//   valetCard: {
//     background: "#161616",
//     border: "1px solid #2a2a2a",
//     borderRadius: 20,
//     padding: 36,
//   },
//   valetCenter: { textAlign: "center" },
//   valetIconBig: {
//     width: 72,
//     height: 72,
//     borderRadius: 20,
//     background: "#FF6B3518",
//     border: "1px solid #FF6B3530",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     margin: "0 auto 20px",
//   },
//   valetTitle: {
//     fontSize: 24,
//     fontWeight: 700,
//     color: "#fff",
//     marginBottom: 10,
//     textTransform: "capitalize"
//   },
//   valetSub: { fontSize: 14, color: "#aaa", lineHeight: 1.6, marginBottom: 24 },
//   valetFeatures: {
//     display: "flex",
//     flexDirection: "column",
//     gap: 10,
//     marginBottom: 28,
//     textAlign: "left",
//     background: "#FF6B3510",
//     border: "1px solid #FF6B3525",
//     borderRadius: 12,
//     padding: "16px 20px",
//   },
//   valetFeatureRow: { display: "flex", alignItems: "center", gap: 10 },
//   valetFeatureText: { fontSize: 13, color: "#ccc" },
//   valetBtn: {
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     gap: 8,
//     width: "100%",
//     background: "#FF6B35",
//     color: "#fff",
//     border: "none",
//     borderRadius: 12,
//     padding: "14px 24px",
//     fontWeight: 700,
//     fontSize: 15,
//     cursor: "pointer",
//   },
//   valetForm: { display: "flex", flexDirection: "column", gap: 16 },
//   formBack: {
//     background: "transparent",
//     border: "none",
//     color: "#aaa",
//     fontSize: 13,
//     cursor: "pointer",
//     textAlign: "left",
//     padding: 0,
//     marginBottom: 8,
//   },
//   locationBadge: {
//     display: "flex",
//     alignItems: "center",
//     gap: 8,
//     background: "#C8FF0010",
//     border: "1px solid #C8FF0025",
//     borderRadius: 10,
//     padding: "10px 14px",
//     fontSize: 13,
//     color: "#C8FF00",
//     fontWeight: 600,
//   },
//   confirmBox: {
//     background: "#1a1a1a",
//     border: "1px solid #2e2e2e",
//     borderRadius: 12,
//     padding: 20,
//     marginBottom: 20,
//     width: "100%",
//   },
//   confirmRow: {
//     display: "flex",
//     justifyContent: "space-between",
//     marginBottom: 10,
//   },
//   confirmLabel: { fontSize: 13, color: "#888" },
//   confirmValue: { fontSize: 13, color: "#eee", fontWeight: 600 },
  
//   // New OTP Styles
//   otpBox: {
//     background: "#C8FF0015",
//     border: "1px dashed #C8FF00",
//     borderRadius: 12,
//     padding: "20px",
//     textAlign: "center",
//     marginBottom: "24px"
//   },
//   otpLabel: { 
//     fontSize: 12, 
//     color: "#C8FF00", 
//     textTransform: "uppercase", 
//     letterSpacing: 1, 
//     marginBottom: 8,
//     fontWeight: 700
//   },
//   otpText: { 
//     fontSize: 36, 
//     fontWeight: 800, 
//     color: "#fff", 
//     letterSpacing: 8 
//   },

//   /* Spinner */
//   spinner: {
//     width: 48,
//     height: 48,
//     borderRadius: "50%",
//     border: "3px solid #1a1a1a",
//     borderTopColor: "#FF6B35",
//     margin: "0 auto 20px",
//   },

//   /* Input */
//   inputGroup: { display: "flex", flexDirection: "column", gap: 6 },
//   inputLabel: { fontSize: 13, fontWeight: 600, color: "#bbb" },
//   input: {
//     background: "#1a1a1a",
//     border: "1px solid #333",
//     borderRadius: 10,
//     padding: "12px 14px",
//     fontSize: 14,
//     color: "#fff",
//     outline: "none",
//     width: "100%",
//     boxSizing: "border-box",
//   },
// };

// /* ─────────────────────────────────────────────────────────────
//    GLOBAL CSS (animations + hover effects)
// ───────────────────────────────────────────────────────────── */
// const globalCSS = `
//   @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&display=swap');

//   body { font-family: 'Syne', sans-serif; margin: 0; }

//   @keyframes pulse {
//     0%, 100% { opacity: 1; transform: scale(1); }
//     50% { opacity: 0.5; transform: scale(0.85); }
//   }

//   .park-spinner { animation: spin 0.8s linear infinite; }
//   @keyframes spin { to { transform: rotate(360deg); } }

//   .svc-card:hover {
//     border-color: var(--accent, #C8FF00) !important;
//     transform: translateY(-4px);
//   }
//   .svc-card:hover .svc-arrow {
//     transform: translateX(4px);
//   }

//   .stat-card:hover { border-color: #C8FF0030 !important; }

//   .back-btn:hover { color: #fff !important; border-color: #444 !important; }

//   .park-input:focus {
//     border-color: #C8FF00 !important;
//     box-shadow: 0 0 0 3px #C8FF0015;
//   }

//   .lime-btn:hover, .valet-btn:hover, .lot-btn:hover {
//     opacity: 0.88;
//     transform: translateY(-1px);
//   }

//   .park-modal {
//     animation: modalIn 0.25s ease;
//   }
//   @keyframes modalIn {
//     from { opacity: 0; transform: scale(0.97) translateY(8px); }
//     to   { opacity: 1; transform: scale(1) translateY(0); }
//   }

//   /* ── RESPONSIVE ── */
//   @media (max-width: 900px) {
//     .book-grid-wrap {
//       grid-template-columns: 1fr !important;
//     }
//     .map-wrap-inner {
//       height: 320px !important;
//     }
//   }
//   @media (max-width: 600px) {
//     .service-grid-wrap {
//       grid-template-columns: 1fr !important;
//     }
//     .stats-row-wrap {
//       grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)) !important;
//     }
//     .hero-section {
//       padding: 40px 16px 0 !important;
//     }
//     .service-section-wrap {
//       padding: 0 16px 60px !important;
//     }
//     .panel-section-wrap {
//       padding: 0 16px 60px !important;
//     }
//   }

// `;

// export default UserDashboard;

// import { useEffect, useState, useCallback } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import jsPDF from "jspdf";
// import {
//   Car,
//   Clock,
//   CreditCard,
//   MapPin,
//   Navigation,
//   Shield,
//   Zap,
//   Search,
//   CalendarCheck,
//   Star,
//   ChevronRight,
//   ArrowRight,
//   User,
//   Phone,
//   TrendingUp,
//   CheckCircle,
//   Key // 👈 Added Key icon for OTPs
// } from "lucide-react";
// import UserNavbar from "../../components/navbar/UserNavbar";
// import CustomMap from "../../components/map/MapContainer";
// import ParkingLotBooking from "../../pages/parking/ParkingLotBooking";

// /* ─────────────────────────────────────────────────────────────
//    MAIN DASHBOARD
// ───────────────────────────────────────────────────────────── */
// function UserDashboard() {
//   const [lots, setLots] = useState([]);
//   const [mode, setMode] = useState(null);
//   const [userId, setUserId] = useState(null);
//   const [selectedLot, setSelectedLot] = useState(null);
//   const [currentPosition, setCurrentPosition] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [hoveredLotId, setHoveredLotId] = useState(null);
//   const [focusedLot, setFocusedLot] = useState(null); // Added state for map focus
//   const [stats, setStats] = useState({ bookings: 0, hours: 0, savings: 0 });
//   const [showProfileModal, setShowProfileModal] = useState(false);
//   const [profileData, setProfileData] = useState({
//     name: "",
//     email: "",
//     phoneNumber: "",
//     password: "",
//   });

//   const navigate = useNavigate();

//   /* PDF pay-slip */
//   const generatePaySlip = (vehicleDetails) => {
//     const doc = new jsPDF();
//     const uniqueCode = `PRK-${userId}-${Date.now().toString().slice(-6)}`;
//     doc.setFontSize(22);
//     doc.setTextColor(37, 99, 235);
//     doc.text("PARKING PAY SLIP", 105, 30, { align: "center" });
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
//     doc.setFillColor(248, 250, 252);
//     doc.rect(20, 130, 170, 30, "F");
//     doc.setFontSize(16);
//     doc.setFont("helvetica", "bold");
//     doc.text(`VERIFICATION CODE: ${uniqueCode}`, 105, 150, { align: "center" });
//     doc.save(`ParkingSlip_${uniqueCode}.pdf`);
//   };

//   const calculateStats = useCallback(() => {
//     setStats({ bookings: 12, hours: 36, savings: 240 });
//   }, []);

//   useEffect(() => {
//     const fetchUserAndLots = async () => {
//       setLoading(true);
//       try {
//         const token = localStorage.getItem("token");
//         if (!token || token === "undefined" || token === "null") {
//           navigate("/login");
//           return;
//         }
//         const config = {
//           headers: { Authorization: `Bearer ${token}` },
//           withCredentials: true,
//         };
//         const [userRes, lotsRes] = await Promise.all([
//           axios.get("http://localhost:8080/api/users/me", config),
//           axios.get("http://localhost:8080/api/parking-lots", config),
//         ]);
//         if (userRes.data) {
//           const userData = userRes.data;
//           setUserId(userData.id);
//           localStorage.setItem("userId", userData.id);
//           if (!userData.phoneNumber) {
//             setProfileData({
//               name: userData.name || "",
//               email: userData.email,
//               phoneNumber: "",
//               password: "",
//             });
//             setShowProfileModal(true);
//           }
//         }
//         if (lotsRes.data) setLots(lotsRes.data);
//         calculateStats();
//       } catch (err) {
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
//         (pos) =>
//           setCurrentPosition({
//             lat: pos.coords.latitude,
//             lng: pos.coords.longitude,
//           }),
//         (err) => console.error("Location error:", err)
//       );
//     }
//   }, [navigate, calculateStats]);

//   const handleUpdateProfile = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.put(
//         "http://localhost:8080/api/users/me",
//         {
//           name: profileData.name,
//           phoneNumber: profileData.phoneNumber,
//           password: profileData.password,
//         },
//         { withCredentials: true }
//       );
//       setShowProfileModal(true);
//     } catch {
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

//   if (loading) {
//     return (
//       <div style={styles.loadingWrapper}>
//         <div style={styles.loadingInner}>
//           <div style={styles.loadingLogo}>
//             <Car size={28} color="#C8FF00" />
//           </div>
//           <p style={styles.loadingText}>Loading your dashboard…</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <>
//       <style>{globalCSS}</style>

//       {/* ── Profile completion modal ── */}
//       {showProfileModal && (
//         <div style={styles.modalBackdrop}>
//           <div style={styles.modalCard} className="park-modal">
//             <div style={styles.modalHeader}>
//               <div style={styles.modalIconWrap}>
//                 <User size={24} color="#C8FF00" />
//               </div>
//               <h2 style={styles.modalTitle}>Complete Your Profile</h2>
//               <p style={styles.modalSubtitle}>
//                 A few more details to unlock all features
//               </p>
//             </div>
//             <form onSubmit={handleUpdateProfile} style={styles.modalForm}>
//               <ParkInput
//                 label="Full Name"
//                 placeholder="John Doe"
//                 value={profileData.name}
//                 onChange={(e) =>
//                   setProfileData({ ...profileData, name: e.target.value })
//                 }
//               />
//               <ParkInput
//                 label="Phone Number"
//                 placeholder="+91 9876543210"
//                 value={profileData.phoneNumber}
//                 onChange={(e) =>
//                   setProfileData({
//                     ...profileData,
//                     phoneNumber: e.target.value,
//                   })
//                 }
//                 required
//               />
//               <ParkInput
//                 label="Set a Password"
//                 type="password"
//                 placeholder="Min. 8 characters"
//                 value={profileData.password}
//                 onChange={(e) =>
//                   setProfileData({ ...profileData, password: e.target.value })
//                 }
//               />
//               <button type="submit" style={styles.limeBtn} className="lime-btn">
//                 Save & Continue
//                 <ArrowRight size={16} />
//               </button>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* ── App shell ── */}
//       <div style={styles.shell}>
//         <UserNavbar />

//         {/* ── HERO ── */}
//         <section style={styles.hero}>
//           <div style={styles.heroGlow} />
//           <div style={styles.heroContent}>
//             <span style={styles.heroPill}>
//               <span style={styles.heroPillDot} />
//               Live Dashboard
//             </span>
//             <h1 style={styles.heroTitle}>
//               Park <span style={styles.heroAccent}>Smarter.</span>
//             </h1>
//             <p style={styles.heroSub}>
//               Find a spot, book a slot, or call a valet — all in one place.
//             </p>
//           </div>

//           <div style={styles.statsRow}>
//             {[
//               { label: "Total Bookings", value: stats.bookings, icon: <CalendarCheck size={18} color="#C8FF00" /> },
//               { label: "Hours Parked", value: stats.hours, icon: <Clock size={18} color="#C8FF00" /> },
//               { label: "Savings (₹)", value: stats.savings, icon: <TrendingUp size={18} color="#C8FF00" /> },
//             ].map((s) => (
//               <div key={s.label} style={styles.statCard} className="stat-card">
//                 <div style={styles.statIcon}>{s.icon}</div>
//                 <div>
//                   <div style={styles.statValue}>{s.value}</div>
//                   <div style={styles.statLabel}>{s.label}</div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </section>

//         {/* ── SERVICE SELECTOR ── */}
//         {!mode && (
//           <section style={styles.serviceSection}>
//             <p style={styles.sectionLabel}>Choose a Service</p>
//             <h2 style={styles.sectionTitle}>What do you need today?</h2>

//             <div style={styles.serviceGrid}>
//               <ServiceCard
//                 icon={<Search size={28} />}
//                 tag="Instant"
//                 title="Self Parking"
//                 description="Browse lots near you on a live map and navigate directly to an open spot."
//                 accent="#C8FF00"
//                 onClick={() => setMode("self")}
//               />
//               <ServiceCard
//                 icon={<CalendarCheck size={28} />}
//                 tag="Reserved"
//                 title="Book a Slot"
//                 description="Reserve a specific bay for your vehicle in advance and pay securely online."
//                 accent="#00D4FF"
//                 onClick={() => setMode("book")}
//               />
//               <ServiceCard
//                 icon={<Zap size={28} />}
//                 tag="Premium"
//                 title="Valet Service"
//                 description="A trained valet comes to you, parks and retrieves your vehicle on demand."
//                 accent="#FF6B35"
//                 onClick={() => setMode("valet")}
//               />
//             </div>
//           </section>
//         )}

//         {/* ── ACTIVE MODE PANEL ── */}
//         {mode && (
//           <section style={styles.panelSection}>
//             <button
//               onClick={() => { setMode(null); setSelectedLot(null); setFocusedLot(null); }}
//               style={styles.backBtn}
//               className="back-btn"
//             >
//               ← Back to Services
//             </button>

//             {/* SELF PARKING */}
//             {mode === "self" && (
//               <div>
//                 <PanelHeader
//                   icon={<Search size={22} color="#C8FF00" />}
//                   title="Self Parking"
//                   subtitle="Tap a lot to get directions"
//                   accent="#C8FF00"
//                 />
//                 <div style={styles.mapWrap}>
//                   <CustomMap
//                     lots={lots}
//                     onSelectLot={(lot) => openNavigation(lot)}
//                     hoveredLotId={hoveredLotId}
//                     focusedLot={focusedLot}
//                     center={focusedLot ? { lat: focusedLot.latitude, lng: focusedLot.longitude } : currentPosition}
//                   />
//                 </div>
//                 {lots.length > 0 && (
//                   <div style={styles.lotsGrid}>
//                     {lots.map((lot) => (
//                       <LotCard
//                         key={lot.id}
//                         lot={lot}
//                         isHovered={hoveredLotId === lot.id}
//                         onHover={() => {
//                           setHoveredLotId(lot.id);
//                           setFocusedLot(lot);
//                         }}
//                         onLeave={() => setHoveredLotId(null)}
//                         onClick={() => setFocusedLot(lot)}
//                         onNavigate={() => openNavigation(lot)}
//                       />
//                     ))}
//                   </div>
//                 )}
//               </div>
//             )}

//             {/* BOOK A SLOT */}
//             {mode === "book" && (
//               <div>
//                 <PanelHeader
//                   icon={<CalendarCheck size={22} color="#00D4FF" />}
//                   title="Book a Slot"
//                   subtitle="Select a lot on the map or from the list below"
//                   accent="#00D4FF"
//                 />
//                 {selectedLot ? (
//                   <ParkingLotBooking
//                     lot={selectedLot}
//                     user={{ id: userId }}
//                     onClose={() => setSelectedLot(null)}
//                   />
//                 ) : (
//                   <>
//                     <div style={styles.bookGrid}>
//                       {/* Map column */}
//                       <div style={styles.mapWrap}>
//                         <CustomMap
//                           lots={lots}
//                           onSelectLot={(lot) => {
//                             setSelectedLot(lot);
//                             setFocusedLot(lot);
//                           }}
//                           hoveredLotId={hoveredLotId}
//                           focusedLot={focusedLot}
//                           center={focusedLot ? { lat: focusedLot.latitude, lng: focusedLot.longitude } : currentPosition}
//                         />
//                       </div>
//                       {/* Lots list column */}
//                       <div style={styles.bookList}>
//                         {lots.map((lot) => (
//                           <LotCard
//                             key={lot.id}
//                             lot={lot}
//                             accent="#00D4FF"
//                             actionLabel="Book Now"
//                             isHovered={hoveredLotId === lot.id}
//                             onHover={() => {
//                               setHoveredLotId(lot.id);
//                               setFocusedLot(lot);
//                             }}
//                             onLeave={() => setHoveredLotId(null)}
//                             onClick={() => setFocusedLot(lot)}
//                             onNavigate={() => setSelectedLot(lot)}
//                           />
//                         ))}
//                       </div>
//                     </div>
//                   </>
//                 )}
//               </div>
//             )}

//             {/* VALET */}
//             {mode === "valet" && (
//               <div>
//                 <PanelHeader
//                   icon={<Zap size={22} color="#FF6B35" />}
//                   title="Valet Service"
//                   subtitle="Premium door-to-door parking"
//                   accent="#FF6B35"
//                 />
//                 <ValetRequestPanel
//                   userId={userId}
//                   currentPosition={currentPosition}
//                   onDownload={generatePaySlip}
//                 />
//               </div>
//             )}
//           </section>
//         )}
//       </div>
//     </>
//   );
// }

// /* ─────────────────────────────────────────────────────────────
//    SERVICE CARD
// ───────────────────────────────────────────────────────────── */
// function ServiceCard({ icon, tag, title, description, accent, onClick }) {
//   return (
//     <button
//       onClick={onClick}
//       style={{ ...styles.svcCard, "--accent": accent }}
//       className="svc-card"
//     >
//       <div style={{ ...styles.svcIconWrap, background: `${accent}18`, border: `1px solid ${accent}30` }}>
//         <span style={{ color: accent }}>{icon}</span>
//       </div>
//       <span style={{ ...styles.svcTag, color: accent, background: `${accent}15` }}>{tag}</span>
//       <h3 style={styles.svcTitle}>{title}</h3>
//       <p style={styles.svcDesc}>{description}</p>
//       <div style={{ ...styles.svcArrow, color: accent }} className="svc-arrow">
//         <ChevronRight size={20} />
//       </div>
//     </button>
//   );
// }

// /* ─────────────────────────────────────────────────────────────
//    PANEL HEADER
// ───────────────────────────────────────────────────────────── */
// function PanelHeader({ icon, title, subtitle, accent }) {
//   return (
//     <div style={styles.panelHeader}>
//       <div style={{ ...styles.panelIconWrap, background: `${accent}18`, border: `1px solid ${accent}30` }}>
//         {icon}
//       </div>
//       <div>
//         <h2 style={styles.panelTitle}>{title}</h2>
//         <p style={styles.panelSub}>{subtitle}</p>
//       </div>
//     </div>
//   );
// }

// /* ─────────────────────────────────────────────────────────────
//    LOT CARD
// ───────────────────────────────────────────────────────────── */
// function LotCard({ lot, isHovered, onHover, onLeave, onClick, onNavigate, accent = "#C8FF00", actionLabel = "Navigate" }) {
//   const available = lot.availableSpots ?? lot.capacity ?? "?";
//   return (
//     <div
//       onClick={onClick}
//       style={{
//         ...styles.lotCard,
//         ...(isHovered ? styles.lotCardHovered : {}),
//         cursor: onClick ? "pointer" : "default"
//       }}
//       onMouseEnter={onHover}
//       onMouseLeave={onLeave}
//     >
//       <div style={styles.lotCardTop}>
//         <div style={styles.lotDot} />
//         <span style={styles.lotAvail}>{available} spots</span>
//       </div>
//       <h4 style={styles.lotName}>{lot.name}</h4>
//       <div style={styles.lotMeta}>
//         <MapPin size={12} color="#666" />
//         <span style={styles.lotAddr}>{lot.address || "Location on map"}</span>
//       </div>
//       {lot.pricePerHour && (
//         <div style={styles.lotPrice}>
//           ₹{lot.pricePerHour}
//           <span style={styles.lotPriceUnit}>/hr</span>
//         </div>
//       )}
//       <button
//         onClick={(e) => {
//           e.stopPropagation();
//           onNavigate();
//         }}
//         style={{ ...styles.lotBtn, background: accent, color: accent === "#C8FF00" ? "#000" : "#fff" }}
//         className="lot-btn"
//       >
//         {actionLabel}
//         <ArrowRight size={14} />
//       </button>
//     </div>
//   );
// }

// /* ─────────────────────────────────────────────────────────────
//    VALET PANEL (UPDATED WITH OTP FLOW)
// ───────────────────────────────────────────────────────────── */
// function ValetRequestPanel({ userId, currentPosition, onDownload }) {
//   const [status, setStatus] = useState("IDLE");
//   const [activeBooking, setActiveBooking] = useState(null);
//   const [vehicleDetails, setVehicleDetails] = useState({
//     vehicleNumber: "",
//     vehicleModel: "",
//     vehicleType: "CAR",
//     contactNumber: "",
//   });

//   const handleInputChange = (e) => {
//     setVehicleDetails({ ...vehicleDetails, [e.target.name]: e.target.value });
//   };

//   // Poll for booking updates if we have an active booking
//   useEffect(() => {
//     let interval;
//     if (status === "ACTIVE_BOOKING" && activeBooking && activeBooking.status !== "COMPLETED") {
//       interval = setInterval(async () => {
//         try {
//           const token = localStorage.getItem("token");
//           const res = await axios.get(`http://localhost:8080/api/bookings/${activeBooking.id}`, {
//             headers: { Authorization: `Bearer ${token}` }
//           });
//           setActiveBooking(res.data);
//         } catch (err) {
//           console.error("Failed to fetch booking status", err);
//         }
//       }, 5000); // Check every 5 seconds
//     }
//     return () => clearInterval(interval);
//   }, [status, activeBooking]);

// const handleRequestValet = async (e) => {
//   e.preventDefault();

//   let rawUserId = userId || localStorage.getItem("userId");

//   if (!rawUserId || rawUserId === "null" || rawUserId === "undefined") {
//     alert("User session not found. Please log out and log in again.");
//     return;
//   }

//   if (!currentPosition) {
//     alert("Getting your location...");
//     return;
//   }

//   setStatus("REQUESTING");

//   try {
//     const token = localStorage.getItem("token");

//     const payload = {
//       userId: parseInt(rawUserId, 10),
//       vehicleNumber: vehicleDetails.vehicleNumber,
//       vehicleModel: vehicleDetails.vehicleModel,
//       vehicleType: vehicleDetails.vehicleType || "CAR",
//       contactNumber: vehicleDetails.contactNumber,
//       pickupLat: currentPosition.lat,
//       pickupLng: currentPosition.lng,
//       status: "VALET_REQUESTED",
//       serviceType: "VALET",
//     };

//     console.log("SENDING PAYLOAD:", payload);

//     const res = await axios.post(
//       "http://localhost:8080/api/bookings",
//       payload,
//       { headers: { Authorization: `Bearer ${token}` } }
//     );

//     setActiveBooking(res.data);
//     setStatus("ACTIVE_BOOKING");

//   } catch (err) {
//     console.error("BOOKING ERROR:", err.response?.data || err);
//     setStatus("FORM");
//     alert("Server error. Please try again.");
//   }
// };

//   const handleRequestReturn = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const res = await axios.post(
//         `http://localhost:8080/api/bookings/${activeBooking.id}/request-return`,
//         {},
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       // The backend returns { message: "...", booking: {...} }
//       setActiveBooking(res.data.booking || res.data);
//     } catch (err) {
//       alert("Failed to request return: " + (err.response?.data?.error || err.message));
//     }
//   };

//   return (
//     <div style={styles.valetWrap}>
//       <div style={styles.valetCard}>
//         {status === "IDLE" && (
//           <div style={styles.valetCenter}>
//             <div style={styles.valetIconBig}>
//               <Zap size={36} color="#FF6B35" />
//             </div>
//             <h3 style={styles.valetTitle}>Premium Valet</h3>
//             <p style={styles.valetSub}>
//               Our trained valet will come to your current location, park and
//               retrieve your vehicle on demand.
//             </p>
//             <div style={styles.valetFeatures}>
//               {["Licensed professionals", "Real-time tracking", "Instant confirmation"].map((f) => (
//                 <div key={f} style={styles.valetFeatureRow}>
//                   <CheckCircle size={15} color="#FF6B35" />
//                   <span style={styles.valetFeatureText}>{f}</span>
//                 </div>
//               ))}
//             </div>
//             <button
//               onClick={() => setStatus("FORM")}
//               disabled={!currentPosition}
//               style={{
//                 ...styles.valetBtn,
//                 opacity: currentPosition ? 1 : 0.5,
//                 cursor: currentPosition ? "pointer" : "not-allowed",
//               }}
//               className="valet-btn"
//             >
//               {currentPosition ? "Request Valet" : "Detecting location…"}
//               <Zap size={16} />
//             </button>
//           </div>
//         )}

//         {status === "FORM" && (
//           <form onSubmit={handleRequestValet} style={styles.valetForm}>
//             <button
//               type="button"
//               onClick={() => setStatus("IDLE")}
//               style={styles.formBack}
//             >
//               ← Back
//             </button>
//             <h3 style={styles.valetTitle}>Vehicle Details</h3>
//             <ParkInput
//               label="Vehicle Number"
//               name="vehicleNumber"
//               placeholder="MH-12-AB-1234"
//               value={vehicleDetails.vehicleNumber}
//               onChange={handleInputChange}
//               required
//             />
//             <ParkInput
//               label="Model & Colour"
//               name="vehicleModel"
//               placeholder="Red Swift / Black Honda City"
//               value={vehicleDetails.vehicleModel}
//               onChange={handleInputChange}
//               required
//             />
//             {/* Vehicle Type Selector */}
//             <div style={styles.inputGroup}>
//               <label style={styles.inputLabel}>Vehicle Type</label>
//               <select
//                 name="vehicleType"
//                 value={vehicleDetails.vehicleType}
//                 onChange={handleInputChange}
//                 style={{ ...styles.input, cursor: "pointer" }}
//               >
//                 <option value="CAR">🚗 Car</option>
//                 <option value="BIKE">🏍️ Bike</option>
//                 <option value="HEAVY">🚛 Heavy Vehicle</option>
//               </select>
//             </div>
//             <ParkInput
//               label="Contact Number"
//               name="contactNumber"
//               type="tel"
//               placeholder="Your mobile number"
//               value={vehicleDetails.contactNumber}
//               onChange={handleInputChange}
//               required
//             />
//             {currentPosition && (
//               <div style={styles.locationBadge}>
//                 <Navigation size={13} color="#C8FF00" />
//                 Location detected
//               </div>
//             )}
//             <button type="submit" style={styles.valetBtn} className="valet-btn">
//               Confirm Valet Request
//               <Zap size={16} />
//             </button>
//           </form>
//         )}

//         {status === "REQUESTING" && (
//           <div style={styles.valetCenter}>
//             <div style={styles.spinner} className="park-spinner" />
//             <p style={styles.valetSub}>Submitting your request…</p>
//           </div>
//         )}

//         {status === "ACTIVE_BOOKING" && activeBooking && (
//           <div style={styles.valetCenter}>
//             <div style={{ ...styles.valetIconBig, background: "#C8FF0018", border: "1px solid #C8FF0030" }}>
//               <Shield size={36} color="#C8FF00" />
//             </div>
            
//             <h3 style={styles.valetTitle}>
//               {activeBooking.status.replace(/_/g, " ")}
//             </h3>

//             {/* OTP DISPLAYS */}
//             {/* Show Pickup OTP as soon as booking is created (VALET_REQUESTED) OR when valet is assigned */}
//             {(activeBooking.status === "VALET_REQUESTED" || activeBooking.status === "VALET_ASSIGNED") && (
//               <div style={styles.otpBox}>
//                 <div style={styles.otpLabel}>🔑 Your Pickup OTP</div>
//                 <div style={styles.otpText}>{activeBooking.pickupOtp || "------"}</div>
//                 <p style={{ fontSize: 12, color: "#aaa", marginTop: 8 }}>
//                   Share this 6-digit code with the valet when they arrive to hand over your keys.
//                 </p>
//               </div>
//             )}

//             {activeBooking.status === "RETURN_REQUESTED" && (
//               <div style={{ ...styles.otpBox, background: "#FF6B3515", border: "1px dashed #FF6B35" }}>
//                 <div style={{ ...styles.otpLabel, color: "#FF6B35" }}>🔑 Your Dropoff OTP</div>
//                 <div style={styles.otpText}>{activeBooking.dropoffOtp || "------"}</div>
//                 <p style={{ fontSize: 12, color: "#aaa", marginTop: 8 }}>
//                   Share this 6-digit code with the valet to receive your keys back.
//                 </p>
//               </div>
//             )}

//             {/* Subtext based on status */}
//             {(activeBooking.status === "VALET_REQUESTED") && (
//               <p style={styles.valetSub}>Finding an available valet for you. Please wait...</p>
//             )}
//             {activeBooking.status === "VALET_PICKED_UP" && (
//               <p style={styles.valetSub}>The valet is currently parking your vehicle.</p>
//             )}
//             {activeBooking.status === "PARKED" && (
//               <p style={styles.valetSub}>Your car is safely parked in the lot.</p>
//             )}

//             <div style={styles.confirmBox}>
//               <div style={styles.confirmRow}>
//                 <span style={styles.confirmLabel}>Vehicle</span>
//                 <span style={styles.confirmValue}>{activeBooking.vehicleNumber}</span>
//               </div>
//               {activeBooking.valetId && (
//                 <div style={styles.confirmRow}>
//                   <span style={styles.confirmLabel}>Valet ID</span>
//                   <span style={styles.confirmValue}>#{activeBooking.valetId}</span>
//                 </div>
//               )}
//             </div>

//             {/* Actions based on status */}
//             {activeBooking.status === "PARKED" && (
//               <button
//                 onClick={handleRequestReturn}
//                 style={{ ...styles.valetBtn, background: "#FF6B35", color: "#fff", marginBottom: 12 }}
//                 className="valet-btn"
//               >
//                 Request Vehicle Return
//                 <Key size={16} />
//               </button>
//             )}

//             {activeBooking.status === "COMPLETED" && (
//               <button
//                 onClick={() => { setStatus("IDLE"); setActiveBooking(null); }}
//                 style={{ ...styles.valetBtn, background: "#C8FF00", color: "#000", marginBottom: 12 }}
//                 className="valet-btn"
//               >
//                 Start New Request
//               </button>
//             )}

//             {activeBooking.status !== "COMPLETED" && (
//               <button
//                 onClick={() => onDownload(activeBooking)}
//                 style={{ ...styles.valetBtn, background: "transparent", color: "#C8FF00", border: "1px solid #C8FF00" }}
//                 className="valet-btn"
//               >
//                 Download Pay Slip
//                 <CreditCard size={16} />
//               </button>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// /* ─────────────────────────────────────────────────────────────
//    REUSABLE INPUT
// ───────────────────────────────────────────────────────────── */
// function ParkInput({ label, ...props }) {
//   return (
//     <div style={styles.inputGroup}>
//       <label style={styles.inputLabel}>{label}</label>
//       <input style={styles.input} className="park-input" {...props} />
//     </div>
//   );
// }

// /* ─────────────────────────────────────────────────────────────
//    STYLES
// ───────────────────────────────────────────────────────────── */
// const styles = {
//   /* Loading */
//   loadingWrapper: {
//     minHeight: "100vh",
//     background: "#0A0A0A",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   loadingInner: { textAlign: "center" },
//   loadingLogo: {
//     width: 56,
//     height: 56,
//     borderRadius: 14,
//     background: "#C8FF0020",
//     border: "1px solid #C8FF0040",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     margin: "0 auto 16px",
//   },
//   loadingText: { color: "#666", fontSize: 14 },

//   /* App shell */
//   shell: { minHeight: "100vh", background: "#0A0A0A", color: "#fff" },

//   /* Modal */
//   modalBackdrop: {
//     position: "fixed",
//     inset: 0,
//     background: "rgba(0,0,0,0.85)",
//     backdropFilter: "blur(8px)",
//     zIndex: 999,
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     padding: 24,
//   },
//   modalCard: {
//     background: "#161616",
//     border: "1px solid #2e2e2e",
//     borderRadius: 20,
//     padding: 36,
//     width: "100%",
//     maxWidth: 420,
//   },
//   modalHeader: { textAlign: "center", marginBottom: 28 },
//   modalIconWrap: {
//     width: 52,
//     height: 52,
//     borderRadius: 14,
//     background: "#C8FF0018",
//     border: "1px solid #C8FF0035",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     margin: "0 auto 16px",
//   },
//   modalTitle: { fontSize: 22, fontWeight: 700, color: "#ffffff", marginBottom: 6 },
//   modalSubtitle: { fontSize: 14, color: "#aaa" },
//   modalForm: { display: "flex", flexDirection: "column", gap: 16 },
//   limeBtn: {
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     gap: 8,
//     background: "#C8FF00",
//     color: "#000",
//     border: "none",
//     borderRadius: 12,
//     padding: "14px 24px",
//     fontWeight: 700,
//     fontSize: 15,
//     cursor: "pointer",
//     marginTop: 8,
//   },

//   /* Hero */
//   hero: {
//     position: "relative",
//     padding: "60px 24px 0",
//     maxWidth: 1280,
//     margin: "0 auto",
//     overflow: "hidden",
//   },
//   heroGlow: {
//     position: "absolute",
//     top: 0,
//     left: "50%",
//     transform: "translateX(-50%)",
//     width: 600,
//     height: 300,
//     background: "radial-gradient(ellipse, #C8FF0015 0%, transparent 70%)",
//     pointerEvents: "none",
//   },
//   heroContent: { position: "relative", zIndex: 1 },
//   heroPill: {
//     display: "inline-flex",
//     alignItems: "center",
//     gap: 8,
//     background: "#C8FF0012",
//     border: "1px solid #C8FF0030",
//     borderRadius: 999,
//     padding: "6px 16px",
//     fontSize: 13,
//     color: "#C8FF00",
//     fontWeight: 600,
//     marginBottom: 20,
//   },
//   heroPillDot: {
//     width: 7,
//     height: 7,
//     borderRadius: "50%",
//     background: "#C8FF00",
//     animation: "pulse 2s ease-in-out infinite",
//   },
//   heroTitle: {
//     fontSize: "clamp(40px, 6vw, 72px)",
//     fontWeight: 800,
//     lineHeight: 1.05,
//     letterSpacing: "-2px",
//     color: "#fff",
//     marginBottom: 14,
//   },
//   heroAccent: { color: "#C8FF00" },
//   heroSub: { fontSize: 17, color: "#aaa", maxWidth: 440, marginBottom: 40 },

//   statsRow: {
//     display: "grid",
//     gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
//     gap: 16,
//     marginBottom: 60,
//   },
//   statCard: {
//     background: "#181818",
//     border: "1px solid #2e2e2e",
//     borderRadius: 16,
//     padding: "20px 24px",
//     display: "flex",
//     alignItems: "center",
//     gap: 16,
//     transition: "border-color 0.2s",
//   },
//   statIcon: {
//     width: 40,
//     height: 40,
//     borderRadius: 10,
//     background: "#C8FF0018",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     flexShrink: 0,
//   },
//   statValue: { fontSize: 26, fontWeight: 800, color: "#ffffff", lineHeight: 1 },
//   statLabel: { fontSize: 12, color: "#999", marginTop: 4 },

//   /* Services */
//   serviceSection: {
//     maxWidth: 1280,
//     margin: "0 auto",
//     padding: "0 24px 80px",
//   },
//   sectionLabel: {
//     fontSize: 12,
//     fontWeight: 600,
//     letterSpacing: "0.15em",
//     textTransform: "uppercase",
//     color: "#C8FF00",
//     marginBottom: 10,
//   },
//   sectionTitle: {
//     fontSize: "clamp(26px, 4vw, 40px)",
//     fontWeight: 800,
//     color: "#fff",
//     marginBottom: 36,
//     letterSpacing: "-1px",
//   },
//   serviceGrid: {
//     display: "grid",
//     gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
//     gap: 20,
//   },
//   svcCard: {
//     background: "#161616",
//     border: "1px solid #2a2a2a",
//     borderRadius: 20,
//     padding: "28px 24px 24px",
//     textAlign: "left",
//     cursor: "pointer",
//     position: "relative",
//     transition: "border-color 0.25s, transform 0.2s",
//   },
//   svcIconWrap: {
//     width: 52,
//     height: 52,
//     borderRadius: 14,
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     marginBottom: 16,
//   },
//   svcTag: {
//     display: "inline-block",
//     fontSize: 11,
//     fontWeight: 700,
//     letterSpacing: "0.08em",
//     padding: "4px 10px",
//     borderRadius: 999,
//     marginBottom: 12,
//     textTransform: "uppercase",
//   },
//   svcTitle: {
//     fontSize: 20,
//     fontWeight: 700,
//     color: "#fff",
//     marginBottom: 10,
//   },
//   svcDesc: { fontSize: 14, color: "#999", lineHeight: 1.6, marginBottom: 20 },
//   svcArrow: {
//     display: "flex",
//     alignItems: "center",
//     transition: "transform 0.2s",
//   },

//   /* Panel */
//   panelSection: {
//     maxWidth: 1280,
//     margin: "0 auto",
//     padding: "0 24px 80px",
//   },
//   backBtn: {
//     background: "transparent",
//     border: "1px solid #333",
//     color: "#aaa",
//     borderRadius: 10,
//     padding: "8px 16px",
//     fontSize: 13,
//     cursor: "pointer",
//     marginBottom: 28,
//     transition: "color 0.2s, border-color 0.2s",
//   },
//   panelHeader: {
//     display: "flex",
//     alignItems: "center",
//     gap: 16,
//     marginBottom: 28,
//   },
//   panelIconWrap: {
//     width: 46,
//     height: 46,
//     borderRadius: 12,
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     flexShrink: 0,
//   },
//   panelTitle: { fontSize: 22, fontWeight: 700, color: "#fff" },
//   panelSub: { fontSize: 14, color: "#999", marginTop: 3 },

//   /* Map */
//   mapWrap: {
//     borderRadius: 18,
//     border: "1px solid #1c1c1c",
//     marginBottom: 24,
//     height: 500,
//     position: "relative",
//     zIndex: 0,
//   },

//   /* Book layout */
//   bookGrid: {
//     display: "grid",
//     gridTemplateColumns: "1fr 340px",
//     gap: 20,
//     alignItems: "start",
//   },
//   bookList: {
//     display: "flex",
//     flexDirection: "column",
//     gap: 12,
//     maxHeight: 500,
//     overflowY: "auto",
//   },

//   /* Lots grid */
//   lotsGrid: {
//     display: "grid",
//     gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
//     gap: 16,
//   },
//   lotCard: {
//     background: "#181818",
//     border: "1px solid #2e2e2e",
//     borderRadius: 16,
//     padding: "20px",
//     transition: "border-color 0.2s, transform 0.2s",
//   },
//   lotCardHovered: {
//     borderColor: "#C8FF0060",
//     transform: "translateY(-2px)",
//     background: "#1e1e1e",
//   },
//   lotCardTop: {
//     display: "flex",
//     alignItems: "center",
//     gap: 8,
//     marginBottom: 8,
//   },
//   lotDot: {
//     width: 8,
//     height: 8,
//     borderRadius: "50%",
//     background: "#4ade80",
//     flexShrink: 0,
//     boxShadow: "0 0 6px #4ade8090",
//   },
//   lotAvail: { fontSize: 12, color: "#4ade80", fontWeight: 600 },
//   lotName: { fontSize: 15, fontWeight: 700, color: "#ffffff", marginBottom: 6 },
//   lotMeta: { display: "flex", alignItems: "center", gap: 5, marginBottom: 12 },
//   lotAddr: { fontSize: 12, color: "#aaa" },
//   lotPrice: { fontSize: 22, fontWeight: 800, color: "#ffffff", marginBottom: 14 },
//   lotPriceUnit: { fontSize: 13, fontWeight: 400, color: "#888" },
//   lotBtn: {
//     display: "flex",
//     alignItems: "center",
//     gap: 6,
//     width: "100%",
//     justifyContent: "center",
//     border: "none",
//     borderRadius: 10,
//     padding: "10px 0",
//     fontWeight: 700,
//     fontSize: 13,
//     cursor: "pointer",
//   },

//   /* Valet & OTP */
//   valetWrap: { maxWidth: 520, margin: "0 auto" },
//   valetCard: {
//     background: "#161616",
//     border: "1px solid #2a2a2a",
//     borderRadius: 20,
//     padding: 36,
//   },
//   valetCenter: { textAlign: "center" },
//   valetIconBig: {
//     width: 72,
//     height: 72,
//     borderRadius: 20,
//     background: "#FF6B3518",
//     border: "1px solid #FF6B3530",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     margin: "0 auto 20px",
//   },
//   valetTitle: {
//     fontSize: 24,
//     fontWeight: 700,
//     color: "#fff",
//     marginBottom: 10,
//     textTransform: "capitalize"
//   },
//   valetSub: { fontSize: 14, color: "#aaa", lineHeight: 1.6, marginBottom: 24 },
//   valetFeatures: {
//     display: "flex",
//     flexDirection: "column",
//     gap: 10,
//     marginBottom: 28,
//     textAlign: "left",
//     background: "#FF6B3510",
//     border: "1px solid #FF6B3525",
//     borderRadius: 12,
//     padding: "16px 20px",
//   },
//   valetFeatureRow: { display: "flex", alignItems: "center", gap: 10 },
//   valetFeatureText: { fontSize: 13, color: "#ccc" },
//   valetBtn: {
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     gap: 8,
//     width: "100%",
//     background: "#FF6B35",
//     color: "#fff",
//     border: "none",
//     borderRadius: 12,
//     padding: "14px 24px",
//     fontWeight: 700,
//     fontSize: 15,
//     cursor: "pointer",
//   },
//   valetForm: { display: "flex", flexDirection: "column", gap: 16 },
//   formBack: {
//     background: "transparent",
//     border: "none",
//     color: "#aaa",
//     fontSize: 13,
//     cursor: "pointer",
//     textAlign: "left",
//     padding: 0,
//     marginBottom: 8,
//   },
//   locationBadge: {
//     display: "flex",
//     alignItems: "center",
//     gap: 8,
//     background: "#C8FF0010",
//     border: "1px solid #C8FF0025",
//     borderRadius: 10,
//     padding: "10px 14px",
//     fontSize: 13,
//     color: "#C8FF00",
//     fontWeight: 600,
//   },
//   confirmBox: {
//     background: "#1a1a1a",
//     border: "1px solid #2e2e2e",
//     borderRadius: 12,
//     padding: 20,
//     marginBottom: 20,
//     width: "100%",
//   },
//   confirmRow: {
//     display: "flex",
//     justifyContent: "space-between",
//     marginBottom: 10,
//   },
//   confirmLabel: { fontSize: 13, color: "#888" },
//   confirmValue: { fontSize: 13, color: "#eee", fontWeight: 600 },
  
//   // New OTP Styles
//   otpBox: {
//     background: "#C8FF0015",
//     border: "1px dashed #C8FF00",
//     borderRadius: 12,
//     padding: "20px",
//     textAlign: "center",
//     marginBottom: "24px"
//   },
//   otpLabel: { 
//     fontSize: 12, 
//     color: "#C8FF00", 
//     textTransform: "uppercase", 
//     letterSpacing: 1, 
//     marginBottom: 8,
//     fontWeight: 700
//   },
//   otpText: { 
//     fontSize: 36, 
//     fontWeight: 800, 
//     color: "#fff", 
//     letterSpacing: 8 
//   },

//   /* Spinner */
//   spinner: {
//     width: 48,
//     height: 48,
//     borderRadius: "50%",
//     border: "3px solid #1a1a1a",
//     borderTopColor: "#FF6B35",
//     margin: "0 auto 20px",
//   },

//   /* Input */
//   inputGroup: { display: "flex", flexDirection: "column", gap: 6 },
//   inputLabel: { fontSize: 13, fontWeight: 600, color: "#bbb" },
//   input: {
//     background: "#1a1a1a",
//     border: "1px solid #333",
//     borderRadius: 10,
//     padding: "12px 14px",
//     fontSize: 14,
//     color: "#fff",
//     outline: "none",
//     width: "100%",
//     boxSizing: "border-box",
//   },
// };

// /* ─────────────────────────────────────────────────────────────
//    GLOBAL CSS (animations + hover effects)
// ───────────────────────────────────────────────────────────── */
// const globalCSS = `
//   @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&display=swap');

//   body { font-family: 'Syne', sans-serif; margin: 0; }

//   @keyframes pulse {
//     0%, 100% { opacity: 1; transform: scale(1); }
//     50% { opacity: 0.5; transform: scale(0.85); }
//   }

//   .park-spinner { animation: spin 0.8s linear infinite; }
//   @keyframes spin { to { transform: rotate(360deg); } }

//   .svc-card:hover {
//     border-color: var(--accent, #C8FF00) !important;
//     transform: translateY(-4px);
//   }
//   .svc-card:hover .svc-arrow {
//     transform: translateX(4px);
//   }

//   .stat-card:hover { border-color: #C8FF0030 !important; }

//   .back-btn:hover { color: #fff !important; border-color: #444 !important; }

//   .park-input:focus {
//     border-color: #C8FF00 !important;
//     box-shadow: 0 0 0 3px #C8FF0015;
//   }

//   .lime-btn:hover, .valet-btn:hover, .lot-btn:hover {
//     opacity: 0.88;
//     transform: translateY(-1px);
//   }

//   .park-modal {
//     animation: modalIn 0.25s ease;
//   }
//   @keyframes modalIn {
//     from { opacity: 0; transform: scale(0.97) translateY(8px); }
//     to   { opacity: 1; transform: scale(1) translateY(0); }
//   }
// `;

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
  Key // 👈 Added Key icon for OTPs
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
  const [focusedLot, setFocusedLot] = useState(null); // Added state for map focus
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
          axios.get("http://localhost:8080/api/users/me", config),
          axios.get("http://localhost:8080/api/parking-lots", config),
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
        "http://localhost:8080/api/users/me",
        {
          name: profileData.name,
          phoneNumber: profileData.phoneNumber,
          password: profileData.password,
        },
        { withCredentials: true }
      );
      setShowProfileModal(true);
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
        <section style={styles.hero} className="hero-section">
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

          <div style={styles.statsRow} className="stats-row-wrap">
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
          <section style={styles.serviceSection} className="service-section-wrap">
            <p style={styles.sectionLabel}>Choose a Service</p>
            <h2 style={styles.sectionTitle}>What do you need today?</h2>

            <div style={styles.serviceGrid} className="service-grid-wrap">
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
          <section style={styles.panelSection} className="panel-section-wrap">
            <button
              onClick={() => { setMode(null); setSelectedLot(null); setFocusedLot(null); }}
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
                <div style={styles.mapWrap} className="map-wrap-inner">
                  <CustomMap
                    lots={lots}
                    onSelectLot={(lot) => openNavigation(lot)}
                    hoveredLotId={hoveredLotId}
                    focusedLot={focusedLot}
                    center={focusedLot ? { lat: focusedLot.latitude, lng: focusedLot.longitude } : currentPosition}
                  />
                </div>
                {lots.length > 0 && (
                  <div style={styles.lotsGrid}>
                    {lots.map((lot) => (
                      <LotCard
                        key={lot.id}
                        lot={lot}
                        userPosition={currentPosition}
                        isHovered={hoveredLotId === lot.id}
                        onHover={() => {
                          setHoveredLotId(lot.id);
                          setFocusedLot(lot);
                        }}
                        onLeave={() => setHoveredLotId(null)}
                        onClick={() => setFocusedLot(lot)}
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
                    <div style={styles.bookGrid} className="book-grid-wrap">
                      {/* Map column */}
                      <div style={styles.mapWrap} className="map-wrap-inner">
                        <CustomMap
                          lots={lots}
                          onSelectLot={(lot) => {
                            setSelectedLot(lot);
                            setFocusedLot(lot);
                          }}
                          hoveredLotId={hoveredLotId}
                          focusedLot={focusedLot}
                          center={focusedLot ? { lat: focusedLot.latitude, lng: focusedLot.longitude } : currentPosition}
                        />
                      </div>
                      {/* Lots list column */}
                      <div style={styles.bookList}>
                        {lots.map((lot) => (
                          <LotCard
                            key={lot.id}
                            lot={lot}
                            accent="#C8FF00"
                            actionLabel="Book Now"
                            userPosition={currentPosition}
                            isHovered={hoveredLotId === lot.id}
                            onHover={() => {
                              setHoveredLotId(lot.id);
                              setFocusedLot(lot);
                            }}
                            onLeave={() => setHoveredLotId(null)}
                            onClick={() => setFocusedLot(lot)}
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
   HELPERS
───────────────────────────────────────────────────────────── */
function haversineKm(lat1, lng1, lat2, lng2) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;
  return (R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))).toFixed(1);
}

/* ─────────────────────────────────────────────────────────────
   LOT CARD
───────────────────────────────────────────────────────────── */
function LotCard({ lot, isHovered, onHover, onLeave, onClick, onNavigate, accent = "#C8FF00", actionLabel = "Navigate", userPosition }) {
  const available = lot.availableSpots ?? lot.capacity ?? null;
  const isPaused  = lot.status === "PAUSED";

  // Distance sub-text: show km if coords + userPosition available,
  // otherwise fall back to address (only if it differs from name)
  let subText = null;
  if (userPosition && lot.latitude && lot.longitude) {
    const km = haversineKm(userPosition.lat, userPosition.lng, parseFloat(lot.latitude), parseFloat(lot.longitude));
    subText = `${km} km away`;
  } else if (lot.address && lot.address !== lot.name) {
    subText = lot.address;
  }

  return (
    <div
      onClick={!isPaused ? onClick : undefined}
      style={{
        ...styles.lotCard,
        ...(isHovered && !isPaused ? styles.lotCardHovered : {}),
        cursor: isPaused ? "not-allowed" : onClick ? "pointer" : "default",
        opacity: isPaused ? 0.6 : 1,
      }}
      onMouseEnter={!isPaused ? onHover : undefined}
      onMouseLeave={!isPaused ? onLeave : undefined}
    >
      {/* Status row */}
      <div style={styles.lotCardTop}>
        <div style={{
          ...styles.lotDot,
          background:  isPaused ? "#f87171" : "#4ade80",
          boxShadow:   isPaused ? "0 0 6px #f8717190" : "0 0 6px #4ade8090",
        }} />

        {/* Skeleton shimmer when spots data not yet loaded */}
        {available === null ? (
          <span style={styles.lotAvailSkeleton} className="lot-skeleton" />
        ) : (
          <span style={{ ...styles.lotAvail, color: isPaused ? "#f87171" : "#4ade80" }}>
            {isPaused ? "Closed" : `${available} spots available`}
          </span>
        )}
      </div>

      {/* Name */}
      <h4 style={styles.lotName}>{lot.name}</h4>

      {/* Sub-text: distance or address (not redundant name) */}
      {subText && (
        <div style={styles.lotMeta}>
          <MapPin size={12} color="#555" />
          <span style={styles.lotAddr}>{subText}</span>
        </div>
      )}

      {/* Price */}
      {lot.pricePerHour && (
        <div style={styles.lotPrice}>
          ₹{lot.pricePerHour}
          <span style={styles.lotPriceUnit}>/hr</span>
        </div>
      )}

      {/* Action button */}
      <button
        onClick={(e) => { e.stopPropagation(); if (!isPaused) onNavigate(); }}
        disabled={isPaused}
        style={{
          ...styles.lotBtn,
          background: isPaused ? "#2a2a2a" : accent,
          color:      isPaused ? "#555" : accent === "#C8FF00" ? "#000" : "#fff",
          cursor:     isPaused ? "not-allowed" : "pointer",
          borderWidth: "1px",
          borderStyle: "solid",
          borderColor: isPaused ? "#333" : "transparent",
        }}
        className="lot-btn"
      >
        {isPaused ? "Currently Closed" : actionLabel}
        {!isPaused && <ArrowRight size={14} />}
      </button>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   VALET PANEL (UPDATED WITH OTP FLOW)
───────────────────────────────────────────────────────────── */
function ValetRequestPanel({ userId, currentPosition, onDownload }) {
  const [status, setStatus] = useState("IDLE");
  const [activeBooking, setActiveBooking] = useState(null);
  const [vehicleDetails, setVehicleDetails] = useState({
    vehicleNumber: "",
    vehicleModel: "",
    vehicleType: "CAR",
    contactNumber: "",
  });

  const handleInputChange = (e) => {
    setVehicleDetails({ ...vehicleDetails, [e.target.name]: e.target.value });
  };

  // Poll for booking updates if we have an active booking
  useEffect(() => {
    let interval;
    if (status === "ACTIVE_BOOKING" && activeBooking && activeBooking.status !== "COMPLETED") {
      interval = setInterval(async () => {
        try {
          const token = localStorage.getItem("token");
          const res = await axios.get(`http://localhost:8080/api/bookings/${activeBooking.id}`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          setActiveBooking(res.data);
        } catch (err) {
          console.error("Failed to fetch booking status", err);
        }
      }, 5000); // Check every 5 seconds
    }
    return () => clearInterval(interval);
  }, [status, activeBooking]);

const handleRequestValet = async (e) => {
  e.preventDefault();

  let rawUserId = userId || localStorage.getItem("userId");

  if (!rawUserId || rawUserId === "null" || rawUserId === "undefined") {
    alert("User session not found. Please log out and log in again.");
    return;
  }

  if (!currentPosition) {
    alert("Getting your location...");
    return;
  }

  setStatus("REQUESTING");

  try {
    const token = localStorage.getItem("token");

    const payload = {
      userId: parseInt(rawUserId, 10),
      vehicleNumber: vehicleDetails.vehicleNumber,
      vehicleModel: vehicleDetails.vehicleModel,
      vehicleType: vehicleDetails.vehicleType || "CAR",
      contactNumber: vehicleDetails.contactNumber,
      pickupLat: currentPosition.lat,
      pickupLng: currentPosition.lng,
      status: "VALET_REQUESTED",
      serviceType: "VALET",
    };

    console.log("SENDING PAYLOAD:", payload);

    const res = await axios.post(
      "http://localhost:8080/api/bookings",
      payload,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setActiveBooking(res.data);
    setStatus("ACTIVE_BOOKING");

  } catch (err) {
    console.error("BOOKING ERROR:", err.response?.data || err);
    setStatus("FORM");
    alert("Server error. Please try again.");
  }
};

  const handleRequestReturn = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `http://localhost:8080/api/bookings/${activeBooking.id}/request-return`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // The backend returns { message: "...", booking: {...} }
      setActiveBooking(res.data.booking || res.data);
    } catch (err) {
      alert("Failed to request return: " + (err.response?.data?.error || err.message));
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
            {/* Vehicle Type Selector */}
            <div style={styles.inputGroup}>
              <label style={styles.inputLabel}>Vehicle Type</label>
              <select
                name="vehicleType"
                value={vehicleDetails.vehicleType}
                onChange={handleInputChange}
                style={{ ...styles.input, cursor: "pointer" }}
              >
                <option value="CAR">🚗 Car</option>
                <option value="BIKE">🏍️ Bike</option>
                <option value="HEAVY">🚛 Heavy Vehicle</option>
              </select>
            </div>
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
            <p style={styles.valetSub}>Submitting your request…</p>
          </div>
        )}

        {status === "ACTIVE_BOOKING" && activeBooking && (
          <div style={styles.valetCenter}>
            <div style={{ ...styles.valetIconBig, background: "#C8FF0018", border: "1px solid #C8FF0030" }}>
              <Shield size={36} color="#C8FF00" />
            </div>
            
            <h3 style={styles.valetTitle}>
              {activeBooking.status.replace(/_/g, " ")}
            </h3>

            {/* OTP DISPLAYS */}
            {/* Show Pickup OTP as soon as booking is created (VALET_REQUESTED) OR when valet is assigned */}
            {(activeBooking.status === "VALET_REQUESTED" || activeBooking.status === "VALET_ASSIGNED") && (
              <div style={styles.otpBox}>
                <div style={styles.otpLabel}>🔑 Your Pickup OTP</div>
                <div style={styles.otpText}>{activeBooking.pickupOtp || "------"}</div>
                <p style={{ fontSize: 12, color: "#aaa", marginTop: 8 }}>
                  Share this 6-digit code with the valet when they arrive to hand over your keys.
                </p>
              </div>
            )}

            {activeBooking.status === "RETURN_REQUESTED" && (
              <div style={{ ...styles.otpBox, background: "#FF6B3515", border: "1px dashed #FF6B35" }}>
                <div style={{ ...styles.otpLabel, color: "#FF6B35" }}>🔑 Your Dropoff OTP</div>
                <div style={styles.otpText}>{activeBooking.dropoffOtp || "------"}</div>
                <p style={{ fontSize: 12, color: "#aaa", marginTop: 8 }}>
                  Share this 6-digit code with the valet to receive your keys back.
                </p>
              </div>
            )}

            {/* Subtext based on status */}
            {(activeBooking.status === "VALET_REQUESTED") && (
              <p style={styles.valetSub}>Finding an available valet for you. Please wait...</p>
            )}
            {activeBooking.status === "VALET_PICKED_UP" && (
              <p style={styles.valetSub}>The valet is currently parking your vehicle.</p>
            )}
            {activeBooking.status === "PARKED" && (
              <p style={styles.valetSub}>Your car is safely parked in the lot.</p>
            )}

            <div style={styles.confirmBox}>
              <div style={styles.confirmRow}>
                <span style={styles.confirmLabel}>Vehicle</span>
                <span style={styles.confirmValue}>{activeBooking.vehicleNumber}</span>
              </div>
              {activeBooking.valetId && (
                <div style={styles.confirmRow}>
                  <span style={styles.confirmLabel}>Valet ID</span>
                  <span style={styles.confirmValue}>#{activeBooking.valetId}</span>
                </div>
              )}
            </div>

            {/* Actions based on status */}
            {activeBooking.status === "PARKED" && (
              <button
                onClick={handleRequestReturn}
                style={{ ...styles.valetBtn, background: "#FF6B35", color: "#fff", marginBottom: 12 }}
                className="valet-btn"
              >
                Request Vehicle Return
                <Key size={16} />
              </button>
            )}

            {activeBooking.status === "COMPLETED" && (
              <button
                onClick={() => { setStatus("IDLE"); setActiveBooking(null); }}
                style={{ ...styles.valetBtn, background: "#C8FF00", color: "#000", marginBottom: 12 }}
                className="valet-btn"
              >
                Start New Request
              </button>
            )}

            {activeBooking.status !== "COMPLETED" && (
              <button
                onClick={() => onDownload(activeBooking)}
                style={{ ...styles.valetBtn, background: "transparent", color: "#C8FF00", border: "1px solid #C8FF00" }}
                className="valet-btn"
              >
                Download Pay Slip
                <CreditCard size={16} />
              </button>
            )}
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
    marginTop: 40,
    marginBottom: 60,
    paddingTop: 4,
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
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: "#2e2e2e",
    borderRadius: 16,
    padding: "20px",
    transition: "border-color 0.2s, transform 0.2s, background 0.2s",
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
  lotAvailSkeleton: {
    display: "inline-block",
    width: 90,
    height: 12,
    borderRadius: 6,
    background: "linear-gradient(90deg, #2a2a2a 25%, #3a3a3a 50%, #2a2a2a 75%)",
    backgroundSize: "200% 100%",
  },
  lotName: { fontSize: 15, fontWeight: 700, color: "#ffffff", marginBottom: 6 },
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

  /* Valet & OTP */
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
    textTransform: "capitalize"
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
  
  // New OTP Styles
  otpBox: {
    background: "#C8FF0015",
    border: "1px dashed #C8FF00",
    borderRadius: 12,
    padding: "20px",
    textAlign: "center",
    marginBottom: "24px"
  },
  otpLabel: { 
    fontSize: 12, 
    color: "#C8FF00", 
    textTransform: "uppercase", 
    letterSpacing: 1, 
    marginBottom: 8,
    fontWeight: 700
  },
  otpText: { 
    fontSize: 36, 
    fontWeight: 800, 
    color: "#fff", 
    letterSpacing: 8 
  },

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

  @keyframes shimmer {
    0%   { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }
  .lot-skeleton {
    animation: shimmer 1.4s ease-in-out infinite;
  }

  .park-modal {
    animation: modalIn 0.25s ease;
  }
  @keyframes modalIn {
    from { opacity: 0; transform: scale(0.97) translateY(8px); }
    to   { opacity: 1; transform: scale(1) translateY(0); }
  }

  /* ── RESPONSIVE ── */
  @media (max-width: 900px) {
    .book-grid-wrap {
      grid-template-columns: 1fr !important;
    }
    .map-wrap-inner {
      height: 320px !important;
    }
  }
  @media (max-width: 600px) {
    .service-grid-wrap {
      grid-template-columns: 1fr !important;
    }
    .stats-row-wrap {
      grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)) !important;
    }
    .hero-section {
      padding: 40px 16px 0 !important;
    }
    .service-section-wrap {
      padding: 0 16px 60px !important;
    }
    .panel-section-wrap {
      padding: 0 16px 60px !important;
    }
  }

`;

export default UserDashboard;