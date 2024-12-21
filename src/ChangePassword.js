import React, { useState, useEffect } from "react";

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    // Fetch the current password from the API when the component mounts
    const fetchCurrentPassword = async () => {
      try {
        const response = await fetch("https://calibrecue.com/api/Accounts", {
          method: "POST", // Use POST if needed by the API
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: "mujeebsyed275@gmail.com", // Username for the account
          }),
        });
        const data = await response.json();
        if (data && data.password) {
          setCurrentPassword(data.password); // Set the fetched password as current password
        } else {
          setError("Failed to fetch current password.");
        }
      } catch (error) {
        setError("An error occurred while fetching the password.");
      }
    };

    fetchCurrentPassword();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate the form
    if (!currentPassword || !newPassword || !confirmNewPassword) {
      setError("All fields are required");
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setError("New passwords do not match");
      return;
    }

    // Check if the current password matches the fetched password
    if (currentPassword !== "test11") {
      setError("Current password is incorrect");
      return;
    }

    // Simulate a password change (would be replaced with an actual API call)
    setSuccess("Password changed successfully!");
    setError("");
    setCurrentPassword(""); // Clear the fields after successful change
    setNewPassword("");
    setConfirmNewPassword("");
  };

  return (
    <div className="w-2/3 p-8 space-y-6 rounded-md bg-white shadow-lg">
      <h2 className="font-bold text-xl text-left">Change Password</h2>

      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}

      <form onSubmit={handleSubmit}>
        <div className="flex flex-col items-start">
          <label htmlFor="currentPassword" className="font-bold mb-2">
            Current Password <span className="text-red-500">*</span>
          </label>
          <input
            type="password"
            id="currentPassword"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            placeholder="Current Password"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="flex flex-col items-start">
          <label htmlFor="newPassword" className="font-bold mb-2">
            New Password <span className="text-red-500">*</span>
          </label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="New Password"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="flex flex-col items-start">
          <label htmlFor="confirmNewPassword" className="font-bold mb-2">
            Confirm New Password <span className="text-red-500">*</span>
          </label>
          <input
            type="password"
            id="confirmNewPassword"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            placeholder="Confirm New Password"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="flex space-x-4 mt-6">
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 px-4 rounded-md hover:bg-blue-600"
          >
            Change Password
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
