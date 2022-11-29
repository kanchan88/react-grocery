import React, { Fragment, useState, useEffect } from "react";
import { Card, Container, Row, Col } from 'reactstrap';
import { AllProductsData } from "../../data/product-section/AllProductsData";
import { Link } from "react-router-dom";

const HomePageProductGrid = ({ limit }) => {
  const [products, setProducts] = useState([]);

  const init = () => {
    AllProductsData().then((data) => {
      setProducts(data.data);
    });
  };
  useEffect(() => {
    init();
  }, []);
  
  return (
      <div>
        <div>
          <div>
            <center><h4>Best Selling Product</h4></center>
          </div>
          <Container>
          <Row>
            {products.map((product) => {
            return (
                    <Col md={3} xs={6} style={{padding: '5px'}}>
                        <Card body> 
                        <img className="responsive-img" src={product.images[0].image} height="150px"/>
                        <div><center><h5>{product.name}</h5></center></div>
                        </Card>
                    </Col>
              );
            })}
          </Row>
          </Container>
        </div>
        <div>
          <div>
            <center><h4>Best Selling Product</h4></center>
          </div>
          <Container>
          <Row>
            {products.map((product) => {
            return (
                    <Col md={3} xs={6} style={{padding: '5px'}}>
                        <Card body> 
                        <img className="responsive-img" src={product.images[0].image} height="150px"/>
                        <Link to={`/products/${product.id}/${product.slug}`}><div><center><h5>{product.name}</h5></center></div></Link>
                        </Card>
                    </Col>
              );
            })}
          </Row>
          </Container>
        </div>
        <div>
          <div>
            <center><h4>Best Selling Product</h4></center>
          </div>
          <Container>
          <Row>
            {products.map((product) => {
            return (
                    <Col md={3} xs={6} style={{padding: '5px'}}>
                        <Card body> 
                        <img className="responsive-img" src={product.images[0].image} height="150px"/>
                        <div><center><h5>{product.name}</h5></center></div>
                        </Card>
                    </Col>
              );
            })}
          </Row>
          </Container>
        </div>
      </div>
  );
};

export default HomePageProductGrid;
