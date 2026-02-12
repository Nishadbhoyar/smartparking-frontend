// import React, { useState, useEffect, useRef } from "react";
// import {
//   Car,
//   Clock,
//   MapPin,
//   CreditCard,
//   Shield,
//   Zap,
//   CheckCircle,
//   Star,
//   ArrowRight,
//   ChevronRight,
//   Menu,
//   X,
//   Play,
//   Sparkles,
//   Navigation,
//   Award,
//   Users,
// } from "lucide-react";
// import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

// export default function LandingPage() {
//   const [scrolled, setScrolled] = useState(false);
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [inView, setInView] = useState({});
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
//   const [counts, setCounts] = useState({ users: 0, locations: 0, uptime: 0, rating: 0 });
//   const [activeTestimonial, setActiveTestimonial] = useState(0);

//   // Parallax effect for hero orbs
//   useEffect(() => {
//     const handleMouseMove = (e) => {
//       setMousePosition({ x: e.clientX, y: e.clientY });
//     };
//     window.addEventListener("mousemove", handleMouseMove);
//     return () => window.removeEventListener("mousemove", handleMouseMove);
//   }, []);

//   // Scroll handler for navbar
//   useEffect(() => {
//     const handleScroll = () => setScrolled(window.scrollY > 20);
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   // Intersection Observer for scroll animations
//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             setInView((prev) => ({ ...prev, [entry.target.id]: true }));
//           }
//         });
//       },
//       { threshold: 0.2, triggerOnce: true }
//     );

//     const sections = document.querySelectorAll("[data-observe]");
//     sections.forEach((el) => observer.observe(el));
//     return () => observer.disconnect();
//   }, []);

//   // Animated counters
//   useEffect(() => {
//     let step = 0;
//     const duration = 20000;
//     const steps = 600000;
//     const interval = duration / steps;
//     const timer = setInterval(() => {
//       step++;
//       const progress = Math.min(step / steps, 1);
//       setCounts({
//         users: Math.floor(progress * 50),
//         locations: Math.floor(progress * 200),
//         uptime: Math.floor(progress * 99.9 * 10) / 10,
//         rating: Math.floor(progress * 4.9 * 10) / 10,
//       });
//       if (step >= steps) clearInterval(timer);
//     }, interval);
//     return () => clearInterval(timer);
//   }, []);

//   // Auto-rotate testimonials
//   const testimonials = [
//     {
//       name: "Sarah Johnson",
//       role: "Business Professional",
//       content: "ParkEase has completely changed how I commute. No more circling for 20 minutes!",
//       avatar: "SJ",
//       rating: 5,
//     },
//     {
//       name: "Michael Chen",
//       role: "Frequent Traveler",
//       content: "The airport valet service is a game-changer. So convenient and reliable.",
//       avatar: "MC",
//       rating: 5,
//     },
//     {
//       name: "Emma Williams",
//       role: "Daily Commuter",
//       content: "Best parking app hands down. Real-time updates are incredibly accurate.",
//       avatar: "EW",
//       rating: 5,
//     },
//   ];

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
//     }, 5000);
//     return () => clearInterval(interval);
//   }, [testimonials.length]);

//   const features = [
//     {
//       icon: <Clock className="w-6 h-6" />,
//       title: "Real-Time Availability",
//       desc: "Live updates with color-coded maps – never guess again.",
//       color: "from-violet-500 to-fuchsia-500",
//     },
//     {
//       icon: <MapPin className="w-6 h-6" />,
//       title: "Smart Navigation",
//       desc: "Turn-by-turn directions straight to your reserved spot.",
//       color: "from-amber-500 to-orange-500",
//     },
//     {
//       icon: <CreditCard className="w-6 h-6" />,
//       title: "Seamless Payments",
//       desc: "Secure, transparent pricing with Apple Pay & Google Pay.",
//       color: "from-emerald-500 to-teal-500",
//     },
//     {
//       icon: <Shield className="w-6 h-6" />,
//       title: "24/7 Security",
//       desc: "CCTV monitored, well-lit parking with instant assistance.",
//       color: "from-rose-500 to-pink-500",
//     },
//     {
//       icon: <Zap className="w-6 h-6" />,
//       title: "Instant Booking",
//       desc: "Reserve your spot in seconds with instant confirmation.",
//       color: "from-sky-500 to-indigo-500",
//     },
//     {
//       icon: <Car className="w-6 h-6" />,
//       title: "Premium Valet",
//       desc: "Professional valet service at select premium locations.",
//       color: "from-purple-500 to-violet-500",
//     },
//   ];

//   const stats = [
//     { key: "users", value: "50K+", label: "Happy Users", icon: Users },
//     { key: "locations", value: "200+", label: "Locations", icon: MapPin },
//     { key: "uptime", value: "99.9%", label: "Uptime", icon: Zap },
//     { key: "rating", value: "4.9★", label: "Rating", icon: Star },
//   ];

//   // Animation variants
//   const fadeInUp = {
//     hidden: { opacity: 0, y: 30 },
//     visible: { opacity: 1, y: 0, transition: { type: "spring", damping: 12 } },
//   };

//   const staggerContainer = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: { staggerChildren: 0.1, delayChildren: 0.2 },
//     },
//   };

//   return (
//     <div className="min-h-screen bg-white text-slate-900 font-sans antialiased overflow-x-hidden">
//       {/* ========== NAVBAR ========== */}
//       <motion.nav
//         initial={{ y: -100 }}
//         animate={{ y: 0 }}
//         transition={{ duration: 0.6, type: "spring" }}
//         className={`fixed top-0 w-full z-50 transition-all duration-500 ${
//           scrolled
//             ? "bg-white/80 backdrop-blur-xl shadow-md border-b border-slate-200/60"
//             : "bg-transparent"
//         }`}
//       >
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-between h-16 sm:h-20">
//             {/* Logo */}
//             <motion.a
//               href="/"
//               className="flex items-center space-x-2 group"
//               whileHover={{ scale: 1.02 }}
//               whileTap={{ scale: 0.98 }}
//             >
//               <div className="relative">
//                 <div className="absolute inset-0 bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-2xl blur-md opacity-60 group-hover:opacity-80 transition-opacity" />
//                 <div className="relative w-10 h-10 sm:w-11 sm:h-11 bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-2xl flex items-center justify-center shadow-lg">
//                   <Car className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
//                 </div>
//               </div>
//               <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
//                 ParkEase
//               </span>
//             </motion.a>

//             {/* Desktop Navigation */}
//             <div className="hidden md:flex items-center space-x-1">
//               {["Features", "Pricing", "Contact"].map((item) => (
//                 <a
//                   key={item}
//                   href={`#${item.toLowerCase()}`}
//                   className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 relative group ${
//                     scrolled
//                       ? "text-slate-700 hover:text-violet-600"
//                       : "text-slate-700 hover:text-violet-600"
//                   }`}
//                 >
//                   {item}
//                   <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-violet-600 group-hover:w-1/2 group-hover:left-1/4 transition-all duration-300" />
//                 </a>
//               ))}
//               <a
//                 href="/login"
//                 className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
//                   scrolled
//                     ? "text-slate-700 hover:text-violet-600"
//                     : "text-slate-700 hover:text-violet-600"
//                 }`}
//               >
//                 Login
//               </a>
//             </div>

//             {/* CTA Button */}
//             <div className="hidden md:flex items-center space-x-4">
//               <motion.a
//                 href="/signup"
//                 whileHover={{ scale: 1.05, y: -2 }}
//                 whileTap={{ scale: 0.95 }}
//                 className="group relative px-6 py-2.5 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-xl font-semibold shadow-lg shadow-violet-500/30 hover:shadow-xl hover:shadow-violet-500/40 transition-all duration-300 overflow-hidden"
//               >
//                 <span className="relative z-10 flex items-center gap-2">
//                   Get Started
//                   <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
//                 </span>
//                 <div className="absolute inset-0 bg-gradient-to-r from-violet-700 to-fuchsia-700 opacity-0 group-hover:opacity-100 transition-opacity" />
//                 <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 group-hover:animate-shine" />
//               </motion.a>
//             </div>

