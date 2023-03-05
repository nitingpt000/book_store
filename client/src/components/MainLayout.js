import { Badge, Layout } from "antd";
import React,{useEffect} from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Menu, Dropdown } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useStoreState,useStoreDispatch } from "../contexts/store";
import { actions } from "../contexts/store/actions";
const MainLayout = () => {
  const navigate = useNavigate();
  const navigateToHome = () => {
    navigate("/");
  };
  const storeDispatch = useStoreDispatch();
  const {cartList} = useStoreState();
  const handleCartClick=()=>{
    navigate("/checkout");
  }
  useEffect(() => {
    actions.fetchCartItems(storeDispatch, cartList);
  }, [storeDispatch, cartList]);

  return (
    <Layout>
      <Layout.Header className="bg-blue-800 text-white flex justify-between items-center">
        <div className="text-lg cursor-pointer" onClick={navigateToHome}>
          Book Store
        </div>
        {/* <Link to="/user/login">Login</Link> */}
        <div className="flex gap-4 items-center">
          <Badge count={cartList.length===0?null:cartList.length}>
            <ShoppingCartOutlined className="text-2xl text-white cursor-pointer" onClick={handleCartClick}/>
          </Badge>
          <Dropdown overlay={menu}>
            <a
              className="ant-dropdown-link"
              onClick={(e) => e.preventDefault()}
            >
              My Account
            </a>
          </Dropdown>
        </div>
      </Layout.Header>
      <Layout.Content className="min-h-screen ">
        <Outlet />
      </Layout.Content>
    </Layout>
  );
};

const menu = (
  <Menu>
    <Menu.Item key="1">My Profile</Menu.Item>
    <Menu.Item key="2" >
      <Link to="/orders">
      My Orders
      </Link>
      </Menu.Item>
  </Menu>
);

export default MainLayout;
