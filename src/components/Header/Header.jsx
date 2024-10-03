import AdditionalNav from './AdditionalNav';
import Navbar from './Navbar';
import Promo from './Promo'; 

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
