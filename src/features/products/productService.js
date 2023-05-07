import axios from "axios";

const API_URL = "http://localhost:5000/";

// Create a new product
const createProduct = async (productData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            
        }
    }

    const response = await axios.post(API_URL + "products", productData, config);

    return response.data;
}

// Get all product
const getProduct = async (token) => {

    const response = await axios.get(API_URL + "products");

    return response.data;
}

//Get product by user
const getProductByUser = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            
        }
    }

    const response = await axios.get(API_URL + "products/:id", config);

    return response.data;
}

//Delete product
const deleteProduct = async (id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            
        }
    }

    // const productID = new ObjectId(id);

    const response = await axios.delete(API_URL + `products/${id}`, config);

    return response.data;
}

const productService = {
    createProduct,
    getProduct,
    getProductByUser,
    deleteProduct,
}

export default productService;