//             {/* Mobile Menu Button */}
//             <button
//               className="md:hidden p-2 rounded-xl hover:bg-slate-100 transition-colors"
//               onClick={() => setIsMenuOpen(!isMenuOpen)}
//             >
//               {isMenuOpen ? (
//                 <X className="w-6 h-6 text-slate-900" />
//               ) : (
//                 <Menu className="w-6 h-6 text-slate-900" />
//               )}
//             </button>
//           </div>

//           {/* Mobile Menu */}
//           <AnimatePresence>
//             {isMenuOpen && (
//               <motion.div
//                 initial={{ opacity: 0, height: 0 }}
//                 animate={{ opacity: 1, height: "auto" }}
//                 exit={{ opacity: 0, height: 0 }}
//                 transition={{ duration: 0.3 }}
//                 className="md:hidden overflow-hidden"
//               >
//                 <div className="py-4 border-t border-slate-200 bg-white/95 backdrop-blur-xl">
//                   <div className="flex flex-col space-y-2">
//                     {["Features", "Pricing", "Contact", "Login"].map((item) => (
//                       <a
//                         key={item}
//                         href={
//                           item === "Login"
//                             ? "/login"
//                             : `#${item.toLowerCase()}`
//                         }
//                         className="px-4 py-3 text-slate-700 hover:bg-slate-100 hover:text-violet-600 rounded-xl font-medium transition-all hover:translate-x-2"
//                         onClick={() => setIsMenuOpen(false)}
//                       >
//                         {item}
//                       </a>
//                     ))}
//                     <a
//                       href="/signup"
//                       className="mx-4 mt-2 px-6 py-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-xl font-semibold text-center shadow-lg"
//                     >
//                       Get Started
//                     </a>
//                   </div>
//                 </div>
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </div>
//       </motion.nav>

//       {/* ========== HERO SECTION ========== */}
//       <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 bg-gradient-to-br from-violet-50 via-white to-fuchsia-50">
//         {/* Subtle grid overlay */}
//         <div className="absolute inset-0 bg-grid-slate-200/60 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]" />

//         {/* Floating orbs */}
//         <motion.div
//           animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
//           transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
//           className="absolute top-20 right-0 w-96 h-96 bg-violet-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
//         />
//         <motion.div
//           animate={{ x: [0, -30, 0], y: [0, 20, 0] }}
//           transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
//           className="absolute bottom-20 left-0 w-96 h-96 bg-fuchsia-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
//         />

//         <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
//           <div className="grid lg:grid-cols-2 gap-16 items-center">
//             {/* Left content */}
//             <motion.div
//               initial="hidden"
//               animate="visible"
//               variants={staggerContainer}
//               className="text-left"
//             >
//               <motion.div
//                 variants={fadeInUp}
//                 className="inline-flex items-center gap-2 px-4 py-2 bg-white/70 backdrop-blur-sm border border-slate-200 rounded-full mb-6 shadow-sm"
//               >
//                 <Sparkles className="w-4 h-4 text-violet-600" />
//                 <span className="text-slate-700 text-sm font-medium">
//                   #1 Smart Parking Solution
//                 </span>
//               </motion.div>

//               <motion.h1
//                 variants={fadeInUp}
//                 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-slate-900 mb-6 leading-tight"
//               >
//                 Never Circle for
//                 <span className="block bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600 bg-clip-text text-transparent">
//                   Parking Again
//                 </span>
//               </motion.h1>

//               <motion.p
//                 variants={fadeInUp}
//                 className="text-lg sm:text-xl text-slate-600 mb-8 max-w-2xl leading-relaxed"
//               >
//                 Find, reserve, and pay for parking in seconds. Smart technology
//                 that saves you time, money, and stress.
//               </motion.p>

//               <motion.div
//                 variants={fadeInUp}
//                 className="flex flex-col sm:flex-row gap-4"
//               >
//                 <motion.a
//                   href="/signup"
//                   whileHover={{ scale: 1.03, y: -2 }}
//                   whileTap={{ scale: 0.98 }}
//                   className="group px-8 py-4 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-2xl font-bold shadow-xl shadow-violet-500/30 hover:shadow-2xl hover:shadow-violet-500/50 transition-all duration-300 flex items-center justify-center gap-2"
//                 >
//                   Start Free Trial
//                   <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
//                 </motion.a>
//                 <motion.a
//                   href="#features"
//                   whileHover={{ scale: 1.03, y: -2 }}
//                   whileTap={{ scale: 0.98 }}
//                   className="group px-8 py-4 bg-white border-2 border-slate-200 text-slate-700 rounded-2xl font-bold hover:border-violet-300 hover:text-violet-700 transition-all duration-300 flex items-center justify-center gap-2"
//                 >
//                   <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
//                   Watch Demo
//                 </motion.a>
//               </motion.div>

//               {/* Stats */}
//               <motion.div
//                 variants={fadeInUp}
//                 className="grid grid-cols-3 gap-8 mt-16"
//               >
//                 <div>
//                   <div className="text-3xl sm:text-4xl font-bold text-slate-900 mb-1">
//                     {counts.users}K+
//                   </div>
//                   <div className="text-sm text-slate-500">Happy Users</div>
//                 </div>
//                 <div>
//                   <div className="text-3xl sm:text-4xl font-bold text-slate-900 mb-1">
//                     {counts.locations}+
//                   </div>
//                   <div className="text-sm text-slate-500">Locations</div>
//                 </div>
//                 <div>
//                   <div className="text-3xl sm:text-4xl font-bold text-slate-900 mb-1">
//                     {counts.uptime}%
//                   </div>
//                   <div className="text-sm text-slate-500">Uptime</div>
//                 </div>
//               </motion.div>
//             </motion.div>

//             {/* Right content - Modern app card */}
//             <motion.div
//               initial={{ opacity: 0, x: 50 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.8, delay: 0.3 }}
//               className="relative"
//             >
//               <div className="relative mx-auto max-w-sm">
//                 {/* Main card */}
//                 <div className="relative bg-white rounded-3xl shadow-2xl border border-slate-200/80 overflow-hidden backdrop-blur-sm">
//                   <div className="p-6">
//                     {/* Header */}
//                     <div className="flex items-center justify-between mb-6">
//                       <div className="flex items-center gap-2">
//                         <div className="w-8 h-8 bg-gradient-to-br from-violet-100 to-fuchsia-100 rounded-xl flex items-center justify-center">
//                           <MapPin className="w-4 h-4 text-violet-600" />
//                         </div>
//                         <span className="font-semibold text-slate-900">
//                           Find parking
//                         </span>
//                       </div>
//                       <div className="text-xs text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
//                         Live
//                       </div>
//                     </div>

//                     {/* Search bar */}
//                     <div className="bg-slate-50 rounded-2xl p-4 mb-4 border border-slate-100">
//                       <div className="flex items-center gap-3">
//                         <MapPin className="w-5 h-5 text-slate-400" />
//                         <div className="flex-1">
//                           <div className="h-2.5 bg-slate-200 rounded-full w-3/4 mb-2 animate-pulse" />
//                           <div className="h-2 bg-slate-100 rounded-full w-1/2 animate-pulse" />
//                         </div>
//                       </div>
//                     </div>

//                     {/* Map preview */}
//                     <div className="bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl h-48 mb-4 relative overflow-hidden">
//                       <div className="absolute inset-0 bg-grid-slate-400/20" />
//                       {[...Array(5)].map((_, i) => (
//                         <div
//                           key={i}
//                           className="absolute w-6 h-6"
//                           style={{
//                             top: `${20 + Math.random() * 60}%`,
//                             left: `${10 + Math.random() * 80}%`,
//                           }}
//                         >
//                           <div className="absolute inset-0 bg-violet-500 rounded-full shadow-lg animate-ping-slow opacity-75" />
//                           <div className="absolute inset-1 bg-white rounded-full border-2 border-violet-500" />
//                         </div>
//                       ))}
//                     </div>

