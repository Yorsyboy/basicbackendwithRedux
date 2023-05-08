import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import { getProduct, reset } from "../features/products/productSlice";
import Products from "../components/Products";

export default function Home() {
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

    dispatch(getProduct());

    return () => {
      dispatch(reset());
    };
  }, [ dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  {console.log(products)}

  return (
    <div>
      <section>
        <h1>welcome {user && user.user.name}</h1>
        <p>Products</p>
      </section>
      <section className="content">
        {products.length > 0 ? (
          <div>
            {products?.map((product) => (
              <Products key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <h3>No Products</h3>
        )}
      </section>
    </div>
  );
}
