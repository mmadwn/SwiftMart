import { Link } from "react-router-dom";

function AdditionalNav() {
  return (
    <div className="flex justify-end">
      <ul className="flex items-center gap-4">
        <li>
          <Link to="/">Help</Link>
        </li>
        <li>
          <Link to="/">Join Us</Link>
        </li>
      </ul>
    </div>
  );
}

export default AdditionalNav;