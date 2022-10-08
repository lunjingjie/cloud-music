import { fromJS } from 'immutable';
import { getRankListRequest } from '../../../api/request';
import * as actionTypes from './constants';

const changeRankList = (data) => ({
  type: actionTypes.CHANGE_RANK_LIST,
  data: fromJS(data),
})


export const changeLoading = (data) => ({
  type: actionTypes.CHANGE_LOADING,
  data: fromJS(data),
})

export const getRankList = () => {
  return async (dispatch) => {
    try {
      const data = await getRankListRequest();
      const rankList = data && data.list ? data.list : [];
      dispatch(changeRankList(rankList));
      dispatch(changeLoading(false));
    } catch (e) {
      console.error('获取排行榜失败!');
    }
  }
}