import { FaSignInAlt, FaSignOutAlt, FaUserAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { reset, logout } from "../features/auth/authSlice";

export default function () {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  return (
    <header className="flex justify-between items-center mb-16 py-5 px-0 border-b">
      <div className="">
        <Link to="/" className="">
          Product{" "}
        </Link>
      </div>
      <ul className="flex items-center justify-between">
        {user ? (
          <li className="ml-5">
            <button onClick={onLogout}  className="flex items-center space-x-1">
              <FaSignOutAlt className="" />Logout
            </button>
          </li>
        ) : (
          <>
            <li className="ml-5">
              <Link to="/login" className="flex items-center space-x-1">
                <FaSignInAlt className="" />
                <span className="">Login</span>
              </Link>
            </li>
            <li className="ml-5">
              <Link to="/register" className="flex items-center space-x-1">
                <FaUserAlt className="" />
                <span className="">Register</span>
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  );
}
