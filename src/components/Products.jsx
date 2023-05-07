import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteProduct } from "../features/products/productSlice";
import { Link } from "react-router-dom";

export default function Products({ product }) {
  const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);

  const handleDelete = () => {
    dispatch(deleteProduct(product._id));
  };

  return (
    <div className="goal">
      <div>{new Date(product.createdAt).toLocaleString("en-US")}</div>
      <div key={product._id}>
        <h2>{product.name}</h2>
        <img src={product.imgUrl} alt="" srcset="" />
        <p>{product.description}</p>
        <p>{product.quantity}</p>
        <p>{product.isAvailable === true ? "Yes" : "No"}</p>
        {/* {product.user} {user?.user._id}
      {user?.user._id === product._id ? (
        <button>cant delete</button>
      ): (
        <button>can delete</button>
      )} */}
      <button onClick={handleDelete} className="close">x</button>
      </div>
    </div>
  );
}
