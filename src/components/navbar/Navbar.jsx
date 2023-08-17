import { useRef } from "react"
import { NavLink } from "react-router-dom"

// icons
import Logo from '/logo.svg'
import MenuIcon from '@mui/icons-material/Menu'

// styles
import './Navbar.css'

const Navbar = () => {
  const linksRef = useRef()

  return (
    <header className="navbar">
      <nav className="navbar__container">
        <NavLink className="brand" to="/">
          <img src={Logo} alt="logo" />
          <span>F1 tracker</span>
        </NavLink>
        <ul ref={linksRef}>
          <li><NavLink to="/">Home</NavLink></li>
          <li><NavLink to="/schedule">Schedule</NavLink></li>
          <li><NavLink to="/results">Results</NavLink></li>
          <li><NavLink to="/history">History</NavLink></li>
        </ul>

        <MenuIcon
          className="mobile-dropdown__icon"
          onClick={() => linksRef.current.classList.toggle('opened')}
        />
      </nav>
    </header>
  )
}

export default Navbar
