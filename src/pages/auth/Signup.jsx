import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  User, Mail, Phone, Lock, Car, Building2, MapPin,
  ArrowRight, ArrowLeft, Loader2, Eye, EyeOff, CheckCircle,
} from "lucide-react";

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

  .signup-root {
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
    to   { transform: translate(18px, 28px) scale(1.06); }
  }

  .auth-card {
    width: 100%;
    max-width: 480px;
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
    margin-bottom: 13px;
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

  .password-toggle {
    position: absolute; right: 14px; top: 50%;
    transform: translateY(-50%);
    background: none; border: none; cursor: pointer;
    color: ${C.muted}; padding: 4px;
    transition: color 0.2s; z-index: 2;
  }
  .password-toggle:hover { color: ${C.text}; }

  .role-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    margin-bottom: 20px;
  }
  .role-card {
    position: relative;
    cursor: pointer;
  }
  .role-card input[type="radio"] { display: none; }
  .role-inner {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 7px;
    padding: 16px 8px;
    border-radius: 14px;
    border: 1px solid ${C.border};
    background: rgba(255,255,255,0.03);
    transition: all 0.25s;
    cursor: pointer;
  }
  .role-inner:hover { border-color: rgba(184,255,87,0.2); background: rgba(184,255,87,0.04); }
  .role-inner.selected {
    border-color: rgba(184,255,87,0.4);
    background: rgba(184,255,87,0.1);
    box-shadow: 0 0 20px rgba(184,255,87,0.08);
  }
  .role-label {
    font-size: 12px;
    font-weight: 700;
    font-family: 'Syne', sans-serif;
    letter-spacing: 0.01em;
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
  }
  .btn-primary:hover:not(:disabled) {
    background: #cbff6e;
    box-shadow: 0 0 32px rgba(184,255,87,0.4);
    transform: translateY(-1px);
  }
  .btn-primary:disabled { opacity: 0.55; cursor: not-allowed; }

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

  .section-label {
    font-size: 11px;
    font-weight: 700;
    font-family: 'Syne', sans-serif;
    color: ${C.muted};
    text-transform: uppercase;
    letter-spacing: 0.08em;
    margin-bottom: 12px;
  }

  .perks-strip {
    display: flex;
    align-items: center;
    gap: 18px;
    flex-wrap: wrap;
    margin-top: 24px;
    padding-top: 20px;
    border-top: 1px solid ${C.border};
  }
  .perk-item {
    display: flex; align-items: center; gap: 6px;
    font-size: 11.5px; color: ${C.muted};
  }

  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: ${C.bg}; }
  ::-webkit-scrollbar-thumb { background: rgba(184,255,87,0.12); border-radius: 2px; }
