import { useSelector, useDispatch } from 'react-redux';
import CartItem from './CartItem';
import { clearCart, updateProductQuantities } from './cartSlice';
import { FaShoppingCart } from 'react-icons/fa';

function CartPage() {
    const dispatch = useDispatch();
    const items = useSelector((state) => state.cart.items);

    const handleCheckout = () => {
        // Dispatch the action to update product quantities based on the cart items
        dispatch(updateProductQuantities(items)); // Pass the items in the cart to update their quantities
        dispatch(clearCart()); // Clear the cart after updating quantities
    };

    const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <div className="bg-white p-8 rounded-lg border-2 border-black max-w-4xl mx-auto my-8">
            <h2 className="text-center text-3xl font-bold mb-8 text-black flex items-center justify-center">
                <FaShoppingCart className="mr-3" />
                Your Cart
            </h2>
            {items.length === 0 ? (
                <p className="text-center text-gray-700 text-lg">Your cart is empty.</p>
            ) : (
                <div className="space-y-6">
                    {items.map(item => (
                        <CartItem key={item.id} item={item} />
                    ))}
                    <div className="border-t border-black pt-4">
                        <p className="text-right text-xl font-semibold text-black">
                            Total: ${totalPrice.toFixed(2)}
                        </p>
                    </div>
                </div>
            )}
            {items.length > 0 && (
                <div className="text-center mt-8">
                    <button 
                        onClick={handleCheckout} 
                        className="bg-black text-white py-3 px-8 rounded-full text-lg font-semibold hover:bg-gray-800 transition duration-300 ease-in-out transform hover:scale-105"
                    >
                        Proceed to Checkout
                    </button>
                </div>
            )}
        </div>
    );
}

export default CartPage;
