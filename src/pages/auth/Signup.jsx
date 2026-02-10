import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; // Animation library
import { User, Mail, Phone, Lock, Car, Building2, MapPin, ArrowRight, Loader2 } from "lucide-react"; // Icons

function Signup() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
  name: "",
  email: "",
  phoneNumber: "", // ✅ Changed from 'phone'
  password: "",
  role: "DRIVER",
});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("http://localhost:8080/api/auth/signup", formData);
      alert("✅ Registration successful! Please login.");
      navigate("/login");
    } catch (error) {
      const msg = error.response?.data?.message || "Registration failed.";
      alert("❌ " + msg);
    } finally {
      setLoading(false);
    }
  };

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.1 } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[url('https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center relative">
      {/* Dark Overlay for contrast */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative w-full max-w-md bg-white/90 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-white/20"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-8">
          <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 tracking-tight">
            SmartPark
          </h1>
          <p className="text-slate-500 text-sm mt-2 font-medium">Create an account to get started</p>
        </motion.div>

        <form onSubmit={handleSignup} className="space-y-4">
          
          {/* Inputs with Icons */}
          {[
  { name: "name", type: "text", placeholder: "Full Name", icon: User },
  { name: "email", type: "email", placeholder: "Email Address", icon: Mail },
  { name: "phoneNumber", type: "tel", placeholder: "Phone Number", icon: Phone }, // ✅ Changed name here
  { name: "password", type: "password", placeholder: "Password", icon: Lock },
].map((field) => (
            <motion.div variants={itemVariants} key={field.name} className="relative group">
              <field.icon className="absolute left-4 top-3.5 text-slate-400 group-focus-within:text-indigo-600 transition-colors w-5 h-5" />
              <input 
                type={field.type} 
                name={field.name} 
                placeholder={field.placeholder} 
                value={formData[field.name]} 
                onChange={handleChange} 
                className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition-all" 
                required 
              />
            </motion.div>
          ))}

          {/* Role Selection */}
          <motion.div variants={itemVariants}>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-3 text-center">Select Role</label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { value: "DRIVER", label: "Driver", icon: Car },
                { value: "OWNER", label: "Owner", icon: Building2 },
                { value: "VALET", label: "Valet", icon: MapPin }
              ].map((r) => (
                <label key={r.value} className="relative cursor-pointer">
                  <input type="radio" name="role" value={r.value} checked={formData.role === r.value} onChange={handleChange} className="sr-only" />
                  <motion.div 
                    whileTap={{ scale: 0.95 }}
                    animate={{ 
                      backgroundColor: formData.role === r.value ? "#4f46e5" : "#ffffff",
                      color: formData.role === r.value ? "#ffffff" : "#475569",
                      borderColor: formData.role === r.value ? "#4f46e5" : "#e2e8f0"
                    }}
                    className="flex flex-col items-center justify-center py-3 rounded-xl border shadow-sm transition-all"
                  >
                    <r.icon className="w-6 h-6 mb-1" />
                    <span className="text-xs font-bold">{r.label}</span>
                  </motion.div>
                </label>
              ))}
            </div>
          </motion.div>

          {/* Submit Button */}
          <motion.button 
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit" 
            disabled={loading} 
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold py-3.5 rounded-xl shadow-lg hover:shadow-indigo-500/30 transition-all flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin"/> : <>Create Account <ArrowRight className="w-4 h-4"/></>}
          </motion.button>
        </form>

        <motion.div variants={itemVariants} className="mt-8 text-center">
          <p className="text-sm text-slate-600">
            Already have an account? 
            <span onClick={() => navigate("/login")} className="ml-1 text-indigo-600 font-bold cursor-pointer hover:underline">Sign in</span>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default Signup;