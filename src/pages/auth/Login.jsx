// import { useState } from "react";
// import axios from "axios";
// import { useNavigate, useSearchParams } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import { Mail, Lock, KeyRound, Loader2, Sparkles } from "lucide-react";

// function Login() {
//   const [searchParams] = useSearchParams();
//   const [view, setView] = useState("login");
//   const oauthError = searchParams.get("error");
//   const [loginMethod, setLoginMethod] = useState("password");

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [otp, setOtp] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [step, setStep] = useState(1);
//   const [loading, setLoading] = useState(false);

//   const navigate = useNavigate();

//   // ✅ Success handler – unchanged
//   const handleLoginSuccess = (user) => {
//     if (!user) {
//       console.error("Login failed: Missing user data");
//       return;
//     }
//     localStorage.setItem("user", JSON.stringify(user));
//     localStorage.setItem("userId", user.id);
//     localStorage.setItem("role", user.role);
//     const role = user.role ? user.role.toUpperCase() : "DRIVER";
//     const target =
//       role === "ADMIN" || role === "OWNER"
//         ? "/admin-dashboard"
//         : role === "VALET"
//         ? "/valet-dashboard"
//         : "/user-dashboard";
//     navigate(target);
//   };

//   // --- API Handlers (identical) ---
//   const handleSendOtp = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       await axios.post("http://localhost:8080/api/auth/send-otp", { email });
//       setStep(2);
//     } catch {
//       alert("Failed to send OTP.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleOtpLogin = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const res = await axios.post("http://localhost:8080/api/auth/verify-otp", {
//         email,
//         otp,
//       });
//       if (res.data.token) localStorage.setItem("token", res.data.token);
//       handleLoginSuccess(res.data.user);
//     } catch {
//       alert("Invalid OTP!");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handlePasswordLogin = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const res = await axios.post("http://localhost:8080/api/auth/login", {
//         email,
//         password,
//       });
//       if (res.data.token) localStorage.setItem("token", res.data.token);
//       handleLoginSuccess(res.data.user);
//     } catch {
//       alert("Invalid Credentials");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSendMagicLink = async () => {
//     if (!email) {
//       alert("Please enter your email address first.");
//       return;
//     }
//     setLoading(true);
//     try {
//       await axios.post("http://localhost:8080/api/auth/send-magic-link", {
//         email,
//       });
//       alert("✨ Magic Link Sent! Check your email to log in instantly.");
//     } catch {
//       alert("Failed to send magic link. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleResetPassword = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       await axios.post("http://localhost:8080/api/auth/reset-password", {
//         email,
//         otp,
//         newPassword,
//       });
//       alert("Success! Please Login.");
//       setView("login");
//       setLoginMethod("password");
//       setStep(1);
//     } catch {
//       alert("Failed to reset.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Animation variants
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: { staggerChildren: 0.07, delayChildren: 0.1 },
//     },
//     exit: { opacity: 0, x: -20, transition: { duration: 0.2 } },
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: { opacity: 1, y: 0, transition: { type: "spring", damping: 12 } },
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 relative overflow-hidden">
//       {/* Animated background blobs */}
//       <motion.div
//         animate={{ x: [0, 100, 0], y: [0, -50, 0] }}
//         transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
//         className="absolute top-0 left-0 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
//       />
//       <motion.div
//         animate={{ x: [0, -100, 0], y: [0, 50, 0] }}
//         transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
//         className="absolute bottom-0 right-0 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
//       />
//       {/* Floating particles */}
//       {[...Array(12)].map((_, i) => (
//         <motion.div
//           key={i}
//           className="absolute w-1 h-1 bg-white/30 rounded-full"
//           initial={{ x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight }}
//           animate={{
//             y: [0, -100, 0],
//             x: [0, Math.random() * 50 - 25, 0],
//           }}
//           transition={{ duration: 8 + Math.random() * 10, repeat: Infinity, ease: "linear" }}
//         />
//       ))}

//       <motion.div
//         initial={{ opacity: 0, scale: 0.9 }}
//         animate={{ opacity: 1, scale: 1 }}
//         transition={{ duration: 0.5, type: "spring", damping: 15 }}
//         className="relative w-full max-w-md bg-white/10 backdrop-blur-2xl p-8 rounded-3xl shadow-2xl border border-white/20 text-white"
//       >
//         {/* Header */}
//         <motion.h2
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.1 }}
//           className="text-3xl font-bold text-center mb-1 tracking-tight"
//         >
//           Welcome Back
//         </motion.h2>
//         <motion.p
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.15 }}
//           className="text-center text-indigo-200 text-sm mb-6"
//         >
//           {view === "login"
//             ? "Enter your details to continue"
//             : "Reset your password"}
//         </motion.p>

