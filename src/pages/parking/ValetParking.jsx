import { useEffect, useState } from "react";
import axios from "axios";

function ValetDashboard() {
  const [queue, setQueue] = useState([]);
  const [myJob, setMyJob] = useState(null);

  useEffect(() => {
    fetchQueue();
    const interval = setInterval(fetchQueue, 5000); // Auto-refresh every 5s
    return () => clearInterval(interval);
  }, []);

  const fetchQueue = () => {
    axios.get("http://localhost:8080/api/bookings/valet/queue")
      .then(res => setQueue(res.data))
      .catch(err => console.error(err));
  };

  const handleAccept = (bookingId) => {
    axios.post(`http://localhost:8080/api/bookings/${bookingId}/pickup`)
      .then(res => {
        setMyJob(res.data);
        fetchQueue();
      });
  };
  const handleReaject = (bookingId) => {
    axios.post(`http://localhost:8080/api/bookings/${bookingId}/pickup`)
      .then(res => {
        setMyJob(res.data);
        fetchQueue();
      });
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6 font-sans">
      <h1 className="text-2xl font-black mb-6 uppercase tracking-widest text-indigo-400">
        Valet Control Center
      </h1>

      {myJob ? (
        /* --- ACTIVE JOB VIEW --- */
        <div className="bg-indigo-600 p-8 rounded-[2rem] shadow-2xl animate-pulse">
          <h2 className="text-sm font-bold uppercase mb-2">Active Task</h2>
          <p className="text-3xl font-black mb-4 uppercase">Pick up {myJob.user.name}'s Car</p>
          <div className="bg-white/10 p-4 rounded-xl mb-6">
            <p className="text-xs uppercase opacity-70">User Location</p>
            <p className="font-mono text-lg">{myJob.pickupLat}, {myJob.pickupLng}</p>
          </div>
          <button className="w-full bg-white text-indigo-600 py-4 rounded-2xl font-black uppercase tracking-widest">
            I have the keys
          </button>
        </div>
      ) : (
        /* --- QUEUE VIEW --- */
        <div className="space-y-4">
          <h3 className="text-gray-500 font-bold uppercase text-xs">Incoming Requests ({queue.length})</h3>
          {queue.map(request => (
            <div key={request.id} className="bg-slate-800 p-6 rounded-3xl border border-slate-700 flex justify-between items-center">
              <div>
                <p className="font-bold text-lg">{request.user.name}</p>
                <p className="text-xs text-gray-400">ID: #{request.id} • Waiting for Pickup</p>
              </div>
              <button 
                onClick={() => handleAccept(request.id)}
                className="bg-indigo-500 hover:bg-indigo-400 px-6 py-3 rounded-2xl font-bold transition-all"
              >
                Accept
              </button>
              <button 
                onClick={() => handleReaject(request.id)}
                className="bg-indigo-500 hover:bg-indigo-400 px-6 py-3 rounded-2xl font-bold transition-all"
              >
                reject
              </button>
            </div>
          ))}
          {queue.length === 0 && <p className="text-slate-600 italic">No pending requests...</p>}
        </div>
      )}
    </div>
  );
}

export default ValetDashboard;


