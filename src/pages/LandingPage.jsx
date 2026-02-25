// import { useState, useEffect, useRef } from "react";
// import { motion, useScroll, useTransform, AnimatePresence, useInView } from "framer-motion";
// import {
//   Car, Clock, MapPin, CreditCard, Shield, Zap,
//   CheckCircle, ArrowRight, Menu, X, Navigation,
//   TrendingUp, Users, Star, ChevronRight, Lock
// } from "lucide-react";

// /* ─── Design Tokens ─────────────────────────────────────────────── */
// const C = {
//   bg:       "#020308",
//   surface:  "#0B0D17",
//   card:     "#0F1220",
//   border:   "rgba(255,255,255,0.07)",
//   accent:   "#B8FF57",
//   accentDim:"rgba(184,255,87,0.12)",
//   blue:     "#4B9EFF",
//   blueDim:  "rgba(75,158,255,0.12)",
//   text:     "#F0F4FF",
//   muted:    "#6B7594",
//   white:    "#FFFFFF",
// };

// /* ─── Font Injection ─────────────────────────────────────────────── */
// const fontStyle = `
//   @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');

//   *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
//   html { scroll-behavior: smooth; }
//   body { background: ${C.bg}; }

//   .parkease-root {
//     font-family: 'DM Sans', sans-serif;
//     background: ${C.bg};
//     color: ${C.text};
//     min-height: 100vh;
//     overflow-x: hidden;
//   }
//   .display-font { font-family: 'Syne', sans-serif; }

//   /* Scrollbar */
//   ::-webkit-scrollbar { width: 4px; }
//   ::-webkit-scrollbar-track { background: ${C.bg}; }
//   ::-webkit-scrollbar-thumb { background: ${C.accentDim}; border-radius: 2px; }

//   /* Marquee */
//   @keyframes marquee {
//     from { transform: translateX(0); }
//     to   { transform: translateX(-50%); }
//   }
//   .marquee-track { animation: marquee 22s linear infinite; }
//   .marquee-track:hover { animation-play-state: paused; }

//   /* Glow orb */
//   .orb-1 {
//     position: absolute; border-radius: 50%; filter: blur(120px); pointer-events: none;
//     width: 500px; height: 500px;
//     background: radial-gradient(circle, rgba(184,255,87,0.14) 0%, transparent 70%);
//     top: -100px; right: -80px;
//     animation: orbFloat 9s ease-in-out infinite alternate;
//   }
//   .orb-2 {
//     position: absolute; border-radius: 50%; filter: blur(100px); pointer-events: none;
//     width: 380px; height: 380px;
//     background: radial-gradient(circle, rgba(75,158,255,0.12) 0%, transparent 70%);
//     bottom: 40px; left: -80px;
//     animation: orbFloat 12s ease-in-out infinite alternate-reverse;
//   }
//   @keyframes orbFloat {
//     from { transform: translate(0, 0) scale(1); }
//     to   { transform: translate(20px, 30px) scale(1.05); }
//   }

//   /* Noise overlay */
//   .noise::after {
//     content: '';
//     position: absolute; inset: 0;
//     background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E");
//     pointer-events: none; z-index: 0; border-radius: inherit;
//   }

//   .badge-pill {
//     display: inline-flex; align-items: center; gap: 6px;
//     padding: 5px 12px; border-radius: 100px;
//     font-size: 12px; font-weight: 500; letter-spacing: 0.04em;
//     background: ${C.accentDim}; color: ${C.accent};
//     border: 1px solid rgba(184,255,87,0.2);
//   }

//   .card-hover {
//     transition: border-color 0.3s, box-shadow 0.3s, transform 0.3s;
//   }
//   .card-hover:hover {
//     border-color: rgba(184,255,87,0.2) !important;
//     box-shadow: 0 0 40px rgba(184,255,87,0.06);
//     transform: translateY(-3px);
//   }

//   .btn-primary {
//     display: inline-flex; align-items: center; gap: 8px;
//     padding: 14px 28px; border-radius: 12px; font-weight: 600;
//     background: ${C.accent}; color: ${C.bg};
//     font-family: 'Syne', sans-serif; font-size: 15px;
//     transition: all 0.25s; border: none; cursor: pointer;
//     text-decoration: none;
//   }
//   .btn-primary:hover {
//     background: #cbff6e; box-shadow: 0 0 32px rgba(184,255,87,0.4);
//     transform: translateY(-1px);
//   }

//   .btn-ghost {
//     display: inline-flex; align-items: center; gap: 8px;
//     padding: 14px 28px; border-radius: 12px; font-weight: 500;
//     background: transparent; color: ${C.muted};
//     font-family: 'DM Sans', sans-serif; font-size: 15px;
//     transition: all 0.25s; border: 1px solid ${C.border}; cursor: pointer;
//     text-decoration: none;
//   }
//   .btn-ghost:hover { border-color: rgba(255,255,255,0.2); color: ${C.text}; }

//   .grid-line {
//     background-image:
//       linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
//       linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
//     background-size: 60px 60px;
//   }

//   .stat-card {
//     border-radius: 16px;
//     background: ${C.card};
//     border: 1px solid ${C.border};
//     padding: 20px 24px;
//     position: relative; overflow: hidden;
//   }

//   .tag-dot {
//     width: 6px; height: 6px; border-radius: 50%;
//     background: ${C.accent};
//     display: inline-block;
//     box-shadow: 0 0 8px ${C.accent};
//     animation: pulse 2s infinite;
//   }
//   @keyframes pulse {
//     0%, 100% { opacity: 1; }
//     50% { opacity: 0.4; }
//   }
// `;

// /* ─── Animated Section Wrapper ───────────────────────────────────── */
// function FadeIn({ children, delay = 0, direction = "up", className = "" }) {
//   const ref = useRef(null);
//   const inView = useInView(ref, { once: true, margin: "-80px" });
//   const yVal = direction === "up" ? 40 : direction === "down" ? -40 : 0;
//   const xVal = direction === "left" ? 40 : direction === "right" ? -40 : 0;
//   return (
//     <motion.div
//       ref={ref}
//       initial={{ opacity: 0, y: yVal, x: xVal }}
//       animate={inView ? { opacity: 1, y: 0, x: 0 } : {}}
//       transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
//       className={className}
//     >
//       {children}
//     </motion.div>
//   );
// }

// /* ─── Navbar ─────────────────────────────────────────────────────── */
// function Navbar() {
//   const [open, setOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);

//   useEffect(() => {
//     const fn = () => setScrolled(window.scrollY > 20);
//     window.addEventListener("scroll", fn);
//     return () => window.removeEventListener("scroll", fn);
//   }, []);

//   return (
//     <>
//       <nav style={{
//         position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
//         borderBottom: scrolled ? `1px solid ${C.border}` : "1px solid transparent",
//         background: scrolled ? "rgba(2,3,8,0.85)" : "transparent",
//         backdropFilter: scrolled ? "blur(20px)" : "none",
//         transition: "all 0.4s",
//       }}>
//         <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 28px", height: 68, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
//           {/* Logo */}
//           <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
//             <div style={{ width: 34, height: 34, borderRadius: 10, background: C.accent, display: "flex", alignItems: "center", justifyContent: "center" }}>
//               <Car size={18} color={C.bg} strokeWidth={2.5} />
//             </div>
//             <span className="display-font" style={{ fontWeight: 800, fontSize: 20, color: C.white, letterSpacing: "-0.02em" }}>ParkEase</span>
//           </div>

//           {/* Desktop Links */}
//           <div style={{ display: "flex", alignItems: "center", gap: 32, fontSize: 14, fontWeight: 500 }} className="hidden md:flex">
//             {["Features", "Pricing", "About"].map(l => (
//               <a key={l} href={`#${l.toLowerCase()}`} style={{ color: C.muted, textDecoration: "none", transition: "color 0.2s" }}
//                 onMouseOver={e => e.target.style.color = C.text}
//                 onMouseOut={e => e.target.style.color = C.muted}>{l}</a>
//             ))}
//             <a href="/login" style={{ color: C.muted, textDecoration: "none", transition: "color 0.2s" }}
//               onMouseOver={e => e.target.style.color = C.text}
//               onMouseOut={e => e.target.style.color = C.muted}>Log in</a>
//             <a href="/signup" className="btn-primary" style={{ padding: "10px 22px", fontSize: 14 }}>Get Started</a>
//           </div>

//           <button className="md:hidden" onClick={() => setOpen(!open)} style={{ background: "none", border: "none", cursor: "pointer", color: C.text }}>
//             {open ? <X size={22} /> : <Menu size={22} />}
//           </button>
//         </div>
//       </nav>