//         <AnimatePresence mode="wait">
//           {view === "login" ? (
//             <motion.div
//               key="login"
//               variants={containerVariants}
//               initial="hidden"
//               animate="visible"
//               exit="exit"
//             >
//               {/* OAuth Error Alert */}
//               {oauthError === "not_registered" && (
//                 <motion.div
//                   variants={itemVariants}
//                   className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-xl text-red-200 text-sm text-center"
//                 >
//                   No account found for this Google email. Please{" "}
//                   <strong>Sign Up</strong> first!
//                 </motion.div>
//               )}

//               {/* Google Login */}
//               <motion.div variants={itemVariants} className="mb-6">
//                 <motion.a
//                   href="http://localhost:8080/oauth2/authorization/google"
//                   whileHover={{ scale: 1.02, y: -2 }}
//                   whileTap={{ scale: 0.98 }}
//                   className="w-full flex items-center justify-center gap-3 bg-white text-slate-700 font-bold py-3.5 rounded-xl border border-slate-200 shadow-sm hover:bg-slate-50 transition-all"
//                 >
//                   <img
//                     src="https://www.svgrepo.com/show/475656/google-color.svg"
//                     className="w-5 h-5"
//                     alt="Google"
//                   />
//                   Continue with Google
//                 </motion.a>

//                 <div className="relative my-6">
//                   <div className="absolute inset-0 flex items-center">
//                     <div className="w-full border-t border-white/20"></div>
//                   </div>
//                   <div className="relative flex justify-center text-xs uppercase">
//                     <span className="bg-slate-900/50 px-2 text-indigo-200">
//                       Or use email
//                     </span>
//                   </div>
//                 </div>
//               </motion.div>

//               {/* Tabs */}
//               <motion.div
//                 variants={itemVariants}
//                 className="flex bg-black/20 p-1 rounded-xl mb-6 relative"
//               >
//                 {["password", "otp"].map((method) => (
//                   <button
//                     key={method}
//                     onClick={() => setLoginMethod(method)}
//                     className="relative flex-1 py-2 text-sm font-bold z-10 transition-colors capitalize"
//                   >
//                     {method === loginMethod && (
//                       <motion.div
//                         layoutId="activeTab"
//                         className="absolute inset-0 bg-indigo-600 rounded-lg shadow-sm"
//                         transition={{ type: "spring", stiffness: 400, damping: 30 }}
//                       />
//                     )}
//                     <span className="relative z-20">
//                       {method === "otp" ? "✨ OTP Login" : "🔑 Password"}
//                     </span>
//                   </button>
//                 ))}
//               </motion.div>

