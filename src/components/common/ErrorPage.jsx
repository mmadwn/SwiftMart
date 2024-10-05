import PropTypes from 'prop-types'; // Add this import

const defaultErrorData = {
    code: '404',
    message: 'Page Not Found',
    description: 'The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.'
};

const ErrorPage = ({ 
    errorCode = defaultErrorData.code, 
    errorMessage = defaultErrorData.message, 
    errorDescription = defaultErrorData.description 
}) => {
    const handleReturn = () => window.history.back();

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-white text-black font-sans">
            <h1 className="text-8xl m-0 border-b-2 border-black pb-4">{errorCode}</h1>
            <h2 className="text-2xl my-4">{errorMessage}</h2>
            <p className="text-xl text-center max-w-xl my-4">{errorDescription}</p>
            <button 
                className="bg-black text-white border-none py-3 px-6 text-base cursor-pointer transition-opacity duration-300 ease-in-out hover:opacity-80"
                onClick={handleReturn}
            >
                Return to Previous Page
            </button>
        </div>
    );
};

// Add prop types validation
ErrorPage.propTypes = {
    errorCode: PropTypes.string,
    errorMessage: PropTypes.string,
    errorDescription: PropTypes.string,
};

export default ErrorPage;
