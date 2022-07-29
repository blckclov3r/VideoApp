import axios from 'axios'

export const axiosInstance = axios.create({
    baseURL: 'http://ytclonevideoapp.herokuapp.com/api',
    headers: { 
        'Access-Control-Allow-Origin' : '*'
    }
  });