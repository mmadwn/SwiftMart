import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, increaseQuantity, decreaseQuantity } from './cartSlice'; // Import necessary actions
import PropTypes from 'prop-types';

function CartItem({ item }) {
    const dispatch = useDispatch();
    const allProducts = useSelector((state) => state.products.allProducts); // Get all products from the store
    const product = allProducts.find(p => p.id === item.id); // Find the product in the store

    const handleIncrease = () => {
        if (product && item.quantity < product.quantity) { // Check if we can increase the quantity
            dispatch(increaseQuantity(item.id)); // Dispatch action to increase quantity
        }
    };

    const handleDecrease = () => {
        if (item.quantity > 1) {
            dispatch(decreaseQuantity(item.id)); // Dispatch action to decrease quantity
        } else {
            dispatch(removeFromCart(item.id)); // Remove item if quantity is 1
        }
    };

    return (
        <div className="flex justify-between items-center p-4 border-b border-gray-300">
            <img src={item.image} alt={item.title} className="w-16 h-16 object-cover" />
            <div className="flex-grow ml-4">
                <p className="font-semibold text-gray-800">{item.title}</p>
                <p className="text-gray-600">${item.price}</p>
                <div className="flex items-center mt-2">
                    <button onClick={handleDecrease} className="bg-gray-300 text-gray-700 px-2 py-1 rounded-l">-</button>
                    <span className="mx-2">{item.quantity}</span>
                    <button 
                        onClick={handleIncrease} 
                        className={`bg-gray-300 text-gray-700 px-2 py-1 rounded-r ${product && item.quantity >= product.quantity ? 'opacity-50 cursor-not-allowed' : ''}`} 
                        disabled={product && item.quantity >= product.quantity} // Disable button if quantity exceeds available stock
                    >
                        +
                    </button>
                </div>
            </div>
            <button onClick={() => dispatch(removeFromCart(item.id))} className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600">
                Remove
            </button>
        </div>
    );
}

CartItem.propTypes = {
    item: PropTypes.object.zzisRequired,
};

export default CartItem;
