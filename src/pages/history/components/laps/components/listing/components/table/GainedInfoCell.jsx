// icons
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp'
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown'
import { Link } from 'react-router-dom'

const GainedInfoCell = ({ value, gained, link, style }) => {
  return (
    <>
      {link ? (
        <Link 
          to={link}
          style={style || { fontSize: '1.1rem', fontWeight: 500}}
        >
          {value}
        </Link>
      ) : (
        <p style={style || { fontSize: '1.1rem', fontWeight: 500 }}>
          {value}
        </p>
      )}

      {gained && (
        <p className="icon__container" style={{
          fontSize: '0.95rem',
          fontWeight: 400
        }}>
          {gained > 0 
            ? <KeyboardDoubleArrowUpIcon
                fontSize='small'
                style={{
                  color: 'var(--secondary)',
                  marginRight: '0.05rem'
                }}
              /> 
            : <KeyboardDoubleArrowDownIcon
                fontSize='small'
                style={{
                  color: 'var(--secondary)',
                  marginRight: '0.05rem'
                }}
              />
          }{gained} pos
        </p>
      )}
    </>
  )
}

export default GainedInfoCell
