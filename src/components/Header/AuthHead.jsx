import Logo from "../../assets/images/logo.webp"
import { Link } from "react-router-dom"

function AuthHead() {
  return (
    <div className="flex items-center justify-center w-full py-5">
      <div className="w-20">
        <Link to="/">
          <img src={Logo} alt="logo" className="w-full" />
        </Link>
      </div>
    </div>
  )
}

export default AuthHead
