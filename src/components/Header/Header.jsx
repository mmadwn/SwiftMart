import AdditionalNav from './AdditionalNav';
import Navbar from './Navbar'; // Import new component
import Promo from './Promo'; // Import new component

function Header() {
  return (
    <header>
      <div className="flex flex-col justify-center">
        {/* header top */}
        <AdditionalNav /> {/* Use new component */}

        {/* header mid */}
        <Navbar /> {/* Use new component */}

        {/* header bottom */}
        <Promo /> {/* Use new component */}
      </div>
    </header>
  );
}

export default Header;
