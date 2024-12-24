import React, { useState, useEffect } from "react";
import { Form, Input, Button, Alert, Spin } from "antd";

const ChangePassword = ({ setCurrentView, setShowChangePassword }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch the current password from the API when the component mounts
    const fetchCurrentPassword = async () => {
      try {
        setLoading(true);
        const response = await fetch("https://example.com/api/Accounts", {
          method: "POST", // Use POST if needed by the API
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: "user@example.com", // Username for the account
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
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentPassword();
  }, []);

  const handleSubmit = (values) => {
    const { currentPassword, newPassword, confirmNewPassword } = values;

    // Validate the form
    if (!currentPassword || !newPassword || !confirmNewPassword) {
      setError("All fields are required");
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setError("New passwords do not match");
      return;
    }

    // Check if the current password matches the new one or confirm password
    if (
      currentPassword === newPassword ||
      currentPassword === confirmNewPassword
    ) {
      setError("New password cannot be the same as the current password");
      return;
    }

    // Simulate a password change (would be replaced with an actual API call)
    setSuccess("Password changed successfully!");
    setError("");
    setCurrentPassword(""); // Clear the fields after successful change
    setNewPassword("");
    setConfirmNewPassword("");
    setCurrentView("dashboard");
    setShowChangePassword(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-lg p-10 space-y-6 rounded-lg bg-white shadow-xl">
        <h2 className="font-semibold text-2xl text-left mb-6">
          Change Password
        </h2>

        {error && <Alert message={error} type="error" showIcon closable />}
        {success && (
          <Alert message={success} type="success" showIcon closable />
        )}

        {loading ? (
          <div className="flex justify-center items-center">
            <Spin size="large" />
          </div>
        ) : (
          <Form
            onFinish={handleSubmit}
            layout="vertical"
            initialValues={{ currentPassword, newPassword, confirmNewPassword }}
          >
            <Form.Item
              label="Current Password"
              name="currentPassword"
              rules={[
                {
                  required: true,
                  message: "Please enter your current password",
                },
              ]}
            >
              <Input.Password
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Current Password"
                className="w-full p-3 border border-gray-300 rounded-lg text-lg"
              />
            </Form.Item>

            <Form.Item
              label="New Password"
              name="newPassword"
              rules={[
                { required: true, message: "Please enter a new password" },
              ]}
            >
              <Input.Password
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="New Password"
                className="w-full p-3 border border-gray-300 rounded-lg text-lg"
              />
            </Form.Item>

            <Form.Item
              label="Confirm New Password"
              name="confirmNewPassword"
              rules={[
                { required: true, message: "Please confirm your new password" },
              ]}
            >
              <Input.Password
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                placeholder="Confirm New Password"
                className="w-full p-3 border border-gray-300 rounded-lg text-lg"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full pt-2 rounded-lg text-lg flex items-center justify-center"
                style={{
                  lineHeight: "normal", // Ensures consistent vertical alignment
                  height: "50px", // Specify a consistent height for the button
                  display: "flex", // Flexbox for centering content
                  alignItems: "center", // Vertically centers text
                  justifyContent: "center", // Horizontally centers text
                }}
              >
                Change Password
              </Button>
            </Form.Item>
          </Form>
        )}
      </div>
    </div>
  );
};

export default ChangePassword;
