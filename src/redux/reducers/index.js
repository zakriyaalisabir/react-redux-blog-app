import { combineReducers } from 'redux';

import commentsReducer from './commentsReducer';
import postsReducer from './postsReducer';

const rootReducer = combineReducers({
  commentsReducer,
  postsReducer
});

export default rootReducer;
