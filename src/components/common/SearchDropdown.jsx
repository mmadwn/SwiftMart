import { FaSearch } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';
import PropTypes from 'prop-types';
import logo from '../../assets/images/logo.png';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { Link } from 'react-router-dom'; 

const SearchDropdown = ({ onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const products = useSelector((state) => state.products.allProducts);

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  ).slice(0, 6);

  return (
    <div className="fixed top-0 left-0 w-full h-full md:h-3/4 lg:h-1/2 bg-white z-50 flex flex-col">
      <div className="flex items-center justify-between p-2 sm:p-4">
        <div className="w-1/4 sm:w-1/6">
          <img src={logo} alt="Logo" className="h-8 sm:h-12 md:h-16" />
        </div>
        <div className="w-1/2 sm:w-2/3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full py-1 sm:py-2 px-2 sm:px-4 pr-8 sm:pr-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black text-sm sm:text-base"
            />
            <FaSearch className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>
        <div className="w-1/4 sm:w-1/6 flex justify-end">
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800 focus:outline-none"
          >
            <IoMdClose size={20} sm:size={24} />
          </button>
        </div>
      </div>

      {searchTerm && (
        <div className="flex-grow p-2 sm:p-4 overflow-y-auto">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 sm:gap-4">
              {filteredProducts.map(product => (
                <Link 
                  key={product.id} 
                  to={`/products/${product.id}`} 
                  className="flex flex-col items-center border rounded-md p-2 sm:p-3 h-48 sm:h-64 md:h-72"
                  onClick={onClose}
                >
                  <div className="w-full h-2/3 flex items-center justify-center">
                    <img src={product.image} alt={product.title} className="max-w-full max-h-full object-contain" />
                  </div>
                  <div className="flex flex-col text-center justify-between mt-1 sm:mt-2 h-1/3">
                    <span className="font-semibold text-xs sm:text-sm line-clamp-2">{product.title}</span>
                    <span className="text-gray-600 text-xs sm:text-sm mt-1">${product.price}</span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="p-2 text-gray-500 text-center">No results found.</div>
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
