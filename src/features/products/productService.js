import axios from "axios";

const API_URL = "https://basicbackend-aco6.onrender.com/";
// https://basicbackend-aco6.onrender.com/

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

//get token from local storage
const getToken = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    return user.token;
}
const token = getToken();
console.log('Token:', token);

// Update product
// const updateProduct = async (id, productData, token) => {
//     try {
//         const config = {
//             headers: {
//                 Authorization: `Bearer ${productData}`,
//             },
//         };

//         console.log('Token:', token);
//         console.log('ID:', id);
//         console.log('Product Data:', productData);
//         console.log('Config:', config);

//         const response = await axios.put(API_URL + `products/${id}`, productData, config);

//         console.log('Response:', response.data);

//         return response.data;
//     } catch (error) {
//         console.error('Update Product Error:', error);
//         throw error;
//     }
// };


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
    updateProduct
}

export default productService;