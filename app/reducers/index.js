import { combineReducers } from 'redux';
import contentReducers from './contentReducers';

export default function getRootReducer(navReducer) {
  return combineReducers({
    nav: navReducer,
    contentReducers,
  });
}
