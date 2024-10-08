// Save and retrieve token from local storage for authentication
export const setToken = (token) => {
    localStorage.setItem('token', token);
};

export const getToken = () => {
    return localStorage.getItem('token');
};

export const removeToken = () => {
    localStorage.removeItem('token');
};

// Save and retrieve cart from local storage
export const setCart = (cartItems) => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
};

export const getCart = () => {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : []; // Return an empty array if cart is not found
};

export const clearCart = () => {
    localStorage.removeItem('cart');
};