//               {/* Forms */}
//               {loginMethod === "password" ? (
//                 <motion.form
//                   variants={containerVariants}
//                   onSubmit={handlePasswordLogin}
//                   className="space-y-4"
//                 >
//                   <motion.div variants={itemVariants} className="relative group">
//                     <Mail className="absolute left-4 top-3.5 text-indigo-200 group-focus-within:text-white transition-colors w-5 h-5" />
//                     <input
//                       type="email"
//                       required
//                       placeholder="Email Address"
//                       value={email}
//                       onChange={(e) => setEmail(e.target.value)}
//                       className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/10 rounded-xl focus:ring-2 focus:ring-indigo-400 focus:bg-white/20 outline-none text-white placeholder-indigo-200/50 transition-all"
//                     />
//                   </motion.div>
//                   <motion.div variants={itemVariants} className="relative group">
//                     <Lock className="absolute left-4 top-3.5 text-indigo-200 group-focus-within:text-white transition-colors w-5 h-5" />
//                     <input
//                       type="password"
//                       required
//                       placeholder="Password"
//                       value={password}
//                       onChange={(e) => setPassword(e.target.value)}
//                       className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/10 rounded-xl focus:ring-2 focus:ring-indigo-400 focus:bg-white/20 outline-none text-white placeholder-indigo-200/50 transition-all"
//                     />
//                   </motion.div>
//                   <motion.div variants={itemVariants} className="text-right">
//                     <button
//                       type="button"
//                       onClick={() => {
//                         setView("reset");
//                         setStep(1);
//                       }}
//                       className="text-xs text-indigo-300 font-bold hover:text-white hover:underline transition-all"
//                     >
//                       Forgot Password?
//                     </button>
//                   </motion.div>
//                   <motion.button
//                     variants={itemVariants}
//                     whileHover={{ scale: 1.02, y: -1 }}
//                     whileTap={{ scale: 0.98 }}
//                     type="submit"
//                     disabled={loading}
//                     className="w-full bg-indigo-600 hover:bg-indigo-500 py-3 rounded-xl font-bold shadow-lg shadow-indigo-500/30 transition-all flex items-center justify-center gap-2 relative overflow-hidden"
//                   >
//                     {loading ? (
//                       <Loader2 className="animate-spin" />
//                     ) : (
//                       "Login"
//                     )}
//                     <motion.div
//                       className="absolute inset-0 bg-white/20"
//                       initial={{ x: "-100%" }}
//                       whileHover={{ x: "200%" }}
//                       transition={{ duration: 0.6 }}
//                     />
//                   </motion.button>
//                 </motion.form>
//               ) : (
//                 <AnimatePresence mode="wait">
//                   {step === 1 ? (
//                     <motion.form
//                       key="otp-step1"
//                       variants={containerVariants}
//                       initial="hidden"
//                       animate="visible"
//                       exit="exit"
//                       onSubmit={handleSendOtp}
//                       className="space-y-4"
//                     >
//                       <motion.div variants={itemVariants} className="relative group">
//                         <Mail className="absolute left-4 top-3.5 text-indigo-200 group-focus-within:text-white transition-colors w-5 h-5" />
//                         <input
//                           type="email"
//                           required
//                           placeholder="Email Address"
//                           value={email}
//                           onChange={(e) => setEmail(e.target.value)}
//                           className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/10 rounded-xl focus:ring-2 focus:ring-indigo-400 focus:bg-white/20 outline-none text-white placeholder-indigo-200/50 transition-all"
//                         />
//                       </motion.div>
//                       <motion.button
//                         variants={itemVariants}
//                         whileHover={{ scale: 1.02 }}
//                         whileTap={{ scale: 0.98 }}
//                         type="submit"
//                         disabled={loading}
//                         className="w-full bg-pink-600 hover:bg-pink-500 py-3 rounded-xl font-bold shadow-lg shadow-pink-500/30 transition-all flex items-center justify-center gap-2"
//                       >
//                         {loading ? (
//                           <Loader2 className="animate-spin" />
//                         ) : (
//                           "Send OTP Code"
//                         )}
//                       </motion.button>
//                     </motion.form>
//                   ) : (
//                     <motion.form
//                       key="otp-step2"
//                       variants={containerVariants}
//                       initial="hidden"
//                       animate="visible"
//                       exit="exit"
//                       onSubmit={handleOtpLogin}
//                       className="space-y-4"
//                     >
//                       <motion.div
//                         variants={itemVariants}
//                         className="text-center text-sm text-green-300 bg-green-900/30 p-2 rounded-lg border border-green-500/30"
//                       >
//                         OTP sent to {email}
//                       </motion.div>
//                       <motion.div variants={itemVariants}>
//                         <input
//                           type="text"
//                           required
//                           placeholder="• • • • • •"
//                           value={otp}
//                           onChange={(e) => setOtp(e.target.value)}
//                           className="w-full text-center py-3 bg-white/10 border border-white/10 rounded-xl tracking-[1em] text-2xl font-bold focus:ring-2 focus:ring-green-400 outline-none text-white transition-all"
//                         />
//                       </motion.div>
//                       <motion.button
//                         variants={itemVariants}
//                         whileHover={{ scale: 1.02 }}
//                         whileTap={{ scale: 0.98 }}
//                         type="submit"
//                         disabled={loading}
//                         className="w-full bg-green-600 hover:bg-green-500 py-3 rounded-xl font-bold shadow-lg shadow-green-500/30 transition-all flex items-center justify-center gap-2"
//                       >
//                         {loading ? "Verifying..." : "Verify & Login"}
//                       </motion.button>
//                       <motion.button
//                         variants={itemVariants}
//                         type="button"
//                         onClick={() => setStep(1)}
//                         className="w-full text-indigo-300 text-sm hover:text-white transition-colors"
//                       >
//                         Change Email
//                       </motion.button>
//                     </motion.form>
//                   )}
//                 </AnimatePresence>
//               )}

