import { NavLink } from "react-router-dom"

// styles
import './NavbarItem.css'

const NavbarItem = ({ title, link, icon }) => {
  return (
    <li>
      <NavLink className="icon__container" to={link}>
        {icon}
        <span>{title}</span>
      </NavLink>
    </li>
  )
}

export default NavbarItem
