import { useState, useEffect, useMemo } from "react";
import { FaGift, FaShippingFast, FaTshirt } from "react-icons/fa";

function Promo() {
  const [currentPromo, setCurrentPromo] = useState("");
  const [currentIcon, setCurrentIcon] = useState(null);
  
  const promos = useMemo(() => [
    { text: "Special Offer: 20% off all electronics!", icon: <FaGift /> },
    { text: "Free shipping on orders over $50", icon: <FaShippingFast /> },
    { text: "New arrivals in women's clothing", icon: <FaTshirt /> },
  ], []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * promos.length);
      setCurrentPromo(promos[randomIndex].text);
      setCurrentIcon(promos[randomIndex].icon);
    }, 3000); // Change promo every 3 seconds

    return () => clearInterval(intervalId);
  }, [promos]);

  return (
    <div className="flex items-center justify-center bg-gray-100 px-12 py-4 h-16">
      <div className="text-center flex-1 flex items-center justify-center">
        <div className="flex items-center">
          <p className="text-xl mr-2">{currentIcon}</p>
          <p className="text-sm font-medium">{currentPromo}</p>
        </div>
      </div>
    </div>
  );
}

export default Promo;