//               {/* Magic Link Button */}
//               <motion.div variants={itemVariants} className="mt-6 pt-4 border-t border-white/10">
//                 <motion.button
//                   type="button"
//                   onClick={handleSendMagicLink}
//                   disabled={loading}
//                   whileHover={{ scale: 1.02 }}
//                   whileTap={{ scale: 0.98 }}
//                   className="w-full group relative flex items-center justify-center gap-2 bg-gradient-to-r from-violet-600/20 to-indigo-600/20 hover:from-violet-600/40 hover:to-indigo-600/40 border border-white/10 hover:border-violet-400/50 rounded-xl py-3 transition-all overflow-hidden"
//                 >
//                   <Sparkles className="w-4 h-4 text-violet-300 group-hover:text-white transition-colors" />
//                   <span className="text-sm font-bold text-violet-200 group-hover:text-white transition-colors">
//                     {loading ? "Sending..." : "Email Me a Magic Login Link"}
//                   </span>
//                   <motion.div
//                     className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"
//                     initial={{ x: "-100%" }}
//                     whileHover={{ x: "200%" }}
//                     transition={{ duration: 0.8 }}
//                   />
//                 </motion.button>
//               </motion.div>
//             </motion.div>
//           ) : (
//             // Reset Password View
//             <motion.div
//               key="reset"
//               variants={containerVariants}
//               initial="hidden"
//               animate="visible"
//               exit="exit"
//             >
//               {step === 1 ? (
//                 <motion.form
//                   variants={containerVariants}
//                   onSubmit={handleSendOtp}
//                   className="space-y-4"
//                 >
//                   <motion.div variants={itemVariants} className="relative group">
//                     <Mail className="absolute left-4 top-3.5 text-indigo-200 group-focus-within:text-white transition-colors w-5 h-5" />
//                     <input
//                       type="email"
//                       required
//                       placeholder="Email Address"
//                       value={email}
//                       onChange={(e) => setEmail(e.target.value)}
//                       className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/10 rounded-xl focus:ring-2 focus:ring-indigo-400 focus:bg-white/20 outline-none text-white placeholder-indigo-200/50 transition-all"
//                     />
//                   </motion.div>
//                   <motion.button
//                     variants={itemVariants}
//                     whileHover={{ scale: 1.02 }}
//                     whileTap={{ scale: 0.98 }}
//                     type="submit"
//                     disabled={loading}
//                     className="w-full bg-indigo-600 hover:bg-indigo-500 py-3 rounded-xl font-bold shadow-lg shadow-indigo-500/30 transition-all"
//                   >
//                     {loading ? "Sending..." : "Send Reset Code"}
//                   </motion.button>
//                   <motion.button
//                     variants={itemVariants}
//                     type="button"
//                     onClick={() => setView("login")}
//                     className="w-full text-indigo-300 text-sm mt-2 hover:text-white transition-colors"
//                   >
//                     Back to Login
//                   </motion.button>
//                 </motion.form>
//               ) : (
//                 <motion.form
//                   variants={containerVariants}
//                   onSubmit={handleResetPassword}
//                   className="space-y-4"
//                 >
//                   <motion.div variants={itemVariants} className="relative group">
//                     <KeyRound className="absolute left-4 top-3.5 text-indigo-200 group-focus-within:text-white transition-colors w-5 h-5" />
//                     <input
//                       type="text"
//                       required
//                       placeholder="OTP Code"
//                       value={otp}
//                       onChange={(e) => setOtp(e.target.value)}
//                       className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/10 rounded-xl focus:ring-2 focus:ring-indigo-400 focus:bg-white/20 outline-none text-white placeholder-indigo-200/50 transition-all"
//                     />
//                   </motion.div>
//                   <motion.div variants={itemVariants} className="relative group">
//                     <Lock className="absolute left-4 top-3.5 text-indigo-200 group-focus-within:text-white transition-colors w-5 h-5" />
//                     <input
//                       type="password"
//                       required
//                       placeholder="New Password"
//                       value={newPassword}
//                       onChange={(e) => setNewPassword(e.target.value)}
//                       className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/10 rounded-xl focus:ring-2 focus:ring-indigo-400 focus:bg-white/20 outline-none text-white placeholder-indigo-200/50 transition-all"
//                     />
//                   </motion.div>
//                   <motion.button
//                     variants={itemVariants}
//                     whileHover={{ scale: 1.02 }}
//                     whileTap={{ scale: 0.98 }}
//                     type="submit"
//                     disabled={loading}
//                     className="w-full bg-red-600 hover:bg-red-500 py-3 rounded-xl font-bold shadow-lg shadow-red-500/30 transition-all"
//                   >
//                     {loading ? "Updating..." : "Reset Password"}
//                   </motion.button>
//                 </motion.form>
//               )}
//             </motion.div>
//           )}
//         </AnimatePresence>

//         {/* Sign up link */}
//         {view === "login" && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.4 }}
//             className="mt-6 text-center"
//           >
//             <p className="text-sm text-indigo-200">
//               Don't have an account?{" "}
//               <span
//                 onClick={() => navigate("/signup")}
//                 className="text-white font-bold cursor-pointer hover:underline transition-all"
//               >
//                 Sign up here
//               </span>
//             </p>
//           </motion.div>
//         )}
//       </motion.div>
//     </div>
//   );
// }

// export default Login;

import { useState } from "react";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, KeyRound, Loader2, Sparkles, Car, ArrowLeft, ArrowRight, Eye, EyeOff } from "lucide-react";

/* ─── Design Tokens (identical to Landing Page) ───────────────────── */
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

