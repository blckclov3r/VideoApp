import axios from 'axios'

export const axiosInstance = axios.create({
    baseURL: 'https://ytclonevideoapp.herokuapp.com/api',
    headers: { 
        'Access-Control-Allow-Origin' : '*'
    }
  });