import React, { useState } from "react";
import { Download, User } from "lucide-react";

const LetterBoxd = () => {
  const [username, setUsername] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username.trim()) return;

    console.log(username);

    // Fetch watchlist here
  };

  return (
    <div className="min-h-screen bg-base-100 pt-24 px-4">
      <div className="mx-auto max-w-xl">
        <div className="card bg-base-200 border border-base-300 shadow-xl">
          <div className="card-body">
            <h1 className="card-title text-3xl justify-center">
              Import Letterboxd Watchlist
            </h1>

            <p className="text-base-content/70 text-center mb-6">
              Enter your Letterboxd username and we'll import your watchlist.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <label className="input input-bordered flex items-center gap-3 w-full">
                <User size={18} className="opacity-60" />
                <input
                  type="text"
                  placeholder="Letterboxd username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="grow"
                />
              </label>

              <button
                type="submit"
                className="btn btn-primary w-full gap-2"
              >
                <Download size={18} />
                Import Watchlist
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LetterBoxd;