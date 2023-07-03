import { Link, NavLink } from "react-router-dom"

// assets
import Logo from '/logo.svg'

// styles
import './Navbar.css'

const Navbar = () => {
  return (
    <header className="navbar">
      <nav className="container">
        <Link className="brand" to="/">
          <img src={Logo} alt="logo" />
          <span>F1 Tracker</span>
        </Link>
        <ul>
          <li><NavLink to="/">Home</NavLink></li>
          <li><NavLink to="/schedule">Schedule</NavLink></li>
          <li><NavLink to="/results">Results</NavLink></li>
          <li><NavLink to="/history">History</NavLink></li>
        </ul>
      </nav>
    </header>
  )
}

export default Navbar