import { actionTypes as types } from '../constants';

const initialState = {
  loginDetail: {},
  user: {},
};

const user = (state = initialState, action) => {
  switch (action.type) {
  case types.LOGIN_REQUEST:
    return {...state, loginDetail: action.data};
  case types.SIGNUP_SUCCESS:
  case types.LOGIN_SUCCESS:
    return {...state, user: action.data};
  case types.LOGIN_FAILURE:
    return {};
  default:
    return state;
  }
};

export default user;
