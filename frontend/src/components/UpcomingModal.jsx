import React from "react";

const UpcomingModal = () => {
  return (
    <dialog id="future_features" className="modal">
      <div className="modal-box p-0 overflow-hidden relative max-w-md rounded-none border border-neutral-600 max-h-[80vh]">
        <div className="flex flex-col max-h-[80vh]">
          {/* Header */}
          <div className="border-b border-neutral-500 p-4 bg-base-100">
            <h3 className="text-sm font-semibold uppercase tracking-wide">
              Upcoming Features
            </h3>
          </div>

          {/* Content */}
          <div className="p-6 space-y-3 overflow-y-auto flex-1">
            <ul className="space-y-2 text-sm text-base-content/80">
              <li>• Import watchlist from Letterboxd</li>
              <li>• Fetch watchlist using Letterboxd username</li>
              <li>• Pick a random movie from your watchlist</li>
            </ul>
          </div>

          {/* Sticky close */}
          <div className="sticky bottom-0 bg-base-100 border-t border-neutral-500 p-4">
            <form method="dialog" className="flex justify-end">
              <button className="px-4 py-2 text-sm border border-neutral-500 hover:bg-base-200 transition">
                Close
              </button>
            </form>
          </div>
        </div>
      </div>
    </dialog>
  );
};

export default UpcomingModal;
