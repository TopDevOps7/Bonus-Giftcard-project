import { ADD_ORDER, DELETE_ORDER, EDIT_ORDER } from "../actionTypes";

export const addOrder = (value) => (dispatch) => {
  dispatch({
    type: ADD_ORDER,
    payload: value,
  });
};

export const editOrder = (value) => (dispatch) => {
  dispatch({
    type: EDIT_ORDER,
    payload: value,
  });
};

export const deleteOrder = (value) => (dispatch) => {
  dispatch({
    type: DELETE_ORDER,
    payload: value,
  });
};
