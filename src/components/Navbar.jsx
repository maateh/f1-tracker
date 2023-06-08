import { Link } from "react-router-dom"

// assets
import Logo from '../assets/logo.jpg'

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
          <li><Link to="/">Home</Link></li>
          <li><Link to="/schedule">Schedule</Link></li>
          <li><Link to="/results">Results</Link></li>
          <li><Link to="/history">Laps History</Link></li>
        </ul>
      </nav>
    </header>
  )
}

export default Navbar