import React from "react";
// import { Navigate } from "react-router-dom";

import DashboardLayout from "views/layouts/Dashboard";

import Home from "views/Home/Home";
import Cart from 'views/Cart/Cart';
import CartConfirm from 'views/CartConfirm/Confirm';
import ProductDetails from 'views/ProductDetails/productDetails';

{/* <Route path="/login" component={LoginPage} />
    <Route path="/card/detail/:id" component={ProductDetails} />
    <Route path="/cart" component={Cart} />
    <Route path="/" component={Home} /> 
*/}

const routes = [
  {
    path: '/',
    element: <DashboardLayout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/cart', element: <Cart /> },
      { path: '/card/detail/:id', element: <ProductDetails /> },
      { path: '/cart/confirm', element: <CartConfirm /> },
      // { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  // {
  //   path: '/',
  //   element: <MainLayout />,
  //   children: [
  //     { path: 'login', element: <LoginView /> },
  //     { path: 'register', element: <RegisterView /> },
  //     { path: '404', element: <NotFoundView /> },
  //     { path: '/', element: <Navigate to="/app/dashboard" /> },
  //     { path: '*', element: <Navigate to="/404" /> }
  //   ]
  // }
];

export default routes;