//                     {/* Parking spots */}
//                     <div className="space-y-3">
//                       <div className="flex items-center justify-between">
//                         <span className="text-sm font-medium text-slate-700">
//                           Nearby spots
//                         </span>
//                         <span className="text-xs text-violet-600">View all</span>
//                       </div>
//                       {[1, 2].map((i) => (
//                         <div
//                           key={i}
//                           className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100"
//                         >
//                           <div>
//                             <div className="font-medium text-slate-900">
//                               Spot A{i}2
//                             </div>
//                             <div className="text-xs text-slate-500">
//                               2 min away
//                             </div>
//                           </div>
//                           <div className="text-sm font-semibold text-emerald-600">
//                             $4/hr
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 </div>

//                 {/* Floating badge - Booking */}
//                 <motion.div
//                   animate={{ y: [0, -8, 0] }}
//                   transition={{ duration: 4, repeat: Infinity }}
//                   className="absolute -top-6 -right-6 bg-white rounded-2xl shadow-xl p-4 border border-slate-100"
//                 >
//                   <div className="flex items-center gap-3">
//                     <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center">
//                       <CheckCircle className="w-5 h-5 text-white" />
//                     </div>
//                     <div>
//                       <div className="text-xs text-slate-500">Confirmed</div>
//                       <div className="text-sm font-bold text-slate-900">
//                         Spot #A24
//                       </div>
//                     </div>
//                   </div>
//                 </motion.div>

//                 {/* Floating badge - Rating */}
//                 <motion.div
//                   animate={{ y: [0, 8, 0] }}
//                   transition={{ duration: 5, repeat: Infinity, delay: 1 }}
//                   className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-4 border border-slate-100"
//                 >
//                   <div className="flex items-center gap-3">
//                     <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center">
//                       <Star className="w-5 h-5 text-white fill-white" />
//                     </div>
//                     <div>
//                       <div className="text-xs text-slate-500">Rating</div>
//                       <div className="text-sm font-bold text-slate-900">
//                         {counts.rating} ★
//                       </div>
//                     </div>
//                   </div>
//                 </motion.div>
//               </div>
//             </motion.div>
//           </div>
//         </div>

//         {/* Scroll indicator */}
//         <motion.div
//           animate={{ y: [0, 8, 0] }}
//           transition={{ duration: 1.5, repeat: Infinity }}
//           className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
//         >
//           <div className="w-5 h-9 border-2 border-slate-400 rounded-full flex justify-center">
//             <div className="w-1 h-2 bg-slate-400 rounded-full mt-2" />
//           </div>
//         </motion.div>
//       </section>

//       {/* ========== FEATURES SECTION ========== */}
//       <section
//         id="features"
//         data-observe
//         className="py-28 bg-white relative overflow-hidden"
//       >
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             animate={inView.features ? { opacity: 1, y: 0 } : {}}
//             transition={{ duration: 0.6 }}
//             className="text-center mb-16"
//           >
//             <div className="inline-flex items-center gap-2 px-4 py-2 bg-violet-100 text-violet-700 rounded-full mb-4 font-medium text-sm">
//               <Sparkles className="w-4 h-4" />
//               Features
//             </div>
//             <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
//               Everything You Need,
//               <span className="block bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
//                 All in One Place
//               </span>
//             </h2>
//             <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto">
//               Designed for convenience, speed and security.
//             </p>
//           </motion.div>

//           <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
//             {features.map((feature, i) => (
//               <motion.div
//                 key={i}
//                 initial={{ opacity: 0, y: 30 }}
//                 animate={inView.features ? { opacity: 1, y: 0 } : {}}
//                 transition={{ duration: 0.5, delay: i * 0.1 }}
//                 whileHover={{ y: -6, scale: 1.01 }}
//                 className="group relative bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300"
//               >
//                 <div
//                   className={`w-14 h-14 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center text-white mb-6 shadow-md group-hover:scale-110 group-hover:rotate-2 transition-all duration-300`}
//                 >
//                   {feature.icon}
//                 </div>
//                 <h3 className="text-xl font-semibold mb-3 group-hover:text-violet-600 transition-colors">
//                   {feature.title}
//                 </h3>
//                 <p className="text-slate-600 text-sm leading-relaxed">
//                   {feature.desc}
//                 </p>
//                 <div className="mt-6 flex items-center text-violet-600 font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-2">
//                   Learn more
//                   <ChevronRight className="w-4 h-4 ml-1" />
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ========== STATS SECTION ========== */}
//       <section
//         id="stats"
//         data-observe
//         className="py-24 bg-gradient-to-br from-violet-600 to-fuchsia-600 relative overflow-hidden"
//       >
//         <div className="absolute inset-0 bg-grid-white/10 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]" />
//         <div className="max-w-6xl mx-auto px-6 relative">
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
//             {stats.map((stat, i) => {
//               const Icon = stat.icon;
//               return (
//                 <motion.div
//                   key={stat.key}
//                   initial={{ opacity: 0, scale: 0.8 }}
//                   animate={inView.stats ? { opacity: 1, scale: 1 } : {}}
//                   transition={{ duration: 0.5, delay: i * 0.1 }}
//                   className="text-white"
//                 >
//                   <div className="flex justify-center mb-3">
//                     <Icon className="w-8 h-8 opacity-90" />
//                   </div>
//                   <div className="text-3xl md:text-4xl font-bold mb-1">
//                     {stat.key === "users" && `${counts.users}K+`}
//                     {stat.key === "locations" && `${counts.locations}+`}
//                     {stat.key === "uptime" && `${counts.uptime}%`}
//                     {stat.key === "rating" && `${counts.rating}★`}
//                   </div>
//                   <div className="opacity-80 text-sm md:text-base">
//                     {stat.label}
//                   </div>
//                 </motion.div>
//               );
//             })}
//           </div>
//         </div>
//       </section>

//       {/* ========== TESTIMONIALS SECTION ========== */}
//       <section
//         id="testimonials"
//         data-observe
//         className="py-28 bg-slate-50 relative overflow-hidden"
//       >
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             animate={inView.testimonials ? { opacity: 1, y: 0 } : {}}
//             transition={{ duration: 0.6 }}
//             className="text-center mb-16"
//           >
//             <div className="inline-flex items-center gap-2 px-4 py-2 bg-violet-100 text-violet-700 rounded-full mb-4 font-medium text-sm">
//               <Star className="w-4 h-4" />
//               Testimonials
//             </div>
//             <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
//               Loved by Thousands
//             </h2>
//             <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto">
//               See what our users have to say about their parking experience.
//             </p>
//           </motion.div>

//           <div className="relative max-w-4xl mx-auto">
//             <AnimatePresence mode="wait">
//               <motion.div
//                 key={activeTestimonial}
//                 initial={{ opacity: 0, x: 50 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 exit={{ opacity: 0, x: -50 }}
//                 transition={{ duration: 0.4 }}
//                 className="bg-white p-10 rounded-3xl shadow-xl border border-slate-100"
//               >
//                 <div className="flex gap-1 mb-6">
//                   {[...Array(testimonials[activeTestimonial].rating)].map(
//                     (_, i) => (
//                       <Star
//                         key={i}
//                         className="w-5 h-5 text-amber-400 fill-amber-400"
//                       />
//                     )
//                   )}
//                 </div>
//                 <p className="text-xl text-slate-700 mb-8 leading-relaxed">
//                   "{testimonials[activeTestimonial].content}"
//                 </p>
//                 <div className="flex items-center gap-4">
//                   <div className="w-14 h-14 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
//                     {testimonials[activeTestimonial].avatar}
//                   </div>
//                   <div>
//                     <div className="font-bold text-slate-900">
//                       {testimonials[activeTestimonial].name}
//                     </div>
//                     <div className="text-sm text-slate-500">
//                       {testimonials[activeTestimonial].role}
//                     </div>
//                   </div>
//                 </div>
//               </motion.div>
//             </AnimatePresence>

