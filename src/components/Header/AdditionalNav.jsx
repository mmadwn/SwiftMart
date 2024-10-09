import { Link } from "react-router-dom";
import { LuUser } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { useState, useRef, useEffect } from 'react';
import { logout } from '../../features/auth/authSlice';

function AdditionalNav() {
  // Get authentication status from Redux store
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  
  // State to control dropdown visibility
  const [dropdownOpen, setDropdownOpen] = useState(false);
  
  const dispatch = useDispatch();
  
  // Refs for dropdown and button elements
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);
  
  /**
   * Handles user logout
   */
  const handleLogout = () => {
    dispatch(logout());
  };

  /**
   * Effect to handle hover behavior for user dropdown
   */
  useEffect(() => {
    // This function handles mouse movement to control the dropdown
    const handleMouseMove = (event) => {
      // Only executed if the user is authenticated
      if (isAuthenticated) {
        const button = buttonRef.current;
        const dropdown = dropdownRef.current;
        const rect = button.getBoundingClientRect();
        const buffer = 20; // Buffer area around the button and dropdown

        // Check if the mouse is over the button (including buffer area)
        const isOverButton = (
          event.clientX >= rect.left - buffer &&
          event.clientX <= rect.right + buffer &&
          event.clientY >= rect.top - buffer &&
          event.clientY <= rect.bottom + buffer
        );

        // Check if the mouse is over the dropdown
        const isOverDropdown = dropdown && dropdown.contains(event.target);

        // Open dropdown if mouse is over button or dropdown
        // Close dropdown if mouse is outside both
        if (isOverButton || isOverDropdown) {
          setDropdownOpen(true);
        } else {
          setDropdownOpen(false);
        }
      }
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isAuthenticated]);

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
              ref={buttonRef}
              className="text-sm flex items-center"
            >
              <LuUser className="inline-block text-lg mr-1" />
              Mock User
            </button>
            {dropdownOpen && (
              <div ref={dropdownRef} className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
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