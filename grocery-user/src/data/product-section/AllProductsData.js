import axios from "axios";

const apiKey = process.env.REACT_APP_YK_API_KEY;
export const serverURL = 'http://127.0.0.1:8000';

export const getSectionData = async () => {
  try {
    return await axios.get(`${serverURL}/api/category`);
  } catch (error) {
    console.log(error);
  }
};

export const AllProductsData = async () => {
  try {
    return await axios.get(`${serverURL}/api/product`);
  } catch (error) {
    console.log(error);
  }
};


export const SingleProduct = async (id) => {
  try {
    return await axios.get(`${serverURL}/api/product/${id}`);
  } catch (error) {
    console.log(error);
  }
};

export const FeaturedProductsData = async () => {
  try {
    return await axios.get(`${serverURL}/api/category`);
  } catch (error) {
    console.log(error);
  }
};

export const HomeCategoryData = async () => {
  try {
      return await axios.get(`${serverURL}/api/category`);
    } catch (error) {
      console.log(error);
    }
};

export const ProductSearch = async (query) => {
  try {
      return await axios.get(`${serverURL}/api/search?search=${query}`);
    } catch (error) {
      console.log(error);
    }
};

export const ProductsByCategoryData = async (id) => {
  try {
    return await axios.get(`${serverURL}` + `products?category_id=${id}`);
  } catch (error) {
    console.log(error);
  }
};