//       {/* Mobile Menu */}
//       <AnimatePresence>
//         {open && (
//           <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
//             style={{ position: "fixed", top: 68, left: 0, right: 0, zIndex: 99, background: C.surface, borderBottom: `1px solid ${C.border}`, padding: "20px 28px", display: "flex", flexDirection: "column", gap: 16 }}>
//             {["Features", "Pricing", "About", "Log in"].map(l => (
//               <a key={l} href="#" onClick={() => setOpen(false)} style={{ color: C.muted, textDecoration: "none", fontSize: 16, fontWeight: 500 }}>{l}</a>
//             ))}
//             <a href="/signup" className="btn-primary" style={{ textAlign: "center", justifyContent: "center" }}>Get Started →</a>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </>
//   );
// }

// /* ─── Hero Section ───────────────────────────────────────────────── */
// function HeroSection() {
//   return (
//     <section style={{ minHeight: "100vh", display: "flex", alignItems: "center", position: "relative", overflow: "hidden", paddingTop: 100 }} className="grid-line">
//       <div className="orb-1" />
//       <div className="orb-2" />

//       {/* Grid overlay */}
//       <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to bottom, transparent 60%, ${C.bg})`, pointerEvents: "none" }} />

//       <div style={{ maxWidth: 1200, margin: "0 auto", padding: "60px 28px", width: "100%", position: "relative", zIndex: 1 }}>
//         <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }} className="lg:grid-cols-2 grid-cols-1">

//           {/* Left – Copy */}
//           <div>
//             <FadeIn>
//               <div className="badge-pill" style={{ marginBottom: 28 }}>
//                 <span className="tag-dot" />
//                 Now in 40+ cities worldwide
//               </div>
//             </FadeIn>

//             <FadeIn delay={0.08}>
//               <h1 className="display-font" style={{ fontSize: "clamp(44px, 6vw, 76px)", fontWeight: 800, lineHeight: 1.0, letterSpacing: "-0.04em", marginBottom: 24, color: C.white }}>
//                 Park Smarter.{" "}
//                 <span style={{ color: C.accent, display: "block" }}>Never Circle Again.</span>
//               </h1>
//             </FadeIn>

//             <FadeIn delay={0.15}>
//               <p style={{ fontSize: 18, lineHeight: 1.7, color: C.muted, marginBottom: 40, maxWidth: 440 }}>
//                 Real-time parking intelligence that finds, reserves, and guides you to your spot before you even leave home.
//               </p>
//             </FadeIn>

//             <FadeIn delay={0.22}>
//               <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
//                 <a href="/signup" className="btn-primary">
//                   Start Free Trial <ArrowRight size={16} />
//                 </a>
//                 <a href="#features" className="btn-ghost">
//                   See how it works
//                 </a>
//               </div>
//             </FadeIn>

//             {/* Social proof strip */}
//             <FadeIn delay={0.3}>
//               <div style={{ marginTop: 48, display: "flex", alignItems: "center", gap: 20 }}>
//                 <div style={{ display: "flex" }}>
//                   {["#4B9EFF","#B8FF57","#FF6B6B","#FFB347"].map((c, i) => (
//                     <div key={i} style={{ width: 32, height: 32, borderRadius: "50%", border: `2px solid ${C.bg}`, background: c, marginLeft: i > 0 ? -10 : 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: C.bg }}>
//                       {["A","B","C","D"][i]}
//                     </div>
//                   ))}
//                 </div>
//                 <div>
//                   <div style={{ display: "flex", gap: 2, marginBottom: 2 }}>
//                     {[...Array(5)].map((_,i) => <Star key={i} size={12} fill="#FFB347" color="#FFB347" />)}
//                   </div>
//                   <p style={{ fontSize: 12, color: C.muted }}>Trusted by <strong style={{ color: C.text }}>120,000+</strong> drivers</p>
//                 </div>
//               </div>
//             </FadeIn>
//           </div>

//           {/* Right – App Mockup */}
//           <FadeIn delay={0.2} direction="left">
//             <AppMockup />
//           </FadeIn>

//         </div>
//       </div>
//     </section>
//   );
// }

// /* ─── App Mockup (Hero right side) ──────────────────────────────── */
// function AppMockup() {
//   const spots = [
//     { id: "A12", type: "Standard", price: "$3.50", status: "available", dist: "120m" },
//     { id: "B04", type: "Compact",  price: "$2.80", status: "available", dist: "200m" },
//     { id: "C17", type: "EV Charge",price: "$4.20", status: "filling",   dist: "85m"  },
//     { id: "D08", type: "Disabled", price: "Free",  status: "taken",     dist: "150m" },
//   ];

//   const statusColor = { available: C.accent, filling: "#FFB347", taken: "#FF6B6B" };

//   return (
//     <div style={{ position: "relative" }}>
//       {/* Main card */}
//       <div style={{
//         background: C.card, borderRadius: 28, border: `1px solid ${C.border}`,
//         padding: 28, boxShadow: "0 60px 120px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04)",
//         position: "relative", overflow: "hidden"
//       }}>
//         {/* Map placeholder */}
//         <div style={{
//           borderRadius: 18, height: 220, marginBottom: 20,
//           background: `linear-gradient(135deg, #0D1633 0%, #0A1F2E 50%, #0D1A33 100%)`,
//           position: "relative", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center",
//           border: `1px solid rgba(75,158,255,0.1)`
//         }}>
//           {/* Fake map grid */}
//           <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.3 }} viewBox="0 0 400 220" preserveAspectRatio="xMidYMid slice">
//             {[40,80,120,160,200,240,280,320,360].map(x => <line key={x} x1={x} y1="0" x2={x} y2="220" stroke="#4B9EFF" strokeWidth="0.5"/>)}
//             {[40,80,120,160,200].map(y => <line key={y} x1="0" y1={y} x2="400" y2={y} stroke="#4B9EFF" strokeWidth="0.5"/>)}
//             <rect x="60" y="30" width="120" height="60" fill="rgba(75,158,255,0.1)" rx="4"/>
//             <rect x="220" y="30" width="80" height="90" fill="rgba(75,158,255,0.08)" rx="4"/>
//             <rect x="60" y="130" width="200" height="50" fill="rgba(75,158,255,0.06)" rx="4"/>
//           </svg>

//           {/* Route line */}
//           <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.6 }} viewBox="0 0 400 220">
//             <path d="M 200 200 Q 200 140, 260 120 Q 310 100, 310 60" stroke={C.accent} strokeWidth="2.5" fill="none" strokeDasharray="6 4" strokeLinecap="round"/>
//           </svg>

//           {/* You are here */}
//           <div style={{ position: "absolute", bottom: 30, left: "50%", transform: "translateX(-50%)" }}>
//             <motion.div animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 2, repeat: Infinity }}
//               style={{ width: 14, height: 14, borderRadius: "50%", background: C.blue, border: "3px solid white", boxShadow: `0 0 20px ${C.blue}` }} />
//           </div>

//           {/* Parking pin */}
//           <div style={{ position: "absolute", top: 28, right: 70 }}>
//             <motion.div animate={{ y: [0, -4, 0] }} transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}>
//               <div style={{ background: C.accent, borderRadius: "50% 50% 50% 0", width: 32, height: 32, transform: "rotate(-45deg)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 0 20px ${C.accent}66` }}>
//                 <span style={{ transform: "rotate(45deg)", fontSize: 14, fontWeight: 800, color: C.bg, fontFamily: "Syne, sans-serif" }}>P</span>
//               </div>
//             </motion.div>
//           </div>

//           {/* Navigation badge */}
//           <div style={{ position: "absolute", top: 12, left: 12, background: "rgba(0,0,0,0.6)", backdropFilter: "blur(12px)", borderRadius: 10, padding: "6px 12px", display: "flex", alignItems: "center", gap: 6 }}>
//             <Navigation size={12} color={C.accent} />
//             <span style={{ fontSize: 11, color: C.text, fontWeight: 500 }}>Live Navigation</span>
//           </div>
//         </div>

//         {/* Header */}
//         <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
//           <div>
//             <p style={{ fontSize: 12, color: C.muted, marginBottom: 2 }}>Available near you</p>
//             <h3 className="display-font" style={{ fontSize: 18, fontWeight: 700, color: C.white }}>4 spots found</h3>
//           </div>
//           <div style={{ background: C.accentDim, borderRadius: 8, padding: "4px 10px", fontSize: 12, color: C.accent, fontWeight: 500 }}>
//             ↻ Live
//           </div>
//         </div>

