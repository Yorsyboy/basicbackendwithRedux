import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import CurrencyInput from "react-currency-input-field";
import ProductForm from "../components/ProductForm";
import Spinner from "../components/Spinner";
import {
  getProductByUser,
  updateProduct,
  reset,
} from "../features/products/productSlice";
import Products from "../components/Products";

export default function UpdateProduct() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { products, isLoading, isError, message } = useSelector(
    (state) => state.products
  );

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    imgUrl: "",
    quantity: "",
    isAvailable: true,
  });

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    dispatch(getProductByUser(user.user._id));
  }, [dispatch, isError, message, user]);

  const handleSubmit = (e, productId) => {
    e.preventDefault();
    dispatch(updateProduct({ ...formData, seller: user.user._id }, productId));
    setFormData({
      name: "",
      description: "",
      price: "",
      imgUrl: "",
      quantity: "",
      isAvailable: true,
    });
  };

  if (isLoading) {
    return <Spinner />;
  }

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const uploadImg = (e) => {
    if (e.target.files[0]) {
      convertToBase64(e.target.files[0]).then((res) => {
        setFormData({ ...formData, imgUrl: res });
      });
    }
  };

  const handleChange = (e) => {
    let boolean = null;
    if (e.target.value === "true") {
      boolean = true;
    }
    if (e.target.value === "false") {
      boolean = false;
    }

    setFormData({ ...formData, [e.target.name]: boolean ?? e.target.value });
  };

  return (
    <div>
      <section>
        <h1>welcome {user && user.user.name}</h1>
        <p>Update Product</p>
      </section>
      <section className="content">
        {products?.map((product) => (
          <Products key={product._id} product={product} />
        ))}
      </section>

      <section>
        {products?.map((product) => (
          <form
            key={product._id}
            onSubmit={(e) => handleSubmit(e, product._id)}
          >
            <div className="form-group">
              <label htmlFor="name">Product Name</label>
              <input
                onChange={handleChange}
                type="text"
                id="name"
                name="name"
                value={formData.name || product.name}
                placeholder="Enter Product Name"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Product Description</label>
              <input
                onChange={handleChange}
                type="text"
                id="description"
                name="description"
                value={formData.description || product.description}
                placeholder="Enter Product Description"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="price">Product Price</label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price || product.price}
                placeholder="Product Price"
                aria-label="Product Price"
                onChange={handleChange}
                min={100}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="quantity">Product Quantity</label>
              <input
                onChange={handleChange}
                type="number"
                id="quantity"
                name="quantity"
                value={formData.quantity || product.quantity}
                placeholder="Enter Product Quantity"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="imgUrl">Product Image</label>
              <input
                onChange={uploadImg}
                type="file"
                id="imgUrl"
                name="imgUrl"
                placeholder="Enter Product Image"
              />
            </div>
            <div className="form-group">
              <label htmlFor="isAvailable">Product Availability</label>
              <select
                onChange={handleChange}
                id="isAvailable"
                name="isAvailable"
                value={formData.isAvailable || product.isAvailable}
                required
              >
                <option value="true">Available</option>
                <option value="false">Not Available</option>
              </select>
            </div>
            <button type="submit">Update Product</button>
          </form>
        ))}
      </section>
    </div>
  );
}
