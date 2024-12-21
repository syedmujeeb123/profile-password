import React, { useEffect, useState } from "react";

const DisplayPage = ({ userData }) => {
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    if (userData) {
      setDataLoaded(true);
    }
  }, [userData]);

  if (!dataLoaded) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <p className="text-gray-500 text-lg">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50">
      <div className="bg-white shadow-lg rounded-lg p-10 w-11/12 max-w-xl">
        <h2 className="text-3xl font-extrabold text-center mb-8 text-gray-800">
          User Profile
        </h2>
        <div className="space-y-6">
          {Object.entries(userData).map(([key, value]) => (
            <div
              key={key}
              className="flex flex-col bg-gray-100 p-4 rounded-md shadow-sm"
            >
              <label className="text-gray-600 text-sm uppercase tracking-wide font-bold mb-1">
                {key.replace(/([A-Z])/g, " $1")}
              </label>
              <p className="text-gray-800 text-lg font-semibold">
                {value || "N/A"}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-8 flex justify-center">
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-500 text-white py-3 px-8 rounded-lg font-medium shadow-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-400"
          >
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default DisplayPage;
