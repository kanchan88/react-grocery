import PropTypes from "prop-types";
import React, { useEffect, useState, Fragment } from "react";
import MetaTags from "react-meta-tags";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { connect } from "react-redux";
import Frontlayout from "../../layouts/Frontlayout";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import ProductDescriptionTab from "../../wrappers/product/ProductDescriptionTab";
import ProductImageDescription from "../../wrappers/product/ProductImageDescription";
import { SingleProduct } from "../../data/product-section/AllProductsData";

const Product = (props) => {
  const { pathname } = props.location;
  const [product, setProduct] = useState([]);
  const [error, setError] = useState(false);
  const [id, setId] = useState([]);

  const loadSingleProduct = (id) => {
    SingleProduct(id).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProduct(data.data);
      }
    });
  };


  useEffect(() => {
    const ids = props.match.params.id
    loadSingleProduct(ids);
  }, []);
  return (
    <Fragment>
      <MetaTags>
        <title>{product.seo_meta_title}: Buy Online at Best Price in Nepal from Alpha Grocery</title>
        <meta name="description" content={product.seo_meta_description} />
      </MetaTags>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}><span style={{fontSize:'12px',marginLeft:'-10px', marginRight:'-10px'}}>HOME</span></BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/shop"}>
      <span style={{fontSize:'12px', paddingRight:'-10px', marginRight:'-10px', marginLeft:'-10px',}}>SHOP</span>
      </BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        <span style={{fontSize:'12px', marginRight:'-10px', marginLeft:'-10px'}}>{product.name}</span>
      </BreadcrumbsItem>
      <Frontlayout headerTop="visible">
        <Breadcrumb/>
        <ProductImageDescription
          spaceTopClass="pt-20"
          spaceBottomClass="pb-100"
          product={product}
        />

        {/* product description tab */}
        <ProductDescriptionTab spaceBottomClass="pb-90" product={product} />
      </Frontlayout>
    </Fragment>
  );
};

Product.propTypes = {
  location: PropTypes.object,
};

const mapStateToProps = (state, ownProps) => {
  const itemId = ownProps.match.params.id;
  return {
    product: state.productData.products.filter(
      (single) => single.id === itemId
    )[0],
  };
};

export default connect(mapStateToProps)(Product);
