// icons
import ErrorIcon from '@mui/icons-material/Error'

const Error = ({ info, messages, onReset, resetLabel, resetIcon, size }) => {
  return (
    <div className={`error-fallback${size ? ` ${size}` : ''}`}>
      <ErrorIcon className="error__icon" />
      <p className="error-title">Ooops!</p>
      <p className="error-info">{info}</p>

      {messages.map((msg, index) => (
        <p key={index} className="error-msg">{msg}</p>
      ))}

      <button className="btn icon__container" onClick={onReset}>
        {resetIcon}
        <span>{resetLabel}</span>
      </button>
    </div>
  )
}

export default Error
