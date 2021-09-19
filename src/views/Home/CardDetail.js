/* eslint-disable prettier/prettier */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getCardDetail } from 'redux/actions/home';

export default function CardDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const detail = useSelector(state => state.home.card);

  useEffect(() => {
    dispatch(getCardDetail(id));
  }, [dispatch, id])

  console.log(detail);

  return (
    <p>miau aquí va el detalle</p>
  )
};