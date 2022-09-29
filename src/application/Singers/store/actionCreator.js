import { fromJS } from "immutable";
import { getHotSingerListRequest, getSingerListRequest } from "../../../api/request";
import { CHANGE_ENTER_LOADING, CHANGE_PAGE_COUNT, CHANGE_PULLDOWN_LOADING, CHANGE_PULLUP_LOADING, CHANGE_SINGER_LIST } from "./constants";

const changeSingerList = (data) => ({
  type: CHANGE_SINGER_LIST,
  data: fromJS(data)
});

// 进场loading
export const changeEnterLoading = (data) => ({
  type: CHANGE_ENTER_LOADING,
  data: fromJS(data)
});

// 底部loading
export const changePullUpLoading = (data) => ({
  type: CHANGE_PULLUP_LOADING,
  data: fromJS(data)
});

// 顶部loading
export const changePullDownLoading = (data) => ({
  type: CHANGE_PULLDOWN_LOADING,
  data: fromJS(data)
});

export const changePageCount = (data) => ({
  type: CHANGE_PAGE_COUNT,
  data: fromJS(data)
});

// 第一次加载默认热门歌手
export const getHotSingerList = () => {
  return async (dispatch) => {
    try {
      const data = await getHotSingerListRequest(0);
      dispatch(changeSingerList(data.artists));
      dispatch(changePullDownLoading(false));
      dispatch(changeEnterLoading(false));
    } catch(e) {
      console.error('热门歌手数据获取失败!');
    }
  }
}

// 加载更多热门歌手
export const refreshMoreHotSingerList = () => {
  return async (dispatch, getState) => {
    try {
      const pageCount = getState().getIn(['singers', 'pageCount']);
      const singerList = getState().getIn(['singers', 'singerList']).toJS();
      const data = await getHotSingerListRequest(pageCount);
      const result = [...singerList, ...data.artists];
      dispatch(changeSingerList(result));
      dispatch(changePullUpLoading(false));
    } catch (e) {
      console.error(e);
      console.error('加载更多热门歌手失败!');
    }
  }
}

// 第一次根据类别加载歌手
export const getSingerList = (category, alpha) => {
  return async (dispatch) => {
    try {
      const data = await getSingerListRequest(category, alpha, 0);
      dispatch(changeSingerList(data.artists));
      dispatch(changePullDownLoading(false));
      dispatch(changeEnterLoading(false));
    } catch (e) {
      console.error(e);
    }
  }
}

// 加载更多筛选后的歌手
export const refreshMoreSingerList = (category, alpha) => {
  return async (dispatch, getState) => {
    try {
      const pageCount = getState().getIn(['singers', 'pageCount']);
      const singerList = getState().getIn(['singers', 'singerList']).toJS();
      const data = await getSingerListRequest(category, alpha, pageCount);
      const result = [...singerList, ...data.artists];
      dispatch(changeSingerList(result));
      dispatch(changePullUpLoading(false));
    } catch (e) {
      console.error(e);
      console.log('加载更多歌手失败!');
    }
  }
}