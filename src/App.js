import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Dashbaord from "./pages/Dasboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./components/Header";
import Home from "./pages/Home";
import UpdateProduct from "./pages/UpdateProduct";

function App() {
  return (
    <div className="w-full text-center max-w-[960px] mx-auto my-0 lg:max-w-7xl p-5 ">
      <BrowserRouter>
        <Header/>
        <Routes>
            <Route path="" element={<Home/>} />
            <Route path="dashboard" element={<Dashbaord/>} />
            <Route path="update/:id" element={<UpdateProduct/>} />
            <Route path="login" element={<Login/>} />
            <Route path="register" element={<Register/>} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}

export default App;
