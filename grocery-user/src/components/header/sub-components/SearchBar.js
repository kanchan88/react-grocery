import React, { useEffect, useState } from "react";
import ReactTypingEffect from "react-typing-effect";
import { ProductSearch } from "../../../data/product-section/AllProductsData";
import SearchIcon from '@material-ui/icons/Search';
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

const SearchBar = () => {
  const [hideLabel, setHideLabel] = React.useState(false);
  const onClick = () => { 
    setHideLabel(true);
   };

  const history = useHistory();

  const [searches, setSearches] = useState([]);
  const [showResult, setShowResult] = useState(false);

  const makeSearch = (event) => {
    if(event.target.value.length>2){
      setShowResult(true);
      init(event.target.value);
    }
    if(event.target.value<3){
      setShowResult(false);
    }
  }

  const init = (query) => {
    console.log(query);
    ProductSearch(query).then((data) => {
      setSearches(data.data);
    });
  };

  return (
    <div className="container">
    <div className="pro-sidebar-search">
      <form className="pro-sidebar-search-form" action="#">
        <input type="text" onClick={onClick} style={{borderRadius:'100px'}} onChange={makeSearch}/>
        {hideLabel ? null : (
          <label>
              <ReactTypingEffect
                text={["Best Cakes for Birthday", "Gift Ideas for Girlfriend"]}
              />
          </label>
        )}

        <button className="button-search">
          <i className="pe-7s-search" />
        </button>
      </form>
    </div>
    <div className="pl-20">
    {showResult?
    (
      <ul className="list-group ml-20 mt-10" style={{alignItems:'start', width:'90%', backgroundColor:'white', overflow: 'auto', position: 'absolute',  zIndex: '999999', left:'10px'}}>
      {searches.map((product) => {
        return (
          <div>
            <li className="mr-100" style={{position:'relative'}}>
              <i className="mr-30">{' '}<SearchIcon className="ml-15" fontSize='small'/></i>
              <Link onClick={() => {window.location.href=`/products/${product.id}/${product.slug}`}}>
                <span style={{fontSize:'14px'}} className="mr-50">{product.name}</span>
              </Link>
              <img className="responsive-img ml-100" src={product.images[0].image} height="30px"/>
            </li>
            <hr className="mt-2 mb-2"/>
          </div>
          );
      })}
      </ul>
    ):
    (" ")}
    </div>
    </div>
  );
};

export default SearchBar;
