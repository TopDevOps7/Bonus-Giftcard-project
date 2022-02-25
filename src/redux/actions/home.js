/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import axios from "axios";
import logo from "../../assets/img/logo.png";
import { BACKEND_URL } from "../../constants";
import { tokenConfig } from "./auth";
import { loading, isSuccess } from "utils/toast";

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
  SET_COUPON,
  FILTER_CARDS_BY_CATEGORY,
  FILTER_CARDS_BY_NAME,
  CLEAN_FILTERS,
  FILTER_CARDS_BY_PRICE,
  CHANGE_PAGE,
} from "../actionTypes";

export const getCards = (partnerId, navigate) => (dispatch, getState) => {
  let apiUrl = "";
  partnerId != "" ? (apiUrl = `${BACKEND_URL}Catalog/${partnerId}`) : (apiUrl = `${BACKEND_URL}Catalog`);
  axios
    .get(apiUrl, tokenConfig(getState))
    .then((res) => {
      let payload = res.data;
      let partner = partner;
      let logoUrl = logo;
      let categories = categories;
      let banners = banners;

      payload = res.data.partner.catalog.giftcards;
      partner = res.data.partner;
      logoUrl = res.data.partner.logo ?? logo;
      categories = res.data.categories;
      banners = res.data.partner.configuration.banner;

      sessionStorage.setItem("partner", JSON.stringify(partner));

      dispatch({
        type: GET_CARDS_REQUEST,
        categories,
      });
      dispatch({
        type: GET_PARTNER,
        partner,
      });
      dispatch({
        type: GET_BANNERS_REQUEST,
        banners,
      });
      dispatch({
        type: GET_CARDS,
        payload,
        partnerId,
        logo: logoUrl,
      });

      if (payload.length == 1) {
        partnerId ? navigate(`/${partnerId}/card/detail/${payload[0].id}`) : navigate(`/card/detail/${payload[0].id}`);
      }
    })
    .catch((error) => {
      localStorage.clear();
      dispatch({
        type: GET_CARDS_ERROR,
      });
      navigate("/404");
    });
};

export const getCardDetail = (cardId, partnerId, navigate) => (dispatch, getState) => {
  dispatch({
    type: GET_CARD_DETAIL_REQUEST,
  });

  let apiUrl = "";
  partnerId ? (apiUrl = `${BACKEND_URL}Catalog/${partnerId}/${cardId}`) : (apiUrl = `${BACKEND_URL}Catalog/null/${cardId}`);
  axios
    .get(apiUrl, tokenConfig(getState))
    .then((res) => {
      let payload = res.data;
      let logoUrl = logo;
      let partner = partner;
      let cardsDesign = [];
      let cardsDesign_ = res.data.partner.catalog.configuration.cardsDesign;
      payload = res.data.partner.catalog.giftcards;
      partner = res.data.partner;
      logoUrl = res.data.partner.logo ?? logo;

      cardsDesign_.length != 0 &&
        cardsDesign_.map((ele) => {
          cardsDesign.push(ele);
        });

      payload[0].cardsDesign &&
        payload[0].cardsDesign.length != 0 &&
        payload[0].cardsDesign.map((ele) => {
          cardsDesign.push(ele);
        });

      if (sessionStorage.getItem("cardsDesign")) {
        let cardsDesignList = JSON.parse(sessionStorage.getItem("cardsDesign"));
        let cardsDesignList_ = [];
        let found = false;
        cardsDesign.map((ele) => {
          found = false;
          cardsDesignList.map((ele_) => {
            ele.name == ele_.name && (found = true);
          });
          found == false && cardsDesignList_.push(ele);
        });

        cardsDesignList_.length != 0 &&
          cardsDesignList_.map((ele) => {
            cardsDesignList.push(ele);
          });

        sessionStorage.setItem("cardsDesign", JSON.stringify(cardsDesignList));
      } else {
        sessionStorage.setItem("cardsDesign", JSON.stringify(cardsDesign));
      }

      sessionStorage.setItem("partner", JSON.stringify(partner));

      if (payload.length > 0) {
        payload = payload[0];
      } else {
        payload = {};
      }
      dispatch({
        type: GET_CARD_DETAIL,
        payload,
        partnerId,
        logo: logoUrl,
      });
      dispatch({
        type: GET_PARTNER,
        partner,
      });
      dispatch({
        type: GET_CARDSDESIGN,
        cardsDesign,
      });
    })
    .catch((error) => {
      partnerId ? navigate(`/${partnerId}/404`) : navigate(`/404`);
      dispatch({
        type: GET_CARD_DETAIL_ERROR,
      });
    });
};

export const getEmailResultRequest = (partnerId, userId, uuid, navigate) => (dispatch, getState) => {
  let apiUrl = `${BACKEND_URL}Email/${partnerId}/${userId}/${uuid}`;
  axios
    .get(apiUrl, tokenConfig(getState))
    .then((res) => {
      let payload = res.data;
      let partner = res.data.partner;
      dispatch({
        type: GET_EMAIL_RESULT_REQUEST,
        payload,
      });
      dispatch({
        type: GET_PARTNER,
        partner,
      });
    })
    .catch((error) => {
      navigate(`/404`);
    });
};

export const getEmailResultResponse = (partnerId, userId, uuid, navigate) => async (dispatch, getState) => {
  loading("Espere un momento...");
  let apiUrl = `${BACKEND_URL}Email/${partnerId}/${userId}/${uuid}`;
  try {
    const res = await axios.post(apiUrl, tokenConfig(getState));
    res.status == 200
      ? (isSuccess("Reenviar completado"), localStorage.setItem("resultStatus", "success"))
      : (localStorage.setItem("resultStatus", ""), navigate(`/404`));
  } catch (error) {
    localStorage.setItem("resultStatus", "");
    navigate(`/404`);
  }
};

export const getEmailResultResponse_ = (partnerId, userId, uuid, email, navigate) => async (dispatch, getState) => {
  loading("Espere un momento...");
  let apiUrl = `${BACKEND_URL}Email/${partnerId}/${userId}/${uuid}/${email}`;
  try {
    const res = await axios.post(apiUrl, tokenConfig(getState));
    res.status == 200
      ? (isSuccess("Reenviar completado"), localStorage.setItem("resultStatus", "success"))
      : (localStorage.setItem("resultStatus", ""), navigate(`/404`));
  } catch (error) {
    localStorage.setItem("resultStatus", "");
    navigate(`/404`);
  }
};

export const sendCoupon = (partnerId, cardId, coupon) => async (dispatch) => {
  let apiUrl = `${BACKEND_URL}discount/`;
  const payload = {
    partnerId: partnerId,
    giftcard: cardId,
    code: coupon,
  };

  try {
    const res = await axios.post(apiUrl, payload, tokenConfig());
    res.status == 200
      ? sessionStorage.setItem("coupon", JSON.stringify(res.data))
      : sessionStorage.setItem("errorCouponText", "");
  } catch (error) {
    sessionStorage.setItem("coupon", JSON.stringify({}));
    sessionStorage.setItem("errorCouponText", error.response.data.message);
  }
};

export const setCoupon = (coupon) => async (dispatch) => {
  dispatch({
    type: SET_COUPON,
    coupon,
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
    .filter((item) => item[0] === price[0]);

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
