import { useState } from "react";
import { Input, Button, Checkbox, Form, Typography, Alert, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const Login = ({ setCurrentView }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [load, setLoad] = useState(false);

  const handleSubmit = async () => {
    // Validate inputs
    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }

    setLoad(true); // Show loader immediately before starting the fetch request

    try {
      // Make an API call to validate the login credentials using fetch
      const response = await fetch("https://calibrecue.com/api/Accounts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: email,
          password: password,
        }),
      });

      if (response.ok) {
        const data = await response.json(); // Parse the response body as JSON
        console.log(data);
        setCurrentView("dashboard"); // This triggers the change in the parent component
      } else {
        setError("Error logging in. Please try again.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoad(false); // Hide loader after the request finishes
    }
  };

  return (
    <>
      {load && (
        <div className="flex justify-center items-center fixed inset-0 bg-gray-500 bg-opacity-50 z-50">
          <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
        </div>
      )}

      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <div className="w-full max-w-lg p-10 space-y-6 rounded-lg bg-white shadow-xl">
          <Title level={3} className="mb-6">
            Sign In
          </Title>

          {error && (
            <Alert message={error} type="error" showIcon className="mb-4" />
          )}

          <Form layout="vertical" onFinish={handleSubmit}>
            <Form.Item
              label="Email Address"
              name="email"
              rules={[{ required: true, message: "Please enter your email" }]}
            >
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
              />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please enter your password" },
              ]}
            >
              <Input.Password
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
              />
            </Form.Item>

            <Form.Item className="text-left">
              <Checkbox
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              >
                Remember me
              </Checkbox>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full"
                loading={load}
              >
                Log In
              </Button>
            </Form.Item>
          </Form>

          <Text type="secondary" className="block text-center">
            We'll send you a link to reset your password!
          </Text>
        </div>
      </div>
    </>
  );
};

export default Login;