`;

/* ─── Animation Variants ─────────────────────────────────────────── */
const cardVariant = {
  hidden: { opacity: 0, scale: 0.96, y: 20 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

const itemVariant = (i = 0) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] } },
});

/* ─── Password Input ─────────────────────────────────────────────── */
function PasswordInput({ value, onChange }) {
  const [show, setShow] = useState(false);
  return (
    <div className="input-wrap">
      <Lock size={17} className="input-icon" />
      <input
        className="auth-input"
        type={show ? "text" : "password"}
        name="password"
        placeholder="Create a password"
        value={value}
        onChange={onChange}
        required
        style={{ paddingRight: 46 }}
      />
      <button type="button" className="password-toggle" onClick={() => setShow(p => !p)}>
        {show ? <EyeOff size={15} /> : <Eye size={15} />}
      </button>
    </div>
  );
}

/* ─── Role Card ──────────────────────────────────────────────────── */
function RoleCard({ value, label, icon: Icon, selected, onChange }) {
  return (
    <label className="role-card">
      <input type="radio" name="role" value={value} checked={selected} onChange={onChange} />
      <div className={`role-inner${selected ? " selected" : ""}`}>
        <Icon size={22} color={selected ? C.accent : C.muted} strokeWidth={selected ? 2 : 1.8} />
        <span className="role-label" style={{ color: selected ? C.accent : C.muted }}>{label}</span>
      </div>
    </label>
  );
}

/* ─── Main Signup Component ──────────────────────────────────────── */
function Signup() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "", email: "", phoneNumber: "", password: "", role: "DRIVER",
  });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  // 🇮🇳 Validation Helpers
  const validateEmail = (email) => {
    const lowerEmail = email.toLowerCase();
    if (lowerEmail.includes("@gamil.com") || lowerEmail.includes("@gmai.com")) {
      return "Did you mean @gmail.com?";
    }
    if (lowerEmail.includes("@yaho.com")) {
      return "Did you mean @yahoo.com?";
    }
    return null; // Valid
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(phone)) {
      return "Please enter a valid 10-digit Indian mobile number.";
    }
    return null; // Valid
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    
    // 1. Run Validations before touching the backend!
    const emailError = validateEmail(formData.email);
    if (emailError) return alert(`❌ Email Typo: ${emailError}`);
    
    const phoneError = validatePhone(formData.phoneNumber);
    if (phoneError) return alert(`❌ Invalid Phone: ${phoneError}`);

    setLoading(true);
    try {
      await axios.post("https://smartparking-backend-1.onrender.com/api/auth/signup", formData);
      alert("✅ Registration successful! Please login.");
      navigate("/login");
    } catch (error) {
      const msg = error.response?.data?.message || "Registration failed.";
      alert("❌ " + msg);
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    { name: "name",        type: "text",  placeholder: "Full name",       icon: User  },
    { name: "email",       type: "email", placeholder: "Email address",   icon: Mail  },
    { name: "phoneNumber", type: "tel",   placeholder: "Phone number",    icon: Phone },
  ];

  const roles = [
    { value: "DRIVER", label: "Driver", icon: Car },
    { value: "OWNER",  label: "Owner",  icon: Building2 },
    { value: "VALET",  label: "Valet",  icon: MapPin },
  ];

  const perks = ["Free 14-day trial", "No credit card needed", "Cancel anytime"];

  return (
    <>
      <style>{fontStyle}</style>
      <div className="signup-root">
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
          <motion.div {...itemVariant(0)} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 28 }}>
            <div style={{ width: 36, height: 36, borderRadius: 11, background: C.accent, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <Car size={18} color={C.bg} strokeWidth={2.5} />
            </div>
            <span className="display-font" style={{ fontWeight: 800, fontSize: 20, color: C.white, letterSpacing: "-0.02em" }}>ParkEase</span>
          </motion.div>

          {/* Headline */}
          <motion.div {...itemVariant(1)} style={{ marginBottom: 28 }}>
            <h1 className="display-font" style={{ fontSize: 28, fontWeight: 800, color: C.white, letterSpacing: "-0.04em", lineHeight: 1.1, marginBottom: 6 }}>
              Create your account
            </h1>
            <p style={{ fontSize: 14, color: C.muted }}>Park smarter in 40+ cities from day one</p>
          </motion.div>

          {/* Form */}
          <form onSubmit={handleSignup}>
            {/* Text fields */}
            {fields.map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div key={f.name} {...itemVariant(i + 2)}>
                  <div className="input-wrap">
                    <Icon size={17} className="input-icon" />
                    <input className="auth-input" type={f.type} name={f.name}
                      placeholder={f.placeholder} value={formData[f.name]}
                      onChange={handleChange} required />
                  </div>
                </motion.div>
              );
            })}

            {/* Password */}
            <motion.div {...itemVariant(5)}>
              <PasswordInput value={formData.password} onChange={handleChange} />
            </motion.div>

            {/* Role selector */}
            <motion.div {...itemVariant(6)} style={{ marginTop: 6, marginBottom: 6 }}>
              <p className="section-label">I am a</p>
              <div className="role-grid">
                {roles.map(r => (
                  <RoleCard key={r.value} value={r.value} label={r.label} icon={r.icon}
                    selected={formData.role === r.value} onChange={handleChange} />
                ))}
              </div>
            </motion.div>

            {/* Submit */}
            <motion.div {...itemVariant(7)}>
              <motion.button className="btn-primary" type="submit" disabled={loading}
                whileHover={{ scale: 1.015 }} whileTap={{ scale: 0.985 }}>
                {loading ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  <><span>Create Account</span><ArrowRight size={16} /></>
                )}
              </motion.button>
            </motion.div>
          </form>

          {/* Login link */}
          <motion.p {...itemVariant(8)}
            style={{ textAlign: "center", fontSize: 13, color: C.muted, marginTop: 20 }}>
            Already have an account?{" "}
            <span onClick={() => navigate("/login")}
              style={{ color: C.accent, fontWeight: 700, cursor: "pointer" }}>
              Sign in
            </span>
          </motion.p>

          {/* Perks strip */}
          <motion.div {...itemVariant(9)}>
            <div className="perks-strip">
              {perks.map(p => (
                <div key={p} className="perk-item">
                  <CheckCircle size={12} color={C.accent} />
                  <span>{p}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}

export default Signup;