//         {/* Spots list */}
//         <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
//           {spots.map((s, i) => (
//             <motion.div key={s.id}
//               initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 + i * 0.08 }}
//               style={{
//                 display: "flex", alignItems: "center", justifyContent: "space-between",
//                 background: s.status === "available" ? "rgba(184,255,87,0.04)" : C.surface,
//                 border: `1px solid ${s.status === "available" ? "rgba(184,255,87,0.15)" : C.border}`,
//                 borderRadius: 14, padding: "12px 16px",
//                 opacity: s.status === "taken" ? 0.5 : 1,
//                 cursor: s.status !== "taken" ? "pointer" : "default",
//                 transition: "all 0.2s",
//               }}
//             >
//               <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
//                 <div style={{ width: 36, height: 36, borderRadius: 10, background: statusColor[s.status] + "22", display: "flex", alignItems: "center", justifyContent: "center" }}>
//                   <span className="display-font" style={{ fontSize: 13, fontWeight: 800, color: statusColor[s.status] }}>{s.id}</span>
//                 </div>
//                 <div>
//                   <p style={{ fontSize: 13, fontWeight: 500, color: C.text }}>{s.type}</p>
//                   <p style={{ fontSize: 11, color: C.muted }}>{s.dist} away</p>
//                 </div>
//               </div>
//               <div style={{ textAlign: "right" }}>
//                 <p className="display-font" style={{ fontSize: 15, fontWeight: 700, color: s.status === "available" ? C.accent : C.muted }}>{s.price}<span style={{ fontSize: 11, fontWeight: 400, color: C.muted }}>/hr</span></p>
//                 <div style={{ display: "flex", alignItems: "center", gap: 4, justifyContent: "flex-end", marginTop: 2 }}>
//                   <span style={{ width: 6, height: 6, borderRadius: "50%", background: statusColor[s.status], display: "inline-block" }} />
//                   <span style={{ fontSize: 10, color: C.muted, textTransform: "capitalize" }}>{s.status}</span>
//                 </div>
//               </div>
//             </motion.div>
//           ))}
//         </div>

//         {/* CTA */}
//         <div style={{ marginTop: 18 }}>
//           <button className="btn-primary" style={{ width: "100%", justifyContent: "center" }}>
//             Reserve Spot A12 — $3.50/hr
//           </button>
//         </div>
//       </div>

//       {/* Floating badge 1 */}
//       <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
//         style={{ position: "absolute", top: -20, left: -24, background: C.card, borderRadius: 14, border: `1px solid ${C.border}`, padding: "12px 16px", display: "flex", alignItems: "center", gap: 10, boxShadow: "0 20px 40px rgba(0,0,0,0.4)" }}>
//         <div style={{ width: 36, height: 36, borderRadius: 10, background: C.accentDim, display: "flex", alignItems: "center", justifyContent: "center" }}>
//           <Zap size={16} color={C.accent} />
//         </div>
//         <div>
//           <p className="display-font" style={{ fontSize: 15, fontWeight: 700, color: C.white }}>0:08s</p>
//           <p style={{ fontSize: 11, color: C.muted }}>Avg booking time</p>
//         </div>
//       </motion.div>

//       {/* Floating badge 2 */}
//       <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
//         style={{ position: "absolute", bottom: 80, right: -28, background: C.card, borderRadius: 14, border: `1px solid ${C.border}`, padding: "10px 14px", boxShadow: "0 20px 40px rgba(0,0,0,0.4)" }}>
//         <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
//           <TrendingUp size={12} color={C.accent} />
//           <span style={{ fontSize: 11, color: C.accent, fontWeight: 600 }}>92% success rate</span>
//         </div>
//         <div style={{ height: 4, borderRadius: 2, background: C.surface, width: 100, overflow: "hidden" }}>
//           <motion.div animate={{ width: ["0%", "92%"] }} transition={{ duration: 1.5, delay: 0.8 }}
//             style={{ height: "100%", borderRadius: 2, background: C.accent }} />
//         </div>
//       </motion.div>
//     </div>
//   );
// }

// /* ─── Marquee Stats ──────────────────────────────────────────────── */
// function MarqueeStats() {
//   const items = [
//     "40+ Cities", "⚡ 120K+ Drivers", "🅿️ 850K+ Bookings",
//     "★ 4.9 Rating", "🔒 256-bit Encryption", "⚡ 8s Avg Booking",
//     "40+ Cities", "⚡ 120K+ Drivers", "🅿️ 850K+ Bookings",
//     "★ 4.9 Rating", "🔒 256-bit Encryption", "⚡ 8s Avg Booking",
//   ];

//   return (
//     <div style={{ borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, background: C.surface, overflow: "hidden", padding: "16px 0" }}>
//       <div className="marquee-track" style={{ display: "flex", gap: 0, whiteSpace: "nowrap", width: "max-content" }}>
//         {items.map((item, i) => (
//           <div key={i} style={{ display: "inline-flex", alignItems: "center", gap: 32, padding: "0 36px" }}>
//             <span style={{ fontSize: 13, fontWeight: 500, color: C.muted }}>{item}</span>
//             <span style={{ color: C.border, fontSize: 20 }}>|</span>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// /* ─── Features Section ───────────────────────────────────────────── */
// function FeaturesSection() {
//   const features = [
//     {
//       icon: Clock, title: "Real-Time Availability",
//       desc: "Live spot updates every 10 seconds. No stale data, no wasted drives. Know before you go.",
//       accent: C.accent, size: "large",
//     },
//     {
//       icon: Navigation, title: "Smart Navigation",
//       desc: "GPS-guided routing straight to your reserved spot.",
//       accent: C.blue, size: "small",
//     },
//     {
//       icon: Shield, title: "24/7 Security",
//       desc: "All lots are CCTV-monitored with on-site security personnel.",
//       accent: "#FF6B6B", size: "small",
//     },
//     {
//       icon: Zap, title: "Instant Booking",
//       desc: "Reserve and confirm in under 10 seconds. Pay as you go or pre-pay for better rates.",
//       accent: "#FFB347", size: "medium",
//     },
//     {
//       icon: CreditCard, title: "Transparent Pricing",
//       desc: "No hidden fees. What you see is what you pay.",
//       accent: "#C084FC", size: "medium",
//     },
//     {
//       icon: Car, title: "Valet Services",
//       desc: "White-glove valet in premium locations.",
//       accent: C.accent, size: "small",
//     },
//   ];

//   return (
//     <section id="features" style={{ padding: "120px 0", position: "relative" }}>
//       <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 28px" }}>

//         <FadeIn>
//           <div style={{ textAlign: "center", marginBottom: 72 }}>
//             <div className="badge-pill" style={{ marginBottom: 16 }}>Features</div>
//             <h2 className="display-font" style={{ fontSize: "clamp(36px,5vw,60px)", fontWeight: 800, letterSpacing: "-0.04em", color: C.white, lineHeight: 1.05, marginBottom: 18 }}>
//               Everything you need to park with confidence
//             </h2>
//             <p style={{ color: C.muted, fontSize: 17, maxWidth: 500, margin: "0 auto" }}>
//               Thoughtfully designed to make the worst part of driving the easiest.
//             </p>
//           </div>
//         </FadeIn>

//         {/* Bento Grid */}
//         <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18 }} className="lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
//           {features.map((f, i) => {
//             const Icon = f.icon;
//             const colSpan = f.size === "large" ? 2 : 1;
//             return (
//               <FadeIn key={i} delay={i * 0.06} style={{ gridColumn: `span ${colSpan}` }}>
//                 <div className="card-hover noise"
//                   style={{
//                     background: C.card, borderRadius: 24, border: `1px solid ${C.border}`,
//                     padding: "32px 36px", height: "100%", position: "relative", overflow: "hidden",
//                     gridColumn: `span ${colSpan}`,
//                   }}>
//                   {/* Background glow */}
//                   <div style={{ position: "absolute", top: -60, right: -60, width: 200, height: 200, borderRadius: "50%", background: `radial-gradient(circle, ${f.accent}18 0%, transparent 70%)`, pointerEvents: "none" }} />

//                   <div style={{ width: 48, height: 48, borderRadius: 14, background: f.accent + "18", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 24, border: `1px solid ${f.accent}30` }}>
//                     <Icon size={22} color={f.accent} strokeWidth={1.8} />
//                   </div>

//                   <h3 className="display-font" style={{ fontSize: 20, fontWeight: 700, color: C.white, marginBottom: 12, letterSpacing: "-0.02em" }}>{f.title}</h3>
//                   <p style={{ fontSize: 14, color: C.muted, lineHeight: 1.7 }}>{f.desc}</p>

//                   {f.size === "large" && (
//                     <div style={{ marginTop: 28, display: "flex", gap: 12 }}>
//                       {["Updates every 10s", "Never stale", "100% accurate"].map(tag => (
//                         <div key={tag} style={{ background: f.accent + "14", border: `1px solid ${f.accent}25`, borderRadius: 8, padding: "5px 12px", fontSize: 12, color: f.accent, fontWeight: 500 }}>{tag}</div>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               </FadeIn>
//             );
//           })}
//         </div>

//       </div>
//     </section>
//   );
// }

// /* ─── How It Works ───────────────────────────────────────────────── */
// function HowItWorksSection() {
//   const steps = [
//     { n: "01", title: "Open the App", desc: "Enter your destination and when you're arriving. ParkEase shows every available spot in real-time.", icon: MapPin },
//     { n: "02", title: "Choose & Reserve", desc: "Pick your preferred spot by price, distance, or type. Confirm your booking in one tap.", icon: CheckCircle },
//     { n: "03", title: "Navigate & Park", desc: "Follow the guided route directly to your spot. Your space is held until you arrive.", icon: Navigation },
//   ];

