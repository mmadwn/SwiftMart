export const setToken = (token) => {
    localStorage.setItem('token', token);
};

export const getToken = () => {
    return localStorage.getItem('token');
};


export const removeToken = () => {
    localStorage.removeItem('token');
};

// Remove cart management functions
// export const setCart = (cartItems) => {
//     localStorage.setItem('cart', JSON.stringify(cartItems));
// };

// export const getCart = () => {
//     const cart = localStorage.getItem('cart');
//     return cart ? JSON.parse(cart) : []; // Return an empty array if cart is not found
// };

// export const clearCart = () => {
//     localStorage.removeItem('cart');
// };
