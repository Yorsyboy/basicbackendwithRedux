import { FaSignInAlt, FaSignOutAlt, FaUserAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function () {
  return (
    <header className="flex justify-between items-center mb-16 py-5 px-0 border-b">
      <div className="">
        <Link to="/" className="">
          Product{" "}
        </Link>
      </div>
      <ul className="flex items-center justify-between">
        <li className="ml-5">
          <Link to="/login" className="flex items-center space-x-1">
            <FaSignInAlt className="icon" />
            <span className="">Login</span>
          </Link>
        </li>
        <li className="ml-5">
          <Link to="/register" className="flex items-center space-x-1">
            <FaUserAlt className="" />
            <span className="">Register</span>
          </Link>
        </li>
      </ul>
    </header>
  );
}
