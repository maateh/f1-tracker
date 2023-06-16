// context
import { useWeekendContext } from '../context/hooks/useWeekendContext'

// components
import CountdownTimer from './countdown/CountdownTimer'

// styles
import './SessionHeadline.css'

const SessionHeadline = () => {
  const { weekend: { sessions: { relevantSession: session } }} = useWeekendContext()

  return (
    <div className="session-headline">
      <h2 className="title">{`${session.active ? 'Current' : 'Next'} Session`}</h2>
      <p className="name">{session.title}</p>
      {session.active ? 
        <CountdownTimer end={session.end} /> :
        <CountdownTimer end={session.start} />
      }
    </div>
  )
}

export default SessionHeadline