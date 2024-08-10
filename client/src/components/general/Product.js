import React from "react";
import { Card, Button } from 'antd';
import propTypes from "prop-types";
import {Link} from "react-router-dom";

const {Meta} = Card;

const Product = ({product, description, link, uploadImages, showBtn}) => {
  return (
   <div style={{padding: "10px", width: 310}}>
    <Link to={link || ""}>
        <Card
            hoverable
            style={{
            width: 300,
            }}
            cover={
            <img
                alt="example"
                src={product.thumbnail}
            />
            }
        >
            <Meta title={product.name} description={description}/>
            {showBtn && <Link className="btn btn-primary" to={uploadImages} >Add Images</Link>}
        </Card>
    </Link> 
   </div>  
 );
};

Product.propTypes = {
    product: propTypes.object.isRequired,
    description: propTypes.object.isRequired,
    //buttonName: propTypes.string,
}

export default Product;
