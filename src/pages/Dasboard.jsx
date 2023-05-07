import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import ProductForm from "../components/ProductForm";
import Spinner from "../components/Spinner";
import { getProductByUser, reset } from "../features/products/productSlice";
import Products from "../components/Products";

export default function Dasboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { products, isLoading, isError, message } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) {
      toast("Login to access this page");
      navigate("/login");
    }

    dispatch(getProductByUser());

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  // {
  //   console.log(products);
  //   console.log(user, {
  //     test: user.user._id,

  //   })
  // }

  return (
    <>
      <section className="heading">
        <h1>welcome {user && user.user.name}</h1>
        <p>My Products</p>
      </section>
      <section className="content">
        {products.length > 0 ? (
          <div>
            {products.map((product) => (
              <Products key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <h3>No Products</h3>
        )}
      </section>
      <ProductForm />
    </>
  );
}
