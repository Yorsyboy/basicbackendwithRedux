import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import CurrencyInput from "react-currency-input-field";
import { createProduct } from "../features/products/productSlice";

export default function ProductForm() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    imgUrl: "",
    quantity: "",
    isAvailable: true,
  });

  const { name, description, price, imgUrl, quantity, isAvailable } = formData;

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
    convertToBase64(e.target.files[0]).then((res) => {
      setFormData({ ...formData, imgUrl: res });
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createProduct({ ...formData, seller: user.user._id }));
    setFormData({
      name: "",
      description: "",
      price: "",
      imgUrl: "",
      quantity: "",
      isAvailable: true,
    });
  };

  const handleChange = (e) => {
    let boolean = null;
    if (e.target.value === "true") {
      boolean = true;
    }
    if (e.target.value === "false") {
      boolean = false;
    }

    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Product Name</label>
          <input
            onChange={handleChange}
            type="text"
            id="name"
            name="name"
            value={name}
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
            value={description}
            placeholder="Product Description"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Product price</label>
          <CurrencyInput
            id="price"
            name="price"
            value={price}
            placeholder="Product Price"
            defaultValue={1000}
            decimalsLimit={2}
            onChange={handleChange}
            min={100}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="img">Product image</label>
          <input
            onChange={uploadImg}
            id="img"
            name="img"
            type="file"
            accept="image/*"
            placeholder="Product Image"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="quantity">Product quantity</label>
          <input
            onChange={handleChange}
            type="number"
            id="quantity"
            name="quantity"
            value={quantity}
            min={1}
            placeholder="Product Quantity Available"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="isAvailable">In Stock</label>
          <select
            id="isAvailable"
            name="isAvailable"
            value={isAvailable}
            onChange={handleChange}
            required
          >
            <option value={true}>Yes</option>
            <option value={false}>No</option>
          </select>
        </div>
        <div className="form-group">
          <button
            type="submit"
            className="w-full mb-5 rounded text-white hover:text-black text-base font-bold cursor-pointer text-center flex items-center justify-center py-3 px-5 bg-black hover:bg-slate-300"
          >
            Submit
          </button>
        </div>
      </form>
    </section>
  );
}
