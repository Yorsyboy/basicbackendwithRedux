import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashbaord from "./pages/Dasboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./components/Header";

function App() {
  return (
    <div className="w-full text-center max-w-[960px] mx-auto my-0 p-5 ">
      <BrowserRouter>
        <Header/>
        <Routes>
            <Route path="/" element={<Dashbaord/>} />
            <Route path="login" element={<Login/>} />
            <Route path="register" element={<Register/>} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}

export default App;
