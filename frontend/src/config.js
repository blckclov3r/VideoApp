import axios from 'axios'

export const axiosInstance = axios.create({
    baseURL: 'https://ytclonevideoapp.herokuapp.com/api',
    withCredentials: true,
    headers: { 
        'Access-Control-Allow-Origin' : '*'
    }
  });