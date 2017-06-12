import { actionTypes as types } from '../constants';

const initialState = {
  imageList: '',
  fetching: false,
  fetched: false,
  err: '',
};
const imageDataList = (state = initialState, action) => {
  switch (action.type) {
  case types.IMAGE_REQUEST :
    return {...state, fetching: true};
  case types.IMAGE_SUCCESS:
    return {
      ...state,
      fetching: false,
      fetched: true,
      imageList: action.data,
    };
  case types.IMAGE_FAILURE:
    return {...state, fetching: false, err: action.data};
  default:
    return state;
  }
};

export default imageDataList;