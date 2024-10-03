import { Link } from "react-router-dom";

function AdditionalNav() {
  return (
    <div className="flex justify-end px-14 py-2 font-semibold">
      <ul className="flex items-center gap-4 text-xs">
        <li>
          <Link to="/" className="text-sm">Help</Link>
        </li>
        <li>
          <Link to="/" className="text-sm">Join Us</Link>
        </li>
      </ul>
    </div>
  );
}

export default AdditionalNav;