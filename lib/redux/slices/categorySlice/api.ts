import Category from "./category";
import axios from "@/app/setting/our_axios";
import {API_URL} from "@/app/setting/API";
//const axios = require('axios');

const URL  = 'http://localhost:4000/categories';


export const fetchAllCategory = async ()=>{


   console.log("api fetch");
   
   const result = await axios.get(API_URL+"/categories");
  // let result = await fetch(URL) 
  console.log(result);
  
   const categories = await  result.data;
    return categories;
}   


export const addCategoryApi = async(category:Category)=>{

    
    const result = await axios.post(API_URL+"/categories",category);
    // const result = await fetch(URL,{
    //     method : 'POST',
    //     headers: {
    //         "Content-Type": "application/json",
    //         // 'Content-Type': 'application/x-www-form-urlencoded',
    //       },
    //     body : JSON.stringify(category)
    // });
    const categoryJson = await result.data;
    return categoryJson;
};

export const updateCategoryApi = async(category:Category) =>{
    console.log("api",category);
    const result = await axios.put(API_URL+`/categories/${category._id}`,category)
    const categoryJson = await  result.data;
    return categoryJson;

}  

export const deleteCategoryApi = async(category:Category)=>{
    console.log("api delete");
    
    const result = await axios.delete(API_URL+`/categories/${category._id}`)
    const categoryJson = await  result.data;
    return categoryJson;
   
   
    // const result = await fetch(URL+`/${category._id}`,{
    //     method : 'DELETE',
    //     headers: {
    //         "Content-Type": "application/json",
    //         // 'Content-Type': 'application/x-www-form-urlencoded',
    //       },
    //     body : JSON.stringify(category)
    // });
  
};