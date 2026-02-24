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
      if (config)await axios.post("http://localhost:8080/api/auth/logout", {}, config);
    } catch (error) { console.error("Logout failed", error); }
    finally { localStorage.clear(); navigate("/"); }
  };

  const fetchQueue = async () => {
    const config = getAuthConfig();
    if (!config) { navigate("/login"); return; }
    try {
      const res = await axios.get("http://localhost:8080/api/bookings/valet/queue", config);
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
      await axios.post(`http://localhost:8080/api/bookings/${booking.id}/pickup`, {}, config);
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
      await axios.post(`http://localhost:8080/api/bookings/${activeTask.id}/complete`, formData, {
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