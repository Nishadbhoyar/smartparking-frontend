import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../../components/navbar/AdminNavbar";
import {
  BarChart3,
  Building2,
  Calendar,
  Car, 
  DollarSign,
  Download,
  Filter,
  MoreVertical,
  RefreshCw,
  TrendingUp,
  Users,
  X
} from "lucide-react";

function AdminDashboard() {
  const [allBookings, setAllBookings] = useState([]);
  const [lots, setLots] = useState([]);
  const [view, setView] = useState("active");
  const [adminName, setAdminName] = useState("Admin");
  const [totalRevenue, setTotalRevenue] = useState(0.0);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState("week");
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [stats, setStats] = useState({
    occupancy: 0,
    growth: 0,
    avgTime: "0h"
  });
  const navigate = useNavigate();

  // Calculate derived statistics
  const calculateStats = useCallback(() => {
    const totalSlots = lots.reduce((sum, lot) => sum + (lot.totalSlots || 0), 0);
    const occupiedSlots = activeData.length;
    const occupancyRate = totalSlots > 0 ? (occupiedSlots / totalSlots) * 100 : 0;
    
    // Calculate growth (placeholder logic)
    const growth = 12.5; // This would come from API in real app
    
    // Calculate average parking time (placeholder)
    const avgTime = "2.5h";
    
    setStats({
      occupancy: Math.round(occupancyRate),
      growth,
      avgTime
    });
  }, [lots, allBookings]);

  // Handle logout
  // const handleLogout = async () => {
  //   try {
  //     await axios.post("http://localhost:https://smartparking-backend-1.onrender.com/logout", {}, { withCredentials: true });
  //   } catch (error) {
  //     console.error("Logout failed", error);
  //   } finally {
  //     localStorage.clear();
  //     navigate("/");
  //   }
  // };

  const handleLogout = () => {
    // Clear the saved user session from the browser
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("userId");
    localStorage.removeItem("role");
    
    // Send the user back to the login page
    navigate("/login");
  };

  const handleToggleStatus = async (lotId, currentStatus) => {
    const statusToCheck = currentStatus || "ACTIVE";
    const newStatus = statusToCheck === "PAUSED" ? "ACTIVE" : "PAUSED";
    
    try {
      setLots((prev) => 
        prev.map((lot) => lot.id === lotId ? { ...lot, status: newStatus } : lot)
      );
      
      const token = localStorage.getItem("token"); // 🔑 Get Token
      
      await axios.patch(`https://smartparking-backend-1.onrender.com/api/parking-lots/${lotId}/status`, 
        { status: newStatus }, 
        { 
          headers: { Authorization: `Bearer ${token}` }, // 🔑 Attach Token
          withCredentials: true 
        }
      );
    } catch (err) {
      alert("Failed to update status. Reverting change.");
      setLots((prev) => 
        prev.map((lot) => lot.id === lotId ? { ...lot, status: currentStatus } : lot)
      );
    }
  };

const fetchData = async () => {
    try {
      setLoading(true);
      const userStr = localStorage.getItem("user");
      // ✅ 1. Get the JWT token from storage
      const token = localStorage.getItem("token"); 
      
      let adminId = null;
      if (userStr) {
        const user = JSON.parse(userStr);
        adminId = user.id;
      }

      if (!adminId || !token) {
        console.warn("Missing credentials, redirecting...");
        navigate("/login");
        return;
      }
      
      // ✅ 2. Create the Auth configuration
      const config = {
        params: { adminId }, // Keep existing params
        headers: {
          Authorization: `Bearer ${token}` // Add the JWT
        },
        withCredentials: true
      };

      // ✅ 3. Apply the config to all requests in Promise.all
      const [bookingsRes, lotsRes, earningsRes] = await Promise.all([
        axios.get(`https://smartparking-backend-1.onrender.com/api/bookings/admin`, config),
        axios.get(`https://smartparking-backend-1.onrender.com/api/parking-lots`, { 
          params: { ownerId: adminId }, 
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true 
        }),
        axios.get(`https://smartparking-backend-1.onrender.com/api/bookings/earnings`, config)
      ]);

      setAllBookings(bookingsRes.data);
      setLots(lotsRes.data);
      setTotalRevenue(earningsRes.data);
      calculateStats();
    } catch (err) {
      console.error("Error fetching data:", err);
      if (err.response?.status === 401) {
        // ✅ 4. Clean up storage if token is invalid/expired
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "OWNER" && role !== "ADMIN") {
      navigate("/login");
      return;
    }

    const userStr = localStorage.getItem("user");
    if (userStr) {
      const user = JSON.parse(userStr);
      if (user.name) {
        setAdminName(user.name.charAt(0).toUpperCase() + user.name.slice(1));
      }
    }

    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, [navigate]);

  // 2. FIX: Release Vehicle Logic (This caused the error in your screenshot)
  const handleRelease = async (id) => {
    if (window.confirm("Mark this vehicle as 'Left Parking'?")) {
      try {
        const token = localStorage.getItem("token"); // 🔑 Get Token

        await axios.post(`https://smartparking-backend-1.onrender.com/api/bookings/${id}/release`, 
          {}, 
          { 
            headers: { Authorization: `Bearer ${token}` }, // 🔑 Attach Token
            withCredentials: true 
          }
        );
        
        setAllBookings((prev) =>
          prev.map((b) => (b.id === id ? { ...b, status: "LEFT_PARKING" } : b))
        );
        alert("Car status updated!");
      } catch (err) {
        console.error(err);
        alert("Failed to update status.");
      }
    }
  };

  const handleDeleteLot = async (lotId) => {
    if (window.confirm("Are you sure you want to delete this parking lot?")) {
      try {
        // 1. Get the token
        const token = localStorage.getItem("token");

        // 2. Send request WITH the token in headers
        await axios.delete(`https://smartparking-backend-1.onrender.com/api/parking-lots/${lotId}`, { 
          headers: { Authorization: `Bearer ${token}` }, // 👈 This was missing
          withCredentials: true 
        });
        
        setLots((prev) => prev.filter((lot) => lot.id !== lotId));
        alert("Parking lot deleted successfully!");
      } catch (err) {
        console.error("Delete failed:", err);
        alert("Failed to delete parking lot.");
      }
    }
  };

  const handleExportData = () => {
    // In a real app, this would generate and download a CSV/Excel file
    alert("Export functionality would download data in this implementation");
  };

  const activeData = allBookings.filter(b => ["PARKED", "CONFIRMED", "VALET_PICKED_UP", "VALET_REQUESTED"].includes(b.status));
  const historyData = allBookings.filter(b => ["LEFT_PARKING", "RETURNED", "COMPLETED", "RELEASED_BY_ADMIN"].includes(b.status));
  const displayedBookings = view === "active" ? activeData : historyData;

  const timeRanges = [
    { id: "day", label: "Today" },
    { id: "week", label: "This Week" },
    { id: "month", label: "This Month" },
    { id: "year", label: "This Year" }
  ];

  return (
    <>
      <AdminNavbar />
      
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/10 to-slate-50">
        <div className="p-6 md:p-8 lg:p-10">
          {/* HEADER */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg">
                    <Building2 className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-sm font-semibold text-blue-600 uppercase tracking-wider">ADMIN CONSOLE</span>
                </div>
                <div className="flex items-center gap-4">
                  <h1 className="text-3xl md:text-4xl font-bold text-slate-800">
                    Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">{adminName}</span>
                  </h1>
                  {loading && (
                    <RefreshCw className="w-5 h-5 text-slate-400 animate-spin" />
                  )}
                </div>
                <p className="text-slate-500 mt-2">Manage your parking facilities and monitor operations</p>
              </div>
              
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => navigate("/add-parking-lot")}
                  className="inline-flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/30 transition-all hover:-translate-y-0.5"
                >
                  <span className="text-lg">+</span> Add Location
                </button>
                <button
                  onClick={handleExportData}
                  className="inline-flex items-center gap-2 px-4 py-3 bg-white border border-slate-200 text-slate-700 rounded-xl font-semibold hover:border-slate-300 hover:shadow-md transition-all"
                >
                  <Download className="w-4 h-4" />
                  Export
                </button>
              </div>
            </div>
          </div>

          {/* TIME RANGE FILTER */}
          <div className="mb-8">
            <div className="inline-flex items-center bg-white rounded-xl border border-slate-200 p-1">
              {timeRanges.map((range) => (
                <button
                  key={range.id}
                  onClick={() => setTimeRange(range.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    timeRange === range.id
                      ? "bg-blue-50 text-blue-600 border border-blue-100"
                      : "text-slate-600 hover:text-slate-800"
                  }`}
                >
                  {range.label}
                </button>
              ))}
            </div>
          </div>

          {/* STATS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              title="Total Properties"
              value={lots.length}
              icon={<Building2 className="w-5 h-5" />}
              color="blue"
              trend={stats.growth}
            />
            <StatCard
              title="Active Sessions"
              value={activeData.length}
              icon={<Users className="w-5 h-5" />}
              color="emerald"
              subtitle={`${stats.occupancy}% occupancy`}
            />
            <StatCard
              title="Total Revenue"
              value={`₹${totalRevenue.toFixed(2)}`}
              icon={<DollarSign className="w-5 h-5" />}
              color="violet"
              trend={15.2}
            />
            <StatCard
              title="Avg. Parking Time"
              value={stats.avgTime}
              icon={<Calendar className="w-5 h-5" />}
              color="amber"
            />
          </div>

          {/* CHART & DATA SECTION */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* CHART SIDE */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl border border-slate-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-800">Revenue Overview</h3>
                    <p className="text-sm text-slate-500">Revenue trends over selected period</p>
                  </div>
                  <button className="p-2 hover:bg-slate-50 rounded-lg transition-colors">
                    <BarChart3 className="w-5 h-5 text-slate-500" />
                  </button>
                </div>
                
                {/* Chart placeholder */}
                <div className="h-64 flex items-center justify-center bg-gradient-to-br from-blue-50/50 to-indigo-50/50 rounded-xl border border-slate-100">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <BarChart3 className="w-8 h-8 text-blue-600" />
                    </div>
                    <p className="text-slate-600 font-medium">Revenue chart visualization</p>
                    <p className="text-sm text-slate-400 mt-1">Interactive chart would appear here</p>
                  </div>
                </div>
              </div>
            </div>

            {/* RECENT ACTIVITY */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-slate-800">Recent Activity</h3>
                  <p className="text-sm text-slate-500">Latest operations and updates</p>
                </div>
                <button className="text-sm text-blue-600 font-medium hover:text-blue-700">
                  View all
                </button>
              </div>
              
              <div className="space-y-4">
                {activeData.slice(0, 3).map((booking) => (
                  <div key={booking.id} className="flex items-center gap-3 p-3 hover:bg-slate-50 rounded-lg transition-colors">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg flex items-center justify-center">
                      <Car className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-slate-800">{booking.vehicleNumber}</p>
                      <p className="text-xs text-slate-500">{booking.driverName || "Guest"}</p>
                    </div>
                    <StatusBadge status={booking.status} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* MAIN CONTENT TABS */}
          <div className="mb-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex space-x-1 bg-white rounded-xl border border-slate-200 p-1">
                {["active", "history", "lots"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setView(tab)}
                    className={`px-6 py-3 rounded-lg text-sm font-medium transition-all ${
                      view === tab
                        ? "bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-600 border border-blue-100"
                        : "text-slate-600 hover:text-slate-800"
                    }`}
                  >
                    {tab === "active" && "Live Sessions"}
                    {tab === "history" && "History"}
                    {tab === "lots" && "My Locations"}
                  </button>
                ))}
              </div>
              
              <div className="flex items-center gap-3">
                <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-xl font-medium hover:border-slate-300 hover:shadow-sm transition-all">
                  <Filter className="w-4 h-4" />
                  Filter
                  {selectedFilters.length > 0 && (
                    <span className="bg-blue-100 text-blue-600 text-xs px-2 py-0.5 rounded-full">
                      {selectedFilters.length}
                    </span>
                  )}
                </button>
                <button
                  onClick={handleLogout}
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-rose-500 to-pink-600 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-rose-500/30 transition-all"
                >
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>

          {/* DATA TABLE */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
            {view === "lots" ? (
              <LotsTable 
                lots={lots} 
                handleToggleStatus={handleToggleStatus} 
                handleDeleteLot={handleDeleteLot} 
                navigate={navigate}
              />
            ) : (
              <BookingsTable 
                displayedBookings={displayedBookings} 
                view={view} 
                handleRelease={handleRelease}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

// Updated StatCard component
function StatCard({ title, value, icon, color, trend, subtitle }) {
  const colorClasses = {
    blue: "from-blue-500 to-indigo-500",
    emerald: "from-emerald-500 to-teal-500",
    violet: "from-violet-500 to-purple-500",
    amber: "from-amber-500 to-orange-500"
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-lg hover:border-slate-300 transition-all group">
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-xl bg-gradient-to-br ${colorClasses[color]} bg-opacity-10`}>
          <div className={`text-${color}-600`}>{icon}</div>
        </div>
        {trend && (
          <div className="flex items-center gap-1 text-sm font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">
            <TrendingUp className="w-4 h-4" />
            {trend}%
          </div>
        )}
      </div>
      
      <div>
        <p className="text-sm text-slate-500 font-medium mb-1">{title}</p>
        <p className="text-2xl font-bold text-slate-800 mb-1">{value}</p>
        {subtitle && (
          <p className="text-sm text-slate-400">{subtitle}</p>
        )}
      </div>
    </div>
  );
}

// Updated LotsTable component
function LotsTable({ lots, handleToggleStatus, handleDeleteLot, navigate }) {
  return (
    <div className="overflow-x-auto">
      <div className="min-w-full">
        <div className="border-b border-slate-200 bg-slate-50">
          <div className="grid grid-cols-6 gap-4 px-6 py-4">
            <div className="text-xs font-semibold text-slate-500 uppercase">Location</div>
            <div className="text-xs font-semibold text-slate-500 uppercase">Address</div>
            <div className="text-xs font-semibold text-slate-500 uppercase">Capacity</div>
            <div className="text-xs font-semibold text-slate-500 uppercase">Rate</div>
            <div className="text-xs font-semibold text-slate-500 uppercase">Status</div>
            <div className="text-xs font-semibold text-slate-500 uppercase">Actions</div>
          </div>
        </div>
        
        <div className="divide-y divide-slate-100">
          {lots.length === 0 ? (
            <EmptyState 
              icon="🏢"
              title="No Parking Lots"
              description="Add your first parking location to get started"
              action={() => navigate("/add-parking-lot")}
              actionText="Add Location"
            />
          ) : (
            lots.map((lot) => (
              <div key={lot.id} className="grid grid-cols-6 gap-4 px-6 py-4 hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-800">{lot.name}</p>
                    <p className="text-sm text-slate-500">ID: #{lot.id}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <p className="text-sm text-slate-600 line-clamp-2">{lot.address}</p>
                </div>
                
                <div>
                  <p className="font-medium text-slate-800">{lot.totalSlots || 0}</p>
                  <p className="text-sm text-slate-500">slots</p>
                </div>
                
                <div>
                  <p className="font-medium text-slate-800">₹50</p>
                  <p className="text-sm text-slate-500">per hour</p>
                </div>
                
                <div>
                  <button
                    onClick={() => handleToggleStatus(lot.id, lot.status)}
                    className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium ${
                      lot.status === "PAUSED"
                        ? "bg-amber-100 text-amber-700 hover:bg-amber-200"
                        : "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
                    }`}
                  >
                    <span className={`w-2 h-2 rounded-full ${
                      lot.status === "PAUSED" ? "bg-amber-500" : "bg-emerald-500"
                    }`}></span>
                    {lot.status === "PAUSED" ? "Paused" : "Active"}
                  </button>
                </div>
                
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => navigate(`/edit-parking-lot/${lot.id}`)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Edit"
                  >
                    <span className="sr-only">Edit</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleDeleteLot(lot.id)}
                    className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                    title="Delete"
                  >
                    <span className="sr-only">Delete</span>
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

// Updated BookingsTable component
function BookingsTable({ displayedBookings, view, handleRelease }) {
  return (
    <div className="overflow-x-auto">
      <div className="min-w-full">
        <div className="border-b border-slate-200 bg-slate-50">
          <div className="grid grid-cols-6 gap-4 px-6 py-4">
            <div className="text-xs font-semibold text-slate-500 uppercase">Driver</div>
            <div className="text-xs font-semibold text-slate-500 uppercase">Vehicle</div>
            <div className="text-xs font-semibold text-slate-500 uppercase">Location</div>
            <div className="text-xs font-semibold text-slate-500 uppercase">Duration</div>
            <div className="text-xs font-semibold text-slate-500 uppercase">Status</div>
            <div className="text-xs font-semibold text-slate-500 uppercase">Actions</div>
          </div>
        </div>
        
        <div className="divide-y divide-slate-100">
          {displayedBookings.length === 0 ? (
            <EmptyState 
              icon={view === "active" ? "🚗" : "📋"}
              title={view === "active" ? "No Active Sessions" : "No History"}
              description={view === "active" 
                ? "No vehicles are currently parked" 
                : "No historical bookings found"
              }
            />
          ) : (
            displayedBookings.map((booking) => (
              <div key={booking.id} className="grid grid-cols-6 gap-4 px-6 py-4 hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-slate-100 to-slate-200 rounded-lg flex items-center justify-center">
                    <Users className="w-5 h-5 text-slate-600" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-800">{booking.driverName || "Guest"}</p>
                    <p className="text-sm text-slate-500">{booking.contactNumber || "N/A"}</p>
                  </div>
                </div>
                
                <div>
                  <p className="font-medium text-slate-800">{booking.vehicleNumber}</p>
                  <p className="text-sm text-slate-500">{booking.vehicleModel || "N/A"}</p>
                </div>
                
                <div>
                  <p className="text-sm text-slate-600 line-clamp-2">
                    {booking.parkingLot?.name || "Unknown Location"}
                  </p>
                </div>
                
                <div>
                  <p className="font-medium text-slate-800">2.5 hours</p>
                  <p className="text-sm text-slate-500">approx</p>
                </div>
                
                <div>
                  <StatusBadge status={booking.status} />
                </div>
                
                <div>
                  {view === "active" && (
                    <button
                      onClick={() => handleRelease(booking.id)}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg text-sm font-medium hover:shadow-lg hover:shadow-blue-500/30 transition-all"
                    >
                      Release
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

// Updated StatusBadge component
function StatusBadge({ status }) {
  const statusConfig = {
    PARKED: { bg: "bg-gradient-to-r from-emerald-500 to-emerald-600", text: "text-white" },
    CONFIRMED: { bg: "bg-gradient-to-r from-blue-500 to-blue-600", text: "text-white" },
    VALET_PICKED_UP: { bg: "bg-gradient-to-r from-violet-500 to-violet-600", text: "text-white" },
    VALET_REQUESTED: { bg: "bg-gradient-to-r from-amber-500 to-amber-600", text: "text-white" },
    LEFT_PARKING: { bg: "bg-gradient-to-r from-slate-500 to-slate-600", text: "text-white" },
    COMPLETED: { bg: "bg-gradient-to-r from-emerald-500 to-emerald-600", text: "text-white" },
    RETURNED: { bg: "bg-gradient-to-r from-indigo-500 to-indigo-600", text: "text-white" },
    RELEASED_BY_ADMIN: { bg: "bg-gradient-to-r from-rose-500 to-rose-600", text: "text-white" }
  };

  const config = statusConfig[status] || { bg: "bg-slate-100", text: "text-slate-700" };
  
  return (
    <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
      {status ? status.replace(/_/g, " ") : "Unknown"}
    </span>
  );
}

// Updated EmptyState component
function EmptyState({ icon, title, description, action, actionText }) {
  return (
    <div className="py-16 text-center">
      <div className="w-20 h-20 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
        <span className="text-3xl">{icon}</span>
      </div>
      <h3 className="text-lg font-semibold text-slate-800 mb-2">{title}</h3>
      <p className="text-slate-500 mb-6 max-w-sm mx-auto">{description}</p>
      {action && (
        <button
          onClick={action}
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-blue-500/30 transition-all"
        >
          {actionText}
        </button>
      )}
    </div>
  );
}

export default AdminDashboard;
