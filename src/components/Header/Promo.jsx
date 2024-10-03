import { useState, useEffect } from 'react';

function Promo() {
  const [currentPromo, setCurrentPromo] = useState('');
  const promos = [
    "Special Offer: 20% off all electronics!",
    "Free shipping on orders over $50",
    "New arrivals in women's clothing"
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * promos.length);
      setCurrentPromo(promos[randomIndex]);
    }, 5000); // Change promo every 5 seconds

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="flex items-center justify-center bg-gray-100 px-12 py-4 h-16"> {/* Set a fixed height */}
      <div className="text-center flex-1">
        <p className="text-sm font-medium">{currentPromo}</p>
      </div>
    </div>
  );
}

export default Promo;