// hooks
import { useTimer } from '../../hooks/useTimer'

// styles
import './CountdownTimer.css'

const CountdownTimer = ({ start, end }) => {
  const { duration } = useTimer(start, end)

  return (
    <div className="countdown-timer">
      {duration ? (
        <>
          {duration.days > 0 && (
            <>
            <div className="countdown-timer__unit__container">
              <span className="countdown-timer__value">{duration.days}</span>
              <p className="countdown-timer__unit">days</p>
            </div>
            <span className="countdown-timer__separator">:</span>
            </>
          )}
          <div className="countdown-timer__unit__container">
            <span className="countdown-timer__value">{duration.hours}</span>
            <p className="countdown-timer__unit">hours</p>
          </div>
          <span className="countdown-timer__separator">:</span>
          <div className="countdown-timer__unit__container">
            <span className="countdown-timer__value">{duration.minutes}</span>
            <p className="countdown-timer__unit">minutes</p>
          </div>
          <span className="countdown-timer__separator">:</span>
          <div className="countdown-timer__unit__container">
            <span className="countdown-timer__value">{duration.seconds}</span>
            <p className="countdown-timer__unit">seconds</p>
          </div>
        </>
      ) : <p>Loading...</p>}
    </div>
  )
}

export default CountdownTimer