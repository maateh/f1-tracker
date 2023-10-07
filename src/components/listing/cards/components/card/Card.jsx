import { Tooltip } from '@mui/material'

// styles
import './Card.css'

const Card = ({ children, tooltipText, size, classNames, bgColor, borderColor, invertOnHover, onClick, lastRef }) => {
  return (
    <Tooltip title={tooltipText} placement='top' arrow>
      <li
        className={`card__container ${size} ${bgColor ? `bg--${bgColor}` : ''} ${borderColor ? `border--${borderColor}` : ''}${invertOnHover ? ` hover--${borderColor}` : ''}${classNames ? ` ${classNames}` : ''}`}
        onClick={onClick}
        ref={lastRef || undefined}
      >
        {children}
      </li>
    </Tooltip>
  )
}

export default Card
