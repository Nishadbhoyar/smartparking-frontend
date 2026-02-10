export const ParkingCard = ({ title, subtitle, status, timeline, price, children, badge }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 max-w-sm w-full font-sans text-slate-900">
      {/* Header Section */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <p className="text-gray-400 text-xs uppercase tracking-widest mb-1">{subtitle}</p>
          <h2 className="text-3xl font-black tracking-tighter uppercase">{title}</h2>
        </div>
        {badge && (
          <div className="border-2 border-yellow-400 p-1 text-center min-w-[50px]">
            <p className="text-[10px] uppercase font-bold text-gray-500">Slot</p>
            <p className="text-xs font-black uppercase">{badge}</p>
          </div>
        )}
      </div>

      {/* Main Info Section (Price or Time) */}
      <div className="flex items-center gap-4 mb-6 py-4 border-y border-gray-100">
        <div className="flex-1">
          <p className="text-2xl font-bold">{price ? `₹${price}` : "00:00"}</p>
          <p className="text-[10px] text-gray-400 uppercase">Rate/Duration</p>
        </div>
        <div className="h-8 w-[1px] bg-gray-200"></div>
        <div className="flex-1 text-right">
          <p className="text-lg font-semibold text-blue-600">{status}</p>
          <p className="text-[10px] text-gray-400 uppercase">Current Status</p>
        </div>
      </div>

      {/* Timeline/Logs Section */}
      {timeline && (
        <div className="space-y-4 mb-6">
          {timeline.map((log, index) => (
            <div key={index} className="relative pl-4 border-l-2 border-blue-500">
              <p className="text-[11px] font-black uppercase text-slate-800">{log.label}</p>
              <p className="text-[10px] text-gray-400">{log.time}</p>
            </div>
          ))}
        </div>
      )}

      {/* Action Button Area */}
      <div className="mt-4 pt-4 border-t border-gray-100">
        {children}
      </div>
    </div>
  );
};