//   return (
//     <section style={{ padding: "100px 0", background: C.surface, position: "relative", overflow: "hidden" }}>
//       <div className="orb-2" style={{ opacity: 0.6, right: "auto", left: -100, top: 50, bottom: "auto" }} />
//       <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 28px", position: "relative", zIndex: 1 }}>

//         <FadeIn>
//           <div style={{ textAlign: "center", marginBottom: 72 }}>
//             <div className="badge-pill" style={{ marginBottom: 16 }}>How It Works</div>
//             <h2 className="display-font" style={{ fontSize: "clamp(36px,5vw,56px)", fontWeight: 800, letterSpacing: "-0.04em", color: C.white, lineHeight: 1.05 }}>
//               Parked in 3 steps
//             </h2>
//           </div>
//         </FadeIn>

//         <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }} className="lg:grid-cols-3 grid-cols-1">
//           {steps.map((s, i) => {
//             const Icon = s.icon;
//             return (
//               <FadeIn key={i} delay={i * 0.12}>
//                 <div style={{ position: "relative", padding: "40px 36px", background: C.card, borderRadius: 24, border: `1px solid ${C.border}` }} className="card-hover">
//                   {/* Step number */}
//                   <div className="display-font" style={{ fontSize: 64, fontWeight: 800, color: C.accentDim, position: "absolute", top: 20, right: 28, lineHeight: 1, userSelect: "none", letterSpacing: "-0.05em", color: "rgba(184,255,87,0.08)" }}>
//                     {s.n}
//                   </div>

//                   <div style={{ width: 52, height: 52, borderRadius: 15, background: C.accentDim, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 28, border: `1px solid rgba(184,255,87,0.2)` }}>
//                     <Icon size={22} color={C.accent} strokeWidth={1.8} />
//                   </div>

//                   <h3 className="display-font" style={{ fontSize: 22, fontWeight: 700, color: C.white, marginBottom: 14, letterSpacing: "-0.025em" }}>{s.title}</h3>
//                   <p style={{ fontSize: 14, color: C.muted, lineHeight: 1.75 }}>{s.desc}</p>

//                   {i < 2 && (
//                     <div style={{ position: "absolute", right: -30, top: "50%", transform: "translateY(-50%)", zIndex: 2, display: "none" }} className="lg:block">
//                       <ChevronRight size={20} color={C.muted} />
//                     </div>
//                   )}
//                 </div>
//               </FadeIn>
//             );
//           })}
//         </div>
//       </div>
//     </section>
//   );
// }

// /* ─── Pricing Section ────────────────────────────────────────────── */
// function PricingSection() {
//   const perks = [
//     "Unlimited bookings per month",
//     "Access to 40+ city networks",
//     "Real-time availability alerts",
//     "Priority lane & valet access",
//     "24/7 concierge support",
//     "Monthly billing, cancel anytime",
//   ];

//   return (
//     <section id="pricing" style={{ padding: "120px 0", position: "relative", overflow: "hidden" }}>
//       <div className="orb-1" style={{ top: "auto", bottom: -100, right: -100 }} />

//       <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 28px", position: "relative", zIndex: 1 }}>
//         <FadeIn>
//           <div style={{ textAlign: "center", marginBottom: 56 }}>
//             <div className="badge-pill" style={{ marginBottom: 16 }}>Pricing</div>
//             <h2 className="display-font" style={{ fontSize: "clamp(36px,5vw,60px)", fontWeight: 800, letterSpacing: "-0.04em", color: C.white, lineHeight: 1.05, marginBottom: 14 }}>
//               One plan. Everything included.
//             </h2>
//             <p style={{ color: C.muted, fontSize: 16 }}>No tiers, no confusion. Just frictionless parking.</p>
//           </div>
//         </FadeIn>

//         <FadeIn delay={0.1}>
//           <div style={{ maxWidth: 640, margin: "0 auto", background: C.card, borderRadius: 32, border: `1px solid rgba(184,255,87,0.15)`, overflow: "hidden", boxShadow: "0 0 80px rgba(184,255,87,0.06), 0 60px 80px rgba(0,0,0,0.4)" }}>

//             {/* Top gradient strip */}
//             <div style={{ height: 4, background: `linear-gradient(90deg, ${C.accent}, ${C.blue})` }} />

//             <div style={{ padding: "44px 48px" }}>
//               <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 36 }}>
//                 <div>
//                   <div className="badge-pill" style={{ marginBottom: 14 }}>Most popular</div>
//                   <h3 className="display-font" style={{ fontSize: 26, fontWeight: 800, color: C.white, letterSpacing: "-0.03em" }}>ParkEase Pro</h3>
//                   <p style={{ fontSize: 14, color: C.muted, marginTop: 6 }}>Full access, every feature.</p>
//                 </div>
//                 <div style={{ textAlign: "right" }}>
//                   <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
//                     <span className="display-font" style={{ fontSize: 56, fontWeight: 800, color: C.accent, lineHeight: 1, letterSpacing: "-0.04em" }}>$9</span>
//                     <span style={{ fontSize: 16, color: C.muted }}>/mo</span>
//                   </div>
//                   <p style={{ fontSize: 12, color: C.muted }}>Billed monthly</p>
//                 </div>
//               </div>

//               <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px 24px", marginBottom: 36 }}>
//                 {perks.map((p, i) => (
//                   <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
//                     <CheckCircle size={16} color={C.accent} style={{ flexShrink: 0, marginTop: 2 }} />
//                     <span style={{ fontSize: 13.5, color: C.muted, lineHeight: 1.5 }}>{p}</span>
//                   </div>
//                 ))}
//               </div>

//               <a href="/signup" className="btn-primary" style={{ width: "100%", justifyContent: "center", fontSize: 16, padding: "16px 28px" }}>
//                 Start your free 14-day trial <ArrowRight size={18} />
//               </a>
//               <p style={{ textAlign: "center", fontSize: 12, color: C.muted, marginTop: 14 }}>
//                 <Lock size={10} style={{ display: "inline", marginRight: 5 }} />
//                 No credit card required to start
//               </p>
//             </div>
//           </div>
//         </FadeIn>
//       </div>
//     </section>
//   );
// }

// /* ─── CTA Banner ─────────────────────────────────────────────────── */
// function CTASection() {
//   return (
//     <section style={{ padding: "0 28px 120px" }}>
//       <FadeIn>
//         <div style={{ maxWidth: 1200, margin: "0 auto", borderRadius: 32, background: `linear-gradient(135deg, ${C.accent}18 0%, ${C.blue}12 100%)`, border: `1px solid rgba(184,255,87,0.15)`, padding: "72px 56px", textAlign: "center", position: "relative", overflow: "hidden" }}>
//           <div style={{ position: "absolute", inset: 0, backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.02'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")", pointerEvents: "none", borderRadius: 32 }} />

//           <div className="badge-pill" style={{ marginBottom: 20 }}>
//             <span className="tag-dot" />
//             Free 14-day trial
//           </div>

//           <h2 className="display-font" style={{ fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 800, letterSpacing: "-0.04em", color: C.white, lineHeight: 1.05, marginBottom: 18 }}>
//             Stop hunting for parking.{" "}
//             <span style={{ color: C.accent }}>Start owning it.</span>
//           </h2>

//           <p style={{ fontSize: 17, color: C.muted, maxWidth: 480, margin: "0 auto 36px" }}>
//             Join 120,000+ drivers who've reclaimed hours of their lives every month.
//           </p>

//           <div style={{ display: "flex", justifyContent: "center", gap: 14, flexWrap: "wrap" }}>
//             <a href="/signup" className="btn-primary" style={{ fontSize: 16, padding: "16px 36px" }}>
//               Get started free <ArrowRight size={18} />
//             </a>
//             <a href="#features" className="btn-ghost" style={{ fontSize: 15 }}>See all features</a>
//           </div>
//         </div>
//       </FadeIn>
//     </section>
//   );
// }

// /* ─── Footer ─────────────────────────────────────────────────────── */
// function Footer() {
//   const links = {
//     Product: ["Features", "Pricing", "Changelog", "Roadmap"],
//     Company: ["About", "Blog", "Careers", "Press"],
//     Legal: ["Privacy", "Terms", "Cookies"],
//   };

//   return (
//     <footer style={{ borderTop: `1px solid ${C.border}`, background: C.surface }}>
//       <div style={{ maxWidth: 1200, margin: "0 auto", padding: "64px 28px 40px" }}>
//         <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 40, marginBottom: 56 }}>
//           <div>
//             <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
//               <div style={{ width: 32, height: 32, borderRadius: 9, background: C.accent, display: "flex", alignItems: "center", justifyContent: "center" }}>
//                 <Car size={16} color={C.bg} strokeWidth={2.5} />
//               </div>
//               <span className="display-font" style={{ fontWeight: 800, fontSize: 18, color: C.white }}>ParkEase</span>
//             </div>
//             <p style={{ fontSize: 13, color: C.muted, lineHeight: 1.7, maxWidth: 240 }}>
//               Real-time parking intelligence for modern drivers. Smart. Fast. Reliable.
//             </p>
//           </div>

