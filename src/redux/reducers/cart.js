import { ADD_ORDER, CONFIRM_ORDER, CONFIRM_ORDERID, CONFIRM_ORDER_ERROR } from "../actionTypes";

const initialState = {
  orders: [],
  errors: {},
  confirmOrderId: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_ORDER: {
      let orders = state.orders;
      orders = action.payload;
      return {
        ...state,
        orders,
      };
    }

    case CONFIRM_ORDER: {
      let orders = state.orders;
      orders = action.payload;
      return {
        ...state,
        orders,
      };
    }

    case CONFIRM_ORDERID: {
      let confirmOrderId = state.confirmOrderId;
      confirmOrderId = action.payload;
      return {
        ...state,
        confirmOrderId,
      };
    }

    case CONFIRM_ORDER_ERROR: {
      let errors = state.errors;
      errors = action.payload;
      return {
        ...state,
        errors,
      };
    }

    default:
      return state;
  }
}
