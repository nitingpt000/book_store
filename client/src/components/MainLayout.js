import { Layout } from "antd";
import React from "react";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <Layout>
      <Layout.Header className="bg-blue-800 text-white">
        Book Store
      </Layout.Header>
      <Layout.Content className="min-h-screen">
        <Outlet />
      </Layout.Content>
    </Layout>
  );
};

export default MainLayout;
