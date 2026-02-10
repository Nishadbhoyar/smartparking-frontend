import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, KeyRound, Loader2, Sparkles } from "lucide-react";
import { useSearchParams } from "react-router-dom";

function Login() {
   const [searchParams] = useSearchParams(); // ✅ 1. Initialize searchParams
  const [view, setView] = useState("login"); 4
  const oauthError = searchParams.get("error"); // ✅ 2. Define the missing variable
  const [loginMethod, setLoginMethod] = useState("password");
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // ✅ Updated Success Handler
  const handleLoginSuccess = (user) => {
      if (!user) {
          console.error("Login failed: Missing user data");
          return;
      }
      
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("userId", user.id);
      localStorage.setItem("role", user.role);

      const role = user.role ? user.role.toUpperCase() : "DRIVER";
      const target = role === "ADMIN" || role === "OWNER" ? "/admin-dashboard" : role === "VALET" ? "/valet-dashboard" : "/user-dashboard";
      navigate(target);
  };

  // --- API Handlers ---

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("http://localhost:8080/api/auth/send-otp", { email });
      setStep(2);
    } catch (err) { alert("Failed to send OTP."); } finally { setLoading(false); }
  };

  const handleOtpLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:8080/api/auth/verify-otp", { email, otp });
      if (res.data.token) localStorage.setItem("token", res.data.token);
      handleLoginSuccess(res.data.user); 
    } catch (err) { 
      console.error(err);
      alert("Invalid OTP!"); 
    } finally { setLoading(false); }
  };

  const handlePasswordLogin = async (e) => {
      e.preventDefault();
      setLoading(true);
      try {
          const res = await axios.post("http://localhost:8080/api/auth/login", { email, password });
          if (res.data.token) localStorage.setItem("token", res.data.token);
          handleLoginSuccess(res.data.user);
      } catch (err) { 
          console.error(err);
          alert("Invalid Credentials"); 
      } finally { setLoading(false); }
  };

  const handleSendMagicLink = async () => {
    if(!email) { alert("Please enter your email address first."); return; }
    setLoading(true);
    try {
        await axios.post("http://localhost:8080/api/auth/send-magic-link", { email });
        alert("✨ Magic Link Sent! Check your email to log in instantly.");
    } catch(err) {
        alert("Failed to send magic link. Please try again.");
    } finally {
        setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
      e.preventDefault();
      setLoading(true);
      try {
          await axios.post("http://localhost:8080/api/auth/reset-password", { email, otp, newPassword });
          alert("Success! Please Login.");
          setView("login");
          setLoginMethod("password");
          setStep(1);
      } catch (err) { alert("Failed to reset."); } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-slate-900 via-purple-900 to-slate-900 p-4 relative overflow-hidden">
      
      <motion.div animate={{ x: [0, 100, 0], y: [0, -50, 0] }} transition={{ duration: 20, repeat: Infinity }} className="absolute top-0 left-0 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30" />
      <motion.div animate={{ x: [0, -100, 0], y: [0, 50, 0] }} transition={{ duration: 15, repeat: Infinity }} className="absolute bottom-0 right-0 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-md bg-white/10 backdrop-blur-2xl p-8 rounded-3xl shadow-2xl border border-white/20 text-white"
      >
        <h2 className="text-3xl font-bold text-center mb-1 tracking-tight">Welcome Back</h2>
        <p className="text-center text-indigo-200 text-sm mb-6">
            {view === "login" ? "Enter your details to continue" : "Reset your password"}
        </p>

        <AnimatePresence mode="wait">
          {view === "login" ? (
            <motion.div key="login" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
                {/* ✅ Add this Alert Message above the Google Button */}
      {oauthError === "not_registered" && (
        <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-xl text-red-200 text-sm text-center">
          No account found for this Google email. Please <strong>Sign Up</strong> first!
        </div>
      )}

              
              {/* ✅ GOOGLE LOGIN BUTTON */}
              <div className="mb-6">
                <a 
                  href="http://localhost:8080/oauth2/authorization/google"
                  className="w-full flex items-center justify-center gap-3 bg-white text-slate-700 font-bold py-3.5 rounded-xl border border-slate-200 shadow-sm hover:bg-slate-50 hover:scale-[1.02] transition-all"
                >
                  <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="Google" />
                  Continue with Google
                </a>

                <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/20"></div></div>
                    <div className="relative flex justify-center text-xs uppercase"><span className="bg-slate-900/50 px-2 text-indigo-200">Or use email</span></div>
                </div>
              </div>
              
              {/* TABS */}
              <div className="flex bg-black/20 p-1 rounded-xl mb-6 relative">
                {["password", "otp"].map((method) => (
                    <button key={method} onClick={() => setLoginMethod(method)} className="relative flex-1 py-2 text-sm font-bold z-10 transition-colors capitalize">
                        {method === loginMethod && (
                            <motion.div layoutId="activeTab" className="absolute inset-0 bg-indigo-600 rounded-lg shadow-sm" transition={{ type: "spring", stiffness: 300, damping: 30 }} />
                        )}
                        <span className="relative z-20">{method === "otp" ? "✨ OTP Login" : "🔑 Password"}</span>
                    </button>
                ))}
              </div>

              {/* FORMS */}
              {loginMethod === "password" ? (
                  <form onSubmit={handlePasswordLogin} className="space-y-4">
                      <div className="relative"><Mail className="absolute left-4 top-3.5 text-indigo-200 w-5 h-5"/><input type="email" required placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/10 rounded-xl focus:ring-2 focus:ring-indigo-400 focus:bg-white/20 outline-none text-white placeholder-indigo-200/50" /></div>
                      <div className="relative"><Lock className="absolute left-4 top-3.5 text-indigo-200 w-5 h-5"/><input type="password" required placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/10 rounded-xl focus:ring-2 focus:ring-indigo-400 focus:bg-white/20 outline-none text-white placeholder-indigo-200/50" /></div>
                      
                      <div className="text-right">
                          <button type="button" onClick={() => { setView("reset"); setStep(1); }} className="text-xs text-indigo-300 font-bold hover:text-white hover:underline transition-all">Forgot Password?</button>
                      </div>
                      <button type="submit" disabled={loading} className="w-full bg-indigo-600 hover:bg-indigo-500 py-3 rounded-xl font-bold shadow-lg shadow-indigo-500/30 transition-all flex items-center justify-center gap-2">{loading ? <Loader2 className="animate-spin"/> : "Login"}</button>
                  </form>
              ) : (
                  step === 1 ? (
                      <form onSubmit={handleSendOtp} className="space-y-4">
                          <div className="relative"><Mail className="absolute left-4 top-3.5 text-indigo-200 w-5 h-5"/><input type="email" required placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/10 rounded-xl focus:ring-2 focus:ring-indigo-400 outline-none text-white" /></div>
                          <button type="submit" disabled={loading} className="w-full bg-pink-600 hover:bg-pink-500 py-3 rounded-xl font-bold shadow-lg shadow-pink-500/30 transition-all">{loading ? <Loader2 className="animate-spin inline"/> : "Send OTP Code"}</button>
                      </form>
                  ) : (
                      <form onSubmit={handleOtpLogin} className="space-y-4">
                          <div className="text-center text-sm text-green-300 bg-green-900/30 p-2 rounded-lg border border-green-500/30">OTP sent to {email}</div>
                          <input type="text" required placeholder="• • • • • •" value={otp} onChange={(e) => setOtp(e.target.value)} className="w-full text-center py-3 bg-white/10 border border-white/10 rounded-xl tracking-[1em] text-2xl font-bold focus:ring-2 focus:ring-green-400 outline-none text-white" />
                          <button type="submit" disabled={loading} className="w-full bg-green-600 hover:bg-green-500 py-3 rounded-xl font-bold shadow-lg shadow-green-500/30 transition-all">{loading ? "Verifying..." : "Verify & Login"}</button>
                          <button type="button" onClick={() => setStep(1)} className="w-full text-indigo-300 text-sm hover:text-white">Change Email</button>
                      </form>
                  )
              )}

              {/* MAGIC LINK BUTTON */}
              <div className="mt-6 pt-4 border-t border-white/10">
                <button 
                    type="button" 
                    onClick={handleSendMagicLink}
                    disabled={loading}
                    className="w-full group relative flex items-center justify-center gap-2 bg-gradient-to-r from-violet-600/20 to-indigo-600/20 hover:from-violet-600/40 hover:to-indigo-600/40 border border-white/10 hover:border-violet-400/50 rounded-xl py-3 transition-all"
                >
                    <Sparkles className="w-4 h-4 text-violet-300 group-hover:text-white transition-colors" />
                    <span className="text-sm font-bold text-violet-200 group-hover:text-white transition-colors">
                        {loading ? "Sending..." : "Email Me a Magic Login Link"}
                    </span>
                </button>
              </div>

            </motion.div>
          ) : (
            // RESET PASSWORD VIEW (Unchanged)
            <motion.div key="reset" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                {step === 1 ? (
                    <form onSubmit={handleSendOtp} className="space-y-4">
                        <div className="relative"><Mail className="absolute left-4 top-3.5 text-indigo-200 w-5 h-5"/><input type="email" required placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/10 rounded-xl outline-none text-white" /></div>
                        <button type="submit" disabled={loading} className="w-full bg-indigo-600 hover:bg-indigo-500 py-3 rounded-xl font-bold">{loading ? "Sending..." : "Send Reset Code"}</button>
                        <button type="button" onClick={() => setView("login")} className="w-full text-indigo-300 text-sm mt-2 hover:text-white">Back to Login</button>
                    </form>
                ) : (
                    <form onSubmit={handleResetPassword} className="space-y-4">
                        <div className="relative"><KeyRound className="absolute left-4 top-3.5 text-indigo-200 w-5 h-5"/><input type="text" required placeholder="OTP Code" value={otp} onChange={(e) => setOtp(e.target.value)} className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/10 rounded-xl outline-none text-white" /></div>
                        <div className="relative"><Lock className="absolute left-4 top-3.5 text-indigo-200 w-5 h-5"/><input type="password" required placeholder="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/10 rounded-xl outline-none text-white" /></div>
                        <button type="submit" disabled={loading} className="w-full bg-red-600 hover:bg-red-500 py-3 rounded-xl font-bold shadow-lg shadow-red-500/30">{loading ? "Updating..." : "Reset Password"}</button>
                    </form>
                )}
            </motion.div>
          )}
        </AnimatePresence>

        {view === "login" && (
            <div className="mt-6 text-center">
              <p className="text-sm text-indigo-200">Don't have an account? <span onClick={() => navigate('/signup')} className="text-white font-bold cursor-pointer hover:underline">Sign up here</span></p>
            </div>
        )}
      </motion.div>
    </div>
  );
}

export default Login;