import { useState, useEffect } from "react";
import { Button, Card, Typography, Skeleton, Divider, Alert } from "antd";

const { Title, Text } = Typography;

const LoginFormDisplay = ({ userData, setOpenProfile, setCurrentView }) => {
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    if (userData) {
      setDataLoaded(true);
    }
  }, [userData]);

  if (!dataLoaded) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <Skeleton active />
      </div>
    );
  }

  const handleEditProfile = () => {
    setCurrentView("profilePage"); // Set the current view to ProfilePage
    setOpenProfile(true); // Optionally, open profile if necessary
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50">
      <Card
        className="w-11/12 max-w-xl"
        bordered
        hoverable
        style={{ borderRadius: "10px" }}
      >
        <Title
          level={3}
          className="text-center"
          style={{ marginBottom: "20px" }}
        >
          User Profile
        </Title>
        <Divider />
        <div style={{ marginBottom: "20px" }}>
          {Object.entries(userData).map(([key, value]) => (
            <Card
              key={key}
              style={{ marginBottom: "10px", borderRadius: "8px" }}
              size="small"
            >
              <Text
                type="secondary"
                style={{ textTransform: "uppercase", fontWeight: "bold" }}
              >
                {key.replace(/([A-Z])/g, " $1")}
              </Text>
              <div style={{ marginTop: "10px" }}>
                {typeof value === "object" && value !== null ? (
                  <Alert
                    message={<pre>{JSON.stringify(value, null, 2)}</pre>}
                    type="info"
                    showIcon
                  />
                ) : (
                  <Text style={{ fontSize: "16px", fontWeight: "bold" }}>
                    {value || "N/A"}
                  </Text>
                )}
              </div>
            </Card>
          ))}
        </div>
        <div className="flex justify-center">
          <Button
            type="primary"
            size="large"
            onClick={handleEditProfile}
            style={{ borderRadius: "8px" }}
          >
            Edit Profile
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default LoginFormDisplay;
