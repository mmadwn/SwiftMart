import { Link } from "react-router-dom";
import { LuUser } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { useState } from 'react';
import { logout } from '../../features/auth/authSlice';

function AdditionalNav() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dispatch = useDispatch();
  
  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="flex justify-end px-14 py-2 font-semibold">
      <ul className="flex items-center gap-4 text-xs">
        <li>
          <Link to="/" className="text-sm">Help</Link>
        </li>
        <li>
          <Link to="/" className="text-sm">Join Us</Link>
        </li>
        {isAuthenticated ? (
          <li className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="text-sm flex items-center"
            >
              <LuUser className="inline-block text-lg mr-1" />
              Mock User
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  My Profile
                </Link>
                <Link
                  to="/orders"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  My Orders
                </Link>
                <Link
                  to="/wishlist"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Wishlist
                </Link>
                <Link
                  to="/settings"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Settings
                </Link>
                <Link
                  to="/help"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Help Center
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </li>
        ) : (
          <li>
            <Link to="/auth" className="text-sm flex items-center">
              <LuUser className="inline-block text-lg mr-1" />
              Login
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
}

export default AdditionalNav;