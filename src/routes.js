import React from "react";
import { Navigate } from "react-router-dom";

import DashboardLayout from "views/layouts/Dashboard";

import Home from "views/Home/Home";
import Cart from "views/Cart/Cart";
import Mail from "views/Mail/mail";
import CartConfirm from "views/CartConfirm/Confirm";
import ProductDetails from "views/ProductDetails/productDetails";
import NotFoundView from "views/NotFound";

const routes = [
  {
    path: "/",
    element: <DashboardLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/:partnerId", element: <Home /> },
      { path: "/cart", element: <Cart /> },
      { path: "/:partnerId/cart", element: <Cart /> },
      { path: "/:partnerId/email/:userId/:uuid", element: <Mail /> },
      { path: "/card/detail/:id", element: <ProductDetails /> },
      { path: "/:partnerId/card/detail/:id", element: <ProductDetails /> },
      { path: "/cart/confirm", element: <CartConfirm /> },
      { path: "/:partnerId/cart/confirm", element: <CartConfirm /> },
      { path: "/404", element: <NotFoundView /> },
      { path: "/:partnerId/404", element: <NotFoundView /> },
      { path: "*", element: <Navigate to="/404" /> },
    ],
  },
];

export default routes;
