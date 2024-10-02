import { Navigate } from "react-router-dom";
import { getToken } from "../utils/localStorage";
import PropTypes from 'prop-types';

const ProtectedRoute = ({ children }) => {
  const token = getToken();
  if (!token) {
    return <Navigate to="/auth/login" replace />; // Redirect to /auth/login if not logged in
  }
  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
