import { Routes, Route, Navigate } from "react-router-dom";

// ---------- AUTH ----------
import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";
import AuthCallback from "../pages/auth/AuthCallback";


// ---------- DASHBOARDS ----------
import UserDashboard from "../pages/dashboard/UserDashboard";
import ValetDashboard from "../pages/dashboard/ValetDashboard";
import AdminDashboard from "../pages/dashboard/AdminDashboard";

// ---------- PARKING ----------
import ParkingLotBooking from "../pages/parking/ParkingLotBooking";
import LotBooking from "../pages/parking/LotBooking";
import SelfParking from "../pages/parking/SelfParking";
import ValetParking from "../pages/parking/ValetParking";
import AddParkingLot from "../pages/parking/AddParkingLot";
import BookingPage from "../pages/parking/BookingPage";
import EditParkingLot from "../pages/parking/EditParkingLot";

// ---------- LANDING PAGE ----------
import LandingPage from "../pages/LandingPage";

// ---------- COMMON ----------
import MyBookings from "../pages/MyBookings";
import ProtectedRoute from "../components/common/ProtectedRoute";

function AppRoutes() {
  return (
    <Routes>
      {/* ================= LANDING PAGE (Root) ================= */}
      <Route path="/" element={<LandingPage />} />

      {/* ================= AUTH ================= */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/auth/callback" element={<AuthCallback />} />
      

      {/* ================= USER ================= */}
      <Route
        path="/user-dashboard"
        element={
          <ProtectedRoute role="DRIVER">
            <UserDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/my-bookings"
        element={
          <ProtectedRoute role="DRIVER">
            <MyBookings />
          </ProtectedRoute>
        }
      />

      {/* ================= VALET ================= */}
      <Route
        path="/valet-dashboard"
        element={
          <ProtectedRoute role="VALET">
            <ValetDashboard />
          </ProtectedRoute>
        }
      />

      {/* ================= ADMIN ================= */}
      <Route
        path="/admin-dashboard"
        element={
          <ProtectedRoute role="OWNER">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/edit-parking-lot/:lotId"
        element={
          <ProtectedRoute role="OWNER">
            <EditParkingLot />
          </ProtectedRoute>
        }
      />

      <Route
        path="/add-parking-lot"
        element={
          <ProtectedRoute role="OWNER">
            <AddParkingLot />

          </ProtectedRoute>
        }
      />

      {/* ================= PARKING FLOWS ================= */}
      
      <Route
        path="/lot-booking/:lotId"
        element={
          <ProtectedRoute role="DRIVER">
            <LotBooking />
          </ProtectedRoute>
        }
      />

      <Route
        path="/self-parking/:lotId"
        element={
          <ProtectedRoute role="DRIVER">
            <SelfParking />
          </ProtectedRoute>
        }
      />

      <Route
        path="/valet-parking"
        element={
          <ProtectedRoute role="DRIVER">
            <ValetParking />
          </ProtectedRoute>
        }
      />

      <Route
        path="/booking/:lotId"
        element={
          <ProtectedRoute role="DRIVER">
            <BookingPage />
          </ProtectedRoute>
        }
      />

      {/* ================= FALLBACK ================= */}
      {/* If a user goes to a random URL, redirect them to the landing page or login */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default AppRoutes;