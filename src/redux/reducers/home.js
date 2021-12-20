/* eslint-disable prettier/prettier */
import _ from "lodash";

import {
  GET_CARDS_REQUEST,
  GET_BANNERS_REQUEST,
  GET_CARDS,
  GET_CARDS_ERROR,
  GET_CARD_DETAIL_REQUEST,
  GET_CARD_DETAIL,
  GET_CARD_DETAIL_ERROR,
  GET_PARTNER,
  GET_EMAIL_RESULT_REQUEST,
  GET_CARDSDESIGN,
  FILTER_CARDS_BY_CATEGORY,
  FILTER_CARDS_BY_NAME,
  CLEAN_FILTERS,
  FILTER_CARDS_BY_PRICE,
  ADD_ORDER,
  DELETE_ORDER,
  EDIT_ORDER,
  CHANGE_PAGE,
} from "../actionTypes";

const initialField = {
  partnerId: undefined,
  orders: [],
  logo: undefined,
};

const initialState = {
  partnerId: undefined,
  loading: false,
  card: {},
  cards: [],
  data: {},
  filterOptions: {
    categories: [],
    price: [],
    filterString: "",
    maxAmount: 0,
  },
  pagination: {
    limit: 20,
    page: 1,
  },
  categories: [],
  banners: [],
  partner: {},
  emailResult: {},
  cardsDesign: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_CARDS_REQUEST: {
      let categories = state.categories;
      categories = action.categories;
      return {
        ...state,
        categories,
      };
    }
    case GET_BANNERS_REQUEST: {
      let banners = state.banners;
      banners = action.banners;
      return {
        ...state,
        banners,
      };
    }
    case GET_PARTNER: {
      let partner = state.partner;
      partner = action.partner;
      return {
        ...state,
        partner,
      };
    }
    case GET_EMAIL_RESULT_REQUEST: {
      let emailResult = state.emailResult;
      emailResult = action.payload;
      return {
        ...state,
        emailResult,
      };
    }
    case GET_CARDSDESIGN: {
      let cardsDesign = state.cardsDesign;
      cardsDesign = action.cardsDesign;
      return {
        ...state,
        cardsDesign,
      };
    }
    case GET_CARD_DETAIL_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case GET_CARDS: {
      let amountsRanges = action.payload.filter((card) => card.amountsRange).map((card) => card.amountsRange);
      amountsRanges = [
        ...amountsRanges,
        ...action.payload
          .filter((card) => card.amountsFixed && card.amountsFixed.length)
          .map((card) => ({ minAmount: card.amountsFixed[0], maxAmount: card.amountsFixed[card.amountsFixed.length - 1] })),
      ];
      let maxAmount = amountsRanges.reduce((prev, cur) => (prev.maxAmount > cur.maxAmount ? prev : cur)).maxAmount;
      let partnerId = action.partnerId ?? "noPartner";
      return {
        ...state,
        loading: false,
        partnerId: action.partnerId,
        cards: action.payload,
        filterOptions: {
          ...state.filterOptions,
          maxAmount: Number(maxAmount.amount),
          price: [0, maxAmount.amount],
        },
        data: {
          ...state.data,
          [partnerId]: {
            ...initialField,
            ...state.data[partnerId],
            partnerId,
            logo: action.logo,
          },
        },
      };
    }
    case GET_CARD_DETAIL: {
      let partnerId = action.partnerId ?? "noPartner";
      return {
        ...state,
        loading: false,
        card: action.payload,
        partnerId: action.partnerId,
        data: {
          ...state.data,
          [partnerId]: {
            ...state.data[partnerId],
            partnerId,
            logo: action.logo,
          },
        },
      };
    }
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
        pagination: {
          ...state.pagination,
          page: 1,
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
    case CLEAN_FILTERS: {
      let pagination = state.pagination;
      let filterOptions = {
        ...state.filterOptions,
        categories: [],
        filterString: "",
        price: [0, state.filterOptions.maxAmount],
      };
      if (!_.isEqual(filterOptions, state.filterOptions)) {
        pagination = {
          ...pagination,
          page: 1,
        };
      }
      return {
        ...state,
        filterOptions,
        pagination,
      };
    }
    case FILTER_CARDS_BY_PRICE:
      return {
        ...state,
        filterOptions: {
          ...state.filterOptions,
          price: action.price,
        },
        pagination: {
          ...state.pagination,
          page: 1,
        },
      };
    case ADD_ORDER: {
      // eslint-disable-next-line no-case-declarations
      let partnerId = action.partnerId ?? "noPartner";
      let orders = state.data[partnerId].orders;
      orders = orders ?? [];
      orders.splice(0, 0, action.payload);

      let partner_ids_str = localStorage.getItem("partner_ids");
      if (partner_ids_str == null) partner_ids_str = partnerId;
      else partner_ids_str += ",/" + partnerId;
      localStorage.setItem("partner_ids", partner_ids_str);
      localStorage.setItem(
        partnerId,
        JSON.stringify({
          ...state.data[partnerId],
          partnerId,
          orders,
        })
      );

      let partner_data = {};
      let partner_ids = partner_ids_str.split(",/");
      partner_ids.map((item) => {
        partner_data[item] = JSON.parse(localStorage.getItem(item));
      });

      return {
        ...state,
        data: partner_data,
      };
    }
    case EDIT_ORDER: {
      // eslint-disable-next-line no-case-declarations
      let partnerId = action.partnerId ?? "noPartner";
      let updatedOrders = state.data[partnerId].orders;
      updatedOrders = updatedOrders ?? [];
      updatedOrders.splice(action.payload.index, 1, action.payload.order);

      let partner_ids = localStorage.getItem("partner_ids").split(",/");
      localStorage.setItem(
        partnerId,
        JSON.stringify({
          ...state.data[partnerId],
          partnerId,
          orders: updatedOrders,
        })
      );

      let partner_data = {};
      partner_ids.map((item) => {
        partner_data[item] = JSON.parse(localStorage.getItem(item));
      });

      return {
        ...state,
        data: partner_data,
      };
    }
    case DELETE_ORDER: {
      // eslint-disable-next-line no-case-declarations
      let partnerId = action.partnerId ?? "noPartner";
      let deletedOrder = [...state.data[partnerId].orders];
      deletedOrder = deletedOrder ?? [];
      deletedOrder.splice(action.payload.index, 1);

      let partner_ids = localStorage.getItem("partner_ids").split(",/");
      localStorage.setItem(
        partnerId,
        JSON.stringify({
          ...state.data[partnerId],
          partnerId,
          orders: deletedOrder,
        })
      );

      let partner_data = {};
      partner_ids.map((item) => {
        partner_data[item] = JSON.parse(localStorage.getItem(item));
      });

      return {
        ...state,
        data: partner_data,
      };
    }
    case CHANGE_PAGE:
      return {
        ...state,
        pagination: {
          ...state.pagination,
          page: action.payload,
        },
      };
    case GET_CARDS_ERROR:
    case GET_CARD_DETAIL_ERROR: {
      return {
        ...state,
        loading: false,
      };
    }
    default:
      return state;
  }
}
