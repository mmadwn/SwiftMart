import { useDispatch } from 'react-redux';
import { loginSuccess } from './authSlice'; // Ensure this action is imported
import { loginUser } from '../../utils/api'; // Import the loginUser function
import { setToken } from '../../utils/localStorage'; // Import local storage functions
import { useState } from 'react';

function LoginPage() {
    const dispatch = useDispatch();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false); // Add loading state

    const handleLogin = async (e) => {
        e.preventDefault(); // Prevent default form submission
        setError(''); // Reset error message
        setLoading(true); // Set loading to true

        try {
            const data = await loginUser(username, password);
            if (data.token) {
                setToken(data.token); // Use the utility function to set the token
                dispatch(loginSuccess({ token: data.token })); // Update Redux state
                // Redirect to the desired page after login
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
        <div className="justify-center items-center h-screen">
            <form onSubmit={handleLogin}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit" disabled={loading}>Login</button>
                {loading && <p>Loading...</p>} {/* Show loader */}
                {error && <p className="error">{error}</p>} {/* Display error message */}
            </form>
        </div>
    );
}

export default LoginPage;