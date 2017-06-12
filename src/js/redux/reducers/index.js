import { combineReducers } from 'redux';

import user from './user';
import search from './search';
import imagelist from './imagelist';
import dropzone from './dropzone';
const rootReducer = combineReducers({
  user,
  search,
  imagelist,
  dropzone,
});

export default rootReducer;
