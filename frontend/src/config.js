import axios from 'axios'

export const axiosInstance = axios.create({
    baseURL: 'https://videoappclone.herokuapp.com/api',
    headers: { 
        'Access-Control-Allow-Origin' : '*'
    }
  });