import { actionTypes as types } from '../constants';

const initialState = {
  searchResult: {},
  fetching: false,
  fetched: false,
  isvisionDetailPage: false,
  cosmosDB: {},
  err: '',
};

const search = (state = initialState, action) => {
  switch (action.type) {
  case types.ON_SEARCH_REQUEST :
    return {...state, fetching: true, isvisionDetailPage: false};
  case types.ON_SEARCH_SUCCESS:
    console.log(action); 
    return {
      ...state,
      fetching: false,
      fetched: true,
      searchResult: action.response.data,
    };
  case types.ON_SEARCH_FAILURE:
    return {...state, fetching: false, err: action.data};
  
  case types.ON_CLEAR_SEARCH:
    return {...state, searchResult: {}, isvisionDetailPage: false, fetching: false, fetched: false, err: ''};

  case types.SHOW_VISION_DETAILS: 
    return {...state, isvisionDetailPage: true, cosmosDB: action.data };

  case types.HIDE_VISION_DETAILS: 
    return {...state, isvisionDetailPage: false, cosmosDB: {} };

  default:
    return state;
  }
};

export default search;