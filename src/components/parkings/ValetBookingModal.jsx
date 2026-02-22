import axios from "axios";

function ValetBookingModal({ user, currentPosition, onClose }) {

  const handleSubmit = async () => {
    await axios.post("https://smartparking-backend-1.onrender.com/api/bookings", {
      user: { id: user.id },
      serviceType: "VALET",
      status: "VALET_REQUESTED",
      pickupLat: currentPosition[0],
      pickupLng: currentPosition[1]
    });

    alert("Valet requested");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-6 rounded">
        <h3 className="font-bold mb-4">Confirm Valet</h3>
        <button
          onClick={handleSubmit}
          className="bg-purple-600 text-white px-6 py-2 rounded"
        >
          Request Valet
        </button>
      </div>
    </div>
  );
}

export default ValetBookingModal;
