import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { multilanguage } from "redux-multilanguage";
import axios from 'axios';

const apiKey =process.env.REACT_APP_YK_API_KEY 
const serverURL = process.env.REACT_APP_SERVER_URL

const CategoryMenu = ({ data, strings }) => {
  const url = data;

  const [categories, setCategories] = useState([])
  const getCategory = async () => {
    try {
      const data = await axios.get(`${url}`, {
        headers: {
          'yourkoseli-api-key': `${apiKey}`
        }
      });
      setCategories(data.data.data);
    } catch (error) {
      console.log(error)
    }
  };
  useEffect(() => {
    getCategory();
  }, []);

  return (
    <div>
      <nav>
        <ul>
        {categories.map((category, key) => (
                <li key={key}>
                  <Link to={process.env.PUBLIC_URL + "/"}>
                    {category.name}
                  </Link>
                </li>
              ))}
          </ul>
      </nav>
    </div>
  );
};

CategoryMenu.propTypes = {
  strings: PropTypes.object
};

export default multilanguage(CategoryMenu);
