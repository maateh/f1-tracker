import { useRef } from "react"
import { NavLink } from "react-router-dom"

// icons
import Logo from '/logo.svg'
import HomeIcon from '@mui/icons-material/Home'
import EventIcon from '@mui/icons-material/Event'
import SportsScoreIcon from '@mui/icons-material/SportsScore'
import MenuIcon from '@mui/icons-material/Menu'
import AutoStoriesIcon from '@mui/icons-material/AutoStories'

// styles
import './Navbar.css'
import NavbarItem from "./NavbarItem"

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
          <NavbarItem title={'Home'} link={'/'} icon={<HomeIcon />} />
          <NavbarItem title={'Schedule'} link={'/schedule'} icon={<EventIcon />} />
          <NavbarItem title={'Results'} link={'/results'} icon={<SportsScoreIcon />} />
          <NavbarItem title={'History'} link={'/history'} icon={<AutoStoriesIcon />} />
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
