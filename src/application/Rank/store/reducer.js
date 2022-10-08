import { fromJS } from "immutable";
import * as actionTypes from './constants';

const defaultState = fromJS({
  rankList: [],
  loading: false,
});

export default (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.CHANGE_RANK_LIST: return state.set('rankList', action.data);
    case actionTypes.CHANGE_LOADING: return state.set('loading', action.data);
    default: return state;
  }
}