import PropTypes from 'prop-types';

const Spinner = ({ size = 'medium', message = 'Loading...' }) => {
  const sizeClasses = {
    small: 'w-6 h-6',
    medium: 'w-10 h-10',
    large: 'w-16 h-16'
  };

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className={`${sizeClasses[size]} relative`}>
        <div className="absolute top-0 left-0 w-full h-full border-4 border-gray-200 rounded-full"></div>
        <div className="absolute top-0 left-0 w-full h-full border-4 border-black rounded-full animate-spin border-t-transparent"></div>
      </div>
      {message && <p className="mt-4 text-sm text-gray-600">{message}</p>}
    </div>
  );
};

Spinner.propTypes = {
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  message: PropTypes.string
};

export default Spinner;
