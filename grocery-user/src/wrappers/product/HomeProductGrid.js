import PropTypes from "prop-types";
import React, { Fragment, useState, useEffect } from "react";
import ProductGridHome from "./ProductGridHome";
import { Card, Container, Row, Col } from 'reactstrap';
import { HomeCategoryData } from "../../data/product-section/AllProductsData";


const HomeProductGrid = ({ limit }) => {
  const [categories, setCategories] = useState([]);

  const init = () => {
    HomeCategoryData().then((data) => {
      setCategories(data.data);
    });
  };
  useEffect(() => {
    init();
  }, []);
  return (
    <div>
      <div><center><h4>Shop by Category</h4></center></div>
      <Container>
      <Row>
        {categories.map((category) => {
        return (
                <Col md={3} xs={6} style={{padding: '5px'}}>
                  <Card body>
                    <img className="responsive-img" src={category.images} height="150px"/>
                    <div><center><h5>{category.name}</h5></center></div>
                  </Card>
                </Col>
          );
        })}
       </Row>
      </Container>
    </div>
  );
};

export default HomeProductGrid;