const fontStyle = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }

  .login-root {
    font-family: 'DM Sans', sans-serif;
    background: ${C.bg};
    color: ${C.text};
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
    padding: 24px;
  }
  .display-font { font-family: 'Syne', sans-serif; }

  .grid-bg {
    position: absolute; inset: 0;
    background-image:
      linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
    background-size: 60px 60px;
    pointer-events: none;
  }
  .grid-fade {
    position: absolute; inset: 0;
    background: linear-gradient(to bottom, transparent 40%, ${C.bg});
    pointer-events: none;
  }

  .orb-green {
    position: absolute; border-radius: 50%; filter: blur(130px); pointer-events: none;
    width: 480px; height: 480px;
    background: radial-gradient(circle, rgba(184,255,87,0.12) 0%, transparent 70%);
    top: -120px; right: -100px;
    animation: orbF 9s ease-in-out infinite alternate;
  }
  .orb-blue {
    position: absolute; border-radius: 50%; filter: blur(110px); pointer-events: none;
    width: 360px; height: 360px;
    background: radial-gradient(circle, rgba(75,158,255,0.1) 0%, transparent 70%);
    bottom: -80px; left: -100px;
    animation: orbF 12s ease-in-out infinite alternate-reverse;
  }
  @keyframes orbF {
    from { transform: translate(0,0) scale(1); }
    to   { transform: translate(18px,28px) scale(1.06); }
  }

  .auth-card {
    width: 100%;
    max-width: 460px;
    background: ${C.card};
    border: 1px solid ${C.border};
    border-radius: 28px;
    padding: 44px 44px;
    box-shadow: 0 60px 100px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.04);
    position: relative;
    overflow: hidden;
    z-index: 1;
  }

  .input-wrap {
    position: relative;
    margin-bottom: 14px;
  }
  .input-icon {
    position: absolute;
    left: 16px;
    top: 50%;
    transform: translateY(-50%);
    color: ${C.muted};
    pointer-events: none;
    transition: color 0.2s;
  }
  .input-wrap:focus-within .input-icon { color: ${C.accent}; }
  .auth-input {
    width: 100%;
    padding: 14px 16px 14px 46px;
    background: rgba(255,255,255,0.04);
    border: 1px solid ${C.border};
    border-radius: 12px;
    color: ${C.text};
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    outline: none;
    transition: all 0.25s;
  }
  .auth-input::placeholder { color: ${C.muted}; }
  .auth-input:focus {
    border-color: rgba(184,255,87,0.35);
    background: rgba(184,255,87,0.04);
    box-shadow: 0 0 0 3px rgba(184,255,87,0.08);
  }
  .auth-input.otp-input {
    text-align: center;
    letter-spacing: 0.5em;
    font-size: 22px;
    font-weight: 700;
    padding-left: 16px;
    font-family: 'Syne', sans-serif;
  }

  .tab-bar {
    display: flex;
    background: rgba(255,255,255,0.04);
    border: 1px solid ${C.border};
    border-radius: 12px;
    padding: 4px;
    gap: 4px;
    margin-bottom: 28px;
  }
  .tab-btn {
    flex: 1; padding: 10px; border-radius: 9px;
    font-size: 13px; font-weight: 600;
    font-family: 'DM Sans', sans-serif;
    border: none; cursor: pointer;
    transition: all 0.25s;
    background: transparent; color: ${C.muted};
  }
  .tab-btn.active {
    background: ${C.accent};
    color: ${C.bg};
    box-shadow: 0 2px 12px rgba(184,255,87,0.3);
  }

  .btn-primary {
    width: 100%;
    padding: 15px 24px;
    border-radius: 12px;
    font-weight: 700;
    font-size: 15px;
    font-family: 'Syne', sans-serif;
    background: ${C.accent};
    color: ${C.bg};
    border: none; cursor: pointer;
    display: flex; align-items: center; justify-content: center; gap: 8px;
    transition: all 0.25s;
    margin-top: 8px;
  }
  .btn-primary:hover:not(:disabled) {
    background: #cbff6e;
    box-shadow: 0 0 32px rgba(184,255,87,0.4);
    transform: translateY(-1px);
  }
  .btn-primary:disabled { opacity: 0.55; cursor: not-allowed; }

  .btn-ghost-full {
    width: 100%;
    padding: 13px 24px;
    border-radius: 12px;
    font-weight: 500;
    font-size: 14px;
    font-family: 'DM Sans', sans-serif;
    background: transparent;
    color: ${C.muted};
    border: 1px solid ${C.border}; cursor: pointer;
    display: flex; align-items: center; justify-content: center; gap: 8px;
    transition: all 0.25s;
  }
  .btn-ghost-full:hover:not(:disabled) {
    border-color: rgba(255,255,255,0.18);
    color: ${C.text};
  }
  .btn-ghost-full:disabled { opacity: 0.5; cursor: not-allowed; }

  .magic-btn {
    width: 100%;
    padding: 13px 20px;
    border-radius: 12px;
    font-weight: 600; font-size: 13.5px;
    font-family: 'DM Sans', sans-serif;
    background: rgba(75,158,255,0.1);
    color: ${C.blue};
    border: 1px solid rgba(75,158,255,0.2); cursor: pointer;
    display: flex; align-items: center; justify-content: center; gap: 8px;
    transition: all 0.25s; position: relative; overflow: hidden;
  }
  .magic-btn:hover:not(:disabled) {
    background: rgba(75,158,255,0.18);
    border-color: rgba(75,158,255,0.4);
    box-shadow: 0 0 24px rgba(75,158,255,0.15);
  }
  .magic-btn:disabled { opacity: 0.5; cursor: not-allowed; }

  .divider {
    display: flex; align-items: center; gap: 14px;
    margin: 20px 0;
  }
  .divider::before, .divider::after {
    content: ''; flex: 1;
    height: 1px; background: ${C.border};
  }
  .divider span { font-size: 12px; color: ${C.muted}; white-space: nowrap; }

  .otp-success {
    text-align: center; font-size: 13px;
    color: ${C.accent};
    background: rgba(184,255,87,0.07);
    border: 1px solid rgba(184,255,87,0.18);
    border-radius: 10px; padding: 10px 14px;
    margin-bottom: 16px;
  }

  .back-link {
    position: fixed; top: 24px; left: 28px;
    display: flex; align-items: center; gap: 8px;
    color: ${C.muted}; text-decoration: none;
    font-size: 14px; font-weight: 500;
    font-family: 'DM Sans', sans-serif;
    transition: color 0.2s; z-index: 10;
    background: rgba(15,18,32,0.85);
    backdrop-filter: blur(12px);
    border: 1px solid ${C.border};
    border-radius: 10px;
    padding: 8px 16px;
  }
  .back-link:hover { color: ${C.text}; border-color: rgba(255,255,255,0.15); }

  .password-toggle {
    position: absolute; right: 14px; top: 50%;
    transform: translateY(-50%);
    background: none; border: none; cursor: pointer;
    color: ${C.muted}; padding: 4px;
    transition: color 0.2s; z-index: 2;
  }
  .password-toggle:hover { color: ${C.text}; }

  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: ${C.bg}; }
  ::-webkit-scrollbar-thumb { background: ${C.accentDim}; border-radius: 2px; }
