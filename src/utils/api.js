import axios from 'axios';

// Function to log in a user
export const loginUser = async (username, password) => {
    const response = await axios.post('https://fakestoreapi.com/auth/login', {
        username,
        password,
    });
    return response.data; // Return the data directly
};

// Function to fetch all products
export const fetchProducts = async () => {
    const url = 'https://fakestoreapi.com/products';
    const response = await axios.get(url);
    return response.data; // Return the data directly
};