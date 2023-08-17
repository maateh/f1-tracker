// components
import CountdownTimer from "./countdown/CountdownTimer"

// context
import { useWeekendContext } from "../../context/hooks/useWeekendContext"

const RelevantSession = () => {
  const { weekend: { sessions: { relevantSession: session }}} = useWeekendContext()

  return (
    <section className="relevant-session">
      <h2 className="title">{`${session.isActive() ? 'Current' : 'Next'} Session`}</h2>
      <p className="name">{session.title}</p>
      
      <CountdownTimer end={session.isActive() ? session.end : session.start} />
    </section>
  )
}

export default RelevantSession
