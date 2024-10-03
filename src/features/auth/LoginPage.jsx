import { useDispatch } from 'react-redux';
import { loginSuccess } from './authSlice'; 
import { loginUser } from '../../utils/api'; 
import { setToken } from '../../utils/localStorage'; 
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate(); 
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false); 

    const handleLogin = async (e) => {
        e.preventDefault(); // Prevent default form submission
        setError(''); // Reset error message
        setLoading(true); // Set loading to true

        try {
            const data = await loginUser(username, password);
            if (data.token) {
                setToken(data.token); // Use the utility function to set the token
                dispatch(loginSuccess({ token: data.token, user: { username } })); // Update Redux state
                navigate("/cart"); // Redirect to CartPage after successful login
            } else {
                setError('Login failed. Please check your credentials.'); // Set error message
            }
        } catch (error) {
            setError(error.message); // Handle error appropriately
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white p-6 rounded shadow-md w-96">
                <h2 className="text-center text-2xl font-bold mb-4">Login</h2>
                <form onSubmit={handleLogin}>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        className="border p-2 mb-4 w-full focus:border-black"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="border p-2 mb-4 w-full hover:border-black focus:border-black"
                    />
                    <button type="submit" disabled={loading} className="bg-transparent text-blue-950 border border-blue-950 p-2 rounded w-full">
                        {loading ? 'Loading...' : 'Login'}
                    </button>
                    {error && <p className="text-red-500 text-center mt-2">{error}</p>} {/* Display error message */}
                </form>
            </div>
        </div>
    );
}

export default LoginPage;