//             {/* Dots */}
//             <div className="flex justify-center gap-2 mt-8">
//               {testimonials.map((_, i) => (
//                 <button
//                   key={i}
//                   onClick={() => setActiveTestimonial(i)}
//                   className={`w-2 h-2 rounded-full transition-all ${
//                     i === activeTestimonial
//                       ? "bg-violet-600 w-6"
//                       : "bg-slate-300 hover:bg-violet-400"
//                   }`}
//                 />
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* ========== PRICING SECTION ========== */}
//       <section
//         id="pricing"
//         data-observe
//         className="py-28 bg-white relative overflow-hidden"
//       >
//         <div className="absolute inset-0 bg-grid-slate-200/50 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]" />
//         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             animate={inView.pricing ? { opacity: 1, y: 0 } : {}}
//             transition={{ duration: 0.6 }}
//             className="text-center mb-12"
//           >
//             <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
//               Simple Pricing
//             </h2>
//             <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto">
//               Transparent pricing with no hidden fees.
//             </p>
//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             animate={inView.pricing ? { opacity: 1, y: 0 } : {}}
//             transition={{ duration: 0.6, delay: 0.2 }}
//             whileHover={{ y: -6 }}
//             className="bg-white p-10 rounded-3xl shadow-xl border border-slate-200 text-center max-w-md mx-auto"
//           >
//             <div className="text-5xl font-bold bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent mb-2">
//               $9
//             </div>
//             <p className="text-slate-500 mb-8">per month</p>
//             <ul className="space-y-4 mb-8 text-left">
//               <li className="flex items-center gap-3">
//                 <CheckCircle className="text-violet-600 w-5 h-5 flex-shrink-0" />
//                 <span className="text-slate-700">Unlimited bookings</span>
//               </li>
//               <li className="flex items-center gap-3">
//                 <CheckCircle className="text-violet-600 w-5 h-5 flex-shrink-0" />
//                 <span className="text-slate-700">Priority support</span>
//               </li>
//               <li className="flex items-center gap-3">
//                 <CheckCircle className="text-violet-600 w-5 h-5 flex-shrink-0" />
//                 <span className="text-slate-700">Premium locations</span>
//               </li>
//             </ul>
//             <motion.a
//               href="/signup"
//               whileHover={{ scale: 1.03, y: -2 }}
//               whileTap={{ scale: 0.98 }}
//               className="inline-block px-8 py-4 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
//             >
//               Get Started
//             </motion.a>
//           </motion.div>
//         </div>
//       </section>

//       {/* ========== CTA SECTION ========== */}
//       <section
//         id="cta"
//         data-observe
//         className="py-24 bg-gradient-to-br from-violet-600 to-fuchsia-600 relative overflow-hidden"
//       >
//         <div className="absolute inset-0 bg-grid-white/10 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]" />
//         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             animate={inView.cta ? { opacity: 1, y: 0 } : {}}
//             transition={{ duration: 0.6 }}
//           >
//             <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center mx-auto mb-8">
//               <Car className="w-10 h-10 text-white" />
//             </div>
//             <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
//               Ready to Transform Your
//               <span className="block">Parking Experience?</span>
//             </h2>
//             <p className="text-lg sm:text-xl text-white/90 mb-10 max-w-2xl mx-auto">
//               Join thousands of happy drivers who never waste time looking for
//               parking anymore.
//             </p>
//             <div className="flex flex-col sm:flex-row gap-4 justify-center">
//               <motion.a
//                 href="/signup"
//                 whileHover={{ scale: 1.03, y: -2 }}
//                 whileTap={{ scale: 0.98 }}
//                 className="group px-8 py-4 bg-white text-violet-600 rounded-2xl font-bold shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center justify-center gap-2"
//               >
//                 Start Free Trial
//                 <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
//               </motion.a>
//               <motion.a
//                 href="#features"
//                 whileHover={{ scale: 1.03, y: -2 }}
//                 whileTap={{ scale: 0.98 }}
//                 className="px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white rounded-2xl font-bold hover:bg-white/20 transition-all duration-300"
//               >
//                 Learn More
//               </motion.a>
//             </div>
//             <div className="flex flex-wrap items-center justify-center gap-8 mt-12 text-white/80 text-sm">
//               <div className="flex items-center gap-2">
//                 <CheckCircle className="w-5 h-5" />
//                 No credit card required
//               </div>
//               <div className="flex items-center gap-2">
//                 <CheckCircle className="w-5 h-5" />
//                 Cancel anytime
//               </div>
//               <div className="flex items-center gap-2">
//                 <CheckCircle className="w-5 h-5" />
//                 24/7 support
//               </div>
//             </div>
//           </motion.div>
//         </div>
//       </section>

//       {/* ========== FOOTER ========== */}
//       <footer id="footer" data-observe className="bg-slate-900 text-slate-300 pt-16 pb-8">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid md:grid-cols-4 gap-12 mb-12">
//             <div>
//               <div className="flex items-center space-x-2 mb-6">
//                 <div className="w-10 h-10 bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-2xl flex items-center justify-center">
//                   <Car className="w-6 h-6 text-white" />
//                 </div>
//                 <span className="text-2xl font-bold text-white">ParkEase</span>
//               </div>
//               <p className="text-slate-400 text-sm leading-relaxed">
//                 Making parking effortless with smart technology. Find, reserve,
//                 and pay for parking in seconds.
//               </p>
//             </div>
//             <div>
//               <h4 className="text-white font-semibold mb-4">Product</h4>
//               <ul className="space-y-2 text-sm">
//                 <li>
//                   <a href="#" className="hover:text-white transition-colors">
//                     Features
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#" className="hover:text-white transition-colors">
//                     Pricing
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#" className="hover:text-white transition-colors">
//                     How It Works
//                   </a>
//                 </li>
//               </ul>
//             </div>
//             <div>
//               <h4 className="text-white font-semibold mb-4">Company</h4>
//               <ul className="space-y-2 text-sm">
//                 <li>
//                   <a href="#" className="hover:text-white transition-colors">
//                     About
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#" className="hover:text-white transition-colors">
//                     Careers
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#" className="hover:text-white transition-colors">
//                     Contact
//                   </a>
//                 </li>
//               </ul>
//             </div>
//             <div>
//               <h4 className="text-white font-semibold mb-4">Legal</h4>
//               <ul className="space-y-2 text-sm">
//                 <li>
//                   <a href="#" className="hover:text-white transition-colors">
//                     Privacy
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#" className="hover:text-white transition-colors">
//                     Terms
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#" className="hover:text-white transition-colors">
//                     Security
//                   </a>
//                 </li>
//               </ul>
//             </div>
//           </div>
//           <div className="border-t border-slate-800 pt-8 text-center text-sm text-slate-500">
//             © 2024 ParkEase. All rights reserved.
//           </div>
//         </div>
//       </footer>

//       {/* Custom keyframes for shine effect */}
//       <style jsx>{`
//         @keyframes shine {
//           0% { left: -100%; }
//           100% { left: 200%; }
//         }
//         .animate-shine {
//           animation: shine 2.0s ease-out;
//         }
//         @keyframes ping-slow {
//           0% { transform: scale(1); opacity: 0.8; }
//           75%, 100% { transform: scale(2); opacity: 0; }
//         }
//         .animate-ping-slow {
//           animation: ping-slow 200s cubic-bezier(0, 0, 0.2, 1) infinite;
//         }
//         .bg-grid-slate-200 {
//           background-image: linear-gradient(to right, #e2e8f0 1px, transparent 1px),
//             linear-gradient(to bottom, #e2e8f0 1px, transparent 1px);
//           background-size: 40px 40px;
//         }
//         .bg-grid-slate-400 {
//           background-image: linear-gradient(to right, #94a3b8 1px, transparent 1px),
//             linear-gradient(to bottom, #94a3b8 1px, transparent 1px);
//           background-size: 40px 40px;
//         }
//         .bg-grid-white {
//           background-image: linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
//             linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px);
//           background-size: 40px 40px;
//         }
//       `}</style>
//     </div>
//   );
// }

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence, useInView } from "framer-motion";
import {
  Car, Clock, MapPin, CreditCard, Shield, Zap,
  CheckCircle, ArrowRight, Menu, X, Navigation,
  TrendingUp, Users, Star, ChevronRight, Lock
} from "lucide-react";

