// components
import CountdownTimer from './CountdownTimer'

// styles
import './SessionHeadline.css'

const SessionHeadline = ({ session }) => {
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