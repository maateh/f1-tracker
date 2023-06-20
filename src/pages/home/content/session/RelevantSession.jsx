// components
import CountdownTimer from "./countdown/CountdownTimer"

// context
import { useWeekendContext } from "../../context/hooks/useWeekendContext"

const RelevantSession = () => {
  const { weekend: { sessions: { relevantSession: session } }} = useWeekendContext()

  return (
    <div className="relevant-session">
      <h2 className="title">{`${session.active ? 'Current' : 'Next'} Session`}</h2>
      <p className="name">{session.title}</p>
      
      <CountdownTimer end={session.active ? session.end : session.start} />
    </div>
  )
}

export default RelevantSession