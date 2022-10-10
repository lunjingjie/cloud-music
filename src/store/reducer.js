import { combineReducers } from "redux-immutable";
import { reducer as recommendReducer } from '../application/Recommend/store/index';
import { reducer as singerReducer } from "../application/Singers/store";
import { reducer as rankReducer } from '../application/Rank/store';
import { reducer as albumReducer } from '../application/Album/store';

export default combineReducers({
  // 添加具体功能的reducer
  recommend: recommendReducer,
  singers: singerReducer,
  rank: rankReducer,
  album: albumReducer,
});