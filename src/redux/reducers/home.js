/* eslint-disable prettier/prettier */
import {
  GET_CARDS,
  GET_CARD_DETAIL,
  FILTER_CARDS_BY_CATEGORY,
  FILTER_CARDS_BY_NAME,
  CLEAN_FILTERS,
  FILTER_CARDS_BY_PRICE,
  ADD_ORDER,
  DELETE_ORDER,
  EDIT_ORDER,
} from "../actionTypes";

const initialState = {
  cards: [],
  filterOptions: {
    categories: [],
    price: [],
    filterString: "",
    maxAmount: 0,
  },
  card: {},
  orders: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_CARDS: {
      let amountsRanges = action.payload.filter((card) => card.amountsRange).map((card) => card.amountsRange);
      amountsRanges = [
        ...amountsRanges,
        ...action.payload
          .filter((card) => card.amountsFixed)
          .map((card) => ({ minAmount: card.amountsFixed[0], maxAmount: card.amountsFixed[card.amountsFixed.length - 1] })),
      ];
      let maxAmount = amountsRanges.reduce((prev, cur) => (prev.maxAmount > cur.maxAmount ? prev : cur)).maxAmount;
      return {
        ...state,
        cards: action.payload,
        filterOptions: {
          ...state.filterOptions,
          maxAmount: Number(maxAmount),
          price: [0, maxAmount],
        },
      };
    }
    case GET_CARD_DETAIL:
      return {
        ...state,
        card: action.payload,
      };
    case FILTER_CARDS_BY_CATEGORY: {
      let filterCategories = state.filterOptions.categories;
      if (filterCategories.includes(action.category)) {
        filterCategories = filterCategories.filter((cat) => cat !== action.category);
      } else {
        filterCategories.push(action.category);
      }
      return {
        ...state,
        filterOptions: {
          ...state.filterOptions,
          categories: filterCategories,
        },
      };
    }
    case FILTER_CARDS_BY_NAME:
      return {
        ...state,
        filterOptions: {
          ...state.filterOptions,
          filterString: action.payload,
        },
      };
    case CLEAN_FILTERS:
      return {
        ...state,
        filterOptions: {
          ...state.filterOptions,
          categories: [],
          filterString: "",
          price: [0, state.filterOptions.maxAmount],
        },
      };
    case FILTER_CARDS_BY_PRICE:
      return {
        ...state,
        filterOptions: {
          ...state.filterOptions,
          price: action.price,
        },
        // filteredCards: action.filteredCards,
      };
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
