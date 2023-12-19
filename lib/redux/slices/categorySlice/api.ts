import Category from "./category";


const URL  = 'http://localhost:4000/categories';
export const fetchAllCategory = async ()=>{
    const result = await fetch(URL);
    const categories = await  result.json();
    return categories;
}   


export const addCategoryApi = async(category:Category)=>{
    console.log("api",category);
    
    const result = await fetch(URL,{
        method : 'POST',
        headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
        body : JSON.stringify(category)
    });
    const categoryJson = await result.json();
    return categoryJson;
};

export const deleteCategoryApi = async(category:Category)=>{
    const result = await fetch(URL+`/${category._id}`,{
        method : 'DELETE',
        headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
        body : JSON.stringify(category)
    });
    const categoryJson = await  result.json();
    return categoryJson;
};