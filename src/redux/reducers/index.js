/* eslint-disable prettier/prettier */
import { combineReducers } from "redux";
import home from "./home";
import cart from "./cart";

export default combineReducers({
  home,
  cart,
});
