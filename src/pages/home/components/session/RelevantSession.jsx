import { useState } from "react"

// components
import CountdownTimer from "./countdown/CountdownTimer"

// context
import { useWeekendContext } from "../../context/hooks/useWeekendContext"

const RelevantSession = () => {
  const { weekend } = useWeekendContext()
  const [session, setSession] = useState(weekend.getRelevantSession())

  return (
    <section className="relevant-session">
      <h2 className="title">{`${session.isActive() ? 'Current' : 'Next'} Session`}</h2>
      <p className="name">{session.title}</p>
      
      <CountdownTimer session={session} setSession={setSession} />
    </section>
  )
}

export default RelevantSession
