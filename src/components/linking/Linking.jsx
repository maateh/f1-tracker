import { Link } from 'react-router-dom'
import { Tooltip } from '@mui/material'

// icons
import LaunchIcon from '@mui/icons-material/Launch'

// styles
import './Linking.css'

const Linking = ({ link, text, tooltipText, icon, launchIcon, size, positioningClasses, darkMode, textStyles }) => {
  return (
    <Tooltip title={tooltipText} arrow>
      <Link
        className={`linking__container icon__container ${size} ${darkMode ? 'dark' : ''} ${positioningClasses}`}
        onClick={e => e.stopPropagation()}
        to={link}
      >
        {icon}
        <span className="link-text" style={textStyles}>{text}</span>
        {launchIcon && <LaunchIcon fontSize='small' />}
      </Link>
    </Tooltip>
  )
}

export default Linking
