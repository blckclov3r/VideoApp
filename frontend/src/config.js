import axios from 'axios'

export const axiosInstance = axios.create({
    baseURL: 'https://videoappclone.herokuapp.com',
    headers: { 
        'Access-Control-Allow-Origin' : '*'
    }
  });