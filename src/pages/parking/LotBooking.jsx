// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useParams, useNavigate } from "react-router-dom";

// function LotBookings() {
//   const { lotId } = useParams(); // Get the Lot ID from the URL
//   const [bookings, setBookings] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Fetch bookings for this specific lot
//     axios.get(`http://localhost:8080/api/bookings/lot/${lotId}`)
//       .then((response) => {
//         setBookings(response.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching lot bookings:", error);
//       });
//   }, [lotId]);

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-3xl font-bold text-gray-800">📋 Lot Manager (ID: {lotId})</h1>
//         <button 
//           onClick={() => navigate("/dashboard")}
//           className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
//         >
//           Back to Dashboard
//         </button>
//       </div>

//       <div className="bg-white shadow-md rounded-lg overflow-hidden">
//         <table className="min-w-full leading-normal">
//           <thead>
//             <tr>
//               <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                 Booking ID
//               </th>
//               <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                 User
//               </th>
//               <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                 Time
//               </th>
//               <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                 Amount
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {bookings.length > 0 ? (
//               bookings.map((booking) => (
//                 <tr key={booking.id}>
//                   <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
//                     #{booking.id}
//                   </td>
//                   <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
//                     <div className="flex items-center">
//                       <div className="ml-3">
//                         <p className="text-gray-900 whitespace-no-wrap">
//                           {booking.user ? booking.user.name : "Unknown User"}
//                         </p>
//                       </div>
//                     </div>
//                   </td>
//                   <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
//                     <p className="text-gray-900 whitespace-no-wrap">
//                       {new Date(booking.startTime).toLocaleTimeString()} ➔ {new Date(booking.endTime).toLocaleTimeString()}
//                     </p>
//                   </td>
//                   <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
//                     <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
//                       <span aria-hidden="true" className="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
//                       <span className="relative">₹{booking.totalAmount}</span>
//                     </span>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="4" className="px-5 py-5 text-center text-gray-500">
//                   No bookings found for this lot yet.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// export default LotBookings;


import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function LotBookings() {
  const { lotId } = useParams();
  const [bookings, setBookings] = useState([]);
  const [lot, setLot] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);

    // Fetch lot details
    axios.get(`http://localhost:8080/api/parking-lots/${lotId}`)
      .then((response) => {
        setLot(response.data);
      })
      .catch((error) => {
        console.error("Error fetching lot details:", error);
      });

    // Fetch bookings for this specific lot
    axios.get(`http://localhost:8080/api/bookings/lot/${lotId}`)
      .then((response) => {
        setBookings(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching lot bookings:", error);
        setLoading(false);
      });
  }, [lotId]);

  const formatDateTime = (dateTimeString) => {
    if (!dateTimeString) return "N/A";
    const date = new Date(dateTimeString);
    return date.toLocaleString();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "CONFIRMED":
      case "PARKED":
        return "bg-green-200 text-green-900";
      case "COMPLETED":
        return "bg-gray-200 text-gray-900";
      case "PENDING":
        return "bg-yellow-200 text-yellow-900";
      case "VALET_REQUESTED":
        return "bg-blue-200 text-blue-900";
      default:
        return "bg-gray-200 text-gray-900";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <div className="animate-spin w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">📋 Lot Manager</h1>
          {lot && (
            <div className="mt-2">
              <p className="text-lg font-semibold text-gray-700">{lot.name}</p>
              <p className="text-sm text-gray-500">{lot.address}</p>
            </div>
          )}
        </div>
        <button 
          onClick={() => navigate("/dashboard")}
          className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
        >
          Back to Dashboard
        </button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-sm text-gray-500">Total Bookings</p>
          <p className="text-2xl font-bold text-blue-600">{bookings.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-sm text-gray-500">Active</p>
          <p className="text-2xl font-bold text-green-600">
            {bookings.filter(b => b.status === "CONFIRMED" || b.status === "PARKED").length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-sm text-gray-500">Completed</p>
          <p className="text-2xl font-bold text-gray-600">
            {bookings.filter(b => b.status === "COMPLETED").length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-sm text-gray-500">Total Revenue</p>
          <p className="text-2xl font-bold text-purple-600">
            ₹{bookings.reduce((sum, b) => sum + (b.totalAmount || 0), 0).toFixed(2)}
          </p>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Booking ID
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                User
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Vehicle
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Time
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Status
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Amount
              </th>
            </tr>
          </thead>
          <tbody>
            {bookings.length > 0 ? (
              bookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-gray-50">
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <span className="font-mono font-bold text-blue-600">#{booking.id}</span>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <div>
                      <p className="text-gray-900 font-semibold whitespace-no-wrap">
                        {booking.user?.name || "Unknown User"}
                      </p>
                      <p className="text-gray-500 text-xs">
                        {booking.user?.email || ""}
                      </p>
                    </div>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <div>
                      <p className="text-gray-900 font-semibold">
                        {booking.vehicleType || "N/A"}
                      </p>
                      {booking.vehicleNumber && (
                        <p className="text-gray-500 text-xs">{booking.vehicleNumber}</p>
                      )}
                    </div>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <div className="text-xs">
                      <p className="text-gray-600">
                        <span className="font-semibold">Start:</span> {formatDateTime(booking.startTime)}
                      </p>
                      {booking.endTime && (
                        <p className="text-gray-600">
                          <span className="font-semibold">End:</span> {formatDateTime(booking.endTime)}
                        </p>
                      )}
                    </div>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(booking.status)}`}>
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <span className="font-bold text-green-700">
                      ₹{booking.totalAmount?.toFixed(2) || "0.00"}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="px-5 py-5 text-center text-gray-500">
                  <div className="flex flex-col items-center justify-center py-10">
                    <span className="text-4xl mb-2">📭</span>
                    <p>No bookings found for this lot yet.</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default LotBookings;