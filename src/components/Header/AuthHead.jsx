import Logo from "../../assets/images/logo.webp"
function AuthHead() {
  return (
    <div className="flex justify-center py-10">
      <img src={Logo} alt="logo" />
    </div>
  )
}

export default AuthHead
