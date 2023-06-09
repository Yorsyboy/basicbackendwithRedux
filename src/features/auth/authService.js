import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const API_URL = "https://basicbackend-aco6.onrender.com/";

// Register a new user
const register = async (userData) => {
    const response = await axios.post(API_URL + "users/register", userData);
    
    if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
    }

    return response.data;
}

//Login a user
const login = async (userData) => {
    const response = await axios.post(API_URL + "users/login", userData);
    
    if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
    }

    return response.data;
}

//Logout user
const logout = () => {
    localStorage.removeItem("user");
}

const authService = {
    register,
    login,
    logout
}

export default authService;