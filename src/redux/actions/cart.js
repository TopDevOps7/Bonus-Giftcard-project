import axios from "axios";
import { ADD_ORDER, DELETE_ORDER, EDIT_ORDER, CONFIRM_ORDER, CONFIRM_ORDERID, CONFIRM_ORDER_ERROR } from "../actionTypes";
import { BACKEND_URL } from "../../constants";
import { tokenConfig } from "./auth";
import { loading, isError } from "utils/toast";
import { isSuccess } from "utils/toast";

export const addOrder = (value, partnerId) => (dispatch) => {
  dispatch({
    type: ADD_ORDER,
    payload: value,
    partnerId,
  });
};

export const editOrder = (value, partnerId) => (dispatch) => {
  dispatch({
    type: EDIT_ORDER,
    payload: value,
    partnerId,
  });
};

export const deleteOrder = (value, partnerId) => (dispatch) => {
  dispatch({
    type: DELETE_ORDER,
    payload: value,
    partnerId,
  });
};

export const confirmOrder = (amountCart, navigate, homeUrl, partnerId) => async (dispatch, getState) => {
  loading("Espere un momento...");
  try {
    // Get ip address
    // const { data } = await axios.get(GET_IP_URL);
    // const ipAddress = data.ip;

    let cart_array = [];
    let cart_array_ = getState().home.data[partnerId ?? "noPartner"].orders;
    cart_array_.map((cart) => {
      let cart_item = {
        giftcardId: cart.giftcard.id,
        amount: cart.amount,
        description: cart.description,
        style: cart.style,
        isScheduled: cart.isScheduled,
        scheduledDate: cart.scheduledDate,
        isGift: cart.isGift,
        toName: cart.toName,
        toEmail: cart.toEmail,
        toMessage: cart.toMessage,
        toPhone: cart.toPhone,
      };
      cart_array.push(cart_item);
    });

    const payload = {
      partnerId: partnerId,
      ipAddress: "0.0.0.0",
      userAgent: navigator.userAgent,
      userId: null,
      currency: "MXN",
      amountCart: amountCart,
      cart: cart_array,
      discounts: null,
    };

    const res = await axios.post(`${BACKEND_URL}Orders`, payload, tokenConfig());
    isSuccess(res.data.message == "Order added" ? "Orden creada" : "Order added");
    navigate(`${homeUrl}/cart/confirm`.replace("//", "/"));
    dispatch({
      type: CONFIRM_ORDER,
      payload: getState().home.orders,
    });
    dispatch({
      type: CONFIRM_ORDERID,
      payload: res.data.object.id,
    });
  } catch (error) {
    isError(error.response.data.message);
    dispatch({
      type: CONFIRM_ORDER_ERROR,
      payload: error,
    });
  }
};

export const successOrder = (value) => async () => {
  loading("Espere un momento...");
  try {
    const res = await axios.post(`${BACKEND_URL}Payment`, value, tokenConfig());
    isSuccess("Compra completada");
    localStorage.setItem("successOrders", JSON.stringify(res.data));
  } catch (error) {
    isError(error.response.data.message);
    localStorage.setItem("successOrders", JSON.stringify([]));
  }
};
