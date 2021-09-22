import React from "react";
import { useRoutes } from "react-router-dom";
import { Provider } from "react-redux";
import { ThemeProvider } from "@material-ui/core";

import routes from "routes";
import theme from "theme";
import { store } from "redux/store";

import "assets/scss/material-kit-react.scss?v=1.10.0";

// pages for this product
// import LoginPage from "views/LoginPage/LoginPage";
// import Home from "views/Home/Home";
// import ProductDetails from "views/ProductDetails/productDetails";
// import Cart from "views/Cart/Cart.js";

const App = () => {
  const routing = useRoutes(routes);

  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        {routing}
      </Provider>
    </ThemeProvider>
  );
};
export default App;
