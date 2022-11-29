import axios from 'axios';
import { serverURL } from '../product-section/AllProductsData';

export const getSliderData = async () => {
    try{
      console.log(await axios.get(`${serverURL}/api/offer`));
     return await axios.get(`${serverURL}/api/offer`);
    }catch(error){
      console.log(error)
    }
  };