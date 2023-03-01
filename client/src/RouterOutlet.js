import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import {
  AuthenticationLayout,
  MainLayout,
  LoginForm,
  RegisterForm,
} from "./components";
import routes from "./helpers/routes";
import { Home, Login, BookDetail, Books, Checkout, Orders } from "./pages";

const RouterOutlet = () => {
  return (
    <Routes>
      <Route path="user" element={<AuthenticationLayout />}>
        <Route path={routes.Login.url} element={<LoginForm />} />
        <Route path={routes.Register.url} element={<RegisterForm />} />
      </Route>
      <Route path="" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path={routes.Books.url} element={<Books />} />
        <Route path={routes.BookDetail.url} element={<BookDetail />} />
        <Route path={routes.Checkout.url} element={<Checkout />} />
        <Route path={routes.Orders.url} element={<Orders />} />
      </Route>
    </Routes>
  );
};

export default RouterOutlet;
