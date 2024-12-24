import React from "react";
import { Typography, Layout } from "antd";

const { Title, Text } = Typography;
const { Content } = Layout;

const Dashboard = () => {
  return (
    <Layout className="h-screen bg-white">
      <Content className="flex flex-col justify-center items-center h-full">
        <Title level={1} className="font-bold">
          Welcome to the Dashboard
        </Title>
        <Text className="text-lg text-gray-600 mt-4">
          This is the main dashboard where you can manage your tasks.
        </Text>
      </Content>
    </Layout>
  );
};

export default Dashboard;
