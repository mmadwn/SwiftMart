import { Outlet } from "react-router-dom"
import AuthHead from "../components/Header/AuthHead"

function AuthLayout() {
  return (
    <div>
      <AuthHead />
      <Outlet />
    </div>
  )
}

export default AuthLayout