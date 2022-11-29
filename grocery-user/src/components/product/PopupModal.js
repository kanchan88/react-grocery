import PropTypes from "prop-types";
import React, { Fragment, useState, useEffect } from "react";
import { getProductCartQuantity } from "../../helpers/product";
import { Modal } from "react-bootstrap";
import { connect } from "react-redux";
import ShopProducts from '../../wrappers/product/ShopProducts';
import {partySuppliesData} from "../../data/product-section/AllProductsData";

function ProductModal(props) {
  const [layout, setLayout] = useState('grid three-column');
  const [products, setProducts] = useState([])

  const init = () =>{
    partySuppliesData().then(
      data =>{
          setProducts(data.data.data)
        }
        
      );
  };
    useEffect(() => {
      init();
    },[]);

  return (
    <Fragment>
      <Modal
        show={props.show}
        onHide={props.onHide}
        className="product-quickview-modal-wrapper"
      >
        <Modal.Header closeButton></Modal.Header>
        <div className="modal-body">
        <ShopProducts layout={layout} products={products}/>
         </div>
      </Modal>
    </Fragment>
  );
}

ProductModal.propTypes = {
  addtoast: PropTypes.func,
  addtocart: PropTypes.func,
  addtocompare: PropTypes.func,
  addtowishlist: PropTypes.func,
  cartitems: PropTypes.array,
  compareitem: PropTypes.object,
  currency: PropTypes.object,
  discountedprice: PropTypes.number,
  finaldiscountedprice: PropTypes.number,
  finalproductprice: PropTypes.number,
  onHide: PropTypes.func,
  show: PropTypes.bool,
  wishlistitem: PropTypes.object
};

const mapStateToProps = state => {
  return {
    cartitems: state.cartData
  };
};

export default connect(mapStateToProps)(ProductModal);
