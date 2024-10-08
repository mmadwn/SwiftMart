import Footer from "../components/Footer/Footer"
import Header from "../components/common/Header"
import { Outlet } from "react-router-dom"

function MainLayout() {
  return (
    <div>
        <Header />
        <main>
            <Outlet />
        </main>
        <Footer />
    </div>
  )
}

export default MainLayout
