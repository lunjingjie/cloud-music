import { axiosInstance } from "./config";
import { categoryMap } from "./config";

// 获取轮播图list
export const getBannerRequest = () => {
  return axiosInstance.get('/banner');
}

// 获取推荐歌单列表
export const getRecommendListRequest = () => {
  return axiosInstance.get('/personalized');
}

// 获取热门歌手列表
export const getHotSingerListRequest = (count) => {
  return axiosInstance.get(`/top/artists?offset=${count}`);
}

// 获取歌手列表
export const getSingerListRequest= (category, alpha, count) => {
  const { type, area } = !!category ? categoryMap.get(category) : {};
  return axiosInstance.get(`/artist/list?${type !== undefined && area !== undefined ? `type=${type}&area=${area}` : ''}&initial=${alpha.toLowerCase()}&offset=${count}`);
}

// 获取排行榜音乐，通过tracks是否为空区分官方榜和全球榜
export const getRankListRequest = () => {
  return axiosInstance.get (`/toplist/detail`);
};

// 获取歌单信息、详情
export const getAlbumDetailRequest = id => {
  return axiosInstance.get (`/playlist/detail?id=${id}`);
};

// 获取歌手详细歌单
export const getSingerInfoRequest = id => {
  return axiosInstance.get (`/artists?id=${id}`);
};