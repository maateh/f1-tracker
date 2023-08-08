import { Outlet } from "react-router-dom"

// components
import Navbar from "../components/navbar/Navbar"

const Main = () => {
  return (
    <div className="main-layout">
      <Navbar />
      <Outlet />
    </div>
  )
}
export default Main