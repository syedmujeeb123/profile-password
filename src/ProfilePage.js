function ProfilePage({
  handleReset,
  resetKey,
  formData,
  handleChange,
  handleBlur,
  handleFocus,
  focusedInput,
  handleUpdate,
  errors,
}) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="flex w-3/4 gap-12 items-center" key={resetKey}>
        {/* Left Side */}
        <div className="w-1/2 p-12 rounded-lg flex flex-col space-y-6 bg-white shadow-md">
          <div className="flex items-center justify-center">
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center gap-4 hover:border-blue-500 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 transition-all duration-300 ease-in-out p-8"
            >
              <span className="w-10 h-10 text-gray-500 dark:text-gray-400 text-4xl font-bold flex items-center justify-center">
                +
              </span>
              <span className="text-2xl font-semibold text-gray-500 dark:text-gray-400">
                Upload
              </span>
              <input id="dropzone-file" type="file" className="hidden" />
            </label>
          </div>

          <div className="space-y-4">
            <h2 className="font-bold text-2xl">Roles [Admin]</h2>
            <h3 className="font-medium text-lg">
              Company: Syed Mujeeb Ur Rahman
            </h3>
            <h3 className="font-medium text-lg">Branch: TELANGANA</h3>
          </div>
        </div>

        {/* Right Side */}
        <form className="w-1/2 p-12 space-y-8 rounded-lg bg-white shadow-md">
          {["firstName", "lastName", "email", "mobileNumber"].map((field) => (
            <div className="flex flex-col items-start" key={field}>
              <label
                htmlFor={field}
                className="font-bold text-lg mb-3 capitalize"
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
                className={`w-full p-4 text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  focusedInput === field ? "bg-gray-200" : ""
                }`}
              />
              {/* Display error message if field is empty */}
              {errors[field] && (
                <span className="text-red-500 text-sm mt-2">
                  {errors[field]}
                </span>
              )}
            </div>
          ))}

          <div className="flex space-x-6 mt-8">
            <button
              type="button"
              onClick={handleUpdate}
              className="bg-blue-500 text-white py-3 px-6 text-lg rounded-lg hover:bg-blue-600 transition-all duration-200"
            >
              Update
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="text-gray-600 py-3 px-6 text-lg border bg-gray-100 border-gray-400 rounded-lg hover:text-gray-800 hover:border-gray-600 transition-all duration-200"
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProfilePage;