//           {Object.entries(links).map(([heading, items]) => (
//             <div key={heading}>
//               <p className="display-font" style={{ fontSize: 13, fontWeight: 700, color: C.text, marginBottom: 18, letterSpacing: "0.02em", textTransform: "uppercase" }}>{heading}</p>
//               <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
//                 {items.map(item => (
//                   <a key={item} href="#" style={{ fontSize: 13, color: C.muted, textDecoration: "none", transition: "color 0.2s" }}
//                     onMouseOver={e => e.target.style.color = C.text}
//                     onMouseOut={e => e.target.style.color = C.muted}>{item}</a>
//                 ))}
//               </div>
//             </div>
//           ))}
//         </div>

//         <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: `1px solid ${C.border}`, paddingTop: 28 }}>
//           <p style={{ fontSize: 12, color: C.muted }}>© 2026 ParkEase, Inc. All rights reserved.</p>
//           <div style={{ display: "flex", gap: 20, fontSize: 12, color: C.muted }}>
//             {["Twitter", "LinkedIn", "GitHub"].map(s => (
//               <a key={s} href="#" style={{ color: C.muted, textDecoration: "none", transition: "color 0.2s" }}
//                 onMouseOver={e => e.target.style.color = C.text}
//                 onMouseOut={e => e.target.style.color = C.muted}>{s}</a>
//             ))}
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// }

// /* ─── Root ───────────────────────────────────────────────────────── */
// export default function App() {
//   return (
//     <>
//       <style>{fontStyle}</style>
//       <div className="parkease-root">
//         <Navbar />
//         <HeroSection />
//         <MarqueeStats />
//         <FeaturesSection />
//         <HowItWorksSection />
//         <PricingSection />
//         <CTASection />
//         <Footer />
//       </div>
//     </>
//   );
// }

import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Car, Clock, MapPin, CreditCard, Shield, Zap,
  CheckCircle, ArrowRight, Menu, X, Navigation,
  TrendingUp, Users, Star, ChevronRight, Lock
} from "lucide-react";

/* ─── Design Tokens ──────────────────────────────────────── */
const C = {
  bg:        "#020308",
  surface:   "#0B0D17",
  card:      "#0F1220",
  border:    "rgba(255,255,255,0.07)",
  accent:    "#B8FF57",
  accentDim: "rgba(184,255,87,0.12)",
  blue:      "#4B9EFF",
  blueDim:   "rgba(75,158,255,0.12)",
  text:      "#F0F4FF",
  muted:     "#6B7594",
  white:     "#FFFFFF",
};

/* ─── Responsive Hook (JS-only, no @media in style objects) ─ */
function useIsMobile(bp = 768) {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth < bp : false
  );
  useEffect(() => {
    const fn = () => setIsMobile(window.innerWidth < bp);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, [bp]);
  return isMobile;
}

/* ─── Global CSS (no @media inside style objects) ────────── */
const globalCSS = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body { background: ${C.bg}; }
  .pe-root { font-family: 'DM Sans', sans-serif; background: ${C.bg}; color: ${C.text}; min-height: 100vh; overflow-x: hidden; }
  .syne { font-family: 'Syne', sans-serif; }
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: ${C.bg}; }
  ::-webkit-scrollbar-thumb { background: ${C.accentDim}; border-radius: 2px; }
  @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
  .marquee-track { animation: marquee 22s linear infinite; }
  .marquee-track:hover { animation-play-state: paused; }
  @keyframes orbFloat { from { transform: translate(0,0) scale(1); } to { transform: translate(20px,30px) scale(1.05); } }
  @keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:0.4; } }
  @keyframes spin { to { transform: rotate(360deg); } }
  .orb-1 { position:absolute; border-radius:50%; filter:blur(120px); pointer-events:none; width:500px; height:500px; background:radial-gradient(circle,rgba(184,255,87,0.14) 0%,transparent 70%); top:-100px; right:-80px; animation:orbFloat 9s ease-in-out infinite alternate; }
  .orb-2 { position:absolute; border-radius:50%; filter:blur(100px); pointer-events:none; width:380px; height:380px; background:radial-gradient(circle,rgba(75,158,255,0.12) 0%,transparent 70%); bottom:40px; left:-80px; animation:orbFloat 12s ease-in-out infinite alternate-reverse; }
  .grid-line { background-image: linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px); background-size: 60px 60px; }
  .badge-pill { display:inline-flex; align-items:center; gap:6px; padding:5px 12px; border-radius:100px; font-size:12px; font-weight:500; letter-spacing:0.04em; background:${C.accentDim}; color:${C.accent}; border:1px solid rgba(184,255,87,0.2); }
  .card-h { transition:border-color 0.3s,box-shadow 0.3s,transform 0.3s; }
  .card-h:hover { border-color:rgba(184,255,87,0.2)!important; box-shadow:0 0 40px rgba(184,255,87,0.06); transform:translateY(-3px); }
  .btn-p { display:inline-flex; align-items:center; gap:8px; padding:14px 28px; border-radius:12px; font-weight:600; background:${C.accent}; color:${C.bg}; font-family:'Syne',sans-serif; font-size:15px; transition:all 0.25s; border:none; cursor:pointer; text-decoration:none; }
  .btn-p:hover { background:#cbff6e; box-shadow:0 0 32px rgba(184,255,87,0.4); transform:translateY(-1px); }
  .btn-g { display:inline-flex; align-items:center; gap:8px; padding:14px 28px; border-radius:12px; font-weight:500; background:transparent; color:${C.muted}; font-family:'DM Sans',sans-serif; font-size:15px; transition:all 0.25s; border:1px solid ${C.border}; cursor:pointer; text-decoration:none; }
  .btn-g:hover { border-color:rgba(255,255,255,0.2); color:${C.text}; }
  .tag-dot { width:6px; height:6px; border-radius:50%; background:${C.accent}; display:inline-block; box-shadow:0 0 8px ${C.accent}; animation:pulse 2s infinite; }
  .nav-link { color:${C.muted}; text-decoration:none; transition:color 0.2s; font-size:14px; font-weight:500; }
  .nav-link:hover { color:${C.text}; }
  .spot-row { transition:background 0.2s; }
  .spot-row:hover { background:rgba(184,255,87,0.06)!important; }
`;

/* ─── FadeIn wrapper ─────────────────────────────────────── */
function FadeIn({ children, delay = 0, direction = "up", style = {} }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const yVal = direction === "up" ? 36 : direction === "down" ? -36 : 0;
  const xVal = direction === "left" ? 36 : direction === "right" ? -36 : 0;
  return (
    <motion.div ref={ref} style={style}
      initial={{ opacity: 0, y: yVal, x: xVal }}
      animate={inView ? { opacity: 1, y: 0, x: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  );
}

/* ─── Navbar ─────────────────────────────────────────────── */
function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isMobile = useIsMobile(768);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // Close menu on resize to desktop
  useEffect(() => { if (!isMobile) setOpen(false); }, [isMobile]);

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        borderBottom: scrolled ? `1px solid ${C.border}` : "1px solid transparent",
        background: scrolled ? "rgba(2,3,8,0.9)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        transition: "all 0.4s",
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 32, height: 32, borderRadius: 9, background: C.accent, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <Car size={16} color={C.bg} strokeWidth={2.5} />
            </div>
            <span className="syne" style={{ fontWeight: 800, fontSize: 18, color: C.white, letterSpacing: "-0.02em" }}>ParkEase</span>
          </div>

          {/* Desktop nav */}
          {!isMobile && (
            <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
              {["Features", "Pricing", "About"].map(l => (
                <a key={l} href={`#${l.toLowerCase()}`} className="nav-link">{l}</a>
              ))}
              <a href="/login" className="nav-link">Log in</a>
              <a href="/signup" className="btn-p" style={{ padding: "9px 20px", fontSize: 14 }}>Get Started</a>
            </div>
          )}

          {/* Hamburger */}
          {isMobile && (
            <button onClick={() => setOpen(o => !o)} style={{ background: "none", border: "none", cursor: "pointer", color: C.text, padding: 4, display: "flex", alignItems: "center" }}>
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          )}
        </div>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && isMobile && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            style={{ position: "fixed", top: 64, left: 0, right: 0, zIndex: 99, background: C.surface, borderBottom: `1px solid ${C.border}`, padding: "20px 24px", display: "flex", flexDirection: "column", gap: 18 }}>
            {["Features", "Pricing", "About", "Log in"].map(l => (
              <a key={l} href="#" onClick={() => setOpen(false)} className="nav-link" style={{ fontSize: 16 }}>{l}</a>
            ))}
            <a href="/signup" className="btn-p" onClick={() => setOpen(false)} style={{ justifyContent: "center", textAlign: "center" }}>Get Started →</a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ─── Hero ───────────────────────────────────────────────── */
