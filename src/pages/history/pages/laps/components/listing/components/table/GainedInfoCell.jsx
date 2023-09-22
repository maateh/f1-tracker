// components
import Linking from '../../../../../../../../components/linking/Linking'

// constants
import { LINKING_SIZE_SMALL } from '../../../../../../../../components/linking/LinkingConstants'

// icons
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp'
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown'

const GainedInfoCell = ({ value, gained, link, style }) => {
  return (
    <>
      {link ? (
        <Linking
          text={value}
          link={link}
          launchIcon={false}
          size={LINKING_SIZE_SMALL}
          textStyles={style || {
            fontSize: '1.1rem',
            fontWeight: '500'
          }}
        />
      ) : (
        <p style={style || {
          fontSize: '1.1rem',
          fontWeight: '500'
          }}
        >
          {value}
        </p>
      )}

      {gained && (
        <p className="icon__container" style={{
          fontSize: '0.95rem',
          fontWeight: '400'
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
