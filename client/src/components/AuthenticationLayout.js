import { Layout } from "antd";
import React from "react";
import { Outlet } from "react-router-dom";

const AuthenticationLayout = () => {
  return (
    <Layout>
      <Layout.Header className="bg-blue-800 text-white">
        <span className="text-lg">Book Store</span>
      </Layout.Header>
      <Layout.Content className="min-h-screen flex justify-center items-center bg-gray-900">
        <div className="w-4/12 bg-blue-400 h-[35rem] p-8 rounded-md ">
          <Outlet />
        </div>
      </Layout.Content>
    </Layout>
  );
};

export default AuthenticationLayout;
