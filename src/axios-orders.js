import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://burger-builder-a31b4.firebaseio.com'
});

export default axiosInstance;
