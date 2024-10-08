import AdditionalNav from '../Header/AdditionalNav';
import Navbar from '../Header/Navbar';
import Promo from '../Header/Promo'; 

function Header() {
  return (
    <header>
      <div className="flex flex-col justify-center">
        {/* header top */}
        <AdditionalNav />
        {/* header mid */}
        <Navbar /> 

        {/* header bottom */}
        <Promo />
      </div>
    </header>
  );
}

export default Header;
