/* eslint-disable prettier/prettier */
import {
  GET_CARDS,
  GET_CARD_DETAIL,
  GET_CARDS_BY_CATEGORY,
  GET_CARDS_BY_NAME,
  CLEAN_FILTERS,
  GET_CARDS_BY_PRICE,
  ADD_ORDER,
  DELETE_ORDER,
  EDIT_ORDER,
} from "../actionTypes";

const initialState = {
  cards: [],
  filteredCards: [],
  card: {},
  orders: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_CARDS:
      return {
        ...state,
        cards: action.payload,
        filteredCards: action.payload,
      };
    case GET_CARD_DETAIL:
      return {
        ...state,
        card: action.payload,
      };
    case GET_CARDS_BY_CATEGORY:
      return {
        ...state,
        cards: action.cards,
        filteredCards: action.filteredCards,
      };
    case GET_CARDS_BY_NAME:
      return {
        ...state,
        // cards: action.cards,
        filteredCards: action.filteredCards,
      };
    case CLEAN_FILTERS:
      return {
        ...state,
        filteredCards: action.filteredCards
      }
    case GET_CARDS_BY_PRICE:
      return {
        ...state,
        filteredCards: action.filteredCards
      }
    case ADD_ORDER:
      // eslint-disable-next-line no-case-declarations
      let orders = [...state.orders];
      orders.splice(0, 0, action.payload);
      return {
        ...state,
        orders,
      };

    case EDIT_ORDER:
      // eslint-disable-next-line no-case-declarations
      let updatedOrders = state.orders;
      updatedOrders.splice(action.payload.index, 1, action.payload.order);
      return {
        ...state,
        updatedOrders,
      };
    case DELETE_ORDER:
      // eslint-disable-next-line no-case-declarations
      let deletedOrder = [...state.orders];
      deletedOrder.splice(action.payload.index, 1);
      return {
        ...state,
        orders: deletedOrder,
      };
    default:
      return state;
  }
}
