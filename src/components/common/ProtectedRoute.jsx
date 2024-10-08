import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux"; // Import useSelector
import PropTypes from 'prop-types';

const ProtectedRoute = ({ children }) => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated); // Get authentication status from Redux

    if (!isAuthenticated) {
        return <Navigate to="/auth" />; // Redirect to /auth if not logged in
    }
    return children;
};

ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
