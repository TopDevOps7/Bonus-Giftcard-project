import { ADD_ORDER } from "../actionTypes";

const initialState = {
  orders: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_ORDER:
      let orders = state.orders;
      orders.splice(0, 0, action.payload);
      return {
        ...state,
        orders,
      };

    default:
      return state;
  }
}