function HeroSection() {
  const isMobile = useIsMobile(900);
  return (
    <section style={{ minHeight: "100vh", display: "flex", alignItems: "center", position: "relative", overflow: "hidden", paddingTop: 64 }} className="grid-line">
      <div className="orb-1" />
      <div className="orb-2" />
      <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to bottom, transparent 60%, ${C.bg})`, pointerEvents: "none" }} />

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: isMobile ? "40px 20px 60px" : "80px 28px", width: "100%", position: "relative", zIndex: 1 }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
          gap: isMobile ? 48 : 64,
          alignItems: "center",
        }}>
          {/* Copy */}
          <div>
            <FadeIn>
              <div className="badge-pill" style={{ marginBottom: 24 }}>
                <span className="tag-dot" /> Now in 40+ cities worldwide
              </div>
            </FadeIn>

            <FadeIn delay={0.08}>
              <h1 className="syne" style={{
                fontSize: isMobile ? "clamp(40px, 11vw, 60px)" : "clamp(44px, 5vw, 76px)",
                fontWeight: 800, lineHeight: 1.0, letterSpacing: "-0.04em", marginBottom: 20, color: C.white
              }}>
                Park Smarter.{" "}
                <span style={{ color: C.accent, display: "block" }}>Never Circle Again.</span>
              </h1>
            </FadeIn>

            <FadeIn delay={0.14}>
              <p style={{ fontSize: isMobile ? 15 : 18, lineHeight: 1.7, color: C.muted, marginBottom: 32, maxWidth: 440 }}>
                Real-time parking intelligence that finds, reserves, and guides you to your spot before you even leave home.
              </p>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <a href="/signup" className="btn-p" style={{ fontSize: isMobile ? 14 : 15, padding: isMobile ? "12px 22px" : "14px 28px" }}>
                  Start Free Trial <ArrowRight size={16} />
                </a>
                <a href="#features" className="btn-g" style={{ fontSize: isMobile ? 14 : 15, padding: isMobile ? "12px 22px" : "14px 28px" }}>
                  See how it works
                </a>
              </div>
            </FadeIn>

            {/* Social proof */}
            <FadeIn delay={0.28}>
              <div style={{ marginTop: 40, display: "flex", alignItems: "center", gap: 16 }}>
                <div style={{ display: "flex" }}>
                  {["#4B9EFF","#B8FF57","#FF6B6B","#FFB347"].map((c, i) => (
                    <div key={i} style={{ width: 30, height: 30, borderRadius: "50%", border: `2px solid ${C.bg}`, background: c, marginLeft: i > 0 ? -9 : 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: C.bg }}>
                      {["A","B","C","D"][i]}
                    </div>
                  ))}
                </div>
                <div>
                  <div style={{ display: "flex", gap: 2, marginBottom: 3 }}>
                    {[...Array(5)].map((_,i) => <Star key={i} size={11} fill="#FFB347" color="#FFB347" />)}
                  </div>
                  <p style={{ fontSize: 12, color: C.muted }}>Trusted by <strong style={{ color: C.text }}>120,000+</strong> drivers</p>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Mockup */}
          <FadeIn delay={0.18} direction={isMobile ? "up" : "left"}>
            <AppMockup isMobile={isMobile} />
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

/* ─── App Mockup ─────────────────────────────────────────── */
function AppMockup({ isMobile }) {
  const spots = [
    { id: "A12", type: "Standard",  price: "$3.50", status: "available", dist: "120m" },
    { id: "B04", type: "Compact",   price: "$2.80", status: "available", dist: "200m" },
    { id: "C17", type: "EV Charge", price: "$4.20", status: "filling",   dist: "85m"  },
    { id: "D08", type: "Disabled",  price: "Free",  status: "taken",     dist: "150m" },
  ];
  const statusColor = { available: C.accent, filling: "#FFB347", taken: "#FF6B6B" };

  return (
    <div style={{ position: "relative", padding: isMobile ? "0" : "24px 28px 60px" }}>
      {/* Main card */}
      <div style={{
        background: C.card, borderRadius: 24, border: `1px solid ${C.border}`,
        padding: isMobile ? 18 : 24,
        boxShadow: "0 60px 120px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04)",
        position: "relative",
      }}>
        {/* Map */}
        <div style={{ borderRadius: 16, height: isMobile ? 160 : 200, marginBottom: 16, background: "linear-gradient(135deg,#0D1633 0%,#0A1F2E 50%,#0D1A33 100%)", position: "relative", overflow: "hidden", border: `1px solid rgba(75,158,255,0.1)` }}>
          <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.3 }} viewBox="0 0 400 200" preserveAspectRatio="xMidYMid slice">
            {[40,80,120,160,200,240,280,320,360].map(x => <line key={x} x1={x} y1="0" x2={x} y2="200" stroke="#4B9EFF" strokeWidth="0.5"/>)}
            {[40,80,120,160].map(y => <line key={y} x1="0" y1={y} x2="400" y2={y} stroke="#4B9EFF" strokeWidth="0.5"/>)}
          </svg>
          <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.6 }} viewBox="0 0 400 200">
            <path d="M 200 180 Q 200 120, 260 100 Q 310 80, 310 45" stroke={C.accent} strokeWidth="2.5" fill="none" strokeDasharray="6 4" strokeLinecap="round"/>
          </svg>
          {/* You */}
          <div style={{ position: "absolute", bottom: 25, left: "50%", transform: "translateX(-50%)" }}>
            <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }}
              style={{ width: 12, height: 12, borderRadius: "50%", background: C.blue, border: "3px solid white", boxShadow: `0 0 16px ${C.blue}` }} />
          </div>
          {/* Pin */}
          <div style={{ position: "absolute", top: 20, right: 65 }}>
            <motion.div animate={{ y: [0, -4, 0] }} transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}>
              <div style={{ background: C.accent, borderRadius: "50% 50% 50% 0", width: 28, height: 28, transform: "rotate(-45deg)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 0 16px ${C.accent}66` }}>
                <span style={{ transform: "rotate(45deg)", fontSize: 12, fontWeight: 800, color: C.bg, fontFamily: "Syne,sans-serif" }}>P</span>
              </div>
            </motion.div>
          </div>
          {/* Nav badge */}
          <div style={{ position: "absolute", top: 10, left: 10, background: "rgba(0,0,0,0.6)", backdropFilter: "blur(12px)", borderRadius: 8, padding: "5px 10px", display: "flex", alignItems: "center", gap: 5 }}>
            <Navigation size={11} color={C.accent} />
            <span style={{ fontSize: 10, color: C.text, fontWeight: 500 }}>Live Navigation</span>
          </div>
        </div>

        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <div>
            <p style={{ fontSize: 11, color: C.muted, marginBottom: 1 }}>Available near you</p>
            <h3 className="syne" style={{ fontSize: 16, fontWeight: 700, color: C.white }}>4 spots found</h3>
          </div>
          <div style={{ background: C.accentDim, borderRadius: 7, padding: "3px 9px", fontSize: 11, color: C.accent, fontWeight: 500 }}>↻ Live</div>
        </div>

        {/* Spots */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {spots.map((s, i) => (
            <motion.div key={s.id} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 + i * 0.08 }}
              className="spot-row"
              style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                background: s.status === "available" ? "rgba(184,255,87,0.04)" : C.surface,
                border: `1px solid ${s.status === "available" ? "rgba(184,255,87,0.15)" : C.border}`,
                borderRadius: 12, padding: "10px 13px",
                opacity: s.status === "taken" ? 0.5 : 1,
                cursor: s.status !== "taken" ? "pointer" : "default",
              }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 32, height: 32, borderRadius: 9, background: statusColor[s.status] + "22", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <span className="syne" style={{ fontSize: 11, fontWeight: 800, color: statusColor[s.status] }}>{s.id}</span>
                </div>
                <div>
                  <p style={{ fontSize: 12, fontWeight: 500, color: C.text }}>{s.type}</p>
                  <p style={{ fontSize: 10, color: C.muted }}>{s.dist} away</p>
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <p className="syne" style={{ fontSize: 13, fontWeight: 700, color: s.status === "available" ? C.accent : C.muted }}>{s.price}<span style={{ fontSize: 10, color: C.muted }}>/hr</span></p>
                <div style={{ display: "flex", alignItems: "center", gap: 3, justifyContent: "flex-end", marginTop: 2 }}>
                  <span style={{ width: 5, height: 5, borderRadius: "50%", background: statusColor[s.status], display: "inline-block" }} />
                  <span style={{ fontSize: 9, color: C.muted, textTransform: "capitalize" }}>{s.status}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ marginTop: 14 }}>
          <button className="btn-p" style={{ width: "100%", justifyContent: "center", fontSize: 13, padding: "12px" }}>
            Reserve Spot A12 — $3.50/hr
          </button>
        </div>
      </div>

      {/* Floating badges — hidden on mobile to avoid overflow */}
      {!isMobile && (
        <>
          <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            style={{ position: "absolute", top: 8, left: 4, background: C.card, borderRadius: 14, border: `1px solid ${C.border}`, padding: "10px 14px", display: "flex", alignItems: "center", gap: 10, boxShadow: "0 20px 40px rgba(0,0,0,0.4)", zIndex: 2 }}>
            <div style={{ width: 34, height: 34, borderRadius: 10, background: C.accentDim, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Zap size={15} color={C.accent} />
            </div>
            <div>
              <p className="syne" style={{ fontSize: 14, fontWeight: 700, color: C.white }}>0:08s</p>
              <p style={{ fontSize: 10, color: C.muted }}>Avg booking time</p>
            </div>
          </motion.div>

          <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            style={{ position: "absolute", bottom: 36, right: 4, background: C.card, borderRadius: 14, border: `1px solid ${C.border}`, padding: "10px 14px", boxShadow: "0 20px 40px rgba(0,0,0,0.4)", zIndex: 2 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
              <TrendingUp size={11} color={C.accent} />
              <span style={{ fontSize: 11, color: C.accent, fontWeight: 600 }}>92% success rate</span>
            </div>
            <div style={{ height: 4, borderRadius: 2, background: C.surface, width: 90, overflow: "hidden" }}>
              <motion.div animate={{ width: ["0%","92%"] }} transition={{ duration: 1.5, delay: 0.8 }}
                style={{ height: "100%", borderRadius: 2, background: C.accent }} />
            </div>
          </motion.div>
        </>
      )}

      {/* Mobile inline badges */}
      {isMobile && (
        <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
          <div style={{ flex: 1, background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: "10px 12px", display: "flex", alignItems: "center", gap: 8 }}>
            <Zap size={14} color={C.accent} />
            <div>
              <p className="syne" style={{ fontSize: 13, fontWeight: 700, color: C.white }}>0:08s</p>
              <p style={{ fontSize: 10, color: C.muted }}>Avg booking</p>
            </div>
          </div>
          <div style={{ flex: 1, background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: "10px 12px", display: "flex", alignItems: "center", gap: 8 }}>
            <TrendingUp size={14} color={C.accent} />
            <div>
              <p className="syne" style={{ fontSize: 13, fontWeight: 700, color: C.accent }}>92%</p>
              <p style={{ fontSize: 10, color: C.muted }}>Success rate</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── Marquee ────────────────────────────────────────────── */
function MarqueeStats() {
  const items = [
    "40+ Cities","⚡ 120K+ Drivers","🅿️ 850K+ Bookings",
    "★ 4.9 Rating","🔒 256-bit Encryption","⚡ 8s Avg Booking",
    "40+ Cities","⚡ 120K+ Drivers","🅿️ 850K+ Bookings",
    "★ 4.9 Rating","🔒 256-bit Encryption","⚡ 8s Avg Booking",
  ];
  return (
    <div style={{ borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, background: C.surface, overflow: "hidden", padding: "14px 0" }}>
      <div className="marquee-track" style={{ display: "flex", gap: 0, whiteSpace: "nowrap", width: "max-content" }}>
        {items.map((item, i) => (
          <div key={i} style={{ display: "inline-flex", alignItems: "center", gap: 28, padding: "0 28px" }}>
            <span style={{ fontSize: 13, fontWeight: 500, color: C.muted }}>{item}</span>
            <span style={{ color: C.border, fontSize: 18 }}>|</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Features ───────────────────────────────────────────── */
function FeaturesSection() {
  const isMobile = useIsMobile(768);
  const isTablet = useIsMobile(1024);

  const features = [
    { icon: Clock,      title: "Real-Time Availability", desc: "Live spot updates every 10 seconds. No stale data, no wasted drives. Know before you go.", accent: C.accent, tags: ["Updates every 10s","Never stale","100% accurate"], large: true },
    { icon: Navigation, title: "Smart Navigation",        desc: "GPS-guided routing straight to your reserved spot.", accent: C.blue },
    { icon: Shield,     title: "24/7 Security",           desc: "All lots are CCTV-monitored with on-site security.", accent: "#FF6B6B" },
    { icon: Zap,        title: "Instant Booking",         desc: "Reserve and confirm in under 10 seconds. Pay as you go or pre-pay for better rates.", accent: "#FFB347" },
    { icon: CreditCard, title: "Transparent Pricing",     desc: "No hidden fees. What you see is what you pay.", accent: "#C084FC" },
    { icon: Car,        title: "Valet Services",          desc: "White-glove valet in premium locations.", accent: C.accent },
  ];

  const cols = isMobile ? "1fr" : isTablet ? "1fr 1fr" : "repeat(3, 1fr)";

  return (
    <section id="features" style={{ padding: isMobile ? "80px 0" : "120px 0", position: "relative" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: `0 ${isMobile ? 20 : 28}px` }}>
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: isMobile ? 48 : 72 }}>
            <div className="badge-pill" style={{ marginBottom: 14 }}>Features</div>
            <h2 className="syne" style={{ fontSize: isMobile ? "clamp(28px,8vw,40px)" : "clamp(36px,5vw,60px)", fontWeight: 800, letterSpacing: "-0.04em", color: C.white, lineHeight: 1.05, marginBottom: 16 }}>
              Everything you need to park with confidence
            </h2>
            <p style={{ color: C.muted, fontSize: isMobile ? 15 : 17, maxWidth: 500, margin: "0 auto" }}>
              Thoughtfully designed to make the worst part of driving the easiest.
            </p>
          </div>
        </FadeIn>

        <div style={{ display: "grid", gridTemplateColumns: cols, gap: 16 }}>
          {features.map((f, i) => {
            const Icon = f.icon;
            const spanStyle = (!isMobile && !isTablet && f.large) ? { gridColumn: "span 2" } : {};
            return (
              <FadeIn key={i} delay={i * 0.06} style={spanStyle}>
                <div className="card-h"
                  style={{ background: C.card, borderRadius: 22, border: `1px solid ${C.border}`, padding: isMobile ? "24px 22px" : "30px 32px", height: "100%", position: "relative", overflow: "hidden", ...spanStyle }}>
                  <div style={{ position: "absolute", top: -50, right: -50, width: 160, height: 160, borderRadius: "50%", background: `radial-gradient(circle, ${f.accent}18 0%, transparent 70%)`, pointerEvents: "none" }} />
                  <div style={{ width: 46, height: 46, borderRadius: 13, background: f.accent + "18", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20, border: `1px solid ${f.accent}30` }}>
                    <Icon size={20} color={f.accent} strokeWidth={1.8} />
                  </div>
                  <h3 className="syne" style={{ fontSize: 18, fontWeight: 700, color: C.white, marginBottom: 10, letterSpacing: "-0.02em" }}>{f.title}</h3>
                  <p style={{ fontSize: 14, color: C.muted, lineHeight: 1.7 }}>{f.desc}</p>
                  {f.tags && (
                    <div style={{ marginTop: 20, display: "flex", gap: 8, flexWrap: "wrap" }}>
                      {f.tags.map(tag => (
                        <div key={tag} style={{ background: f.accent + "14", border: `1px solid ${f.accent}25`, borderRadius: 7, padding: "4px 10px", fontSize: 11, color: f.accent, fontWeight: 500 }}>{tag}</div>
                      ))}
                    </div>
                  )}
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─── How It Works ───────────────────────────────────────── */
function HowItWorksSection() {
  const isMobile = useIsMobile(768);
  const steps = [
    { n: "01", title: "Open the App",      desc: "Enter your destination and when you're arriving. ParkEase shows every available spot in real-time.", icon: MapPin },
    { n: "02", title: "Choose & Reserve",  desc: "Pick your preferred spot by price, distance, or type. Confirm your booking in one tap.", icon: CheckCircle },
    { n: "03", title: "Navigate & Park",   desc: "Follow the guided route directly to your spot. Your space is held until you arrive.", icon: Navigation },
  ];
  return (
    <section style={{ padding: isMobile ? "80px 0" : "100px 0", background: C.surface, position: "relative", overflow: "hidden" }}>
      <div className="orb-2" style={{ opacity: 0.5, right: "auto", left: -100, top: 50, bottom: "auto" }} />
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: `0 ${isMobile ? 20 : 28}px`, position: "relative", zIndex: 1 }}>
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: isMobile ? 48 : 72 }}>
            <div className="badge-pill" style={{ marginBottom: 14 }}>How It Works</div>
            <h2 className="syne" style={{ fontSize: isMobile ? "clamp(28px,8vw,40px)" : "clamp(36px,5vw,56px)", fontWeight: 800, letterSpacing: "-0.04em", color: C.white, lineHeight: 1.05 }}>
              Parked in 3 steps
            </h2>
          </div>
        </FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: isMobile ? 16 : 24 }}>
          {steps.map((s, i) => {
            const Icon = s.icon;
            return (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="card-h" style={{ position: "relative", padding: isMobile ? "28px 24px" : "36px 32px", background: C.card, borderRadius: 22, border: `1px solid ${C.border}` }}>
                  <div className="syne" style={{ fontSize: 56, fontWeight: 800, color: "rgba(184,255,87,0.07)", position: "absolute", top: 16, right: 22, lineHeight: 1, userSelect: "none", letterSpacing: "-0.05em" }}>{s.n}</div>
                  <div style={{ width: 48, height: 48, borderRadius: 14, background: C.accentDim, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 22, border: "1px solid rgba(184,255,87,0.2)" }}>
                    <Icon size={20} color={C.accent} strokeWidth={1.8} />
                  </div>
                  <h3 className="syne" style={{ fontSize: 20, fontWeight: 700, color: C.white, marginBottom: 12, letterSpacing: "-0.025em" }}>{s.title}</h3>
                  <p style={{ fontSize: 14, color: C.muted, lineHeight: 1.75 }}>{s.desc}</p>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─── Pricing ────────────────────────────────────────────── */
function PricingSection() {
  const isMobile = useIsMobile(640);
  const perks = [
    "Unlimited bookings per month",
    "Access to 40+ city networks",
    "Real-time availability alerts",
    "Priority lane & valet access",
    "24/7 concierge support",
    "Monthly billing, cancel anytime",
  ];
  return (
    <section id="pricing" style={{ padding: isMobile ? "80px 0" : "120px 0", position: "relative", overflow: "hidden" }}>
      <div className="orb-1" style={{ top: "auto", bottom: -100, right: -100 }} />
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: `0 ${isMobile ? 20 : 28}px`, position: "relative", zIndex: 1 }}>
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: isMobile ? 40 : 56 }}>
            <div className="badge-pill" style={{ marginBottom: 14 }}>Pricing</div>
            <h2 className="syne" style={{ fontSize: isMobile ? "clamp(28px,8vw,40px)" : "clamp(36px,5vw,60px)", fontWeight: 800, letterSpacing: "-0.04em", color: C.white, lineHeight: 1.05, marginBottom: 12 }}>
              One plan. Everything included.
            </h2>
            <p style={{ color: C.muted, fontSize: isMobile ? 14 : 16 }}>No tiers, no confusion. Just frictionless parking.</p>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div style={{ maxWidth: 600, margin: "0 auto", background: C.card, borderRadius: 28, border: "1px solid rgba(184,255,87,0.15)", overflow: "hidden", boxShadow: "0 0 80px rgba(184,255,87,0.06), 0 60px 80px rgba(0,0,0,0.4)" }}>
            <div style={{ height: 4, background: `linear-gradient(90deg, ${C.accent}, ${C.blue})` }} />
            <div style={{ padding: isMobile ? "28px 22px" : "40px 44px" }}>
              {/* Top row */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 28, flexWrap: "wrap", gap: 16 }}>
                <div>
                  <div className="badge-pill" style={{ marginBottom: 12 }}>Most popular</div>
                  <h3 className="syne" style={{ fontSize: 22, fontWeight: 800, color: C.white, letterSpacing: "-0.03em" }}>ParkEase Pro</h3>
                  <p style={{ fontSize: 13, color: C.muted, marginTop: 5 }}>Full access, every feature.</p>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
                    <span className="syne" style={{ fontSize: isMobile ? 44 : 52, fontWeight: 800, color: C.accent, lineHeight: 1, letterSpacing: "-0.04em" }}>$9</span>
                    <span style={{ fontSize: 15, color: C.muted }}>/mo</span>
                  </div>
                  <p style={{ fontSize: 12, color: C.muted }}>Billed monthly</p>
                </div>
              </div>

              {/* Perks */}
              <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? 12 : "12px 20px", marginBottom: 28 }}>
                {perks.map((p, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 9 }}>
                    <CheckCircle size={15} color={C.accent} style={{ flexShrink: 0, marginTop: 2 }} />
                    <span style={{ fontSize: 13, color: C.muted, lineHeight: 1.5 }}>{p}</span>
                  </div>
                ))}
              </div>

              <a href="/signup" className="btn-p" style={{ width: "100%", justifyContent: "center", fontSize: isMobile ? 14 : 16, padding: "15px 28px", display: "flex" }}>
                Start your free 14-day trial <ArrowRight size={17} />
              </a>
              <p style={{ textAlign: "center", fontSize: 12, color: C.muted, marginTop: 12 }}>
                <Lock size={10} style={{ display: "inline", marginRight: 4 }} />
                No credit card required to start
              </p>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ─── CTA ────────────────────────────────────────────────── */
function CTASection() {
  const isMobile = useIsMobile(640);
  return (
    <section style={{ padding: isMobile ? "0 16px 80px" : "0 28px 120px" }}>
      <FadeIn>
        <div style={{
          maxWidth: 1200, margin: "0 auto", borderRadius: 28,
          background: `linear-gradient(135deg, ${C.accent}18 0%, ${C.blue}12 100%)`,
          border: "1px solid rgba(184,255,87,0.15)",
          padding: isMobile ? "48px 22px" : "72px 56px",
          textAlign: "center", position: "relative", overflow: "hidden"
        }}>
          <div className="badge-pill" style={{ marginBottom: 18 }}>
            <span className="tag-dot" /> Free 14-day trial
          </div>
          <h2 className="syne" style={{ fontSize: isMobile ? "clamp(26px,7vw,40px)" : "clamp(32px,5vw,56px)", fontWeight: 800, letterSpacing: "-0.04em", color: C.white, lineHeight: 1.05, marginBottom: 16 }}>
            Stop hunting for parking.{" "}
            <span style={{ color: C.accent }}>Start owning it.</span>
          </h2>
          <p style={{ fontSize: isMobile ? 14 : 17, color: C.muted, maxWidth: 460, margin: "0 auto 32px" }}>
            Join 120,000+ drivers who've reclaimed hours of their lives every month.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
            <a href="/signup" className="btn-p" style={{ fontSize: isMobile ? 14 : 16, padding: isMobile ? "12px 24px" : "16px 36px" }}>
              Get started free <ArrowRight size={17} />
            </a>
            <a href="#features" className="btn-g" style={{ fontSize: isMobile ? 14 : 15, padding: isMobile ? "12px 22px" : "14px 28px" }}>
              See all features
            </a>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}

/* ─── Footer ─────────────────────────────────────────────── */
function Footer() {
  const isMobile = useIsMobile(768);
  const links = {
    Product: ["Features", "Pricing", "Changelog", "Roadmap"],
    Company: ["About", "Blog", "Careers", "Press"],
    Legal:   ["Privacy", "Terms", "Cookies"],
  };
  return (
    <footer style={{ borderTop: `1px solid ${C.border}`, background: C.surface }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: isMobile ? "48px 20px 32px" : "64px 28px 40px" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr 1fr" : "2fr 1fr 1fr 1fr",
          gap: isMobile ? "32px 24px" : 40,
          marginBottom: 48
        }}>
          {/* Brand — full width on mobile */}
          <div style={{ gridColumn: isMobile ? "1 / -1" : undefined }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
              <div style={{ width: 30, height: 30, borderRadius: 8, background: C.accent, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Car size={15} color={C.bg} strokeWidth={2.5} />
              </div>
              <span className="syne" style={{ fontWeight: 800, fontSize: 17, color: C.white }}>ParkEase</span>
            </div>
            <p style={{ fontSize: 13, color: C.muted, lineHeight: 1.7, maxWidth: 240 }}>
              Real-time parking intelligence for modern drivers. Smart. Fast. Reliable.
            </p>
          </div>

          {Object.entries(links).map(([heading, items]) => (
            <div key={heading}>
              <p className="syne" style={{ fontSize: 12, fontWeight: 700, color: C.text, marginBottom: 16, letterSpacing: "0.04em", textTransform: "uppercase" }}>{heading}</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {items.map(item => (
                  <a key={item} href="#" className="nav-link" style={{ fontSize: 13 }}>{item}</a>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", justifyContent: "space-between", alignItems: isMobile ? "flex-start" : "center", borderTop: `1px solid ${C.border}`, paddingTop: 24, gap: 12 }}>
          <p style={{ fontSize: 12, color: C.muted }}>© 2026 ParkEase, Inc. All rights reserved.</p>
          <div style={{ display: "flex", gap: 18, fontSize: 12 }}>
            {["Twitter", "LinkedIn", "GitHub"].map(s => (
              <a key={s} href="#" className="nav-link" style={{ fontSize: 12 }}>{s}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ─── Root ───────────────────────────────────────────────── */
export default function LandingPage() {
  return (
    <>
      <style>{globalCSS}</style>
      <div className="pe-root">
        <Navbar />
        <HeroSection />
        <MarqueeStats />
        <FeaturesSection />
        <HowItWorksSection />
        <PricingSection />
        <CTASection />
        <Footer />
      </div>
    </>
  );
}