import { useState, useEffect } from "react";
import { FaSignInAlt } from "react-icons/fa";
import {useSelector, useDispatch} from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {  loginUser , reset } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setFormData((prevStatee) => ({
      ...prevStatee,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email,
      password,
    };

    dispatch(loginUser(userData));
  };

  useEffect(() => {
    if(isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      toast.success("Login successful");
      navigate("/");
    }

    dispatch(reset());
      
  }, [user, navigate, isError, isSuccess, message, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className="text-3xl font-bold mb-12 py-0 px-5">
        <h1 className="flex items-center justify-center">
          <FaSignInAlt className="mr-1" /> Login
        </h1>
        {/* <p className="text-gray-600">Create an Account</p> */}
      </section>

      <section className="mx-auto my-0 w-[70%]">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={email}
              placeholder="Enter your email"
              onChange={handleChange}
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
