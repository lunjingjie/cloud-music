import { axiosInstance } from "./config";
import { categoryMap } from "./config";

export const getBannerRequest = () => {
  return axiosInstance.get('/banner');
}

export const getRecommendListRequest = () => {
  return axiosInstance.get('/personalized');
}

export const getHotSingerListRequest = (count) => {
  return axiosInstance.get(`/top/artists?offset=${count}`);
}

export const getSingerListRequest= (category, alpha, count) => {
  const { type, area } = !!category ? categoryMap.get(category) : {};
  return axiosInstance.get(`/artist/list?${type !== undefined && area !== undefined ? `type=${type}&area=${area}` : ''}&initial=${alpha.toLowerCase()}&offset=${count}`);
}