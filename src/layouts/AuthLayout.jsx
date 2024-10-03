import { Outlet, Navigate } from "react-router-dom"; // Import Navigate for redirection
import { useSelector } from "react-redux"; // Import useSelector to access Redux state
import AuthHead from "../components/Header/AuthHead";

function AuthLayout() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated); // Get authentication status from Redux

  // If the user is authenticated, redirect to the cart page
  if (isAuthenticated) {
    return <Navigate to="/cart" />;
  }

  return (
    <div>
      <AuthHead />
      <Outlet />
    </div>
  );
}

export default AuthLayout;