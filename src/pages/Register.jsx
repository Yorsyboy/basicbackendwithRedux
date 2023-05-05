import { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    imgUrl: "",
  });

  const { name, email, password, confirmPassword, imgUrl } = formData;

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

  const handleChange = (e) => {
    setFormData((prevStatee) => ({
      ...prevStatee,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <>
      <section className="text-3xl font-bold mb-12 py-0 px-5">
        <h1 className="flex items-center justify-center">
          <FaUser className="mr-1" /> Register
        </h1>
        <p className="text-gray-600">Create an Account</p>
      </section>

      <section className="mx-auto my-0 w-[70%]">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={name}
              placeholder="Enter your name"
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={email}
              placeholder="Enter your email"
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={password}
              placeholder="Enter your password"
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              placeholder="Confirm password"
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              onChange={uploadImg}
              name="imgUrl"
              type="file"
              accept="image/*"
              placeholder="Please upload a picture of you"
              required
            />
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
    </>
  );
}
