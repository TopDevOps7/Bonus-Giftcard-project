/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import { BACKEND_URL } from "../../constants";
import axios from "axios";
import { tokenConfig } from "./auth";

import {
  GET_CARDS,
  GET_CARD_DETAIL,
  FILTER_CARDS_BY_CATEGORY,
  FILTER_CARDS_BY_NAME,
  CLEAN_FILTERS,
  FILTER_CARDS_BY_PRICE,
} from "../actionTypes";

export const getCards = () => (dispatch, getState) => {
  axios
    .get(`${BACKEND_URL}Giftcards`, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: GET_CARDS,
        payload: res.data,
      });
    })
    .catch((error) => console.log(error));
};

export const getCardDetail = (cardId) => (dispatch, getState) => {
  axios
    .get(`${BACKEND_URL}Giftcards/${cardId}`, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: GET_CARD_DETAIL,
        payload: res.data,
      });
    })
    .catch((error) => {
      console.log(error);
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
    filteredCards: allCards,
  });
};