/* ─── Design Tokens ─────────────────────────────────────────────── */
const C = {
  bg:       "#020308",
  surface:  "#0B0D17",
  card:     "#0F1220",
  border:   "rgba(255,255,255,0.07)",
  accent:   "#B8FF57",
  accentDim:"rgba(184,255,87,0.12)",
  blue:     "#4B9EFF",
  blueDim:  "rgba(75,158,255,0.12)",
  text:     "#F0F4FF",
  muted:    "#6B7594",
  white:    "#FFFFFF",
};

/* ─── Font Injection ─────────────────────────────────────────────── */
const fontStyle = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body { background: ${C.bg}; }

  .parkease-root {
    font-family: 'DM Sans', sans-serif;
    background: ${C.bg};
    color: ${C.text};
    min-height: 100vh;
    overflow-x: hidden;
  }
  .display-font { font-family: 'Syne', sans-serif; }

  /* Scrollbar */
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: ${C.bg}; }
  ::-webkit-scrollbar-thumb { background: ${C.accentDim}; border-radius: 2px; }

  /* Marquee */
  @keyframes marquee {
    from { transform: translateX(0); }
    to   { transform: translateX(-50%); }
  }
  .marquee-track { animation: marquee 22s linear infinite; }
  .marquee-track:hover { animation-play-state: paused; }

  /* Glow orb */
  .orb-1 {
    position: absolute; border-radius: 50%; filter: blur(120px); pointer-events: none;
    width: 500px; height: 500px;
    background: radial-gradient(circle, rgba(184,255,87,0.14) 0%, transparent 70%);
    top: -100px; right: -80px;
    animation: orbFloat 9s ease-in-out infinite alternate;
  }
  .orb-2 {
    position: absolute; border-radius: 50%; filter: blur(100px); pointer-events: none;
    width: 380px; height: 380px;
    background: radial-gradient(circle, rgba(75,158,255,0.12) 0%, transparent 70%);
    bottom: 40px; left: -80px;
    animation: orbFloat 12s ease-in-out infinite alternate-reverse;
  }
  @keyframes orbFloat {
    from { transform: translate(0, 0) scale(1); }
    to   { transform: translate(20px, 30px) scale(1.05); }
  }

  /* Noise overlay */
  .noise::after {
    content: '';
    position: absolute; inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E");
    pointer-events: none; z-index: 0; border-radius: inherit;
  }

  .badge-pill {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 5px 12px; border-radius: 100px;
    font-size: 12px; font-weight: 500; letter-spacing: 0.04em;
    background: ${C.accentDim}; color: ${C.accent};
    border: 1px solid rgba(184,255,87,0.2);
  }

  .card-hover {
    transition: border-color 0.3s, box-shadow 0.3s, transform 0.3s;
  }
  .card-hover:hover {
    border-color: rgba(184,255,87,0.2) !important;
    box-shadow: 0 0 40px rgba(184,255,87,0.06);
    transform: translateY(-3px);
  }

  .btn-primary {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 14px 28px; border-radius: 12px; font-weight: 600;
    background: ${C.accent}; color: ${C.bg};
    font-family: 'Syne', sans-serif; font-size: 15px;
    transition: all 0.25s; border: none; cursor: pointer;
    text-decoration: none;
  }
  .btn-primary:hover {
    background: #cbff6e; box-shadow: 0 0 32px rgba(184,255,87,0.4);
    transform: translateY(-1px);
  }

  .btn-ghost {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 14px 28px; border-radius: 12px; font-weight: 500;
    background: transparent; color: ${C.muted};
    font-family: 'DM Sans', sans-serif; font-size: 15px;
    transition: all 0.25s; border: 1px solid ${C.border}; cursor: pointer;
    text-decoration: none;
  }
  .btn-ghost:hover { border-color: rgba(255,255,255,0.2); color: ${C.text}; }

  .grid-line {
    background-image:
      linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
    background-size: 60px 60px;
  }

  .stat-card {
    border-radius: 16px;
    background: ${C.card};
    border: 1px solid ${C.border};
    padding: 20px 24px;
    position: relative; overflow: hidden;
  }

  .tag-dot {
    width: 6px; height: 6px; border-radius: 50%;
    background: ${C.accent};
    display: inline-block;
    box-shadow: 0 0 8px ${C.accent};
    animation: pulse 2s infinite;
  }
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.4; }
  }
`;

/* ─── Animated Section Wrapper ───────────────────────────────────── */
function FadeIn({ children, delay = 0, direction = "up", className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const yVal = direction === "up" ? 40 : direction === "down" ? -40 : 0;
  const xVal = direction === "left" ? 40 : direction === "right" ? -40 : 0;
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: yVal, x: xVal }}
      animate={inView ? { opacity: 1, y: 0, x: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Navbar ─────────────────────────────────────────────────────── */
function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        borderBottom: scrolled ? `1px solid ${C.border}` : "1px solid transparent",
        background: scrolled ? "rgba(2,3,8,0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        transition: "all 0.4s",
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 28px", height: 68, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 34, height: 34, borderRadius: 10, background: C.accent, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Car size={18} color={C.bg} strokeWidth={2.5} />
            </div>
            <span className="display-font" style={{ fontWeight: 800, fontSize: 20, color: C.white, letterSpacing: "-0.02em" }}>ParkEase</span>
          </div>

          {/* Desktop Links */}
          <div style={{ display: "flex", alignItems: "center", gap: 32, fontSize: 14, fontWeight: 500 }} className="hidden md:flex">
            {["Features", "Pricing", "About"].map(l => (
              <a key={l} href={`#${l.toLowerCase()}`} style={{ color: C.muted, textDecoration: "none", transition: "color 0.2s" }}
                onMouseOver={e => e.target.style.color = C.text}
                onMouseOut={e => e.target.style.color = C.muted}>{l}</a>
            ))}
            <a href="/login" style={{ color: C.muted, textDecoration: "none", transition: "color 0.2s" }}
              onMouseOver={e => e.target.style.color = C.text}
              onMouseOut={e => e.target.style.color = C.muted}>Log in</a>
            <a href="/signup" className="btn-primary" style={{ padding: "10px 22px", fontSize: 14 }}>Get Started</a>
          </div>

          <button className="md:hidden" onClick={() => setOpen(!open)} style={{ background: "none", border: "none", cursor: "pointer", color: C.text }}>
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            style={{ position: "fixed", top: 68, left: 0, right: 0, zIndex: 99, background: C.surface, borderBottom: `1px solid ${C.border}`, padding: "20px 28px", display: "flex", flexDirection: "column", gap: 16 }}>
            {["Features", "Pricing", "About", "Log in"].map(l => (
              <a key={l} href="#" onClick={() => setOpen(false)} style={{ color: C.muted, textDecoration: "none", fontSize: 16, fontWeight: 500 }}>{l}</a>
            ))}
            <a href="/signup" className="btn-primary" style={{ textAlign: "center", justifyContent: "center" }}>Get Started →</a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ─── Hero Section ───────────────────────────────────────────────── */
