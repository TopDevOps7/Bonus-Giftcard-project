/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import { BACKEND_URL } from "../../constants";
import axios from "axios";
import { tokenConfig } from "./auth";

import {
  GET_CARDS_REQUEST,
  GET_CARDS,
  GET_CARDS_ERROR,
  GET_CARD_DETAIL_REQUEST,
  GET_CARD_DETAIL,
  GET_CARD_DETAIL_ERROR,
  FILTER_CARDS_BY_CATEGORY,
  FILTER_CARDS_BY_NAME,
  CLEAN_FILTERS,
  FILTER_CARDS_BY_PRICE,
  CHANGE_PAGE,
} from "../actionTypes";

export const getCards = (partnerId, navigate) => (dispatch, getState) => {
  dispatch({
    type: GET_CARDS_REQUEST,
  });
  let apiUrl = `${BACKEND_URL}Giftcards`;
  if (partnerId) {
    apiUrl = `${BACKEND_URL}Catalog/${partnerId}`;
  }
  axios
    .get(apiUrl, tokenConfig(getState))
    .then((res) => {
      let payload = res.data;
      if (partnerId) {
        payload = res.data.partner.catalog.giftcards;
      }
      dispatch({
        type: GET_CARDS,
        payload,
        partnerId,
      });
    })
    .catch((error) => {
      console.log(error);
      dispatch({
        type: GET_CARDS_ERROR,
      });
      navigate("404");
    });
};

export const getCardDetail = (cardId, partnerId, navigate) => (dispatch, getState) => {
  dispatch({
    type: GET_CARD_DETAIL_REQUEST,
  });
  let apiUrl = `${BACKEND_URL}Giftcards/${cardId}`;
  if (partnerId) {
    apiUrl = `${BACKEND_URL}Catalog/${partnerId}/${cardId}`;
  }
  axios
    .get(apiUrl, tokenConfig(getState))
    .then((res) => {
      let payload = res.data;
      if (partnerId) {
        payload = res.data.partner.catalog.giftcards;
        if (payload.length > 0) {
          payload = payload[0];
        } else {
          payload = {};
        }
      }
      dispatch({
        type: GET_CARD_DETAIL,
        payload,
        partnerId,
      });
    })
    .catch((error) => {
      console.log(error);
      if (partnerId) {
        navigate(`/${partnerId}/404`);
      } else {
        navigate("/404");
      }
      dispatch({
        type: GET_CARD_DETAIL_ERROR,
      });
    });
};

export const filterByCategory = (category) => (dispatch) => {
  dispatch({
    type: FILTER_CARDS_BY_CATEGORY,
    category,
  });
};

export const filterByNameAndDescription = (filterString) => (dispatch) => {
  dispatch({
    type: FILTER_CARDS_BY_NAME,
    payload: filterString,
  });
};

export const cleanFilters = () => (dispatch) => {
  dispatch({
    type: CLEAN_FILTERS,
  });
};

export const filterByPrice = (price) => (dispatch, getState) => {
  const allCards = getState().home.cards;
  const filteredCards = allCards;
  const cardsByPrice = filteredCards
    .map((item) => (item.amountsRange ? Object.values(item.amountsRange) : []))
    .filter((item) => item[0] === price[0] * 20);
  console.log(
    cardsByPrice.filter((item) => item[0] === price[0] * 20),
    "<---miau"
  );

  console.log({ cardsByPrice });
  console.log(price[0] * 20);

  dispatch({
    type: FILTER_CARDS_BY_PRICE,
    price,
  });
};

export const changePage = (page) => (dispatch) => {
  dispatch({
    type: CHANGE_PAGE,
    payload: page,
  });
};
