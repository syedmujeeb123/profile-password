import React, { useState, useEffect } from "react";
import { Dropdown, Menu, Avatar, notification } from "antd";
import { UserOutlined, DownOutlined } from "@ant-design/icons";
import axios from "axios";
import ChangePassword from "./ChangePassword";
import Dashboard from "./Dashboard";
import LoginFormDisplay from "./LoginFormDisplay";
import ProfilePage from "./ProfilePage";
import Login from "./Login";

const MainContent = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobileNumber: "",
  });
  const [userData, setUserData] = useState(false);
  const [resetKey, setResetKey] = useState(0);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [currentView, setCurrentView] = useState("Login");
  const [openProfile, setOpenProfile] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      mobileNumber: "",
    });

    axios
      .get("https://calibrecue.com/api/User/6")
      .then((response) => setUserData(response.data))
      .catch((error) => console.error("Error fetching data", error));

    return () => {
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        mobileNumber: "",
      });
    };
  }, []);

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

  const handleUpdate = () => {
    const newErrors = {};
    Object.keys(formData).forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = `${field.replace(/([A-Z])/g, " $1")} is required`;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setUserData(formData);
      notification.success({ message: "Profile updated successfully!" });
      setCurrentView("loginFormDisplay");
      setOpenProfile(false);
    }
  };

  const handleOpenProfile = () => {
    setOpenProfile(true);
    setCurrentView("Profile");
    setShowChangePassword(false);
  };

  const handleChangePasswordClick = () => {
    setShowChangePassword(true);
    setOpenProfile(false);
    setCurrentView(null);
  };

  const handleLogout = () => {
    window.location.reload();
  };

  const menu = (
    <Menu>
      <Menu.Item onClick={handleOpenProfile}>Profile</Menu.Item>
      <Menu.Item>Company Configuration</Menu.Item>
      <Menu.Item onClick={handleChangePasswordClick}>Change Password</Menu.Item>
      <Menu.Item onClick={handleLogout}>Logout</Menu.Item>
    </Menu>
  );

  return (
    <div className="flex flex-col w-full h-screen relative">
      {currentView !== "Login" && (
        <div className="flex justify-end p-4">
          <Dropdown overlay={menu} trigger={["hover"]}>
            <div className="flex items-center space-x-2 cursor-pointer">
              <Avatar size="large" icon={<UserOutlined />} />
              <span>
                {formData.firstName
                  ? `${formData.firstName} ${formData.lastName}`
                  : "User"}
              </span>
              <DownOutlined />
            </div>
          </Dropdown>
        </div>
      )}
      <div>
        {currentView === "Login" && <Login setCurrentView={setCurrentView} />}
        {currentView === "dashboard" && <Dashboard />}
        {openProfile && (
          <ProfilePage
            handleReset={handleReset}
            resetKey={resetKey}
            formData={formData}
            handleChange={handleChange}
            handleUpdate={handleUpdate}
            errors={errors}
            setOpenProfile={setOpenProfile}
          />
        )}
        {currentView === "loginFormDisplay" && (
          <LoginFormDisplay
            userData={userData}
            setCurrentView={setCurrentView}
            setOpenProfile={setOpenProfile}
          />
        )}
        {showChangePassword && (
          <ChangePassword
            setCurrentView={setCurrentView}
            setShowChangePassword={setShowChangePassword}
          />
        )}
      </div>
    </div>
  );
};

export default MainContent;
