function Promo() {
  return (
    <div className="relative overflow-hidden">
      <div className="flex transition-transform duration-300 ease-in-out">
        <div className="flex-shrink-0 w-full">
          <p className="text-center">
            Special Offer: 20% off all electronics!
          </p>
        </div>
        <div className="flex-shrink-0 w-full">
          <p className="text-center">Free shipping on orders over $50</p>
        </div>
        <div className="flex-shrink-0 w-full">
          <p className="text-center">
            New arrivals in women&apos;s clothing
          </p>
        </div>
      </div>
      <button className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>
      <button className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </div>
  );
}

export default Promo;