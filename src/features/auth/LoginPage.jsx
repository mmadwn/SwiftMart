import { useDispatch, useSelector } from 'react-redux';
import { loginUserAsync, resetError } from './authSlice';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Spinner from '../../components/common/Spinner'; 

function LoginPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const error = useSelector((state) => state.auth.error);
    const loading = useSelector((state) => state.auth.loading);
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    const handleLogin = async (e) => {
        e.preventDefault();
        dispatch(loginUserAsync({ username, password }));
    };

    const handleInputChange = (e) => {
        if (error) {
            dispatch(resetError());
        }
        if (e.target.name === 'username') {
            setUsername(e.target.value);
        } else {
            setPassword(e.target.value);
        }
    };

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/cart");
        }
        // Reset error when component mounts or unmounts
        return () => {
            dispatch(resetError());
        };
    }, [isAuthenticated, navigate, dispatch]);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <Spinner message="Logging in..." /> 
            </div>
        );
    } 

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white p-6 rounded shadow-md w-96">
                <h2 className="text-center text-2xl font-bold mb-4">Login</h2>
                <form onSubmit={handleLogin}>
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={username}
                        onChange={handleInputChange}
                        required
                        className="border p-2 mb-4 w-full focus:border-black"
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={password}
                        onChange={handleInputChange}
                        required
                        className="border p-2 mb-4 w-full hover:border-black focus:border-black"
                    />
                    <button type="submit" disabled={loading} className="bg-transparent text-blue-950 border border-blue-950 p-2 rounded w-full">
                        {loading ? 'Loading...' : 'Login'}
                    </button>
                    {error && <p className="text-red-500 text-center mt-2">Invalid username or password. Please try again.</p>}
                </form>
            </div>
        </div>
    );
}

export default LoginPage;