// icons
import ErrorIcon from '@mui/icons-material/Error'
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious'

const Error = ({ info, messages, onReset, resetLabel, size }) => {
  return (
    <div className={`error-fallback${size ? ` ${size}` : ''}`}>
      <ErrorIcon className="error__icon" />
      <p className="error-title">Ooops!</p>
      <p className="error-info">{info}</p>

      {messages.map((msg, index) => (
        <p key={index} className="error-msg">{msg}</p>
      ))}

      <button className="btn icon__container" onClick={onReset}>
        <SkipPreviousIcon />
        <span>{resetLabel}</span>
      </button>
    </div>
  )
}

export default Error
