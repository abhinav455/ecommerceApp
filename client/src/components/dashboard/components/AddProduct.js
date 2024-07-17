import React, { useState } from "react";
import Input from "../../general/Input";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { message } from "antd";
import { addProduct } from "../../../actions/productAction";

const AddProduct = (props) =>  {
  
  
    const initialState = {
      name: "",
      description: "",
      price: "",
      brand: "",
      quantity: "",
      category: "",
    };

  let [{name, description, price, brand, quantity, category}, setState] = useState(initialState);
  let navigate = useNavigate();

  const onChange = (e) => {
    setState({ name, description, price, brand, quantity, category, [e.target.name]: e.target.value });
  };

  const onSubmit = () => {
    const newProduct = {
      name,
      description,
      price,
      brand,
      quantity,
      category,
    };
    if (name.length <= 0) {
      return message.error("name field is required");
    }
    if (description.length <= 0) {
      return message.error("description field is required");
    }

    props.addProduct(newProduct, navigate);
  };


    return (
      <div style={{ textAlign: "center" }}>
        <h1>Add product</h1>
        <Input
          type="text"
          placeholder="name of product"
          name="name"
          value={name}
          onChange={onChange}
          style={{ width: "360px", height: "35px" }}
        />
        <Input
          type="text"
          placeholder="Give a brief description of product"
          name="description"
          value={description}
          onChange={onChange}
          style={{ width: "360px", height: "35px" }}
        />
        <Input
          type="number"
          placeholder="Enter the price of this product"
          name="price"
          value={price}
          onChange={onChange}
          style={{ width: "360px", height: "35px" }}
        />
        <Input
          type="text"
          placeholder="Enter the brand of this product"
          name="brand"
          value={brand}
          onChange={onChange}
          style={{ width: "360px", height: "35px" }}
        />
        <Input
          type="number"
          placeholder="Enter quantity"
          name="quantity"
          value={quantity}
          onChange={onChange}
          style={{ width: "360px", height: "35px" }}
        />
        <div className="form-group">
          <select
            style={{ width: "360px", height: "35px" }}
            name="category"
            value={category}
            onChange={onChange}
          >
            <option value="0"> Select a category for this product</option>
            <option value="Clothing"> Clothing</option>
            <option value="Electronics"> Electronics</option>
            <option value="Office Supply"> Office Supply</option>
            <option value="Automotive Supply"> Automotive Supply</option>
            <option value="Cosmetics"> Cosmetics</option>
          </select>
        </div>
        <button className="btn btn-primary" onClick={onSubmit}>
          Submit
        </button>
      </div>
    );
  
}

const mapStateToProps = (state) => ({
  products: state.products,
});

export default connect(mapStateToProps, { addProduct })(AddProduct);
