import { combineReducers } from "redux-immutable";
import { reducer as recommendReducer } from '../application/Recommend/store/index';
import { reducer as singerReducer } from "../application/Singers/store";

export default combineReducers({
  // 添加具体功能的reducer
  recommend: recommendReducer,
  singers: singerReducer,
});