function HeroSection() {
  return (
    <section style={{ minHeight: "100vh", display: "flex", alignItems: "center", position: "relative", overflow: "hidden", paddingTop: 100 }} className="grid-line">
      <div className="orb-1" />
      <div className="orb-2" />

      {/* Grid overlay */}
      <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to bottom, transparent 60%, ${C.bg})`, pointerEvents: "none" }} />

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "60px 28px", width: "100%", position: "relative", zIndex: 1 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }} className="lg:grid-cols-2 grid-cols-1">

          {/* Left – Copy */}
          <div>
            <FadeIn>
              <div className="badge-pill" style={{ marginBottom: 28 }}>
                <span className="tag-dot" />
                Now in 40+ cities worldwide
              </div>
            </FadeIn>

            <FadeIn delay={0.08}>
              <h1 className="display-font" style={{ fontSize: "clamp(44px, 6vw, 76px)", fontWeight: 800, lineHeight: 1.0, letterSpacing: "-0.04em", marginBottom: 24, color: C.white }}>
                Park Smarter.{" "}
                <span style={{ color: C.accent, display: "block" }}>Never Circle Again.</span>
              </h1>
            </FadeIn>

            <FadeIn delay={0.15}>
              <p style={{ fontSize: 18, lineHeight: 1.7, color: C.muted, marginBottom: 40, maxWidth: 440 }}>
                Real-time parking intelligence that finds, reserves, and guides you to your spot before you even leave home.
              </p>
            </FadeIn>

            <FadeIn delay={0.22}>
              <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
                <a href="/signup" className="btn-primary">
                  Start Free Trial <ArrowRight size={16} />
                </a>
                <a href="#features" className="btn-ghost">
                  See how it works
                </a>
              </div>
            </FadeIn>

            {/* Social proof strip */}
            <FadeIn delay={0.3}>
              <div style={{ marginTop: 48, display: "flex", alignItems: "center", gap: 20 }}>
                <div style={{ display: "flex" }}>
                  {["#4B9EFF","#B8FF57","#FF6B6B","#FFB347"].map((c, i) => (
                    <div key={i} style={{ width: 32, height: 32, borderRadius: "50%", border: `2px solid ${C.bg}`, background: c, marginLeft: i > 0 ? -10 : 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: C.bg }}>
                      {["A","B","C","D"][i]}
                    </div>
                  ))}
                </div>
                <div>
                  <div style={{ display: "flex", gap: 2, marginBottom: 2 }}>
                    {[...Array(5)].map((_,i) => <Star key={i} size={12} fill="#FFB347" color="#FFB347" />)}
                  </div>
                  <p style={{ fontSize: 12, color: C.muted }}>Trusted by <strong style={{ color: C.text }}>120,000+</strong> drivers</p>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Right – App Mockup */}
          <FadeIn delay={0.2} direction="left">
            <AppMockup />
          </FadeIn>

        </div>
      </div>
    </section>
  );
}

/* ─── App Mockup (Hero right side) ──────────────────────────────── */
function AppMockup() {
  const spots = [
    { id: "A12", type: "Standard", price: "$3.50", status: "available", dist: "120m" },
    { id: "B04", type: "Compact",  price: "$2.80", status: "available", dist: "200m" },
    { id: "C17", type: "EV Charge",price: "$4.20", status: "filling",   dist: "85m"  },
    { id: "D08", type: "Disabled", price: "Free",  status: "taken",     dist: "150m" },
  ];

  const statusColor = { available: C.accent, filling: "#FFB347", taken: "#FF6B6B" };

  return (
    <div style={{ position: "relative" }}>
      {/* Main card */}
      <div style={{
        background: C.card, borderRadius: 28, border: `1px solid ${C.border}`,
        padding: 28, boxShadow: "0 60px 120px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04)",
        position: "relative", overflow: "hidden"
      }}>
        {/* Map placeholder */}
        <div style={{
          borderRadius: 18, height: 220, marginBottom: 20,
          background: `linear-gradient(135deg, #0D1633 0%, #0A1F2E 50%, #0D1A33 100%)`,
          position: "relative", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center",
          border: `1px solid rgba(75,158,255,0.1)`
        }}>
          {/* Fake map grid */}
          <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.3 }} viewBox="0 0 400 220" preserveAspectRatio="xMidYMid slice">
            {[40,80,120,160,200,240,280,320,360].map(x => <line key={x} x1={x} y1="0" x2={x} y2="220" stroke="#4B9EFF" strokeWidth="0.5"/>)}
            {[40,80,120,160,200].map(y => <line key={y} x1="0" y1={y} x2="400" y2={y} stroke="#4B9EFF" strokeWidth="0.5"/>)}
            <rect x="60" y="30" width="120" height="60" fill="rgba(75,158,255,0.1)" rx="4"/>
            <rect x="220" y="30" width="80" height="90" fill="rgba(75,158,255,0.08)" rx="4"/>
            <rect x="60" y="130" width="200" height="50" fill="rgba(75,158,255,0.06)" rx="4"/>
          </svg>

          {/* Route line */}
          <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.6 }} viewBox="0 0 400 220">
            <path d="M 200 200 Q 200 140, 260 120 Q 310 100, 310 60" stroke={C.accent} strokeWidth="2.5" fill="none" strokeDasharray="6 4" strokeLinecap="round"/>
          </svg>

          {/* You are here */}
          <div style={{ position: "absolute", bottom: 30, left: "50%", transform: "translateX(-50%)" }}>
            <motion.div animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 2, repeat: Infinity }}
              style={{ width: 14, height: 14, borderRadius: "50%", background: C.blue, border: "3px solid white", boxShadow: `0 0 20px ${C.blue}` }} />
          </div>

          {/* Parking pin */}
          <div style={{ position: "absolute", top: 28, right: 70 }}>
            <motion.div animate={{ y: [0, -4, 0] }} transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}>
              <div style={{ background: C.accent, borderRadius: "50% 50% 50% 0", width: 32, height: 32, transform: "rotate(-45deg)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 0 20px ${C.accent}66` }}>
                <span style={{ transform: "rotate(45deg)", fontSize: 14, fontWeight: 800, color: C.bg, fontFamily: "Syne, sans-serif" }}>P</span>
              </div>
            </motion.div>
          </div>

          {/* Navigation badge */}
          <div style={{ position: "absolute", top: 12, left: 12, background: "rgba(0,0,0,0.6)", backdropFilter: "blur(12px)", borderRadius: 10, padding: "6px 12px", display: "flex", alignItems: "center", gap: 6 }}>
            <Navigation size={12} color={C.accent} />
            <span style={{ fontSize: 11, color: C.text, fontWeight: 500 }}>Live Navigation</span>
          </div>
        </div>

        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <div>
            <p style={{ fontSize: 12, color: C.muted, marginBottom: 2 }}>Available near you</p>
            <h3 className="display-font" style={{ fontSize: 18, fontWeight: 700, color: C.white }}>4 spots found</h3>
          </div>
          <div style={{ background: C.accentDim, borderRadius: 8, padding: "4px 10px", fontSize: 12, color: C.accent, fontWeight: 500 }}>
            ↻ Live
          </div>
        </div>

        {/* Spots list */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {spots.map((s, i) => (
            <motion.div key={s.id}
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 + i * 0.08 }}
              style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                background: s.status === "available" ? "rgba(184,255,87,0.04)" : C.surface,
                border: `1px solid ${s.status === "available" ? "rgba(184,255,87,0.15)" : C.border}`,
                borderRadius: 14, padding: "12px 16px",
                opacity: s.status === "taken" ? 0.5 : 1,
                cursor: s.status !== "taken" ? "pointer" : "default",
                transition: "all 0.2s",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: statusColor[s.status] + "22", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span className="display-font" style={{ fontSize: 13, fontWeight: 800, color: statusColor[s.status] }}>{s.id}</span>
                </div>
                <div>
                  <p style={{ fontSize: 13, fontWeight: 500, color: C.text }}>{s.type}</p>
                  <p style={{ fontSize: 11, color: C.muted }}>{s.dist} away</p>
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <p className="display-font" style={{ fontSize: 15, fontWeight: 700, color: s.status === "available" ? C.accent : C.muted }}>{s.price}<span style={{ fontSize: 11, fontWeight: 400, color: C.muted }}>/hr</span></p>
                <div style={{ display: "flex", alignItems: "center", gap: 4, justifyContent: "flex-end", marginTop: 2 }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: statusColor[s.status], display: "inline-block" }} />
                  <span style={{ fontSize: 10, color: C.muted, textTransform: "capitalize" }}>{s.status}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ marginTop: 18 }}>
          <button className="btn-primary" style={{ width: "100%", justifyContent: "center" }}>
            Reserve Spot A12 — $3.50/hr
          </button>
        </div>
      </div>

      {/* Floating badge 1 */}
      <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        style={{ position: "absolute", top: -20, left: -24, background: C.card, borderRadius: 14, border: `1px solid ${C.border}`, padding: "12px 16px", display: "flex", alignItems: "center", gap: 10, boxShadow: "0 20px 40px rgba(0,0,0,0.4)" }}>
        <div style={{ width: 36, height: 36, borderRadius: 10, background: C.accentDim, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Zap size={16} color={C.accent} />
        </div>
        <div>
          <p className="display-font" style={{ fontSize: 15, fontWeight: 700, color: C.white }}>0:08s</p>
          <p style={{ fontSize: 11, color: C.muted }}>Avg booking time</p>
        </div>
      </motion.div>

      {/* Floating badge 2 */}
      <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        style={{ position: "absolute", bottom: 80, right: -28, background: C.card, borderRadius: 14, border: `1px solid ${C.border}`, padding: "10px 14px", boxShadow: "0 20px 40px rgba(0,0,0,0.4)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
          <TrendingUp size={12} color={C.accent} />
          <span style={{ fontSize: 11, color: C.accent, fontWeight: 600 }}>92% success rate</span>
        </div>
        <div style={{ height: 4, borderRadius: 2, background: C.surface, width: 100, overflow: "hidden" }}>
          <motion.div animate={{ width: ["0%", "92%"] }} transition={{ duration: 1.5, delay: 0.8 }}
            style={{ height: "100%", borderRadius: 2, background: C.accent }} />
        </div>
      </motion.div>
    </div>
  );
}

/* ─── Marquee Stats ──────────────────────────────────────────────── */
function MarqueeStats() {
  const items = [
    "40+ Cities", "⚡ 120K+ Drivers", "🅿️ 850K+ Bookings",
    "★ 4.9 Rating", "🔒 256-bit Encryption", "⚡ 8s Avg Booking",
    "40+ Cities", "⚡ 120K+ Drivers", "🅿️ 850K+ Bookings",
    "★ 4.9 Rating", "🔒 256-bit Encryption", "⚡ 8s Avg Booking",
  ];

  return (
    <div style={{ borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, background: C.surface, overflow: "hidden", padding: "16px 0" }}>
      <div className="marquee-track" style={{ display: "flex", gap: 0, whiteSpace: "nowrap", width: "max-content" }}>
        {items.map((item, i) => (
          <div key={i} style={{ display: "inline-flex", alignItems: "center", gap: 32, padding: "0 36px" }}>
            <span style={{ fontSize: 13, fontWeight: 500, color: C.muted }}>{item}</span>
            <span style={{ color: C.border, fontSize: 20 }}>|</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Features Section ───────────────────────────────────────────── */
function FeaturesSection() {
  const features = [
    {
      icon: Clock, title: "Real-Time Availability",
      desc: "Live spot updates every 10 seconds. No stale data, no wasted drives. Know before you go.",
      accent: C.accent, size: "large",
    },
    {
      icon: Navigation, title: "Smart Navigation",
      desc: "GPS-guided routing straight to your reserved spot.",
      accent: C.blue, size: "small",
    },
    {
      icon: Shield, title: "24/7 Security",
      desc: "All lots are CCTV-monitored with on-site security personnel.",
      accent: "#FF6B6B", size: "small",
    },
    {
      icon: Zap, title: "Instant Booking",
      desc: "Reserve and confirm in under 10 seconds. Pay as you go or pre-pay for better rates.",
      accent: "#FFB347", size: "medium",
    },
    {
      icon: CreditCard, title: "Transparent Pricing",
      desc: "No hidden fees. What you see is what you pay.",
      accent: "#C084FC", size: "medium",
    },
    {
      icon: Car, title: "Valet Services",
      desc: "White-glove valet in premium locations.",
      accent: C.accent, size: "small",
    },
  ];

  return (
    <section id="features" style={{ padding: "120px 0", position: "relative" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 28px" }}>

        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: 72 }}>
            <div className="badge-pill" style={{ marginBottom: 16 }}>Features</div>
            <h2 className="display-font" style={{ fontSize: "clamp(36px,5vw,60px)", fontWeight: 800, letterSpacing: "-0.04em", color: C.white, lineHeight: 1.05, marginBottom: 18 }}>
              Everything you need to park with confidence
            </h2>
            <p style={{ color: C.muted, fontSize: 17, maxWidth: 500, margin: "0 auto" }}>
              Thoughtfully designed to make the worst part of driving the easiest.
            </p>
          </div>
        </FadeIn>

        {/* Bento Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18 }} className="lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
          {features.map((f, i) => {
            const Icon = f.icon;
            const colSpan = f.size === "large" ? 2 : 1;
            return (
              <FadeIn key={i} delay={i * 0.06} style={{ gridColumn: `span ${colSpan}` }}>
                <div className="card-hover noise"
                  style={{
                    background: C.card, borderRadius: 24, border: `1px solid ${C.border}`,
                    padding: "32px 36px", height: "100%", position: "relative", overflow: "hidden",
                    gridColumn: `span ${colSpan}`,
                  }}>
                  {/* Background glow */}
                  <div style={{ position: "absolute", top: -60, right: -60, width: 200, height: 200, borderRadius: "50%", background: `radial-gradient(circle, ${f.accent}18 0%, transparent 70%)`, pointerEvents: "none" }} />

                  <div style={{ width: 48, height: 48, borderRadius: 14, background: f.accent + "18", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 24, border: `1px solid ${f.accent}30` }}>
                    <Icon size={22} color={f.accent} strokeWidth={1.8} />
                  </div>

                  <h3 className="display-font" style={{ fontSize: 20, fontWeight: 700, color: C.white, marginBottom: 12, letterSpacing: "-0.02em" }}>{f.title}</h3>
                  <p style={{ fontSize: 14, color: C.muted, lineHeight: 1.7 }}>{f.desc}</p>

                  {f.size === "large" && (
                    <div style={{ marginTop: 28, display: "flex", gap: 12 }}>
                      {["Updates every 10s", "Never stale", "100% accurate"].map(tag => (
                        <div key={tag} style={{ background: f.accent + "14", border: `1px solid ${f.accent}25`, borderRadius: 8, padding: "5px 12px", fontSize: 12, color: f.accent, fontWeight: 500 }}>{tag}</div>
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

/* ─── How It Works ───────────────────────────────────────────────── */
function HowItWorksSection() {
  const steps = [
    { n: "01", title: "Open the App", desc: "Enter your destination and when you're arriving. ParkEase shows every available spot in real-time.", icon: MapPin },
    { n: "02", title: "Choose & Reserve", desc: "Pick your preferred spot by price, distance, or type. Confirm your booking in one tap.", icon: CheckCircle },
    { n: "03", title: "Navigate & Park", desc: "Follow the guided route directly to your spot. Your space is held until you arrive.", icon: Navigation },
  ];

  return (
    <section style={{ padding: "100px 0", background: C.surface, position: "relative", overflow: "hidden" }}>
      <div className="orb-2" style={{ opacity: 0.6, right: "auto", left: -100, top: 50, bottom: "auto" }} />
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 28px", position: "relative", zIndex: 1 }}>

        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: 72 }}>
            <div className="badge-pill" style={{ marginBottom: 16 }}>How It Works</div>
            <h2 className="display-font" style={{ fontSize: "clamp(36px,5vw,56px)", fontWeight: 800, letterSpacing: "-0.04em", color: C.white, lineHeight: 1.05 }}>
              Parked in 3 steps
            </h2>
          </div>
        </FadeIn>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }} className="lg:grid-cols-3 grid-cols-1">
          {steps.map((s, i) => {
            const Icon = s.icon;
            return (
              <FadeIn key={i} delay={i * 0.12}>
                <div style={{ position: "relative", padding: "40px 36px", background: C.card, borderRadius: 24, border: `1px solid ${C.border}` }} className="card-hover">
                  {/* Step number */}
                  <div className="display-font" style={{ fontSize: 64, fontWeight: 800, color: C.accentDim, position: "absolute", top: 20, right: 28, lineHeight: 1, userSelect: "none", letterSpacing: "-0.05em", color: "rgba(184,255,87,0.08)" }}>
                    {s.n}
                  </div>

                  <div style={{ width: 52, height: 52, borderRadius: 15, background: C.accentDim, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 28, border: `1px solid rgba(184,255,87,0.2)` }}>
                    <Icon size={22} color={C.accent} strokeWidth={1.8} />
                  </div>

                  <h3 className="display-font" style={{ fontSize: 22, fontWeight: 700, color: C.white, marginBottom: 14, letterSpacing: "-0.025em" }}>{s.title}</h3>
                  <p style={{ fontSize: 14, color: C.muted, lineHeight: 1.75 }}>{s.desc}</p>

                  {i < 2 && (
                    <div style={{ position: "absolute", right: -30, top: "50%", transform: "translateY(-50%)", zIndex: 2, display: "none" }} className="lg:block">
                      <ChevronRight size={20} color={C.muted} />
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

/* ─── Pricing Section ────────────────────────────────────────────── */
function PricingSection() {
  const perks = [
    "Unlimited bookings per month",
    "Access to 40+ city networks",
    "Real-time availability alerts",
    "Priority lane & valet access",
    "24/7 concierge support",
    "Monthly billing, cancel anytime",
  ];

  return (
    <section id="pricing" style={{ padding: "120px 0", position: "relative", overflow: "hidden" }}>
      <div className="orb-1" style={{ top: "auto", bottom: -100, right: -100 }} />

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 28px", position: "relative", zIndex: 1 }}>
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div className="badge-pill" style={{ marginBottom: 16 }}>Pricing</div>
            <h2 className="display-font" style={{ fontSize: "clamp(36px,5vw,60px)", fontWeight: 800, letterSpacing: "-0.04em", color: C.white, lineHeight: 1.05, marginBottom: 14 }}>
              One plan. Everything included.
            </h2>
            <p style={{ color: C.muted, fontSize: 16 }}>No tiers, no confusion. Just frictionless parking.</p>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div style={{ maxWidth: 640, margin: "0 auto", background: C.card, borderRadius: 32, border: `1px solid rgba(184,255,87,0.15)`, overflow: "hidden", boxShadow: "0 0 80px rgba(184,255,87,0.06), 0 60px 80px rgba(0,0,0,0.4)" }}>

            {/* Top gradient strip */}
            <div style={{ height: 4, background: `linear-gradient(90deg, ${C.accent}, ${C.blue})` }} />

            <div style={{ padding: "44px 48px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 36 }}>
                <div>
                  <div className="badge-pill" style={{ marginBottom: 14 }}>Most popular</div>
                  <h3 className="display-font" style={{ fontSize: 26, fontWeight: 800, color: C.white, letterSpacing: "-0.03em" }}>ParkEase Pro</h3>
                  <p style={{ fontSize: 14, color: C.muted, marginTop: 6 }}>Full access, every feature.</p>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
                    <span className="display-font" style={{ fontSize: 56, fontWeight: 800, color: C.accent, lineHeight: 1, letterSpacing: "-0.04em" }}>$9</span>
                    <span style={{ fontSize: 16, color: C.muted }}>/mo</span>
                  </div>
                  <p style={{ fontSize: 12, color: C.muted }}>Billed monthly</p>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px 24px", marginBottom: 36 }}>
                {perks.map((p, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                    <CheckCircle size={16} color={C.accent} style={{ flexShrink: 0, marginTop: 2 }} />
                    <span style={{ fontSize: 13.5, color: C.muted, lineHeight: 1.5 }}>{p}</span>
                  </div>
                ))}
              </div>

              <a href="/signup" className="btn-primary" style={{ width: "100%", justifyContent: "center", fontSize: 16, padding: "16px 28px" }}>
                Start your free 14-day trial <ArrowRight size={18} />
              </a>
              <p style={{ textAlign: "center", fontSize: 12, color: C.muted, marginTop: 14 }}>
                <Lock size={10} style={{ display: "inline", marginRight: 5 }} />
                No credit card required to start
              </p>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ─── CTA Banner ─────────────────────────────────────────────────── */
function CTASection() {
  return (
    <section style={{ padding: "0 28px 120px" }}>
      <FadeIn>
        <div style={{ maxWidth: 1200, margin: "0 auto", borderRadius: 32, background: `linear-gradient(135deg, ${C.accent}18 0%, ${C.blue}12 100%)`, border: `1px solid rgba(184,255,87,0.15)`, padding: "72px 56px", textAlign: "center", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.02'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")", pointerEvents: "none", borderRadius: 32 }} />

          <div className="badge-pill" style={{ marginBottom: 20 }}>
            <span className="tag-dot" />
            Free 14-day trial
          </div>

          <h2 className="display-font" style={{ fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 800, letterSpacing: "-0.04em", color: C.white, lineHeight: 1.05, marginBottom: 18 }}>
            Stop hunting for parking.{" "}
            <span style={{ color: C.accent }}>Start owning it.</span>
          </h2>

          <p style={{ fontSize: 17, color: C.muted, maxWidth: 480, margin: "0 auto 36px" }}>
            Join 120,000+ drivers who've reclaimed hours of their lives every month.
          </p>

          <div style={{ display: "flex", justifyContent: "center", gap: 14, flexWrap: "wrap" }}>
            <a href="/signup" className="btn-primary" style={{ fontSize: 16, padding: "16px 36px" }}>
              Get started free <ArrowRight size={18} />
            </a>
            <a href="#features" className="btn-ghost" style={{ fontSize: 15 }}>See all features</a>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}

/* ─── Footer ─────────────────────────────────────────────────────── */
function Footer() {
  const links = {
    Product: ["Features", "Pricing", "Changelog", "Roadmap"],
    Company: ["About", "Blog", "Careers", "Press"],
    Legal: ["Privacy", "Terms", "Cookies"],
  };

  return (
    <footer style={{ borderTop: `1px solid ${C.border}`, background: C.surface }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "64px 28px 40px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 40, marginBottom: 56 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <div style={{ width: 32, height: 32, borderRadius: 9, background: C.accent, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Car size={16} color={C.bg} strokeWidth={2.5} />
              </div>
              <span className="display-font" style={{ fontWeight: 800, fontSize: 18, color: C.white }}>ParkEase</span>
            </div>
            <p style={{ fontSize: 13, color: C.muted, lineHeight: 1.7, maxWidth: 240 }}>
              Real-time parking intelligence for modern drivers. Smart. Fast. Reliable.
            </p>
          </div>

          {Object.entries(links).map(([heading, items]) => (
            <div key={heading}>
              <p className="display-font" style={{ fontSize: 13, fontWeight: 700, color: C.text, marginBottom: 18, letterSpacing: "0.02em", textTransform: "uppercase" }}>{heading}</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {items.map(item => (
                  <a key={item} href="#" style={{ fontSize: 13, color: C.muted, textDecoration: "none", transition: "color 0.2s" }}
                    onMouseOver={e => e.target.style.color = C.text}
                    onMouseOut={e => e.target.style.color = C.muted}>{item}</a>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: `1px solid ${C.border}`, paddingTop: 28 }}>
          <p style={{ fontSize: 12, color: C.muted }}>© 2026 ParkEase, Inc. All rights reserved.</p>
          <div style={{ display: "flex", gap: 20, fontSize: 12, color: C.muted }}>
            {["Twitter", "LinkedIn", "GitHub"].map(s => (
              <a key={s} href="#" style={{ color: C.muted, textDecoration: "none", transition: "color 0.2s" }}
                onMouseOver={e => e.target.style.color = C.text}
                onMouseOut={e => e.target.style.color = C.muted}>{s}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ─── Root ───────────────────────────────────────────────────────── */
export default function App() {
  return (
    <>
      <style>{fontStyle}</style>
      <div className="parkease-root">
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