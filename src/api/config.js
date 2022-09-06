import axios from 'axios';

export const baseUrl = 'http://172.20.10.2:8888';

const axiosInstance = axios.create({
  baseURL: baseUrl
});

axiosInstance.interceptors.response.use(
  res => res.data,
  err => {
    console.log(err, '网络错误');
  }
);

export {
  axiosInstance
}