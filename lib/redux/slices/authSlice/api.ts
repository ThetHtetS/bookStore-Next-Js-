import {API_URL} from "@/app/setting/API";
import axios from "axios";


export const login = async (user:any)=>{
    const result = await axios.post(API_URL+'/users/login',user);
    const userResponse = await  result;
    return userResponse;
}


export const register = async (user:any)=>{
  const result = await axios.post(API_URL+'/users',user);
  const userResponse = await result;
  return userResponse;
}


export const getAllUser= async()=>{
  const result = await axios.get(API_URL+`/users`);
  const userResponse = await result.data;
  return userResponse;
}

export const getUserById= async(Uid:string)=>{
  const result = await axios.get(API_URL+`/users/${Uid}`);
  const userResponse = await result;
  return userResponse;
}

export const getLengthApi = async ()=>{
  const result = await axios.get(API_URL+`/users/length`);
  const userResponse = await result.data;
  return userResponse;
}