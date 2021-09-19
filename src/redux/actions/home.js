/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import { GET_CARDS, GET_CARD_DETAIL, GET_CARDS_BY_CATEGORY, GET_CARDS_BY_NAME, CLEAN_FILTERS, GET_CARDS_BY_PRICE } from "../actionTypes";
import axios from "axios";
import { tokenConfig } from "./auth"

export const getCards = () => (dispatch, getState) => {
  axios
    .get(
      'https://artemisapidev.azurewebsites.net/api/Giftcards',
      tokenConfig(getState)
    )
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
    .get(
      `https://artemisapidev.azurewebsites.net/api/Giftcards/${cardId}`,
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch({
        type: GET_CARD_DETAIL,
        payload: res.data,
      });
    })
    .catch((error) => console.log(error));
};

export const filterByCategory = (category) => (dispatch, getState) => {
  const allCards = getState().home.cards;
  const filteredCards = allCards;

  const cardsByCategory = filteredCards.filter(x => x.categories.some(y => y.name === category))

  console.log({ cardsByCategory })
  
  dispatch({
    type: GET_CARDS_BY_CATEGORY,
    filteredCards: cardsByCategory
  })  
}

export const filterByNameAndDescription = (filterString) => (dispatch, getState) => {
  const allCards = getState().home.cards;
  const filteredCards = allCards
  const upperCaseFilterString = filterString.charAt(0).toUpperCase() + filterString.slice(1);
  const cardsByName = filterString !== "" ? filteredCards.filter((item) => item.name === upperCaseFilterString) : filteredCards

  dispatch({
    type: GET_CARDS_BY_NAME,
    filteredCards: cardsByName
  })
}

export const cleanFilters = () => (dispatch, getState) => {
  const allCards = getState().home.cards;
  dispatch({
    type: CLEAN_FILTERS,
    filteredCards: allCards
  })
}

export const filterByPrice = (price) => (dispatch, getState) => {
  const allCards = getState().home.cards;
  const filteredCards = allCards
  const cardsByPrice = filteredCards.map(item => item.amountsRange !== null ? Object.values(item.amountsRange) : []).filter(item => item[0] === price[0] * 20)
  console.log(cardsByPrice.filter(item => item[0] === price[0] * 20), '<---miau')

  console.log({ cardsByPrice });
  console.log( price[0] * 20);
  
  dispatch({
    type: GET_CARDS_BY_PRICE,
    filteredCards: allCards
  })
}