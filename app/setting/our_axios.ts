import { API_URL } from './API';
// import useAuth from "../services/authService";
const axios = require('axios');
// console.log("axios default ",axios.defaults)

axios.defaults.headers.post['Content-Type'] = 'application/json';

// let store:any;
const token = localStorage.getItem('token');
console.log(token);

// export const injectStore = (_store:any) => {
//     store = _store;
// }

axios.interceptors.request.use(
  async (config: any) => {
    // console.log('API request ',store.getState());
    //  const authUser = store.getState().auth;
    // console.log('API request auth user ',authUser);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: any) => {
    console.log('Axios interceptor error ', error);
    return error;
  },
);

export default axios;

// import {API_URL} from "../setting/API";
// //import useAuth from "../services/authService";
// //const axios = require('axios');
// //console.log("axios default ",axios.defaults)
// import axios from 'axios';
// axios.defaults.headers.post['Content-Type'] = 'application/json';

// let store:any;

// export const injectStore = (_store:any) => {
//     store = _store;
// }
// console.log('store ',store);
// // axios.interceptors.request.use(async function (config:any) {
// //     console.log('API request ',store.getState());
// //     const authUser = store.getState().auth;
// //     console.log('API request auth user ',authUser);
// //     if( authUser.token)
// //     {
// //         config.headers.Authorization = 'Bearer '+ authUser.token;
// //     }
// //     return config;
// // },function(error:any){
// //     console.log("Axios interceptor error ",error);
// //     return error;
// // });

// export default axios;
