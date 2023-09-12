// src/redux/reducers.js

import { SET_VIDEOGAMES, SET_LOADING, SET_ERROR } from './actions';

const initialState = {
  videogames: [],
  loading: false,
  error: null,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_VIDEOGAMES:
      return { ...state, videogames: action.payload };
    case SET_LOADING:
      return { ...state, loading: action.payload };
    case SET_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export default rootReducer;
