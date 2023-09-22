import { Tooltip } from '@mui/material'

// styles
import './Card.css'

const Card = ({ children, tooltipText, size, bgColor, borderColor, invertOnHover, onClick }) => {
  return (
    <Tooltip title={tooltipText} placement='top' arrow>
      <li
        className={`
          card__container 
          ${size}
          bg--${bgColor} 
          border--${borderColor} 
          ${invertOnHover ? `hover--${borderColor}` : ''}
        `}
        onClick={onClick}
      >
        {children}
      </li>
    </Tooltip>
  )
}

export default Card
