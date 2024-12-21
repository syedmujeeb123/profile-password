import React, { useState, useEffect } from "react";
import axios from "axios";
import DisplayPage from "./DisplayPage";
import ChangePassword from "./ChangePassword"; // Import the new component

const ProfilePage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobileNumber: "",
  });

  const [focusedInput, setFocusedInput] = useState(null);
  const [showForm, setShowForm] = useState(true);
  const [userData, setUserData] = useState(null);
  const [resetKey, setResetKey] = useState(0);
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false); // New state for change password view
  const [errors, setErrors] = useState({}); // To store error messages for fields

  useEffect(() => {
    // Reset form data when the component mounts or reloads
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      mobileNumber: "",
    });

    // Fetch user data from the API
    axios
      .get("https://calibrecue.com/api/User/6")
      .then((response) => {
        setUserData(response.data);
        // If you want to populate the form with fetched data, uncomment the following:
        // setFormData({
        //   firstName: response.data.firstName || "",
        //   lastName: response.data.lastName || "",
        //   email: response.data.email || "",
        //   mobileNumber: response.data.mobileNumber || "",
        // });
      })
      .catch((error) => {
        console.error("Error fetching data", error);
      });

    // Cleanup/reset form data when the component unmounts or reloads
    return () => {
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        mobileNumber: "",
      });
    };
  }, []); // Empty dependency array ensures this effect runs only once after the initial render

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleReset = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      mobileNumber: "",
    });
    setResetKey((prevKey) => prevKey + 1);
  };

  const handleFocus = (e) => setFocusedInput(e.target.name);
  const handleBlur = () => setFocusedInput(null);

  const handleUpdate = () => {
    // Validation logic
    const newErrors = {};
    Object.keys(formData).forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = `${field.replace(/([A-Z])/g, " $1")} is required`;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors); // Set error messages
    } else {
      setUserData(formData);
      alert("Form updated!");
      setShowForm(false);
    }
  };

  const handleChangePasswordClick = () => {
    setShowChangePassword(true); // Show the ChangePassword component
    setDropdownVisible(false); // Hide the dropdown
  };

  const handleCancelChangePassword = () => {
    setShowChangePassword(false); // Hide the ChangePassword component
  };

  return (
    <div className="flex flex-col w-full h-screen relative">
      {/* Top Navbar */}
      <div className="flex justify-end text-right items-center p-4 text-black relative">
        {/* Profile Section */}
        <div
          className="relative flex items-center space-x-2 cursor-pointer"
          onMouseEnter={() => setDropdownVisible(true)}
          onMouseLeave={() => setDropdownVisible(false)}
        >
          {/* Profile Icon */}
          <div className="w-10 h-10 rounded-full bg-gray-300 flex justify-center items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-8 h-8 text-gray-700"
            >
              <path
                fillRule="evenodd"
                d="M12 12c2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5 2.239 5 5 5zm0 1c-3.86 0-7 3.141-7 7v1h14v-1c0-3.859-3.141-7-7-7z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <span className="font-medium">
            {formData.firstName && formData.lastName
              ? `${formData.firstName} ${formData.lastName}`
              : "User"}
          </span>

          {/* Dropdown */}
          {isDropdownVisible && (
            <div className="absolute top-12 right-0 text-left bg-white shadow-lg rounded-md px-4 py-4 space-y-2 w-48">
              <button
                onClick={handleChangePasswordClick} // Open change password form
                className="text-left w-full text-blue-500 font-medium px-2 py-1 hover:text-gray-400 rounded-md"
              >
                Change Password
              </button>
              {["Profile", "Computer Configuration", "Logout"].map(
                (item, index) => (
                  <button
                    key={index}
                    className="text-left w-full text-blue-500 font-medium px-2 py-1 hover:text-gray-400 rounded-md"
                  >
                    {item}
                  </button>
                )
              )}
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex justify-center items-center flex-1">
        {showChangePassword ? (
          <ChangePassword onCancel={handleCancelChangePassword} />
        ) : showForm ? (
          <div className="flex w-2/3 gap-64 items-center" key={resetKey}>
            {/* Left Side */}
            <div className="w-2/3 p-8 rounded-md flex flex-col space-y-4">
              <div className="flex items-center justify-center">
                <label
                  htmlFor="dropzone-file"
                  className="flex items-center justify-center gap-2 hover:border-blue-500 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 transition-all duration-1000 ease-in-out p-5"
                >
                  <span className="w-8 h-8 text-gray-500 dark:text-gray-400 text-3xl font-semibold flex items-center justify-center">
                    +
                  </span>
                  <span className="text-xl font-bold text-gray-500 dark:text-gray-400">
                    Upload
                  </span>
                  <input id="dropzone-file" type="file" className="hidden" />
                </label>
              </div>

              <div className="p-8 space-y-4">
                <h2 className="font-bold text-xl">Roles [Admin]</h2>
                <h3 className="font-semibold">
                  Company: Syed Mujeeb Ur Rahman
                </h3>
                <h3 className="font-semibold">Branch: TELANGANA</h3>
              </div>
            </div>

            {/* Right Side */}
            <form className="w-2/3 p-8 space-y-6 rounded-md">
              {["firstName", "lastName", "email", "mobileNumber"].map(
                (field) => (
                  <div className="flex flex-col items-start" key={field}>
                    <label
                      htmlFor={field}
                      className="font-bold mb-2 capitalize"
                    >
                      {field.replace(/([A-Z])/g, " $1")}
                    </label>
                    <input
                      type={field === "email" ? "email" : "text"}
                      id={field}
                      name={field}
                      value={formData[field]}
                      onChange={handleChange}
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                      className={`w-full p-2 border border-gray-300 rounded-md ${
                        focusedInput === field ? "bg-gray-300" : ""
                      }`}
                    />
                    {/* Display error message if field is empty */}
                    {errors[field] && (
                      <span className="text-red-500 text-sm">
                        {errors[field]}
                      </span>
                    )}
                  </div>
                )
              )}

              <div className="flex space-x-4 mt-6">
                <button
                  type="button"
                  onClick={handleUpdate}
                  className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                >
                  Update
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="text-gray-500 py-2 px-4 border bg-gray-100 border-gray-400 rounded-md hover:text-gray-700"
                >
                  Reset
                </button>
              </div>
            </form>
          </div>
        ) : (
          userData && <DisplayPage userData={userData} />
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
