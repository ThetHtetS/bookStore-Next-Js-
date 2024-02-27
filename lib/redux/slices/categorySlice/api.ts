import Category from './category';
import axios from '@/app/setting/our_axios';
import { API_URL } from '@/app/setting/API';

export const getCategoriesApi = async () => {
  const result = await axios.get(`${API_URL}/categories`);
  const categories = await result.data.categories;
  console.log(result.data);
  return categories;
};

export const addCategoryApi = async (category: Category) => {
  const result = await axios.post(`${API_URL}/categories`, category);
  // const result = await fetch(URL,{
  //     method : 'POST',
  //     headers: {
  //         "Content-Type": "application/json",
  //         // 'Content-Type': 'application/x-www-form-urlencoded',
  //       },
  //     body : JSON.stringify(category)
  // });
  const categoryJson = await result.data.category;

  return categoryJson;
};

export const updateCategoryApi = async (category: Category) => {
  const result = await axios.put(
    `${API_URL}/categories/${category._id}`,
    category,
  );
  const categoryJson = await result.data.category;
  return categoryJson;
};

export const deleteCategoryApi = async (category: Category) => {
  const result = await axios.delete(`${API_URL}/categories/${category._id}`);
  const categoryJson = await result.data.category;
  return categoryJson;
};
