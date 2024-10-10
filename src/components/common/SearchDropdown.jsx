import { FaSearch } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';
import PropTypes from 'prop-types';
import logo from '../../assets/images/logo.png';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { Link } from 'react-router-dom'; 

const SearchDropdown = ({ onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const products = useSelector((state) => state.products.allProducts); // Access all products from Redux

  // Filter products based on the search term
  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  ).slice(0, 6); // Limit to top 7 products

  return (
    <div className="fixed top-0 left-0 w-full h-1/2 bg-white z-50 flex flex-col">
      <div className="flex items-center justify-between p-4">
        <div className="w-1/4">
          <img src={logo} alt="Logo" className="h-16" />
        </div>
        <div className="w-full">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} // Update search term on input change
              className="w-full py-2 px-4 pr-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
            />
            <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>
        <div className="w-1/4 flex justify-end">
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800 focus:outline-none"
          >
            <IoMdClose size={24} />
          </button>
        </div>
      </div>

      {/* Display filtered products */}
      {searchTerm && (
        <div className="flex-grow p-4 overflow-hidden">
          {filteredProducts.length > 0 ? (
            <div className="flex flex-wrap gap-4">
              {filteredProducts.map(product => (
                <Link 
                  key={product.id} 
                  to={`/products/${product.id}`} 
                  className="flex flex-col items-center border rounded-md p-5 w-72 h-72"
                  onClick={onClose} // Close dropdown on click
                >
                  <img src={product.image} alt={product.title} className="w-full h-5/6 object-contain" />
                  <div className="flex flex-col text-center flex-grow justify-between mt-2">
                    <span className="font-semibold text-sm">{product.title.length > 15 ? `${product.title.substring(0, 20)}...` : product.title}</span>
                    <span className="text-gray-600 text-xs">${product.price}</span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="p-2 text-gray-500">No results found.</div>
          )}
        </div>
      )}
    </div>
  );
};

SearchDropdown.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default SearchDropdown;
