import axios from "axios";
import { ADD_ORDER, DELETE_ORDER, EDIT_ORDER, CONFIRM_ORDER } from "../actionTypes";
import { GET_IP_URL, BACKEND_URL } from "../../constants";
import { tokenConfig } from "./auth";
import { loading, isError } from "utils/toast";
import { isSuccess } from "utils/toast";

export const addOrder = (value) => (dispatch) => {
  dispatch({
    type: ADD_ORDER,
    payload: value,
  });
};

export const editOrder = (value) => (dispatch) => {
  dispatch({
    type: EDIT_ORDER,
    payload: value,
  });
};

export const deleteOrder = (value) => (dispatch) => {
  dispatch({
    type: DELETE_ORDER,
    payload: value,
  });
};

export const confirmOrder = (amountCart, navigate) => async (dispatch, getState) => {
  loading("Please wait a moment...");
  try {
    // Get ip address
    const { data } = await axios.get(GET_IP_URL);
    const ipAddress = data.IPv4;
    // Order Request.
    const payload = {
      id: "",
      description: null,
      signature: null,
      ipAddress,
      userAgent: navigator.userAgent,
      userId: null,
      currency: "MXN",
      status: 0,
      txValue: 0,
      amountCart,
      amountDiscount: 0.0,
      cart: {
        items: getState().home.orders,
      },
      createdAt: Date.now(),
      transactions: null,
      discounts: null,
    };

    const res = await axios.post(`${BACKEND_URL}Orders`, payload, tokenConfig());
    // console.log(payload, "---");
    isSuccess(res.data.message);
    navigate("/cart/confirm");
    dispatch({
      type: CONFIRM_ORDER,
      payload: getState().home.orders,
    });
  } catch (error) {
    console.log(error);
    isError(error.response.data.message);
  }
};
