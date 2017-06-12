import { actionTypes as types } from '../constants';

const initialState = {
  visionList: '',
  fetching: false,
  fetched: false,
  err: '',
};
const visionList = (state = initialState, action) => {
  switch (action.type) {
  case types.VISION_REQUEST:
    return {...state, fetching: true};
  case types.VISION_SUCCESS:
    return {
      ...state,
      fetching: false,
      fetched: true,
      visionList: action.data,
    };
  case types.VISION_FAILURE:
    return {...state, fetching: false, err: action.data};
  default:
    return state;
  }
};

export default visionList;