`;

/* ─── Animation Variants ─────────────────────────────────────────── */
const fadeSlide = {
  hidden: { opacity: 0, y: 16 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] },
  }),
  exit: { opacity: 0, x: -16, transition: { duration: 0.2 } },
};

const cardVariant = {
  hidden: { opacity: 0, scale: 0.96, y: 20 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

/* ─── Shared Input ───────────────────────────────────────────────── */
function AuthInput({ icon: Icon, name, type = "text", placeholder, value, onChange, required, isOtp = false }) {
  const [showPw, setShowPw] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword ? (showPw ? "text" : "password") : type;

  return (
    <div className="input-wrap">
      <Icon size={17} className="input-icon" />
      <input
        className={`auth-input${isOtp ? " otp-input" : ""}`}
        type={inputType}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        style={isPassword ? { paddingRight: 46 } : {}}
      />
      {isPassword && (
        <button type="button" className="password-toggle" onClick={() => setShowPw(p => !p)}>
          {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
        </button>
      )}
    </div>
  );
}

/* ─── Main Login Component ───────────────────────────────────────── */
function Login() {
  const [searchParams] = useSearchParams();
  const [view, setView] = useState("login");
  const [loginMethod, setLoginMethod] = useState("password");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  /* ── Handlers (unchanged logic) ── */
  const handleLoginSuccess = (user) => {
    if (!user) return;
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("userId", user.id);
    localStorage.setItem("role", user.role);
    const role = user.role?.toUpperCase() ?? "DRIVER";
    navigate(role === "ADMIN" || role === "OWNER" ? "/admin-dashboard" : role === "VALET" ? "/valet-dashboard" : "/user-dashboard");
  };

  const handleSendOtp = async (e) => {
    e.preventDefault(); setLoading(true);
    try { await axios.post("http://localhost:8080/api/auth/send-otp", { email }); setStep(2); }
    catch { alert("Failed to send OTP."); }
    finally { setLoading(false); }
  };

  const handleOtpLogin = async (e) => {
    e.preventDefault(); setLoading(true);
    try {
      const res = await axios.post("http://localhost:8080/api/auth/verify-otp", { email, otp });
      if (res.data.token) localStorage.setItem("token", res.data.token);
      handleLoginSuccess(res.data.user);
    } catch { alert("Invalid OTP!"); }
    finally { setLoading(false); }
  };

  const handlePasswordLogin = async (e) => {
    e.preventDefault(); setLoading(true);
    try {
      const res = await axios.post("http://51.21.244.207:8080/api/auth/login", { email, password });
      if (res.data.token) localStorage.setItem("token", res.data.token);
      handleLoginSuccess(res.data.user);
    } catch { alert("Invalid Credentials"); }
    finally { setLoading(false); }
  };

  const handleSendMagicLink = async () => {
    if (!email) { alert("Please enter your email address first."); return; }
    setLoading(true);
    try { await axios.post("http://localhost:8080/api/auth/send-magic-link", { email }); alert("✨ Magic Link Sent! Check your email."); }
    catch { alert("Failed to send magic link. Please try again."); }
    finally { setLoading(false); }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault(); setLoading(true);
    try {
      await axios.post("http://localhost:8080/api/auth/reset-password", { email, otp, newPassword });
      alert("Password reset! Please login.");
      setView("login"); setLoginMethod("password"); setStep(1);
    } catch { alert("Failed to reset."); }
    finally { setLoading(false); }
  };

  return (
    <>
      <style>{fontStyle}</style>
      <div className="login-root">
        {/* Background */}
        <div className="grid-bg" />
        <div className="grid-fade" />
        <div className="orb-green" />
        <div className="orb-blue" />

        {/* Back to Home */}
        <a href="/" className="back-link">
          <ArrowLeft size={15} />
          Back to Home
        </a>

        {/* Card */}
        <motion.div className="auth-card" variants={cardVariant} initial="hidden" animate="visible">
          {/* Top accent line */}
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${C.accent}, ${C.blue})`, borderRadius: "28px 28px 0 0" }} />

          {/* Logo */}
          <motion.div custom={0} variants={fadeSlide} initial="hidden" animate="visible"
            style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 32 }}>
            <div style={{ width: 36, height: 36, borderRadius: 11, background: C.accent, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <Car size={18} color={C.bg} strokeWidth={2.5} />
            </div>
            <span className="display-font" style={{ fontWeight: 800, fontSize: 20, color: C.white, letterSpacing: "-0.02em" }}>ParkEase</span>
          </motion.div>

          <AnimatePresence mode="wait">
            {view === "login" ? (
              <motion.div key="login-view" initial="hidden" animate="visible" exit="exit" variants={fadeSlide}>
                {/* Headline */}
                <div style={{ marginBottom: 28 }}>
                  <h1 className="display-font" style={{ fontSize: 28, fontWeight: 800, color: C.white, letterSpacing: "-0.04em", marginBottom: 6 }}>
                    Welcome back
                  </h1>
                  <p style={{ fontSize: 14, color: C.muted }}>Sign in to continue to your dashboard</p>
                </div>

                {/* Tab switcher */}
                <div className="tab-bar">
                  {[["password","Password"], ["otp","OTP Code"]].map(([val, label]) => (
                    <button key={val} className={`tab-btn${loginMethod === val ? " active" : ""}`}
                      onClick={() => { setLoginMethod(val); setStep(1); }}>
                      {label}
                    </button>
                  ))}
                </div>

                <AnimatePresence mode="wait">
                  {/* Password Login */}
                  {loginMethod === "password" && (
                    <motion.form key="pw" variants={fadeSlide} initial="hidden" animate="visible" exit="exit"
                      onSubmit={handlePasswordLogin} style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                      <motion.div custom={0} variants={fadeSlide} initial="hidden" animate="visible">
                        <AuthInput icon={Mail} name="email" type="email" placeholder="Email address"
                          value={email} onChange={e => setEmail(e.target.value)} required />
                      </motion.div>
                      <motion.div custom={1} variants={fadeSlide} initial="hidden" animate="visible">
                        <AuthInput icon={Lock} name="password" type="password" placeholder="Password"
                          value={password} onChange={e => setPassword(e.target.value)} required />
                      </motion.div>
                      <motion.div custom={2} variants={fadeSlide} initial="hidden" animate="visible"
                        style={{ textAlign: "right", marginBottom: 16, marginTop: -6 }}>
                        <button type="button" onClick={() => { setView("reset"); setStep(1); }}
                          style={{ background: "none", border: "none", cursor: "pointer", color: C.accent, fontSize: 13, fontWeight: 500 }}>
                          Forgot password?
                        </button>
                      </motion.div>
                      <motion.button custom={3} variants={fadeSlide} initial="hidden" animate="visible"
                        className="btn-primary" type="submit" disabled={loading}
                        whileHover={{ scale: 1.015 }} whileTap={{ scale: 0.985 }}>
                        {loading ? <Loader2 size={18} className="animate-spin" /> : <><span>Sign In</span><ArrowRight size={16} /></>}
                      </motion.button>
                    </motion.form>
                  )}

                  {/* OTP Login */}
                  {loginMethod === "otp" && (
                    <motion.div key="otp" variants={fadeSlide} initial="hidden" animate="visible" exit="exit">
                      <AnimatePresence mode="wait">
                        {step === 1 ? (
                          <motion.form key="otp-s1" variants={fadeSlide} initial="hidden" animate="visible" exit="exit"
                            onSubmit={handleSendOtp}>
                            <AuthInput icon={Mail} name="email" type="email" placeholder="Email address"
                              value={email} onChange={e => setEmail(e.target.value)} required />
                            <motion.button className="btn-primary" type="submit" disabled={loading}
                              whileHover={{ scale: 1.015 }} whileTap={{ scale: 0.985 }}>
                              {loading ? <Loader2 size={18} className="animate-spin" /> : "Send OTP Code"}
                            </motion.button>
                          </motion.form>
                        ) : (
                          <motion.form key="otp-s2" variants={fadeSlide} initial="hidden" animate="visible" exit="exit"
                            onSubmit={handleOtpLogin}>
                            <div className="otp-success">OTP sent to {email} ✓</div>
                            <AuthInput icon={KeyRound} name="otp" placeholder="• • • • • •"
                              value={otp} onChange={e => setOtp(e.target.value)} required isOtp />
                            <motion.button className="btn-primary" type="submit" disabled={loading}
                              whileHover={{ scale: 1.015 }} whileTap={{ scale: 0.985 }}
                              style={{ background: C.accent, marginBottom: 10 }}>
                              {loading ? <Loader2 size={18} className="animate-spin" /> : "Verify & Sign In"}
                            </motion.button>
                            <button type="button" className="btn-ghost-full"
                              onClick={() => setStep(1)}>← Change Email</button>
                          </motion.form>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Magic Link */}
                <div className="divider"><span>or continue with</span></div>
                <motion.button type="button" className="magic-btn" onClick={handleSendMagicLink}
                  disabled={loading} whileHover={{ scale: 1.015 }} whileTap={{ scale: 0.985 }}>
                  <Sparkles size={15} />
                  {loading ? "Sending..." : "Email me a Magic Login Link"}
                </motion.button>

                {/* Sign up */}
                <p style={{ textAlign: "center", fontSize: 13, color: C.muted, marginTop: 28 }}>
                  Don't have an account?{" "}
                  <span onClick={() => navigate("/signup")}
                    style={{ color: C.accent, fontWeight: 700, cursor: "pointer" }}>
                    Sign up free
                  </span>
                </p>
              </motion.div>
            ) : (
              /* ─── Reset Password View ─── */
              <motion.div key="reset-view" initial="hidden" animate="visible" exit="exit" variants={fadeSlide}>
                <div style={{ marginBottom: 28 }}>
                  <h1 className="display-font" style={{ fontSize: 26, fontWeight: 800, color: C.white, letterSpacing: "-0.04em", marginBottom: 6 }}>
                    Reset password
                  </h1>
                  <p style={{ fontSize: 14, color: C.muted }}>
                    {step === 1 ? "We'll send a reset code to your email" : "Enter the code and your new password"}
                  </p>
                </div>

                <AnimatePresence mode="wait">
                  {step === 1 ? (
                    <motion.form key="r1" variants={fadeSlide} initial="hidden" animate="visible" exit="exit"
                      onSubmit={handleSendOtp}>
                      <AuthInput icon={Mail} name="email" type="email" placeholder="Email address"
                        value={email} onChange={e => setEmail(e.target.value)} required />
                      <motion.button className="btn-primary" type="submit" disabled={loading}
                        whileHover={{ scale: 1.015 }} whileTap={{ scale: 0.985 }}>
                        {loading ? <Loader2 size={18} className="animate-spin" /> : "Send Reset Code"}
                      </motion.button>
                    </motion.form>
                  ) : (
                    <motion.form key="r2" variants={fadeSlide} initial="hidden" animate="visible" exit="exit"
                      onSubmit={handleResetPassword}>
                      <div className="otp-success">Reset code sent to {email} ✓</div>
                      <AuthInput icon={KeyRound} name="otp" placeholder="• • • • • •"
                        value={otp} onChange={e => setOtp(e.target.value)} required isOtp />
                      <AuthInput icon={Lock} name="newPassword" type="password" placeholder="New password"
                        value={newPassword} onChange={e => setNewPassword(e.target.value)} required />
                      <motion.button className="btn-primary" type="submit" disabled={loading}
                        whileHover={{ scale: 1.015 }} whileTap={{ scale: 0.985 }}>
                        {loading ? <Loader2 size={18} className="animate-spin" /> : "Reset Password"}
                      </motion.button>
                    </motion.form>
                  )}
                </AnimatePresence>

                <button type="button" className="btn-ghost-full" style={{ marginTop: 14 }}
                  onClick={() => { setView("login"); setStep(1); }}>
                  <ArrowLeft size={14} /> Back to Sign In
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </>
  );
}

export default Login;
