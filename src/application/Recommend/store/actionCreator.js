import { fromJS } from 'immutable';
import * as actionTypes from './constants';
import { getBannerRequest, getRecommendListRequest } from '../../../api/request';

export const changeBannerList = (data) => ({
  type: actionTypes.CHANGE_BANNER,
  data: fromJS(data)
})

export const changeRecommendList = (data) => ({
  type: actionTypes.CHANGE_RECOMMEND_LIST,
  data: fromJS(data)
})

export const changeEnterLoading = (data) => ({
  type: actionTypes.CHANGE_ENTER_LOADING,
  data: fromJS(data)
})

export const getBannerList = () => {
  return async (dispatch) => {
    try {
      const data = await getBannerRequest();
      dispatch(changeBannerList(data.banners));
    } catch (e) {
      console.log('轮播图数据传输错误');
    }
  }
}

export const getRecommendList = () => {
  return async (dispatch) => {
    try {
      const data = await getRecommendListRequest();
      dispatch(changeRecommendList(data.result));
      dispatch(changeEnterLoading(false));
    } catch (e) {
      console.log ("推荐歌单数据传输错误");
    }
  }
}